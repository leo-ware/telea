import { open_sans } from "@/app/fonts"
import Link from "next/link"

const LittleLink = ({href, children}: {href?: string, children: React.ReactNode}) => {
    return (
        <Link href={href || ""} className={open_sans.className + " text-sm underline"}>
            {children}
        </Link>
    )
}

export default LittleLink