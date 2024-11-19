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
            className="z-10 absolute w-full h-lvh object-cover"
            controls={false}
            autoPlay
            playsInline
            ref={videoRef}
            loop
            muted >
            <source src="/video/generic-landing.mp4" type="video/mp4" />
        </video>
    )
}