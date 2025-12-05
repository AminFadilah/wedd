import { NextResponse } from "next/server";
import pool from "../../../lib/mysql";
import { RowDataPacket } from "mysql2/promise";

interface Guest extends RowDataPacket {
  id: number;
  code: string;
  name: string;
  roles: string | string[];
  events: string | string[];
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "code required" }, { status: 400 });
  }

  // Query case-insensitive
  const [rows] = await pool.query<Guest[]>(
    `SELECT id, code, name, roles, events
     FROM guests
     WHERE LOWER(code) = LOWER(?)
     LIMIT 1`,
    [code]
  );

  const guest = rows[0];

  if (!guest) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // Parse JSON roles
  try {
    guest.roles =
      typeof guest.roles === "string" ? JSON.parse(guest.roles) : guest.roles;
  } catch {
    guest.roles = [];
  }

  // Parse JSON events
  try {
    guest.events =
      typeof guest.events === "string" ? JSON.parse(guest.events) : guest.events;
  } catch {
    guest.events = [];
  }

  return NextResponse.json(guest);
}
