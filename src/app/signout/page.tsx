"use client"

import { createClient } from "@/supabase/client"
import { useEffect } from "react"
import { ImSpinner2 } from "react-icons/im"

const SignoutPage = () => {
    const client = createClient()

    useEffect(() => {
        client.auth.signOut().then(() => {
            window.location.href = "/"
        })
    }, [])
    
    return <div className="w-full h-full flex items-center justify-center gap-2">
        <ImSpinner2 className="animate-spin text-4xl" />
        <div className="text-2xl font-bold">Signing you out...</div>
    </div>
}

export default SignoutPage