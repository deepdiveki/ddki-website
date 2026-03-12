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
                    className="rotating-diamond-cb"
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

        .rotating-diamond-cb {
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-bottom-color: rgba(59, 130, 246, 0.6);
            position: absolute;
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            animation: diamond-glow-cb 3s ease-in-out infinite alternate;
        }

        .rotating-diamond-cb:nth-child(1) {
            border-bottom-color: rgba(59, 130, 246, 0.7);
        }

        .rotating-diamond-cb:nth-child(2) {
            border-bottom-color: rgba(34, 197, 94, 0.7);
            animation-delay: 0.5s;
        }

        .rotating-diamond-cb:nth-child(3) {
            border-bottom-color: rgba(249, 115, 22, 0.6);
            animation-delay: 1s;
        }

        @keyframes diamond-glow-cb {
            0%, 100% {
                filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.2));
            }
            50% {
                filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
            }
        }
    `}</style>
    );
}
