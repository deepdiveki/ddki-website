"use client";

import { useRef, useEffect } from "react";

export default function BotAnimation() {
    const centerRef = useRef<HTMLDivElement>(null);
    const orbitingRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 2;
            orbitingRef.current.forEach((bot, index) => {
                const radius = 90 + 15 * Math.sin(angle * 0.07);
                const x = radius * Math.cos((angle + index * 60) * (Math.PI / 180));
                const y = radius * Math.sin((angle + index * 60) * (Math.PI / 180));
                bot.style.transform = `translate(${x}px, ${y}px)`;
            });
            if (centerRef.current) {
                centerRef.current.style.transform = `scale(${1 + 0.05 * Math.sin(angle * 0.05)})`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bot-animation-container">
            <div ref={centerRef} className="bot-core" />
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        orbitingRef.current[i] = el!;
                    }}
                    className="orbiting-bot"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .bot-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 320px;
            height: 320px;
            position: relative;
        }

        .bot-core {
            width: 70px;
            height: 70px;
            background: radial-gradient(circle, rgba(0, 200, 255, 0.9), rgba(0, 100, 255, 0.8));
            border-radius: 50%;
            box-shadow: 0 0 30px rgba(0, 200, 255, 0.7);
            position: absolute;
        }

        .orbiting-bot {
            width: 24px;
            height: 24px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 12px rgba(0, 200, 255, 0.8);
            animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.3);
                opacity: 0.6;
            }
        }
    `}</style>
    );
}