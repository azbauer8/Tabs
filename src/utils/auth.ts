"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn() {
	const origin = headers().get("origin")
	const supabase = createClient()

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "spotify",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	})

	if (error) {
		console.error(error)
		return redirect("/")
	}

	redirect(data.url)
}

export async function signOut() {
	const supabase = createClient()

	await supabase.auth.signOut()
	revalidatePath("/", "layout")
	return redirect("/")
}
