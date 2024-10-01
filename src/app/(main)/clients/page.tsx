import Block from "@/components/Block"
import Header from "@/components/Header"
import LittleLink from "@/components/LittleLink"
import PBlock from "@/components/PBlock"
import TextBlock from "@/components/TextBlock"
import TitleBar from "@/components/TitleBar"
import Link from "next/link"

import hippo from "./hippo.png"

const info = {
    "Non-Profits": {
        "href": "/clients/non-profits",
        "Catchline": "Empowering Non-Profits to Achieve Greater Impact",
        "Description": "Telea Insights provides strategic support, fundraising expertise, and operational efficiency solutions to help non-profits maximize their impact and achieve their missions.",
    },
    "Donors": {
        "href": "/clients/donors",
        "Catchline": "Guiding Donors to Make Informed Impact Investments",
        "Description": "We offer advisory services to donors, helping them identify and support high-impact initiatives that align with their philanthropic goals and values.",
    },
    "Media Ventures": {
        "href": "/clients/media-ventures",
        "Catchline": "Elevating Stories that Inspire and Transform",
        "Description": "Telea Insights partners with media ventures to produce compelling content that raises awareness and drives social change, from documentaries to digital campaigns.",
    },
    "Families and Individuals": {
        "href": "/clients/families-and-individuals",
        "Catchline": "Supporting Families and Individuals in Philanthropy",
        "Description": "We provide personalized consulting services to families and individuals, helping them create meaningful philanthropic strategies and achieve their charitable objectives.",
    },
    "Social Enterprises": {
        "href": "/clients/social-enterprises",
        "Catchline": "Scaling Social Enterprises for Sustainable Success",
        "Description": "We offer business development, strategic planning, and fundraising services to social enterprises, enabling them to grow sustainably and amplify their social impact.",
    },
    "Foundations": {
        "href": "/clients/foundations",
        "Catchline": "Strengthening Foundations for Greater Philanthropic Impact",
        "Description": "We work with foundations to enhance their grantmaking strategies, optimize their operations, and evaluate the impact of their philanthropic investments.",
    }
}

const Clients = () => {
    return (
        <div className="w-full h-full">
            <TitleBar backgroundImage={hippo.src}>
                Our Clients
            </TitleBar>

            <PBlock>
                Telea Insights provides strategic support, fundraising expertise, and operational
                efficiency solutions to help non-profits maximize their impact and achieve their missions.
            </PBlock>
        
            <div className="flex justify-center pb-20">
                <div className="flex flex-wrap gap-6 mx-6 md:mx-0 md:w-1/2 justify-between">
                    {Object.entries(info).map(([name, info]) => (
                        <div className="border border-gray-300 rounded shadow-lg p-4 w-80 h-fit">
                            <Link href={info.href} className="text-lg">
                                {name}
                            </Link>
                            <details className="text-sm">
                                <summary className=" my-2">{info.Catchline}</summary>
                                <div>{info.Description}</div>
                                <LittleLink href={info.href}>
                                    Read More
                                </LittleLink>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Clients