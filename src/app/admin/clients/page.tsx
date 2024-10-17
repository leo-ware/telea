import { createClient } from "@/supabase/server"
import Link from "next/link"



const Page = async () => {
    const client = createClient()
    const { data, error } = await client
        .from("clients")
        .select("*, client_categories(name)")
        .order("name", { ascending: true })

    if (error || !data) {
        return (
            <div className="text-red-500">
                Error fetching.
            </div>
        )
    }

    return (
        <div>
            <div className="text-2xl font-bold">
                Edit Clients
            </div>
            <div className="my-8">
                {data.map((item) => (
                    <div key={item.id} className="flex flex-row gap-8">
                        <Link className="text-blue-500 underline" href={`/admin/clients/${item.id}`}>
                            {item.name}
                        </Link>
                        {item.client_categories?.name}
                    </div>
                ))}
                {!data.length && <div className="italic">No Clients Found</div>}
            </div>
            <Link className="text-white bg-blue-500 p-2 rounded-md" href="/admin/clients/new" prefetch={false}>
                New
            </Link>
        </div>
    )
}

export default Page