"use client"

import AutoGrowTextArea from "@/components/AutoGrowTextArea"
import { useState } from "react"

const Contact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [purpose, setPurpose] = useState("")
    const [message, setMessage] = useState("")


    const inputClass = "p-2 w-1/2 border border-gray-300 rounded-sm"

    return (
        <div>
            <div className="w-full flex flex-col items-center bg-sky-800 text-white py-10">
                <div className="text-[50px] md:text-[80px]">Contact Us</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="lg:w-1/2 gap-4 py-8 flex flex-col items-start">
                    <input
                        required
                        placeholder="Name"
                        type="text"
                        className={inputClass}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        required
                        placeholder="Email"
                        type="email"
                        className={inputClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <select
                        required
                        className={inputClass}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                    >
                        <option>Hire Telea’s Services</option>
                        <option>Collaborate with Telea</option>
                        <option>Speaking opportunities</option>
                        <option>Refer a client</option>
                        <option>Request Press Kit</option>
                        <option>Other</option>
                    </select>

                    <AutoGrowTextArea
                        required
                        placeholder="Message"
                        className={inputClass}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button className="w-fit border border-black rounded-sm p-2">Submit</button>
                </div>

                <p className="my-4">
                    For general and media inquiries, contact us at
                    <span className="underline ml-1">
                        contact@teleainsights.com
                    </span>
                </p>

            </div>
        </div>
    )
}

export default Contact