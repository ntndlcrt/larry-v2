'use client'

import { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import EmojiPicker from 'emoji-picker-react'

import getPageMetadata from '@/utils/getPageMetadata'
import supabase from '@/lib/supabase/client'

import styles from './AddItemButton.module.scss'

export default function AddItemButton({ type }: { type: string }) {
    const [expanded, setExpanded] = useState(false)
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [emojiExpanded, setEmojiExpanded] = useState(false)
    const [emoji, setEmoji] = useState<any>('😊')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (type === 'page') {
            const metadata = await getPageMetadata(url)

            if (metadata) {
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
        } else if (type === 'collection') {
            const { data, error } = await supabase.from('collections').insert([
                {
                    user_id: user!.id,
                    title,
                    icon: emoji,
                    created_at: new Date().toISOString(),
                },
            ])

            if (error) {
                throw error
            }

            setTitle('')
            setEmoji('😊')
            setExpanded(false)
        }
    }

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    const toggleEmojiExpanded = () => {
        setEmojiExpanded(!emojiExpanded)
    }

    return (
        <div
            className={`${styles.addItemButton} ${
                expanded ? styles.addItemButtonExpanded : ''
            }`}
        >
            <div
                className={styles.addItemButtonIcon}
                onClick={() => toggleExpanded()}
            >
                {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
            <form onSubmit={handleSubmit} className={styles.addItemButtonForm}>
                {type === 'page' ? (
                    <textarea
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        rows={4}
                        placeholder="https://example.com"
                    />
                ) : (
                    <div className="flex items-center pb-2 mb-2 border-b border-gray-700">
                        <div
                            className={`absolute left-0 right-0 -translate-y-full ${
                                emojiExpanded
                                    ? 'opacity-100 visible -top-2'
                                    : 'opacity-0 invisible top-6'
                            }`}
                        >
                            <EmojiPicker
                                lazyLoadEmojis={true}
                                onEmojiClick={(chosenEmoji) => {
                                    setEmoji(chosenEmoji.emoji)
                                }}
                            />
                        </div>
                        <div
                            className="w-6 h-6 bg-gray-50 rounded-[0.4rem] flex items-center justify-center text-24 leading-[1] mr-1_5"
                            onClick={() => toggleEmojiExpanded()}
                        >
                            <span>{emoji}</span>
                        </div>
                        <input
                            type="text"
                            value={title}
                            onClick={() => {
                                emojiExpanded ? toggleEmojiExpanded() : null
                            }}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Titre de la collection"
                            className="flex-1 py-1 outline-none border-0"
                        />
                    </div>
                )}
                <button type="submit" className="button w-full">
                    Ajouter la {type === 'page' ? 'page' : 'collection'}
                </button>
            </form>
            <div
                className={styles.addItemButtonOverlay}
                onClick={() => {
                    emojiExpanded ? toggleEmojiExpanded() : toggleExpanded()
                }}
            ></div>
        </div>
    )
}
