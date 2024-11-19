import Link from "next/link"


const AdminHome = () => {
    const linkcss = "md:w-5/12 w-full border rounded-md p-4"
    return (
        <div>
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Admin Home</h1>
                <p className="text-sm text-gray-500">
                    This is the admin page. Here you can edit certain website content.

                    <div className="flex flex-col gap-1 underline my-2">
                        <Link href="/admin/readme">How to use this page</Link>

                        <Link href="/admin/docs">Technical Info</Link>
                    </div>
                </p>
            </div>

            <div className="flex flex-wrap gap-6">
                <Link className={linkcss} href="/admin/inbox">
                    <div className="font-bold">Inbox</div>
                    <div>
                        Events you should be aware of
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/jobs">
                    <div className="font-bold">Jobs</div>
                    <div>
                        Manage the jobs board, including partner postings
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/events">
                    <div className="font-bold">Events</div>
                    <div>
                        Manage the events board
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/employees">
                    <div className="font-bold">Employees</div>
                    <div>
                        Edit employee profiles
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/clients">
                    <div className="font-bold">Clients</div>
                    <div>
                        Edit client profiles
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/work_categories">
                    <div className="font-bold">Work Categories</div>
                    <div>
                        E.g., Impact Consulting
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/client_categories">
                    <div className="font-bold">Client Categories</div>
                    <div>
                        E.g., Nonprofits
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/featured_clients">
                    <div className="font-bold">Featured Clients</div>
                    <div>
                        Which clients to feature on the landing page
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/images">
                    <div className="font-bold">Images</div>
                    <div>
                        Edit images displayed in key locations, such as the landing page
                    </div>
                </Link>

                <Link className={linkcss} href="/admin/external_links">
                    <div className="font-bold">External Links</div>
                    <div>
                        Manage external links, such as social media
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AdminHome