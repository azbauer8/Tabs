"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteTabGroup(groupId: number) {
	const supabase = createClient()

	try {
		const res = await supabase.from("Entry Groups").delete().eq("id", groupId)

		if (res.error) return false
	} catch (e) {
		return false
	}
	revalidatePath("/")
	return true
}
