"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, Icosahedron } from "@react-three/drei";

import TilesGrid from "@/components/TilesGrid";

/**
 * Exploded, isometric, technical wireframe with a glowing orange icosahedron core.
 * Arty approximation – no real-world precision required.
 *
 * How to use:
 * - This file exports a default React component. Drop it into any React app.
 * - All dependencies are available in the ChatGPT canvas preview and most online sandboxes.
 * - Styling uses tailwind utility classes, but it's optional; inline styles handle the grid bg.
 */

const PURPLE = "#8646F4"; // Website primary purple
const PURPLE_LIGHT = "#A78BFA"; // Website light purple
const PURPLE_DARK = "#6D28D9"; // Website dark purple
const ORANGE = "#ff8a00"; // Keep orange for core

function Wiggle({ children, amplitude = 0.1, speed = 0.6, offset = 0, ...props }: any) {
  const ref = useRef<any>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (ref.current) {
      ref.current.position.y = (props.position?.[1] ?? 0) + Math.sin(t) * amplitude;
      ref.current.rotation.y = 0.1 * Math.sin(t * 0.7);
    }
  });
  return <group ref={ref} {...props}>{children}</group>;
}

function Wire(
  { children, ...props }: { children: React.ReactNode } & React.ComponentProps<"mesh">
) {
  return (
    <mesh {...props}>
      {children}
      <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.95} />
    </mesh>
  );
}

function TopCap() {
  return (
    <group>
      {/* Main cylindrical body with wider base as described */}
      <Wire>
        <cylinderGeometry args={[1.2, 1.35, 1.1, 48, 1, true]} />
      </Wire>
      
      {/* Multiple circumferential rings for body banding */}
      <Wire>
        <torusGeometry args={[1.15, 0.08, 8, 64]} />
      </Wire>
      <Wire>
        <torusGeometry args={[1.25, 0.06, 6, 64]} />
      </Wire>
      <Wire>
        <torusGeometry args={[1.3, 0.05, 4, 64]} />
      </Wire>
      
      {/* Turbine/fan at the very top with 12 radial fins as described */}
      <group position={[0, 0.55, 0]}>
        <Wire>
          <cylinderGeometry args={[0.8, 0.8, 0.08, 48]} />
        </Wire>
        <Wire>
          <cylinderGeometry args={[0.3, 0.3, 0.08, 48]} />
        </Wire>
        {Array.from({ length: 12 }).map((_, i) => (
          <Wire
            key={i}
            rotation={[0, (i / 12) * Math.PI * 2, 0]}
            position={[
              Math.cos((i / 12) * Math.PI * 2) * 0.3,
              0.06,
              Math.sin((i / 12) * Math.PI * 2) * 0.3,
            ]}
          >
            <boxGeometry args={[0.05, 0.02, 0.5]} />
          </Wire>
        ))}
      </group>
      
      {/* Hexagonal lock/bolt on the side as described */}
      <group position={[1.25, 0, 0]}>
        <Wire>
          <cylinderGeometry args={[0.18, 0.18, 0.18, 6]} />
        </Wire>
        <Wire position={[0, 0, 0]}>
          <torusGeometry args={[0.18, 0.04, 6, 18]} />
        </Wire>
      </group>
    </group>
  );
}

function AdapterRing() {
  return (
    <group>
      {/* Flat circular ring as described */}
      <Wire>
        <torusGeometry args={[1.05, 0.08, 8, 64]} />
      </Wire>
      <Wire>
        <torusGeometry args={[0.95, 0.06, 6, 64]} />
      </Wire>
      
      {/* 4 small square feet/protrusions as described */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Wire
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 1.1,
            -0.12,
            Math.sin((i / 4) * Math.PI * 2) * 1.1,
          ]}
        >
          <boxGeometry args={[0.24, 0.18, 0.24]} />
        </Wire>
      ))}
    </group>
  );
}

