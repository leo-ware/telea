"use client"

import { createClient } from "@/supabase/client"
import { useState } from "react"
import { FaGoogle } from "react-icons/fa"

const Page = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const next = (typeof searchParams.next === "string" && searchParams.next.length > 0) ? searchParams.next : "/admin"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const googleLogin = () => {
        const client = createClient()
        client.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "/admin"
            }
        })
    }

    const login = () => {
        const client = createClient()
        client.auth.signInWithPassword({
            email,
            password
        }).then(({data, error}) => {
            if (error) {
                console.error(error)
            } else {
                // @ts-ignore
                window.location = next
            }
        })
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white">
            <div className="w-fit h-fit flex flex-col gap-4 py-8 px-16 border border-gray-300 rounded-md">
                <div className="text-2xl font-bold">Login</div>
                <div className="text-sm font-thin">
                    Login to the admin dashboard
                </div>
                <div className="flex flex-col items-center justify-stretch gap-2">
                    <div onClick={googleLogin} className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md">
                        <FaGoogle />
                        <div>Login with Google</div>
                    </div>
                    <div className="text-sm text-gray-500">~ or ~</div>
                    <div className="flex flex-col items-stretch justify-stretch gap-2">
                        <input
                            type="text"
                            placeholder="Email"
                            className="px-4 py-2 border border-gray-300 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="px-4 py-2 border border-gray-300 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={() => (password.length > 0 && email.length > 0) && login()}
                            className={"px-4 py-2 border border-gray-300 rounded-md " + (password.length > 0 && email.length > 0 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500")}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page