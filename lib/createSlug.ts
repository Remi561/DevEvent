export function createSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFKD") // normalize accents (é → e)
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters & emojis
    .replace(/\s+/g, "-") // convert spaces to hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // trim hyphens from start & end
}
