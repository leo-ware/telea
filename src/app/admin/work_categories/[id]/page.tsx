"use client"

import AutoGrowTextarea from "@/components/AutoGrowTextArea";
import ImgPicker from "@/components/ImgPicker";
import Spinner from "@/components/Spinner";
import { createClient } from "@/supabase/client";
import { Database } from "@/supabase/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { MdAdd, MdClose, MdDelete, MdUndo } from "react-icons/md";

const DND_ITEM_TYPE = "client_category"

type WorkCategory = Database["public"]["Tables"]["work_categories"]["Row"]
type ClientCategory = Database["public"]["Tables"]["client_categories"]["Insert"]

type ClientCategoryWidgetProps = {
    clientCategory: ClientCategory
    i: number
    clientCategoriesOpen: number[]
    setClientCategoriesOpen: (clientCategoriesOpen: number[]) => void
    clientCategoriesToDelete: number[]
    setClientCategoriesToDelete: (clientCategoriesToDelete: number[]) => void
    isEditing: boolean
    setIsEditing: (isEditing: boolean) => void
    clientCategoryEditState: ClientCategory[]
    setClientCategoryEditState: (clientCategoryEditState: ClientCategory[]) => void
    handleDeleteClientCategory: (clientCategory: { id?: number, name?: string }) => void
}

