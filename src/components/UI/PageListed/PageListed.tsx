import Link from 'next/link'

import { Database } from '@/lib/supabase/types.spec'

type Page = Database['public']['Tables']['pages']['Row']

export default function PageListed(page: Page) {
    const { id, title, web_src } = page

    return (
        <Link href={`/tabs/pages/${id}`}>
            <div className="w-full grid grid-cols-3 gap-2 border-b border-gray-100 items-center first:border-t">
                <div className="w-full aspect-[5/4] relative overflow-hidden">
                    <img
                        className="absolute w-full h-full object-center object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                        src={web_src ?? ''}
                        alt=""
                    />
                </div>
                <h2 className="col-span-2 py-1 pr-2">{title}</h2>
            </div>
        </Link>
    )
}
