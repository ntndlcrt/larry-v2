'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HHome() {
    const router = useRouter()

    useEffect(() => {
        router.push('/tabs/pages')
    }, [])

    return null
}
