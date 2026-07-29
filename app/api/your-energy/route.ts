import { NextResponse } from "next/server";
import {
  createEnergyReading,
  isEnergyInput,
} from "@/lib/your-energy";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "รูปแบบข้อมูลไม่ถูกต้อง" } },
      { status: 400 }
    );
  }

  if (!isEnergyInput(body)) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "กรุณากรอกชื่อ วันเกิด และตำแหน่งให้ครบถ้วน",
        },
      },
      { status: 422 }
    );
  }

  return NextResponse.json({ data: createEnergyReading(body) });
}
