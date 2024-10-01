import type { Metadata } from "next"

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
            <body className={alegraya.className + " h-full w-full bg-black"}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
