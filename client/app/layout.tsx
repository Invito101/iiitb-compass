import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
	title: "IIITB Compass",
	description:
		"A centralized dashboard for IIITB students to access tools, events, and resources.",
};

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn("overflow-y-scroll", inter.className)}
			suppressHydrationWarning
		>
			<body>
				<SessionProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<div className="flex flex-col">
							{children}
							<footer className="mt-auto py-6 px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} IIITB Compass. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/contact"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
						</div>
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
