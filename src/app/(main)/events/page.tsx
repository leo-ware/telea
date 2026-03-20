import YouTube from "@/components/YouTube"
import { createClient } from "@/supabase/server"
import Link from "next/link"
import { FaYoutube } from "react-icons/fa"
import EventsVideo from "./EventsVideo"

const Events = async () => {

    const client = createClient()

    const { data: upcomingEvents } = await client
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .gte('date', new Date().toISOString())
        .limit(3)

    const { data: pastTeleaTalks } = await client
        .from('events')
        .select('*')
        .order('boost', { ascending: false })
        .order('date', { ascending: false })
        .lt('date', new Date().toISOString())
        .eq('show', true)
        .eq('category', 'telea_talk')

    const { data: pastMediaAppearances } = await client
        .from('events')
        .select('*')
        .order('boost', { ascending: false })
        .order('date', { ascending: false })
        .lt('date', new Date().toISOString())
        .eq('show', true)
        .eq('category', 'media_appearance')

    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-col items-center bg-amber-400 px-10 py-10">
                <div className="text-[80px]">Events</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                    Watch this page to stay updated on Telea Talks and future events!
                </div>
            </div>

            <div className="w-full">
                <EventsVideo />
            </div>

            <div className="relative flex flex-col gap-6 lg:gap-12 lg:grid grid-cols-12 py-20 leading-tight px-4 md:px-20 text-[24px]">

                {/* Upcoming Events */}
                {upcomingEvents && upcomingEvents.length > 0 && (
                    <>
                        <div className="font-bold col-span-2 col-start-3 text-3xl">Upcoming Events</div>

                        {upcomingEvents.map(talk => (
                            <div key={talk.id} className="col-span-10 col-start-3 lg:grid grid-cols-subgrid">
                                <div className="col-span-2 col-start-1">
                                    <div className="text-md">{talk.title}</div>
                                    <div className="text-md md:text-sm pt-4">{talk.date}</div>
                                    <div className="text-sm">{talk.location}</div>
                                </div>
                                <div className="font-thin col-span-6 col-start-3">
                                    <div>{talk.description}</div>
                                </div>
                            </div>
                        ))}

                        <div className="col-start-1 col-span-12 border-b border-black" />
                    </>
                )}

                {/* Telea Talks Blurb */}
                <>
                    <div className=" col-span-2 col-start-3 font-bold">Telea Talks</div>
                    <div className="font-thin col-span-6 col-start-5">
                        Telea Talks is a platform where we bring together inspiring speakers who are making a
                        significant impact in the fields of women's empowerment, environmental conservation, advocacy,
                        along with guests engaged in business and finance, academic leaders, youth activists, writers,
                        artists and philanthropists. Our talks feature diverse voices and innovative ideas, offering
                        valuable insights and fostering meaningful discussions.
                        <div className="underline mt-4 flex gap-1 items-center text-sm cursor-pointer">
                            <FaYoutube />
                            <div>Find all Telea Talks on YouTube</div>
                        </div>
                    </div>
                </>

                <div className="col-start-1 col-span-12 border-b border-black" />

                {/* Past Telea Talks */}
                {pastTeleaTalks && pastTeleaTalks.length > 0 && (
                    <>
                        <div className="font-bold col-span-2 col-start-3 text-3xl">Past Telea Talks</div>
                        {pastTeleaTalks.map(talk => (
                            <div key={talk.id} className="col-span-10 col-start-3 lg:grid grid-cols-subgrid">
                                <div className="col-span-2 col-start-1">
                                    <div>{talk.title}</div>
                                </div>
                                <div className="mb-10 font-thin col-span-6 col-start-3">
                                    <div>{talk.description}</div>
                                    {talk.youtube_embed_link &&
                                        <YouTube
                                            className="w-full max-w-[500px] h-80 pt-10"
                                            embedLink={talk.youtube_embed_link} />}
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* Nominate a Speaker — flows directly after Telea Talks, no divider */}
                <div className="font-bold col-span-2 col-start-3 text-3xl">Nominate a Speaker</div>
                <div className="font-thin col-span-6 col-start-5">
                    <div className="h-[2px]" />
                    Know someone who would be a great speaker for Telea Talks?
                    <div className="h-4" />
                    Nominate them <Link href={"/contact"} className="underline">here!</Link>
                </div>

                {/* Past Media Appearances */}
                {pastMediaAppearances && pastMediaAppearances.length > 0 && (
                    <>
                        <div className="col-start-1 col-span-12 border-b border-black" />
                        <div className="font-bold col-span-2 col-start-3 text-3xl">Media Appearances</div>
                        {pastMediaAppearances.map(talk => (
                            <div key={talk.id} className="col-span-10 col-start-3 lg:grid grid-cols-subgrid">
                                <div className="col-span-2 col-start-1">
                                    <div>{talk.title}</div>
                                </div>
                                <div className="mb-10 font-thin col-span-6 col-start-3">
                                    <div>{talk.description}</div>
                                    {talk.youtube_embed_link &&
                                        <YouTube
                                            className="w-full max-w-[500px] h-80 pt-10"
                                            embedLink={talk.youtube_embed_link} />}
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* Press Kit */}
                <div className="col-start-1 col-span-12 border-b border-black" />
                <div className="font-bold col-span-2 col-start-3 text-3xl">Press Kit</div>
                <div className="font-thin col-span-6 col-start-5">
                    <div className="h-[2px]" />
                    Looking for logos, bios, or media resources? Our press kit has everything you need.
                    <div className="h-4" />
                    <Link href={"/contact"} className="underline">Request our press kit</Link>
                </div>
            </div>
        </div>
    )
}

export default Events