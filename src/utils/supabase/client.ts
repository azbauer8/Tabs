import { env } from "@/utils/env"
import type { Database } from "@/utils/supabase/types"
import { createBrowserClient } from "@supabase/ssr"

export const createClient = () =>
	createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
