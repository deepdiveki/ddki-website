"use client";

import { useRef, useEffect } from "react";

export default function CompactChatbotAnimation() {
    const botRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (botRef.current) {
                angle += 1;
                botRef.current.style.transform = `translateY(${Math.sin(angle * 0.1) * 5}px) rotate(${Math.sin(angle * 0.05) * 3}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={botRef} className="chatbot-body">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                width="80"
                height="80"
                preserveAspectRatio="xMidYMid meet"
            >
                <path fill="none" stroke="#6C63FF" strokeWidth="3" d="M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10 Z" />
            </svg>
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .chatbot-body {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(108, 99, 255, 0.8), rgba(90, 60, 150, 0.9));
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            animation: glow 3s ease-in-out infinite;
            box-shadow: 0 0 15px rgba(108, 99, 255, 0.6), 0 0 30px rgba(108, 99, 255, 0.4);
        }

        @keyframes glow {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 15px rgba(108, 99, 255, 0.6), 0 0 30px rgba(108, 99, 255, 0.4);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 0 20px rgba(108, 99, 255, 0.9), 0 0 40px rgba(108, 99, 255, 0.6);
            }
        }
    `}</style>
    );
}
