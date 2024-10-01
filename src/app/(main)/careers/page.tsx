import { createClient } from "@/supabase/server"
import { Database } from "@/supabase/types"
// import { teleaJobs, partnerJobs } from "./jobs"
import Link from "next/link"

const JobWidget = (job: Database['public']['Tables']['jobs']['Row']) => {
    return (
        <div className="w-full md:w-5/12 md:min-w-80 pl-6 py-1 border-l-2 border-black">
            <div className="flex justify-between mb-1">
                <Link href={`/job-board/${job.id}`} className="text-xl font-bold">{job.title}</Link>
                <div className="text-md text-gray-600">{job.location}</div>
            </div>
            <div className="text-md text-gray-600 mb-1">
                {job.company}
            </div>
            <div className="text-md">
                {job.description_short}
            </div>
        </div>
    )
}

const Careers = async () => {
    const client = createClient()
    const { data: jobs, error } = await client
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .gt('deadline', new Date().toISOString())

    if (error) {
        console.error(error)
        throw new Error("Failed to fetch jobs")
    }

    const teleaJobs = jobs.filter(job => job.is_telea)
    const partnerJobs = jobs.filter(job => !job.is_telea)

    return (
        <div>
            <div className="w-full flex flex-col items-center bg-prussian-blue text-white py-10">
                <div className="text-[80px]">Careers</div>

                <div className={" text-[30px] font-[100] pt-12 pb-8 w-7/12 text-center leading-tight"}>
                    Explore jobs at Telea and our parters.
                </div>
            </div>
            <div className="px-8 md:px-20">
                <div className="py-20">
                    <div className="pb-6 text-2xl font-bold">Jobs at Telea</div>
                    <div className="flex flex-wrap gap-12">
                        {teleaJobs.map(job => <JobWidget {...job} />)}
                    </div>
                    {!teleaJobs.length && <div className="text-md text-gray-500">No jobs are currently listed.</div>}
                </div>

                <div className="">
                    <div className="pb-6 text-2xl font-bold">Partner Jobs</div>
                    <div className="flex flex-wrap gap-12">
                        {partnerJobs.map(job => <JobWidget {...job} />)}
                    </div>
                    {!partnerJobs.length && <div className="text-md text-gray-500">No jobs are currently listed.</div>}
                </div>
                <div className="py-20">
                    <Link href="/create-job-post">
                        <div className="text-2xl font-bold">Hiring?</div>
                        <div className="my-4">We host open positions from a variety of organizations with aligned missions.</div>
                        <div className="py-2 px-3 border border-black rounded-3xl w-fit">Post a Job</div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Careers