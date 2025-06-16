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

export function Sidebar() {
  return (
    <aside className="w-64 p-4 space-y-4 bg-black border-r border-gray-800 flex flex-col">
      <div className="flex items-center space-x-2">
        <Bot size={24} />
        <span className="font-bold text-lg">ImageGen</span>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-8 bg-gray-900 border-gray-700"
        />
        <div className="absolute right-2.5 top-2.5 h-5 text-muted-foreground flex items-center justify-center">
          <Command size={16} />K
        </div>
      </div>
      <nav className="flex-grow">
        <ul>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Compass className="mr-2" /> Explore
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <ImageIcon className="mr-2" /> Images
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <VideoIcon className="mr-2" /> Videos
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Crown className="mr-2" /> Top
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="mr-2" /> Likes
            </Button>
          </li>
        </ul>
        <h3 className="mt-4 px-4 text-sm font-semibold text-muted-foreground">
          Library
        </h3>
        <ul>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2" /> My media
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Star className="mr-2" /> Favorites
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Plus className="mr-2" /> Uploads
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Trash2 className="mr-2" /> Trash
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Folder className="mr-2" /> New folder
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
} 