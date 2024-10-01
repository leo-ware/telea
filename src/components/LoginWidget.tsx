"use client"

import { createClient } from "@/supabase/client"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MdLogin } from "react-icons/md"

const LoginWidget = () => {
    const client = createClient()
    const [user, setUser] = useState<User | null | undefined>(undefined)

    useEffect(() => {
        client.auth.getUser().then((user) => {
            setUser(user.data.user)
        })
    }, [])

    return (
        <div className="flex gap-2 relative w-fit h-fit items-center">
            {user === null &&
                <MdLogin
                    size={20}
                    color="white"
                    onClick={() => {
                        client.auth.signInWithOAuth({
                            provider: "google",
                            options: {
                                redirectTo: "/admin"
                            }
                        })
                    }}
                />
            }
            {!!user && (
                <Link className="text-sm text-white underline" href="/admin">
                    Go To Admin Dashboard
                </Link>
            )}
        </div >
    )
}

export default LoginWidget