import type { User } from "@supabase/supabase-js"
import { Navbar } from "./Navbar"
import { Entries } from "./Tabs"

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
