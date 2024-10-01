import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"


export const GET = async () => {
    const client = createClient()
    const { data, error } = await client.from("jobs").insert({}).select("id").single()
    if (error) {
        return new Response(error.message, { status: 500 })
    }
    return redirect(`/admin/jobs/${data.id}`)
}