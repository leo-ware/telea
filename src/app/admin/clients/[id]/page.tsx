"use client"

import AutoGrowTextarea from "@/components/AutoGrowTextArea"
import { createClient } from "@/supabase/client"
import { Database } from "@/supabase/types"
import Link from "next/link"
import { use, useEffect, useState } from "react"
import { ClientCategory } from "../../client_categories/[id]/page"
import Spinner from "@/components/Spinner"
import ImgPicker from "@/components/ImgPicker"

type Client = Database["public"]["Tables"]["clients"]["Row"]

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const client = createClient()
    const { id } = use(params)

    const [clientCategories, setClientCategories] = useState<ClientCategory[]>([])
    const [clientData, setClientData] = useState<Client | null>(null)
    const [editState, setEditState] = useState<Client | null>(null)
    const [saving, setSaving] = useState<boolean>(false)
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<string | null>(null)

    const fetchData = async (id: string) => {
        const { data, error } = await client
            .from("clients")
            .select("*")
            .eq("id", id)
            .single()

        if (error || !data) {
            setErrorState(error.message || "not found")
            return
        }

        setClientData(data)
        setEditState(data)
    }

    const fetchClientCategories = async () => {
        const { data, error } = await client
            .from("client_categories")
            .select("*")

        if (data) {
            setClientCategories(data)
        }
    }

    const handleSave = () => {
        const saveData = async (state: Client) => {
            setSaving(true)

            const upsertState = {...state, category: state.category || null}

            const { data, error } = await client
                .from("clients")
                .upsert(upsertState, { onConflict: "id", ignoreDuplicates: false })
                .select("*")
                .single()

            if (error || !data) {
                setSaving(false)
                setSaveSuccess(false)
                if (error.code == "PGRST116") {
                    setErrorState("This client does not exist")
                } else {
                    console.log(error)
                    setErrorState("Error saving client, retry or check console for more details")
                    setIsEditing(true)
                }
                return
            }

            setSaving(false)
            setSaveSuccess(true)
            setTimeout(() => {
                setSaveSuccess(false)
            }, 3000)

            setClientData(data)
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
                .from("clients")
                .delete()
                .eq("id", id)
            if (error) {
                setErrorState(error.message)
            } else {
                console.log("successfully deleted")
                // @ts-ignore
                window.location = "/admin/clients"
            }
        }

        if (clientData?.id) {
            deletePage("" + clientData.id)
        }
    }

    useEffect(() => {
        if (id) {
            fetchData(id)
            fetchClientCategories()
        }
    }, [id])

    if (!clientData && !errorState) {
        return <div><Spinner /></div>
    }

    const myClientCategory = clientCategories.find(category => category.id == clientData?.category)
    const otherClientCategories = clientCategories.filter(category => category.id != clientData?.category)

    return (
        <div>
            <div>
                <div className="text-2xl font-bold">Edit Client</div>
                <div className="flex gap-2 flex-col">
                    <Link className="text-blue-500 underline" href="/admin/clients" prefetch={false}>Back to clients</Link>
                    {myClientCategory &&
                        <Link target="_blank" className="text-blue-500 underline" href={`/clients/${myClientCategory?.slug}#${clientData?.id}`} prefetch={false}>
                            View on main site
                        </Link>}
                </div>
                
            </div>

            {editState && <div>
                <div className="my-6 flex flex-col gap-4 w-full md:w-1/2">
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
                        <label className="text-sm font-bold">Project Name</label>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <input
                                type="text"
                                className="w-full p-2 rounded-md"
                                value={editState?.project_name || ""}
                                disabled={!isEditing}
                                placeholder="Tagline"
                                onChange={(e) => setEditState(editState && { ...editState, project_name: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold">Project Description</label>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <AutoGrowTextarea
                                className="w-full p-2 rounded-md"
                                placeholder="Description"
                                value={editState?.project_description || ""}
                                disabled={!isEditing}
                                onChange={(e) => setEditState(editState && { ...editState, project_description: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold">Category</label>
                        <div className="text-xs text-gray-500">Select "No Category" to prevent this client from being displayed on the main website.</div>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <select
                                disabled={!isEditing}
                                className="p-2 w-full"
                                onChange={e => setEditState(es => (es && { ...es, category: parseInt(e.target.value) }))}>
                                {myClientCategory &&
                                    <option key={myClientCategory?.id} value={myClientCategory?.id}>
                                        {myClientCategory?.name}
                                    </option>}
                                <option value={""}>-- No Category --</option>
                                {otherClientCategories.map(category => (
                                    <>
                                        {(category.id != clientData?.category) && (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        )}
                                    </>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm font-bold">Image</label>
                        {!editState?.img && <div className="italic text-gray-500">No Image Selected</div>}
                        <img src={editState?.img || ""} className="w-64 max-w-full h-auto" />
                        {isEditing &&
                            <ImgPicker
                                img={editState?.img || ""}
                                setImg={(img) => setEditState(editState && { ...editState, img: img })}
                            />
                        }
                    </div>
                </div>

                <div>
                    {saving && <div className="w-4 h-4"><Spinner /></div>}
                    {saveSuccess && <div className="text-green-500">Saved</div>}
                </div>

                {errorState && (
                    <div>
                        <div className="text-red-500">{errorState}</div>
                        <Link className="text-blue-500 underline" href="/admin/client_categories">Back to client categories</Link>
                    </div>
                )}

                <div className="flex gap-4">
                    {isEditing
                        ? <>
                            <div
                                onClick={() => {
                                    setIsEditing(false)
                                    setEditState(clientData)
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