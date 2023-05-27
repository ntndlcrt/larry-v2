'use client'

import { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import getPageMetadata from '@/utils/getPageMetadata'
import supabase from '@/lib/supabase/client'

import styles from './PageAddButton.module.scss'

export default function PageAddButton() {
    const [expanded, setExpanded] = useState(false)
    const [url, setUrl] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const metadata = await getPageMetadata(url)

        if (metadata) {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            const { data, error } = await supabase.from('pages').insert([
                {
                    user_id: user!.id,
                    title: metadata.title,
                    web_src: metadata.web_src,
                    url: metadata.url,
                    created_at: new Date().toISOString(),
                },
            ])

            if (error) {
                throw error
            }

            setUrl('')
            setExpanded(false)
        }
    }

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    return (
        <div
            className={`${styles.pageAddButton} ${
                expanded ? styles.pageAddButtonExpanded : ''
            }`}
        >
            <div
                className={styles.pageAddButtonIcon}
                onClick={() => toggleExpanded()}
            >
                {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
            <form onSubmit={handleSubmit} className={styles.pageAddButtonForm}>
                <textarea
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    rows={4}
                    placeholder="https://example.com"
                />
                <button type="submit" className="button w-full">
                    Ajouter la page
                </button>
            </form>
            <div
                className={styles.pageAddButtonOverlay}
                onClick={() => toggleExpanded()}
            ></div>
        </div>
    )
}
