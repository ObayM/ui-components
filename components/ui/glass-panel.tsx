'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx } from 'clsx';
import ParallaxTilt from 'react-parallax-tilt';

const PanelStyles = () => (
  <style jsx global>{`

    .kinetic-panel-aurora-border {
      position: relative;
      overflow: hidden; 
      border-radius: 24px;
    }

    .kinetic-panel-aurora-border::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0; 

      background: radial-gradient(
        350px circle at var(--mouse-x) var(--mouse-y),
        rgba(148, 163, 184, 0.25), 
        transparent 80%
      );
      
      padding: 1px; 
      border-radius: inherit; 
      
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  `}</style>
);

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  tiltEnable?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  tiltEnable = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const contentPanel = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'kinetic-panel-aurora-border',
        'relative bg-white/5 backdrop-blur-xl',
        'border border-white/10 rounded-3xl p-8',
        'shadow-2xl shadow-black/40',
        className 
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  return (
    <>
      <PanelStyles />

      {tiltEnable ? (
        <ParallaxTilt
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glarePosition="all"
          scale={1.02}
          transitionSpeed={3000}
        >
          {contentPanel}
        </ParallaxTilt>
      ) : (
        contentPanel
      )}
    </>
  );
};