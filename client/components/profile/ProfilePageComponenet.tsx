"use client";

import { User } from "@prisma/client";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
	ProfileFormSchema,
	ProfileFormSchemaType,
} from "@/forms/profile/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { format } from "date-fns";
import { updateProfile } from "@/forms/profile/action";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function ProfilePageComponenet({ user }: { user: User }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<ProfileFormSchemaType>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: {
			email: user.email,
			name: user.name || "",
			rollNumber: user.rollNumber || "",
			phone: user.phone || "",
			image: user.image || "",
		},
	});

	const { isDirty } = form.formState;

	const onSubmit = async (data: ProfileFormSchemaType) => {
		setIsLoading(true);
		await updateProfile(data);
		router.refresh();

		setIsLoading(false);
	};
	return (
		<div className="flex flex-col w-full">
			<div className="h-28 flex items-center justify-between shadow-md border border-b px-8 w-full">
				<Link href={"/dashboard"} className="flex items-center gap-4">
					<Image
						src="/spinner.png"
						alt="Logo"
						width={40}
						height={40}
					/>
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
							{ href: "/dashboard", label: "Dashboard" },
							{ href: "/calendar", label: "Calendar" },
							{ href: "/cabshare", label: "Cab Share" },
							{ href: "/lostfound", label: "L&F" },
							{ href: "/foodmenu", label: "Food Menu" },
						].map(({ href, label = "" }) => (
							<Link
								key={href}
								href={href}
								className={`group relative text-muted-foreground hover:text-purple-600 transition-colors duration-300`}
								onMouseEnter={(e) => {
									const target = e.currentTarget;
									const underline =
										target.parentElement?.querySelector(
											".absolute"
										) as HTMLElement;
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
										underline.style.setProperty(
											"--underline-width",
											"0"
										);
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
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Avatar className="h-8 w-8 cursor-pointer">
								<AvatarImage
									src={user.image || "/profile.jpg"}
								/>
								<AvatarFallback>
									{user.name?.charAt(0) || "U"}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium">
										{user.name}
									</p>
									<p className="text-xs text-muted-foreground truncate">
										{user.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link
									href="/profile"
									className="cursor-pointer w-full"
								>
									<UserIcon className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-red-600 focus:text-red-600 cursor-pointer"
								onClick={() => signOut()}
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="flex-1 p-8 max-w-7xl mx-auto w-full">
				<div className="flex flex-row justify-between mb-6">
					<h1 className="text-3xl font-bold">Profile Settings</h1>
					<Button
						variant="outline"
						disabled={!isDirty}
						onClick={() => form.reset()}
					>
						Reset
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="col-span-1">
						<CardHeader>
							<CardTitle>Your Profile</CardTitle>
							<CardDescription>
								View and manage your account information
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col items-center">
							<div className="w-32 h-32 mb-4 relative">
								<Avatar className="w-full h-full">
									<AvatarImage
										src={user.image || "/profile.jpg"}
										alt={user.name || "User"}
										className="object-cover"
									/>
									<AvatarFallback className="text-2xl">
										{user.name?.charAt(0) || "U"}
									</AvatarFallback>
								</Avatar>
							</div>

							<div className="text-center mb-4">
								<h3 className="text-2xl font-medium">
									{user.name}
								</h3>
								<p className="text-muted-foreground">
									{user.email}
								</p>
							</div>

							<Separator className="my-4" />

							<div className="w-full space-y-2">
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Roll Number
									</span>
									<span>{user.rollNumber || "Not set"}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Phone Number
									</span>
									<span>{user.phone || "Not set"}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Account Created
									</span>
									<span>
										{format(user.createdAt, "do MMM yyyy")}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Account Updated On
									</span>
									<span>
										{format(user.updatedAt, "do MMM yyyy")}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="col-span-1">
						<CardHeader>
							<CardTitle>Edit Profile</CardTitle>
							<CardDescription>
								Update your personal information
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-6"
								>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled
													/>
												</FormControl>
												<FormDescription>
													Email cannot be changed as
													it is linked to your
													account.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="rollNumber"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Roll Number
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Phone Number
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="tel"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="image"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Profile Picture
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled
													/>
												</FormControl>
												<FormDescription>
													Profile picture is managed
													through your authentication
													provider.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										className="w-full"
										disabled={isLoading}
									>
										{isLoading
											? "Saving..."
											: "Save Changes"}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
