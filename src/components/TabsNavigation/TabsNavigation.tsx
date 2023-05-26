'use client'

import { BsCollection, BsBoxSeam, BsPersonSquare } from 'react-icons/bs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import styles from './TabsNavigation.module.scss'

export default function TabsNavigation() {
    const pathname = usePathname()

    return (
        <div className={styles.tabsNavigation}>
            <Link
                href="/tabs/pages"
                className={`${styles.tabsNavigationIcon} ${
                    pathname.includes('tabs/pages')
                        ? styles.tabsNavigationIconActive
                        : ''
                }`}
            >
                <BsCollection />
                <span className="text-12">Pages</span>
            </Link>
            <Link
                href="/tabs/collections"
                className={`${styles.tabsNavigationIcon} ${
                    pathname.includes('tabs/collections')
                        ? styles.tabsNavigationIconActive
                        : ''
                }`}
            >
                <BsBoxSeam />
                <span className="text-12">Collections</span>
            </Link>
            <Link
                href="/tabs/account"
                className={`${styles.tabsNavigationIcon} ${
                    pathname === '/tabs/account'
                        ? styles.tabsNavigationIconActive
                        : ''
                }`}
            >
                <BsPersonSquare />
                <span className="text-12">Compte</span>
            </Link>
        </div>
    )
}
