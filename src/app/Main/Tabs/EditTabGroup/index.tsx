"use client"

import { updateTabGroup } from "@/app/Main/Tabs/EditTabGroup/action"
import type { Tables } from "@/utils/supabase/types"
import { Pencil1Icon } from "@radix-ui/react-icons"
import {
	Button,
	Heading,
	IconButton,
	Popover,
	Select,
	Tooltip,
} from "@radix-ui/themes"
import { useState } from "react"
import { useFormStatus } from "react-dom"

export function EditTabGroup({
	entry,
	groups,
	disabled,
}: {
	entry: Tables<"Entries">
	groups: Tables<"Entry Groups">[]
	disabled: boolean
}) {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [selectedGroupId, setSelectedGroupId] = useState(
		groups.find((group) => group.id === entry.group_id)?.id.toString() ??
			"None",
	)

	return (
		<Popover.Root open={dialogOpen} onOpenChange={setDialogOpen}>
			<Tooltip content="Edit Tab's Group">
				<Popover.Trigger>
					<IconButton
						radius="full"
						variant="surface"
						color="amber"
						size="1"
						className="absolute right-6 -top-2 z-50"
						disabled={disabled}
						type="button"
					>
						<Pencil1Icon />
					</IconButton>
				</Popover.Trigger>
			</Tooltip>
			<Popover.Content className="w-64" align="center">
				<form
					className="flex flex-col gap-3"
					action={async () => {
						await updateTabGroup(entry.id, selectedGroupId)
						setDialogOpen(false)
					}}
				>
					<Heading size="4">Edit Tab Group</Heading>
					<Select.Root
						value={selectedGroupId}
						onValueChange={setSelectedGroupId}
					>
						<Select.Trigger className="min-w-full" />
						<Select.Content>
							<Select.Item value="None">None</Select.Item>
							{groups.map((group) => (
								<Select.Item value={group.id.toString()} key={group.id}>
									{group.title}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
					<div className="flex justify-end">
						<SaveButton />
					</div>
				</form>
			</Popover.Content>
		</Popover.Root>
	)
}

function SaveButton() {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" loading={pending} variant="soft">
			Save
		</Button>
	)
}
