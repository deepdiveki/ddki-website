"use client";

import { useRef, useEffect } from "react";

export default function AbstractAnimation() {
    const coreRef = useRef<HTMLDivElement>(null);
    const orbitingRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 2;
            orbitingRef.current.forEach((point, index) => {
                const radius = 110 + 10 * Math.sin(angle * 0.1);
                const x = radius * Math.cos((index * 72) * (Math.PI / 180));
                const y = radius * Math.sin((index * 72) * (Math.PI / 180));
                point.style.transform = `translate(${x}px, ${y}px) scale(${1 + 0.2 * Math.sin(angle * 0.05)})`;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="abstract-animation-container">
            <div ref={coreRef} className="core-element" />
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        orbitingRef.current[i] = el!;
                    }}
                    className="orbiting-element"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .abstract-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 320px;
            height: 320px;
            position: relative;
        }

        .core-element {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, rgba(255, 100, 150, 0.9), rgba(255, 150, 100, 0.9));
            border-radius: 50%;
            box-shadow: 0 0 30px rgba(255, 100, 150, 0.7);
            position: absolute;
            animation: glow 3s ease-in-out infinite;
        }

        .orbiting-element {
            width: 24px;
            height: 24px;
            background: rgba(90, 200, 250, 1);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 20px rgba(90, 200, 250, 0.6);
            animation: pulse 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 30px rgba(255, 100, 150, 0.7);
            }
            50% {
                box-shadow: 0 0 60px rgba(255, 100, 150, 0.9);
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.4);
            }
        }
    `}</style>
    );
}
