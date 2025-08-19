import React from 'react';
import TextScramble from '@/components/ui/text-scramble';

const ComponentPreview: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="grid grid-cols-1 gap-8 text-center">
        <h1 className="mb-8 text-4xl font-bold text-white">
           Text Scramble
        </h1>

        <TextScramble speed={30}>
          Hello, World!
        </TextScramble>

        <TextScramble
          blur="lg"
          bgColor="purple-500"
          bgOpacity={20}
          speed={70}
          scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        >
          Customizable
        </TextScramble>

        <TextScramble
          blur="sm"
          bgOpacity={5}
          className="rounded-full px-8"
        >
          Hover Over Me
        </TextScramble>
      </div>
    </div>
  );
};

export { ComponentPreview };