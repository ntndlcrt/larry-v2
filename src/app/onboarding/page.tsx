'use client'

// @ts-nocheck

import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { TfiArrowLeft, TfiArrowRight } from 'react-icons/tfi'
import { register } from 'swiper/element/bundle'

import { inlineStyleSwiperPagination } from '@/utils/swiperInlineStyles'
import OnboardingSlide from '@/components/UI/OnboardingSlide'

import 'swiper/css'

register()

export default function Onboarding() {
    const [firstSlide, setFirstSlide] = useState(true)
    const [lastSlide, setLastSlide] = useState(false)
    const swiperEl = useRef()
    const [paddingTop, setPaddingTop] = useState(0)

    useEffect(() => {
        Object.assign(swiperEl.current, {
            injectStyles: [inlineStyleSwiperPagination],
        })

        swiperEl.current.initialize()

        swiperEl.current.addEventListener('progress', (e) => {
            const [swiper, progress] = e.detail
            setFirstSlide(progress === 0)
            setLastSlide(progress === 1)
        })

        // Make the padding be equal to the swiper container height difference with screen divided by two
        const swiperContainerHeight = swiperEl.current.clientHeight + 64
        const screenHeight = window.innerHeight
        const heightDifference = screenHeight - swiperContainerHeight
        setPaddingTop(heightDifference / 2)
    }, [])

    const onboardingSlides = [
        {
            svgId: 'sonar',
            content:
                'Naviguez à la recherche de contenu pertinent pour vos projets',
        },
        {
            svgId: 'shopping',
            content:
                'Enregistrez vos trouvailles, et classez-les selon vos besoins/envies',
        },
        {
            svgId: 'exchanging',
            content:
                'Partagez vos pages/collections et visionnez celles de vos collaborateurs',
        },
        {
            svgId: 'teamwork',
            isFinal: true,
        },
    ]

    return (
        <div
            className="h-screen max-h-screen w-screen pt-10"
            style={{ paddingTop: paddingTop + 'px' }}
        >
            <swiper-container
                slides-per-view="1"
                speed="400"
                pagination="true"
                ref={swiperEl}
                init="false"
                className="w-full max-w-full max-h-screen min-h-0 min-w-0"
            >
                {onboardingSlides.map((slide, index) => {
                    return <OnboardingSlide key={index} {...slide} />
                })}
            </swiper-container>
            <div className="flex items-center justify-between mx-auto w-3/4 mt-5">
                <TfiArrowLeft
                    className={classNames(
                        'text-24 transition-all',
                        firstSlide && 'text-gray-300'
                    )}
                    onClick={() => {
                        !firstSlide && swiperEl.current.swiper.slidePrev()
                    }}
                />
                <TfiArrowRight
                    className={classNames(
                        'text-24 transition-all',
                        lastSlide && 'text-gray-300'
                    )}
                    onClick={() => {
                        !lastSlide && swiperEl.current.swiper.slideNext()
                    }}
                />
            </div>
        </div>
    )
}
