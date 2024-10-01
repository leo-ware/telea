"use client"

import React, { useState, useEffect, useRef } from 'react';

// Interface for props
interface CounterProps {
    target: number;
    duration: number; // time duration in milliseconds for counting to the target
}

const NumberGoUp: React.FC<CounterProps> = ({ target, duration }) => {
    const [count, setCount] = useState<number>(0);
    const counterRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState<boolean>(false);

    // Function to handle counting logic
    useEffect(() => {
        const incTime = 50
        let start = 0;
        if (isInView) {
            setCount(0)
            const increment = target / (duration / incTime); // divide target by the number of increments
            const timer = setInterval(() => {
                start += increment
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, incTime); // interval in milliseconds

            return () => clearInterval(timer);
        }
    }, [isInView, target, duration]);

    // Scroll event handler using IntersectionObserver API
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            //   { threshold: 0.5 } // trigger when 50% of the widget is visible
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);

    return (
        <span ref={counterRef}>{count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
    );
};

export default NumberGoUp;
