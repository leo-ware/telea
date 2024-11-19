"use server"

import { createClient } from "@/supabase/server"

export async function sendContactForm(data: {
    name: string
    email: string
    purpose: string
    message: string
}) {
    const client = await createClient()
    await client.from("inbox").insert({
        name: data.name,
        email: data.email,
        purpose: data.purpose,
        message: data.message,
    })
    
    const emailTitle = "New Form Submission - " + data.name + " - " + (data.purpose || "General Inquiry")
    const emailBody = `
    Someone has submitted the contact form on the website.

    Name: ${data.name}
    Email: ${data.email}
    Purpose: ${data.purpose}
    Time: ${new Date().toLocaleString()}

    ${data.message}
    `
    const res = await fetch(
        "https://us13.list-manage.com/contact-form/post?u=302fa51ca727184ed9c135ec2&form_id=bc7f4bec8bca98c34463deb7ba987ab8",
        {
            method: "POST",
            body: JSON.stringify({
                fields : {
                    48: data.email,
                    49: emailTitle,
                    50: emailBody,
                },
                subscribe: false,
                "mc-SMSPHONE-ack": false
            }),
        }
    )
    if (!res.ok) {
        throw new Error("Failed to send contact form")
    }
}