// PUBLIC_INTERFACE
export function normalizeRepoInputToKey(input) {
  /** Normalize user input into "owner/repo" (supports "owner/repo" or GitHub URLs). */
  if (!input) return "";
  const raw = String(input).trim();
  if (!raw) return "";

  // Accept "owner/repo"
  const directMatch = raw.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/);
  if (directMatch) return `${directMatch[1]}/${directMatch[2]}`;

  // Accept "https://github.com/owner/repo" (+ optional trailing segments)
  try {
    const url = new URL(raw);
    if (url.hostname !== "github.com") return "";
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return "";
    return `${parts[0]}/${parts[1]}`;
  } catch {
    return "";
  }
}
