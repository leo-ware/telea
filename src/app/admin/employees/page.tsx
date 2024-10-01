"use client"
import Spinner from "@/components/Spinner"
import { createClient } from "@/supabase/client"
import { Database } from "@/supabase/types"
import Link from "next/link"
import useSWR, { mutate } from "swr"
import { useDrag, useDrop } from "react-dnd"
import { useState } from "react"
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io"
import AutoGrowTextarea from "@/components/AutoGrowTextArea"

const DRAG_TYPE = "employee"
const SWR_KEY = "/api/employees"

const EmployeeCard = ({ employee, editEmployee, deleteEmployee, uploadProfilePic }: { employee: Database["public"]["Tables"]["employees"]["Row"], uploadProfilePic: (employeeId: number, file: File) => void, deleteEmployee: (id: number) => void, editEmployee: (employee: Database["public"]["Tables"]["employees"]["Row"]) => void }) => {
    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editState, setEditState] = useState(employee)

    const save = () => {
        setEditing(false)
        // @ts-ignore
        delete editState.img
        editEmployee(editState)
    }

    const [collected, drag] = useDrag({
        type: DRAG_TYPE,
        item: { id: employee.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => !editing,
    })

    return (
        <div
            // @ts-ignore
            ref={drag}
            className={`p-2 border border-gray-200 rounded ${collected.isDragging ? "opacity-50" : ""}`}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                    {open && <IoMdArrowDropdown size={24} onClick={() => setOpen(false)} />}
                    {!open && <IoMdArrowDropright size={24} onClick={() => setOpen(true)} />}
                    {!editing && (
                        employee.name
                            ? <span>{employee.name}</span>
                            : <span className="text-gray-500">New Employee</span>
                    )}
                    {editing &&
                        <input
                            className="border border-gray-200 rounded p-1"
                            placeholder="Name"
                            value={editState.name || ""}
                            onChange={(e) => setEditState({ ...editState, name: e.target.value })} />}
                </div>
                {open && !collected.isDragging &&
                    <div className="text-sm pl-8 flex flex-col gap-2">
                        {!editing && <div className="text-sm text-bold">{employee.title}</div>}
                        {editing &&
                            <input
                                value={editState.title || ""}
                                onChange={(e) => setEditState({ ...editState, title: e.target.value })}
                                className="border border-gray-200 rounded p-1 min-w-36"
                                placeholder="Title" />
                        }
                        {!editing && employee.linkedin &&
                            <Link
                                href={employee.linkedin}
                                target="_blank"
                                className={"text-sm underline text-blue-500"}>
                                {employee.linkedin}
                            </Link>
                        }
                        {!editing && !employee.linkedin && (
                            <div className="text-sm">(No LinkedIn)</div>
                        )}
                        {editing &&
                            <input
                                value={editState.linkedin || ""}
                                onChange={(e) => setEditState({ ...editState, linkedin: e.target.value })}
                                className="border border-gray-200 rounded p-1 min-w-36"
                                placeholder="https://linkedin.com/in/..." />
                        }
                        {!editing && <div className="text-sm">{employee.bio || "(No bio)"}</div>}
                        {editing &&
                            <div className="w-full h-fit">
                                <AutoGrowTextarea
                                    value={editState.bio || ""}
                                    onChange={(e) => setEditState({ ...editState, bio: e.target.value })}
                                    className="border border-gray-200 rounded p-1 min-w-36 w-full"
                                    placeholder="Bio" />
                            </div>
                        }
                        <img src={employee.img || ""} className="w-32 h-auto" alt={employee.name + " picture"} />
                        {editing &&
                            <label className="text-sm text-gray-500">
                                <input type="file" onChange={(e) => {
                                    if (e.target.files) {
                                        uploadProfilePic(employee.id, e.target.files[0])
                                    }
                                }} />
                            </label>
                        }
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    if (editing) {
                                        save()
                                    } else {
                                        setEditing(true)
                                    }
                                }}
                                className="text-sm text-gray-500 border border-gray-400 rounded py-1 px-2 mt-4">
                                {editing ? "Save" : "Edit"}
                            </button>
                            {editing &&
                                <button
                                    onClick={() => {
                                        setEditState(employee)
                                        setEditing(false)
                                    }}
                                    className="text-sm text-gray-500 border border-gray-400 rounded py-1 px-2 mt-4">
                                    Undo
                                </button>}
                            <button
                                onClick={() => {
                                    if (employee.id && confirm(`Are you sure you want to delete ${employee.name || "New Employee"}?`)) {
                                        deleteEmployee(employee.id)
                                    }
                                }}
                                className="text-sm text-gray-500 border border-gray-400 rounded py-1 px-2 mt-4">
                                Delete
                            </button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

const DropTarget = (props: { order: number, onDrop: (employeeId: number, newOrder: number) => void }) => {
    const [collected, drop] = useDrop({
        accept: DRAG_TYPE,
        drop: (item: { id: number }) => {
            props.onDrop(item.id, props.order)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    return (
        <div
            // @ts-ignore
            ref={drop}
            className={`w-full h-4 ${collected.isOver ? "bg-gray-300" : "bg-white"}`} />
    )
}

export default function Employees() {
    const client = createClient()

    const { data, error, isLoading } = useSWR(SWR_KEY, async () => {
        const { data, error } = await client.from("employees").select("*")
        if (error) {
            throw new Error(error.message)
        }
        return data
    })

    if (data) {
        data.sort((a, b) => (a.id - b.id))
        data.sort((a, b) => (a.order === null ? Infinity : a.order) - (b.order === null ? Infinity : b.order))
    }

    const reorder = (employeeId: number, newOrder: number) => {
        if (data) {
            const newPosition = Object.fromEntries(data.map((employee, i) => ([
                employee.id,
                employee.id === employeeId
                    ? newOrder
                    : i >= newOrder
                        ? i + 1
                        : i,
            ])))

            if (Math.min(newPosition.keys) !== 0) {
                for (const [key, value] of Object.entries(newPosition)) {
                    newPosition[key] = value - 1
                }
            }

            const upserts = data.map((employee) => ({ ...employee, order: newPosition[employee.id] }))
            mutate(SWR_KEY, upserts, false)

            client.from("employees").upsert(upserts, { onConflict: "id" }).select("*").then(console.log)
        }
    }

    const editEmployee = (employee: Database["public"]["Tables"]["employees"]["Row"]) => {
        if (data) {
            const employeeOld = data.find((e) => e.id === employee.id)
            const employeeNew = { ...employeeOld, ...employee }
            mutate(SWR_KEY, data.map((e) => e.id === employee.id ? employeeNew : e), false)
            client.from("employees").upsert({ ...employeeNew }, { onConflict: "id" }).select("*").then(console.log)
        }
    }

    const deleteEmployee = (employeeId: number) => {
        if (data) {
            mutate(SWR_KEY, data.filter((e) => e.id !== employeeId), false)
            client.from("employees").delete().eq("id", employeeId).select("*").then(console.log)
        }
    }

    const addEmployee = () => {
        if (data) {
            const newEmployee = { id: data.length + 1, name: "", title: "", linkedin: "", bio: "", order: data.length }
            mutate(SWR_KEY, [...data, newEmployee], false)
            client.from("employees").insert(newEmployee).select("*").then(console.log)
        }
    }

    const uploadProfilePic = async (employeeId: number, file: File) => {
        if (data) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file.")
                return
            }
            const extension = file.type.split("/")[1].split("+")[0]

            const { data: imgData, error } = await client
                .storage
                .from("profile_pictures")
                .upload(`employees/${employeeId}_${Date.now()}.${extension}`, file, { upsert: true })

            if (error) {
                console.error(error)
                alert("Error uploading profile picture")
                return
            }

            const { data: { publicUrl } } = client.storage.from("profile_pictures").getPublicUrl(imgData.path)
            console.log(publicUrl)

            const employee = data.find((e) => e.id === employeeId)
            if (employee) {
                editEmployee({ ...employee, img: publicUrl })
            }
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <Link href="/people" prefetch={false} className="underline text-sm text-blue-500 mb-4">View Page</Link>
            <div className="text-sm text-gray-500 mb-4">Drag employees to reorder them. Click on an employee to edit them.</div>
            {isLoading && <Spinner />}
            {error && <div className="text-red-500">Error loading employees</div>}
            {data &&
                <div className="flex flex-col">
                    <DropTarget order={0} onDrop={reorder} />
                    {data.map((each, i) => (
                        <div key={`employee-${each.id}`} className="flex flex-col">
                            <EmployeeCard
                                key={`employee-${each.id}`}
                                employee={each}
                                editEmployee={editEmployee}
                                deleteEmployee={deleteEmployee}
                                uploadProfilePic={uploadProfilePic}
                            />
                            <DropTarget key={`target-${i}`} order={i + 1} onDrop={reorder} />
                        </div>
                    ))}
                    <button
                        onClick={addEmployee}
                        className="text-sm w-fit text-gray-500 border border-gray-400 rounded py-1 px-2 mt-4">
                        New Employee
                    </button>
                </div>
            }
        </div>
    )
}