function DiskArray() {
  return (
    <group>
      {/* Thicker disk as described */}
      <Wire>
        <cylinderGeometry args={[1.15, 1.15, 0.15, 64]} />
      </Wire>
      <Wire>
        <cylinderGeometry args={[1.2, 1.2, 0.12, 64]} />
      </Wire>
      <Wire>
        <cylinderGeometry args={[1.25, 1.25, 0.08, 64]} />
      </Wire>
      
      {/* Prominent center ring as described */}
      <Wire>
        <torusGeometry args={[0.35, 0.06, 8, 48]} />
      </Wire>
      
      {/* Circular indentations/holes in concentric rings as described */}
      {/* Outer ring: more numerous, smaller holes */}
      {Array.from({ length: 24 }).map((_, i) => (
        <Wire
          key={`outer-${i}`}
          rotation={[0, (i / 24) * Math.PI * 2, 0]}
          position={[
            Math.cos((i / 24) * Math.PI * 2) * 0.75,
            0.08,
            Math.sin((i / 24) * Math.PI * 2) * 0.75,
          ]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
        </Wire>
      ))}
      
      {/* Inner ring: fewer, larger holes */}
      {Array.from({ length: 16 }).map((_, i) => (
        <Wire
          key={`inner-${i}`}
          rotation={[0, (i / 16) * Math.PI * 2, 0]}
          position={[
            Math.cos((i / 16) * Math.PI * 2) * 0.5,
            0.08,
            Math.sin((i / 16) * Math.PI * 2) * 0.5,
          ]}
        >
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        </Wire>
      ))}
    </group>
  );
}

function MidSectionHousing() {
  return (
    <group>
      {/* Wider cylindrical structure as described */}
      <Wire>
        <cylinderGeometry args={[1.3, 1.4, 0.8, 48]} />
      </Wire>
      <Wire>
        <cylinderGeometry args={[1.35, 1.45, 0.6, 48]} />
      </Wire>
      <Wire>
        <cylinderGeometry args={[1.4, 1.5, 0.4, 48]} />
      </Wire>
      
      {/* Internal fan/turbine mechanism */}
      <group position={[0, 0, 0]}>
        <Wire>
          <cylinderGeometry args={[0.8, 0.8, 0.3, 48]} />
        </Wire>
        <Wire>
          <cylinderGeometry args={[0.6, 0.6, 0.25, 48]} />
        </Wire>
        
        {/* Internal turbine blades */}
        {Array.from({ length: 16 }).map((_, i) => (
          <Wire
            key={i}
            rotation={[0, (i / 16) * Math.PI * 2, 0]}
            position={[
              Math.cos((i / 16) * Math.PI * 2) * 0.6,
              0.02,
              Math.sin((i / 16) * Math.PI * 2) * 0.6,
            ]}
          >
            <boxGeometry args={[0.05, 0.02, 0.4]} />
          </Wire>
        ))}
      </group>
      
      {/* Four rectangular mounting blocks as described */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Wire
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 1.2,
            0,
            Math.sin((i / 4) * Math.PI * 2) * 1.2,
          ]}
        >
          <boxGeometry args={[0.3, 0.2, 0.3]} />
        </Wire>
      ))}
    </group>
  );
}

