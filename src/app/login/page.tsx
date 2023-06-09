'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import supabase from '@/lib/supabase/client'
import Larry from '@/components/UI/Larry'

export default function Login() {
    const router = useRouter()

    useEffect(() => {
        const checkLoggedIn = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (user) {
                router.push('/')
            }
        }

        checkLoggedIn()
    }, [])

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })

        if (error) {
            console.log(error)
            return
        }

        router.push('/')
    }

    return (
        <div className="w-full flex flex-col justify-center items-center text-center pt-18">
            <div className="aspect-square w-full mb-10">
                <Larry svgId="exchanging" />
            </div>
            <button className="button text-center" onClick={signInWithGoogle}>
                Se connecter avec Google
            </button>
        </div>
    )
}
