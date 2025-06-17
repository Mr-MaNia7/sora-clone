"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ImageIcon,
  Plus,
  ArrowUp,
  HelpCircle,
  RectangleHorizontal,
  Grip,
  SlidersHorizontal,
  Check,
  Smartphone,
  Square,
  Video,
  Image,
  Copy,
  Loader2,
} from "lucide-react";
import { Suggestion } from "@/lib/suggestions";
import { useState } from "react";

type AspectRatio = "1:1" | "16:9" | "9:16";
type MediaType = "Image" | "Video";
type VariationCount = 1 | 2 | 4;

const aspectRatios: { ratio: AspectRatio; icon: React.ReactNode }[] = [
  { ratio: "9:16", icon: <Smartphone size={16} /> },
  { ratio: "1:1", icon: <Square size={16} /> },
  { ratio: "16:9", icon: <RectangleHorizontal size={16} /> },
];

const mediaTypes: { type: MediaType; icon: React.ReactNode }[] = [
  { type: "Image", icon: <Image size={16} /> },
  { type: "Video", icon: <Video size={16} /> },
];

const variationOptions: { count: VariationCount; icon: React.ReactNode; label: string }[] = [
  { count: 1, icon: <Square size={16} />, label: "1 image" },
  { count: 2, icon: <Copy size={16} />, label: "2 images" },
  { count: 4, icon: <Grip size={16} />, label: "4 images" },
];

interface PromptBarProps {
  onSubmit: (prompt: string, aspectRatio: AspectRatio, variations: VariationCount) => void;
  isLoading: boolean;
  suggestions: Suggestion[];
  initialPrompt?: string;
  placeholder?: string;
  defaultMediaType?: MediaType;
}

export function PromptBar({
  onSubmit,
  isLoading,
  suggestions,
  initialPrompt = "",
  placeholder = "Describe your image...",
  defaultMediaType = "Image",
}: PromptBarProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] =
    useState<AspectRatio>("9:16");
  const [mediaType, setMediaType] = useState<MediaType>(defaultMediaType);
  const [variations, setVariations] = useState<VariationCount>(1);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, selectedAspectRatio, variations);
      setPrompt("");
    }
  };

  const selectedRatioData = aspectRatios.find(
    (r) => r.ratio === selectedAspectRatio
  );

  const selectedMediaTypeData = mediaTypes.find(
    (m) => m.type === mediaType
  );
  
  const selectedVariationData = variationOptions.find(
    (v) => v.count === variations
  );

  return (
    <div className="fixed inset-x-0 bottom-8 flex justify-center">
      <div className="w-full max-w-4xl px-4">
        {isFocused && suggestions.length > 0 && (
          <div className="bg-neutral-800/80 backdrop-blur-lg rounded-xl p-3 mb-2">
            <ul className="flex gap-2 flex-wrap">
              {suggestions.map((s) => (
                <li key={s.prompt}>
                  <Button
                    variant="ghost"
                    className="bg-neutral-700/80 rounded-lg text-white"
                    onClick={() => {
                      const newPrompt = s.prompt;
                      setPrompt(newPrompt);
                      onSubmit(newPrompt, selectedAspectRatio, variations);
                      setIsFocused(false);
                    }}
                  >
                    {s.prompt}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <form
          onSubmit={handleFormSubmit}
          className="bg-neutral-800/80 backdrop-blur-lg rounded-full p-2 flex items-center gap-1 text-white"
        >
          <fieldset disabled={isLoading} className="contents">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-neutral-700/80"
                >
                  <Plus />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-neutral-800 border-neutral-700 text-white rounded-xl">
                Upload Image or Video
              </PopoverContent>
            </Popover>

            <Input
              placeholder={placeholder}
              className="flex-1 bg-transparent border-0 focus:ring-0 placeholder:text-neutral-400"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="default"
                  className="rounded-full bg-neutral-700/80 hover:bg-neutral-600/80 gap-1.5 h-9 px-3"
                >
                  {selectedMediaTypeData?.icon}
                  <span className="text-sm">{mediaType}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-neutral-800 border-neutral-700 text-white rounded-xl">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Type</h4>
                  <div className="space-y-1">
                    {mediaTypes.map(({ type, icon }) => (
                      <Button
                        key={type}
                        variant="ghost"
                        className={`w-full justify-between hover:bg-neutral-700/80 ${
                          mediaType === type && "bg-neutral-700"
                        }`}
                        onClick={() => setMediaType(type)}
                      >
                        <div className="flex items-center gap-2">
                          {icon}
                          <span>{type}</span>
                        </div>
                        {mediaType === type && <Check size={16} />}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full bg-neutral-700/80 hover:bg-neutral-600/80 gap-1.5 h-9 px-3"
                >
                  {selectedRatioData?.icon}
                  <span className="text-sm">{selectedAspectRatio}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-neutral-800 border-neutral-700 text-white rounded-xl">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Aspect ratio</h4>
                  <div className="space-y-1">
                    {aspectRatios.map(({ ratio, icon }) => (
                      <Button
                        key={ratio}
                        variant="ghost"
                        className={`w-full justify-between hover:bg-neutral-700/80 ${
                          selectedAspectRatio === ratio && "bg-neutral-700"
                        }`}
                        onClick={() => setSelectedAspectRatio(ratio)}
                      >
                        <div className="flex items-center gap-2">
                          {icon}
                          <span>{ratio}</span>
                        </div>
                        {selectedAspectRatio === ratio && <Check size={16} />}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full bg-neutral-700/80 hover:bg-neutral-600/80 gap-1.5 h-9 px-3"
                >
                  {selectedVariationData?.icon}
                  <span className="text-sm">{variations}v</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-neutral-800 border-neutral-700 text-white rounded-xl">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Variations</h4>
                  <div className="space-y-1">
                    {variationOptions.map(({ count, icon, label }) => (
                      <Button
                        key={count}
                        variant="ghost"
                        className={`w-full justify-between hover:bg-neutral-700/80 ${
                          variations === count && "bg-neutral-700"
                        }`}
                        onClick={() => setVariations(count)}
                      >
                        <div className="flex items-center gap-2">
                          {icon}
                          <span>{label}</span>
                        </div>
                        {variations === count && <Check size={16} />}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-neutral-700/80 hover:bg-neutral-600/80 h-9 w-9"
                >
                  <SlidersHorizontal size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-neutral-800 border-neutral-700 text-white rounded-xl">
                <div className="space-y-4">
                  <h4 className="font-medium leading-none">
                    Advanced Settings
                  </h4>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Negative prompt
                    </label>
                    <Input
                      className="bg-neutral-700/80 border-neutral-600"
                      placeholder="e.g., ugly, blurry, deformed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      Style
                    </label>
                    {/* This would be a dropdown or select */}
                    <p className="text-sm text-neutral-400">Photorealistic</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-neutral-700/80 hover:bg-neutral-600/80 h-9 w-9"
                >
                  <HelpCircle size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-neutral-800 border-neutral-700 text-white rounded-xl">
                Help
              </PopoverContent>
            </Popover>
          </fieldset>

          <Button
            size="icon"
            className="rounded-full bg-neutral-700 hover:bg-neutral-600 h-9 w-9"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowUp size={16} />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
} 