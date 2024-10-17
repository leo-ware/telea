import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const client = createClient()
    const {data, error} = await client
        .from("clients")
        .insert({name: "Untitled Client"})
        .select("*")
        .single()
    
    if (error || !data) {
        return (
            <div className="text-red-500">
                Error creating client. Reload to retry.
            </div>
        )
    }

    return redirect("/admin/clients/" + data.id)
}

export default Page