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
        <div className="">
            <div className="w-full flex flex-col items-center bg-[#ffb703] px-10 py-10">
                <div className={" font-bold text-[80px]"}>{workCategory.name}</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                    {workCategory.tagline}
                </div>
            </div>

            <img src="/img/speech_2.jpeg" className="w-full h-auto max-h-[700px] object-cover" />

            <div className={" font-thin text-[40px] p-10 md:px-40 leading-tight"}>
                <p className="mb-8 md:mb-4">
                    {workCategory.description}
                </p>
            </div>

            <div className="relative flex flex-col gap-12 grid grid-cols-12 py-20 leading-tight px-20 text-[24px]">
                {clientCategories?.map((clientCategory) => (
                    <>
                        <div className=" col-span-2 col-start-3 font-bold">{clientCategory.name}</div>
                        <div className="font-thin col-span-6 col-start-5">
                            <div>
                                {clientCategory.link_description}
                            </div>
                            <div className="mt-4">
                                <Link href={""} className="underline">{clientCategory.link_text}</Link>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default WorkCategoryPage
