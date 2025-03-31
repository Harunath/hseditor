import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/common/NavBar";
import { FooterPage } from "@/components/common/FooterPage";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "HS Editor - Powerful Online Image Editor",
	description:
		"HS Editor is a modern and lightweight image editor built with Next.js 15. Experience fast and efficient editing with a sleek UI.",
	openGraph: {
		title: "HS Editor - Powerful Online Image Editor",
		description: "Modern and lightweight image editor built with Next.js 15.",
		url: "https://hseditor.vercel.app",
		siteName: "HS Editor",
		images: [
			{
				url: "/android-chrome-192x192.png", // Ensure the favicon is accessible
				width: 192,
				height: 192,
				alt: "HS Editor Logo",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "HS Editor - Powerful Online Image Editor",
		description: "A modern and lightweight image editor built with Next.js 15.",
		images: ["/android-chrome-192x192.png"],
	},
	icons: {
		icon: "/android-chrome-192x192.png",
		shortcut: "/android-chrome-192x192.png",
		apple: "/android-chrome-192x192.png",
	},
	metadataBase: new URL("https://hseditor.vercel.app"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="w-screen min-h-screen flex flex-col no-scrollbar px-4 sm:px-12 md:px-16 lg:px-36 bg-gradient-to-r from-[#1f1f1f] to-[#131313] text-white">
					{/* Navbar */}
					<div className="h-24">
						<NavBar />
					</div>

					{/* Main Content */}
					<div className="flex-1">
						<div className="h-full">{children}</div>
					</div>

					{/* Footer */}
					<FooterPage />
				</div>
			</body>
		</html>
	);
}
