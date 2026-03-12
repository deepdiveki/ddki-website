"use client";

import { useRef, useEffect } from "react";

export default function CitySkylineAnimation() {
    const starsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 1.5;

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
            background: linear-gradient(to top, rgba(30, 58, 138, 0.15), rgba(59, 130, 246, 0.08));
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            padding: 0 10px;
            border: 1px solid rgba(59, 130, 246, 0.15);
        }

        .building {
            position: relative;
            width: 20px;
            border-radius: 3px 3px 0 0;
            animation: building-pulse 4s ease-in-out infinite alternate;
        }

        .building-1 {
            height: 70px;
            background: linear-gradient(to top, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.3));
        }
        .building-2 {
            height: 90px;
            background: linear-gradient(to top, rgba(20, 184, 166, 0.5), rgba(13, 148, 136, 0.3));
        }
        .building-3 {
            height: 60px;
            background: linear-gradient(to top, rgba(249, 115, 22, 0.5), rgba(234, 88, 12, 0.3));
        }
        .building-4 {
            height: 100px;
            background: linear-gradient(to top, rgba(168, 85, 247, 0.5), rgba(139, 92, 246, 0.3));
        }
        .building-5 {
            height: 80px;
            background: linear-gradient(to top, rgba(234, 179, 8, 0.5), rgba(202, 138, 4, 0.3));
        }

        .star {
            width: 8px;
            height: 8px;
            background: rgba(234, 179, 8, 0.7);
            position: absolute;
            clip-path: polygon(
                50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,
                50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
            );
            animation: star-glow 4s ease-in-out infinite alternate;
        }

        @keyframes star-glow {
            0%, 100% { box-shadow: 0 0 4px rgba(234, 179, 8, 0.3); }
            50% { box-shadow: 0 0 10px rgba(234, 179, 8, 0.7); }
        }

        @keyframes building-pulse {
            0%, 100% { box-shadow: 0 0 4px rgba(59, 130, 246, 0.2); }
            50% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
        }
    `}</style>
    );
}
