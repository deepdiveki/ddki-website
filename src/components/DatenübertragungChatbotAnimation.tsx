"use client";

import { useRef, useEffect } from "react";

export default function DataTransmissionAnimation() {
    const rotatingWavesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (rotatingWavesRef.current) {
                angle += 1.2;
                rotatingWavesRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="data-animation-container">
            <div className="data-packet" />
            <div ref={rotatingWavesRef} className="rotating-waves" />
            <div className="outer-control-frame" />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .data-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            position: relative;
        }

        .data-packet {
            width: 30px;
            height: 20px;
            background: linear-gradient(135deg, rgba(72, 150, 240, 0.9), rgba(40, 90, 200, 0.8));
            border-radius: 5px;
            box-shadow: 0 0 20px rgba(72, 150, 240, 0.7);
            position: absolute;
            animation: glow-data 3s ease-in-out infinite alternate;
        }

        .rotating-waves {
            width: 70px;
            height: 70px;
            border: 2px solid rgba(72, 150, 240, 0.6);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 15px rgba(72, 150, 240, 0.5);
            animation: wave-pulse 4s ease-in-out infinite alternate;
        }

        .outer-control-frame {
            width: 90px;
            height: 90px;
            border: 2px dotted rgba(34, 193, 195, 0.7);
            border-radius: 10px;
            position: absolute;
            box-shadow: 0 0 10px rgba(34, 193, 195, 0.5);
        }

        @keyframes glow-data {
            0%, 100% {
                box-shadow: 0 0 20px rgba(72, 150, 240, 0.7);
            }
            50% {
                box-shadow: 0 0 40px rgba(72, 150, 240, 0.9);
            }
        }

        @keyframes wave-pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
    `}</style>
    );
}