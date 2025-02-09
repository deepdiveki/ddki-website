"use client";

import { useRef, useEffect } from "react";

export default function AbstractBoxAnimation() {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (boxRef.current) {
                angle += 2;
                const scale = 1 + 0.05 * Math.sin(angle * (Math.PI / 180));
                boxRef.current.style.transform = `rotate(${angle}deg) scale(${scale})`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="abstract-animation-container">
            <div ref={boxRef} className="animated-box" />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .abstract-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
        }

        .animated-box {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, rgba(128, 90, 213, 0.8), rgba(90, 60, 150, 0.9));
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            animation: box-glow 4s ease-in-out infinite alternate;
        }

        @keyframes box-glow {
            from {
                box-shadow: 0 0 10px rgba(128, 90, 213, 0.5), 0 0 20px rgba(128, 90, 213, 0.4);
            }
            to {
                box-shadow: 0 0 30px rgba(128, 90, 213, 0.9), 0 0 50px rgba(128, 90, 213, 0.7);
            }
        }
    `}</style>
    );
}