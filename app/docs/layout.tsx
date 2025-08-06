"use client";

import { useState, useEffect, useRef, FC, PropsWithChildren, KeyboardEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import SearchModal from "@/components/layout/SearchModal";
import { ComponentsData } from "@/lib/data/ComponentsData";
import { Contribute } from "@/components/docs/contribute";

interface SearchResultItem {
  name: string;
  path: string;
  category: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const searchOverlayRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchTimeline = useRef<gsap.core.Timeline | null>(null);
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const allComponents = ComponentsData.flatMap((section) =>
    section.links.map((link) => ({ ...link, category: section.category }))
  );

  const filteredResults: SearchResultItem[] = query
    ? allComponents.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const openMenu = () => setIsSidebarOpen(true);
  const closeMenu = () => setIsSidebarOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    searchTimeline.current = gsap.timeline({
      paused: true,
      onStart: () => {
        document.body.style.overflowY = "hidden";
        searchInputRef.current?.focus();
      },
      onReverseComplete: () => {
        setQuery("");
        setSelectedIndex(-1);
        document.body.style.overflowY = "auto";
      },
    });

    searchTimeline.current
      .to(searchOverlayRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        pointerEvents: "auto",
      })
      .to(
        searchBoxRef.current,
        { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" },
        "<" 
      );

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchTimeline.current?.play();
      } else if (e.key === "Escape") {
        searchTimeline.current?.reverse();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchOverlayRef.current?.contains(e.target as Node) &&
        !searchBoxRef.current?.contains(e.target as Node)
      ) {
        searchTimeline.current?.reverse();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      searchTimeline.current?.kill();
    };
  }, []);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedItem = filteredResults[selectedIndex];
      if (selectedItem) {
        router.push(selectedItem.path);
        searchTimeline.current?.reverse();
      }
    }
  };

  const openSearch = () => {
    searchTimeline.current?.play();
  };

  return (
    <>
      <Header openMenu={openMenu} openSearch={openSearch} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeMenu={closeMenu} />
      <main className="lg:pl-64 pt-16"> 
        <div className="max-w-7xl mx-auto bg-gray-700">
          {children}
          <Contribute />
        </div>
      </main>
      <SearchModal
        searchTimeline={searchTimeline}
        searchOverlayRef={searchOverlayRef}
        searchBoxRef={searchBoxRef}
        searchInputRef={searchInputRef}
        query={query}
        setQuery={setQuery}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        filteredResults={filteredResults}
        handleInputKeyDown={handleInputKeyDown}
        resultRefs={resultRefs}
      />
    </>
  );
};