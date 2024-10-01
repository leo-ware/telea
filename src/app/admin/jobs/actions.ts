"use server"

import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export const deleteJob = async (job_id: string) => {
    const client = await createClient()
    const { error } = await client.from("jobs").delete().eq("id", job_id)
    if (error) {
        throw new Error(error.message)
    }

    return redirect("/admin/jobs")
}