"use server"

import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export const deleteEvent = async (event_id: number) => {
    console.log("deleting event", event_id)
    console.log(typeof event_id)
    const client = createClient()
    const { error } = await client
        .from('events')
        .delete()
        .eq('id', event_id)
    if (error) {
        console.error(error)
    }
    return redirect("/admin/events")
}