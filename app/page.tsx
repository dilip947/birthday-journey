"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function getBirthday() {
  const now = new Date();

  let birthday = new Date(
    now.getFullYear(),
    9,
    11,
    0,
    0,
    0,
    0
  );

  if (now >= birthday) {
    birthday = new Date(
      now.getFullYear() + 1,
      9,
      11,
      0,
      0,
      0,
      0
    );
  }

  return birthday;
}

function getTimeLeft() {
  const now = new Date();
  const birthday = getBirthday();

  const difference = Math.max(
    birthday.getTime() - now.getTime(),
    0
  );

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(
    getTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0b0f] px-6 text-[#f8f1e8]">

      {/* Ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9d5366]/20 blur-[150px]"
      />

      <div className="relative z-10 w-full max-w-4xl text-center">

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-7 text-[10px] uppercase tracking-[0.5em] text-[#e9a8b5]/70 md:text-xs"
        >
          Something beautiful is coming...
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display text-6xl leading-[0.9] tracking-[-0.04em] md:text-8xl"
        >
          Your birthday
          <br />
          <span className="text-[#e9a8b5]">
            is coming...
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
          }}
          className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/45 md:text-base"
        >
          I didn't want to celebrate just one day.
          <br />
          I wanted to make the days before it special too. ❤️
        </motion.p>

        {/* Countdown */}
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
            delay: 1,
            duration: 0.9,
          }}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-2.5 md:gap-5"
        >
          <CountdownBox
            value={timeLeft.days}
            label="Days"
          />

          <CountdownBox
            value={timeLeft.hours}
            label="Hours"
          />

          <CountdownBox
            value={timeLeft.minutes}
            label="Minutes"
          />

          <CountdownBox
            value={timeLeft.seconds}
            label="Seconds"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.3,
            duration: 0.8,
          }}
          className="mt-8 text-[10px] uppercase tracking-[0.35em] text-white/25"
        >
          Until October 11 ❤️
        </motion.p>

        {/* Birthday Week button */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.6,
            duration: 0.8,
          }}
          className="mt-12"
        >
          <Link
            href="/week"
            className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#e9a8b5] px-9 text-sm font-medium text-[#171319] shadow-[0_10px_40px_rgba(233,168,181,0.15)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#f2bdc8]"
          >
            Click here to go to Birthday Week →
          </Link>
        </motion.div>

      </div>
    </main>
  );
}

function CountdownBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-2 py-5 backdrop-blur-sm md:px-6 md:py-7">
      <div className="font-display text-3xl text-[#e9a8b5] md:text-5xl">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-2 text-[8px] uppercase tracking-[0.2em] text-white/30 md:text-[10px] md:tracking-[0.25em]">
        {label}
      </div>
    </div>
  );
}