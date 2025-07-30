
"use client";

import type {
  FC,
  RefObject,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from "react";
import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft, FileCode } from "lucide-react";

import { ComponentsData } from "@/lib/data/ComponentsData";


interface SearchResultItem {
  name: string;
  category: string;
  path: string;
}


interface SearchModalProps {
  searchTimeline: RefObject <gsap.core.Timeline | null>;
  resultRefs: RefObject <(HTMLButtonElement | null)[]>;
  searchOverlayRef: RefObject<HTMLDivElement | null>;
  searchBoxRef: RefObject<HTMLDivElement | null>;
  searchInputRef: RefObject<HTMLInputElement | null>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  filteredResults: SearchResultItem[];
  handleInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchModal: FC<SearchModalProps> = ({
  searchTimeline,
  searchOverlayRef,
  searchBoxRef,
  searchInputRef,
  resultRefs,
  query,
  setQuery,
  selectedIndex,
  setSelectedIndex,
  filteredResults,
  handleInputKeyDown,
}) => {
  const router = useRouter();

  useEffect(() => {
    resultRefs.current[selectedIndex]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIndex, resultRefs]);

  const handleResultClick = (path: string) => {
    router.push(path);
    searchTimeline.current?.reverse();
  };

  return (
    <div
      ref={searchOverlayRef}
      className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/50 backdrop-blur-sm flex justify-center items-start pt-16 sm:pt-24 opacity-0 pointer-events-none z-[100]"
    >
      <div
        ref={searchBoxRef}
        className="bg-white dark:bg-zinc-900 w-11/12 max-w-2xl border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl flex flex-col scale-95 opacity-0 overflow-hidden"
        style={{ height: "clamp(400px, 80vh, 550px)" }}
      >
        <div className="relative flex items-center border-b border-zinc-200 dark:border-zinc-800">
          <Search className="absolute left-4 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search components..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleInputKeyDown}
            className="w-full h-14 bg-transparent pl-12 pr-12 text-base text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={() => searchTimeline.current?.reverse()}
            className="absolute right-4 p-1 rounded-full text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-2">
          {query !== "" && filteredResults.length > 0 && (
            <div className="flex flex-col gap-1 p-2">
              <p className="px-2 pb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Components
              </p>
              {filteredResults.map((item, index) => (
                <button
                  key={item.path}
                  ref={(el) => { resultRefs.current[index] = el; }}
                  onClick={() => handleResultClick(item.path)}
                  className={`flex w-full items-center justify-between p-3 rounded-lg text-left transition-colors duration-150 ${
                    selectedIndex === index
                      ? "bg-blue-500 text-white"
                      : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        selectedIndex === index
                          ? "bg-blue-600"
                          : "bg-zinc-100 dark:bg-zinc-800"
                      }`}
                    >
                      <FileCode
                        className={`w-5 h-5 ${
                          selectedIndex === index
                            ? "text-white"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      />
                    </div>
                    <div>
                      <div className={`font-medium ${ selectedIndex === index ? "text-white" : "" }`}>
                        {item.name}
                      </div>
                      <span className={`text-sm ${ selectedIndex === index ? "text-blue-200" : "text-zinc-500 dark:text-zinc-400" }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {selectedIndex === index && (
                    <CornerDownLeft className="w-4 h-4 text-blue-200" />
                  )}
                </button>
              ))}
            </div>
          )}

          {query === "" && (
            <div className="flex flex-col justify-between h-full p-4">
              <div>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Popular Components
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Type Writer", "Button"].map((name) => {
                    const item = ComponentsData.flatMap((s) => s.links).find(
                      (l) => l.name === name
                    );
                    if (!item) return null;
                    return (
                      <button
                        key={name}
                        onClick={() => handleResultClick(item.path)}
                        className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {query !== "" && filteredResults.length === 0 && (
            <div className="flex flex-col justify-center items-center h-full text-center text-zinc-500 dark:text-zinc-400 p-4">
              <Search className="w-10 h-10 mb-3 text-zinc-400 dark:text-zinc-600" />
              <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
                No results found
              </p>
              <p>
                No components found for <strong>"{query}"</strong>.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 text-center">
          <Link
            href="/terms"
            className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;