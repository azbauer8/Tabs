import { EditEntries } from "@/app/(main)/Entries/EditEntries"
import { EntryCardWrapper } from "@/app/(main)/Entries/EntryCard"
import { createClient } from "@/utils/supabase/server"
import { Heading } from "@radix-ui/themes"
import type { User } from "@supabase/supabase-js"
import { CreateEntry } from "./CreateEntry"

export async function Entries({ user }: { user: User }) {
	const supabase = createClient()
	const entries = await supabase
		.from("Entries")
		.select("*")
		.eq("user_id", user.id)

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center justify-between w-full gap-5">
				<Heading>Entries</Heading>
				<div className="flex items-center gap-2">
					{entries.data && entries.data.length > 0 && <EditEntries />}
					<CreateEntry />
				</div>
			</div>
			{entries.data && entries.data.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2  gap-5 md:grid-cols-3 lg:grid-cols-4">
					{entries.data.map((entry) => (
						<EntryCardWrapper key={entry.id} entry={entry} />
					))}
				</div>
			)}
		</div>
	)
}
