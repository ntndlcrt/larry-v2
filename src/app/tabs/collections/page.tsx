'use client'

import { useState, useEffect } from 'react'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'
import Collection from '@/components/UI/Collection'

export default function TabCollections() {
    const [collections, setCollections] = useState(
        null as Database['public']['Tables']['collections']['Row'][] | null
    )

    const getCollections = async () => {
        const { data, error } = await supabase
            .from('collections')
            .select('*')
            .eq('user_id', 'fff758b7-b477-454a-b01f-9e8b8d74a187')
            .order('created_at', { ascending: false })

        if (error) {
            throw error
        }

        setCollections(data)
    }

    useEffect(() => {
        getCollections()
    }, [collections])

    return (
        <div className="pt-18 flex flex-col items-center pb-18 h-screen overflow-scroll">
            <div className="grid grid-cols-2 gap-3 px-2">
                {collections &&
                    collections.map((collection) => (
                        <Collection {...collection} key={collection.id} />
                    ))}
            </div>
        </div>
    )
}
