'use client'

import { useState, useEffect } from 'react'

import { Database } from '@/lib/supabase/types.spec'
import supabase from '@/lib/supabase/client'
import Avatar from '@/components/UI/Avatar'
import Larry from '@/components/UI/Larry'

type Profile = Database['public']['Tables']['profiles']['Row']

export default function TabAccount() {
    const [profile, setProfile] = useState<Profile | null>(null)

    const getProfile = async () => {
        try {
            let { data, error, status } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', 'fff758b7-b477-454a-b01f-9e8b8d74a187')
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setProfile(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="pt-10 px-2 flex flex-col items-center text-center h-[80vh]">
            <div className="w-[6.4rem] h-[6.4rem]">
                <Avatar src={profile?.avatar_url ?? ''} />
            </div>
            <h1 className="text-20 font-bold mt-3 mb-1">
                Bienvenue {profile?.full_name} !
            </h1>
            <p className="mb-4">
                Vous êtes authentifié avec le compte Google {profile?.email}
            </p>
            <div className="aspect-square flex-1 max-w-full">
                <Larry svgId="coffee" />
            </div>
            <button
                className="button block mt-3"
                onClick={async () => await supabase.auth.signOut()}
            >
                Déconnexion
            </button>
        </div>
    )
}
