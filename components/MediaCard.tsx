"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import type { AspectRatio } from "@/lib/api-types";
import { motion } from "framer-motion";

interface MediaCardProps {
  src: string;
  alt: string;
  author: string;
  likes: number;
  type: "image" | "video";
  aspectRatio: AspectRatio;
  thumbnail?: string;
  onLoad?: () => void;
}

export function MediaCard({
  src,
  alt,
  author,
  likes,
  type,
  aspectRatio,
  thumbnail,
  onLoad,
}: MediaCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    if (type === "video" && videoRef.current) {
      try {
        await videoRef.current.play();
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Video play error:", error);
        }
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (type === "video" && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const aspectRatioClasses = {
    "1:1": "aspect-square",
    "16:9": "aspect-video",
    "9:16": "aspect-[9/16]",
  };

  const showVideo = isHovered && type === "video";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative group",
        aspectRatioClasses[aspectRatio],
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {type === "image" && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover w-full h-full rounded-lg"
          onLoad={handleLoad}
        />
      )}
      {type === "video" && thumbnail && (
        <Image
          src={thumbnail}
          alt={alt}
          fill
          className={cn(
            "object-cover w-full h-full rounded-lg transition-opacity",
            showVideo ? "opacity-0" : "opacity-100"
          )}
          onLoad={handleLoad}
        />
      )}
      {type === "video" && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          className={cn(
            "object-cover w-full h-full rounded-lg transition-opacity",
            showVideo ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity",
          isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-semibold">@{author}</p>
          <div className="flex items-center space-x-1">
            <Heart size={16} />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
