'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { cn } from '@/lib/utils'; 

gsap.registerPlugin(TextPlugin);


export interface TypewriterProps {
  texts: string[];
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
  cursorChar?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  loop?: boolean;
}


export const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  className,
  textClassName,
  cursorClassName,
  cursorChar = '|',
  typingSpeed = 0.05,
  deletingSpeed = 0.03,
  delayBetweenTexts = 1.5,
  loop = true,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !cursorRef.current || texts.length === 0) return;

    const cursorTween = gsap.to(cursorRef.current, {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.7,
      repeat: -1,
      yoyo: true,
    });

    const masterTimeline = gsap.timeline({
      repeat: loop ? -1 : 0,
    });

    texts.forEach((text, i) => {
      const textTimeline = gsap.timeline();
      
      textTimeline.to(textRef.current, {
        duration: text.length * typingSpeed,
        text: {
          value: text,
          newClass: "is-typing" 
        },
        ease: 'none',
      })

      .to(textRef.current, {
        duration: text.length * deletingSpeed,
        text: {
          value: "",
          newClass: "is-deleting"
        },
        ease: 'none',
        delay: delayBetweenTexts,

        onComplete: () => {
          if (!loop && i === texts.length - 1) {
            cursorTween.pause();
            gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
          }
        }
      });
      
      masterTimeline.add(textTimeline);
    });
    
    return () => {
      masterTimeline.kill();
      cursorTween.kill();
    };

  }, [texts, loop, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-lg shadow-2xl shadow-black/30',
        className
      )}
    >
      <span
        ref={textRef}
        className={cn(
          'text-2xl md:text-4xl lg:text-5xl font-mono font-medium text-white tracking-wider',
          textClassName
        )}
      />
      <span
        ref={cursorRef}
        aria-hidden="true"
        className={cn(
          'text-2xl md:text-4xl lg:text-5xl font-mono font-medium text-cyan-300 ml-1',
          cursorClassName
        )}
      >
     {cursorChar}
      </span>
    </div>
  );
};