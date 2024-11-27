"use server"

import { createClient } from "@/supabase/server"
import { NextResponse } from "next/server"

// supabase deactivates after one week of inactivity
// this cron job will keep it alive

export async function GET() {
    const client = createClient()
    const { error } = await client.from("check_ins").insert({})
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ message: "Hello, world!" })
}