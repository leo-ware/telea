"use server"

import { createClient } from "@/supabase/server"

export const getSpecialImage = async (name: string) => {
    const client = createClient()
    const { data, error } = await client
        .from("special_images")
        .select("*")
        .eq("name", name)
        .single()
    
    if (error) {
        console.error(error)
        return null
    }
    return data
}