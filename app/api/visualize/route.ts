import { NextResponse } from "next/server";
import { visualizeTerrace } from "@/lib/services/visualizer";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "image required" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type) || file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "unsupported image" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await visualizeTerrace({
    imageBase64: buffer.toString("base64"),
    mimeType: file.type,
  });

  return NextResponse.json({
    image: result.imageBase64,
    mimeType: result.mimeType,
    mocked: result.mocked,
    provider: result.provider,
  });
}
