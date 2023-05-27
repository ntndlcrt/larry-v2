import Link from 'next/link'
import { useRef } from 'react'

import { Database } from '@/lib/supabase/types.spec'
import formatTimestamp from '@/utils/formatTimestamp'
import { FiEdit } from 'react-icons/fi'

export default function Page(
    page: Database['public']['Tables']['pages']['Row']
) {
    const { id, title, web_src, created_at } = page

    return (
        <Link
            href={`/tabs/pages/${id}`}
            className="w-full pb-3 mb-3 px-2 last:mb-0 last:pb-0 border-b border-gray-100 last:border-0"
        >
            <p className="text-indigo-400 text-13 mb-1">
                {formatTimestamp(created_at!)}
            </p>
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
