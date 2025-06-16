"use client";

import { useImageGeneration } from "@/hooks/use-image-generation";
import { createContext, useContext, ReactNode } from "react";

type UseImageGenerationResult = ReturnType<typeof useImageGeneration>;

const ImageGenerationContext = createContext<UseImageGenerationResult | undefined>(
  undefined
);

export function ImageGenerationProvider({ children }: { children: ReactNode }) {
  const imageGeneration = useImageGeneration();
  return (
    <ImageGenerationContext.Provider value={imageGeneration}>
      {children}
    </ImageGenerationContext.Provider>
  );
}

export function useSharedImageGeneration() {
  const context = useContext(ImageGenerationContext);
  if (!context) {
    throw new Error(
      "useSharedImageGeneration must be used within an ImageGenerationProvider"
    );
  }
  return context;
} 