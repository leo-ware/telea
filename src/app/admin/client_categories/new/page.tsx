import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const client = createClient()
    const {data, error} = await client
        .from("client_categories")
        .insert({name: "Untitled Client Category"})
        .select("*")
        .single()

    if (error || !data) {
        return (
            <div className="text-red-500">
                Error creating new client category. Reload the page to retry.
            </div>
        )
    }
    
    return redirect("" + data.id)
}

export default Page