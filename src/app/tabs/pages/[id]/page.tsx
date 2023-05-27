'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'
import { RxExternalLink } from 'react-icons/rx'
import { BsFolderPlus, BsTrash3 } from 'react-icons/bs'
import { GrFormPrevious } from 'react-icons/gr'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'
import formatTimestamp from '@/utils/formatTimestamp'
import PageActions from '@/components/PageActions'

export default function TabPageView({ params }: { params: any }) {
    const [page, setPage] = useState(
        null as Database['public']['Tables']['pages']['Row'] | null
    )

    const getPage = async () => {
        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('id', params.id)
            .single()

        if (error) {
            throw error
        }

        setPage(data)
    }

    useEffect(() => {
        getPage()
    }, [])

    return (
        <div className="flex flex-col bg-gradient-to-b from-indigo-400 to-indigo-50">
            <div className="w-full pt-8 pb-6 px-2 relative">
                <Link
                    href="/tabs/pages"
                    className="absolute top-3 left-3 text-white text-13 font-medium flex items-center"
                >
                    <GrFormPrevious className="text-white stroke-white" />
                    <span className="ml-1">Pages</span>
                </Link>
                <div className="w-full aspect-[5/3] relative rounded-[1.2rem] overflow-hidden">
                    <img
                        src={page?.web_src ?? ''}
                        alt=""
                        className="absolute top-O left-0 object-cover object-center w-full h-full"
                    />
                </div>
            </div>
            <div className="pt-3 bg-white rounded-tl-[2.4rem] rounded-tr-[2.4rem] flex-1 pb-15">
                <div className="w-full pb-3 mb-3 border-b border-indigo-50 px-3">
                    <p className="text-indigo-400 text-right text-12 mb-3">
                        {page?.created_at
                            ? formatTimestamp(page?.created_at)
                            : ''}
                    </p>
                    <h1 className="text-24 font-bold mb-1_5">{page?.title}</h1>
                    <p>{page?.short_desc}</p>
                </div>
                <div className="w-full px-3 pb-3 border-b border-indigo-50 mb-6">
                    <span className="text-14 font-semibold">
                        Présente dans :
                    </span>
                </div>
                <div className="flex flex-col">
                    <Link
                        href={`/pages/${page?.id}/edit`}
                        className="pb-1_5 border-b border-indigo-50 px-3 flex items-center"
                    >
                        <RxExternalLink className="mr-3 text-24" />
                        <span className="leading-[1]">
                            Ouvrir dans le navigateur
                        </span>
                    </Link>
                    <Link
                        href={`/pages/${page?.id}/edit`}
                        className="py-1_5 border-b border-indigo-50 px-3 flex items-center"
                    >
                        <BsFolderPlus className="mr-3 text-24" />
                        <span className="leading-[1]">
                            Ajouter dans une collection
                        </span>
                    </Link>
                    <Link
                        href={`/pages/${page?.id}/edit`}
                        className="py-1_5 border-b border-indigo-50 px-3 flex items-center"
                    >
                        <FiEdit className="mr-3 text-24" />
                        <span className="leading-[1]">
                            Éditer la page sauvegardée
                        </span>
                    </Link>
                    <Link
                        href={`/pages/${page?.id}/edit`}
                        className="pt-1_5 px-3 flex items-center"
                    >
                        <BsTrash3 className="mr-3 text-24" />
                        <span className="leading-[1]">
                            Supprimmer la page sauvegardée
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
