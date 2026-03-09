"use client";

import React, { useEffect, useRef } from 'react';

const ElectromagneticExplosionAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas setup
    canvas.width = 800;
    canvas.height = 600;

    const drawExplodedView = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark blue background with grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid pattern
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Set white color for all components
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;

      // 1. Top Ring Component (with fins/blades)
      const topRingY = centerY - 200;
      const topRingRadius = 80;
      
      // Main ring
      ctx.beginPath();
      ctx.arc(centerX, topRingY, topRingRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner ring
      ctx.beginPath();
      ctx.arc(centerX, topRingY, topRingRadius - 20, 0, Math.PI * 2);
      ctx.stroke();
      
      // Fins/blades inside the ring
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = centerX + Math.cos(angle) * (topRingRadius - 40);
        const y1 = topRingY + Math.sin(angle) * (topRingRadius - 40);
        const x2 = centerX + Math.cos(angle) * (topRingRadius - 10);
        const y2 = topRingY + Math.sin(angle) * (topRingRadius - 10);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 2. Upper Stack of Rings (3 rings)
      const upperStackStartY = centerY - 120;
      const ringSpacing = 25;
      
      for (let i = 0; i < 3; i++) {
        const ringY = upperStackStartY + i * ringSpacing;
        const ringRadius = 70;
        
        // Main ring
        ctx.beginPath();
        ctx.arc(centerX, ringY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner ring
        ctx.beginPath();
        ctx.arc(centerX, ringY, ringRadius - 15, 0, Math.PI * 2);
        ctx.stroke();
        
        // Hexagonal protrusion on first ring
        if (i === 0) {
          const hexX = centerX + ringRadius + 10;
          const hexY = ringY;
          const hexSize = 8;
          
          ctx.beginPath();
          for (let j = 0; j < 6; j++) {
            const angle = (j / 6) * Math.PI * 2;
            const x = hexX + Math.cos(angle) * hexSize;
            const y = hexY + Math.sin(angle) * hexSize;
            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();
          
          // Keyhole slot
          ctx.beginPath();
          ctx.arc(hexX, hexY, 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 3. Central Cylindrical Array (rotor)
      const rotorY = centerY - 30;
      const rotorRadius = 60;
      const rotorHeight = 80;
      
      // Main rotor cylinder
      ctx.beginPath();
      ctx.arc(centerX, rotorY - rotorHeight/2, rotorRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX, rotorY + rotorHeight/2, rotorRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Vertical lines connecting top and bottom
      ctx.beginPath();
      ctx.moveTo(centerX - rotorRadius, rotorY - rotorHeight/2);
      ctx.lineTo(centerX - rotorRadius, rotorY + rotorHeight/2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(centerX + rotorRadius, rotorY - rotorHeight/2);
      ctx.lineTo(centerX + rotorRadius, rotorY + rotorHeight/2);
      ctx.stroke();
      
      // Individual rods in the rotor
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const rodRadius = rotorRadius - 15;
        const x = centerX + Math.cos(angle) * rodRadius;
        const y1 = rotorY - rotorHeight/2;
        const y2 = rotorY + rotorHeight/2;
        
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
      }

      // 4. Lower Stack of Rings/Base
      const lowerStackY = centerY + 80;
      const lowerRingRadius = 75;
      
      // Two rings
      for (let i = 0; i < 2; i++) {
        const ringY = lowerStackY + i * 25;
        const ringRadius = lowerRingRadius + (i * 5);
        
        ctx.beginPath();
        ctx.arc(centerX, ringY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(centerX, ringY, ringRadius - 15, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Solid base (U-shaped/cup-shaped)
      const baseY = lowerStackY + 60;
      const baseWidth = 120;
      const baseHeight = 40;
      
      ctx.beginPath();
      ctx.moveTo(centerX - baseWidth/2, baseY);
      ctx.lineTo(centerX - baseWidth/2, baseY + baseHeight);
      ctx.lineTo(centerX + baseWidth/2, baseY + baseHeight);
      ctx.lineTo(centerX + baseWidth/2, baseY);
      ctx.stroke();
      
      // Curved bottom of base
      ctx.beginPath();
      ctx.arc(centerX, baseY + baseHeight, baseWidth/2, 0, Math.PI);
      ctx.stroke();

      // 5. Arrows and Movement Indicators
      
      // Rotational arrow around rotor
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, rotorY, rotorRadius + 30, -Math.PI/4, Math.PI/4);
      ctx.stroke();
      
      // Arrowhead for rotation
      const arrowAngle = Math.PI/4;
      const arrowX = centerX + Math.cos(arrowAngle) * (rotorRadius + 30);
      const arrowY = rotorY + Math.sin(arrowAngle) * (rotorRadius + 30);
      
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - 8, arrowY - 8);
      ctx.lineTo(arrowX - 8, arrowY + 8);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Lateral arrows (left and right)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      
      // Left arrow
      ctx.beginPath();
      ctx.moveTo(centerX - rotorRadius - 20, rotorY);
      ctx.lineTo(centerX - rotorRadius - 50, rotorY);
      ctx.stroke();
      
      // Left arrowhead
      ctx.beginPath();
      ctx.moveTo(centerX - rotorRadius - 50, rotorY);
      ctx.lineTo(centerX - rotorRadius - 40, rotorY - 8);
      ctx.lineTo(centerX - rotorRadius - 40, rotorY + 8);
      ctx.closePath();
      ctx.fill();
      
      // Right arrow
      ctx.beginPath();
      ctx.moveTo(centerX + rotorRadius + 20, rotorY);
      ctx.lineTo(centerX + rotorRadius + 50, rotorY);
      ctx.stroke();
      
      // Right arrowhead
      ctx.beginPath();
      ctx.moveTo(centerX + rotorRadius + 50, rotorY);
      ctx.lineTo(centerX + rotorRadius + 40, rotorY - 8);
      ctx.lineTo(centerX + rotorRadius + 40, rotorY + 8);
      ctx.closePath();
      ctx.fill();

      // Vertical assembly arrow (orange)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, rotorY + rotorHeight/2 + 10);
      ctx.lineTo(centerX, lowerStackY - 10);
      ctx.stroke();
      
      // Assembly arrowhead
      ctx.beginPath();
      ctx.moveTo(centerX, lowerStackY - 10);
      ctx.lineTo(centerX - 8, lowerStackY - 20);
      ctx.lineTo(centerX + 8, lowerStackY - 20);
      ctx.closePath();
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
    };

    drawExplodedView();
  }, []);

  return (
    <div className="flex justify-center items-center py-8">
      <canvas
        ref={canvasRef}
        className="border border-gray-600 rounded-lg shadow-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default ElectromagneticExplosionAnimation;
