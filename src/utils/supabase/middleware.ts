import { env } from "@/utils/env"
import type { Database } from "@/utils/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export const updateSession = async (request: NextRequest) => {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClient<Database>(
		env.SUPABASE_URL,
		env.SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll()
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					)
					response = NextResponse.next({
						request,
					})
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					)
				},
			},
		},
	)

	// This will refresh session if expired - required for Server Components
	// https://supabase.com/docs/guides/auth/server-side/nextjs
	await supabase.auth.getUser()

	return response
}
