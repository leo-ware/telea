import { createClient } from "@/supabase/server"
import Link from "next/link"
import { MdAdd } from "react-icons/md"


const Events = async () => {
    const client = createClient()
    const { data, error } = await client.from('events').select('*')
    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div>
            <div className="text-2xl font-bold mb-4">Events</div>
            <Link href={`/events`} className="text-blue-500 hover:underline my-2">View Events on Main Site</Link>
            <div className="my-4">
                This is where you can manage the events board.
                Both future and past events can be modified here.
                On each event's page, you will find a toggle that determines whether it is shown on the main site.
                This defaults to false for new events, so make sure you turn it on when you create a new event.

                <br/><br/>

                If you just added an event, and it hasn't shown up yet. Try reloading this page.
            </div>
            

            <form>
                <table className="table-auto w-full md:w-1/2 border-collapse">
                    <thead>
                        <tr className="border-b">
                            {/* <th className="w-1"/> */}
                            <th className="text-left p-2">Title</th>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && <tr><td colSpan={1} className="text-gray-600 italic">No events found</td></tr>}
                        {data.map((event) => (
                            <tr key={event.id} className="border-b">
                                {/* <td className="p-2 w-fit">
                                    <input type="hidden" name="id" value={event.id} />
                                    <input type="checkbox" name="delete" />
                                </td> */}
                                <td className="p-2">
                                    <Link href={`/admin/events/${event.id}`} className="text-blue-500 hover:underline">
                                        {event.title || "Untitled Event"}
                                    </Link>
                                </td>
                                <td className="p-2">{event.date}</td>
                                <td className="p-2">{event.location}</td>
                            </tr>
                        ))}
                        <tr>
                            {/* <td/> */}
                            <td className="p-2">
                                <Link href="/admin/events/new">
                                    <MdAdd size={24} />
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Events