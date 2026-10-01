import type { JourneyChapter as JourneyChapterType } from "@/types/journey";

export function JourneyChapter({ chapter }: { chapter: JourneyChapterType }) {
  return <article>{chapter.title}</article>;
}
