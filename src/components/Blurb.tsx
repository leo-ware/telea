import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"


const Blurb = ({ blurb }: { blurb: string }) => {
    return (
        <div className={"font-thin text-[20px] md:text-[30px] lg:text-[40px] pb-2 md:pb-4 py-4 px-8 md:px-20 lg:px-40 leading-tight space-children-p"}>
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{blurb}</Markdown>
        </div>
    )
}

export default Blurb