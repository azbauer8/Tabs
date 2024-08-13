import { Navbar } from "@/app/(main)/Navbar"
import type { User } from "@supabase/supabase-js"
import { Entries } from "./Entries"

export function MainLayout({ user }: { user: User }) {
	return (
		<main className="flex h-dvh w-full flex-col">
			<Navbar user={user} />
			<div className="flex-1 container py-6">
				<Entries user={user} />
			</div>
		</main>
	)
}
