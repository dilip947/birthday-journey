"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const days = [
  {
    day: 1,
    title: "The Beginning",
    subtitle: "The countdown starts here",
    image: "/images/hero/1.JPG",
  },
  {
    day: 2,
    title: "A Little More Love",
    subtitle: "Another little surprise",
    image: "/images/hero/2.JPG",
  },
  {
    day: 3,
    title: "Our Little World",
    subtitle: "A day for another memory",
    image: "/images/hero/3.JPG",
  },
  {
    day: 4,
    title: "More Memories",
    subtitle: "We're getting closer",
    image: "/images/hero/4.JPG",
  },
  {
    day: 5,
    title: "Halfway There",
    subtitle: "Five days to go",
    image: "/images/hero/5.JPG",
  },
  {
    day: 6,
    title: "Almost Your Day",
    subtitle: "The excitement grows",
    image: "/images/hero/6.JPG",
  },
  {
    day: 7,
    title: "Getting Closer",
    subtitle: "Just a few more surprises",
    image: "/images/hero/7.JPG",
  },
  {
    day: 8,
    title: "Almost Time",
    subtitle: "The final countdown",
    image: "/images/memories/9.JPG",
  },
  {
    day: 9,
    title: "One More Sleep",
    subtitle: "Tomorrow is your day",
    image: "/images/memories/10.JPG",
  },
  {
    day: 10,
    title: "Your Birthday",
    subtitle: "The big day",
    image: "/images/memories/11.JPG",
  },
];

export function BirthdayWeek() {
  const [unlockedDays, setUnlockedDays] =
    useState<number[]>([1]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        "birthday-unlocked-days"
      );

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setUnlockedDays(
            Array.from(
              new Set([1, ...parsed])
            )
          );
        }
      }
    } catch {
      setUnlockedDays([1]);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#0d0b0f] px-5 py-12 text-[#f8f1e8] md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#e9a8b5]/70">
            Ten little days for one beautiful girl
          </p>

          <h1 className="mt-5 font-display text-6xl leading-none md:text-8xl">
            Birthday
            <br />
            <span className="text-[#e9a8b5]">
              Countdown
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/40">
            Your birthday isn't just one day anymore.
            <br />
            There are ten little chapters waiting for you. ❤️
          </p>
        </motion.div>

        {/* Days */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {days.map((item, index) => {
            const unlocked =
              unlockedDays.includes(item.day);

            return (
              <motion.div
                key={item.day}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.55,
                }}
              >
                <Link
                  href={
                    unlocked
                      ? `/week/${item.day}`
                      : "#"
                  }
                  onClick={(event) => {
                    if (!unlocked) {
                      event.preventDefault();
                    }
                  }}
                  className={`group relative block overflow-hidden rounded-3xl border ${
                    unlocked
                      ? "border-[#e9a8b5]/25"
                      : "border-white/8"
                  }`}
                >

                  <div className="relative aspect-[3/4] overflow-hidden">

                    <img
                      src={item.image}
                      alt={`Day ${item.day}`}
                      className={`h-full w-full object-cover transition duration-700 ${
                        unlocked
                          ? "group-hover:scale-105"
                          : "scale-105 grayscale brightness-[0.28]"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Lock */}
                    <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-sm backdrop-blur-md">
                      {unlocked ? "🔓" : "🔒"}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">

                      <p className="text-[9px] uppercase tracking-[0.3em] text-[#e9a8b5]">
                        D{item.day}
                      </p>

                      <h2 className="mt-2 font-display text-2xl leading-tight">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-[11px] leading-5 text-white/45">
                        {unlocked
                          ? item.subtitle
                          : "Locked"}
                      </p>

                    </div>
                  </div>

                </Link>
              </motion.div>
            );
          })}

        </div>

        {/* Footer */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="mx-auto mt-16 max-w-lg text-center text-xs leading-6 text-white/25"
        >
          Only the first day is waiting for you right now.
          <br />
          More surprises will appear as the birthday gets closer. ❤️
        </motion.p>

      </div>
    </main>
  );
}