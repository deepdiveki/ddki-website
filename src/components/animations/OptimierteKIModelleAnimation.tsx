"use client";

import { useRef, useEffect } from "react";

export default function AIModelAnimation() {
    const pointsRef = useRef<HTMLDivElement[]>([]);
    const linesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 1.5;

            pointsRef.current.forEach((point, index) => {
                const offset = (angle + index * 40) % 360;
                const x = 25 * Math.cos((offset * Math.PI) / 180);
                const y = 25 * Math.sin((offset * Math.PI) / 180);
                point.style.transform = `translate(${x}px, ${y}px)`;
            });

            linesRef.current.forEach((line, index) => {
                line.style.transform = `rotate(${angle + index * 90}deg)`;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="ai-model-animation-container">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        linesRef.current[i] = el!;
                    }}
                    className="rotating-line"
                >
                    <div
                        ref={(el) => {
                            pointsRef.current[i] = el!;
                        }}
                        className="moving-point"
                    />
                </div>
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .ai-model-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .rotating-line {
            width: 60px;
            height: 2px;
            position: absolute;
            transform-origin: center;
            animation: aimodel-line-glow 3s ease-in-out infinite alternate;
        }

        .rotating-line:nth-child(1) {
            background: rgba(20, 184, 166, 0.4);
        }
        .rotating-line:nth-child(2) {
            background: rgba(59, 130, 246, 0.4);
        }
        .rotating-line:nth-child(3) {
            background: rgba(249, 115, 22, 0.4);
        }
        .rotating-line:nth-child(4) {
            background: rgba(168, 85, 247, 0.4);
        }

        .moving-point {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: absolute;
        }

        .rotating-line:nth-child(1) .moving-point {
            background: rgba(20, 184, 166, 0.9);
            box-shadow: 0 0 8px rgba(20, 184, 166, 0.5);
        }
        .rotating-line:nth-child(2) .moving-point {
            background: rgba(59, 130, 246, 0.9);
            box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
        }
        .rotating-line:nth-child(3) .moving-point {
            background: rgba(249, 115, 22, 0.9);
            box-shadow: 0 0 8px rgba(249, 115, 22, 0.5);
        }
        .rotating-line:nth-child(4) .moving-point {
            background: rgba(168, 85, 247, 0.9);
            box-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
        }

        @keyframes aimodel-line-glow {
            0%, 100% {
                filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.2));
            }
            50% {
                filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.4));
            }
        }
    `}</style>
    );
}
