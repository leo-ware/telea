"use server"

import { createClient } from "@/supabase/server"

export const deleteEmployee = async (id: number) => {
    const client = createClient()
    const { error } = await client.from("employees").delete().eq("id", id)
    if (error) {
        throw error
    }
}