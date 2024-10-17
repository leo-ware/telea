"use client"

import AutoGrowTextarea from "@/components/AutoGrowTextArea"
import ImgPicker from "@/components/ImgPicker"
import { createClient } from "@/supabase/client"
import { Database } from "@/supabase/types"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export type ClientCategory = Database["public"]["Tables"]["client_categories"]["Row"]

const Page = ({ params }: { params: { id: string } }) => {
    const client = createClient()

    const [category, setCategory] = useState<ClientCategory | null>(null)
    const [editState, setEditState] = useState<ClientCategory | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<string | null>(null)

    const fetchData = async (id: string) => {
        const { data, error } = await client
            .from("client_categories")
            .select("*")
            .eq("id", id)
            .single()

        if (error || !data) {
            setErrorState(error.message || "not found")
            return
        }

        setCategory(data)
        setEditState(data)
    }

    const handleSave = () => {
        const saveData = async (state: ClientCategory) => {
            const { data, error } = await client
                .from("client_categories")
                .upsert(state, { onConflict: "id", ignoreDuplicates: false })
                .select("*")
                .single()

            if (error || !data) {
                if (error.code == "PGRST116") {
                    setErrorState("This client category does not exist")
                } else {
                    setErrorState(error.message)
                    setIsEditing(true)
                }
                return
            }

            setCategory(data)
            setEditState(data)
        }

        setIsEditing(false)
        if (editState) {
            saveData(editState)
        }
    }

    const handleDelete = () => {
        const deletePage = async (id: string) => {
            const { error } = await client
                .from("client_categories")
                .delete()
                .eq("id", id)
            if (error) {
                setErrorState(error.message)
            } else {
                console.log("successfully deleted")
                // @ts-ignore
                window.location = "/admin/client_categories"
            }
        }

        if (category?.id) {
            deletePage("" + category.id)
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchData(params.id)
        }
    }, [params.id])

    useEffect(() => {
        if (editState && editState.name) {
            setEditState({ ...editState, slug: editState.name.trim().toLowerCase().replace(/ /g, "-").replace(/[^a-zA-Z0-9\-]/g, '') })
        }
    }, [editState?.name])

    return (
        <div>
            <div className="text-2xl font-bold">
                Edit Client Category
            </div>
            <Link className="text-blue-500 underline" href="/admin/client_categories">Back to client categories</Link>
            {errorState && (
                <div className="text-red-500">{errorState}</div>
            )}
            {editState && <div>
                <div className="my-8 flex flex-col gap-4 w-full md:w-1/2">
                    <div className="w-full">
                        <label className="text-sm font-bold">Name</label>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <input
                                type="text"
                                className="w-full p-2 rounded-md"
                                value={editState?.name || ""}
                                disabled={!isEditing}
                                placeholder="Name"
                                onChange={(e) => setEditState(editState && { ...editState, name: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold">Slug</label>
                        <div>This is what the url will look like</div>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <input
                                type="text"
                                className="w-full p-2 rounded-md"
                                value={editState?.slug || ""}
                                disabled={!isEditing}
                                placeholder="Slug"
                                onChange={(e) => setEditState(editState && { ...editState, slug: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold">Color</label>
                        <div className="w-fit h-fit flex gap-2 items-center p-2 bg-white border border-gray-300 rounded-md">
                            <input
                                type="color"
                                className="w-6 h-6 rounded-md"
                                value={editState?.backsplash || "#ffffff"}
                                disabled={!isEditing}
                                onChange={(e) => setEditState(editState && { ...editState, backsplash: e.target.value })}
                            />
                            {editState?.backsplash}
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold">Tagline</label>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <input
                                type="text"
                                className="w-full p-2 rounded-md"
                                value={editState?.tagline || ""}
                                disabled={!isEditing}
                                placeholder="Tagline"
                                onChange={(e) => setEditState(editState && { ...editState, tagline: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold">Blurb</label>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <AutoGrowTextarea
                                className="w-full p-2 rounded-md"
                                placeholder="Description"
                                value={editState?.blurb || ""}
                                disabled={!isEditing}
                                onChange={(e) => setEditState(editState && { ...editState, blurb: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold">What we can do</label>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <AutoGrowTextarea
                                className="w-full p-2 rounded-md"
                                placeholder="Description"
                                value={editState?.capabilities || ""}
                                disabled={!isEditing}
                                onChange={(e) => setEditState(editState && { ...editState, capabilities: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    {isEditing
                        ? <>
                            <div
                                onClick={() => {
                                    setIsEditing(false)
                                    setEditState(category)
                                }}
                                className="cursor-pointer w-fit h-fit bg-gray-300 rounded-md p-2">
                                Cancel
                            </div>
                            <div
                                onClick={handleSave}
                                className="cursor-pointer w-fit h-fit bg-green-300 rounded-md p-2">
                                Save
                            </div>
                        </>
                        : <>
                            <div
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer w-fit h-fit bg-blue-300 rounded-md p-2">
                                Edit
                            </div>
                            <div
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this page?")) {
                                        handleDelete()
                                    }
                                }}
                                className="cursor-pointer w-fit h-fit bg-red-300 rounded-md p-2">
                                Delete
                            </div>
                        </>
                    }
                </div>
            </div>}
        </div>
    )
}

export default Page