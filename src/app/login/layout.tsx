import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"


const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
    const client = createClient()
    const { data: { user } } = await client.auth.getUser()
    if (user) {
        redirect("/admin")
    }
    return <>{children}</>
}

export default LoginLayout