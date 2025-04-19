"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ModeToggle } from "@/components/mode-toggle";
import { cabSharingFormSchema, CabSharingFormSchema } from "@/forms/cab-sharing/cabSharingSchema";
import { useSession } from "next-auth/react";
import { createCabSharing } from "@/forms/cab-sharing/action";

export default function AddCabSharePage() {
  const router = useRouter();
  const { data } = useSession();

  if (!data || !data.user) {
    router.push("/auth");
    return null;
  }

  const user = data.user;
  const form = useForm<CabSharingFormSchema>({
    resolver: zodResolver(cabSharingFormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      date: new Date(),
      userId: user.id,
    },
  });

  const onSubmit = async (values: CabSharingFormSchema) => {
      await createCabSharing(values);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      {/* Top Bar */}
      <div className="w-full h-28 flex items-center justify-between px-8 shadow-md">
        <div className="flex items-center gap-4">
          <Image src="/spinner.png" alt="Logo" width={40} height={40} />
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Image
            src="/profile.jpg"
            alt="Account"
            width={48}
            height={48}
            className="rounded-full object-cover cursor-pointer border-2 border-black/10 dark:border-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center">Add CabShare</h1>

        <Card className="max-w-xl mx-auto bg-transparent p-6 rounded-xl shadow-lg border border-black/10 dark:border-white/20">
          <CardHeader>
            <CardTitle>New CabShare</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                {/* Hidden userId */}
                <input type="hidden" {...form.register("userId")} />

                {/* Origin */}
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter origin" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Destination */}
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter destination" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value.toISOString().split("T")[0]}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 font-semibold py-2 px-6 rounded-md drop-shadow-sm transition-all border border-black/10 dark:border-white/10"
                  >
                    Add CabShare
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
