'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 'deepchat',
    title: 'DeepChat',
    subtitle: 'KI-gestützte Kommunikation',
    description: 'Intelligente Chat-Lösungen für Schulen und Bildungseinrichtungen',
    icon: '/images/features/icon-01.svg',
    color: '#8646F4',
    features: [
      'Natürliche Sprachverarbeitung',
      '24/7 Verfügbarkeit',
      'Mehrsprachige Unterstützung',
      'Integration in bestehende Systeme'
    ]
  },
  {
    id: 'kischulbuero',
    title: 'KI-Schulbüro',
    subtitle: 'Automatisierte Verwaltung',
    description: 'Effiziente Verwaltungsprozesse durch künstliche Intelligenz',
    icon: '/images/features/icon-02.svg',
    color: '#3E7DFF',
    features: [
      'Automatisierte Dokumentenverarbeitung',
      'Intelligente Terminplanung',
      'Schülerverwaltung',
      'Berichtswesen'
    ]
  },
  {
    id: 'fortbildungen',
    title: 'Fortbildungen',
    subtitle: 'KI-Kompetenz entwickeln',
    description: 'Professionelle Weiterbildung für den Umgang mit KI in der Bildung',
    icon: '/images/features/icon-03.svg',
    color: '#FF6B35',
    features: [
      'Praxisnahe Workshops',
      'Zertifizierte Kurse',
      'Online & Präsenz',
      'Individuelle Betreuung'
    ]
  }
];

export default function ProductShowcaseAnimation() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Automatischer Wechsel alle 4 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExpanded) {
        setActiveProduct((prev) => (prev + 1) % products.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isExpanded]);

  const handleProductClick = (index: number) => {
    setActiveProduct(index);
    setIsExpanded(true);
    
    // Nach 3 Sekunden wieder einklappen
    setTimeout(() => {
      setIsExpanded(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Unsere KI-Lösungen
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Entdecken Sie unsere drei innovativen Produkte, perfekt aufeinander abgestimmt
        </p>
      </div>

      <div className="relative">
        {/* Produkt-Container */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 justify-center items-center">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`relative cursor-pointer transition-all duration-500 ${
                index === activeProduct ? 'z-20' : 'z-10'
              }`}
              onClick={() => handleProductClick(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Produkt-Karte */}
              <motion.div
                className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
                  index === activeProduct && isExpanded
                    ? 'w-96 h-96 lg:w-[500px] lg:h-[400px]'
                    : 'w-80 h-64'
                }`}
                style={{
                  borderColor: index === activeProduct ? product.color : 'rgba(255, 255, 255, 0.1)',
                  background: index === activeProduct 
                    ? `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`
                    : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: index === activeProduct 
                    ? `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px ${product.color}40`
                    : '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
                animate={{
                  scale: index === activeProduct && isExpanded ? 1.05 : 1,
                  y: index === activeProduct && isExpanded ? -20 : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Hintergrund-Gradient */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${product.color}40 0%, transparent 70%)`
                  }}
                />

                {/* Produkt-Inhalt */}
                <div className="relative h-full p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${product.color}20` }}
                    >
                      <Image
                        src={product.icon}
                        alt={product.title}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{product.title}</h3>
                      <p className="text-sm text-gray-300">{product.subtitle}</p>
                    </div>
                  </div>

                  {/* Beschreibung */}
                  <p className="text-gray-300 text-sm mb-4 flex-1">
                    {product.description}
                  </p>

                  {/* Features - werden nur angezeigt wenn expandiert */}
                  <AnimatePresence>
                    {index === activeProduct && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <h4 className="text-sm font-semibold text-white mb-3">
                          Hauptfunktionen:
                        </h4>
                        <ul className="space-y-1">
                          {product.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                              className="text-xs text-gray-300 flex items-center gap-2"
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: product.color }}
                              />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA Button - wird nur angezeigt wenn expandiert */}
                  <AnimatePresence>
                    {index === activeProduct && isExpanded && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 px-6 py-2 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: product.color }}
                      >
                        Mehr erfahren
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Glow-Effekt */}
                {index === activeProduct && (
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-30"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${product.color} 0%, transparent 70%)`,
                      filter: 'blur(40px)'
                    }}
                  />
                )}
              </motion.div>

              {/* Produkt-Name unter der Karte */}
              <motion.div
                className="text-center mt-4"
                animate={{
                  opacity: index === activeProduct ? 1 : 0.6,
                  y: index === activeProduct ? 0 : 10
                }}
              >
                <span className="text-white font-medium">{product.title}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {products.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeProduct ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => handleProductClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* Info-Text */}
        <motion.p
          className="text-center text-gray-400 text-sm mt-6"
          animate={{ opacity: isExpanded ? 0.7 : 1 }}
        >
          {isExpanded 
            ? 'Klicken Sie auf ein Produkt für Details'
            : 'Klicken Sie auf ein Produkt oder warten Sie auf die automatische Vorführung'
          }
        </motion.p>
      </div>
    </div>
  );
}




