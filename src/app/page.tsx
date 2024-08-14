import { createClient } from "@/utils/supabase/server"
import { LandingPage } from "./Landing/LandingPage"
import { MainLayout } from "./Main/MainLayout"

export default async function Home() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) return <LandingPage />

	return <MainLayout user={user} />
}
