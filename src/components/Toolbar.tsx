"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FaYoutube } from "react-icons/fa"
import { FaInstagram, FaLinkedin } from "react-icons/fa6"
import { GoSun } from "react-icons/go"
import { IoIosSend, IoMdArrowDropdown, IoMdArrowDropright, IoMdClose } from "react-icons/io"
import { IoSend } from "react-icons/io5"
import { LuSendHorizonal } from "react-icons/lu"
import { MdAccountCircle } from "react-icons/md"
import LoginWidget from "./LoginWidget"

const Toolbar = () => {
    const [open, setOpen] = useState(false)
    const [over, setOver] = useState(false)
    const [consultingOpen, setConsultingOpen] = useState(false)
    const [advisingOpen, setAdvisingOpen] = useState(false)

    useEffect(() => {
        if (!open) {
            setAdvisingOpen(false)
            setConsultingOpen(false)
            setOver(false)
        }
    }, [open])

    return (
        <div
            onMouseEnter={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            tabIndex={0}
            onBlur={() => {
                if (!over) {
                    setOpen(false)
                }
            }}
            className={"z-50 fixed top-0 right-0 " +
                (open ? "w-full md:w-1/3 h-lvh" : "w-fit h-fit")}>

            {!open &&
                <div
                    className="relative right-4 top-4 hover:animate-spin"
                    onClick={() => setOpen(true)}>
                    <GoSun color={"#FFE100"} size={60} strokeWidth={1} />
                </div>
            }

            {open &&
                <div className={"relative w-full h-full h-lvw bg-blue-900 text-white "}>
                    <div
                        className="z-20 absolute right-4 top-4"
                        onClick={() => { setOpen(false) }}>
                        <IoMdClose color={"white"} size={60} strokeWidth={3} />
                    </div>
                    <div className="z-10 absolute w-full h-full flex flex-col justify-between p-16">
                        <div className="w-full h-full flex flex-col justify-start">
                            <div className="mb-6">
                                <div
                                    className={"my-2 text-2xl "}
                                    onClick={() => setOpen(false)}>
                                    <Link href={"/"}>
                                        Home
                                    </Link>
                                </div>

                                <div
                                    className={"my-2 text-2xl "}
                                    onClick={() => setOpen(false)}>
                                    <Link href={"/about"}>
                                        About
                                    </Link>
                                </div>

                                <div className={"my-2 text-2xl ml-[-8px]"}>
                                    <div className="flex items-center">
                                        <div onClick={() => setConsultingOpen(!consultingOpen)}>
                                            {consultingOpen
                                                ? <IoMdArrowDropdown />
                                                : <IoMdArrowDropright />}
                                        </div>
                                        <Link href={"/clients/impact-consulting"} onClick={() => setOpen(false)}>
                                            Impact Consulting
                                        </Link>
                                    </div>
                                    {consultingOpen &&
                                        <div className="pl-8 flex flex-col">
                                            <Link className="w-fit" href={"/clients/non-profits"} onClick={() => setOpen(false)}>
                                                Non Profits
                                            </Link>
                                            <Link className="w-fit" href={"/clients/social-enterprises"} onClick={() => setOpen(false)}>
                                                Social Enterprises
                                            </Link>
                                            <Link className="w-fit" href={"/clients/media-ventures"} onClick={() => setOpen(false)}>
                                                Media Ventures
                                            </Link>
                                        </div>}
                                </div>

                                <div className={"my-2 text-2xl ml-[-8px]"}>
                                    <div className="flex items-center">
                                        <div onClick={() => setAdvisingOpen(!advisingOpen)}>
                                            {advisingOpen
                                                ? <IoMdArrowDropdown />
                                                : <IoMdArrowDropright />}
                                        </div>
                                        <Link href={"/clients/philanthropic-advising"} onClick={() => setOpen(false)}>
                                            Philanthropic Advising
                                        </Link>
                                    </div>
                                    {advisingOpen &&
                                        <div className="pl-8 flex flex-col">
                                            <Link className="w-fit" href={"/clients/families-individuals-and-foundations"} onClick={() => setOpen(false)}>
                                                Families, Individuals and Foundations
                                            </Link>
                                        </div>}
                                </div>

                                <div
                                    className={"my-2 text-2xl "}
                                    onClick={() => setOpen(false)}>
                                    <Link href={"/people"}>
                                        People
                                    </Link>
                                </div>

                                <div
                                    className={"my-2 text-2xl "}
                                    onClick={() => setOpen(false)}>
                                    <Link href={"/events"}>
                                        Events
                                    </Link>
                                </div>

                                <div
                                    className={"my-2 text-2xl "}
                                    onClick={() => setOpen(false)}>
                                    <Link href={"/careers"}>
                                        Careers
                                    </Link>
                                </div>

                                <div
                                    className={"my-2 text-2xl "}
                                    onClick={() => setOpen(false)}>
                                    <Link href={"/contact"}>
                                        Contact Us
                                    </Link>
                                </div>
                            </div>

                            <form>
                                <label>
                                    <div>Subscribe to our newsletter</div>
                                    <div className="flex items-center gap-2">
                                        <input type="email" placeholder="Your Email" className="px-2 py-1 border border-black text-black" />
                                        <button className="">
                                            <LuSendHorizonal color="white" size={24} />
                                        </button>
                                    </div>
                                </label>

                            </form>

                            <div className="flex my-20 gap-4">
                                <Link href="https://www.linkedin.com/company/telea-insights" target="_blank">
                                    <FaLinkedin size={24} color="white" />
                                </Link>
                                <Link href="https://www.youtube.com/channel/UCRDqfURCXmDW29Q9Tyv4d8Q" target="_blank">
                                    <FaYoutube size={24} color="white" />
                                </Link>
                                <Link href="https://www.instagram.com/telea.insights/" target="_blank">
                                    <FaInstagram size={24} color="white" />
                                </Link>
                            </div>


                        </div>

                        <LoginWidget />
                    </div>
                </div>
            }
        </div>
    )
}

export default Toolbar