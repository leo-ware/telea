"use client"

import { WindowContextProvider } from "@/components/windowContext"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        // <WindowContextProvider>
            <DndProvider backend={HTML5Backend}>
                {children}
            </DndProvider>
        // </WindowContextProvider>
    )
}

export default Providers