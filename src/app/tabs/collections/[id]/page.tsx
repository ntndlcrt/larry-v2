'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'
import PageListed from '@/components/UI/PageListed'

type Page = Database['public']['Tables']['pages']['Row']
type Collection = Database['public']['Tables']['collections']['Row'] & {
    pages: Page[]
}

export default function TabCollectionView({ params }: { params: any }) {
    const router = useRouter()
    const [collection, setCollection] = useState(null as Collection | null)

    const getCollection = async () => {
        const { data, error } = await supabase
            .from('collections')
            .select(`*, pages(*)`)
            .eq('id', params.id)
            .single()

        console.log(data)

        if (error) {
            throw error
        }

        setCollection(data)
    }

    useEffect(() => {
        getCollection()
    }, [])

    return (
        <div className="flex flex-col pt-10 pb-18">
            <div className="px-2 text-center pb-6">
                <div className="text-64 mb-1">{collection?.icon}</div>
                <h1 className="text-24 font-semibold">{collection?.title}</h1>
                {collection?.short_desc && (
                    <p className="text-gray-700 mt-1">
                        {collection.short_desc}
                    </p>
                )}
            </div>
            {collection?.pages && (
                <div className="flex flex-col">
                    {collection.pages.map((page: Page) => (
                        <PageListed {...page} key={page.id} />
                    ))}
                </div>
            )}
        </div>
    )
}
