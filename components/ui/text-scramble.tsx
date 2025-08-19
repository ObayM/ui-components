'use client'
import React, { useState, useEffect, useRef } from 'react';

const useTextScramble = (text: string, speed = 50, scrambleChars = '!<>-_\\/[]{}—=+*^?#________') => {
  const [currentText, setCurrentText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const scramble = () => {
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentText(
        text
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }


      iteration += 1 / 3;
    }, speed);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentText(text);
  };

  return { currentText, scramble, reset };
};

interface TextScrambleProps {
  children: string;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  bgColor?: string;
  bgOpacity?: number;
  speed?: number;
  scrambleChars?: string;
}

const TextScramble: React.FC<TextScrambleProps> = ({
  children,
  className = '',
  blur = 'md',
  bgColor = 'white',
  bgOpacity = 10,
  speed = 50,
  scrambleChars,
}) => {
  const { currentText, scramble, reset } = useTextScramble(children, speed, scrambleChars);

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl',
  };

  const backgroundClass = `bg-${bgColor}/${bgOpacity}`;

  return (
    <div
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className={`relative inline-block overflow-hidden rounded-lg p-4 ${blurClasses[blur]} ${backgroundClass} border border-white/20 shadow-lg ${className}`}
    >
      <div className="relative z-10 font-mono text-white">{currentText}</div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-transparent"></div>
    </div>
  );
};

export default TextScramble;