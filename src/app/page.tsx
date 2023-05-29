'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import supabase from '@/lib/supabase/client'

export default function HHome() {
    const router = useRouter()

    const redirect = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        console.log(user)

        if (user) {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error) {
                throw error
            }

            if (!data.has_onboarded) {
                router.push('/onboarding')
            } else {
                router.push('/tabs/pages')
            }
        } else {
            router.push('/login')
        }
    }

    useEffect(() => {
        redirect()
    }, [])

    return null
}
