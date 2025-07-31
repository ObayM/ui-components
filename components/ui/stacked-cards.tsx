'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);



interface CardData {
  id: string | number;
  content: React.ReactNode;
}


interface ScrollingStackedCardsProps {
  title: string;
  subtitle: string;
  cards: CardData[];
  BackgroundIcon?: React.ComponentType<{ className?: string }>;
  className?: string;
}


export const StackedCards = ({
  title,
  subtitle,
  cards,
  BackgroundIcon,
  className = '',
}: ScrollingStackedCardsProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  cardsRef.current = [];

  useGSAP(
    () => {
      if (cards.length === 0) return;

      const cardElements = cardsRef.current.filter(c => c !== null) as HTMLDivElement[];
      
      const scrollDuration = cards.length * 800;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${scrollDuration}`,
          markers: false,
        },
      });

      timeline.to('.gsap-title', {
        y: 20,
        duration: 0.4,
      });

      cardElements.forEach((card, index) => {
        if (index === cardElements.length - 1) return;

        const animDuration = 1;
        const opacityStartProgress = 0.7;
        const opacityStartTimeOffset = animDuration * opacityStartProgress;
        const opacityDuration = animDuration * (1 - opacityStartProgress);

        timeline
          .to(
            card,
            {
              yPercent: -25,
              scale: 1.5,
              duration: animDuration,
              ease: 'power1.inOut',
            },
            '<+0.5',
          )
          .to(
            card,
            {
              opacity: 0,
              duration: opacityDuration,
              ease: 'power1.in',
            },
            `<+${opacityStartTimeOffset}`, 
          );
      });
    },
    { scope: mainRef, dependencies: [cards] },
  );

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={mainRef} className={`relative ${className}`}>
      <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {BackgroundIcon && (
            <BackgroundIcon className="text-[25rem] text-primary/5" />
          )}
          <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent to-70% rounded-full"></div>
        </div>

        <div className="gsap-title relative z-10 flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-lg text-gray-400">{subtitle}</p>
        </div>

        <div className="relative w-11/12 md:w-4/6 h-96">
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={addToRefs}
              className="absolute top-0 left-0 w-full h-full p-8 flex items-center justify-center
                         bg-blue-200/10 backdrop-blur-2xl rounded-3xl border border-white/10
                         shadow-2xl shadow-primary/10"
              style={{
                transform: `translateY(${i * 15}px) scale(${1 - i * 0.04})`,
                zIndex: cards.length - i,
              }}
            >
              <div className="text-3xl md:text-5xl font-bold text-center text-stone-300 leading-snug">
                {card.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};