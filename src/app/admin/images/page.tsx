import { createClient } from "@/supabase/server"
import Link from "next/link"


const AdminImages = async () => {
    const client = createClient()
    const { data, error } = await client
        .from("special_images")
        .select("*")

    if (error) {
        console.error(error)
        return <div>Error loading images, try again</div>
    }

    return (
        <div>
            <div className="text-2xl font-bold">Images</div>
            <div className="text-sm text-gray-500">Manage images in key locations on the site</div>
            <table className="w-full max-w-[400px] mt-10 text-sm">
                <thead>
                    <tr>
                        <th className="w-1/3 text-left">Name</th>
                        <th className="w-2/3 text-left">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((image) => (
                        <tr key={image.name}>
                            <td className="w-1/3">
                                <Link href={`/admin/images/${image.name}`} className="text-blue-500 underline">
                                    {image.name}
                                </Link>
                            </td>
                            <td className="w-2/3">{image.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminImages