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
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('user_id', user!.id)
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
            <div className="fixed top-0 w-full h-16 z-50 bg-gradient-to-b from-indigo-100 to-[rgba(224 231 255 0)]"></div>
            {pages && pages.map((page) => <Page key={page.id} {...page} />)}
        </div>
    )
}
