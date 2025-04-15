"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
function AuthProvider({ children }: any) {

    return (
        <div>
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}

export default AuthProvider