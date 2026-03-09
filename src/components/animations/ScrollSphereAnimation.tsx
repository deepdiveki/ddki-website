"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollSphereAnimation() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });

    // Weiches Scrollen mit Feder-Animation
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    // Transformationen für Rotation & Schweben
    const rotateX = useTransform(smoothScroll, [0, 1], [-20, 200]);
    const rotateY = useTransform(smoothScroll, [0, 1], [0, 360]);
    const translateY = useTransform(smoothScroll, [0, 1], [0, -100]);

    return (
        <div ref={ref} className="sphere-container">
            <motion.div
                className="sphere"
                style={{
                    rotateX,
                    rotateY,
                    y: translateY
                }}
            />
            <StyleSheet />
        </div>
    );
}

function StyleSheet() {
    return (
        <style>{`
        .sphere-container {
            position: fixed;
            top: 50%;
            right: 5%;
            transform: translateY(-50%);
            width: 200px;
            height: 200px;
            pointer-events: none;
        }

        .sphere {
            width: 180px;
            height: 180px;
            background: radial-gradient(circle, rgba(128, 90, 213, 0.8), rgba(55, 48, 163, 0.8));
            border-radius: 50%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            filter: blur(4px);
        }
    `}</style>
    );
}