import { ReactNode } from "react";
import Block from "./Block";


const PBlock = ({children}: {children: ReactNode}) => {
    return (
        <Block className="flex justify-center">
            <p className="lg:w-1/2">{children}</p>
        </Block>
    )
}

export default PBlock