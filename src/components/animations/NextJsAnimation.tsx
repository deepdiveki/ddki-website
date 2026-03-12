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
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: left center;
            border-radius: 4px;
            animation: nextjs-glow 3s ease-in-out infinite alternate;
        }

        .rotating-segment:nth-child(1) {
            background: linear-gradient(90deg, rgba(20, 184, 166, 0.7), rgba(6, 182, 212, 0.5));
        }
        .rotating-segment:nth-child(2) {
            background: linear-gradient(90deg, rgba(59, 130, 246, 0.7), rgba(37, 99, 235, 0.5));
        }
        .rotating-segment:nth-child(3) {
            background: linear-gradient(90deg, rgba(249, 115, 22, 0.7), rgba(234, 88, 12, 0.5));
        }
        .rotating-segment:nth-child(4) {
            background: linear-gradient(90deg, rgba(34, 197, 94, 0.7), rgba(22, 163, 74, 0.5));
        }
        .rotating-segment:nth-child(5) {
            background: linear-gradient(90deg, rgba(168, 85, 247, 0.7), rgba(139, 92, 246, 0.5));
        }
        .rotating-segment:nth-child(6) {
            background: linear-gradient(90deg, rgba(234, 179, 8, 0.7), rgba(202, 138, 4, 0.5));
        }

        @keyframes nextjs-glow {
            0%, 100% {
                filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.3));
            }
            50% {
                filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
            }
        }
    `}</style>
    );
}
