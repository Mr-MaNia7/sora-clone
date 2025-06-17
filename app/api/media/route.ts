import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { MediaItem } from "@/lib/api-types";

const mediaFilePath = path.join(process.cwd(), "data", "media.json");

async function getAllMedia(): Promise<MediaItem[]> {
  try {
    const mediaData = await fs.readFile(mediaFilePath, "utf-8");
    return JSON.parse(mediaData);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }
    console.error("Failed to read media data:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const allMedia = await getAllMedia();

    if (id) {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }
      const item = allMedia.find((item) => item.id === numericId);
      if (!item) {
        return NextResponse.json({ error: "Media not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "8", 10);
    const typeFilter = searchParams.get("type");

    // Filter by media type if specified
    let filteredMedia = allMedia;
    if (typeFilter && (typeFilter === "image" || typeFilter === "video")) {
      filteredMedia = allMedia.filter((item) => item.type === typeFilter);
    }

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedMedia = filteredMedia.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedMedia,
      nextPage: endIndex < filteredMedia.length ? page + 1 : undefined,
    });
  } catch (error) {
    console.error("Failed to fetch media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}
