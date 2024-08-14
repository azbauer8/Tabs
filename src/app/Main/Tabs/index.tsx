import { CreateGroup } from "@/app/Main/Tabs/CreateGroup"
import { TabGrid } from "@/app/Main/Tabs/TabGrid"
import { createClient } from "@/utils/supabase/server"
import { Heading } from "@radix-ui/themes"
import type { User } from "@supabase/supabase-js"
import { CreateTab } from "./CreateTab"
import { EditEntries } from "./EditTabs"

export async function Entries({ user }: { user: User }) {
	const supabase = createClient()

	const { data: entries } = await supabase
		.from("Entries")
		.select("*")
		.eq("user_id", user.id)

	const { data: groups } = await supabase
		.from("Entry Groups")
		.select("*")
		.eq("user_id", user.id)

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-5">
				<Heading>Tabs</Heading>
				<div className="flex flex-row items-center gap-2">
					{entries && entries.length > 0 && <EditEntries />}
					<CreateGroup />
					<CreateTab />
				</div>
			</div>
			{entries && entries.length > 0 && groups && (
				<TabGrid entries={entries} groups={groups} />
			)}
		</div>
	)
}
