import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export default async function ExternalPage({ params }: { params: { id: string } }) {
    const client = createClient()
    console.log(params.id)
    const { data, error } = await client
        .from("external_links")
        .select("*")
        .eq("name", params.id)
        .single()

    if (error) {
        console.error(error)
        return <div>Error loading external link, try again</div>
    }

    return redirect(data.url)
}