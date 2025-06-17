import { HomePage } from "@/components/HomePage";
import { getRandomSuggestions } from "@/lib/suggestions";

export default async function VideosPage() {
  const suggestions = getRandomSuggestions();

  return (
    <HomePage 
      suggestions={suggestions}
      pageType="videos"
      pageTitle="Videos"
      defaultAspectRatio="16:9"
      mediaType="video"
    />
  );
} 