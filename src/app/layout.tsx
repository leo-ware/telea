import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import "./globals.css"

import { alegraya } from "./fonts"
import Providers from "./Providers";

export const metadata: Metadata = {
    title: "Telea Insights",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Analytics />
            {/* <head>
                <link rel="icon" href="/favicon.ico" />
            </head> */}
            <body className={alegraya.className + " h-screen w-screen "}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
