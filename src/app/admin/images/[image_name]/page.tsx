"use client"

import { getSpecialImage } from "@/app/actions"
import AutoGrowTextarea from "@/components/AutoGrowTextArea"
import ImgPicker from "@/components/ImgPicker"
import Spinner from "@/components/Spinner"
import { createClient } from "@/supabase/client"
import Link from "next/link"
import { useEffect, useState } from "react"
type SpecialImage = Awaited<ReturnType<typeof getSpecialImage>>

const AdminImage = ({ params }: { params: { image_name: string } }) => {
    const [state, setState] = useState<SpecialImage | null>(null)
    const [editState, setEditState] = useState<SpecialImage | null>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        const fetchImage = async () => {
            const image = await getSpecialImage(params.image_name)
            console.log(image)
            setState(image)
            setEditState(image)
            setLoading(false)
        }
        fetchImage()
    }, [])

    const handleSave = async () => {
        if (!editState) {
            return
        }

        setSaving(true)
        const client = createClient()
        const { error } = await client
            .from("special_images")
            .update(editState)
            .eq("name", params.image_name)
        if (error) {
            setError(error.message)
        } else {
            setIsEditing(false)
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="w-4 h-4"><Spinner /></div>
    }

    return (
        <div>
            <div className="text-2xl font-bold">Edit Image</div>
            <Link className="text-blue-500 my-4 text-sm underline" href={"/admin/images"}>
                Back to Images
            </Link>
            <div className="text-sm text-gray-500">{params.image_name} - {state?.description}</div>

            {state?.display_location && (
                <Link
                    className="text-blue-500 my-2 text-sm underline"
                    target="_blank"
                    href={`${state.display_location}#img-${params.image_name}`}
                >
                    view on main site
                </Link>
            )}

            {error && <div className="text-red-500">{error}</div>}

            <div className="w-full my-4">
                {!editState?.url && <div className="italic text-gray-500">No Image Selected</div>}
                <img src={editState?.url || ""} className="w-64 max-w-full h-auto" />
                {isEditing &&
                    <ImgPicker
                        img={state?.url || ""}
                        setImg={(img) => setEditState(editState && { ...editState, url: img })}
                    />}
            </div>

            <div className="my-4">
                <label className="text-sm font-bold">Caption</label>
                <div className="text-xs text-gray-500">Leave blank to hide caption</div>
                <div className="w-full max-w-[400px] h-fit border border-gray-200 rounded">
                    <AutoGrowTextarea
                        disabled={!isEditing}
                        className="w-full"
                        value={editState?.caption || ""}
                        onChange={(e) => {
                            setEditState(editState && { ...editState, caption: e.target.value })
                        }}
                    />
                </div>
            </div>

            <div>
                {saving && <div className="w-4 h-4"><Spinner /></div>}
                {isEditing && (
                    <div className="flex gap-4">
                        <button className="border border-gray-200 px-4 py-2 rounded" onClick={() => {
                            setIsEditing(false)
                            setEditState(state)
                        }}>
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                setIsEditing(false)
                                handleSave()
                            }}
                        >
                            Save
                        </button>
                    </div>
                )}
                {!isEditing && (
                    <button className="border border-gray-200 px-4 py-2 rounded" onClick={() => setIsEditing(true)}>Edit</button>
                )}
            </div>
        </div>
    )
}

export default AdminImage