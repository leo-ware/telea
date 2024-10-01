"use client"

import React, { useEffect, useRef, useState } from 'react';

interface RollingImageProps {
  imageSrc: string;
  desiredHeight: number;
}

const RollingImage: React.FC<RollingImageProps> = ({ imageSrc, desiredHeight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        const totalScrollPixels = window.innerHeight + height
        const amountScrolled = Math.max(0, window.innerHeight - top)
        const scrollProgress = amountScrolled / totalScrollPixels
        setScrollPosition(scrollProgress); // Slow down the scroll rate by 20%
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [desiredHeight]);

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ height: `${desiredHeight}px` }}
    >
      <div 
        className="w-full h-auto"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${scrollPosition * 100}%`,
          height: '200%',
          transform: `translateY(${-scrollPosition * 50}%)`,
        }}
      />
    </div>
  );
};

export default RollingImage;
