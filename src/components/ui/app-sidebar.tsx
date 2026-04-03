"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Type,
  SquareCheck,
  Layers,
  ListFilter,
  Calendar as CalendarIcon,
  Table as TableIcon,
  Zap,
  Shield,
  Clock,
  AlignLeft,
  CheckSquare,
  Circle,
  ChevronDown,
  Upload,
  Bell,
  MessageSquare,
  User,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface NavItem {
  id: string;
  name: string;
  icon: React.ElementType;
  category: "left" | "right";
}

const NAV_ITEMS: NavItem[] = [
  // Left Side Components
  { id: "card", name: "Card", icon: LayoutDashboard, category: "left" },
  { id: "accordion", name: "Accordion", icon: ChevronDown, category: "left" },
  { id: "table", name: "Table", icon: TableIcon, category: "left" },
  { id: "buttons", name: "Buttons", icon: Zap, category: "left" },
  { id: "filter", name: "Filter", icon: ListFilter, category: "left" },
  { id: "search", name: "Search", icon: ListFilter, category: "left" },
  { id: "popover", name: "Popover", icon: Shield, category: "left" },
  { id: "modal", name: "Modal", icon: Shield, category: "left" },
  { id: "skeleton-loader", name: "Skeleton Loader", icon: Layers, category: "left" },
  { id: "sidebar", name: "Sidebar", icon: PanelLeftOpen, category: "left" },
  { id: "navbar", name: "Navbar", icon: AlignLeft, category: "left" },
  { id: "footer", name: "Footer", icon: AlignLeft, category: "left" },
  { id: "tab", name: "Tab", icon: Layers, category: "left" },
  { id: "spinner", name: "Spinner", icon: Clock, category: "left" },
  { id: "date-picker", name: "Date Picker", icon: CalendarIcon, category: "left" },
  { id: "time-picker", name: "Time Picker", icon: Clock, category: "left" },

  // Right Side Components
  { id: "text-field", name: "Text Field", icon: Type, category: "right" },
  { id: "text-area", name: "Text Area", icon: AlignLeft, category: "right" },
  { id: "checkbox", name: "Checkbox", icon: CheckSquare, category: "right" },
  { id: "radiobox", name: "Radiobox", icon: Circle, category: "right" },
  { id: "dropdown", name: "Dropdown", icon: ChevronDown, category: "right" },
  { id: "combobox", name: "Combobox", icon: ListFilter, category: "right" },
  { id: "switch-button", name: "Switch Button", icon: SquareCheck, category: "right" },
  { id: "badge", name: "Badge", icon: Shield, category: "right" },
  { id: "chips", name: "Chips", icon: Layers, category: "right" },
  { id: "file-upload", name: "File Upload", icon: Upload, category: "right" },
  { id: "toast", name: "Toast", icon: Bell, category: "right" },
  { id: "tooltip", name: "Tooltip", icon: MessageSquare, category: "right" },
  { id: "avatar", name: "Avatar", icon: User, category: "right" },
  { id: "drawer", name: "Drawer", icon: PanelLeftOpen, category: "right" },
];

export function AppSidebar() {
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();

  const leftComponents = NAV_ITEMS.filter((item) => item.category === "left");
  const rightComponents = NAV_ITEMS.filter((item) => item.category === "right");

  const isActive = (id: string) => {
    return pathname === `/components/${id}` || (pathname === "/" && id === "buttons");
  };

  if (!isOpen) {
    return (
      <aside className="w-20 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-40 shadow-sm">
        <button
          onClick={toggle}
          className="p-4 hover:bg-slate-50 transition-colors border-b border-slate-200 flex justify-center"
        >
          <PanelLeftOpen className="h-5 w-5 text-slate-600" />
        </button>

        {/* Collapsed Navigation - Icons with Text Underneath */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1">
          {/* Left Side Icons */}
          {leftComponents.slice(0, 8).map((item) => (
            <Link
              key={item.id}
              href={`/components/${item.id}`}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative group",
                isActive(item.id)
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] mt-1 truncate w-full text-center leading-tight">
                {item.name.split(" ")[0]}
              </span>
            </Link>
          ))}

          <div className="border-t border-slate-200 my-2 mx-2" />

          {/* More Left Components */}
          {leftComponents.slice(8).map((item) => (
            <Link
              key={item.id}
              href={`/components/${item.id}`}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative group",
                isActive(item.id)
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] mt-1 truncate w-full text-center leading-tight">
                {item.name.split(" ")[0]}
              </span>
            </Link>
          ))}

          <div className="border-t border-slate-200 my-2 mx-2" />

          {/* Right Side - Form Inputs */}
          {rightComponents.slice(0, 7).map((item) => (
            <Link
              key={item.id}
              href={`/components/${item.id}`}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative group",
                isActive(item.id)
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] mt-1 truncate w-full text-center leading-tight">
                {item.name.split(" ")[0]}
              </span>
            </Link>
          ))}

          <div className="border-t border-slate-200 my-2 mx-2" />

          {/* Right Side - UI Elements */}
          {rightComponents.slice(7).map((item) => (
            <Link
              key={item.id}
              href={`/components/${item.id}`}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative group",
                isActive(item.id)
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] mt-1 truncate w-full text-center leading-tight">
                {item.name.split(" ")[0]}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-40 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              O
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Onebi UI</h1>
              <p className="text-xs text-slate-500">Component Library</p>
            </div>
          </div>
          <button
            onClick={toggle}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <PanelLeftClose className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Left Side Components */}
        <div className="px-4 mb-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Layout & Data
          </h3>
          <div className="space-y-1">
            {leftComponents.slice(0, 8).map((item) => (
              <Link
                key={item.id}
                href={`/components/${item.id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive(item.id)
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive(item.id) ? "text-indigo-600" : "text-slate-400"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 mb-2 mt-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            More Components
          </h3>
          <div className="space-y-1">
            {leftComponents.slice(8).map((item) => (
              <Link
                key={item.id}
                href={`/components/${item.id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive(item.id)
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive(item.id) ? "text-indigo-600" : "text-slate-400"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Components */}
        <div className="px-4 mb-2 mt-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Form Inputs
          </h3>
          <div className="space-y-1">
            {rightComponents.slice(0, 7).map((item) => (
              <Link
                key={item.id}
                href={`/components/${item.id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive(item.id)
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive(item.id) ? "text-indigo-600" : "text-slate-400"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 mb-2 mt-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            UI Elements
          </h3>
          <div className="space-y-1">
            {rightComponents.slice(7).map((item) => (
              <Link
                key={item.id}
                href={`/components/${item.id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive(item.id)
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive(item.id) ? "text-indigo-600" : "text-slate-400"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      {/* <div className="p-4 border-t border-slate-200">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-indigo-900 mb-1">Pro Tip</p>
          <p className="text-xs text-indigo-700">
            Click any component to view its implementation and usage examples.
          </p>
        </div>
      </div> */}
    </aside>
  );
}
