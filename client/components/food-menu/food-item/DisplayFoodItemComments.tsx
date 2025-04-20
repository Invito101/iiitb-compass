"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ChevronLeft } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { foodMenuEntryWithItemAndRatingType } from '@/types/prisma-types';
import { useSession } from 'next-auth/react';

export default function DisplayFoodItemComments({
  foodEntry,
}: {
  foodEntry: foodMenuEntryWithItemAndRatingType;
}) {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'User';
  const userImage = session?.user?.image || '/profile.jpg';
  const reviews = foodEntry.FoodItemRating;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <div className="h-28 flex items-center justify-between shadow-md border border-b px-8 w-full">
        <Link href="/dashboard" className="flex items-center gap-4">
          <Image src="/spinner.png" alt="Logo" width={40} height={40} />
        </Link>
        <div className="relative">
          <div
            className="gap-x-4 items-center justify-center hidden md:flex md:flex-row relative"
            onMouseEnter={(e) => {
              const foodMenuLink = e.currentTarget.querySelector(
                'a[href="/foodmenu"]'
              ) as HTMLElement;
              const underline = e.currentTarget.querySelector(
                ".absolute"
              ) as HTMLElement;
              if (foodMenuLink && underline) {
                underline.style.setProperty(
                  "--underline-width",
                  `${foodMenuLink.offsetWidth}px`
                );
                underline.style.setProperty(
                  "--underline-left",
                  `${foodMenuLink.offsetLeft}px`
                );
              }
            }}
          >
            <div
              className="absolute bottom-0 h-0.5 bg-purple-600 transition-all duration-300"
              style={{
                width: "var(--underline-width, 0)",
                left: "var(--underline-left, 0)",
              }}
            />
            {[
              {
                href: "/dashboard",
                label: "Dashboard",
              },
              { href: "/calendar", label: "Calendar" },
              { href: "/cabshare", label: "Cab Share" },
              { href: "/lostfound", label: "L&F" },
              {
                href: "/foodmenu",
                label: "Food Menu",
                className: "text-purple-600 font-semibold",
              },
            ].map(({ href, label, className = "" }) => (
              <Link
                key={href}
                href={href}
                className={`group relative ${className} text-muted-foreground hover:text-purple-600 transition-colors duration-300`}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  const underline =
                    target.parentElement?.querySelector(".absolute") as HTMLElement;
                  if (underline) {
                    underline.style.setProperty(
                      "--underline-width",
                      `${target.offsetWidth}px`
                    );
                    underline.style.setProperty(
                      "--underline-left",
                      `${target.offsetLeft}px`
                    );
                  }
                }}
                onMouseLeave={(e) => {
                  const underline =
                    e.currentTarget.parentElement?.querySelector(
                      ".absolute"
                    ) as HTMLElement;
                  if (underline) {
                    underline.style.setProperty("--underline-width", "0");
                  }
                }}
              >
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/profile" className="h-8 w-8">
            <Avatar>
              <AvatarImage src={userImage} />
              <AvatarFallback>{userName}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto p-6 space-y-6 flex-1 relative w-full">
        {/* Header with Back - Now consistently styled regardless of review presence */}
        <div className="mb-6 flex items-center justify-between">
          <div className="w-20">
            <Link
              href="/foodmenu"
              className="flex items-center"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="ml-1 font-medium">Back</span>
            </Link>
          </div>
          <h1 className="text-2xl font-semibold text-center flex-1">Reviews</h1>
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>

        {/* Reviews List */}
        {(!reviews || reviews.length === 0) ? (
          <div className="flex items-center justify-center h-64 p-6">
            <p className="text-gray-500 text-lg">No reviews yet.</p>
          </div>
        ) : (
          <div className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-gray-100 dark:bg-zinc-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100 dark:border-gray-700"
                >
                  <header className="flex items-center gap-x-8 justify-between">
                    <div className="flex items-center">
                      {review.user.image ? (
                        <Image
                          src={review.user.image}
                          alt={review.user.name || 'User avatar'}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full" />
                      )}
                      <div className="ml-4">
                        <p className="font-semibol">
                          {review.user.name || review.user.email}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                          strokeWidth={i < review.rating ? 0 : 2}
                          className={
                            i < review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }
                        />
                      ))}
                    </div>
                  </header>

                  <div className="mt-4 text-gray-700 dark:text-gray-300 prose prose-sm">
                    <p>{review.comment || 'No comment provided.'}</p>
                  </div>

                  {review.imageUrl && (
                    <div className="mt-4">
                      <Image
                        src={review.imageUrl}
                        alt="Review image"
                        width={320}
                        height={180}
                        className="rounded-lg object-cover w-full"
                      />
                    </div>
                  )}
                </article>
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}