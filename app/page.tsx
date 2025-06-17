import { HomePage } from "@/components/HomePage";
import { getRandomSuggestions } from "@/lib/suggestions";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <HomePage 
      suggestions={getRandomSuggestions()} 
      pageType="explore"
      pageTitle="Explore"
      defaultAspectRatio="all"
      mediaType="all"
    />
  );
}
