"use client";

import { useRef, useEffect } from "react";

export default function ConceptPhaseAnimation() {
    const coreRef = useRef<HTMLDivElement>(null);
    const orbitingRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 2;
            orbitingRef.current.forEach((point, index) => {
                const radius = 110 + 10 * Math.sin(angle * 0.1);
                const x = radius * Math.cos((index * 90) * (Math.PI / 180));
                const y = radius * Math.sin((index * 90) * (Math.PI / 180));
                point.style.transform = `translate(${x}px, ${y}px) scale(${1 + 0.2 * Math.sin(angle * 0.05)})`;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="concept-animation-container">
            <div ref={coreRef} className="core-circle" />
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        orbitingRef.current[i] = el!;
                    }}
                    className="orbiting-dot"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .concept-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 320px;
            height: 320px;
            position: relative;
        }

        .core-circle {
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, rgba(255, 200, 50, 0.9), rgba(255, 100, 50, 0.9));
            border-radius: 50%;
            box-shadow: 0 0 40px rgba(255, 200, 50, 0.8);
            position: absolute;
            animation: core-pulse 3s ease-in-out infinite;
        }

        .orbiting-dot {
            width: 24px;
            height: 24px;
            background: rgba(50, 150, 255, 1);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 20px rgba(50, 150, 255, 0.6);
            animation: dot-pulse 2s ease-in-out infinite alternate;
        }

        @keyframes core-pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
        }

        @keyframes dot-pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.3);
            }
        }
    `}</style>
    );
}
