"use client"

import { editModeAtom } from "@/app/Main/Tabs/EditTabs"
import { deleteTabGroup } from "@/app/Main/Tabs/TabGrid/deleteTabGroup"
import { Button } from "@radix-ui/themes"
import { useAtom, useSetAtom } from "jotai"

export function DeleteTabGroupButton({ groupId }: { groupId: number }) {
	const [editMode] = useAtom(editModeAtom)
	if (editMode)
		return (
			<form action={async () => await deleteTabGroup(groupId)}>
				<Button type="submit" variant="soft" color="red">
					Delete Group
				</Button>
			</form>
		)
}
