"use client";

import { useRef, useEffect } from "react";

export default function CitySkylineAnimation() {
    const starsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 1.5;

            // Sterne bewegen sich leicht pulsierend auf und ab
            starsRef.current.forEach((star, index) => {
                const offset = 3 * Math.sin((angle + index * 60) * (Math.PI / 180));
                star.style.transform = `translateY(${offset}px)`;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="city-skyline-animation-container">
            {/* Skyline */}
            <div className="building building-1" />
            <div className="building building-2" />
            <div className="building building-3" />
            <div className="building building-4" />
            <div className="building building-5" />

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
        .city-skyline-animation-container {
            position: relative;
            width: 200px;
            height: 120px;
            background: linear-gradient(to top, #331010, #522020);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            padding: 0 10px;
        }

        .building {
            position: relative;
            width: 20px;
            background: rgba(220, 50, 50, 0.7);  /* Dezentes Rot */
            box-shadow: 0 0 10px rgba(220, 50, 50, 0.5);
            animation: building-pulse 4s ease-in-out infinite alternate;
        }

        .building-1 {
            height: 70px;
        }

        .building-2 {
            height: 90px;
        }

        .building-3 {
            height: 60px;
        }

        .building-4 {
            height: 100px;
        }

        .building-5 {
            height: 80px;
        }

        .star {
            width: 8px;
            height: 8px;
            background: rgba(255, 100, 100, 0.8);
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
            box-shadow: 0 0 10px rgba(255, 100, 100, 0.6);
            animation: star-glow 4s ease-in-out infinite alternate;
        }

        @keyframes star-glow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(255, 100, 100, 0.5);
            }
            50% {
                box-shadow: 0 0 12px rgba(255, 100, 100, 0.9);
            }
        }

        @keyframes building-pulse {
            0%, 100% {
                box-shadow: 0 0 5px rgba(220, 50, 50, 0.4);
            }
            50% {
                box-shadow: 0 0 12px rgba(220, 50, 50, 0.8);
            }
        }
    `}</style>
    );
}