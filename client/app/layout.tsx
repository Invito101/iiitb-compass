import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
	title: "IIITB Compass",
	description:
		"A centralized dashboard for IIITB students to access tools, events, and resources.",
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full w-full" suppressHydrationWarning>
			<body className="h-full w-full">
				<SessionProvider>
					<ThemeProvider
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}

