import { createClient } from "@/supabase/server"
import Link from "next/link"


const Page = async () => {
    const client = createClient()
    const {data, error} = await client
        .from("client_categories")
        .select("*")
    
    if (error || !data) {
        console.log(error)
        return (
            <div>
                Error fetching data. Try again.
            </div>
        )
    }

    return (
        <div>
            <div>
                <div className="text-lg font-bold">Edit Client Categories</div>
            </div>
            <div className="my-4">
                {data.map((item, i) => (
                    <div key={i} className="flex flex-row gap-4">
                        <Link className="text-blue-500 underline" href={"/admin/client_categories/" + item.id}>{item.name}</Link>
                        {item.tagline}
                    </div>
                ))}
            </div>
            <div className="my-4">
                <Link href="/admin/client_categories/new" className="p-2 bg-blue-500 text-white rounded-md w-fit h-fit">
                    New
                </Link>
            </div>
        </div>
    )
}

export default Page