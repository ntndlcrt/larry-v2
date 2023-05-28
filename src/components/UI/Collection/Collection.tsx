import Link from 'next/link'

import { Database } from '@/lib/supabase/types.spec'

export default function Collection(
    collection: Database['public']['Tables']['collections']['Row']
) {
    const { id, title, icon } = collection

    return (
        <Link
            href={`/tabs/collections/${id}`}
            className="w-full h-full rounded-[1.2rem] bg-indigo-50 flex flex-col items-center justify-center text-center p-2"
        >
            <div className="w-2/3 aspect-square relative rounded-full mb-1_5 bg-gray-50">
                <span className="text-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {icon}
                </span>
            </div>
            <h2 className="font-semibold leading-[1.2]">{title}</h2>
        </Link>
    )
}
