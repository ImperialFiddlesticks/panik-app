export type PhotoSignType =
  | "noparking"
  | "timelimit"
  | "free"
  | "unknown"
  | "paid";

export async function fakeAnalyzeSign(
  input: File | string,
): Promise<PhotoSignType> {
  await new Promise((r) => setTimeout(r, 900));

  if (typeof input === "string") return input as PhotoSignType;

  const name = input.name.toLowerCase();

  if (
    name.includes("no") ||
    name.includes("forbidden") ||
    name.includes("stop")
  )
    return "noparking";
  if (name.includes("2h") || name.includes("time") || name.includes("hour"))
    return "timelimit";
  if (name.includes("paid") || name.includes("fee") || name.includes("pay"))
    return "paid";
  if (name.includes("free") || name.includes("gratis")) return "free";

  return "unknown";
}
