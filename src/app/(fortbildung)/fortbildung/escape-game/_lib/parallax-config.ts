/** Per-dimension parallax layer definitions — all shapes are pure CSS divs. */

import type { CSSProperties } from "react";

export type ParallaxElement = {
  key: string;
  style: CSSProperties;
};

export type ParallaxLayerConfig = {
  factor: number;
  elements: ParallaxElement[];
};

export type ParallaxConfig = [
  far: ParallaxLayerConfig,
  mid: ParallaxLayerConfig,
  near: ParallaxLayerConfig,
];

/* ─── helpers ─── */

const el = (
  key: string,
  left: number,
  top: number,
  width: number,
  height: number,
  extra: CSSProperties,
): ParallaxElement => ({
  key,
  style: {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    ...extra,
  },
});

const cloud = (key: string, left: number, top: number, w: number, h: number, color: string, shadow: string): ParallaxElement =>
  el(key, left, top, w, h, {
    borderRadius: "9999px",
    backgroundColor: color,
    boxShadow: `4px 4px 0 ${shadow}`,
    border: "2px solid rgba(0,0,0,0.08)",
  });

const rect = (key: string, left: number, top: number, w: number, h: number, bg: string, extra: CSSProperties = {}): ParallaxElement =>
  el(key, left, top, w, h, { backgroundColor: bg, ...extra });

/* ─── ÜBER — knowledge / books ─── */

