"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ConnectorAnimationProps {
  buttonRef: React.RefObject<HTMLAnchorElement | null>;
  boxRefs: React.RefObject<HTMLDivElement | null>[];
}

export default function ConnectorAnimation({ buttonRef, boxRefs }: ConnectorAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<{ d: string; id: string; delay: number }[]>([]);
  const [hitboxes, setHitboxes] = useState<{ x: number; y: number; width: number; height: number }[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [debugPoint, setDebugPoint] = useState<{ x: number; y: number } | null>(null);
  const pulseDuration = 2.5;

  useEffect(() => {
    const updateSize = () => {
      setSvgSize({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("scroll", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("scroll", updateSize);
    };
  }, []);

  useEffect(() => {
    const updatePaths = () => {
      if (!buttonRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const startX = buttonRect.left + buttonRect.width / 2;
      const startY = buttonRect.bottom + window.scrollY;

      const newPaths = boxRefs.map((ref, index) => {
        if (!ref.current) return null;
        const boxRect = ref.current.getBoundingClientRect();
        const endX = boxRect.left + boxRect.width / 2;
        const endY = boxRect.top + window.scrollY;
        const controlY = (startY + endY) / 2;

        const d = `M${startX},${startY} C${startX},${controlY} ${endX},${controlY} ${endX},${endY}`;
        return { d, id: `pulsePath${index}`, delay: 0.2 };
      }).filter(Boolean) as { d: string; id: string; delay: number }[];

      setPaths(newPaths);

      const newHitboxes = boxRefs.map(ref => {
        if (!ref.current) return null;
        const rect = ref.current.getBoundingClientRect();

        return {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY - 20,
          width: rect.width,
          height: rect.height + 40,
        };
      }).filter(Boolean) as { x: number; y: number; width: number; height: number }[];

      setHitboxes(newHitboxes);
    };

    updatePaths();

    window.addEventListener("resize", updatePaths);
    window.addEventListener("scroll", updatePaths);
    return () => {
      window.removeEventListener("resize", updatePaths);
      window.removeEventListener("scroll", updatePaths);
    };
  }, [buttonRef, boxRefs]);

  // useEffect(() => {
  //   let animationFrame: number;

  //   const detectCollision = () => {
  //     const svgEl = svgRef.current as SVGSVGElement;
  //     if (!paths.length || !svgEl) return;

  //     const glowThreshold = 50;
  //     hitboxes.forEach((box, i) => {
  //       if (!box || !paths[i] || !boxRefs[i]?.current) return;

  //       const now = Date.now() / 1000;
  //       const time = (now % pulseDuration) / pulseDuration;

  //       // Nur auslösen, wenn Punkt mindestens 95 % des Pfads zurückgelegt hat
  //       if (time < 0.0) return;

  //       const point = getPointOnPathInViewport(paths[i].d, time, svgEl);

  //       setDebugPoint(point);

  //       const inBox = point.x >= box.x && point.x <= box.x + box.width &&
  //                     point.y >= box.y && point.y <= box.y + box.height;

  //       if (inBox) {
  //         //console.log(`Glow ausgelöst bei Box ${i}`);
  //         boxRefs[i].current.classList.add("glow-up");
  //         setTimeout(() => boxRefs[i]?.current?.classList.remove("glow-up"), 700);
  //       }
  //     });

  //     animationFrame = requestAnimationFrame(detectCollision);
  //   };

  //   animationFrame = requestAnimationFrame(detectCollision);
  //   return () => cancelAnimationFrame(animationFrame);
  // }, [paths, hitboxes, boxRefs]);

//   useEffect(() => {
//     console.log("ConnectorAnimation: paths", paths);
//   }, [paths]);

  return (
    <svg
      ref={svgRef}
      className="absolute left-0 top-0 pointer-events-none z-0"
      width={svgSize.width}
      height={svgSize.height}
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {hitboxes.map((box, i) => (
        <rect
          key={`hitbox-${i}`}
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
          fill="transparent"
        />
      ))}
      {paths.map((path, index) => (
        <g key={path.id}>
          <motion.path
            d={path.d}
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeOpacity="0.2"
            fill="none"
            initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, delay: path.delay }}
          />
          <motion.circle
            r="0"
            fill="#C084FC"
          >
            <animateMotion dur={`${pulseDuration}s`} repeatCount="indefinite" rotate="auto">
              <mpath href={`#${path.id}`} />
            </animateMotion>
          </motion.circle>
          <path id={path.id} d={path.d} fill="none" />
        </g>
      ))}
    </svg>
  );
}

function getPointOnPathInViewport(d: string, t: number, svgEl: SVGSVGElement): { x: number; y: number } {
  const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tempPath.setAttribute("d", d);
  svgEl.appendChild(tempPath);
  const length = tempPath.getTotalLength();
  const point = tempPath.getPointAtLength(length * t);
  svgEl.removeChild(tempPath);

  const svgRect = svgEl.getBoundingClientRect();
  return {
    x: point.x + svgRect.left,
    y: point.y + svgRect.top,
  };
}