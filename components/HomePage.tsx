"use client";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Bell, UserCircle, Settings, Smartphone, Square, RectangleHorizontal } from "lucide-react";
import { PromptBar } from "./PromptBar";
import { Suggestion } from "@/lib/suggestions";
import { useSharedImageGeneration } from "@/contexts/ImageGenerationContext";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  MODEL_CONFIGS,
  PROVIDER_ORDER,
  ProviderKey,
} from "@/lib/provider-config";
import { MediaCard } from "./MediaCard";
import { MediaItem, AspectRatio } from "@/lib/api-types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "./SkeletonCard";
import { motion } from "framer-motion";

interface FetchMediaResponse {
  data: MediaItem[];
  nextPage: number | undefined;
}

const fetchMedia = async ({ pageParam = 0 }: { pageParam: number }): Promise<FetchMediaResponse> => {
  const pageSize = 8;
  const response = await fetch(`/api/media?page=${pageParam}&pageSize=${pageSize}`);
  if (!response.ok) {
    throw new Error('Failed to fetch media');
  }
  return response.json();
};

export function HomePage({ suggestions }: { suggestions: Suggestion[] }) {
  const {
    images: generatedImages,
    isLoading: isGenerating,
    startGeneration,
    activePrompt,
    generationAspectRatio,
  } = useSharedImageGeneration();
  
  const router = useRouter();
  const queryClient = useQueryClient();
  const [viewAspectRatio, setViewAspectRatio] = useState<AspectRatio | "all">("all");
  const masonryRef = useRef<HTMLDivElement>(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isInitialLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["media"],
    queryFn: fetchMedia,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  const handleCardClick = (item: MediaItem) => {
    router.push(`/edit/${item.id}`);
  };

  // Masonry layout function
  const layoutMasonry = useCallback(() => {
    if (!masonryRef.current) return;
    
    const container = masonryRef.current;
    const items = Array.from(container.children) as HTMLElement[];
    const containerWidth = container.offsetWidth;
    const gap = 16; // 1rem = 16px
    
    // Calculate number of columns based on screen size
    let columns = 1;
    if (containerWidth >= 1024) columns = 4; // lg
    else if (containerWidth >= 768) columns = 3; // md
    else if (containerWidth >= 640) columns = 2; // sm
    
    const columnWidth = (containerWidth - gap * (columns - 1)) / columns;
    const columnHeights = new Array(columns).fill(0);
    
    items.forEach((item, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Position the item
      const x = shortestColumnIndex * (columnWidth + gap);
      const y = columnHeights[shortestColumnIndex];
      
      item.style.position = 'absolute';
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.width = `${columnWidth}px`;
      
      // Update column height
      columnHeights[shortestColumnIndex] += item.offsetHeight + gap;
    });
    
    // Set container height
    container.style.height = `${Math.max(...columnHeights)}px`;
  }, []);

  useEffect(() => {
    if (generatedImages.length > 0 && !isGenerating) {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    }
  }, [generatedImages, isGenerating, queryClient]);

  const [selectedModels, setSelectedModels] = useState<
    Record<ProviderKey, string>
  >(MODEL_CONFIGS.performance);

  const handlePromptSubmit = (newPrompt: string, aspectRatio: AspectRatio) => {
    const activeProviders: ProviderKey[] = ['vertex']; // Using only one provider
    const providerToModel = {
      replicate: selectedModels.replicate,
      vertex: selectedModels.vertex,
      openai: selectedModels.openai,
      fireworks: selectedModels.fireworks,
    };
    if (activeProviders.length > 0) {
      startGeneration(newPrompt, activeProviders, providerToModel, aspectRatio);
    }
  };
  
  const allMediaItems = data?.pages.flatMap(page => page.data) ?? [];

  const filteredMediaItems = viewAspectRatio === 'all'
    ? allMediaItems
    : allMediaItems.filter(item => item.aspectRatio === viewAspectRatio);

  // Layout masonry when items change or window resizes
  useEffect(() => {
    const timer = setTimeout(layoutMasonry, 100);
    return () => clearTimeout(timer);
  }, [filteredMediaItems, layoutMasonry]);

  useEffect(() => {
    const handleResize = () => layoutMasonry();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layoutMasonry]);

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800 flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Explore</h1>
          <div className="flex items-center space-x-2">
             <Button variant={viewAspectRatio === 'all' ? "secondary" : "ghost"} onClick={() => setViewAspectRatio('all')}>All</Button>
             <Button variant={viewAspectRatio === '9:16' ? "secondary" : "ghost"} size="icon" onClick={() => setViewAspectRatio('9:16')}><Smartphone/></Button>
             <Button variant={viewAspectRatio === '1:1' ? "secondary" : "ghost"} size="icon" onClick={() => setViewAspectRatio('1:1')}><Square/></Button>
             <Button variant={viewAspectRatio === '16:9' ? "secondary" : "ghost"} size="icon" onClick={() => setViewAspectRatio('16:9')}><RectangleHorizontal/></Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </div>
        </header>
        <div className="flex-1 p-8">
          {isInitialLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} aspectRatio={i % 2 === 0 ? "9:16" : "16:9"} />
              ))}
            </div>
          ) : (
          <>
            {(isGenerating) && (
              <div className="flex justify-center items-center h-full">
                <div className="text-white">Generating...</div>
              </div>
            )}
            <motion.div 
              ref={masonryRef} 
              className="relative w-full"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {filteredMediaItems.map((item, index) => {
                 if (filteredMediaItems.length === index + 1) {
                  return (
                    <motion.div 
                      ref={lastItemRef} 
                      key={item.id} 
                      onClick={() => handleCardClick(item)}
                      variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } }}
                    >
                      <MediaCard {...item} onLoad={layoutMasonry} />
                    </motion.div>
                  );
                }
                return (
                  <motion.div 
                    key={item.id} 
                    onClick={() => handleCardClick(item)}
                    variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } }}
                  >
                    <MediaCard {...item} onLoad={layoutMasonry} />
                  </motion.div>
                )
              })}
            </motion.div>
            {isFetchingNextPage && (
               <div className="text-center mt-8">
                <p>Loading more...</p>
              </div>
            )}
          </>
          )}
        </div>
        <PromptBar
          onSubmit={handlePromptSubmit}
          isLoading={isGenerating}
          suggestions={suggestions}
        />
      </main>
    </div>
  );
} 