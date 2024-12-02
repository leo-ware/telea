import AccountWidget from "@/components/AccountWidget"
import LoginWidget from "@/components/LoginWidget"
import { createClient } from "@/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { MdHome, MdLogout, MdOutlinePreview } from "react-icons/md"


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
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="hidden md:block text-2xl font-bold">Admin Dashboard</div>
                        <MdHome size={24} className="md:hidden" />
                    </Link>
                    <Link href="/" className="text-gray-500 underline">
                        <div className="hidden md:block">Main Site</div>
                        <MdOutlinePreview size={24} className="md:hidden" />
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-xs md:text-base">{user.email}</div>
                    <Link href="/signout">
                        <MdLogout size={24} />
                    </Link>
                </div>

            </div>
            <div className="md:p-20 p-8">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
