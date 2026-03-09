/** Base path for all software/product pages. Homepage stays at /. */
export const BASE_PATH = "/software";

/** Prefixed path for internal links (use for all pages except homepage). */
export function softwarePath(path: string): string {
  if (path === "/" || path === "") return "/";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}
