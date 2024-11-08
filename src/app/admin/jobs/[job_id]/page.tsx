"use client"

import AutoGrowTextarea from "@/components/AutoGrowTextArea"
import Spinner from "@/components/Spinner"
import { createClient } from "@/supabase/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { deleteJob } from "../actions"
import { MdCancel, MdDelete, MdEdit } from "react-icons/md"

const Job = ({ params }: { params: { job_id: string } }) => {
    const client = createClient()
    const { data, isLoading, error } = useSWR("/api/job/" + params.job_id, async () => {
        const { data, error } = await client.from('jobs').select('*').eq('id', params.job_id).single()
        if (error) {
            throw new Error(error.message)
        }
        return data
    })
    const [editMode, setEditMode] = useState(false)
    const [jobState, setJobState] = useState(data)
    useEffect(() => {
        setJobState(data)
    }, [data])
    const [success, setSuccess] = useState(false)

    if (error) {
        return <div className="text-red-500">Error</div>
    }

    if (isLoading || !jobState) {
        return <Spinner />
    }

    const handleCancel = () => {
        setEditMode(false)
        setJobState(data)
    }

    const handleSubmit = async () => {
        const { data, error } = await client.from('jobs').update(jobState).eq('id', jobState.id)
        if (error) {
            console.error(error)
        }
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Job Posting</h1>
            <Link href={`/job-board/${jobState.id}`} className="text-blue-500 underline mb-8">Go to Job Posting</Link>
            <br/>
            <Link href="/admin/jobs" className="text-blue-500 underline mb-8">Back to Jobs</Link>
            <div className="flex gap-2 my-4">
                <button
                    onClick={() => {
                        if (confirm("Are you sure you want to delete this job?")) {
                            deleteJob(jobState.id)
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

            <div className="flex flex-col gap-2 mt-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input
                        disabled={!editMode}
                        className="border border-gray-300 p-2 rounded-md"
                        type="text"
                        id="title"
                        name="title"
                        value={jobState.title || ""}
                        placeholder="Job Title"
                        onChange={(e) => setJobState({ ...jobState, title: e.target.value })}
                    />
                </div>
                <div className="flex gap-1">
                    <label htmlFor="is_telea">Is Telea Job</label>
                    <input
                        disabled={!editMode}
                        className="border border-gray-300 p-2 rounded-md"
                        type="checkbox"
                        id="is_telea"
                        name="is_telea"
                        checked={jobState.is_telea || false}
                        onChange={(e) => setJobState({
                            ...jobState,
                            is_telea: e.target.checked,
                            company: "Telea",
                            company_link: "https://teleainsights.com",
                        })}
                    />
                </div>
                {!jobState.is_telea &&
                    <div className="flex flex-col gap-1">
                        <label htmlFor="company">Company</label>
                        <input
                            disabled={!editMode}
                            className="border border-gray-300 p-2 rounded-md"
                            type="text"
                            id="company"
                            name="company"
                            value={jobState.company || ""}
                            placeholder="Company Name"
                            onChange={(e) => setJobState({ ...jobState, company: e.target.value })}
                        />
                    </div>}
                {!jobState.is_telea &&
                    <div className="flex flex-col gap-1">
                        <label htmlFor="company_link">Company Link</label>
                        <input
                            disabled={!editMode}
                            className="border border-gray-300 p-2 rounded-md"
                            type="text"
                            id="company_link"
                            name="company_link"
                            value={jobState.company_link || ""}
                            placeholder="Company Link"
                            onChange={(e) => setJobState({ ...jobState, company_link: e.target.value })}
                        />
                    </div>}

                <div className="flex flex-col gap-1">
                    <label htmlFor="location">Location</label>
                    <input
                        disabled={!editMode}
                        className="border border-gray-300 p-2 rounded-md"
                        type="text"
                        id="location"
                        name="location"
                        value={jobState.location || ""}
                        placeholder="Job Location (e.g., Remote)"
                        onChange={(e) => setJobState({ ...jobState, location: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="type">Type</label>
                    <select
                        disabled={!editMode}
                        className="border border-gray-300 p-2 rounded-md"
                        id="type"
                        name="type"
                        value={jobState.type || ""}
                        onChange={(e) => setJobState({ ...jobState, type: e.target.value })}
                    >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="deadline">Deadline</label>
                    <div className="text-sm text-gray-500">Job posting will be hidden after this date</div>
                    <input
                        disabled={!editMode}
                        className="border border-gray-300 p-2 rounded-md"
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={jobState.deadline || ""}
                        onChange={(e) => setJobState({ ...jobState, deadline: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="application_link">Application Link</label>
                    <div className="text-sm text-gray-500">
                        This should point to a Google Form or similar for Telea jobs.
                    </div>
                    <input
                        disabled={!editMode}
                        className="border border-gray-300 p-2 rounded-md"
                        type="text"
                        id="application_link"
                        name="application_link"
                        value={jobState.application || ""}
                        placeholder="Application Link"
                        onChange={(e) => setJobState({ ...jobState, application: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description_short">Short Description</label>
                    <div className="text-sm text-gray-500">This will be displayed in the job listings. Markdown is not supported.</div>
                    <input
                        disabled={!editMode}
                        className="border border-gray-300 p-2 rounded-md"
                        type="text"
                        id="description_short"
                        name="description_short"
                        value={jobState.description_short || ""}
                        placeholder="Short Description"
                        onChange={(e) => setJobState({ ...jobState, description_short: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="description">Description</label>
                    <div className="text-sm text-gray-500">Markdown is supported</div>
                    <AutoGrowTextarea
                        disabled={!editMode}
                        className="border border-gray-300 p-2 rounded-md"
                        // id="description"
                        // name="description"
                        value={jobState.description || ""}
                        placeholder="Job Description"
                        onChange={(e) => setJobState({ ...jobState, description: e.target.value })}
                    />
                </div>
            </div>

            {editMode &&
                <button
                    className="bg-blue-500 text-white p-2 rounded-md mt-8"
                    onClick={handleSubmit}
                >
                    Save
                </button>}
            {success && <div className="text-green-500">Job updated</div>}
        </div>
    )
}

export default Job