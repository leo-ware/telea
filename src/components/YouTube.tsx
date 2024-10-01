
// const YOUTUBE_BASE_URL = "https://www.youtube.com/watch?v="

export const watchLinkToEmbedLink = (watchLink: string) => {
    try {
        const url = new URL(watchLink)
        const videoId = url.searchParams.get("v")
        return `https://www.youtube.com/embed/${videoId}`
    } catch (e) {
        return null
    }
}

const YouTube = ({ embedLink, className }: { embedLink: string, className?: string }) => {
    return (
        <div className={className}>
            <iframe
                className="w-full h-full"
                width="560"
                height="auto"
                // height="315"
                src={embedLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen />
        </div>
    )
}

export default YouTube