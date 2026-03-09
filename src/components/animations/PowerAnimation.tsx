"use client";

import { useRef, useEffect } from "react";

export default function PowerAnimation() {
    const coreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 4;
            if (coreRef.current) {
                coreRef.current.style.transform = `scale(${1 + 0.2 * Math.sin(angle * 0.05)})`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="power-animation-container">
            <div ref={coreRef} className="power-core" />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .power-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 320px;
            height: 320px;
            position: relative;
        }

        .power-core {
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, rgba(255, 0, 0, 0.9), rgba(200, 0, 0, 0.9));
            border-radius: 50%;
            box-shadow: 0 0 40px rgba(255, 0, 0, 0.8);
            position: absolute;
            animation: core-pulse 2s ease-in-out infinite;
        }

        @keyframes core-pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.4);
            }
        }
    `}</style>
    );
}
