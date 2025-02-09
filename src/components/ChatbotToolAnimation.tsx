"use client";

import { useRef, useEffect } from "react";

export default function ChatbotAnimation() {
    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (circleRef.current) {
                angle += 1;
                circleRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="chatbot-animation-container">
            <div ref={circleRef} className="glowing-circle">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2a10 10 0 100 20 10 10 0 100-20zm-1 15h-2v-2h2v2zm0-4h-2v-6h2v6zm6 0h-2v-6h2v6zm0 4h-2v-2h2v2z"
                        fill="#ffffff"
                    />
                </svg>
            </div>
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .chatbot-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
        }

        .glowing-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(128, 90, 213, 0.8), rgba(90, 60, 150, 0.9));
            display: flex;
            justify-content: center;
            align-items: center;
            animation: pulse 3s ease-in-out infinite;
            box-shadow: 0 0 20px rgba(128, 90, 213, 0.6), 0 0 40px rgba(128, 90, 213, 0.4);
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 20px rgba(128, 90, 213, 0.6), 0 0 40px rgba(128, 90, 213, 0.4);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 30px rgba(128, 90, 213, 0.9), 0 0 60px rgba(128, 90, 213, 0.6);
            }
        }
    `}</style>
    );
}