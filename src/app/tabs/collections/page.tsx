'use client'

import { useState, useEffect } from 'react'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'
import AddItemButton from '@/components/AddItemButton'
import Collection from '@/components/UI/Collection'

export default function TabCollections() {
    const [collections, setCollections] = useState(
        null as Database['public']['Tables']['collections']['Row'][] | null
    )

    const getCollections = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('collections')
            .select('*')
            .eq('user_id', user!.id)
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
                        <Collection {...collection} />
                    ))}
            </div>
            <AddItemButton type="collection" />
        </div>
    )
}