const ClientCategoryWidget = ({ clientCategory, i, clientCategoriesOpen, setClientCategoriesOpen, clientCategoriesToDelete, setClientCategoriesToDelete, isEditing, setIsEditing, clientCategoryEditState, setClientCategoryEditState, handleDeleteClientCategory }: ClientCategoryWidgetProps) => {

    const isDeleted = clientCategory.id && clientCategoriesToDelete.includes(clientCategory.id)
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: DND_ITEM_TYPE,
        item: () => {
            console.log("item")
            return { clientCategory, i }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div
            key={i}
            className={`p-2 m-1 grow ${collected.isDragging ? "opacity-50" : ""}`}
            // @ts-ignore
            ref={dragPreview}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {(isEditing && !isDeleted) && (
                        <div
                            // @ts-ignore
                            ref={drag}
                        >
                            <HiDotsVertical size={20} />
                        </div>
                    )}
                    <div className="cursor-pointer flex items-center justify-center w-4 h-4">
                        {clientCategoriesOpen.includes(i)
                            ? <IoMdArrowDropdown
                                size={16}
                                onClick={() => setClientCategoriesOpen(clientCategoriesOpen.filter((id) => id !== i))}
                            />
                            : <IoMdArrowDropright
                                size={16}
                                onClick={() => setClientCategoriesOpen([...clientCategoriesOpen, i])}
                            />}
                    </div>

                    <div className={
                        isDeleted
                            ? "p-1 w-full line-through text-gray-300"
                            : isEditing ? "rounded-md border border-gray-300 p-1 w-full" : "p-1 w-full"}>
                        <input
                            type="text"
                            className="w-full rounded-md bg-white"
                            value={clientCategory.name || ""}
                            disabled={!isEditing}
                            onChange={(e) => {
                                const newClientCategories = [...clientCategoryEditState]
                                newClientCategories[i].name = e.target.value
                                setClientCategoryEditState(newClientCategories)
                            }}
                        />
                    </div>
                </div>

                <div>
                    {isDeleted
                        ? <MdUndo
                            size={20}
                            onClick={() => {
                                setClientCategoriesToDelete(clientCategoriesToDelete.filter((id) => id !== clientCategory.id))
                            }}
                        />
                        : <MdDelete
                            size={20}
                            onClick={() => handleDeleteClientCategory({ id: clientCategory.id, name: clientCategory.name || undefined })}
                        />}
                </div>
            </div>
            {!isDeleted && clientCategoriesOpen.includes(i) && (
                <div className="flex flex-col gap-2 text-sm m-2">
                    <div className="w-full">
                        <label className="text-sm font-bold">Link Text</label>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <input
                                type="text"
                                className="w-full p-2 rounded-md"
                                value={clientCategory.link_text || ""}
                                disabled={!isEditing}
                                placeholder="Link Text"
                                onChange={(e) => {
                                    const newClientCategories = [...clientCategoryEditState]
                                    newClientCategories[i].link_text = e.target.value
                                    setClientCategoryEditState(newClientCategories)
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="text-sm font-bold">Link Description</label>
                        <div className="w-full h-fit border border-gray-300 rounded-md">
                            <AutoGrowTextarea
                                className="w-full p-2 rounded-md"
                                placeholder="Link Description"
                                value={clientCategory.link_description || ""}
                                disabled={!isEditing}
                                onChange={(e) => {
                                    const newClientCategories = [...clientCategoryEditState]
                                    newClientCategories[i].link_description = e.target.value
                                    setClientCategoryEditState(newClientCategories)
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const DropTarget = () => {
    const [collected, drop] = useDrop(() => ({
        accept: DND_ITEM_TYPE,
        collect: (monitor) => ({
            isDragging: !!monitor.getItem(),
            isOver: !!monitor.isOver()
        })
    }))

    if (collected.isDragging) {
        console.log("isDragging")
    }

    return (
        <div
            // @ts-ignore
            ref={drop}
            className={`${collected.isOver ? "bg-gray-200" : ""} ${collected.isDragging ? "h-8" : ""}`}
        >
            {collected.isDragging && "Drop Here"}
        </div>
    )
}

const EditWorkCategoryPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)
    const client = createClient()

    const [workCategory, setWorkCategory] = useState<WorkCategory | null>(null)
    const [editState, setEditState] = useState<WorkCategory | null>(null)
    const [clientCategories, setClientCategories] = useState<ClientCategory[] | null>(null)
    const [clientCategoryEditState, setClientCategoryEditState] = useState<ClientCategory[] | null>(null)
    const [clientCategoriesToDelete, setClientCategoriesToDelete] = useState<number[]>([])

    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [errorState, setErrorState] = useState<string | null>(null)
    const [clientCategoriesOpen, setClientCategoriesOpen] = useState<number[]>([])

    useEffect(() => {
        const fetchWorkCategory = async () => {
            const { data, error } = await client
                .from("work_categories")
                .select("*")
                .eq("id", id)
                .single()

            if (error) {
                setErrorState(error.message)
                return
            }

            setWorkCategory(data)
            setEditState(data)
        }
        fetchWorkCategory()
    }, [id])

    const fetchClientCategories = async () => {
        const { data, error } = await client
            .from("client_categories")
            .select("*")
            .eq("work_category_id", id)
            .order("order", { ascending: true, nullsFirst: false })

        if (error) {
            setErrorState(error.message)
        } else {
            setClientCategories(data)
            setClientCategoryEditState(data)
        }
    }
    useEffect(() => {
        fetchClientCategories()
    }, [])

    const handleAddClientCategory = () => {
        setClientCategoryEditState([...(clientCategoryEditState || []), {
            name: "Untitled Client Category",
            link_text: "",
            link_description: "",
            work_category_id: parseInt(id),
            order: Math.max(...((clientCategoryEditState || []).map(each => each.order || 0))) + 1
        }])
    }

    const handleSave = async () => {
        if (editState) {
            if (!editState.slug) {
                setErrorState("Slug is required")
                return
            }

            setIsSaving(true)
            setIsEditing(false)

            const { data: selectData, error: selectError } = await client
                .from("work_categories")
                .select("*")

            if (selectError) {
                setErrorState(selectError.message)
                setIsEditing(true)
                setIsSaving(false)
                return
            }

            let checkFailed = false
            selectData.forEach((category) => {
                if (category.name === editState.name && (category.id !== parseInt(id))) {
                    setErrorState("Work category with this name already exists")
                    checkFailed = true
                }
                if (category.slug === editState.slug && (category.id !== parseInt(id))) {
                    setErrorState("Work category with this slug already exists")
                    checkFailed = true
                }

            })

            if (checkFailed) {
                setIsEditing(true)
                setIsSaving(false)
                return
            }

            const { data, error } = await client
                .from("work_categories")
                .update(editState)
                .eq("id", id)
                .select()
                .single()

            if (error) {
                console.error(error)
                setErrorState("Error updating work category, check console for details")
                setIsEditing(true)
            } else {
                setWorkCategory(data)
                setEditState(data)
            }

            const clientCategoryInserts = clientCategoryEditState?.filter((clientCategory) => !clientCategory.id)
            const clientCategoryUpdates = clientCategoryEditState?.filter((clientCategory) => clientCategory.id)

            const { error: clientCategoryInsertError } = await client
                .from("client_categories")
                .insert(clientCategoryInserts || [])
                .select()

            const { error: clientCategoryUpsertError } = await client
                .from("client_categories")
                .upsert(clientCategoryUpdates || [], { onConflict: "id" })

            if (clientCategoryInsertError || clientCategoryUpsertError) {
                console.error(clientCategoryInsertError)
                console.error(clientCategoryUpsertError)
                setErrorState("Error updating client categories, check console for details")
                setIsEditing(true)
            }

            if (clientCategoriesToDelete.length > 0 && confirm("Are you sure you want to delete the selected client categories?")) {
                const { error: clientCategoryDeleteError } = await client
                    .from("client_categories")
                    .delete()
                    .in("id", clientCategoriesToDelete)

                if (clientCategoryDeleteError) {
                    setErrorState(clientCategoryDeleteError.message)
                    setIsEditing(true)
                } else {
                    setClientCategoriesToDelete([])
                }
            } else {
                setClientCategoriesToDelete([])
            }

            await fetchClientCategories()

            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this work category?")) {
            const { error } = await client
                .from("work_categories")
                .delete()
                .eq("id", id)

            if (error) {
                setErrorState(error.message)
            } else {
                window.location.href = "/admin/work_categories"
            }
        }
    }

    const handleDeleteClientCategory = ({ id, name }: { id?: number, name?: string }) => {
        if (id) {
            setClientCategoriesToDelete([...(clientCategoriesToDelete || []), id])
        } else if (name) {
            if (confirm(`Are you sure you want to delete "${name}"? Unsaved progress will be lost.`)) {
                setClientCategoryEditState((clientCategoryEditState || []).filter((clientCategory) => clientCategory.name !== name))
            }
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditState(workCategory)
        setClientCategoryEditState(clientCategories)
    }

    const reorderClients = (oldOrder: number, newOrder: number) => {
        const newClientCategories = [...(clientCategoryEditState || []).map(each => ({ ...each }))]
        newClientCategories.forEach((clientCategory) => {
            if (clientCategory.order === oldOrder) {
                clientCategory.order = newOrder
            } else {
                if (clientCategory.order && clientCategory.order > oldOrder) {
                    clientCategory.order -= 1
                    console.log("decrementing", clientCategory.name, clientCategory.order)
                }
                
                if (clientCategory.order && clientCategory.order >= newOrder) {
                    clientCategory.order += 1
                    console.log("incrementing", clientCategory.name, clientCategory.order)
                }
            }
        })
        setClientCategoryEditState(newClientCategories)
    }

    useEffect(() => {
        if (editState && editState.name) {
            setEditState({ ...editState, slug: editState.name.trim().toLowerCase().replace(/ /g, "-") })
        }
    }, [editState?.name])

    const loading = !workCategory || !clientCategories

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Edit Work Category</h1>

            <a
                href="/admin/work_categories"
                className="text-blue-500 underline my-4"
            >
                Back to Work Categories
            </a>

            <a
                href={`/work/${workCategory?.slug}`}
                className="ml-2 text-blue-500 underline my-4"
                target="_blank"
            >
                View on Main Site
            </a>

            {errorState && <div className="text-red-500">{errorState}</div>}

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
                    <label className="text-sm font-bold">Description</label>
                    <div className="w-full h-fit border border-gray-300 rounded-md">
                        <AutoGrowTextarea
                            className="w-full p-2 rounded-md"
                            placeholder="Description"
                            value={editState?.description || ""}
                            disabled={!isEditing}
                            onChange={(e) => setEditState(editState && { ...editState, description: e.target.value })}
                        />
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

                <div className="w-full">
                    <label className="text-sm font-bold">Landing Page Description</label>
                    <div className="text-xs text-gray-500">There is a widget on the landing page that displays this description</div>
                    <div className="w-full h-fit border border-gray-300 rounded-md">
                        <AutoGrowTextarea
                            className="w-full p-2 rounded-md"
                            placeholder="Landing Page Description"
                            value={editState?.landing_page_description || ""}
                            disabled={!isEditing}
                            onChange={(e) => setEditState(editState && { ...editState, landing_page_description: e.target.value })}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <label className="text-sm font-bold">Landing Page Link Text</label>
                    <div className="text-xs text-gray-500">The link from the widget on the landing page will display this text</div>
                    <div className="w-full h-fit border border-gray-300 rounded-md">
                        <input
                            type="text"
                            className="w-full p-2 rounded-md"
                            placeholder="Landing Page Link Text"
                            value={editState?.landing_page_link_text || ""}
                            disabled={!isEditing}
                            onChange={(e) => setEditState(editState && { ...editState, landing_page_link_text: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-bold">Client Categories</label>
                    {isEditing && <div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddClientCategory}
                                className="text-xs bg-gray-300 px-2 py-1 rounded-md"
                            >
                                Add
                            </button>
                        </div>
                    </div>}
                    <div>
                        {clientCategoryEditState?.toSorted((a, b) => (a.order || 0) - (b.order || 0)).map((clientCategory, i) => (
                            <div className="flex gap-2 items-start w-full">
                                <select
                                    className="w-8 mt-4"
                                    disabled={!isEditing}
                                    value={clientCategory.order || 0}
                                    onChange={(e) => reorderClients(i + 1, parseInt(e.target.value))}
                                >
                                    {Array.from({ length: (clientCategoryEditState?.length || 0) }, (_, i) => (
                                        <option value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <ClientCategoryWidget
                                    key={"client-" + i}
                                    clientCategory={clientCategory}
                                    i={i}
                                    clientCategoriesOpen={clientCategoriesOpen}
                                    setClientCategoriesOpen={setClientCategoriesOpen}
                                    clientCategoriesToDelete={clientCategoriesToDelete}
                                    setClientCategoriesToDelete={setClientCategoriesToDelete}
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                    clientCategoryEditState={clientCategoryEditState}
                                    setClientCategoryEditState={setClientCategoryEditState}
                                    handleDeleteClientCategory={handleDeleteClientCategory}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isSaving && (
                <div className="flex justify-start items-start gap-2">
                    <div className="w-8 h-8">
                        <Spinner />
                    </div>
                    <div>Saving...</div>
                </div>
            )}

            {!isEditing && (
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            )}
            {isEditing && (
                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-black px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}

export default EditWorkCategoryPage;