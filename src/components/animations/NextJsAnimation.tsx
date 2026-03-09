"use client";

import { useRef, useEffect } from "react";

export default function NextJsAnimation() {
    const segmentsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            segmentsRef.current.forEach((segment, index) => {
                const delay = index * 20;
                const scale = 1 + 0.05 * Math.sin((angle + delay) * (Math.PI / 180));
                segment.style.transform = `rotate(${angle + index * 60}deg) scale(${scale})`;
            });
            angle += 2;
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="nextjs-animation-container">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        segmentsRef.current[i] = el!;
                    }}
                    className="rotating-segment"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .nextjs-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .rotating-segment {
            width: 50px;
            height: 10px;
            background: rgba(255, 255, 255, 0.8);
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: left center;
            border-radius: 4px;
            animation: glow 3s ease-in-out infinite alternate;
        }

        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
            }
            50% {
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
            }
        }
    `}</style>
    );
}