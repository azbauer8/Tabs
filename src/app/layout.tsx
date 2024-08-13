import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles.css"
import { Theme } from "@radix-ui/themes"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Tabs",
	description: "A web app for linking guitar tabs to Spotify tracks.",
}

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class">
					<Theme accentColor="green">{children}</Theme>
				</ThemeProvider>
			</body>
		</html>
	)
}
