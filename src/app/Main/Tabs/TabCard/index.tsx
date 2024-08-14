"use client"

import type { Tables } from "@/utils/supabase/types"
import { Cross1Icon, PlayIcon, RowsIcon } from "@radix-ui/react-icons"
import { Button, Card, IconButton, Text, Tooltip } from "@radix-ui/themes"
import { useAtom } from "jotai"
import { useFormStatus } from "react-dom"
import { EditTabGroup } from "../EditTabGroup"
import { editModeAtom } from "../EditTabs"
import { deleteTab } from "./deleteTab"

export function TabCardWrapper({
	entry,
	groups,
}: { entry: Tables<"Entries">; groups: Tables<"Entry Groups">[] }) {
	return (
		<form action={async () => await deleteTab(entry.id)}>
			<TabCard entry={entry} groups={groups} />
		</form>
	)
}

function TabCard({
	entry,
	groups,
}: { entry: Tables<"Entries">; groups: Tables<"Entry Groups">[] }) {
	const [editMode] = useAtom(editModeAtom)
	const { pending } = useFormStatus()
	return (
		<Card
			className="flex flex-col gap-4 relative"
			style={{ contain: "none", overflow: "visible" }}
		>
			{pending && (
				<div className="absolute top-0 left-0 size-full z-10 dark:bg-[rgba(0,0,0,0.5)] bg-[rgba(255,255,255,0.75)]" />
			)}
			{editMode && (
				<>
					<EditTabGroup groups={groups} entry={entry} disabled={pending} />
					<Tooltip content="Delete Tab">
						<IconButton
							radius="full"
							variant="surface"
							color="red"
							size="1"
							className="absolute -right-2 -top-2 z-50"
							type="submit"
							disabled={pending}
						>
							<Cross1Icon />
						</IconButton>
					</Tooltip>
				</>
			)}

			<div className="flex gap-4">
				{entry.album_cover && (
					<img
						src={entry.album_cover}
						alt={entry.title}
						className="size-24 rounded-md"
					/>
				)}
				<div className="flex flex-col gap-1">
					<Text weight="bold">{entry.title}</Text>
					<Text color="gray" size="2">
						{entry.artist}
					</Text>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button asChild variant="soft" color="blue" className="flex-1">
					<a href={entry.tab_url} target="_blank" rel="noreferrer">
						<RowsIcon />
						Tab
					</a>
				</Button>
				<Button variant="soft" asChild className="flex-1">
					<a href={entry.track_url} target="_blank" rel="noreferrer">
						<PlayIcon />
						Track
					</a>
				</Button>
			</div>
		</Card>
	)
}
