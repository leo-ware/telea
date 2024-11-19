"use client"

import AutoGrowTextArea from "@/components/AutoGrowTextArea"
import { useState } from "react"
import { sendContactForm } from "./actions"

const Contact = () => {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [purpose, setPurpose] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async () => {
        console.log("submitting")
        setLoading(true)
        try {
            const res = await sendContactForm({ name, email, purpose, message })
            console.log(res)
            // setName("")
            // setEmail("")
            // setPurpose("")
            // setMessage("")
        } catch (error) {
            console.error(error)
            setError("Error submitting form")
        } finally {
            setLoading(false)
            setSubmitted(true)
        }
    }


    const inputClass = "p-2 w-full border border-gray-300 rounded-sm"

    return (
        <div>
            <div className="w-full flex flex-col items-center bg-sky-800 text-white py-10">
                <div className="text-[50px] md:text-[80px]">Contact Us</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/2 max-w-[450px] gap-4 py-8 flex flex-col items-start">
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
                        <option>Inquire about Telea’s Services</option>
                        <option>Collaborate with Telea</option>
                        <option>Speaking opportunities</option>
                        <option>Refer a client</option>
                        <option>Request Press Kit</option>
                        <option>Nominate Telea Talk</option>
                        <option>Other</option>
                    </select>

                    <AutoGrowTextArea
                        required
                        placeholder="Message"
                        className={inputClass}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button onClick={handleSubmit} className="float-left w-fit border border-black rounded-sm p-2">Submit</button>
                </div>

                <p className="my-4 mx-4">
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