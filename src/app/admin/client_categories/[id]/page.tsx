"use client"

import AutoGrowTextarea from "@/components/AutoGrowTextArea"
import ImgPicker from "@/components/ImgPicker"
import Spinner from "@/components/Spinner"
import { createClient } from "@/supabase/client"
import { Database } from "@/supabase/types"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

export type ClientCategory = Database["public"]["Tables"]["client_categories"]["Row"]

const Page = ({ params }: { params: { id: string } }) => {
    const client = createClient()

    const [category, setCategory] = useState<ClientCategory | null>(null)
    const [editState, setEditState] = useState<ClientCategory | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [clients, setClients] = useState<{ id: string, name: string, order: number | null }[]>([])
    const [clientEditState, setClientEditState] = useState<{ id: string, name: string, order: number | null }[]>([])

    const fetchData = async (id: string) => {
        const { data, error } = await client
            .from("client_categories")
            .select("*")
            .eq("id", id)
            .single()

        if (error || !data) {
            setErrorState(error.message || "not found")
            setIsLoading(false)
            return
        }

        setCategory(data)
        setEditState(data)

        const { data: clientsData, error: clientsError } = await client
            .from("clients")
            .select("id, name, order")
            .eq("category", id)
            .order("order")
        
        if (clientsError) {
            console.log(clientsError.message)
            setErrorState("Error fetching clients")
            setIsLoading(false)
            return
        }

        setClients(clientsData || [])
        setClientEditState(clientsData || [])
        setIsLoading(false)
    }

    const handleSave = () => {
        const saveData = async (state: ClientCategory) => {
            setIsSaving(true)
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
                setIsSaving(false)
                return
            }

            setCategory(data)
            setEditState(data)

            const { data: clientsData, error: clientsError } = await client
                .from("clients")
                .upsert(clientEditState, { onConflict: "id", ignoreDuplicates: false })
                .select("id,name,order")
            
            if (clientsError) {
                console.log(clientsError.message)
                setErrorState("Error updating client order")
                setIsSaving(false)
                return
            }

            setClients(clientsData || [])
            setClientEditState(clientsData || [])
            setIsSaving(false)
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

    const handleReorder = async (oldIndex: number, newIndex: number) => {
        const newClientEditState = clientEditState
            .toSorted((a, b) => (a.order || 1000) - (b.order || 1000))
            .map((each, index) => ({
                ...each,
                order: index + 1
            }))
        
        newClientEditState.forEach((each, index) => {
            if (each.order === oldIndex) {
                each.order = newIndex
            } else {
                if (each.order > oldIndex) {
                    each.order = each.order - 1
                }
                if (each.order >= newIndex) {
                    each.order = each.order + 1
                }
            }
        })
        
        setClientEditState(newClientEditState)
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

    if (isLoading) {    
        return <Spinner />
    }

    return (
        <div>
            <div className="text-2xl font-bold">
                Edit Client Category
            </div>
            <div className="flex flex-col my-4 gap-2">
            <Link className="text-blue-500 underline" href="/admin/client_categories">Back to client categories</Link>
                {category?.slug &&
                    <Link className="text-blue-500 underline" target="_blank" href={`/clients/${category?.slug}`}>View on main site</Link>}
            </div>
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

                    <div className="w-full">
                        <label className="text-sm font-bold">Clients</label>
                        <div>
                            {clientEditState.toSorted((a, b) => (a.order || 0) - (b.order || 0)).map((each, index) => (
                                <div key={each.id} className="flex items-center gap-2 my-2">
                                    <select
                                        disabled={!isEditing}
                                        value={index + 1}
                                        onChange={(e) => handleReorder(index + 1, parseInt(e.target.value))}>
                                        {Array.from({ length: clients.length }, (_, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <div>{each.name}</div>
                                </div>
                            ))}
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
                                    setClientEditState(clients)
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