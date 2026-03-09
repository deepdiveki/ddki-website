import React from 'react';
import { motion } from 'framer-motion';

const AnimatedNeonRings = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-[400px] h-[400px]">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 rounded-full border-[20px]`}
            style={{
              borderColor: `hsl(${index * 60}, 70%, ${index % 2 === 0 ? '70%' : '40%'})`,
              filter: 'blur(4px)',
              boxShadow: `0 0 20px hsl(${index * 60}, 80%, 60%)`,
              opacity: 0.9,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 6 - index * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedNeonRings;
