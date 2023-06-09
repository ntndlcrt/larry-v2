'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import supabase from '@/lib/supabase/client'

export default function HHome() {
    const router = useRouter()

    const redirect = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', 'fff758b7-b477-454a-b01f-9e8b8d74a187')
            .single()

        if (error) {
            throw error
        }

        if (!data.has_onboarded) {
            router.push('/onboarding')
        } else {
            router.push('/tabs/pages')
        }
    }

    useEffect(() => {
        redirect()
    }, [])

    return null
}
