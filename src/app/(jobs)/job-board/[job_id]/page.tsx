import Markdown from "@/components/Markdown"
import { createClient } from "@/supabase/server"
import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import { IoMdArrowRoundBack } from "react-icons/io"

const JobPosting = async ({ params }: { params: { job_id: string } }) => {
    const client = createClient()
    const { data: job, error } = await client.from('jobs').select('*').eq('id', params.job_id).single()
    if (error) {
        console.error(error)
    }
    if (!job) {
        return <div>Job not found</div>
    }
    return (
        <div className="w-full bg-white" style={{ minHeight: "100vh" }}>
            <div className="md:h-20  flex items-center justify-center">

            </div>
            <div className="w-full md:grid md:grid-cols-12 py-10 px-4 md:px-0">
                <Link href="/careers" className="md:col-start-3 col-span-1">
                    <IoMdArrowRoundBack size={32} color="gray" />
                </Link>
                <div className="md:col-start-5 col-span-5 mb-8 mt-4 md:mt-0 text-wrap text-3xl font-bold">{job.title}</div>
                <div className="col-start-3 col-span-2 flex flex-col mt-2 gap-2 md:gap-8">
                    <div>
                        <div className="text-xl text-gray-600">Company</div>
                        <div className="text-x mt-2">{job.company}</div>
                    </div>

                    <div>
                        <div className="text-xl text-gray-600">Location</div>
                        <div className="text-x mt-2">{job.location}</div>
                    </div>

                    <div>
                        <div className="text-xl text-gray-600">Type</div>
                        <div className="text-x mt-2">{job.type}</div>
                    </div>

                    <div>
                        <div className="text-xl text-gray-600">Apply By</div>
                        <div className="text-x mt-2">{job.deadline}</div>
                    </div>
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