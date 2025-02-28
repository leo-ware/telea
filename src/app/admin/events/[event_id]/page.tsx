"use client"

import AutoGrowTextarea from "@/components/AutoGrowTextArea"
import Spinner from "@/components/Spinner"
import { createClient } from "@/supabase/client"
import Link from "next/link"
import { use, useEffect, useState } from "react"
import useSWR from "swr"
import { deleteEvent } from "../actions"
import { MdCancel, MdDelete, MdEdit } from "react-icons/md"
import YouTube, { watchLinkToEmbedLink } from "@/components/YouTube"

const EventPage = ({ params }: { params: Promise<{ event_id: string }> }) => {
    const { event_id } = use(params)
    const client = createClient()
    const { data, isLoading, error } = useSWR(`/admin/events/${event_id}`, async () => {
        const { data, error } = await client.from('events').select("*").eq('id', event_id).single()
        if (error) {
            throw new Error(error.message)
        }
        return data
    })
    const [eventState, setEventState] = useState(data)
    useEffect(() => {
        setEventState(data)
    }, [data])

    const [errorState, setErrorState] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const handleCancel = () => {
        setEditMode(false)
        setEventState(data)
    }

    const handleSave = () => {
        setErrorState(null)
        if (!eventState) {
            setErrorState("Try Again")
            return
        }

        if (
            (eventState.youtube_watch_link && !eventState.youtube_watch_link.startsWith("https://www.youtube.com/watch")) ||
            (eventState.youtube_watch_link && !eventState.youtube_embed_link)
        ) {
            setErrorState("Invalid Youtube Link. It should either be empty or look like https://www.youtube.com/watch...")
            return
        }

        setIsSaving(true)
        client.from('events').update(eventState).eq('id', event_id).then(({ error }) => {
            setIsSaving(false)
            if (error) {
                throw new Error(error.message)
            }
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        })
    }

    if (error) {
        return (
            <div>
                <div>Error, please try again. Or, check the console for more details.</div>
                <Link href="/admin/events" className="text-blue-500 hover:underline">Back to Events</Link>
            </div>
        )
    }

    if (isLoading || !eventState) {
        return <Spinner />
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold mb-4">Edit Event</div>

            <Link href="/admin/events" className="text-blue-500 hover:underline">Back to Events</Link>
            <Link href={`/events`} className="text-blue-500 hover:underline">View Events on Main Site</Link>

            <div className="flex gap-2 my-4">
                <button
                    onClick={() => {
                        if (confirm("Are you sure you want to delete this event?")) {
                            deleteEvent(eventState.id)
                        }
                    }}
                    className="p-2 underline flex items-center justify-center rounded-md bg-gray-200"
                >
                    <MdDelete />
                </button>
                {!editMode &&
                    <button
                        className="p-2 underline flex items-center justify-center rounded-md bg-gray-200"
                        onClick={() => setEditMode(!editMode)}
                    >
                        <MdEdit />
                    </button>}
                {editMode &&
                    <button
                        className="p-2 underline flex items-center justify-center rounded-md bg-gray-200"
                        onClick={handleCancel}
                    >
                        <MdCancel />
                    </button>}
            </div>

            {errorState && <div className="text-red-500">{errorState}</div>}

            <div className="flex flex-row items-center gap-4 mb-4">
                <input
                    disabled={!editMode}
                    type="checkbox"
                    className="border border-gray-300 rounded-md p-2"
                    checked={eventState.show}
                    onChange={(e) => setEventState({ ...eventState, show: e.target.checked })}
                />
                <label>This event should be shown on the main site</label>
            </div>

            <div className="flex flex-row items-center gap-4 mb-4">
                <input
                    disabled={!editMode}
                    type="checkbox"
                    className="border border-gray-300 rounded-md p-2"
                    checked={eventState.boost}
                    onChange={(e) => setEventState({ ...eventState, boost: e.target.checked })}
                />
                <label>Boost</label>
            </div>

            <label>Title</label>
            <input
                disabled={!editMode}
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={eventState.title || ""}
                onChange={(e) => setEventState({ ...eventState, title: e.target.value })}
            />

            <label>Date</label>
            <input
                disabled={!editMode}
                type="date"
                className="border border-gray-300 rounded-md p-2"
                value={eventState.date || ""}
                onChange={(e) => setEventState({ ...eventState, date: e.target.value })}
            />

            <label>Location</label>
            <input
                disabled={!editMode}
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={eventState.location || ""}
                onChange={(e) => setEventState({ ...eventState, location: e.target.value })}
            />

            <label>Youtube Link (For Recording)</label>
            <input
                disabled={!editMode}
                type="text"
                className="border border-gray-300 rounded-md p-2"
                placeholder="e.g., https://www.youtube.com/watch?v=NF1wWWbfHww"
                value={eventState.youtube_watch_link || ""}
                onChange={(e) => setEventState({
                    ...eventState,
                    youtube_watch_link: e.target.value,
                    youtube_embed_link: watchLinkToEmbedLink(e.target.value)
                })}
            />
            {eventState.youtube_embed_link &&
                <div className="mb-4 w-full flex justify-center">

                    <div>
                        <Link href={eventState.youtube_embed_link || ""} className="text-blue-500 hover:underline" target="_blank">
                            {eventState.youtube_embed_link}
                        </Link>
                        <YouTube
                            className="w-80 h-48"
                            embedLink={eventState.youtube_embed_link || ""}
                        />
                        Check to make sure this plays as desired. If not, there may be a problem with the link.
                    </div>
                </div>
            }

            <label>Description</label>
            <AutoGrowTextarea
                // type="text"
                className="border border-gray-300 rounded-md p-2"
                disabled={!editMode}
                value={eventState.description || ""}
                onChange={(e) => setEventState({ ...eventState, description: e.target.value })}
            />

            {editMode &&
                <button className="bg-blue-500 text-white rounded-md p-2 w-fit" onClick={handleSave}>
                    Save
                </button>
            }
            {isSaving && <Spinner />}
            {success && <div className="text-green-500">Saved</div>}
        </div>
    )
}

export default EventPage