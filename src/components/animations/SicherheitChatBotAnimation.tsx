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
        <div className="security-cb-animation-container">
            <div className="central-shield-cb" />
            <div ref={rotatingCircleRef} className="rotating-dashed-circle-cb" />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .security-cb-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .central-shield-cb {
            width: 35px;
            height: 40px;
            background: linear-gradient(135deg, rgba(30, 58, 138, 0.85), rgba(59, 130, 246, 0.8));
            clip-path: polygon(50% 0%, 90% 30%, 90% 80%, 50% 100%, 10% 80%, 10% 30%);
            box-shadow: 0 0 16px rgba(30, 58, 138, 0.4);
            position: absolute;
            animation: glow-shield-cb 3s ease-in-out infinite alternate;
        }

        .rotating-dashed-circle-cb {
            width: 60px;
            height: 60px;
            border: 2px dashed rgba(20, 184, 166, 0.5);
            border-radius: 50%;
            position: absolute;
        }

        @keyframes glow-shield-cb {
            0%, 100% {
                box-shadow: 0 0 12px rgba(30, 58, 138, 0.3);
            }
            50% {
                box-shadow: 0 0 24px rgba(30, 58, 138, 0.5);
            }
        }
    `}</style>
    );
}
