"use client";

import { MeshGradient } from "@paper-design/shaders-react";

/* Hero-headline backdrop: an animated, slowly warping mesh gradient. */
export default function HeadlineShaderBackground() {
  return (
    <MeshGradient
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0 }}
      colors={["#ffad0a", "#6200ff", "#e2a3ff", "#ff99fd"]}
      distortion={0.9}
      swirl={0.55}
      speed={0.28}
      grainMixer={0}
      grainOverlay={0}
    />
  );
}
