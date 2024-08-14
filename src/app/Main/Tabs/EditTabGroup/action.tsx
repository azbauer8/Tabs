"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateTabGroup(entryId: number, groupId: string) {
	const supabase = createClient()
	try {
		const validatedGroupId =
			groupId === "None" ? null : Number.parseInt(groupId)
		const res = await supabase
			.from("Entries")
			.update({
				group_id: validatedGroupId,
			})
			.eq("id", entryId)

		if (res.error) return false
	} catch (e) {
		return false
	}
	revalidatePath("/")
	return true
}
