"use client";

import { useRef, useEffect } from "react";

export default function PersonaAnimation() {
    const pointsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 2;
            pointsRef.current.forEach((point, index) => {
                const radius = 30 + index * 10;
                const x = radius * Math.cos((angle + index * 60) * (Math.PI / 180));
                const y = radius * Math.sin((angle + index * 60) * (Math.PI / 180));
                point.style.transform = `translate(${x}px, ${y}px)`;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="persona-animation-container">
            <div className="central-circle" />
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        pointsRef.current[i] = el!;
                    }}
                    className="orbiting-point"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .persona-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .central-circle {
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, rgba(128, 90, 213, 0.9), rgba(90, 60, 150, 0.8));
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(128, 90, 213, 0.7);
            position: absolute;
        }

        .orbiting-point {
            width: 8px;
            height: 8px;
            background: rgba(128, 90, 213, 1);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 10px rgba(128, 90, 213, 0.6);
            animation: pulse 2.5s ease-in-out infinite alternate;
        }

        @keyframes pulse {
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