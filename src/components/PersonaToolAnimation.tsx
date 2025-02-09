"use client";

import { useRef, useEffect } from "react";


export default function PersonaAnimation() {
    const outerCircleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (outerCircleRef.current) {
                angle += 1;
                outerCircleRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="persona-animation-container">
            <div ref={outerCircleRef} className="outer-circle">
                <div className="inner-circle" />
            </div>
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .persona-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
        }

        .outer-circle {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 3px solid rgba(128, 90, 213, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: glow 4s ease-in-out infinite alternate;
            box-shadow: 0 0 20px rgba(128, 90, 213, 0.6), 0 0 40px rgba(128, 90, 213, 0.4);
        }

        .inner-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(128, 90, 213, 0.9), rgba(90, 60, 150, 0.8));
            box-shadow: 0 0 10px rgba(128, 90, 213, 0.8);
        }

        @keyframes glow {
            from {
                box-shadow: 0 0 20px rgba(128, 90, 213, 0.6), 0 0 40px rgba(128, 90, 213, 0.4);
            }
            to {
                box-shadow: 0 0 30px rgba(128, 90, 213, 0.9), 0 0 60px rgba(128, 90, 213, 0.7);
            }
        }
    `}</style>
    );
}