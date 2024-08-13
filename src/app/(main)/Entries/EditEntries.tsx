"use client"

import { CheckIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { atom, useAtom } from "jotai"

export const editModeAtom = atom(false)

export function EditEntries() {
	const [editMode, setEditMode] = useAtom(editModeAtom)

	if (editMode) {
		return (
			<Button variant="soft" color="gray" onClick={() => setEditMode(false)}>
				<CheckIcon />
				Stop Editing
			</Button>
		)
	}

	return (
		<Button variant="soft" color="gray" onClick={() => setEditMode(true)}>
			<Pencil2Icon />
			Edit Entries
		</Button>
	)
}
