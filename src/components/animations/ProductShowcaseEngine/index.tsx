'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProductShowcaseAnimation from '@/components/animations/ProductShowcaseAnimation';

export default function ProductShowcaseEngine() {
  return (
    <div className="relative w-full py-20">
      {/* Technischer Hintergrund */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Engine Container */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Obere Engine-Sektion */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mb-24"
        >
          {/* Zentrale Engine-Struktur */}
          <div className="relative mx-auto w-full max-w-4xl h-40">
            {/* Haupt-Kreis mit technischen Details */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Äußerer Ring */}
                <div className="w-32 h-32 border border-blue-400/40 rounded-full relative">
                  {/* Innerer Ring */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-blue-400/30 rounded-full" />
                  
                  {/* Zentrale Komponente */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-400/10 border border-blue-400/50 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-blue-400/30 rounded-full" />
                  </div>
                </div>

                {/* Radiale Verbindungslinien */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-40 h-px origin-left"
                    style={{
                      transform: `rotate(${i * 60}deg) translateX(16px)`
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-blue-400/60 via-blue-400/30 to-transparent" />
                  </motion.div>
                ))}

                {/* Konzentrische Kreise */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 border border-blue-400/20 rounded-full"
                    style={{
                      width: `${64 + (i + 1) * 24}px`,
                      height: `${64 + (i + 1) * 24}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
                  />
                ))}
              </div>
            </div>

            {/* Seitliche technische Komponenten */}
            <div className="absolute top-8 left-8 w-16 h-16">
              <motion.div
                className="w-full h-full border border-blue-400/40 rounded-full relative"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                {/* Ventilator-Blätter */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-4 bg-blue-400/50 rounded-full origin-bottom"
                    style={{
                      transform: `rotate(${i * 90}deg) translateY(-8px)`
                    }}
                  />
                ))}
              </motion.div>
            </div>

            <div className="absolute top-8 right-8 w-12 h-12">
              <motion.div
                className="w-full h-full border border-blue-400/30 rounded-lg transform rotate-45"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
            </div>

            {/* Verbindungslinien nach unten */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-12"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-blue-400/40 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Zentrale Produkt-Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative z-10 mb-24"
        >
          <ProductShowcaseAnimation />
        </motion.div>

        {/* Untere Engine-Sektion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="relative"
        >
          {/* Horizontale Engine-Struktur */}
          <div className="relative mx-auto w-full max-w-4xl h-32">
            {/* Haupt-Rohrleitung */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-6">
              <div className="w-full h-full border border-blue-400/30 rounded-full relative">
                {/* Innere Komponenten */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-3 bg-blue-400/10 rounded-full" />
                
                {/* Kreisförmige Knoten */}
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 w-4 h-4 border border-blue-400/40 rounded-full bg-blue-400/20"
                    style={{
                      left: `${15 + i * 12}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                  />
                ))}

                {/* Verbindungslinien */}
                <motion.div
                  className="absolute top-1/2 left-0 w-full h-px"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                </motion.div>
              </div>
            </div>

            {/* Vertikale Verbindungen */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 w-px h-16 bg-gradient-to-b from-blue-400/30 to-transparent"
                style={{
                  left: `${20 + i * 20}%`
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 1.8 + i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Zentrale vertikale Verbindungslinie */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-px"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <div className="w-full h-full bg-gradient-to-b from-blue-400/20 via-blue-400/30 to-blue-400/20" />
        </motion.div>

        {/* Technische Beschriftungen - Oben */}
        <motion.div
          className="absolute top-8 left-8 text-blue-400/80 text-xs font-mono space-y-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div>ENGINE_STATUS: ACTIVE</div>
          <div>POWER_LEVEL: 87%</div>
          <div>SYNC_FREQ: 2.4GHz</div>
        </motion.div>

        <motion.div
          className="absolute top-8 right-8 text-blue-400/80 text-xs font-mono text-right space-y-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div>DEEP_DIVE_KI v2.1</div>
          <div>NEURAL_CORE: ONLINE</div>
          <div>QUANTUM_SYNC: STABLE</div>
        </motion.div>

        {/* Technische Beschriftungen - Unten */}
        <motion.div
          className="absolute bottom-8 left-8 text-blue-400/60 text-xs font-mono space-y-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div>COOLING_SYS: OPTIMAL</div>
          <div>PRESSURE: 2.1 bar</div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-8 text-blue-400/60 text-xs font-mono text-right space-y-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div>FLOW_RATE: 45 L/min</div>
          <div>TEMP: 23°C</div>
        </motion.div>
      </div>
    </div>
  );
}
