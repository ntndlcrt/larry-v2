'use client'

import { useState, useEffect } from 'react'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'

import Page from '@/components/UI/Page'

export default function SharedTab() {
    const [sharedPages, setSharedPages] = useState(
        null as Database['public']['Tables']['pages']['Row'][] | null
    )

    const getSharedPages = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select(`*, pages!shared_pages(*)`)
            .eq('id', 'fff758b7-b477-454a-b01f-9e8b8d74a187')
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
