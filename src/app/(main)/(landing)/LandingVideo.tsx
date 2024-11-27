"use client"

import { useEffect, useRef } from "react"

export default function LandingVideo() {

    const videoRef = useRef<HTMLVideoElement>(null)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.removeAttribute("controls")
            videoRef.current.play()
        }
    }, [videoRef.current])

    return (
        <video
            className="z-10 absolute w-full h-lvh object-cover video-noplay"
            controls={false}
            autoPlay
            playsInline
            ref={videoRef}
            loop
            muted >
            <source src="https://rbdxrsvwmsbsivvedzyv.supabase.co/storage/v1/object/public/video/generic-landing.mp4?t=2024-11-27T18%3A24%3A59.588Z" type="video/mp4" />
        </video>
    )
}