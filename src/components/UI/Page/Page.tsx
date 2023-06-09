'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'
import formatTimestamp from '@/utils/formatTimestamp'
import Avatar from '@/components/UI/Avatar'

export default function Page(
    page: Database['public']['Tables']['pages']['Row']
) {
    const { id, title, web_src, created_at, user_id } = page
    const [user, setUser] = useState(null as any)

    const checkUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (user_id !== user!.id) {
            const { data, error } = await supabase
                .from('profiles')
                .select(`full_name, avatar_url`)
                .eq('id', user_id)
                .single()

            if (error) {
                throw error
            }

            setUser(data)
        }
    }

    useEffect(() => {
        checkUser()
    }, [user])

    return (
        <Link
            href={`/tabs/pages/${id}`}
            className="w-full pb-3 mb-3 px-2 last:mb-0 last:pb-0 border-b border-gray-100 last:border-0"
        >
            {user?.full_name ? (
                <div className="flex items-center mb-1">
                    <div className="w-3 h-3">
                        <Avatar src={user.avatar_url ?? ''} />
                    </div>
                    <p className="text-13 ml-1">Créée par {user.full_name}</p>
                    <p className="text-13 text-indigo-400 ml-1">
                        {formatTimestamp(created_at!)}
                    </p>
                </div>
            ) : (
                <p className="text-indigo-400 text-13 mb-1">
                    {formatTimestamp(created_at!)}
                </p>
            )}
            <div className="w-full aspect-[2/1] relative rounded-[0.8rem] overflow-hidden mb-2">
                <img
                    className="absolute w-full h-full object-center object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    src={web_src ?? ''}
                    alt=""
                />
            </div>
            <h2 className="font-medium text-18 leading-[1.1]">{title}</h2>
        </Link>
    )
}
