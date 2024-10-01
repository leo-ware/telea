import Spinner from "@/components/Spinner"
import { createClient } from "@/supabase/server"
import Link from "next/link"


const Jobs = async () => {
    const client = createClient()
    const { data, error } = await client.from('jobs').select('*').order('created_at', { ascending: false })
    if (error) {
        return <div className="text-red-500">Error</div>
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">All Job Postings</h1>
            <Link href="/careers" className="text-blue-500 underline">View Job Board on main site</Link>
            <div className="flex flex-col gap-2 my-8">
                {(data || []).map((job) => (
                    <div key={job.id} className="flex gap-2">
                        <div>{new Date(job.created_at).toLocaleDateString()}</div>
                        <Link className="underline text-blue-500" href={`/admin/jobs/${job.id}`}>{job.title || "Untitled Job"}</Link>
                        <div>{job.company}</div>
                    </div>
                ))}
            </div>
            <Link href="/admin/jobs/new" className="border border-gray-300 p-2 rounded-md">
                New Job Posting
            </Link>
        </div>
    )
}

export default Jobs
