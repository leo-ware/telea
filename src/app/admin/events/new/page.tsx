import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"


const NewEventPage = async () => {
    const client = createClient()
    const {data, error} = await client.from('events').insert({}).select("*").single()
    if (error) {
        throw new Error(error.message)
    }
    return redirect(`/admin/events/${data.id}`)
}

export default NewEventPage