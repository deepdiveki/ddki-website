"use client";

import { useRef, useEffect } from "react";

export default function QRCodeAnimation() {
    const squareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (squareRef.current) {
                angle += 2;
                const scale = 1 + 0.05 * Math.sin(angle * (Math.PI / 180));
                squareRef.current.style.transform = `rotate(${angle}deg) scale(${scale})`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="qr-animation-container">
            <div className="qr-square-layer qr-layer-1" />
            <div ref={squareRef} className="qr-square-layer qr-layer-2" />
            <div className="qr-square-layer qr-layer-3" />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .qr-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .qr-square-layer {
            position: absolute;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(128, 90, 213, 0.8);
            border-radius: 4px;
            animation: glow 4s ease-in-out infinite alternate;
        }

        .qr-layer-1 {
            width: 50px;
            height: 50px;
            border-color: rgba(128, 90, 213, 0.4);
        }

        .qr-layer-2 {
            width: 30px;
            height: 30px;
            border-color: rgba(128, 90, 213, 0.7);
        }

        .qr-layer-3 {
            width: 20px;
            height: 20px;
            border-color: rgba(128, 90, 213, 1);
        }

        @keyframes glow {
            from {
                box-shadow: 0 0 10px rgba(128, 90, 213, 0.5), 0 0 20px rgba(128, 90, 213, 0.4);
            }
            to {
                box-shadow: 0 0 20px rgba(128, 90, 213, 0.9), 0 0 40px rgba(128, 90, 213, 0.7);
            }
        }
    `}</style>
    );
}