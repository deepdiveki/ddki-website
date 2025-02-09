"use client";

import { useAnimationFrame } from "motion/react";
import { useRef } from "react";

export default function CubeAnimation() {
    const ref = useRef<HTMLDivElement>(null);

    useAnimationFrame((t) => {
        if (!ref.current) return;

        const rotate = Math.sin(t / 10000) * 200;
        const y = (1 + Math.sin(t / 1000)) * -20;
        ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    });

    return (
        <div className="cube-container">
            <div className="cube" ref={ref}>
                <div className="side front" />
                <div className="side left" />
                <div className="side right" />
                <div className="side top" />
                <div className="side bottom" />
                <div className="side back" />
            </div>
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .cube-container {
            perspective: 1200px;
            width: 300px;
            height: 300px;
            margin: 0 auto;
            position: absolute;
            top: 50px;
            right: 10%;
        }

        .cube {
            width: 250px;
            height: 250px;
            position: relative;
            transform-style: preserve-3d;
        }

        .side {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(128, 90, 213, 0.7); /* Lila passend zum Design */
            border: 2px solid rgba(255, 255, 255, 0.1);
            opacity: 0.9;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .front {
            transform: rotateY(0deg) translateZ(125px);
        }
        .right {
            transform: rotateY(90deg) translateZ(125px);
        }
        .back {
            transform: rotateY(180deg) translateZ(125px);
        }
        .left {
            transform: rotateY(-90deg) translateZ(125px);
        }
        .top {
            transform: rotateX(90deg) translateZ(125px);
        }
        .bottom {
            transform: rotateX(-90deg) translateZ(125px);
        }
    `}</style>
    );
}