import RollingImage from "@/components/RollingImage"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"
import Markdown from "react-markdown"

const Page = async ({ params }: { params: { "client-category-slug": string } }) => {
    const client = createClient()
    const { data: clientCategory, error } = await client
        .from("client_categories")
        .select("*")
        .eq("slug", params["client-category-slug"])
        .single()

    if (error || !clientCategory) {
        return redirect("/404")
    }

    const { data: clients, error: clientsError } = await client
        .from("clients")
        .select("*")
        .eq("category", clientCategory.id)

    if (clientsError || !clients) {
        console.log(clientsError)
    }

    return (
        <div className="">
            <div style={{ backgroundColor: clientCategory.backsplash }} className={`w-full flex flex-col items-center px-10 py-10`}>
                <div className={" text-center font-bold text-[80px]"}>{clientCategory.name}</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                    {clientCategory.tagline}
                </div>
            </div>

            <div className={" font-thin text-[40px] p-10 md:px-40 leading-tight"}>
                <p className="mb-8 md:mb-4">
                    {clientCategory.blurb}
                </p>
            </div>

            <div className="flex items-stretch text-[30px] px-10 md:px-40">
                <div className="flex items-center w-1/3 font-bold">
                    <div>What we can do</div>
                </div>
                <div className="pl-8 w-2/3 py-10 font-[400] leading-tight">
                    {clientCategory.capabilities?.split("\n").map(item => <div className="mt-1">{item}</div>)}
                </div>
            </div>

            {clients?.map(client => (
                <>
                    {client.img && <RollingImage imageSrc={client.img} desiredHeight={500} />}
                    <div id={client.id} className="flex text-[30px] p-10 md:px-40 border-black">
                        <div id="tef" className="w-1/3 font-bold">
                            <div>{client.name}</div>
                        </div>
                        <div className="w-2/3">
                            <div className="mb-4">
                                {client.project_name}
                            </div>
                            <div className="text-[18px]">
                                <Markdown>{client.project_description}</Markdown>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}

export default Page