import { z } from "zod"

export const schema = z.object({
	tabURL: z.string().url(),
	trackURL: z.string().url().startsWith("https://open.spotify.com/track/", {
		message: "Invalid Spotify Track URL",
	}),
})
