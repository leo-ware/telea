import ReactMarkdown from "react-markdown"


const Markdown = ({ content }: { content: string }) => {
    return (
        <div className="prose">
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default Markdown