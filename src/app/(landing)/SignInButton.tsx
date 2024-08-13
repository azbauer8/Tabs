"use client"

import { Button } from "@radix-ui/themes"
import { useFormStatus } from "react-dom"

export function SignInButton() {
	const { pending } = useFormStatus()
	return (
		<Button size="3" loading={pending}>
			Sign In with Spotify
		</Button>
	)
}
