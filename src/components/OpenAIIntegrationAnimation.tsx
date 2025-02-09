"use client";

import { useRef, useEffect } from "react";

export default function OpenAIIntegrationAnimation() {
    const hexagonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (hexagonRef.current) {
                angle += 1.5;
                hexagonRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="openai-animation-container">
            <div className="central-hexagon" />
            <div ref={hexagonRef} className="rotating-lines" />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .openai-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .central-hexagon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, rgba(128, 90, 213, 0.9), rgba(72, 40, 160, 0.9));
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            box-shadow: 0 0 20px rgba(128, 90, 213, 0.7);
            position: absolute;
            animation: glow 3s ease-in-out infinite alternate;
        }

        .rotating-lines {
            width: 60px;
            height: 60px;
            border: 2px dashed rgba(128, 90, 213, 0.6);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 10px rgba(128, 90, 213, 0.6);
        }

        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(128, 90, 213, 0.7);
            }
            50% {
                box-shadow: 0 0 40px rgba(128, 90, 213, 0.9);
            }
        }
    `}</style>
    );
}