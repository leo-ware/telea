"use client"

import AutoGrowTextarea from "@/components/AutoGrowTextArea"
import ImgPicker from "@/components/ImgPicker"
import Spinner from "@/components/Spinner"
import { createClient } from "@/supabase/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaPlus, FaTrash, FaUndo } from "react-icons/fa"

const Picker = ({ done }: { done: () => void }) => {
    const [clients, setClients] = useState<{ id: string, name: string }[]>([])
    const [selectedClient, setSelectedClient] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const client = createClient()
            const { data } = await client.from("clients").select("id, name")
            setClients(data || [])
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleSelect = async () => {
        const client = createClient()
        if (!selectedClient) {
            return
        }
        const { data, error } = await client.from("featured_clients").insert({ client_id: selectedClient })
        done()
    }

    return (
        <div className="w-1/2 h-1/2 bg-white rounded-md p-10" onClick={e => e.stopPropagation()}>
            <div className="text-2xl font-bold mb-4">Pick a client to Feature</div>
            {loading && <Spinner />}
            {!loading &&
                <select className="w-full" value={selectedClient || ""} onChange={e => setSelectedClient(e.target.value)}>
                    {clients.map(each => (
                        <option key={each.id} value={each.id}>{each.name}</option>
                    ))}
                </select>}
            {selectedClient && <button className="my-4 bg-blue-500 text-white px-2 py-1 rounded-md" onClick={() => handleSelect()}>Select</button>}
        </div>
    )
}

