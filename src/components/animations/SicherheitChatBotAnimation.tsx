"use client";

import { useRef, useEffect } from "react";

export default function SecurityPrivacyAnimation() {
    const rotatingCircleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (rotatingCircleRef.current) {
                angle += 1.5;
                rotatingCircleRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="security-animation-container">
            <div className="central-shield" />
            <div ref={rotatingCircleRef} className="rotating-dashed-circle" />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .security-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .central-shield {
            width: 35px;
            height: 40px;
            background: linear-gradient(135deg, rgba(72, 72, 72, 0.9), rgba(0, 0, 0, 0.8));
            clip-path: polygon(50% 0%, 90% 30%, 90% 80%, 50% 100%, 10% 80%, 10% 30%);
            box-shadow: 0 0 20px rgba(72, 72, 72, 0.7);
            position: absolute;
            animation: glow-shield 3s ease-in-out infinite alternate;
        }

        .rotating-dashed-circle {
            width: 60px;
            height: 60px;
            border: 2px dashed rgba(34, 193, 195, 0.7);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 15px rgba(34, 193, 195, 0.6);
        }

        @keyframes glow-shield {
            0%, 100% {
                box-shadow: 0 0 20px rgba(72, 72, 72, 0.7);
            }
            50% {
                box-shadow: 0 0 40px rgba(72, 72, 72, 1);
            }
        }
    `}</style>
    );
}