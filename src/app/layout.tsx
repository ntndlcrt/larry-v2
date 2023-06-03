'use client'

import supabase from '@/lib/supabase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Raleway } from 'next/font/google'

import '@/styles/app.scss'

const raleway = Raleway({
    subsets: ['latin'],
    variable: '--font-raleway',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    async function createProfileIfNotExists(
        id: string,
        email: string,
        full_name: string,
        avatar_url: string
    ) {
        // Check if user has a profile
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)

        if (error) {
            console.error(error)
            return
        }

        // If the user doesn't have a profile, create one
        if (!data || data.length === 0) {
            const { error } = await supabase.from('profiles').insert([
                {
                    id,
                    email,
                    full_name,
                    avatar_url,
                },
            ])

            if (error) {
                console.error(error)
                return
            }
        }
    }

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                const { user } = session!
                const { email, id, user_metadata } = user
                const { full_name, avatar_url } = user_metadata

                createProfileIfNotExists(id, email!, full_name, avatar_url)
            }

            if (event === 'SIGNED_OUT') {
                router.push('/login')
            }
        })
    }, [])

    return (
        <html lang="fr" className={raleway.className}>
            <body>{children}</body>
        </html>
    )
}
