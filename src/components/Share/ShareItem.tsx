'use client'

import { useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { TfiClose } from 'react-icons/tfi'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'
import Avatar from '@/components/UI/Avatar'

import styles from './ShareItem.module.scss'

export default function ShareItem({
    pageId,
    collectionId,
}: {
    pageId: number | null
    collectionId: number | null
}) {
    const [users, setUsers] = useState(
        [] as Database['public']['Tables']['profiles']['Row'][]
    )
    const [opened, setOpened] = useState(false)

    const searchUsers = async (e: any) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .ilike('full_name', `%${e.target.value}%`)
            // that is not current user id
            .neq('id', user!.id)

        if (error) {
            throw error
        }

        setUsers(data)
    }

    const shareItem = async (userId: string) => {
        if (pageId) {
            const { error } = await supabase
                .from('shared_pages')
                .insert([{ user_id: userId, page_id: pageId }])
                .single()

            if (error) {
                throw error
            }
        } else if (collectionId) {
            const { error } = await supabase
                .from('shared_collections')
                .insert([{ user_id: userId, collection_id: collectionId }])
                .single()

            if (error) {
                throw error
            }
        }
    }

    return (
        <div
            className={`${styles.shareItem} ${
                opened ?? styles.shareItemOpened
            }`}
        >
            <TfiClose
                onClick={() => setOpened(false)}
                className={styles.shareItemClose}
            />
            <div className={styles.shareItemHeader}>
                <MdOutlineGroupAdd className={styles.shareItemHeaderIcon} />
                <input
                    type="text"
                    placeholder="Rechercher un.e utilisateur.rice"
                    onChange={(e) => {
                        searchUsers(e)
                    }}
                    className={styles.shareItemHeaderInput}
                />
            </div>
            <div className={styles.shareItemContent}>
                {users.map((user) => (
                    <div
                        className={styles.shareItemContentItem}
                        key={user.id}
                        onClick={() => {
                            shareItem(user.id)
                        }}
                    >
                        <div className={styles.shareItemContentItemAvatar}>
                            <Avatar src={user.avatar_url ?? ''} />
                        </div>
                        <div className={styles.shareItemContentItemInfos}>
                            <span
                                className={
                                    styles.shareItemContentItemInfosFullName
                                }
                            >
                                {user.full_name}
                            </span>
                            <span
                                className={
                                    styles.shareItemContentItemInfosEmail
                                }
                            >
                                {user.email}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
