'use client'

import { useState, useEffect } from 'react'

import supabase from '@/lib/supabase/client'
import Avatar from '@/components/UI/Avatar'
import Larry from '@/components/UI/Larry'

type Profile = {
    email: string
    full_name: string
    avatar_url: string
}

export default function TabAccount() {
    const [profile, setProfile] = useState<Profile | null>(null)

    const getProfile = async () => {
        try {
            let { data, error } = await supabase.auth.getUser()

            if (error) {
                throw error
            }

            const user = data.user

            if (user) {
                let { data, error, status } = await supabase
                    .from('profiles')
                    .select(`email, full_name, avatar_url`)
                    .eq('id', user.id)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setProfile(data)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="pt-10 px-2 flex flex-col items-center text-center">
            <Avatar src={profile?.avatar_url} />
            <h1 className="text-20 font-bold mt-4 mb-1">
                Bienvenue {profile?.full_name} !
            </h1>
            <p className="mb-4">
                Vous êtes authentifié avec le compte Google {profile?.email}
            </p>
            <Larry svgId="coffee" />
            <button
                className="button block mt-4"
                onClick={async () => await supabase.auth.signOut()}
            >
                Déconnexion
            </button>
        </div>
    )
}
