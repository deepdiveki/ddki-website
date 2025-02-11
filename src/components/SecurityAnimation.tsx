"use client";

import { useRef, useEffect } from "react";

export default function SecurityAnimation() {
    const shieldRef = useRef<HTMLDivElement>(null);
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
        <div className="security-animation-container">
            <div ref={shieldRef} className="shield-element" />
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        orbitingRef.current[i] = el!;
                    }}
                    className="orbiting-security-dot"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .security-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 320px;
            height: 320px;
            position: relative;
        }

        .shield-element {
            width: 80px;
            height: 100px;
            background: linear-gradient(135deg, rgba(0, 150, 255, 0.9), rgba(0, 100, 200, 0.9));
            border-radius: 10px 10px 50% 50%;
            box-shadow: 0 0 40px rgba(0, 150, 255, 0.7);
            position: absolute;
            animation: shield-glow 3s ease-in-out infinite;
        }

        .orbiting-security-dot {
            width: 20px;
            height: 20px;
            background: rgba(50, 200, 150, 1);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 20px rgba(50, 200, 150, 0.6);
            animation: dot-pulse 2s ease-in-out infinite alternate;
        }

        @keyframes shield-glow {
            0%, 100% {
                box-shadow: 0 0 30px rgba(0, 150, 255, 0.7);
            }
            50% {
                box-shadow: 0 0 60px rgba(0, 150, 255, 0.9);
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
