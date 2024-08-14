"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteTab(id: number) {
	const supabase = createClient()

	try {
		const res = await supabase.from("Entries").delete().eq("id", id)

		if (res.error) return false
	} catch (e) {
		return false
	}
	revalidatePath("/")
	return true
}
