"use client"

import { createClient } from "@/supabase/client"
import { User } from "@supabase/supabase-js"
import Link from "next/link"

const AccountWidget = (props: { user: User }) => {
    const client = createClient()
    return (
        <div className="flex items-center gap-2">
            <Link href="/admin">
                {props.user.email}
            </Link>
            <button
                className="underline"
                onClick={() => {
                    client.auth.signOut().then(() => {
                        window.location.href = "/"
                    })
                }}>
                Logout
            </button>
        </div>
    )
}

export default AccountWidget