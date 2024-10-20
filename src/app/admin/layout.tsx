import AccountWidget from "@/components/AccountWidget"
import LoginWidget from "@/components/LoginWidget"
import { createClient } from "@/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"


const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const client = createClient()
    const { data: { user } } = await client.auth.getUser()
    if (!user) {
        return redirect("/login")
    }
    return (
        <div className="w-full h-full min-h-screen bg-white">
            <div className="w-full p-8 h-16 shadow flex items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                    <Link href="/admin" className="text-2xl font-bold">Admin Dashboard</Link>
                    <Link href="/" className="text-gray-500 underline">Main Site</Link>
                </div>
                <div className="flex items-center gap-2">

                    <AccountWidget user={user} />
                </div>

            </div>
            <div className="p-20">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
