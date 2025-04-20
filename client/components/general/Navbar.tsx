"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

type NavItem = {
	href: string;
	label: string;
};

export function Navbar() {
	const pathname = usePathname();
	const session = useSession();
	const userName = session?.data?.user?.name || "User";
	const userEmail = session?.data?.user?.email;
	const userImage = session?.data?.user?.image || "/profile.jpg";
	const navContainerRef = useRef<HTMLDivElement>(null);

	const navItems: NavItem[] = [
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/calendar", label: "Calendar" },
		{ href: "/cabshare", label: "Cab Share" },
		{ href: "/lostfound", label: "L&F" },
		{ href: "/foodmenu", label: "Food Menu" },
	];

	// Set initial underline position on mount and when pathname changes
	useEffect(() => {
		if (navContainerRef.current) {
			const activeLink = navContainerRef.current.querySelector(
				`a[href="${pathname}"]`
			) as HTMLElement;

			const underline = navContainerRef.current.querySelector(
				".absolute"
			) as HTMLElement;

			if (activeLink && underline) {
				underline.style.setProperty(
					"--underline-width",
					`${activeLink.offsetWidth}px`
				);
				underline.style.setProperty(
					"--underline-left",
					`${activeLink.offsetLeft}px`
				);
			}
		}
	}, [pathname]);

	return (
		<div className="h-28 flex items-center justify-between shadow-md border border-b px-8 w-full">
			<Link href={"/dashboard"} className="flex items-center gap-4">
				<Image src="/spinner.png" alt="Logo" width={40} height={40} />
			</Link>

			<div className="relative">
				<div
					ref={navContainerRef}
					className="gap-x-4 items-center justify-center hidden md:flex md:flex-row relative"
					onMouseEnter={(e) => {
						// Find the active link
						const activeLink = e.currentTarget.querySelector(
							`a[href="${pathname}"]`
						) as HTMLElement;
						const underline = e.currentTarget.querySelector(
							".absolute"
						) as HTMLElement;

						if (activeLink && underline) {
							underline.style.setProperty(
								"--underline-width",
								`${activeLink.offsetWidth}px`
							);
							underline.style.setProperty(
								"--underline-left",
								`${activeLink.offsetLeft}px`
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

					{navItems.map(({ href, label }) => {
						const isActive = pathname === href;

						return (
							<Link
								key={href}
								href={href}
								className={`group relative ${
									isActive
										? "text-purple-600 font-semibold"
										: "text-muted-foreground"
								} hover:text-purple-600 transition-colors duration-300`}
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

									if (underline && pathname !== href) {
										const activeLink =
											e.currentTarget.parentElement?.querySelector(
												`a[href="${pathname}"]`
											) as HTMLElement;

										if (activeLink) {
											underline.style.setProperty(
												"--underline-width",
												`${activeLink.offsetWidth}px`
											);
											underline.style.setProperty(
												"--underline-left",
												`${activeLink.offsetLeft}px`
											);
										} else {
											underline.style.setProperty(
												"--underline-width",
												"0"
											);
										}
									}
								}}
							>
								<span>{label}</span>
							</Link>
						);
					})}
				</div>
			</div>

			<div className="flex items-center gap-4">
				<ModeToggle />

				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Avatar className="h-8 w-8 cursor-pointer">
							<AvatarImage src={userImage || "/profile.jpg"} />
							<AvatarFallback>
								{userName?.charAt(0) || "U"}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuLabel>
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium">
									{userName}
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{userEmail}
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
	);
}
