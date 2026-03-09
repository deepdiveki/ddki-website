"use client";

import { useRef, useEffect } from "react";

export default function SecurityPrivacyAnimation() {
    const shieldRef = useRef<HTMLDivElement>(null);
    const orbitingPointsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 2;
            orbitingPointsRef.current.forEach((point, index) => {
                const radius = 30 + index * 10;
                const x = radius * Math.cos((angle + index * 60) * (Math.PI / 180));
                const y = radius * Math.sin((angle + index * 60) * (Math.PI / 180));
                point.style.transform = `translate(${x}px, ${y}px)`;
            });
            if (shieldRef.current) {
                shieldRef.current.style.transform = `rotate(${angle / 2}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="security-animation-container">
            <div ref={shieldRef} className="shield-symbol" />
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        orbitingPointsRef.current[i] = el!;
                    }}
                    className="orbiting-point"
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .security-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            position: relative;
        }

        .shield-symbol {
            width: 40px;
            height: 48px;
            background: linear-gradient(135deg, rgba(72, 160, 220, 0.9), rgba(40, 100, 180, 0.9));
            clip-path: polygon(50% 0%, 85% 20%, 85% 70%, 50% 100%, 15% 70%, 15% 20%);
            box-shadow: 0 0 20px rgba(72, 160, 220, 0.7);
            position: absolute;
            animation: glow 3s ease-in-out infinite alternate;
        }

        .orbiting-point {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
            animation: point-pulse 2.5s ease-in-out infinite alternate;
        }

        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 15px rgba(72, 160, 220, 0.7);
            }
            50% {
                box-shadow: 0 0 30px rgba(72, 160, 220, 0.9);
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