const UEBER: ParallaxConfig = [
  {
    factor: 0.15,
    elements: [
      cloud("uc1", 60, 30, 90, 28, "rgba(255,255,255,0.82)", "rgba(30,41,59,0.15)"),
      cloud("uc2", 400, 18, 110, 32, "rgba(255,255,255,0.78)", "rgba(30,41,59,0.12)"),
      cloud("uc3", 800, 40, 80, 24, "rgba(255,255,255,0.80)", "rgba(30,41,59,0.14)"),
      cloud("uc4", 1200, 22, 100, 30, "rgba(255,255,255,0.76)", "rgba(30,41,59,0.13)"),
      cloud("uc5", 1700, 35, 95, 26, "rgba(255,255,255,0.80)", "rgba(30,41,59,0.15)"),
      cloud("uc6", 2200, 15, 85, 28, "rgba(255,255,255,0.78)", "rgba(30,41,59,0.12)"),
      // rolling hills
      rect("uh1", 0, 280, 400, 80, "rgba(134,239,172,0.25)", { borderRadius: "50% 50% 0 0" }),
      rect("uh2", 350, 290, 500, 70, "rgba(134,239,172,0.2)", { borderRadius: "50% 50% 0 0" }),
      rect("uh3", 800, 275, 450, 85, "rgba(134,239,172,0.22)", { borderRadius: "50% 50% 0 0" }),
      rect("uh4", 1200, 285, 400, 75, "rgba(134,239,172,0.2)", { borderRadius: "50% 50% 0 0" }),
      rect("uh5", 1600, 278, 480, 82, "rgba(134,239,172,0.24)", { borderRadius: "50% 50% 0 0" }),
      rect("uh6", 2050, 288, 420, 72, "rgba(134,239,172,0.2)", { borderRadius: "50% 50% 0 0" }),
    ],
  },
  {
    factor: 0.35,
    elements: [
      // book-stack silhouettes
      rect("ub1", 120, 200, 30, 80, "rgba(146,64,14,0.18)", { border: "2px solid rgba(146,64,14,0.12)" }),
      rect("ub2", 145, 220, 26, 60, "rgba(180,83,9,0.16)", { border: "2px solid rgba(180,83,9,0.1)" }),
      rect("ub3", 550, 190, 34, 90, "rgba(146,64,14,0.2)", { border: "2px solid rgba(146,64,14,0.12)" }),
      rect("ub4", 578, 210, 28, 70, "rgba(180,83,9,0.15)", { border: "2px solid rgba(180,83,9,0.1)" }),
      // knowledge towers
      rect("ut1", 900, 160, 22, 120, "rgba(217,119,6,0.18)", { border: "2px solid rgba(217,119,6,0.12)", borderRadius: "4px 4px 0 0" }),
      rect("ut2", 1400, 170, 20, 110, "rgba(217,119,6,0.16)", { border: "2px solid rgba(217,119,6,0.1)", borderRadius: "4px 4px 0 0" }),
      rect("ut3", 2000, 175, 24, 105, "rgba(217,119,6,0.17)", { border: "2px solid rgba(217,119,6,0.11)", borderRadius: "4px 4px 0 0" }),
      rect("ut4", 2500, 165, 22, 115, "rgba(217,119,6,0.18)", { border: "2px solid rgba(217,119,6,0.12)", borderRadius: "4px 4px 0 0" }),
    ],
  },
  {
    factor: 0.6,
    elements: [
      // floating "?" shapes
      rect("uq1", 200, 80, 18, 18, "rgba(245,158,11,0.22)", { borderRadius: "4px", border: "2px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }),
      rect("uq2", 700, 60, 16, 16, "rgba(245,158,11,0.2)", { borderRadius: "4px", border: "2px solid rgba(245,158,11,0.28)" }),
      rect("uq3", 1300, 70, 20, 20, "rgba(245,158,11,0.24)", { borderRadius: "4px", border: "2px solid rgba(245,158,11,0.32)" }),
      rect("uq4", 1900, 55, 16, 16, "rgba(245,158,11,0.2)", { borderRadius: "4px", border: "2px solid rgba(245,158,11,0.28)" }),
      rect("uq5", 2400, 75, 18, 18, "rgba(245,158,11,0.22)", { borderRadius: "4px", border: "2px solid rgba(245,158,11,0.3)" }),
    ],
  },
];

/* ─── DURCH — cyberpunk lab / data ─── */

const DURCH: ParallaxConfig = [
  {
    factor: 0.15,
    elements: [
      // dark cityscape with dot stars
      rect("ds1", 40, 10, 3, 3, "rgba(129,140,248,0.5)", { borderRadius: "50%" }),
      rect("ds2", 180, 20, 2, 2, "rgba(129,140,248,0.4)", { borderRadius: "50%" }),
      rect("ds3", 340, 8, 3, 3, "rgba(129,140,248,0.55)", { borderRadius: "50%" }),
      rect("ds4", 520, 25, 2, 2, "rgba(129,140,248,0.45)", { borderRadius: "50%" }),
      rect("ds5", 700, 12, 3, 3, "rgba(129,140,248,0.5)", { borderRadius: "50%" }),
      rect("ds6", 900, 30, 2, 2, "rgba(129,140,248,0.4)", { borderRadius: "50%" }),
      rect("ds7", 1100, 5, 3, 3, "rgba(129,140,248,0.55)", { borderRadius: "50%" }),
      rect("ds8", 1350, 18, 2, 2, "rgba(129,140,248,0.45)", { borderRadius: "50%" }),
      rect("ds9", 1600, 28, 3, 3, "rgba(129,140,248,0.5)", { borderRadius: "50%" }),
      rect("ds10", 1900, 8, 2, 2, "rgba(129,140,248,0.4)", { borderRadius: "50%" }),
      rect("ds11", 2200, 22, 3, 3, "rgba(129,140,248,0.5)", { borderRadius: "50%" }),
      rect("ds12", 2500, 14, 2, 2, "rgba(129,140,248,0.45)", { borderRadius: "50%" }),
      // dark cityscape buildings
      rect("dc1", 50, 240, 40, 120, "rgba(30,27,75,0.3)", { borderRadius: "2px 2px 0 0" }),
      rect("dc2", 300, 220, 50, 140, "rgba(30,27,75,0.25)", { borderRadius: "2px 2px 0 0" }),
      rect("dc3", 600, 250, 35, 110, "rgba(30,27,75,0.28)", { borderRadius: "2px 2px 0 0" }),
      rect("dc4", 1000, 230, 45, 130, "rgba(30,27,75,0.26)", { borderRadius: "2px 2px 0 0" }),
      rect("dc5", 1500, 245, 38, 115, "rgba(30,27,75,0.3)", { borderRadius: "2px 2px 0 0" }),
      rect("dc6", 2000, 235, 42, 125, "rgba(30,27,75,0.27)", { borderRadius: "2px 2px 0 0" }),
      rect("dc7", 2500, 248, 36, 112, "rgba(30,27,75,0.29)", { borderRadius: "2px 2px 0 0" }),
    ],
  },
  {
    factor: 0.35,
    elements: [
      // data towers with cyan glow
      rect("dt1", 150, 170, 18, 110, "rgba(6,182,212,0.15)", { border: "2px solid rgba(6,182,212,0.25)", borderRadius: "2px 2px 0 0" }),
      rect("dt1g", 155, 185, 8, 3, "rgba(34,211,238,0.6)", { borderRadius: "1px" }),
      rect("dt1g2", 155, 200, 8, 3, "rgba(34,211,238,0.5)", { borderRadius: "1px" }),
      rect("dt2", 600, 160, 20, 120, "rgba(6,182,212,0.17)", { border: "2px solid rgba(6,182,212,0.27)", borderRadius: "2px 2px 0 0" }),
      rect("dt2g", 606, 175, 8, 3, "rgba(34,211,238,0.6)", { borderRadius: "1px" }),
      rect("dt3", 1100, 165, 16, 115, "rgba(6,182,212,0.14)", { border: "2px solid rgba(6,182,212,0.24)", borderRadius: "2px 2px 0 0" }),
      rect("dt3g", 1104, 182, 8, 3, "rgba(34,211,238,0.55)", { borderRadius: "1px" }),
      rect("dt4", 1700, 155, 22, 125, "rgba(6,182,212,0.16)", { border: "2px solid rgba(6,182,212,0.26)", borderRadius: "2px 2px 0 0" }),
      rect("dt5", 2300, 170, 18, 110, "rgba(6,182,212,0.15)", { border: "2px solid rgba(6,182,212,0.25)", borderRadius: "2px 2px 0 0" }),
      // circuit lines
      rect("dl1", 250, 250, 120, 2, "rgba(129,140,248,0.2)"),
      rect("dl2", 800, 240, 100, 2, "rgba(129,140,248,0.18)"),
      rect("dl3", 1400, 255, 140, 2, "rgba(129,140,248,0.22)"),
      rect("dl4", 2100, 245, 110, 2, "rgba(129,140,248,0.19)"),
    ],
  },
  {
    factor: 0.6,
    elements: [
      // terminal screen shapes
      rect("dts1", 180, 80, 28, 22, "rgba(6,182,212,0.12)", { border: "2px solid rgba(6,182,212,0.25)", borderRadius: "3px" }),
      rect("dts2", 750, 65, 24, 18, "rgba(6,182,212,0.1)", { border: "2px solid rgba(6,182,212,0.22)", borderRadius: "3px" }),
      rect("dts3", 1350, 75, 30, 24, "rgba(6,182,212,0.13)", { border: "2px solid rgba(6,182,212,0.28)", borderRadius: "3px" }),
      rect("dts4", 2000, 60, 26, 20, "rgba(6,182,212,0.11)", { border: "2px solid rgba(6,182,212,0.24)", borderRadius: "3px" }),
      rect("dts5", 2600, 72, 28, 22, "rgba(6,182,212,0.12)", { border: "2px solid rgba(6,182,212,0.25)", borderRadius: "3px" }),
    ],
  },
];

/* ─── MIT — warm islands / cooperation ─── */

const MIT: ParallaxConfig = [
  {
    factor: 0.15,
    elements: [
      // island mounds on warm horizon
      rect("mi1", 80, 260, 200, 100, "rgba(253,186,116,0.2)", { borderRadius: "50% 50% 0 0" }),
      rect("mi2", 400, 270, 250, 90, "rgba(253,186,116,0.18)", { borderRadius: "50% 50% 0 0" }),
      rect("mi3", 800, 265, 180, 95, "rgba(253,186,116,0.22)", { borderRadius: "50% 50% 0 0" }),
      rect("mi4", 1200, 272, 220, 88, "rgba(253,186,116,0.19)", { borderRadius: "50% 50% 0 0" }),
      rect("mi5", 1650, 258, 200, 102, "rgba(253,186,116,0.21)", { borderRadius: "50% 50% 0 0" }),
      rect("mi6", 2100, 268, 240, 92, "rgba(253,186,116,0.18)", { borderRadius: "50% 50% 0 0" }),
      rect("mi7", 2600, 262, 190, 98, "rgba(253,186,116,0.2)", { borderRadius: "50% 50% 0 0" }),
      // warm clouds
      cloud("mc1", 100, 25, 80, 24, "rgba(255,247,237,0.82)", "rgba(127,29,29,0.15)"),
      cloud("mc2", 550, 15, 100, 28, "rgba(255,247,237,0.78)", "rgba(127,29,29,0.12)"),
      cloud("mc3", 1050, 32, 90, 26, "rgba(255,247,237,0.8)", "rgba(127,29,29,0.14)"),
      cloud("mc4", 1600, 20, 85, 22, "rgba(255,247,237,0.76)", "rgba(127,29,29,0.13)"),
      cloud("mc5", 2200, 28, 95, 25, "rgba(255,247,237,0.8)", "rgba(127,29,29,0.14)"),
    ],
  },
  {
    factor: 0.35,
    elements: [
      // bridge arches
      rect("mb1", 200, 210, 80, 6, "rgba(146,64,14,0.2)", { borderRadius: "40px 40px 0 0", borderTop: "3px solid rgba(146,64,14,0.15)" }),
      rect("mb2", 700, 220, 90, 6, "rgba(146,64,14,0.18)", { borderRadius: "40px 40px 0 0", borderTop: "3px solid rgba(146,64,14,0.13)" }),
      rect("mb3", 1300, 215, 85, 6, "rgba(146,64,14,0.2)", { borderRadius: "40px 40px 0 0", borderTop: "3px solid rgba(146,64,14,0.15)" }),
      rect("mb4", 1900, 225, 75, 6, "rgba(146,64,14,0.17)", { borderRadius: "40px 40px 0 0", borderTop: "3px solid rgba(146,64,14,0.12)" }),
      rect("mb5", 2500, 218, 80, 6, "rgba(146,64,14,0.19)", { borderRadius: "40px 40px 0 0", borderTop: "3px solid rgba(146,64,14,0.14)" }),
      // palm-tree shapes (trunk + canopy)
      rect("mp1t", 350, 200, 6, 40, "rgba(101,67,33,0.22)"),
      rect("mp1c", 336, 185, 34, 18, "rgba(34,197,94,0.2)", { borderRadius: "50%" }),
      rect("mp2t", 1050, 195, 6, 45, "rgba(101,67,33,0.2)"),
      rect("mp2c", 1036, 178, 36, 20, "rgba(34,197,94,0.18)", { borderRadius: "50%" }),
      rect("mp3t", 1700, 205, 6, 35, "rgba(101,67,33,0.22)"),
      rect("mp3c", 1686, 192, 34, 16, "rgba(34,197,94,0.2)", { borderRadius: "50%" }),
      rect("mp4t", 2300, 198, 6, 42, "rgba(101,67,33,0.21)"),
      rect("mp4c", 2286, 182, 34, 18, "rgba(34,197,94,0.19)", { borderRadius: "50%" }),
    ],
  },
  {
    factor: 0.6,
    elements: [
      // speech-bubble shapes
      rect("ms1", 250, 70, 26, 20, "rgba(244,114,182,0.15)", { borderRadius: "10px 10px 10px 2px", border: "2px solid rgba(244,114,182,0.25)" }),
      rect("ms2", 800, 55, 22, 16, "rgba(244,114,182,0.12)", { borderRadius: "10px 10px 10px 2px", border: "2px solid rgba(244,114,182,0.22)" }),
      rect("ms3", 1400, 65, 28, 22, "rgba(244,114,182,0.16)", { borderRadius: "10px 10px 10px 2px", border: "2px solid rgba(244,114,182,0.28)" }),
      rect("ms4", 2000, 50, 24, 18, "rgba(244,114,182,0.13)", { borderRadius: "10px 10px 10px 2px", border: "2px solid rgba(244,114,182,0.24)" }),
      rect("ms5", 2600, 72, 26, 20, "rgba(244,114,182,0.15)", { borderRadius: "10px 10px 10px 2px", border: "2px solid rgba(244,114,182,0.26)" }),
    ],
  },
];

/* ─── TROTZ — fortress / resilience (vorübergehend deaktiviert) ─── */

// const TROTZ: ParallaxConfig = [
//   {
//     factor: 0.15,
//     elements: [
//       // fortress wall crenellations
//       rect("tw1", 0, 250, 120, 8, "rgba(127,29,29,0.18)"),
//       rect("tw1a", 0, 242, 20, 8, "rgba(127,29,29,0.18)"),
//       rect("tw1b", 40, 242, 20, 8, "rgba(127,29,29,0.18)"),
//       rect("tw1c", 80, 242, 20, 8, "rgba(127,29,29,0.18)"),
//       rect("tw2", 300, 255, 130, 8, "rgba(127,29,29,0.16)"),
//       rect("tw2a", 300, 247, 22, 8, "rgba(127,29,29,0.16)"),
//       rect("tw2b", 344, 247, 22, 8, "rgba(127,29,29,0.16)"),
//       rect("tw2c", 388, 247, 22, 8, "rgba(127,29,29,0.16)"),
//       rect("tw3", 650, 248, 110, 8, "rgba(127,29,29,0.18)"),
//       rect("tw3a", 650, 240, 18, 8, "rgba(127,29,29,0.18)"),
//       rect("tw3b", 688, 240, 18, 8, "rgba(127,29,29,0.18)"),
//       rect("tw3c", 726, 240, 18, 8, "rgba(127,29,29,0.18)"),
//       rect("tw4", 1000, 252, 120, 8, "rgba(127,29,29,0.17)"),
//       rect("tw4a", 1000, 244, 20, 8, "rgba(127,29,29,0.17)"),
//       rect("tw4b", 1040, 244, 20, 8, "rgba(127,29,29,0.17)"),
//       rect("tw4c", 1080, 244, 20, 8, "rgba(127,29,29,0.17)"),
//       rect("tw5", 1400, 250, 115, 8, "rgba(127,29,29,0.18)"),
//       rect("tw6", 1800, 254, 125, 8, "rgba(127,29,29,0.16)"),
//       rect("tw7", 2200, 249, 110, 8, "rgba(127,29,29,0.18)"),
//       // pink clouds
//       cloud("tc1", 150, 20, 80, 24, "rgba(255,241,242,0.78)", "rgba(136,19,55,0.18)"),
//       cloud("tc2", 600, 30, 95, 28, "rgba(255,241,242,0.82)", "rgba(136,19,55,0.2)"),
//       cloud("tc3", 1100, 18, 85, 22, "rgba(255,241,242,0.76)", "rgba(136,19,55,0.16)"),
//       cloud("tc4", 1650, 25, 90, 26, "rgba(255,241,242,0.8)", "rgba(136,19,55,0.18)"),
//       cloud("tc5", 2400, 32, 80, 24, "rgba(255,241,242,0.78)", "rgba(136,19,55,0.17)"),
//     ],
//   },
//   {
//     factor: 0.35,
//     elements: [
//       // shield shapes
//       rect("tsh1", 200, 180, 22, 28, "rgba(248,113,113,0.15)", { borderRadius: "4px 4px 50% 50%", border: "2px solid rgba(248,113,113,0.22)" }),
//       rect("tsh2", 750, 190, 20, 26, "rgba(248,113,113,0.13)", { borderRadius: "4px 4px 50% 50%", border: "2px solid rgba(248,113,113,0.2)" }),
//       rect("tsh3", 1350, 175, 24, 30, "rgba(248,113,113,0.16)", { borderRadius: "4px 4px 50% 50%", border: "2px solid rgba(248,113,113,0.24)" }),
//       rect("tsh4", 2000, 185, 22, 28, "rgba(248,113,113,0.14)", { borderRadius: "4px 4px 50% 50%", border: "2px solid rgba(248,113,113,0.21)" }),
//       // clock faces
//       rect("tcl1", 450, 170, 20, 20, "rgba(254,226,226,0.3)", { borderRadius: "50%", border: "2px solid rgba(248,113,113,0.2)" }),
//       rect("tcl2", 1100, 185, 18, 18, "rgba(254,226,226,0.28)", { borderRadius: "50%", border: "2px solid rgba(248,113,113,0.18)" }),
//       rect("tcl3", 1800, 172, 22, 22, "rgba(254,226,226,0.32)", { borderRadius: "50%", border: "2px solid rgba(248,113,113,0.22)" }),
//       rect("tcl4", 2500, 180, 20, 20, "rgba(254,226,226,0.3)", { borderRadius: "50%", border: "2px solid rgba(248,113,113,0.2)" }),
//     ],
//   },
//   {
//     factor: 0.6,
//     elements: [
//       // book shapes
//       rect("tbk1", 300, 65, 18, 24, "rgba(248,113,113,0.12)", { border: "2px solid rgba(248,113,113,0.2)", borderRadius: "2px" }),
//       rect("tbk2", 900, 55, 16, 22, "rgba(248,113,113,0.1)", { border: "2px solid rgba(248,113,113,0.18)", borderRadius: "2px" }),
//       rect("tbk3", 1500, 70, 20, 26, "rgba(248,113,113,0.14)", { border: "2px solid rgba(248,113,113,0.22)", borderRadius: "2px" }),
//       rect("tbk4", 2100, 58, 18, 24, "rgba(248,113,113,0.12)", { border: "2px solid rgba(248,113,113,0.2)", borderRadius: "2px" }),
//       // pencil shapes
//       rect("tpc1", 550, 72, 4, 22, "rgba(217,119,6,0.2)", { borderRadius: "1px" }),
//       rect("tpc2", 1200, 62, 4, 20, "rgba(217,119,6,0.18)", { borderRadius: "1px" }),
//       rect("tpc3", 1850, 68, 4, 24, "rgba(217,119,6,0.22)", { borderRadius: "1px" }),
//       rect("tpc4", 2450, 60, 4, 20, "rgba(217,119,6,0.2)", { borderRadius: "1px" }),
//     ],
//   },
// ];

export const PARALLAX_CONFIGS: Record<string, ParallaxConfig> = {
  ueber: UEBER,
  durch: DURCH,
  mit: MIT,
  // trotz: TROTZ,
};
