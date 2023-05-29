'use client'

import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { RxArrowLeft } from 'react-icons/rx'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'

import styles from './Searchbar.module.scss'

export default function SearchBar({ table }: { table: string }) {
    const [expanded, setExpanded] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState(null as any)

    const toggleExpanded = () => {
        setExpanded(!expanded)
        setSearch('')
        setResults(null)
    }

    const handleSearch = async (search: string) => {
        setSearch(search)

        const { data, error } = await supabase
            .from(table)
            .select()
            .ilike('title', `%${search}%`)

        if (error) {
            throw error
        }

        setResults(data)
    }

    return (
        <div
            className={`
                ${styles.searchbar}
                ${expanded ? styles.searchbarExpanded : ''}
                ${toggled ? styles.searchbarToggled : ''}}
            `}
        >
            <div
                className={styles.searchbarHeader}
                onClick={() => {
                    if (!expanded) {
                        toggleExpanded()
                    }
                }}
            >
                <div className={styles.searchbarHeaderToggle}>
                    <div
                        className={styles.searchbarHeaderToggleSearch}
                        onClick={toggleExpanded}
                    >
                        <AiOutlineSearch />
                    </div>
                    <div
                        className={styles.searchbarHeaderToggleReturn}
                        onClick={toggleExpanded}
                    >
                        <RxArrowLeft />
                    </div>
                </div>
                <input
                    type="text"
                    placeholder={`Rechercher une ${
                        table === 'pages' ? 'page' : 'collection'
                    }`}
                    value={search}
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}
                    className={styles.searchbarHeaderInput}
                />
            </div>
            <div className={styles.searchbarResults}>
                {results &&
                    results.map((result: any) => (
                        <div
                            className={styles.searchbarResultsItem}
                            key={result.id}
                        >
                            {result.icon && (
                                <span className="mr-2 block">
                                    {result.icon}
                                </span>
                            )}
                            <span>{result.title}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
}
