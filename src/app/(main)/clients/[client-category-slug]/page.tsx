import Blurb from "@/components/Blurb"
import Markdown from "@/components/Markdown"
import NewHeader from "@/components/NewHeader"
import RollingImage from "@/components/RollingImage"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

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
        .order("order", { ascending: true })

    if (clientsError || !clients) {
        console.log(clientsError)
    }

    return (
        <div className="">

            <NewHeader
                title={clientCategory.name || ""}
                subtitle={clientCategory.tagline || ""}
                backgroundColor={clientCategory.backsplash || ""}
            />

            <Blurb blurb={clientCategory.blurb || ""} />

            <div className="flex flex-col md:flex-row items-stretch font-thin text-[20px] md:text-[30px] lg:text-[40px] py-4 px-8 md:px-20 lg:px-40 leading-tight">
                <div className="flex items-center md:w-1/3 font-bold">
                    <div className="mb-2 md:mb-0">What we can do</div>
                </div>
                <div className="md:pl-8 md:w-2/3 pb-6 md:py-10 font-100 md:font-[400] leading-tight">
                    {clientCategory.capabilities?.split("\n").map(item => (
                        <div className="mt-2 md:mt-1">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {clients?.map(client => (
                <>
                    {client.img && <RollingImage imageSrc={client.img} desiredHeight={500} />}
                    <div id={client.id} className="flex flex-col lg:flex-row text-[30px] px-8 py-10 md:px-40 border-black">
                        <div id="tef" className="lg:w-1/3 font-bold mb-4 lg:mb-0">
                            <div>{client.name}</div>
                        </div>
                        <div className="lg:w-2/3">
                            <div className="mb-4">
                                {client.project_name}
                            </div>
                            <div className="text-[18px]">
                                <Markdown content={client.project_description || ""} />
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}

export default Page