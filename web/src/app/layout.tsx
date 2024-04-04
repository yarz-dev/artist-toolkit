import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "src/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Artists Toolkit",
	description: "Artists tools in one box!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				<main className="flex justify-center items-center bg-slate-200">
					{children}
				</main>
			</body>
		</html>
	);
}
