"use client";

import { useRef, useEffect } from "react";

export default function OptimizedModelsAnimation() {
    const diamondsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            diamondsRef.current.forEach((diamond, index) => {
                const scale = 1 + 0.05 * Math.sin((angle + index * 45) * (Math.PI / 180));
                diamond.style.transform = `rotate(${angle + index * 90}deg) scale(${scale})`;
            });
            angle += 2;
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="optimized-models-animation-container">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        diamondsRef.current[i] = el!;
                    }}
                    className="rotating-diamond"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .optimized-models-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            position: relative;
        }

        .rotating-diamond {
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-bottom-color: rgba(255, 255, 255, 0.8);
            position: absolute;
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            animation: glow 3s ease-in-out infinite alternate;
        }

        .rotating-diamond:nth-child(1) {
            border-bottom-color: rgba(72, 150, 220, 0.9);
        }

        .rotating-diamond:nth-child(2) {
            border-bottom-color: rgba(90, 200, 150, 0.9);
            animation-delay: 0.5s;
        }

        .rotating-diamond:nth-child(3) {
            border-bottom-color: rgba(255, 120, 90, 0.9);
            animation-delay: 1s;
        }

        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
            }
            50% {
                box-shadow: 0 0 40px rgba(255, 255, 255, 0.9);
            }
        }
    `}</style>
    );
}