import { DeleteTabGroupButton } from "@/app/Main/Tabs/TabGrid/DeleteTabGroupButton"
import type { Tables } from "@/utils/supabase/types"
import { Heading, Separator } from "@radix-ui/themes"
import { Fragment } from "react"
import { TabCardWrapper } from "../TabCard"

export function TabGrid({
	entries,
	groups,
}: { entries: Tables<"Entries">[]; groups: Tables<"Entry Groups">[] }) {
	const groupedEntries = groupTabEntries(entries, groups)

	return (
		<>
			{Object.entries(groupedEntries).map(([groupKey, group], index) => (
				<Fragment key={groupKey}>
					<div className="flex flex-col gap-5">
						{groupKey && (
							<div className="flex items-center justify-between">
								<Heading size="5">{group.groupName}</Heading>
								<DeleteTabGroupButton groupId={Number.parseInt(groupKey)} />
							</div>
						)}
						<div className="grid grid-cols-1 sm:grid-cols-2  gap-5 md:grid-cols-3 lg:grid-cols-4">
							{group.entries.map((entry) => (
								<TabCardWrapper key={entry.id} entry={entry} groups={groups} />
							))}
						</div>
					</div>
					{index !== Object.keys(groupedEntries).length - 1 && (
						<Separator size="4" />
					)}
				</Fragment>
			))}
		</>
	)
}

function groupTabEntries(
	entries: Tables<"Entries">[],
	groups: Tables<"Entry Groups">[],
) {
	return entries.reduce(
		(acc, entry) => {
			const groupId = entry.group_id
			const group = groups.find((group) => group.id === groupId)

			const groupKey = group ? group.id.toString() : ""
			const groupName = group ? group.title : ""

			if (!acc[groupKey]) {
				acc[groupKey] = {
					groupName,
					entries: [],
				}
			}

			acc[groupKey].entries.push(entry)
			return acc
		},
		{} as {
			[key: string]: { groupName: string; entries: Tables<"Entries">[] }
		},
	)
}
