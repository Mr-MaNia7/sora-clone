import { Editor } from "@/components/Editor";
import { getMediaItemById } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default function EditPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const item = getMediaItemById(id);

  if (!item) {
    notFound();
  }

  return <Editor item={item} />;
} 