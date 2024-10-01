import React, { useEffect, useRef, useState } from "react"

type CounterProps = {
    targetNumber: number
    duration: number
}

const Counter: React.FC<CounterProps> = ({ targetNumber, duration }) => {
    const [currentNumber, setCurrentNumber] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {
                threshold: 0.5, // Adjust based on when you want the counter to start
            }
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!isVisible) return

        const start = Date.now()
        const end = start + duration

        const step = () => {
            const now = Date.now()
            const progress = Math.min((now - start) / (end - start), 1)
            setCurrentNumber(Math.floor(progress * targetNumber))

            if (now < end) {
                requestAnimationFrame(step)
            }
        };

        requestAnimationFrame(step);
    }, [isVisible, duration, targetNumber])

    return (
        <span ref={elementRef}>{currentNumber}</span>
    )
}

export default Counter