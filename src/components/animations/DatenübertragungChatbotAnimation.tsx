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
        <div className="data-cb-animation-container">
            <div className="data-packet-cb" />
            <div ref={rotatingWavesRef} className="rotating-waves-cb" />
            <div className="outer-control-frame-cb" />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .data-cb-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            position: relative;
        }

        .data-packet-cb {
            width: 30px;
            height: 20px;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.7));
            border-radius: 5px;
            box-shadow: 0 0 14px rgba(59, 130, 246, 0.4);
            position: absolute;
            animation: glow-data-cb 3s ease-in-out infinite alternate;
        }

        .rotating-waves-cb {
            width: 70px;
            height: 70px;
            border: 2px solid rgba(20, 184, 166, 0.4);
            border-radius: 50%;
            position: absolute;
            animation: wave-pulse-cb 4s ease-in-out infinite alternate;
        }

        .outer-control-frame-cb {
            width: 90px;
            height: 90px;
            border: 2px dotted rgba(20, 184, 166, 0.3);
            border-radius: 10px;
            position: absolute;
        }

        @keyframes glow-data-cb {
            0%, 100% { box-shadow: 0 0 14px rgba(59, 130, 246, 0.4); }
            50% { box-shadow: 0 0 24px rgba(59, 130, 246, 0.6); }
        }

        @keyframes wave-pulse-cb {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `}</style>
    );
}
