"use client"

import { useEffect, useRef, useState } from "react"

const checkIOS = () => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

export default function LandingVideo() {

    const imgSrc = "https://rbdxrsvwmsbsivvedzyv.supabase.co/storage/v1/object/public/imgs/landing-static%20(1).png"

    const [isIOS, setIsIOS] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.removeAttribute("controls")
            videoRef.current.play()
        }
    }, [videoRef.current])

    // useEffect(() => {
    //     setIsIOS(checkIOS())
    // }, [])

    return (isIOS
        ? (
            <img
                className="z-10 absolute w-full h-lvh object-cover"
                src={imgSrc}
                alt="landing video" />
        )
        : (
            <video
                className="z-10 absolute w-full h-lvh object-cover video-noplay"
                onSuspend={() => setIsIOS(checkIOS())}
                controls={false}
                autoPlay
                playsInline
                ref={videoRef}
                loop
                muted >
                <source src="https://rbdxrsvwmsbsivvedzyv.supabase.co/storage/v1/object/public/video/generic-landing.mp4?t=2024-11-27T18%3A24%3A59.588Z" type="video/mp4" />
            </video>
        )
    )
}