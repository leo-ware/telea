
import Logo from "@/components/Logo"
import { FaArrowRight } from "react-icons/fa"
import Link from "next/link"

import doe from "./doe_logo.jpg"
import fds from "./fds_logo.png"
import tef from "./tef.jpeg"
import { alegraya } from "../../fonts"
import NumberGoUp from "@/components/NumberGoUp"

const highlightedClients = [
    {
        src: tef.src,
        tagLine: "Built and Managed Organization and Media Production",
        href: "/clients/families-individuals-and-foundations#tef"
    },
    {
        src: doe.src,
        tagLine: "Organizational Development, Fundraising and Campaign Management",
        href: "/clients/families-individuals-and-foundations#dfe",
    },
    {
        src: fds.src,
        tagLine: "Organizational Strategy, Fund Development and Visibility Enhancement",
        href: "/clients/non-profits#fds"
    }
]

export default function Home() {
    return (
        <main className={alegraya.className}>
            <div className="relative w-full h-lvh bg-black">
                <div className="z-20 absolute w-full h-full p-10 flex justify-start items-end">
                    <Logo width={300} />
                </div>
                <video
                    className="z-10 absolute w-full h-lvh object-cover"
                    src="/video/generic-landing.mp4"
                    autoPlay
                    loop
                    muted />
            </div>

            <div className={" text-[40px] p-10 md:px-40 bg-[#219ebc] text-white"}>
                <p className="mb-8 md:mb-4">
                    Accelerating impact for leaders championing social
                    justice, women, Africa, and nature.
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

            <div>
                <img src={"/img/Campus-overview.webp"} className="w-full" />
            </div>

            <div className="flex md:flex-row flex-col">
                <div className="md:w-1/2 text-[40px] p-10 md:px-20">
                    <p className="mb-4 ">
                        We consult for <Link className="underline" href="/clients/non-profits">nonprofits</Link>,{" "}
                        <Link className="underline" href="/clients/social-enterprises">social enterprises</Link> & {" "}
                        <Link className="underline" href="/clients/media-ventures">media ventures</Link>.
                    </p>

                    <Link href="/clients/impact-consulting" className="mt-8 flex items-center">
                        <div className="text-2xl md:mr-2 underline">Read about our impact consulting work</div>
                        <FaArrowRight size={24} />
                    </Link>
                </div>

                <div className="md:w-1/2 text-[40px] p-10 md:px-20">
                    <p className="mb-4">
                        We advise <Link className="underline" href="/clients/families-individuals-and-foundations">families, individuals & foundations</Link>.
                    </p>
                    <Link href="/clients/philanthropic-advising" className="mt-8 flex items-center">
                        <div className="text-2xl mr-2 underline">Read about our philanthropic advising work</div>
                        <FaArrowRight size={24} />
                    </Link>
                </div>
            </div>

            <div>
                <img src={"/img/from_nitin_2.jpeg"} className="w-full" />
            </div>

            <div className="text-[40px] p-10 md:px-40">
                <p className="mb-8 md:mb-4">
                    <div className="mb-8">Since 2015, we have</div>
                    <div className="flex justify-center">
                        <div className="w-full" data-aos="fade-left">
                            Worked with <NumberGoUp target={25} duration={1000}/> clients<br />
                            Worked in <NumberGoUp target={40} duration={1500} /> different countries<br />
                            Helped raise <NumberGoUp target={15} duration={500} />+ million dollars<br />
                            Reached <NumberGoUp target={400000} duration={3000}/> people
                        </div>
                    </div>
                </p>
                {/* <div className="mt-8 flex items-center">
                    <Link href={"/projects"} className="text-2xl mr-2 underline">Read more about our work</Link>
                    <FaArrowRight size={24} />
                </div> */}
            </div>

            <div className="text-[40px] p-10 md:px-20 border-t-4 border-blue-green">
                Client Highlights
            </div>

            <div className="flex md:flex-row flex-col">
                {highlightedClients.map(({ src, tagLine, href }) => (
                    <div className="flex flex-col justify-between md:w-1/3 text-3xl p-10 md:px-20 border-y-4 border-l-4 border-r-0 border-blue-green">
                        <div className="flex items-center w-full h-28">
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
                ))}
            </div>
        </main>
    )
}