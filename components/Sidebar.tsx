"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Compass,
  ImageIcon,
  VideoIcon,
  Crown,
  Heart,
  User,
  Star,
  Trash2,
  Folder,
  Plus,
  Bot,
  Search,
  Command,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Compass, label: "Explore" },
    { href: "/images", icon: ImageIcon, label: "Images" },
    { href: "/videos", icon: VideoIcon, label: "Videos" },
    { href: "#", icon: Crown, label: "Top" },
    { href: "#", icon: Heart, label: "Likes" },
  ];

  const libraryItems = [
    { href: "#", icon: User, label: "My media" },
    { href: "#", icon: Star, label: "Favorites" },
    { href: "#", icon: Plus, label: "Uploads" },
    { href: "#", icon: Trash2, label: "Trash" },
  ];

  return (
    <aside className="w-64 p-4 space-y-6 bg-black border-r border-gray-800 flex flex-col">
      <div className="flex items-center space-x-2 px-2">
        <Bot size={24} />
        <span className="font-bold text-lg">ImageGen</span>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-9 h-10 bg-gray-900 border-gray-700 rounded-full"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 text-muted-foreground flex items-center justify-center text-xs">
          <Command size={14} className="mr-1" />K
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <div
                className={cn(
                  "flex items-center p-2 rounded-lg cursor-pointer",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="flex-grow">
        <h3 className="mb-2 px-2 text-sm font-semibold text-gray-500">
          Library
        </h3>
        <nav className="flex flex-col gap-1">
          {libraryItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.label}>
                <div
                  className={cn(
                    "flex items-center p-2 rounded-lg cursor-pointer",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-col gap-1">
        <Button variant="ghost" className="w-full justify-start text-gray-400">
          <Folder className="mr-3 h-5 w-5" /> New folder
        </Button>
      </div>
    </aside>
  );
} 