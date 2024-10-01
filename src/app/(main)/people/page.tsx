import Image from "next/image"
import TitleBar from "@/components/TitleBar"
import { ppl } from "./info"
import { crimson_pro, noto_serif } from "@/app/fonts"
import { FaArrowRight, FaLinkedin } from "react-icons/fa6"
import Link from "next/link"
import { createClient } from "@/supabase/server"

const imageWidths = 175
const People = async () => {
    const client = createClient()
    const { data, error } = await client.from("employees").select("*").order("order", { ascending: true })
    if (error) {
        return <div>Error loading employees</div>
    }
    return (
        <div className=" ">
            <div className="w-full flex flex-col items-center px-10 md:py-10">

                <div className="text-[80px] mb-4">Our Team</div>
                <div className="w-full md:w-8/12 border-b border-black" />
            </div>

            <div className="flex flex-col items-center">
                <div className="p-6 md:w-1/2">
                    {data.map((person) => (
                        <div className="flex flex-col md:flex-row my-6 gap-6 justify-between items-start">
                            <div className="w-fit pt-2 shrink-0">
                                {person.img && <img
                                    src={person.img}
                                    alt={person.name + " picture"}
                                    className={`object-fit w-[${imageWidths}] h-[${imageWidths}]`}
                                    width={imageWidths}
                                    height={imageWidths}
                                />}
                            </div>

                            <div className="grow">
                                <div className="mb-2 flex items-center">
                                    <div>
                                        <span className="text-2xl font-bold">
                                            {person.name}
                                        </span>
                                        {person.title && (
                                            <span className="text-2xl">
                                                , {person.title}
                                            </span>
                                        )}
                                    </div>
                                    {person.linkedin &&
                                        <Link className="ml-2" href={person.linkedin} target="_blank">
                                            <FaLinkedin size={20} />
                                        </Link>}
                                </div>

                                <div>
                                    {person.bio}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                <Link href="/careers" className="text-xl font-bold flex gap-4 items-center mb-10">
                    Join Our Team <FaArrowRight />
                </Link>
            </div>
        </div>
    )
}

export default People