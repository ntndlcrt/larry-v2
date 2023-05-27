'use client'

import { usePathname } from 'next/navigation'

import Searchbar from '@/components/Searchbar'
import TabsNavigation from '@/components/TabsNavigation'

export default function TabsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <>
            {pathname !== '/tabs/account' &&
                !pathname.match(/^\/tabs\/pages\/[\w-]+$/) && (
                    <Searchbar
                        table={
                            pathname.includes('pages')
                                ? 'pages'
                                : pathname.includes('collections')
                                ? 'collections'
                                : ''
                        }
                    />
                )}
            <main>{children}</main>
            <TabsNavigation />
        </>
    )
}
