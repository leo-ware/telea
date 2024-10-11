import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";


const NewWorkCategoryPage = async () => {
    const client = createClient()
    const { data: workCategories, error } = await client
        .from("work_categories")
        .insert({ slug: "untitled" })
        .select()
        .single()

    if (error) {
        console.error(error)
        return <div>Error creating work category. Try again by reloading the page.</div>
    }

    return redirect(`/admin/work_categories/${workCategories?.id}`)
}

export default NewWorkCategoryPage;