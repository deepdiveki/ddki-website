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
            border-bottom: 40px solid rgba(59, 130, 246, 0.6);
            position: absolute;
            animation: triangle-glow 3s ease-in-out infinite alternate;
        }

        .rotating-triangle:nth-child(1) {
            border-bottom-color: rgba(20, 184, 166, 0.7);
        }

        .rotating-triangle:nth-child(2) {
            border-bottom-color: rgba(249, 115, 22, 0.7);
            animation-delay: 0.5s;
        }

        .rotating-triangle:nth-child(3) {
            border-bottom-color: rgba(59, 130, 246, 0.6);
            animation-delay: 1s;
        }

        @keyframes triangle-glow {
            0%, 100% {
                filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.2));
            }
            50% {
                filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.5));
            }
        }
    `}</style>
    );
}