function BaseUnit() {
  return (
    <group>
      {/* Main cylindrical base with wider base as described */}
      <Wire>
        <cylinderGeometry args={[1.4, 1.5, 1.2, 48, 1, true]} />
      </Wire>
      <Wire>
        <cylinderGeometry args={[1.45, 1.55, 1.0, 48, 1, true]} />
      </Wire>
      <Wire>
        <cylinderGeometry args={[1.5, 1.6, 0.8, 48, 1, true]} />
      </Wire>
      
      {/* Vertical ribbed/grooved pattern for heat dissipation as described */}
      {Array.from({ length: 16 }).map((_, i) => (
        <Wire
          key={i}
          rotation={[0, (i / 16) * Math.PI * 2, 0]}
          position={[
            Math.cos((i / 16) * Math.PI * 2) * 1.15,
            0,
            Math.sin((i / 16) * Math.PI * 2) * 1.15,
          ]}
        >
          <boxGeometry args={[0.06, 1.1, 0.06]} />
        </Wire>
      ))}
      
      {/* Horizontal ribbing for structural reinforcement */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Wire key={i} position={[0, -0.5 + i * 0.2, 0]}>
          <torusGeometry args={[1.4 + i * 0.05, 0.03, 4, 48]} />
        </Wire>
      ))}
      
      {/* Inner rotor with enhanced radial elements */}
      <group position={[0, 0.2, 0]}>
        <Wire>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 48]} />
        </Wire>
        <Wire>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 48]} />
        </Wire>
        
        {/* Enhanced radial elements as described */}
        {Array.from({ length: 18 }).map((_, i) => (
          <Wire
            key={i}
            rotation={[0, (i / 18) * Math.PI * 2, 0]}
            position={[
              Math.cos((i / 18) * Math.PI * 2) * 0.3,
              0.06,
              Math.sin((i / 18) * Math.PI * 2) * 0.3,
            ]}
          >
            <boxGeometry args={[0.05, 0.02, 0.45]} />
          </Wire>
        ))}
        
        {/* Additional rotor detail rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Wire key={i} position={[0, 0, 0]}>
            <torusGeometry args={[0.3 + (i + 1) * 0.2, 0.02, 4, 48]} />
          </Wire>
        ))}
      </group>
    </group>
  );
}

function Core() {
  const ref = useRef<any>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = t * 0.3;
  });
  return (
    <group ref={ref}>
      {/* Main geodesic icosahedron core */}
      <Icosahedron args={[0.7, 1]}>
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={2.2} metalness={0.4} roughness={0.3} wireframe={false} />
      </Icosahedron>
      
      {/* Wire overlay for triangular mesh effect */}
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color={ORANGE} wireframe transparent opacity={0.8} />
      </mesh>
      
      {/* Additional wireframe layers for depth */}
      <mesh>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshBasicMaterial color={ORANGE} wireframe transparent opacity={0.4} />
      </mesh>
      
      {/* Small tether beads around the core */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[
          Math.cos((i / 12) * Math.PI * 2) * 0.85,
          Math.sin((i / 12) * Math.PI * 2) * 0.85 * 0.4,
          0
        ]}>
          <sphereGeometry args={[0.03, 8, 6]} />
          <meshBasicMaterial color={ORANGE} />
        </mesh>
      ))}
    </group>
  );
}

function RotatingCamera() {
  const cameraRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    if (cameraRef.current) {
      const t = clock.getElapsedTime();
      // Horizontal rotation around the Y-axis
      const radius = 8;
      const speed = 0.3;
      cameraRef.current.position.x = Math.cos(t * speed) * radius;
      cameraRef.current.position.z = Math.sin(t * speed) * radius;
      cameraRef.current.position.y = 8;
      
      // Keep camera looking at the center
      cameraRef.current.lookAt(0, 0, 0);
    }
  });
  
  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      zoom={65}
      position={[8, 8, 8]}
    />
  );
}

function ExplodedStack() {
  // Vertical spacing per layer (base layout), animated explosion factor handled in useFrame
  const baseY = useMemo(() => ({
    top: 3.5, // Reduziert von 4.5 auf 3.5
    core: 2.0, // Reduziert von 2.8 auf 2.0
    disk: 0.8, // Reduziert von 1.3 auf 0.8
    arm: -0.5, // Reduziert von 0 auf -0.5
    base: -3.0, // Reduziert von -2.5 auf -3.0
  }), []);

  const g = useRef<any>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const explode = 0.5 + 0.10 * Math.sin(t * 0.6); // Dampen vertical excursion
    if (!g.current) return;
    const setY = (name: string, y: number) => {
      const obj = g.current.getObjectByName(name);
      if (obj) obj.position.y = y * (0.7 + explode);
    };
    setY("top", baseY.top);
    setY("core", baseY.core);
    setY("disk", baseY.disk);
    setY("arm", baseY.arm);
    setY("base", baseY.base);
  });

  return (
    <group ref={g} position={[0, -0.4, 0]}>
      <group name="top"><Wiggle amplitude={0.05}><TopCap /></Wiggle></group>
      <group name="core"><Wiggle amplitude={0.07} offset={0.3}><Core /></Wiggle></group>
      <group name="disk"><Wiggle amplitude={0.03} offset={0.6}><DiskArray /></Wiggle></group>
      <group name="arm"><Wiggle amplitude={0.05} offset={0.9}><MidSectionHousing /></Wiggle></group>
      <group name="base"><Wiggle amplitude={0.04} offset={1.2}><BaseUnit /></Wiggle></group>
    </group>
  );
}

