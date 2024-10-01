import Link from "next/link"
import Logo from "./Logo"
import { FaArrowRight } from "react-icons/fa6"

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

const Footer = () => {
    return (
        <div className="w-full h-fit p-10 md:px-44 flex gap-4 md:gap-0 flex-col md:flex-row justify-between bg-black text-white">
            <div className="md:ml-10 w-7/12 h-fit flex flex-col md:flex-row gap-1 md:gap-8">
                {Object.entries(footerLinks).map(([top, more]) => (
                    <div className="basis-fit grow mb-4" key={top}>
                        <div className="text-lg md:font-bold md:mb-4">
                            <Link href={top == "Company"? "/about" :"/clients/" + top.toLowerCase().replace(/\s/g, "-")}>
                                {top}
                            </Link>
                        </div>
                        <div className="text-md pl-4 md:pl-0 flex flex-col gap-1 md:gap-2">
                            {more.map(({ name, href }) => (
                                <Link href={href} className="max-w-44">
                                    {name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            <div>
                <Link href="/">
                    <Logo width={150} />
                </Link>
                <Link href="/contact" className="flex items-center text-lg gap-4 md:ml-[32px] mt-2">
                    Contact Us <FaArrowRight />
                </Link>
            </div>


        </div>
    )
}

export default Footer