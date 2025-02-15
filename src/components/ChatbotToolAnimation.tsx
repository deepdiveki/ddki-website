"use client";

import { useRef, useEffect } from "react";

export default function AbstractChatbotAnimation() {
    const botRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (botRef.current) {
                angle += 1;
                botRef.current.style.transform = `translateY(${Math.sin(angle * 0.1) * 8}px) rotate(${Math.sin(angle * 0.05) * 5}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="chatbot-animation-container">
            <div ref={botRef} className="chatbot-body">
                <div className="chatbot-symbol">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 200"
                        width="100"
                        height="100"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path fill="none" stroke="#6C63FF" strokeWidth="3" d="M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10 Z" />
                        <path fill="none" stroke="#6C63FF" strokeWidth="3" d="M50,100 C50,70 70,50 100,50 C130,50 150,70 150,100 C150,130 130,150 100,150 C70,150 50,130 50,100 Z" />
                    </svg>
                </div>
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
            width: 120px;
            height: 120px;
            margin-top: 40px;
        }

        .chatbot-body {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(108, 99, 255, 0.8), rgba(90, 60, 150, 0.9));
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            animation: glow 3s ease-in-out infinite;
            box-shadow: 0 0 20px rgba(108, 99, 255, 0.6), 0 0 40px rgba(108, 99, 255, 0.4);
        }

        .chatbot-symbol {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: pulse 2s infinite;
        }

        @keyframes glow {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 20px rgba(108, 99, 255, 0.6), 0 0 40px rgba(108, 99, 255, 0.4);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 30px rgba(108, 99, 255, 0.9), 0 0 60px rgba(108, 99, 255, 0.6);
            }
        }
    `}</style>
    );
}