export default function ExplodedIsometric() {
           const [showDeepChat, setShowDeepChat] = useState(false);
         const [showKISchulburo, setShowKISchulburo] = useState(false);
         const [showFortbildungen, setShowFortbildungen] = useState(false);
         const [showWebsites, setShowWebsites] = useState(false);
         const ctaRef = useRef<HTMLAnchorElement>(null);

           // Neue Konstanten für Kachel-Layout - noch weiter nach oben
         const TILE_WIDTH = 380; // Einheitliche Breite der Kacheln in px
         const TILE_HEIGHT = 250; // Einheitliche Mindesthöhe der Kacheln in px
         const VERTICAL_TILE_GAP = 110; // größerer vertikaler Abstand zwischen oberer und unterer Kachelreihe
         const START_TOP_OFFSET = 0; // Start etwas unterhalb der Button-Unterkante
         const MOBILE_TOP_OFFSET = 1200; // Mobile: Kacheln weit unter der Animation
         const MOBILE_TILE_WIDTH = 'calc(100vw - 2rem)'; // Mobile: Breite mit minimalem Rand
         const [isMobile, setIsMobile] = useState(false);
  
           // Kachel-Styling mit subtiler Gitter-Optik
         const tileStyles = {
           background: "bg-gradient-to-br from-gray-900/98 to-gray-800/98",
           border: "border border-purple-500/20",
           shadow: "shadow-lg",
           gridPattern: "bg-[url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 20 0 L 0 0 0 20\" fill=\"none\" stroke=\"%23ffffff\" stroke-width=\"0.5\" opacity=\"0.03\"%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect width=\"100%25\" height=\"100%25\" fill=\"url(%23grid)\"%2F%3E%3C%2Fsvg%3E')]"
         };

                    useEffect(() => {
           // Mobile Detection
           const checkMobile = () => {
             setIsMobile(window.innerWidth < 768);
           };
           
           // Initial check
           checkMobile();
           
           // Add resize listener
           window.addEventListener('resize', checkMobile);
           
           // Cleanup
           return () => window.removeEventListener('resize', checkMobile);
         }, []);
         
         // Kacheln werden immer angezeigt - keine Scroll-Animation mehr
         useEffect(() => {
           // Alle Kacheln sofort anzeigen
           setShowDeepChat(true);
           setShowKISchulburo(true);
           setShowFortbildungen(true);
           setShowWebsites(true);
         }, []);

                    // Keine komplexe Scroll-Logik mehr - Kacheln bleiben an festen, optimalen Positionen

              return (
          <div className="w-full relative overflow-visible" data-ai-engine-section>
            {/* Title overlay */}
            <div className="absolute top-20 left-4 text-primary-dark text-xs tracking-widest uppercase"></div>

            {/* Canvas + Desktop HUD wrapper */}
            <div className="relative w-full h-[75vh] md:h-[80vh] overflow-visible" style={{ touchAction: isMobile ? 'pan-y' : 'none' }}>
            <Canvas
              dpr={isMobile ? 1 : [1, 2]}
              gl={{ antialias: true }}
              style={{ touchAction: isMobile ? 'pan-y' : 'none', pointerEvents: isMobile ? 'auto' : 'none' }}
            >
              {/* subtle lighting for emissive core */}
              <ambientLight intensity={0.3} />
              <pointLight position={[4, 6, 8]} intensity={0.4} />

              <ExplodedStack />
              {/* Rotating camera for horizontal movement */}
              <RotatingCamera />
              {/* Keine OrbitControls mehr - keine Scroll-Interaktionen */}
            </Canvas>

            {/* Desktop HUD (hidden on mobile) */}
            <div className="hidden md:block">
              {/* DeepChat Window - appears on scroll */}
              <div 
                className={`absolute md:-right-20 right-2 z-10 transition-all duration-500 ease-out ${
                  showDeepChat 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-full'
                }`}
                style={{ 
                  top: START_TOP_OFFSET,
                  width: `${TILE_WIDTH}px`,
                  minHeight: `${TILE_HEIGHT}px`,
                  transform: 'none'
                }}
              >
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-gradient-to-r from-purple-300 to-transparent opacity-40"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-300 rounded-full"></div>
                <div className="rounded-xl p-6 shadow-sm max-w-sm relative bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full mr-3"></div>
                    <span className="text-primary-dark font-bold text-sm tracking-wider">KI-Chat</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-text-primary">DeepChat</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">Der intelligente und datenschutzkonforme Chatbot für Lehrkräfte und Schüler. Optimiert für Bildungszwecke und Lernunterstützung</p>
                  <div className="text-center">
                    <a ref={ctaRef} href="/software/ddki-toolbox" className="inline-block bg-primary-darker text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all duration-300">Mehr erfahren</a>
                  </div>
                </div>
              </div>

              {/* KI-Schulbüro Window - appears on scroll */}
              <div 
                className={`absolute md:-left-20 left-2 z-10 transition-all duration-500 ease-out ${
                  showKISchulburo 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-full'
                }`}
                style={{ 
                  top: START_TOP_OFFSET,
                  width: `${TILE_WIDTH}px`,
                  minHeight: `${TILE_HEIGHT}px`,
                  transform: 'none'
                }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-gradient-to-l from-purple-300 to-transparent opacity-40"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-300 rounded-full"></div>
                <div className="rounded-xl p-6 shadow-sm max-w-sm relative bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full mr-3"></div>
                    <span className="text-primary-dark font-bold text-sm tracking-wider">Schulbüro 3.0</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-text-primary">KI-Schulbüro</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">Das intelligente Verwaltungsbüro für Schulen. Automatisierte Prozesse, Dokumentenverwaltung und effiziente Kommunikation</p>
                  <div className="text-center">
                    <a ref={ctaRef} href="/software/chatbot-fuer-ihre-schule" className="inline-block bg-primary-darker text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all duration-300">Mehr erfahren</a>
                  </div>
                </div>
              </div>

              {/* Fortbildungen Window - appears on scroll */}
              <div
                className={`absolute md:-right-20 right-2 z-10 transition-all duration-500 ease-out ${
                  showFortbildungen 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-full'
                }`}
                style={{ 
                  top: START_TOP_OFFSET + TILE_HEIGHT + VERTICAL_TILE_GAP,
                  width: `${TILE_WIDTH}px`,
                  minHeight: `${TILE_HEIGHT}px`,
                  transform: 'none'
                }}
              >
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-gradient-to-r from-purple-300 to-transparent opacity-40"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-300 rounded-full"></div>
                <div className="rounded-xl p-6 shadow-sm max-w-sm relative bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full mr-3"></div>
                    <span className="text-primary-dark font-bold text-sm tracking-wider">Workshops</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-text-primary">Fortbildungen für Lehrkräfte</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">Professionelle Weiterbildung im Bereich KI für Pädagogen. Modulare Kurse, praktische Anwendungen und zertifizierte Abschlüsse.</p>
                  <div className="text-center">
                    <a ref={ctaRef} href="/fortbildung/fortbildungen" className="inline-block bg-primary-darker text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all duration-300">Mehr erfahren</a>
                  </div>
                </div>
              </div>

              {/* Websites für Schulen Window - appears on scroll */}
              <div 
                className={`absolute md:-left-20 left-2 z-10 transition-all duration-500 ease-out ${
                  showWebsites 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-full'
                }`}
                style={{ 
                  top: START_TOP_OFFSET + TILE_HEIGHT + VERTICAL_TILE_GAP,
                  width: `${TILE_WIDTH}px`,
                  minHeight: `${TILE_HEIGHT}px`,
                  transform: 'none'
                }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-gradient-to-l from-purple-300 to-transparent opacity-40"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-300 rounded-full"></div>
                <div className="rounded-xl p-6 shadow-sm max-w-sm relative bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full mr-3"></div>
                    <span className="text-primary-dark font-bold text-sm tracking-wider">Online Auftritt</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-text-primary">Websites für Schulen</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">Professionelle Schulwebsites mit modernem Design und benutzerfreundlicher Bedienung. Responsive Layouts und Content-Management-Systeme.</p>
                  <div className="text-center">
                    <a ref={ctaRef} href="/software/websites" className="inline-block bg-primary-darker text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all duration-300">Mehr erfahren</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Tiles under Canvas */}
          <div className="block md:hidden px-4 py-2 mt-0">
            <TilesGrid />
          </div>
        </div>
      );
}
