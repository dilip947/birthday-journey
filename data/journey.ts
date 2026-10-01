export type JourneyChapter = {
  id: string;
  date: string;
  title: string;
  description: string;
  photos: string[];
};

export const journey: JourneyChapter[] = [
  {
    id: "beginning",
    date: "DATE TO ADD",
    title: "The beginning",
    description: "We will replace this with the real story of how everything started.",
    photos: [],
  },
  {
    id: "first-memory",
    date: "DATE TO ADD",
    title: "The first memory",
    description: "A placeholder for one of the moments that became important to us.",
    photos: [],
  },
  {
    id: "today",
    date: "TODAY",
    title: "Where we are now",
    description: "The current chapter of the story.",
    photos: [],
  },
];
