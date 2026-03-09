"use client";

import { useRef, useEffect } from "react";

export default function ToolsAnimation() {
    const centerRef = useRef<HTMLDivElement>(null);
    const orbitingRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 3;
            orbitingRef.current.forEach((tool, index) => {
                const radius = 100 + 10 * Math.sin(angle * 0.1);
                const x = radius * Math.cos((angle + index * 72) * (Math.PI / 180));
                const y = radius * Math.sin((angle + index * 72) * (Math.PI / 180));
                tool.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
            });
            if (centerRef.current) {
                centerRef.current.style.transform = `rotate(${angle / 2}deg) scale(${1 + 0.1 * Math.sin(angle * 0.05)})`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="tools-animation-container">
            <div ref={centerRef} className="center-gear" />
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        orbitingRef.current[i] = el!;
                    }}
                    className="orbiting-tool"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .tools-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 320px;
            height: 320px;
            position: relative;
        }

        .center-gear {
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, rgba(100, 100, 100, 0.9), rgba(50, 50, 50, 0.9));
            border-radius: 50%;
            box-shadow: 0 0 40px rgba(100, 100, 100, 0.8);
            position: absolute;
            animation: gear-spin 3s linear infinite;
        }

        .orbiting-tool {
            width: 30px;
            height: 30px;
            background: rgba(200, 200, 200, 1);
            border-radius: 6px;
            position: absolute;
            box-shadow: 0 0 20px rgba(200, 200, 200, 0.6);
            animation: tool-spin 2s ease-in-out infinite alternate;
        }

        @keyframes gear-spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes tool-spin {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
        }
    `}</style>
    );
}
