"use client"

import Spinner from "@/components/Spinner"
import { createClient } from "@/supabase/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"

const ExternalLinks = () => {
    const [links, setLinks] = useState<{ name: string, description?: string, url: string }[]>([])
    const [editLink, setEditLink] = useState<{ name: string, description?: string, url: string }[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        const getLinks = async () => {
            const client = createClient()
            const { data, error } = await client.from("external_links").select("*")
            setIsLoading(false)
            if (error) {
                setError(error.message)
            } else {
                const links = data || []
                setLinks(links)
                setEditLink(links)
            }
        }
        getLinks()
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        const client = createClient()
        const { error } = await client.from("external_links").upsert(editLink.map(l => ({ ...l, description: l.description || "" })))
        setIsSaving(false)
        if (error) {
            console.error(error)
            setError("An error occurred while saving the links")
        } else {
            setLinks(editLink)
            setIsEditing(false)
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div>
            <div className="text-2xl font-bold">External Links</div>

            <div className="text-sm text-gray-500">
                Make sure each link starts with "https://..." or "http://..." unless it is an email.
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <table className="w-full my-10">
                <thead>
                    <tr>
                        <th className="w-2/12 text-left">Name</th>
                        <th className="w-4/12 text-left">Description</th>
                        <th className="w-5/12 text-left">URL</th>
                        <th className="w-1/12 text-left">Test</th>
                    </tr>
                </thead>
                <tbody>
                    {editLink.map((link) => (
                        <tr key={link.name}>
                            <td className="text-wrap">{link.name}</td>
                            <td className="text-wrap">{link.description}</td>
                            <td className="text-wrap">
                                <div className={`p-1 pr-2 ${isEditing ? "border border-gray-300 rounded-md" : ""}`}>
                                    <input
                                        className="w-full"
                                        disabled={!isEditing}
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => setEditLink(prev => prev.map(l => l.name === link.name ? { ...l, url: e.target.value } : l))}
                                    />
                                </div>
                            </td>
                            <td>
                                {link.url.startsWith("http") &&
                                    <Link href={link.url} target="_blank">
                                        <FaExternalLinkAlt />
                                    </Link>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isSaving && <Spinner />}

            <div className="">
                {isEditing && (
                    <div className="flex gap-2">
                        <button
                            className="bg-gray-200 text-black px-2 py-1 rounded-md"
                            onClick={() => {
                                setIsEditing(false)
                                setEditLink(links)
                        }}>
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-md"
                            onClick={handleSave}>
                            Save
                        </button>
                    </div>
                )}
                {!isEditing && (
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={() => setIsEditing(true)}>Edit</button>
                )}
            </div>
        </div>
    )
}

export default ExternalLinks