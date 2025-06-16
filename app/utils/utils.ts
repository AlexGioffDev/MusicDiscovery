export function cleanBioText(bio: string): string {
  // Pattern to match:
  // 1. Optional content before "Read more on Last.fm" (like "See also Rose")
  // 2. The Last.fm link and everything after it
  const lastFmPattern =
    /(?:See also [^<]+)?<a href="https:\/\/www\.last\.fm[^>]+>Read more on Last\.fm<\/a>\..*$/;

  // Remove the matched pattern
  const cleanedBio = bio.replace(lastFmPattern, "").trim();

  return cleanedBio;
}
