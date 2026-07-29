import { NextResponse } from "next/server";
import { saveDeveloperMessage } from "@/lib/firestore";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "รูปแบบข้อมูลไม่ถูกต้อง" } },
      { status: 400 }
    );
  }

  const message =
    body && typeof body === "object"
      ? (body as Record<string, unknown>).developerMessage
      : undefined;

  if (
    !/^[A-Za-z0-9_-]{10,40}$/.test(id) ||
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 500
  ) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "กรุณากรอกข้อความไม่เกิน 500 ตัวอักษร",
        },
      },
      { status: 422 }
    );
  }

  try {
    await saveDeveloperMessage(id, message);
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "STORAGE_UNAVAILABLE",
          message: "ยังบันทึกข้อความไม่ได้ กรุณาลองอีกครั้ง",
        },
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ data: { saved: true } });
}
