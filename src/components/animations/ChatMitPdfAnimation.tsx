"use client";

import { useRef, useEffect } from "react";

export default function PDFChatAnimation() {
    const pointsRef = useRef<HTMLDivElement[]>([]);
    const pdfRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 2;
            pointsRef.current.forEach((point, index) => {
                const radius = 35;
                const x = radius * Math.cos((angle + index * 60) * (Math.PI / 180));
                const y = radius * Math.sin((angle + index * 60) * (Math.PI / 180));
                point.style.transform = `translate(${x}px, ${y}px)`;
            });
            if (pdfRef.current) {
                pdfRef.current.style.transform = `rotate(${angle / 2}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pdf-chat-animation-container">
            <div ref={pdfRef} className="pdf-block" />
            {[...Array(6)].map((_, i) => (
                <div
                key={i}
                ref={(el) => {
                    pointsRef.current[i] = el!;
                }}
                className="orbiting-chat-point"
            />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .pdf-chat-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .pdf-block {
            width: 26px;
            height: 36px;
            background: linear-gradient(135deg, rgba(90, 150, 230, 0.9), rgba(90, 120, 190, 0.9));
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(90, 150, 230, 0.7);
            position: absolute;
            animation: pdf-glow 3s ease-in-out infinite;
        }

        .orbiting-chat-point {
            width: 8px;
            height: 8px;
            background: rgba(128, 90, 213, 1);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 10px rgba(128, 90, 213, 0.6);
            animation: point-pulse 2.5s ease-in-out infinite alternate;
        }

        @keyframes pdf-glow {
            0%, 100% {
                box-shadow: 0 0 15px rgba(90, 150, 230, 0.7);
            }
            50% {
                box-shadow: 0 0 30px rgba(90, 150, 230, 0.9);
            }
        }

        @keyframes point-pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.3);
            }
        }
    `}</style>
    );
}