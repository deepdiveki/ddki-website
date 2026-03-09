"use client";
import { useRef, useEffect } from "react";

export default function FortbildungCore() {
    const coreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (coreRef.current) {
                angle += 0.5;
                coreRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fortbildung-core">
            <div ref={coreRef} className="core-icon">
                <svg width="50" height="50" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="url(#gradient)" opacity="0.12" />
                    <path d="M50 15 A35 35 0 1 0 50 85 A12 12 0 1 1 50 15" fill="#ffffffee" />
                    <circle cx="50" cy="28" r="5" fill="#4e3ccc" />
                    <circle cx="50" cy="72" r="5" fill="#6C63FF" />
                    <defs>
                        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#6C63FF" />
                            <stop offset="100%" stopColor="#2b1d71" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .fortbildung-core {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle, rgba(108, 99, 255, 0.25), rgba(90, 60, 150, 0.35));
            border-radius: 50%;
            animation: pulse-glow 3s ease-in-out infinite;
            box-shadow: 0 0 15px rgba(108, 99, 255, 0.4), 0 0 25px rgba(108, 99, 255, 0.3);
        }

        .core-icon {
            transition: transform 0.3s ease;
        }

        @keyframes pulse-glow {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 15px rgba(108, 99, 255, 0.4), 0 0 25px rgba(108, 99, 255, 0.3);
            }
            50% {
                transform: scale(1.04);
                box-shadow: 0 0 22px rgba(108, 99, 255, 0.5), 0 0 35px rgba(108, 99, 255, 0.35);
            }
        }
    `}</style>
    );
}