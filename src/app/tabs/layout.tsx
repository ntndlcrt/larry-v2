'use client'

import { usePathname } from 'next/navigation'

import { createContext, useState } from 'react'

import Searchbar from '@/components/Searchbar'
import AddItemButton from '@/components/AddItemButton'
import ShareItem from '@/components/ShareItem'
import TabsNavigation from '@/components/TabsNavigation'

type ShareItemId = {
    pageId: number | undefined
    collectionId: number | undefined
}
interface TabsContextProps {
    setShareItemId: (shareItemId: ShareItemId) => void
    contextSetShareItemOpened: (opened: boolean) => void
    shareItemOpened: boolean
}

const TabsContext = createContext<TabsContextProps>({
    setShareItemId: () => {},
    contextSetShareItemOpened: (opened: boolean) => {},
    shareItemOpened: false,
})

export default function TabsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [shareItemOpened, setShareItemOpened] = useState(false)
    const [shareItemId, setShareItemId] = useState<ShareItemId>(
        {} as ShareItemId
    )

    const contextSetShareItemOpened = (opened: boolean) => {
        setShareItemOpened(opened)
    }

    return (
        <TabsContext.Provider
            value={{
                setShareItemId,
                contextSetShareItemOpened,
                shareItemOpened,
            }}
        >
            {pathname === '/tabs/pages' || pathname === '/tabs/collections' ? (
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
            ) : (
                ''
            )}
            <main>{children}</main>
            {pathname === '/tabs/pages' || pathname === '/tabs/collections' ? (
                pathname === '/tabs/pages' ? (
                    <AddItemButton type="page" />
                ) : pathname === '/tabs/collections' ? (
                    <AddItemButton type="collection" />
                ) : (
                    ''
                )
            ) : (
                ''
            )}
            <ShareItem {...shareItemId} />
            <TabsNavigation />
        </TabsContext.Provider>
    )
}

export { TabsContext }
