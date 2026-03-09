"use client";

import { useRef, useEffect } from "react";

export default function AssistantAnimation() {
    const centerCircleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (centerCircleRef.current) {
                angle += 1;
                centerCircleRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="assistant-animation-container">
            <div className="center-circle" ref={centerCircleRef}>
                <div className="orbiting-circle orbit-1" />
                <div className="orbiting-circle orbit-2" />
                <div className="orbiting-circle orbit-3" />
            </div>
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .assistant-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .center-circle {
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, rgba(128, 90, 213, 0.8), rgba(90, 60, 150, 0.9));
            border-radius: 50%;
            position: relative;
            animation: pulse 3s ease-in-out infinite;
            box-shadow: 0 0 15px rgba(128, 90, 213, 0.7);
        }

        .orbiting-circle {
            width: 10px;
            height: 10px;
            background: rgba(128, 90, 213, 0.9);
            border-radius: 50%;
            position: absolute;
            animation: orbit 5s linear infinite;
            box-shadow: 0 0 10px rgba(128, 90, 213, 0.6);
        }

        .orbit-1 {
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0s;
        }

        .orbit-2 {
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 1s;
        }

        .orbit-3 {
            top: 50%;
            right: -20px;
            transform: translateY(-50%);
            animation-delay: 2s;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 15px rgba(128, 90, 213, 0.7);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 30px rgba(128, 90, 213, 0.9);
            }
        }

        @keyframes orbit {
            from {
                transform: rotate(0deg) translateX(30px);
            }
            to {
                transform: rotate(360deg) translateX(30px);
            }
        }
    `}</style>
    );
}