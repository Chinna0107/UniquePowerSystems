import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Keep splash active for 2.6 seconds, then start exit animation
    const timer = setTimeout(() => {
      setIsMounted(false);
      // Wait for exit transition (800ms) before declaring completion
      const finishTimer = setTimeout(onComplete, 800);
      return () => clearTimeout(finishTimer);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          id="splash-screen-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden select-none"
        >
          {/* Gentle background radiant lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center">
            {/* Logo wrapper with premium entry and custom sweep overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative p-8 rounded-3xl"
            >
              {/* Actual vector logo */}
              <Logo className="h-28 md:h-36" showText={false} />

              {/* Shine and light sweep layers */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute top-0 -left-[150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] animate-shine" />
                <div className="absolute top-0 -left-[200%] w-[150%] h-full bg-gradient-to-r from-transparent via-[#0B3A7E]/10 to-transparent skew-x-[-25deg] animate-sweep-blue" />
                <div className="absolute top-0 -left-[200%] w-[150%] h-full bg-gradient-to-r from-transparent via-[#F97316]/10 to-transparent skew-x-[-25deg] animate-sweep-orange" />
              </div>
            </motion.div>

            {/* Unique Power Systems branding fade and lift */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mt-6 space-y-2.5 z-10"
            >
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#0B3A7E] font-display">
                UNIQUE POWER SYSTEMS
              </h1>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F97316] font-mono">
                Electrical & Civil Contractors
              </p>
            </motion.div>
          </div>

          {/* Premium animated progress slide bar */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-56 h-[3px] bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ left: '-100%', width: '35%' }}
              animate={{ left: '100%', width: '45%' }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="absolute h-full bg-gradient-to-r from-[#0B3A7E] via-[#F97316] to-[#0B3A7E]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
