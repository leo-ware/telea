import Parser from "rss-parser"

type FeedItem = { description?: string }

export const revalidate = 3600

const Writing = async () => {
    let items: (Parser.Item & FeedItem)[] = []
    let error = false

    try {
        const parser: Parser<Record<string, never>, FeedItem> = new Parser()
        const feed = await parser.parseURL("https://caseyrogersteleainsights.substack.com/feed")
        items = feed.items || []
    } catch (e) {
        console.error("Failed to fetch Substack RSS feed:", e)
        error = true
    }

    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-col items-center bg-blue-green text-white px-10 py-10">
                <div className="text-[80px]">Writing & Insights</div>
                <div className="text-[25px] font-[100] mt-[-15px]">
                    Articles and perspectives from the Telea Insights team
                </div>
            </div>

            <div className="px-4 md:px-20 py-20">
                <div className="font-thin text-[25px] md:text-[30px] lg:text-[40px] py-4 px-4 sm:px-8 md:px-40 leading-tight mb-16">
                    We write about the ideas, people, and movements shaping philanthropy and social impact.
                    From deep dives on strategy to reflections from the field, our writing draws on years of
                    experience working alongside nonprofits, foundations, and changemakers. Subscribe on{" "}
                    <a
                        href="https://caseyrogersteleainsights.substack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80"
                    >
                        Substack
                    </a>{" "}
                    to stay in the loop.
                </div>
                {error && (
                    <div className="text-center text-gray-500 italic">
                        Unable to load articles at this time. Please check back later.
                    </div>
                )}

                {!error && items.length === 0 && (
                    <div className="text-center text-gray-500 italic">
                        No articles available yet.
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <a
                            key={item.link}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {item.enclosure?.url && (
                                <img
                                    src={item.enclosure.url}
                                    alt={item.title || ""}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                {item.pubDate && (
                                    <div className="text-sm text-gray-500 mb-1">
                                        {new Date(item.pubDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                )}
                                <div className="text-xl font-semibold group-hover:underline">
                                    {item.title}
                                </div>
                                {item.description && (
                                    <div className="text-gray-600 mt-2 text-sm">
                                        {item.description}
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Writing
