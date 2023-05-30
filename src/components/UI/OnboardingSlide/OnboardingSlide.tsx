'use client'

import { useRouter } from 'next/navigation'

import Larry from '@/components/UI/Larry'
import supabase from '@/lib/supabase/client'

export default function OnboardingSlide({
    svgId,
    content,
    isFinal = false,
}: {
    svgId: string
    content?: string
    isFinal?: boolean
}) {
    const router = useRouter()

    const setHasOnboarded = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('profiles')
            .update({ has_onboarded: true })
            .eq('id', user!.id)

        if (error) {
            throw error
        }

        router.push('/')
    }

    return (
        <swiper-slide className="w-auto flex-shrink-0 h-full max-h-full block">
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <Larry svgId={svgId} />
                {content && (
                    <p className="text-22 leading-[3.6rem] w-4/5 mt-5">
                        {content}
                    </p>
                )}
                {isFinal && (
                    <button
                        className="button wide mt-10"
                        onClick={() => setHasOnboarded()}
                    >
                        Lezgongue
                    </button>
                )}
            </div>
        </swiper-slide>
    )
}
