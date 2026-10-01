"use client";

import { useRef, useState } from "react";

export function useAudio(src: string) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    if (!audio.current) audio.current = new Audio(src);

    if (playing) {
      audio.current.pause();
      setPlaying(false);
      return;
    }

    await audio.current.play();
    setPlaying(true);
  };

  return { toggle, playing };
}
