import { NextResponse } from "next/server";
import { generateCode } from "../../../lib/generateCode";

export async function GET() {
  return NextResponse.json({ code: generateCode("w") });
}
