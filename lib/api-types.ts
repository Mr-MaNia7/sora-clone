import { ProviderKey } from "./provider-config";

export type AspectRatio = "1:1" | "16:9" | "9:16";

export interface GenerateImageRequest {
  prompt: string;
  provider: ProviderKey;
  modelId: string;
  aspectRatio: AspectRatio;
}

export interface GenerateImageResponse {
  image?: string;
  error?: string;
}

export interface MediaItem {
  id: number;
  src: string;
  alt: string;
  author: string;
  likes: number;
  type: "image" | "video";
  aspectRatio: AspectRatio;
  thumbnail?: string;
  prompt?: string;
}
