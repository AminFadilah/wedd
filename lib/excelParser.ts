import * as XLSX from "xlsx";

export function parseExcel(buffer: ArrayBuffer) {
  const wb = XLSX.read(buffer, { type: "array" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as Record<
    string,
    any
  >[];
  // Expect columns: name, roles (comma), events (comma)
  return data.map((row) => ({
    name: String(row["name"] || row["Name"] || row["nama"] || ""),
    roles: String(row["roles"] || row["Roles"] || row["role"] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    events: String(row["events"] || row["Events"] || row["event"] || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  }));
}
