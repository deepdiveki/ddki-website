"use client";

import { useRef, useEffect } from "react";

export default function AIModelAnimation() {
    const pointsRef = useRef<HTMLDivElement[]>([]);
    const linesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 1.5;

            // Punkte auf Linien bewegen
            pointsRef.current.forEach((point, index) => {
                const offset = (angle + index * 40) % 360;
                const x = 25 * Math.cos((offset * Math.PI) / 180);
                const y = 25 * Math.sin((offset * Math.PI) / 180);
                point.style.transform = `translate(${x}px, ${y}px)`;
            });

            // Linien rotieren leicht
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
            background: rgba(255, 255, 255, 0.8);
            position: absolute;
            transform-origin: center;
            animation: line-glow 3s ease-in-out infinite alternate;
        }

        .moving-point {
            width: 8px;
            height: 8px;
            background: rgba(128, 90, 213, 1);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 10px rgba(128, 90, 213, 0.6);
        }

        @keyframes line-glow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            }
            50% {
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
            }
        }
    `}</style>
    );
}