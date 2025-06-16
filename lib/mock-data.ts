export type AspectRatio = "1:1" | "16:9" | "9:16";

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

const baseMedia: Omit<MediaItem, "id">[] = [
  {
    src: "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Abstract painting",
    author: "big_dog",
    likes: 238,
    type: "image",
    aspectRatio: "9:16",
    prompt:
      "A beautiful abstract painting, with vibrant colors and flowing lines.",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    alt: "Jellyfish",
    author: "jelly_master",
    likes: 487,
    type: "video",
    aspectRatio: "16:9",
  },
  {
    src: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Foggy forest",
    author: "misty_morning",
    likes: 102,
    type: "image",
    aspectRatio: "16:9",
  },
  {
    src: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Beach from above",
    author: "drone_pilot",
    likes: 876,
    type: "image",
    aspectRatio: "1:1",
    prompt: "An aerial drone shot of a beautiful beach with turquoise water.",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    alt: "City traffic at night",
    author: "urban_explorer",
    likes: 345,
    type: "video",
    aspectRatio: "16:9",
  },
  {
    src: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Tropical beach",
    author: "island_hopper",
    likes: 912,
    type: "image",
    aspectRatio: "9:16",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    alt: "A girl dancing",
    author: "dancer_girl",
    likes: 564,
    type: "video",
    aspectRatio: "16:9",
  },
  {
    src: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A concert",
    author: "rock_star",
    likes: 1023,
    type: "image",
    aspectRatio: "1:1",
  },
];

// Create a long list of mock data by duplicating and shuffling
export const mockMedia: MediaItem[] = Array.from({ length: 5 }, (_, i) =>
  baseMedia.map((item, index) => ({
    ...item,
    id: i * baseMedia.length + index,
    likes: Math.floor(Math.random() * 1000),
  }))
).flat();

export function getMediaItemById(id: number): MediaItem | undefined {
  return mockMedia.find((item) => item.id === id);
}
