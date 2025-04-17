"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Loader from './components/Common/Loader'

function Page({ children }: any) {
  const router = useRouter()
  useEffect(() => {
    const localstorage = localStorage.getItem("userlogin")
    if (localstorage) router.push("/dashboard")
    else router.push("/login")
  }, [router])

  return (
    <div>
          <Loader />
          {children}
    </div>
  )
}

export default Page
