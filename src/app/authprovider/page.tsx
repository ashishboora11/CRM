"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '../store/store'
import Loader from '../components/Common/Loader'
function AuthProvider({ children }: any) {

    return (
        <div>
            <SessionProvider>
                <Provider store={store}>
                    <Loader />
                    {children}
                </Provider>
            </SessionProvider>
        </div>
    )
}

export default AuthProvider