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
                    <>
                        <div className="fixed top-0 w-full h-16 z-50 bg-gradient-to-b from-indigo-100 to-[rgba(224 231 255 0)]"></div>
                        <Searchbar
                            table={
                                pathname.includes('pages')
                                    ? 'pages'
                                    : pathname.includes('collections')
                                    ? 'collections'
                                    : ''
                            }
                        />
                    </>
                )}
            <main>{children}</main>
            <TabsNavigation />
        </>
    )
}
