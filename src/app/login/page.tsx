'use client'

import { useRouter } from 'next/navigation'

import supabase from '@/lib/supabase/client'

export default function Login() {
    const router = useRouter()

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
        <div>
            <button
                className="px-2 text-center w-full py-18"
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </button>
        </div>
    )
}
