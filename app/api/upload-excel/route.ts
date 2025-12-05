import { NextResponse } from "next/server";
import pool from "../../../lib/mysql";
import { parseExcel } from "../../../lib/excelParser";
import { generateCode } from "../../../lib/generateCode";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as any;
  if (!file)
    return NextResponse.json({ error: "file required" }, { status: 400 });

  const buffer = await file.arrayBuffer();
  const rows = parseExcel(buffer);

  const inserted: any[] = [];
  for (const row of rows) {
    const code = generateCode("w");
    await pool.query(
      "INSERT INTO guests (code, name, roles, events) VALUES (?, ?, ?, ?)",
      [code, row.name, JSON.stringify(row.roles), JSON.stringify(row.events)]
    );
    inserted.push({
      code,
      name: row.name,
      roles: row.roles,
      events: row.events,
    });
  }

  return NextResponse.json({ inserted });
}
