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
  try {
    const body = await request.json();
    const { name, roles = [], events = [] } = body;

    // --- VALIDASI DASAR ---
    if (!name || !roles.length || !events.length) {
      return NextResponse.json(
        { error: "Name, roles, dan events wajib diisi." },
        { status: 400 }
      );
    }

    // --- VALIDASI ROLES ---
    const allowedRoles = ["couple", "dzihni_parent", "evans_parent"];
    if (roles.length !== 1 || !allowedRoles.includes(roles[0])) {
      return NextResponse.json(
        { error: "Roles tidak valid." },
        { status: 400 }
      );
    }

    // --- VALIDASI EVENTS ---
    const allowedEvents = ["akad", "resepsi"];
    const invalidEvent = events.some((ev: string) => !allowedEvents.includes(ev));
    if (invalidEvent) {
      return NextResponse.json(
        { error: "Events tidak valid." },
        { status: 400 }
      );
    }

    // --- Generate code ---
    let code = generateCode("w");
    for (let i = 0; i < 5; i++) {
      const [exists] = await pool.query("SELECT id FROM guests WHERE code = ?", [
        code,
      ]);
      // @ts-ignore
      if ((exists as any[]).length === 0) break;
      code = generateCode("w");
    }

    // --- INSERT DATABASE ---
    const [result] = await pool.query(
      "INSERT INTO guests (code, name, roles, events) VALUES (?, ?, ?, ?)",
      [code, name, JSON.stringify(roles), JSON.stringify(events)]
    );

    return NextResponse.json(
      {
        id: (result as any).insertId,
        code,
        name,
        roles,
        events,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

