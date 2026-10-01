import type { Memory } from "@/types/memory";

export function MemoryCard({ memory }: { memory: Memory }) {
  return <article><h3>{memory.title}</h3><p>{memory.story}</p></article>;
}
