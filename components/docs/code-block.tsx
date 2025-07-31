'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

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
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="relative my-4 rounded-xl shadow-lg bg-[#1E1E1E]">

      <div className="flex items-center justify-between px-4 py-2 bg-gray-700/50 rounded-t-xl">
        <span className="text-xs text-gray-400 font-mono">
          {fileName || language}
        </span>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 text-sm text-gray-300 transition-colors duration-200 hover:text-white ${
            isCopied ? 'text-green-400' : ''
          }`}
          aria-label={isCopied ? 'Copied!' : 'Copy code to clipboard'}
        >
          {isCopied ? <FiCheck size={16} /> : <FiCopy size={16} />}
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        wrapLines={true}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          backgroundColor: 'transparent',
          borderBottomLeftRadius: '0.75rem',
          borderBottomRightRadius: '0.75rem',
        }}
        codeTagProps={{
          style: {
            fontFamily: '"Fira Code", "Courier New", monospace',
            fontSize: '0.9rem',
          },
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};