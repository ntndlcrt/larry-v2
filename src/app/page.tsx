'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import supabase from '@/lib/supabase/client'

export default function HHome() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const getProfile = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    useEffect(() => {
        getProfile()

        if (isLoggedIn) {
            router.push('/tabs/pages')
        } else {
            router.push('/login')
        }
    }, [])

    return null
}
