"use client";

import { useMemo } from "react";
import { PARALLAX_CONFIGS } from "../_lib/parallax-config";

type Props = {
  chapterId: string;
  cameraX: number;
};

export default function ParallaxBackground({ chapterId, cameraX }: Props) {
  const layers = useMemo(
    () => PARALLAX_CONFIGS[chapterId] ?? PARALLAX_CONFIGS.ueber,
    [chapterId],
  );

  return (
    <>
      {layers.map((layer, layerIndex) => (
        <div
          key={layerIndex}
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            willChange: "transform",
            transform: `translateX(${-Math.round(cameraX * layer.factor)}px)`,
          }}
        >
          {layer.elements.map((el) => (
            <div key={el.key} style={el.style} />
          ))}
        </div>
      ))}
    </>
  );
}
