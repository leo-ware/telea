import ReactMarkdown from "react-markdown"

const Markdown = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-p:mb-0">
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default Markdown