'use client'

import { useState, useEffect } from 'react'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'

import Page from '@/components/UI/Page'

export default function SharedTab() {
    const [sharedPages, setSharedPages] = useState(
        null as Database['public']['Tables']['pages']['Row'][] | null
    )
    const [pages, setPages] = useState([] as any[])

    const getPageUser = async (userId: string | null) => {
        const { data, error } = await supabase
            .from('profiles')
            .select(`full_name, avatar_url`)
            .eq('id', userId)
            .single()

        if (error) {
            throw error
        }

        return data
    }

    const getSharedPages = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('profiles')
            .select(`*, pages!shared_pages(*)`)
            .eq('id', user!.id)
            .single()

        if (error) {
            throw error
        }

        setSharedPages(data.pages)
    }

    useEffect(() => {
        getSharedPages()
    }, [sharedPages])

    return (
        <div className="pt-10 flex flex-col px-2">
            {sharedPages &&
                sharedPages.map((page) => <Page key={page.id} {...page} />)}
        </div>
    )
}
