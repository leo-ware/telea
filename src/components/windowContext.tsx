"use client"

import { createContext, useEffect, useState } from "react"

type WindowContextType = {
    width?: number
    height?: number
}

export const windowContext = createContext<WindowContextType>({})

export const WindowContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [typeof window !== "undefined" && window])

    return (
        <windowContext.Provider value={{width, height}}>
            {children}
        </windowContext.Provider>
    )
}