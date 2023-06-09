'use client'

import { useState, useEffect } from 'react'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'
import Page from '@/components/UI/Page'

export default function TabPage() {
    const [pages, setPages] = useState(
        null as Database['public']['Tables']['pages']['Row'][] | null
    )

    const getPages = async () => {
        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('user_id', 'fff758b7-b477-454a-b01f-9e8b8d74a187')
            .order('created_at', { ascending: false })

        if (error) {
            throw error
        }

        setPages(data)
    }

    useEffect(() => {
        getPages()
    }, [pages])

    return (
        <div className="pt-18 flex flex-col items-center pb-18 h-screen overflow-scroll">
            {pages && pages.map((page) => <Page key={page.id} {...page} />)}
        </div>
    )
}
