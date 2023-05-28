'use client'

import supabase from '@/lib/supabase/client'

export default function Login() {
    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
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
