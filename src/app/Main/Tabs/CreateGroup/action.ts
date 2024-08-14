"use server"

import { createClient } from "@/utils/supabase/server"
import { parseWithZod } from "@conform-to/zod"
import { revalidatePath } from "next/cache"
import { schema } from "./schema"

export async function createGroup(formData: FormData) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const submission = parseWithZod(formData, {
		schema: schema,
	})

	if (submission.status !== "success" || !user) {
		return submission.reply()
	}

	const { title } = submission.value

	try {
		const res = await supabase.from("Entry Groups").insert({
			title,
			user_id: user.id,
		})

		if (res.error) return false
	} catch (e) {
		return false
	}
	revalidatePath("/")
	return true
}
