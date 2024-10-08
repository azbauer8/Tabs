import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get("code")

	if (code) {
		const supabase = createClient()
		const { error } = await supabase.auth.exchangeCodeForSession(code)
		if (!error) {
			return NextResponse.redirect(requestUrl.origin)
		}
	}

	return notFound()
}
