import Link from "next/link"
import Logo from "./Logo"
import { FaArrowRight } from "react-icons/fa6"
import { createClient } from "@/supabase/server"

const footerLinks = {
    "Impact Consulting": [
        { name: "Non Profits", href: "/clients/non-profits" },
        { name: "Social Enterprises", href: "/clients/social-enterprises" },
        { name: "Media Ventures", href: "/clients/media-ventures" },
    ],
    "Philanthropic Advising": [
        // { name: "", href: "/clients/families-and-individuals" },
        // { name: "Donors", href: "/clients/donors" },
        { name: "Families, Individuals and Foundations", href: "/clients/families-individuals-and-foundations" },
    ],
    "Company": [
        { name: "Events", href: "/events" },
        { name: "Careers", href: "/careers" },
        { name: "People", href: "/people" },
    ],
}

const Footer = async () => {
    const client = createClient()

    const [
        { data: workCategories, error: workCategoriesError },
        { data: clientCategories, error: clientCategoriesError }
    ] = await Promise.all([
        client.from("work_categories").select("*").order("order"),
        client.from("client_categories").select("*")
    ])

    if (workCategoriesError || !workCategories) {
        console.log(workCategoriesError)
    }

    if (clientCategoriesError || !clientCategories) {
        console.log(clientCategoriesError)
    }

    return (
        <div className="w-full h-fit p-10 md:px-44 flex gap-4 md:gap-0 flex-col lg:flex-row justify-between bg-black text-white">
            <div className="md:ml-10 w-7/12 h-fit flex flex-col md:flex-row gap-1 md:gap-8">
                {(workCategories || []).map((workCategory) => {
                    const myClients = clientCategories
                        ?.filter((clientCategory) => clientCategory.work_category_id === workCategory.id)
                        ?.toSorted((a, b) => (a.order || 0) - (b.order || 0))
                    return (
                        <div className="basis-fit grow mb-4" key={workCategory.id}>
                            <div className="text-lg md:font-bold md:mb-4">
                                <Link href={"/work/" + workCategory.slug}>
                                    {workCategory.name}
                                </Link>
                            </div>
                            <div className="text-md pl-4 md:pl-0 flex flex-col gap-1 md:gap-2">
                                {(myClients || []).map((clientCategory) => (
                                    <Link href={"/clients/" + clientCategory.slug} className="max-w-44">
                                        {clientCategory.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                })}

                <div className="basis-fit grow mb-4">
                    <div className="text-lg md:font-bold md:mb-4">
                        <Link href="/about">
                            Company
                        </Link>
                    </div>
                    <div className="text-md pl-4 md:pl-0 flex flex-col gap-1 md:gap-2">
                        <Link href={"/events"} className="max-w-44">
                            Events
                        </Link>
                        <Link href={"/careers"} className="max-w-44">
                            Careers
                        </Link>
                        <Link href={"/people"} className="max-w-44">
                            People
                        </Link>
                    </div>
                </div>

            </div>

            <div>
                <Link href="/">
                    <Logo width={150} />
                </Link>
                <Link href="/contact" className="flex items-center text-lg gap-4 md:ml-[32px] mt-2">
                    Contact Us <FaArrowRight />
                </Link>
                <div className="flex items-center text-lg gap-4 md:ml-[32px] mt-4 text-xs">© {new Date().getFullYear()} Telea Insights</div>
            </div>
        </div>
    )
}

export default Footer