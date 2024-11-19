import { createClient } from "@/supabase/server"


const Inbox = async () => {
    const client = await createClient()
    const { data, error } = await client.from("inbox").select("*")

    if (error) {
        console.error(error)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Inbox</h1>
            <div className="flex flex-col gap-4">
                {data?.map((item) => (
                    <div>
                        <details>
                            <summary>{new Date(item.created_at).toLocaleString()} - {item.name} - {item.purpose}</summary>
                            <div className="flex flex-col gap-2 ml-4">
                                <div className="text-sm text-gray-500">{item.email}</div>
                                <div>{item.message}</div>
                            </div>

                        </details>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Inbox