"use client";

import { useRef, useEffect } from "react";

export default function CuttingEdgeAnimation() {
    const trianglesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            trianglesRef.current.forEach((triangle, index) => {
                const scale = 1 + 0.05 * Math.sin((angle + index * 60) * (Math.PI / 180));
                triangle.style.transform = `rotate(${angle + index * 90}deg) scale(${scale})`;
            });
            angle += 2;
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="cutting-edge-animation-container">
            {[...Array(3)].map((_, i) => (
                <div
                key={i}
                ref={(el) => {
                    trianglesRef.current[i] = el!;
                }}
                className="rotating-triangle"
            />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .cutting-edge-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .rotating-triangle {
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 40px solid rgba(255, 255, 255, 0.8);
            position: absolute;
            animation: glow 3s ease-in-out infinite alternate;
        }

        .rotating-triangle:nth-child(1) {
            border-bottom-color: rgba(72, 160, 220, 0.9);
        }

        .rotating-triangle:nth-child(2) {
            border-bottom-color: rgba(128, 90, 213, 0.9);
            animation-delay: 0.5s;
        }

        .rotating-triangle:nth-child(3) {
            border-bottom-color: rgba(255, 100, 150, 0.9);
            animation-delay: 1s;
        }

        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
            }
            50% {
                box-shadow: 0 0 30px rgba(255, 255, 255, 0.9);
            }
        }
    `}</style>
    );
}