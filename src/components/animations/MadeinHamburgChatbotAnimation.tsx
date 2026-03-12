"use client";

import { useRef, useEffect } from "react";

export default function MadeInHamburgChatbotAnimation() {
    const wavesRef = useRef<HTMLDivElement>(null);
    const starsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            angle += 1.5;

            if (wavesRef.current) {
                const waveOffset = 5 * Math.sin(angle * (Math.PI / 180));
                wavesRef.current.style.transform = `translateX(${waveOffset}px)`;
            }

            starsRef.current.forEach((star, index) => {
                const offset = 3 * Math.sin((angle + index * 60) * (Math.PI / 180));
                star.style.transform = `translateY(${offset}px)`;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hamburg-cb-animation-container">
            <div className="building-cb" />
            <div className="crane-cb" />
            <div ref={wavesRef} className="waves-cb" />
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        starsRef.current[i] = el!;
                    }}
                    className="star-cb"
                    style={{ top: "-30px", left: `${30 + i * 50}px` }}
                />
            ))}
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .hamburg-cb-animation-container {
            position: relative;
            width: 220px;
            height: 140px;
            background: linear-gradient(to top, rgba(30, 58, 138, 0.15), rgba(59, 130, 246, 0.08));
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            padding: 0 10px;
            border: 1px solid rgba(59, 130, 246, 0.15);
        }

        .building-cb {
            position: relative;
            width: 30px;
            height: 70px;
            background: linear-gradient(to top, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.3));
            border-radius: 3px 3px 0 0;
        }

        .crane-cb {
            position: relative;
            width: 40px;
            height: 60px;
            background: linear-gradient(to top, rgba(234, 179, 8, 0.5), rgba(249, 115, 22, 0.3));
            clip-path: polygon(0% 0%, 100% 10%, 90% 40%, 80% 100%, 20% 100%, 10% 40%, 0% 10%);
        }

        .waves-cb {
            position: absolute;
            bottom: 0;
            width: 220px;
            height: 20px;
            background: rgba(59, 130, 246, 0.3);
            clip-path: polygon(0% 60%, 20% 80%, 40% 60%, 60% 80%, 80% 60%, 100% 80%, 100% 100%, 0% 100%);
        }

        .star-cb {
            width: 10px;
            height: 10px;
            background: rgba(234, 179, 8, 0.7);
            position: absolute;
            clip-path: polygon(
                50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,
                50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
            );
            animation: star-glow-cb 3s ease-in-out infinite alternate;
        }

        @keyframes star-glow-cb {
            0%, 100% { box-shadow: 0 0 4px rgba(234, 179, 8, 0.3); }
            50% { box-shadow: 0 0 10px rgba(234, 179, 8, 0.6); }
        }
    `}</style>
    );
}
