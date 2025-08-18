"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { X, LucideIcon } from "lucide-react";
import { ComponentsData } from "@/lib/data/ComponentsData";

// Type definitions remain the same
interface ComponentLink {
  name: string;
  path: string;
  icon?: LucideIcon;
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
      {/* --- Overlay --- */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-sm lg:max-w-none lg:w-64
                   flex flex-col
                   transform transition-transform duration-300 ease-in-out
                   bg-black
                   backdrop-blur-xl
                   border-r border-zinc-700/50
                   shadow-2xl
                   z-50
                   lg:top-16 lg:h-[calc(100vh-4rem)]
                   ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-800/50 lg:hidden">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-full text-zinc-300 hover:bg-white/10 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-grow overflow-y-auto p-4 space-y-6">
          {(ComponentsData as ComponentSection[]).map((section) => (
            <div key={section.category} className="space-y-2">
              <p className="px-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider select-none">
                {section.category}
              </p>
              <div className="space-y-1">
                {section.links.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 h-10 px-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-white/10 text-white shadow-md"
                            : "text-zinc-300 hover:bg-white/5 hover:translate-x-1"
                        }
                      `}
                    >
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

// Added a new componet for a background