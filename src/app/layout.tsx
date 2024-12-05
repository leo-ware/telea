import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import "./globals.css"

import { alegraya } from "./fonts"
import Providers from "./Providers"

export const metadata: Metadata = {
    title: "Telea Insights",
    description: "Telea Insights empowers leaders with strategy, resources, and systems design to launch ventures that drive positive change.",
    themeColor: "#ff5722",
    openGraph: {
        title: "Telea Insights",
        description: "Telea Insights empowers leaders with strategy, resources, and systems design to launch ventures that drive positive change.",
        url: "https://teleainsights.com",
        images: ["/icons/telea-logo-512x512.png"],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-screen w-screen">
            <Analytics />
            <body className={alegraya.className + " h-screen w-screen "}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
