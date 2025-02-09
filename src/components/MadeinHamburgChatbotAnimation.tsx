"use client";

import { useRef, useEffect } from "react";

export default function MadeInHamburgChatbotAnimation() {
    const wavesRef = useRef<HTMLDivElement>(null);
    const starsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 1.5;

            // Wellen bewegen sich horizontal
            if (wavesRef.current) {
                const waveOffset = 5 * Math.sin(angle * (Math.PI / 180));
                wavesRef.current.style.transform = `translateX(${waveOffset}px)`;
            }

            // Sterne pulsieren leicht
            starsRef.current.forEach((star, index) => {
                const offset = 3 * Math.sin((angle + index * 60) * (Math.PI / 180));
                star.style.transform = `translateY(${offset}px)`;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hamburg-animation-container">
            {/* Gebäude und Kran */}
            <div className="building" />
            <div className="crane" />

            {/* Wasser mit animierten Wellen */}
            <div ref={wavesRef} className="waves" />

            {/* Animierte Sterne */}
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        starsRef.current[i] = el!;
                    }}
                    className="star"
                    style={{ top: "-30px", left: `${30 + i * 50}px` }}
                />
            ))}

            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .hamburg-animation-container {
            position: relative;
            width: 220px;
            height: 140px;
            background: linear-gradient(to top, #0b1930, #1a2a40);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            padding: 0 10px;
        }

        .building {
            position: relative;
            width: 30px;
            height: 70px;
            background: rgba(72, 123, 200, 0.9);
            box-shadow: 0 0 10px rgba(72, 123, 200, 0.6);
            border-radius: 2px;
        }

        .crane {
            position: relative;
            width: 40px;
            height: 60px;
            background: rgba(220, 180, 80, 0.9);
            clip-path: polygon(0% 0%, 100% 10%, 90% 40%, 80% 100%, 20% 100%, 10% 40%, 0% 10%);
            box-shadow: 0 0 8px rgba(220, 180, 80, 0.6);
        }

        .waves {
            position: absolute;
            bottom: 0;
            width: 220px;
            height: 20px;
            background: rgba(50, 150, 255, 0.7);
            clip-path: polygon(0% 60%, 20% 80%, 40% 60%, 60% 80%, 80% 60%, 100% 80%, 100% 100%, 0% 100%);
            box-shadow: 0 0 15px rgba(50, 150, 255, 0.5);
        }

        .star {
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.9);
            position: absolute;
            clip-path: polygon(
                50% 0%,
                61% 35%,
                98% 35%,
                68% 57%,
                79% 91%,
                50% 70%,
                21% 91%,
                32% 57%,
                2% 35%,
                39% 35%
            );
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
            animation: star-glow 3s ease-in-out infinite alternate;
        }

        @keyframes star-glow {
            0%, 100% {
                box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
            }
            50% {
                box-shadow: 0 0 18px rgba(255, 255, 255, 1);
            }
        }
    `}</style>
    );
}