const FeaturedClients = () => {
    const [featuredClients, setFeaturedClients] = useState<{ id: string, name: string, order: number | null, description: string | null, img: string | null }[]>([])
    const [editState, setEditState] = useState<{ id: string, name: string, order: number | null, description: string | null, img: string | null }[]>([])
    const [toDelete, setToDelete] = useState<string[]>([])

    const [pickerOpen, setPickerOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [errorState, setErrorState] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const fetchData = async () => {
        const client = createClient()
        setToDelete([])
        const { data, error } = await client.from("featured_clients").select("*, clients(name)")
        if (error) {
            setErrorState(error.message)
        } else {
            const result = (data || []).map(each => ({
                id: each.client_id,
                name: each.clients?.name || "",
                description: each.description,
                img: each.img,
                order: each.order
            }))
            setFeaturedClients(result)
            setEditState(result)
        }
        setIsLoading(false)
    }

    console.log(editState)


    const handleSave = async () => {
        setIsSaving(true)
        const client = createClient()
        const { error: deleteError } = await client
            .from("featured_clients")
            .delete()
            .in("client_id", toDelete)
        
        if (deleteError) {
            setErrorState("Error deleting featured clients")
            console.log(deleteError)
            setIsSaving(false)
            return
        }

        const { data: savedData, error } = await client
            .from("featured_clients")
            .upsert(editState.filter(each => !toDelete.includes(each.id)).map(each => ({
                client_id: each.id,
                description: each.description,
                img: each.img,
                order: each.order
            })), { onConflict: "client_id" })
            .select("*, clients(name)")

        if (error) {
            setErrorState("Error saving featured clients")
            console.log(error)
            setIsSaving(false)
            return
        }

        fetchData()
        setIsSaving(false)
        setIsEditing(false)
    }

    
    const handlePickerDone = () => {
        fetchData()
        setPickerOpen(false)
    }

    const handleReorder = (oldIndex: number, newIndex: number) => {
        const newState = [...editState]
            .toSorted((a, b) => (a.order || 1000) - (b.order || 1000))
            .map((each, index) => ({
                ...each,
                order: index + 1
            }))
        newState.forEach(each => {
            if (each.order === oldIndex) {
                each.order = newIndex
            } else {
                if (each.order > oldIndex) {
                    each.order -= 1
                }

                if (each.order >= newIndex) {
                    each.order += 1
                }
            }
        })
        setEditState(newState)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="w-full md:w-1/2">
            <div className="text-2xl font-bold">Featured Clients</div>

            <div className="flex flex-col gap-2 my-4 text-blue-500 underline">
                <Link href="/#client-highlights" target="_blank">View on main site</Link>
                <Link href="/admin/clients" target="_blank">Manage Clients</Link>
            </div>

            {errorState && <div className="text-red-500">{errorState}</div>}

            <div className="flex flex-col my-4 gap-2 w-full">
                {featuredClients.length === 0 && <div className="text-gray-500">No featured clients</div>}
                {editState.toSorted((a, b) => (a.order || 1000) - (b.order || 1000)).map((client, clientIndex) => (
                    <details key={client.id} className="flex flex-col gap-2 w-full p-2 border border-gray-300 rounded-md w-full">
                        <summary>
                            <span className={`${toDelete.includes(client.id) ? "text-gray-500 line-through" : ""}`}>{client.name}</span>
                        </summary>
                        <div className="ml-6 flex flex-col gap-2 my-2 w-full">

                            {toDelete.includes(client.id) && <div className="text-gray-500">This Item is Trash. Click Undo to restore.</div>}
                            {!toDelete.includes(client.id) && (
                                <div>
                                    <div>
                                        <label className="text-sm font-bold mr-2">Order</label>
                                        <select
                                            disabled={!isEditing}
                                            value={clientIndex + 1}
                                            onChange={e => handleReorder(clientIndex + 1, parseInt(e.target.value))}
                                        >
                                            {Array.from({ length: 3 }, (_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold">Description</label>
                                        <div className="w-2/3 h-fit border border-gray-300 rounded-md">
                                            <AutoGrowTextarea
                                                disabled={!isEditing}
                                                value={client.description || ""}
                                                className="w-full"
                                                onChange={(e) => setEditState(editState.map(every => every.id === client.id ? { ...client, description: e.target.value } : every))}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold">Logo</label>
                                        {!client.img &&
                                            <div className="text-gray-400 italic">No image selected</div>}
                                        {client.img &&
                                            <img src={client.img || ""} alt={client.name} className="w-[200px] h-auto border border-gray-300 rounded-md" />}
                                        {isEditing &&
                                            <ImgPicker
                                                img={client.img || ""}
                                                setImg={(newImg) => setEditState(editState.map(each => client.id === each.id ? { ...client, img: newImg } : each))}
                                            />}
                                    </div>
                                </div>
                            )}

                            {toDelete.includes(client.id)
                                ? <FaUndo onClick={() => setToDelete(toDelete.filter(id => id !== client.id))} />
                                : isEditing && <FaTrash onClick={() => setToDelete([...toDelete, client.id])} />}
                        </div>
                    </details>
                ))}
            </div>

            {pickerOpen &&
                <div className="fixed bottom-0 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center" onClick={() => setPickerOpen(false)}>
                    <Picker done={handlePickerDone} />
                </div>}

            {isEditing &&
                <div
                    className="rounded-md mt-8 text-sm flex gap-2 items-center cursor-pointer"
                    onClick={() => {
                        if (editState.length < 3) {
                            setPickerOpen(true)
                        } else {
                            alert("You can only have 3 featured clients. Delete one to add another.")
                        }
                    }}>
                    <FaPlus /> Add Featured Client
                </div>}

            {isSaving && <Spinner />}

            <div className="flex flex-row gap-2 mt-8">
                {isEditing && (
                    <div className="flex flex-row gap-2">
                        <button
                            className="border border-gray-300 px-2 py-1 rounded-md"
                            onClick={() => {
                                setIsEditing(false)
                                setEditState(featuredClients)
                            }}>
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={handleSave}>Save</button>
                    </div>
                )}
                {!isEditing && (
                    <button className="border border-gray-300 px-2 py-1 rounded-md" onClick={() => setIsEditing(true)}>Edit</button>
                )}
            </div>

        </div>
    )
}

export default FeaturedClients