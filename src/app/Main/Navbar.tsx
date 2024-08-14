"use client"

import { signOut } from "@/utils/auth"
import { getInitials } from "@/utils/general"
import { Avatar, DropdownMenu, Text } from "@radix-ui/themes"
import type { User } from "@supabase/supabase-js"
import { useFormStatus } from "react-dom"

export function Navbar({ user }: { user: User }) {
	return (
		<nav className="flex p-3 w-full flex-row items-center justify-between border-b border-gray-4">
			<Text size="4" weight="medium">
				Tab Collector
			</Text>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={user.user_metadata.avatar_url}
						fallback={getInitials(user.user_metadata.name)}
						className="hover:cursor-pointer"
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>{user.user_metadata.name}</DropdownMenu.Label>
					<form action={signOut}>
						<SignOutButton />
					</form>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</nav>
	)
}

function SignOutButton() {
	const { pending } = useFormStatus()

	return (
		<DropdownMenu.Item asChild className="w-full">
			<button type="submit">{pending ? "Signing Out..." : "Sign Out"}</button>
		</DropdownMenu.Item>
	)
}
