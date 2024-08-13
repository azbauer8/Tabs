import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	server: {
		SUPABASE_URL: z.string().url(),
		SUPABASE_ANON_KEY: z.string().min(1),
		SPOTIFY_CLIENT_ID: z.string().min(1),
		SPOTIFY_CLIENT_SECRET: z.string().min(1),
	},
	runtimeEnv: {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
		SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
		SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
	},
})
