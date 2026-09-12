import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/services/email";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", issues: parsed.error.flatten() }, { status: 400 });
  }

  const result = await sendContactEmail(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, mode: result.mode });
}
