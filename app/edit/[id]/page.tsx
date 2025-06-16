import { Editor } from "@/components/Editor";
import { MediaItem } from "@/lib/api-types";
import { notFound } from "next/navigation";

async function getMediaItem(id: number): Promise<MediaItem | null> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/media?id=${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function EditPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const item = await getMediaItem(id);

  if (!item) {
    notFound();
  }

  return <Editor item={item} />;
} 