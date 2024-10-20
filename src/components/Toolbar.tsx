"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FaYoutube } from "react-icons/fa"
import { FaInstagram, FaLinkedin } from "react-icons/fa6"
import { GoSun } from "react-icons/go"
import { IoMdArrowDropdown, IoMdArrowDropright, IoMdClose } from "react-icons/io"
import { LuSendHorizonal } from "react-icons/lu"
import LoginWidget from "./LoginWidget"
import { createClient } from "@/supabase/client"
import { Database } from "@/supabase/types"
import { MdLogin } from "react-icons/md"

type WorkCategory = Database["public"]["Tables"]["work_categories"]["Row"]
type ClientCategory = Database["public"]["Tables"]["client_categories"]["Row"]

const Toolbar = () => {
    const client = createClient()

    const [open, setOpen] = useState(false)
    const [over, setOver] = useState(false)

    const [workCategories, setWorkCategories] = useState<WorkCategory[]>([])
    const [clientCategories, setClientCategories] = useState<ClientCategory[]>([])
    const [categoriesOpen, setCategoriesOpen] = useState<number[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const [
                { data: workCategories, error: workCategoriesError },
                { data: clientCategories, error: clientCategoriesError }
            ] = await Promise.all([
                client.from("work_categories").select("*"),
                client.from("client_categories").select("*")
            ])

            if (workCategoriesError || !workCategories) {
                console.log(workCategoriesError)
            }

            if (clientCategoriesError || !clientCategories) {
                console.log(clientCategoriesError)
            }

            setWorkCategories(workCategories || [])
            setClientCategories(clientCategories || [])
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!open) {
            setCategoriesOpen([])
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

                                {workCategories.map((category) => {
                                    const myClientCategories = clientCategories.filter((clientCategory) => clientCategory.work_category_id === category.id)
                                    const open = categoriesOpen.includes(category.id)

                                    const toggleOpen = () => {
                                        if (open) {
                                            setCategoriesOpen(categoriesOpen.filter((id) => id !== category.id))
                                        } else {
                                            setCategoriesOpen([...categoriesOpen, category.id])
                                        }
                                    }

                                    return (
                                        <div className={"my-2 text-2xl ml-[-8px]"}>
                                            <div className="flex items-center">
                                                <div onClick={toggleOpen}>
                                                    {open
                                                        ? <IoMdArrowDropdown />
                                                        : <IoMdArrowDropright />}
                                                </div>
                                                <Link href={`/work/${category.slug}`} onClick={() => setOpen(false)}>
                                                    {category.name}
                                                </Link>
                                            </div>
                                            {open &&
                                                <div className="pl-8 flex flex-col">
                                                    {myClientCategories.map((clientCategory) => (
                                                        <Link className="w-fit" href={`/clients/${clientCategory.slug}`} onClick={() => setOpen(false)}>
                                                            {clientCategory.name}
                                                        </Link>
                                                    ))}
                                                </div>}
                                        </div>
                                    )
                                })}

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
                        
                        <Link href="/login">
                            <MdLogin size={24} color="white" />
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Toolbar