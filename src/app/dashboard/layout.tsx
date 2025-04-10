"use client"
import React, { useEffect } from 'react'
import Sidebar from '../components/Common/Sidebar'
import { useRouter } from 'next/navigation'
import TopBar from '../components/Common/TopBar'

function layout({ children }: any) {
    const router = useRouter()
    useEffect(() => {
        const localstorage = localStorage.getItem("userlogin")
        if (localstorage) router.push("/dashboard")
        else router.push("/login")
    }, [])
    return (
        <div className="flex min-h-screen">
            <div className='sticky top-0 left-0 w-[300px] bg-gray-800 text-white py-4 '>

                <Sidebar />
            </div>
            <div className='flex flex-col grow'>
                <header className="bg-gray-800 text-white py-4 px-4 shadow-md sticky top-0 z-10">
                    <TopBar />
                </header>
                <main className="flex-1 bg-gray-100 p-6 h-screen overflow-auto">{children}</main>
            </div>
        </div>
    )
}

export default layout