export function generateCode(prefix = "w", length = 6) {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789"; 
  let s = "";
  for (let i = 0; i < length; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}${s}`;
}
