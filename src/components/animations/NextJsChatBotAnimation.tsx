"use client";

import { useRef, useEffect } from "react";

export default function FullStackTechAnimation() {
    const stackCubeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (stackCubeRef.current) {
                angle += 1;
                stackCubeRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="full-stack-animation-container">
            <div className="stack-cube" ref={stackCubeRef}>
                <div className="orbiting-tech frontend" />
                <div className="orbiting-tech backend" />
                <div className="orbiting-tech database" />
            </div>
            <FullStackStyleSheet />
        </div>
    );
}

function FullStackStyleSheet() {
    return (
        <style>{`
        .full-stack-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            position: relative;
        }

        .stack-cube {
            width: 35px;
            height: 35px;
            background: linear-gradient(135deg, rgba(34, 193, 195, 0.9), rgba(253, 187, 45, 0.9));
            box-shadow: 0 0 20px rgba(34, 193, 195, 0.8);
            position: relative;
            transform-style: preserve-3d;
            animation: pulse-stack 3s ease-in-out infinite;
        }

        .orbiting-tech {
            width: 12px;
            height: 12px;
            background: rgba(253, 187, 45, 0.9);
            border-radius: 50%;
            position: absolute;
            animation: orbit-tech 5s linear infinite;
            box-shadow: 0 0 15px rgba(253, 187, 45, 0.6);
        }

        .frontend {
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0s;
        }

        .backend {
            right: -35px;
            top: 50%;
            transform: translateY(-50%);
            animation-delay: 1.5s;
        }

        .database {
            bottom: -35px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 3s;
        }

        @keyframes pulse-stack {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 20px rgba(34, 193, 195, 0.8);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 40px rgba(34, 193, 195, 1);
            }
        }

        @keyframes orbit-tech {
            from {
                transform: rotate(0deg) translateX(45px);
            }
            to {
                transform: rotate(360deg) translateX(45px);
            }
        }
    `}</style>
    );
}