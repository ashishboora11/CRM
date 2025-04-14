"use client"
import { User, Phone, Briefcase, Calendar, BarChart2, Settings, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
export default function Sidebar() {
    const router = useRouter()
    const { data: session } = useSession();
    const pathname = usePathname()

    function onhadellogout() {
        localStorage.removeItem("userlogin"),
            router.push("/login"),
            signOut()
    }

    return (
        <aside className=' flex flex-col h-full gap-5'>
            <h2 className="text-2xl font-bold  pt-3 ps-6">Dashboard</h2>
            <ul className="flex flex-col justify-around h-full grow">
                <li>
                    <Link href="/dashboard/contacts" className={`${pathname === "/dashboard/contacts" ? "bg-white text-gray-800" : "bg-transparent"} flex items-center gap-4 hover:bg-white px-6 py-4 text-xl hover:text-gray-800 w-full`}>
                        <Phone size={25} /> Contacts
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/leads" className={`${pathname === "/dashboard/leads" ? "bg-white text-gray-800" : "bg-transparent"} flex items-center gap-4 hover:bg-white px-6 py-4 text-xl hover:text-gray-800 w-full`}>
                        <User size={25} /> Leads
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/deals" className={`${pathname === "/dashboard/deals" ? "bg-white text-gray-800" : "bg-transparent"} flex items-center gap-4 hover:bg-white px-6 py-4 text-xl hover:text-gray-800 w-full`}>
                        <Briefcase size={25} /> Deals / Opportunities
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/tasks" className={`${pathname === "/dashboard/tasks" ? "bg-white text-gray-800" : "bg-transparent"} flex items-center gap-4 hover:bg-white px-6 py-4 text-xl hover:text-gray-800 w-full`}>
                        <Calendar size={25} /> Tasks / Calendar
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/reports" className={`${pathname === "/dashboard/reports" ? "bg-white text-gray-800" : "bg-transparent"} flex items-center gap-4 hover:bg-white px-6 py-4 text-xl hover:text-gray-800 w-full`}>
                        <BarChart2 size={25} /> Reports
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/settings" className={`${pathname === "/dashboard/settings" ? "bg-white text-gray-800" : "bg-transparent"} flex items-center gap-4 hover:bg-white px-6 py-4 text-xl hover:text-gray-800 w-full`}>
                        <Settings size={25} /> Settings
                    </Link>
                </li>
                <li>
                    <button
                        className="flex items-center gap-4 hover:bg-white px-6 py-4 text-xl hover:text-gray-800 w-full cursor-pointer"
                        onClick={onhadellogout}
                    >
                        <LogOut size={25} /> Logout
                    </button>
                </li>
            </ul>
        </aside>
    )
}
