import { createClient } from "@/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

const WorkCategoryPage = async ({ params }: { params: { work_category_slug: string } }) => {
    const client = createClient()

    const { data: workCategory, error } = await client
        .from("work_categories")
        .select("*")
        .eq("slug", params.work_category_slug)
        .single()

    if (error || !workCategory) {
        console.log(error)
        return redirect("/404")
    }

    const { data: clientCategories, error: clientCategoriesError } = await client
        .from("client_categories")
        .select("*")
        .eq("work_category_id", workCategory.id)

    if (clientCategoriesError) {
        console.log(clientCategoriesError)
    }

    return (
        <div className="w-full">
            <div className="w-full flex flex-col items-center px-10 py-10" style={{ backgroundColor: workCategory.backsplash }}>
                <div className={" font-bold text-[50px] md:text-[80px] leading-tight"}>{workCategory.name}</div>

                <div className={" text-[25px] font-[100] mt-4 md:mt-[-15px]"}>
                    {workCategory.tagline}
                </div>
            </div>

            {workCategory.img && <img src={workCategory.img} className="w-full h-auto max-h-[700px] object-cover" />}

            <div className={" font-thin text-[30px] md:text-[40px] py-4 px-4 md:px-40 leading-tight"}>
                <p className="mb-4">
                    {workCategory.description}
                </p>
            </div>

            <div className="relative flex flex-col gap-8 md:gap-12 lg:grid lg:grid-cols-12 pb-6 md:py-20 leading-tight px-4 md:px-20 text-[24px]">
                {clientCategories?.map((clientCategory) => (
                    <>
                        <div className="col-span-2 col-start-3 font-bold">{clientCategory.name}</div>
                        <div className="font-thin col-span-12 col-start-5 mb-8">
                            <div>
                                {clientCategory.link_description}
                            </div>
                            <div className="mt-4">
                                <Link href={`/clients/${clientCategory.slug}`} className="underline">{clientCategory.link_text}</Link>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default WorkCategoryPage
