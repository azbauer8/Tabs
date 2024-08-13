"use client"

import type { Tables } from "@/utils/supabase/types"
import { Cross1Icon, PlayIcon, RowsIcon } from "@radix-ui/react-icons"
import { Button, Card, IconButton, Text } from "@radix-ui/themes"
import { useAtom } from "jotai"
import { useFormStatus } from "react-dom"
import { editModeAtom } from "./EditEntries"
import { deleteEntry } from "./deleteEntry"

export function EntryCardWrapper({ entry }: { entry: Tables<"Entries"> }) {
	return (
		<form action={async () => await deleteEntry(entry.id)}>
			<EntryCard entry={entry} />
		</form>
	)
}

function EntryCard({ entry }: { entry: Tables<"Entries"> }) {
	const [editMode] = useAtom(editModeAtom)
	const { pending } = useFormStatus()
	return (
		<Card className="flex flex-col gap-4 relative">
			{pending && (
				<div className="absolute top-0 left-0 size-full z-10 dark:bg-[rgba(0,0,0,0.5)] bg-[rgba(255,255,255,0.75)]" />
			)}
			{editMode && (
				<IconButton
					radius="full"
					variant="surface"
					size="1"
					className="absolute right-1 top-1 z-20"
					type="submit"
					disabled={pending}
				>
					<Cross1Icon />
				</IconButton>
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
						Spotify
					</a>
				</Button>
			</div>
		</Card>
	)
}
