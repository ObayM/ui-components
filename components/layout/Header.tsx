"use client";

import Image from "next/image";
import { Search, Github, Menu } from "lucide-react";
import { FC } from "react";

interface HeaderProps {
  openMenu: () => void;
  openSearch: () => void;
}

const Header: FC<HeaderProps> = ({ openMenu, openSearch }) => {
  return (

    <header className="fixed top-0 left-0 w-full h-16 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-md z-50">
      <nav className="h-full flex items-center justify-between" aria-label="Main navigation">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3" aria-label="Homepage">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="hidden sm:inline-block font-semibold text-zinc-800 dark:text-white">
              UI Components
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={openSearch}
            aria-label="Open search"
            className="group hidden sm:flex items-center gap-2 w-40 sm:w-56 rounded-lg py-2 px-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
          >
            <Search
              size={16}
              className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors"
            />
            <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
              Search...
            </span>
            <kbd className="ml-auto text-xs font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 rounded-md px-1.5 py-0.5">
              ⌘K
            </kbd>
          </button>
          
           <button
            onClick={openSearch}
            aria-label="Open search"
            className="sm:hidden p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <Search size={20} />
          </button>

          <a
            href="https://github.com/ObayM/ui-components"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star on GitHub"
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <Github size={20} />
          </a>

          <button
            onClick={openMenu}
            aria-label="Open menu"
            className="lg:hidden p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;