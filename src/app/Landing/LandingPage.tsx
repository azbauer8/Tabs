import { signIn } from "@/utils/auth"
import { Heading, Text } from "@radix-ui/themes"
import { SignInButton } from "./SignInButton"

export function LandingPage() {
	return (
		<main className="flex h-dvh w-full flex-col items-center justify-center gap-4">
			<div className="flex flex-col items-center gap-2">
				<Heading size="8">Welcome to Tab Collector</Heading>
				<Text align="center" size="3" wrap="pretty">
					A web app for saving your guitar/bass tabs and linking them to Spotify
					tracks.
				</Text>
			</div>
			<form action={signIn}>
				<SignInButton />
			</form>
		</main>
	)
}
