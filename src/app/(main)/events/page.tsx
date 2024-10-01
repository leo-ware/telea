import YouTube from "@/components/YouTube"
import { createClient } from "@/supabase/server"
import Link from "next/link"

const Events = async () => {
    const client = createClient()
    const { data: upcomingEvents, error: upcomingEventsError } = await client
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .gte('date', new Date().toISOString())
        .limit(3)
    const { data: pastEvents, error: pastEventsError } = await client
        .from('events')
        .select('*')
        .order('date', { ascending: false })
        .lt('date', new Date().toISOString())
        .eq('show', true)
    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-col items-center bg-amber-400 px-10 py-10">
                <div className="text-[80px]">Events</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                    Watch this page to stay updated on Telea Talks and future events!
                </div>
            </div>

            <div className="w-full">
                <video
                    autoPlay
                    loop
                    muted>
                    <source src={"./video/teleatalksloop4.mp4"} type="video/mp4" />
                </video>
            </div>

            <div className="relative flex flex-col gap-12 grid grid-cols-12 py-20 leading-tight px-20 text-[24px]">
                <>
                    <div className=" col-span-2 col-start-3 font-bold">Telea Talks</div>
                    <div className="font-thin col-span-6 col-start-5">
                        Telea Talks is a platform where we bring together inspiring speakers who are making a
                        significant impact in the fields of women's empowerment, environmental conservation, advocacy,
                        along with guests engaged in business and finance, academic leaders, youth activists, writers,
                        artists and philanthropists.Our talks feature diverse voices and innovative ideas, offering
                        valuable insights and fostering meaningful discussions.
                    </div>
                </>

                <div className="col-start-1 col-span-12 border-b border-black" />
                <div className="font-bold col-span-2 col-start-3 text-3xl">Upcoming Events</div>
                {(!upcomingEvents || upcomingEvents.length === 0) &&
                    <div className="italic text-gray-500 col-span-2 col-start-5">No upcoming events scheduled</div>}
                {upcomingEvents && upcomingEvents.map(talk => (
                    <>
                        <div className=" col-span-2 col-start-3">
                            <div className="text-md">{talk.title}</div>
                            <div className="text-sm pt-4">{talk.date}</div>
                            <div className="text-sm">{talk.location}</div>
                        </div>
                        <div className="font-thin col-span-6 col-start-5">
                            {/* <div className="text-lg font-bold"></div> */}

                            <div>{talk.description}</div>
                        </div>
                    </>
                ))}

                <div className="col-start-1 col-span-12 border-b border-black" />
                <div className="font-bold col-span-2 col-start-3 text-3xl">Past Events</div>
                {(!pastEvents || pastEvents.length === 0) &&
                    <div className="italic text-gray-500 col-span-2 col-start-5">No past events</div>}
                {pastEvents && pastEvents.map(talk => (
                    <>
                        <div className=" col-span-2 col-start-3">
                            <div>{talk.title}</div>
                            <div className="text-sm pt-4">{talk.date}</div>
                            {/* <div className="text-sm">{talk.location}</div> */}
                        </div>
                        <div className="mb-10 font-thin col-span-6 col-start-5">
                            <div>{talk.description}</div>
                            {talk.youtube_embed_link &&
                                <YouTube
                                    className="w-full h-80 pt-10"
                                    embedLink={talk.youtube_embed_link} />}
                        </div>
                    </>
                ))}

                <div className="col-start-1 col-span-12 border-b border-black" />
                <div className="font-bold col-span-2 col-start-3 text-3xl">Nominate a Speaker</div>
                <div className="font-thin col-span-6 col-start-5">
                    <div className="h-[2px]"/>
                    Know someone who would be a great speaker for Telea Talks?
                    <div className="h-4"/>
                    Nominate them <Link href={"/contact"} className="underline">here!</Link>
                </div>
            </div>
        </div>
    )
}

export default Events