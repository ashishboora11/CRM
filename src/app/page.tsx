"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
  const router = useRouter()
  useEffect(() => {
    const localstorage = localStorage.getItem("userlogin")
    if (localstorage) router.push("/dashboard")
    else router.push("/login")
  }, [])

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}

export default page
