"use server"

import { env } from "@/utils/env"
import { createClient } from "@/utils/supabase/server"
import { parseWithZod } from "@conform-to/zod"
import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import { revalidatePath } from "next/cache"
import { schema } from "./schema"

export async function createEntry(formData: FormData) {
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

	const { tabURL, trackURL } = submission.value
	const trackId = trackURL.match(/\/track\/([^?]+)/)?.[1] ?? null

	if (!trackId) {
		return false
	}

	const api = SpotifyApi.withClientCredentials(
		env.SPOTIFY_CLIENT_ID,
		env.SPOTIFY_CLIENT_SECRET,
	)

	try {
		const track = await api.tracks.get(trackId)
		const res = await supabase.from("Entries").insert({
			tab_url: tabURL,
			track_url: trackURL,
			user_id: user.id,
			title: track.name,
			artist: track.artists.map((artist) => artist.name).join(", "),
			album_cover: track.album.images[0].url,
		})

		if (res.error) return false
	} catch (e) {
		return false
	}
	revalidatePath("/")
	return true
}
