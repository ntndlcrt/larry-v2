import Searchbar from '@/components/Searchbar'
import TabsNavigation from '@/components/TabsNavigation'

export default function TabsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Searchbar />
            <main>{children}</main>
            <TabsNavigation />
        </>
    )
}
