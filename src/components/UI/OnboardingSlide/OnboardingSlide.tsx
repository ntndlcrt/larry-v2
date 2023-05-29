import Larry from '@/components/ui/Larry'
import supabase from '@/lib/supabase/client'

export default function OnboardingSlide({ svgId, content, isFinal = false }) {
    const setHasOnboarded = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .update({ has_onboarded: true })
            .eq('id', user.id)
    }

    return (
        <swiper-slide>
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
                        onClick={async () => {
                            await setHasOnboarded()
                            location.reload()
                        }}
                    >
                        Lezgongue
                    </button>
                )}
            </div>
        </swiper-slide>
    )
}
