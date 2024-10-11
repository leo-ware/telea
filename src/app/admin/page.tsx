import Link from "next/link"


const AdminHome = () => {
    return (
        <div>
            <div className="flex flex-col gap-2 underline text-blue-500">
                <Link href="/admin/employees">
                    Employees
                </Link>
                <Link href="/admin/jobs">
                    Jobs
                </Link>
                <Link href="/admin/events">
                    Events
                </Link>
                <Link href="/admin/work_categories">
                    Work Categories
                </Link>
            </div>
        </div>
    )
}

export default AdminHome