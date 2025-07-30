"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { X } from "lucide-react";
import { ComponentsData } from "@/lib/data/ComponentsData";

interface ComponentLink {
  name: string;
  path: string;
}

interface ComponentSection {
  category: string;
  links: ComponentLink[];
}

interface SidebarProps {
  isSidebarOpen: boolean;
  closeMenu: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, closeMenu }) => {
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-zinc-900 z-50 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-64 lg:top-16 lg:h-[calc(100vh-4rem)] lg:border-r lg:border-zinc-200 dark:lg:border-zinc-800 ${
          isSidebarOpen ? "translate-x-0 w-screen" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800 lg:hidden">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">Menu</h2>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-1 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-grow overflow-y-auto p-4 space-y-6">
          {(ComponentsData as ComponentSection[]).map((section) => (
            <div key={section.category} className="space-y-2">

              <p className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {section.category}
              </p>
              <div className="space-y-1">
                {section.links.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                    className={`flex items-center h-10 px-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                        pathname === item.path
                        ? "bg-blue-500 text-white"
                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;