"use client";

import { MediaItem, AspectRatio } from "@/lib/api-types";
import Image from "next/image";
import {
  X,
  Undo,
  Redo,
  Sparkles,
  Clapperboard,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PromptBar } from "@/components/PromptBar";
import { useSharedImageGeneration } from "@/contexts/ImageGenerationContext";
import { useRouter } from "next/navigation";
import { MODEL_CONFIGS } from "@/lib/provider-config";
import { motion } from "framer-motion";

interface EditorProps {
  item: MediaItem;
}

type EditorMode = "view" | "edit" | "remix" | "video";

export function Editor({ item }: EditorProps) {
  const [mode, setMode] = useState<EditorMode>("view");
  const { startGeneration, isLoading } = useSharedImageGeneration();
  const router = useRouter();

  const handleGenerate = (newPrompt: string, newAspectRatio: AspectRatio) => {
    startGeneration(
      newPrompt,
      ["vertex"],
      MODEL_CONFIGS.performance,
      newAspectRatio
    );
    router.push("/");
  };
  
  const handleCloseEditor = () => {
    router.push("/");
  };

  const renderBottomBar = () => {
    switch (mode) {
      case "edit":
      case "remix":
      case "video":
        return (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4">
            <div className="flex items-center gap-2">
              <div className="flex-grow">
                <PromptBar
                  onSubmit={handleGenerate}
                  isLoading={isLoading}
                  initialPrompt={mode === "edit" ? item.prompt ?? "" : ""}
                  placeholder={
                    mode === "remix"
                      ? "Describe a new image or select an area to edit..."
                      : mode === "video"
                      ? "Optionally describe your video..."
                      : "Type your prompt here..."
                  }
                  suggestions={[]}
                />
              </div>
              <Button
                onClick={() => setMode("view")}
                variant="ghost"
                size="icon"
                className="bg-neutral-900 rounded-full text-white/50 hover:text-white"
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        );
      case "view":
      default:
        return (
          <div className="absolute bottom-8 inset-x-0 mx-auto flex flex-col items-center space-y-4">
            {item.prompt && <p className="text-white/80">{item.prompt}</p>}
            <div className="flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full p-2 space-x-2">
              {item.prompt && (
                <Button
                  variant="ghost"
                  className="rounded-full flex-col h-auto text-white"
                  onClick={() => setMode("edit")}
                >
                  <Pencil size={20} />
                  <span className="text-xs">Edit prompt</span>
                </Button>
              )}
              <Button
                variant="ghost"
                className="rounded-full flex-col h-auto text-white"
                onClick={() => setMode("remix")}
              >
                <Sparkles size={20} />
                <span className="text-xs">Remix</span>
              </Button>
              <Button
                variant="ghost"
                className="rounded-full flex-col h-auto text-white"
                onClick={() => setMode("video")}
              >
                <Clapperboard size={20} />
                <span className="text-xs">Create video</span>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <Button onClick={handleCloseEditor} variant="ghost" size="icon">
          <X />
        </Button>
        <span className="text-white/80 text-sm">{item.author}</span>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Undo />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-full flex items-center justify-center p-20">
        {item.type === "image" && (
          <Image
            src={item.src}
            alt={item.alt}
            width={
              item.aspectRatio === "1:1"
                ? 800
                : item.aspectRatio === "16:9"
                ? 1280
                : 450
            }
            height={
              item.aspectRatio === "1:1"
                ? 800
                : item.aspectRatio === "16:9"
                ? 720
                : 800
            }
            className="object-contain w-auto h-auto max-w-full max-h-full"
          />
        )}
        {item.type === "video" && (
          <video
            src={item.src}
            controls
            autoPlay
            className="object-contain w-auto h-auto max-w-full max-h-full"
          />
        )}
      </div>

      {/* Bottom Bar */}
      {renderBottomBar()}
    </motion.div>
  );
} 