'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Clipboard, ClipboardCheck } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
}

export const CodeBlock = ({
  code,
  language = 'tsx',
  fileName,
}: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="relative my-6 rounded-2xl shadow-lg group">
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between px-4 py-2 bg-gradient-to-br from-white/5 to-transparent rounded-t-2xl border-b border-white/10">
        <span className="text-xs text-gray-400 font-mono select-none">
          {fileName || language}
        </span>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
            isCopied
              ? 'text-green-400'
              : 'text-gray-300 hover:text-white'
          }`}
          aria-label={isCopied ? 'Copied!' : 'Copy code to clipboard'}
        >
          {isCopied ? (
            <ClipboardCheck size={16} />
          ) : (
            <Clipboard size={16} />
          )}
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className="relative z-10">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          showLineNumbers
          wrapLines={true}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            backgroundColor: 'transparent',
            borderBottomLeftRadius: '1rem',
            borderBottomRightRadius: '1rem',
            fontSize: '0.9rem',
          }}
          codeTagProps={{
            style: {
              fontFamily: '"Fira Code", "Courier New", monospace',
            },
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};