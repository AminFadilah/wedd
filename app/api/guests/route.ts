import { NextResponse } from "next/server";
import pool from "../../../lib/mysql";
import { generateCode } from "../../../lib/generateCode";

export async function GET() {
  const [rows] = await pool.query(
    "SELECT id, code, name, roles, events, created_at FROM guests ORDER BY id DESC LIMIT 500"
  );
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, roles = [], events = [] } = body;
  if (!name)
    return NextResponse.json({ error: "name required" }, { status: 400 });

  // create unique code (attempts a few times)
  let code = generateCode("w");
  for (let i = 0; i < 5; i++) {
    const [exists] = await pool.query("SELECT id FROM guests WHERE code = ?", [
      code,
    ]);
    // @ts-ignore
    if ((exists as any[]).length === 0) break;
    code = generateCode("w");
  }

  const [result] = await pool.query(
    "INSERT INTO guests (code, name, roles, events) VALUES (?, ?, ?, ?)",
    [code, name, JSON.stringify(roles), JSON.stringify(events)]
  );

  return NextResponse.json({
    id: (result as any).insertId,
    code,
    name,
    roles,
    events,
  });
}
