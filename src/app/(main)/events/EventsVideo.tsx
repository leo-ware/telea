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

    const imgSrc = "https://rbdxrsvwmsbsivvedzyv.supabase.co/storage/v1/object/public/imgs/events-static.png?t=2024-12-02T17%3A29%3A45.564Z"
    const videoSrc = "https://rbdxrsvwmsbsivvedzyv.supabase.co/storage/v1/object/public/video/teleatalksloop4.mp4?t=2024-11-27T18%3A32%3A58.104Z"

    const [showVideo, setShowVideo] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.removeAttribute("controls")
            videoRef.current.play()
        }
    }, [videoRef.current])

    return (
        <div className="w-full h-fit">
            <img
                className={"w-full h-auto object-cover " + (showVideo ? "hidden" : "")}
                src={imgSrc}
                alt="landing video" />
            
            <video
                className = {"w-full h-auto object-cover video-noplay " + (showVideo ? "" : "hidden")}
                controls = { false }
                onPlay={() => setShowVideo(true)}
                autoPlay
                playsInline
                ref = { videoRef }
                loop
                muted >
                <source src = { videoSrc } type = "video/mp4" />
            </video >
        </div>
    )
}