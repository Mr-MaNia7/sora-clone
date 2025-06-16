"use client";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/lib/mock-data";
import { motion } from "framer-motion";

interface SkeletonCardProps {
  aspectRatio: AspectRatio;
}

export function SkeletonCard({ aspectRatio }: SkeletonCardProps) {
  const aspectRatioClasses = {
    "1:1": "aspect-square",
    "16:9": "aspect-video",
    "9:16": "aspect-[9/16]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-neutral-800 rounded-lg animate-pulse",
        aspectRatioClasses[aspectRatio]
      )}
    />
  );
}
