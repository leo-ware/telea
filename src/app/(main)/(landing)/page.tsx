
import Logo from "@/components/Logo"
import { FaArrowRight } from "react-icons/fa"
import Link from "next/link"

import { alegraya } from "../../fonts"
import NumberGoUp from "@/components/NumberGoUp"
import BigCaptionedImage from "@/components/BigCaptionedImage"
import { createClient } from "@/supabase/client"
import LandingVideo from "./LandingVideo"

export default async function Home() {
    const client = createClient()

    const [
        { data: workCategories, error: workCategoriesError },
        { data: featuredClients, error: featuredClientsError }
    ] = await Promise.all([
        client.from("work_categories").select("*").order("order"),
        client.from("featured_clients").select("*, clients(name, client_categories(slug))").order("order")
    ])

    if (workCategoriesError) {
        console.log(workCategoriesError)
    }

    if (featuredClientsError) {
        console.log(featuredClientsError)
    }

    return (
        <main className={alegraya.className}>
            <div className="relative w-full h-lvh bg-black">
                <div className="z-20 absolute w-full h-full p-10 flex justify-start items-end">
                    <Logo width={300} />
                </div>
                <LandingVideo />
            </div>

            <div className={" text-[40px] p-10 md:px-40 bg-[#219ebc] text-white"}>
                <p className="mb-8 md:mb-4">
                    Accelerating impact for philanthropic and non-profit leaders.
                </p>
                <p>
                    Telea Insights empowers leaders with strategy,
                    resources, and systems design to launch ventures
                    that drive positive change.
                </p>
                <div className="mt-8 flex items-center">
                    <Link href="/about" className="text-2xl mr-2 underline">Read more about us</Link>
                    <FaArrowRight size={24} />
                </div>
            </div>

            <BigCaptionedImage name="landing_img_1" />

            <div className="flex md:flex-row flex-col">
                {(workCategories || []).slice(0, 2).map(each => (
                    <div className="md:w-1/2 text-[40px] p-10 md:px-20 flex flex-col justify-between">
                        <p className="mb-4">
                            {each.landing_page_description}
                        </p>
                        <Link href={`/work/${each.slug}`} className="mt-8 flex items-center">
                            <div className="text-2xl mr-2 underline">{each.landing_page_link_text}</div>
                            <FaArrowRight size={24} />
                        </Link>
                    </div>
                ))}
                {/* <div className="md:w-1/2 text-[40px] p-10 md:px-20 flex flex-col justify-between">
                    <p className="mb-4">
                        We advise <Link className="" href="/clients/families-individuals-and-foundations">families, individuals & foundations</Link>.
                    </p>
                    <Link href="/work/philanthropic-advising" className="mt-8 flex items-center">
                        <div className="text-2xl mr-2 underline">Read about our philanthropic advising work</div>
                        <FaArrowRight size={24} />
                    </Link>
                </div>

                <div className="md:w-1/2 text-[40px] p-10 md:px-20 flex flex-col justify-between">
                    <p className="mb-4 ">
                        We consult for <Link className="" href="/clients/non-profits">non-profits</Link>,{" "}
                        <Link className="" href="/clients/social-enterprises">social enterprises</Link> & {" "}
                        <Link className="" href="/clients/media-ventures">media ventures</Link>.
                    </p>

                    <Link href="/work/impact-consulting" className="mt-8 flex items-center">
                        <div className="text-2xl md:mr-2 underline">Read about our impact consulting work</div>
                        <FaArrowRight size={24} />
                    </Link>
                </div> */}
            </div>

            {/* <div>
                <img src={"/img/from_nitin_2.jpeg"} className="w-full" />
            </div> */}

            <BigCaptionedImage name="landing_img_2" />

            <div className="text-[40px] p-10 md:px-40">
                <div className="mb-8 md:mb-4">
                    <div className="mb-8">Since 2023, we have</div>
                    <div className="flex justify-center">
                        <div className="w-full" data-aos="fade-left">
                            Worked with <NumberGoUp target={15} duration={1000} /> clients<br />
                            Worked in <NumberGoUp target={50} duration={1500} />+ countries<br />
                            Helped raise and deploy <NumberGoUp target={15} duration={500} />+ million dollars<br />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    Telea Insights has partnered with organizations
                    worldwide to transform resources into
                    meaningful change, advancing equity, resilience, and
                    sustainability for social and environmental progress.
                </div>
            </div>

            <BigCaptionedImage name="landing_img_3" />

            <div id="client-highlights" className="text-[40px] py-4 md:py-10 px-10 md:px-20 font-bold">
                Client Highlights
            </div>

            <div className="flex md:flex-row flex-col">
                {/* {highlightedClients.map(({ src, tagLine, href }) => (
                    <div className="flex flex-col justify-between md:w-1/3 text-3xl p-10 md:px-20">
                        <div className="flex items-center w-full max-w-[350px] min-w-[200px] h-auto">
                            <img className="w-full object-fit" src={src} />
                        </div>
                        <div className="my-8">{tagLine}</div>
                        <div className={"grow"} />
                        <div className="flex items-center w-fill">
                            <Link href={href}>
                                <FaArrowRight size={42} />
                            </Link>
                        </div>
                    </div>
                ))} */}
                {(featuredClients || []).map(client => (
                    <div className="flex flex-col justify-between md:w-1/3 text-3xl p-10 md:px-20">
                    <div className="flex items-center w-full max-w-[350px] min-w-[200px] h-auto">
                        <img className="w-full object-fit" src={client.img || ""} />
                    </div>
                    <div className="my-8">{client.description}</div>
                    <div className={"grow"} />
                    <div className="flex items-center w-fill">
                        <Link href={`/clients/${client.clients?.client_categories?.slug}#${client.client_id}`}>
                            <FaArrowRight size={42} />
                        </Link>
                    </div>
                </div>
                ))}
            </div>
        </main>
    )
}