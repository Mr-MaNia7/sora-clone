import { HomePage } from "@/components/HomePage";
import { getRandomSuggestions } from "@/lib/suggestions";

export default async function ImagesPage() {
  const suggestions = getRandomSuggestions();

  return (
    <HomePage 
      suggestions={suggestions}
      pageType="images"
      pageTitle="Images"
      defaultAspectRatio="1:1"
      mediaType="image"
    />
  );
} 