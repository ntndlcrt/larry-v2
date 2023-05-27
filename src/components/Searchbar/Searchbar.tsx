'use client'

import { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { RxArrowLeft } from 'react-icons/rx'

import styles from './Searchbar.module.scss'

export default function SearchBar({ table }: { table: string }) {
    const [expanded, setExpanded] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const toggleExpanded = () => {
        setExpanded(!expanded)
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
                    placeholder="Rechercher"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchbarHeaderInput}
                />
            </div>
        </div>
    )
}
