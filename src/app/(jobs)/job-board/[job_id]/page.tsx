import Markdown from "@/components/Markdown"
import { createClient } from "@/supabase/server"
import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import { IoMdArrowRoundBack } from "react-icons/io"

const JobPosting = async ({ params }: { params: Promise<{ job_id: string }> }) => {
    const { job_id } = await params
    const client = createClient()
    const { data: job, error } = await client.from('jobs').select('*').eq('id', job_id).single()
    if (error) {
        console.error(error)
    }
    if (!job) {
        return <div>Job not found</div>
    }

    const infoPanel = [
        ["Company", job.company],
        ["Location", job.location],
        ["Type", job.type],
        ["Apply By", job.deadline]
    ]

    return (
        <div className="w-full bg-white" style={{ minHeight: "100vh" }}>
            <div className="md:h-20  flex items-center justify-center">

            </div>
            <div className="w-full md:grid md:grid-cols-12 py-10 px-10 lg:px-0">
                <Link href="/careers" className="md:col-start-3 col-span-1">
                    <IoMdArrowRoundBack size={32} color="gray" />
                </Link>
                <div className="md:col-start-5 col-span-5 mb-8 mt-4 md:mt-0 text-wrap text-3xl font-bold">{job.title}</div>
                <div className="col-start-3 col-span-2 flex flex-col mt-2 gap-2 md:gap-8">
                    {infoPanel.map(([name, value]) => (
                        <div className="flex md:flex-col items-center md:items-start md:gap-2">
                            <div className="text-md md:text-xl md:text-gray-600">{name}</div>
                            <div className="text-md mr-2 md:hidden">:</div>
                            <div className="text-md md:text-xl md:mt-2">{value}</div>
                        </div>
                    ))}
                    <Link
                        href={job.application || "/contact"}
                        target="_blank"
                        className="w-fit text-xl flex items-center gap-4 my-4 md:my-0 px-4 py-1 border border-black rounded-3xl">
                        Apply
                        <FaExternalLinkAlt size={16} />
                    </Link>
                </div>
                <div className="col-start-5 col-span-5">
                    <div className="flex flex-col gap-4 mb-4">
                        <Markdown content={job.description || ""} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JobPosting