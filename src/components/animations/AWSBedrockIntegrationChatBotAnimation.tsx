"use client";

import { useRef, useEffect } from "react";

export default function AwsBedrockAnimation() {
    const centerCloudRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const interval = setInterval(() => {
            if (centerCloudRef.current) {
                angle += 1;
                centerCloudRef.current.style.transform = `rotate(${angle}deg)`;
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="aws-bedrock-animation-container">
            <div className="center-cloud" ref={centerCloudRef}>
                <div className="orbiting-icon orbit-1" />
                <div className="orbiting-icon orbit-2" />
                <div className="orbiting-icon orbit-3" />
            </div>
            <AwsStyleSheet />
        </div>
    );
}

function AwsStyleSheet() {
    return (
        <style>{`
        .aws-bedrock-animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            position: relative;
        }

        .center-cloud {
            width: 40px;
            height: 30px;
            background: linear-gradient(135deg, rgba(60, 120, 255, 0.9), rgba(30, 90, 200, 0.9));
            border-radius: 40% 40% 60% 60%;
            position: relative;
            animation: pulse-cloud 3s ease-in-out infinite;
            box-shadow: 0 0 20px rgba(60, 120, 255, 0.8);
            overflow: hidden;
        }

        .orbiting-icon {
            width: 14px;
            height: 14px;
            background: linear-gradient(135deg, rgba(255, 165, 0, 0.9), rgba(255, 120, 0, 0.8));
            border-radius: 50%;
            position: absolute;
            animation: orbit-aws 4s linear infinite;
            box-shadow: 0 0 10px rgba(255, 165, 0, 0.6);
        }

        .orbit-1 {
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0s;
        }

        .orbit-2 {
            right: -30px;
            top: 50%;
            transform: translateY(-50%);
            animation-delay: 1s;
        }

        .orbit-3 {
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 2s;
        }

        @keyframes pulse-cloud {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 20px rgba(60, 120, 255, 0.8);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 40px rgba(60, 120, 255, 0.9);
            }
        }

        @keyframes orbit-aws {
            from {
                transform: rotate(0deg) translateX(40px);
            }
            to {
                transform: rotate(360deg) translateX(40px);
            }
        }
    `}</style>
    );
}