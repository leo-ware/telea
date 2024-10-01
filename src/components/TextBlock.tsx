import { crimson_pro, open_sans } from "@/app/fonts"

type TextBlockProps = {
    title: string
    children: React.ReactNode
}

const TextBlock = (props: TextBlockProps) => {
    return (
        <div className="bg-blue-200 flex flex-col md:flex-row gap-8 md:gap-20 px-10 md:px-1/12 w-full py-20 text-md">
            <div className={crimson_pro.className + " md:w-4/12 text-[30px] md:text-2xl flex justify-start md:justify-end"}>
                {props.title}
            </div>
            <div className={open_sans.className + " md:w-1/2 text-xl"}>
                <div className="flex flex-col gap-4">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default TextBlock