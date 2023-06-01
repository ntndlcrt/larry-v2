'use client'

import { useState, useEffect } from 'react'

import supabase from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types.spec'

import styles from './AddPageToCollection.module.scss'

export default function AddPageToCollection({
    pageId,
    pageTitle,
}: {
    pageId: number
    pageTitle: string
}) {
    const [collections, setCollections] = useState(
        [] as Database['public']['Tables']['collections']['Row'][]
    )
    const [collectionId, setCollectionId] = useState(0)
    const [expanded, setExpanded] = useState(false)

    const getCollections = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('collections')
            .select('*')
            .eq('user_id', user?.id)

        if (error) {
            throw error
        }

        setCollections(data)
    }

    useEffect(() => {
        getCollections()

        setTimeout(() => {
            setExpanded(true)
        }, 100)
    }, [])

    const addPageToCollection = async () => {
        const { error } = await supabase
            .from('pages_collections')
            .insert([{ page_id: pageId, collection_id: collectionId }])
            .single()

        if (error) {
            throw error
        }
    }

    return (
        <div
            className={`${styles.addPageToCollection} ${
                expanded ? styles.addPageToCollectionExpanded : ''
            }`}
        >
            <div className={styles.addPageToCollectionContent}>
                <span>
                    Choisissez une collection à laquelle ajouter la page &quot;
                    {pageTitle}&quot;
                </span>
                <form action="#" onSubmit={() => addPageToCollection()}>
                    <select
                        onChange={(e) => {
                            setCollectionId(Number(e.target.value))
                        }}
                    >
                        {collections.map((collection) => (
                            <option value={collection.id} key={collection.id}>
                                {collection.icon}
                                &nbsp;&nbsp;&nbsp;
                                {collection.title}
                            </option>
                        ))}
                    </select>
                    <input type="submit" className="button" value="Ajouter" />
                </form>
            </div>
            <div
                className={styles.addPageToCollectionOverlay}
                onClick={() => setExpanded(false)}
            ></div>
        </div>
    )
}
