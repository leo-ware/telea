import { createClient } from "@/supabase/server";
import Link from "next/link";


const WorkCategoriesPage = async () => {
    const client = createClient();

    const { data: workCategories, error } = await client
        .from("work_categories")
        .select("*")

    if (error) {
        console.error(error)
        return <div>Error fetching work categories. Try again.</div>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Work Categories</h1>
            <div className="my-4">
                {!workCategories || workCategories.length === 0 && <div className="italic">No work categories found</div>}
                {workCategories?.map((workCategory) => (
                    <div key={workCategory.id} className="my-4 flex gap-4 items-center">
                        <Link href={`/admin/work_categories/${workCategory.id}`} className="text-blue-500 underline">
                            {workCategory.name}
                        </Link>

                        <div className="text-sm text-gray-500">
                            {workCategory.tagline?.slice(0, 50)}
                            {(workCategory.tagline?.length || 0) > 50 && "..."}
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/admin/work_categories/new">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    New
                </button>
            </Link>
        </div>
    )
}

export default WorkCategoriesPage;
