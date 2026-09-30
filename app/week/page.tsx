"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const days = [
  {
    day: 1,
    title: "The Beginning",
    image: "/images/hero/1.JPG",
  },
  {
    day: 2,
    title: "A Little More Love",
    image: "/images/hero/2.JPG",
  },
  {
    day: 3,
    title: "Our Little World",
    image: "/images/hero/3.JPG",
  },
  {
    day: 4,
    title: "More Memories",
    image: "/images/hero/4.JPG",
  },
  {
    day: 5,
    title: "Halfway There",
    image: "/images/hero/5.JPG",
  },
  {
    day: 6,
    title: "Almost Your Day",
    image: "/images/hero/6.JPG",
  },
  {
    day: 7,
    title: "Getting Closer",
    image: "/images/hero/7.JPG",
  },
  {
    day: 8,
    title: "Almost Time",
    image: "/images/memories/9.JPG",
  },
  {
    day: 9,
    title: "One More Sleep",
    image: "/images/memories/10.JPG",
  },
  {
    day: 10,
    title: "The Final Countdown",
    image: "/images/memories/11.JPG",
  },
];

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getIndiaNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (type: string) =>
    Number(
      parts.find((part) => part.type === type)?.value
    );

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
}

/*
  Birthday:
  October 11, 12:00 AM IST
*/
function getBirthdayCountdown(): CountdownTime | null {
  const now = getIndiaNow();

  let birthdayYear = now.year;

  if (
    now.month > 10 ||
    (now.month === 10 && now.day > 11)
  ) {
    birthdayYear += 1;
  }

  // October 11, 00:00 IST = October 10, 18:30 UTC
  const birthdayUTC = Date.UTC(
    birthdayYear,
    9,
    11,
    -5,
    -30,
    0
  );

  const difference = Math.max(
    birthdayUTC - Date.now(),
    0
  );

  return makeCountdown(difference);
}

/*
  Day One = October 1
  Day Two = October 2
  ...
  Day Ten = October 10

  October 11 = Birthday / final day
*/
function getCurrentDay() {
  const now = getIndiaNow();

  if (now.month < 10) {
    return 0;
  }

  if (now.month > 10) {
    return 10;
  }

  if (now.day < 1) {
    return 0;
  }

  if (now.day >= 11) {
    return 10;
  }

  return now.day;
}

/*
  Next day unlocks at midnight IST.
*/
function getNextDayCountdown(): CountdownTime | null {
  const now = getIndiaNow();

  if (now.month !== 10) {
    return null;
  }

  const currentDay = getCurrentDay();

  if (currentDay >= 10) {
    return null;
  }

  const nextDay = currentDay + 1;

  // Midnight IST = previous day 18:30 UTC
  const nextUnlockUTC = Date.UTC(
    now.year,
    9,
    nextDay,
    -5,
    -30,
    0
  );

  const difference = Math.max(
    nextUnlockUTC - Date.now(),
    0
  );

  return makeCountdown(difference);
}

function makeCountdown(
  difference: number
): CountdownTime {
  return {
    days: Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference /
        (1000 * 60 * 60)) %
        24
    ),

    minutes: Math.floor(
      (difference /
        (1000 * 60)) %
        60
    ),

    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

export default function BirthdayWeekPage() {
  const [currentDay, setCurrentDay] =
    useState<number | null>(null);

  const [birthdayCountdown, setBirthdayCountdown] =
    useState<CountdownTime | null>(
      getBirthdayCountdown()
    );

  const [nextDayCountdown, setNextDayCountdown] =
    useState<CountdownTime | null>(
      getNextDayCountdown()
    );

  useEffect(() => {
    const update = () => {
      setCurrentDay(getCurrentDay());
      setBirthdayCountdown(
        getBirthdayCountdown()
      );
      setNextDayCountdown(
        getNextDayCountdown()
      );
    };

    update();

    const timer = setInterval(
      update,
      1000
    );

    return () => clearInterval(timer);
  }, []);

  if (currentDay === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b0f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#e9a8b5]" />
      </main>
    );
  }

  const activeDay =
    days[Math.min(currentDay, 10) - 1];

  return (
    <main className="min-h-screen bg-[#0d0b0f] px-5 py-12 text-[#f8f1e8] md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
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
            A little something for you
          </p>

          <h1 className="mt-5 font-display text-6xl leading-[0.9] md:text-8xl">
            Your Birthday
            <br />
            <span className="text-[#e9a8b5]">
              Celebration
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/40 md:text-base">
            Your birthday celebration starts this month. ❤️
            <br />
            Ten days. Ten little surprises.
            <br />
            One very special birthday.
          </p>

        </motion.div>

        {/* BIRTHDAY COUNTDOWN */}
        {birthdayCountdown && (
          <motion.section
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="mx-auto mt-14 max-w-3xl text-center"
          >

            <p className="text-[9px] uppercase tracking-[0.4em] text-[#e9a8b5]">
              Until her birthday · October 11
            </p>

            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              The big day is coming... 🎂
            </h2>

            <Countdown
              countdown={birthdayCountdown}
              large
            />

          </motion.section>
        )}

        {/* TODAY'S DAY */}
        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
            duration: 0.8,
          }}
          className="mx-auto mt-16 max-w-2xl"
        >

          <p className="mb-5 text-center text-[9px] uppercase tracking-[0.4em] text-white/25">
            Today's surprise
          </p>

          <Link
            href={`/week/${activeDay.day}`}
            className="group block overflow-hidden rounded-[2rem] border border-[#e9a8b5]/20"
          >

            <div className="relative aspect-[4/3] overflow-hidden">

              <img
                src={activeDay.image}
                alt={`Day ${activeDay.day}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">

                <p className="text-[10px] uppercase tracking-[0.35em] text-[#e9a8b5]">
                  Day {numberToWord(activeDay.day)}
                </p>

                <h2 className="mt-2 font-display text-4xl md:text-5xl">
                  {activeDay.title}
                </h2>

                <p className="mt-4 text-xs text-white/50">
                  Open today's surprise →
                </p>

              </div>

            </div>

          </Link>

        </motion.section>

        {/* NEXT DAY COUNTDOWN */}
        {nextDayCountdown && currentDay < 10 && (
          <motion.section
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
            className="mt-20 border-t border-white/8 pt-12 text-center"
          >

            <p className="text-[9px] uppercase tracking-[0.4em] text-white/25">
              Tomorrow's surprise unlocks in
            </p>

            <Countdown
              countdown={nextDayCountdown}
            />

            <p className="mt-5 text-xs text-white/20">
              Come back when the timer reaches zero. ❤️
            </p>

          </motion.section>
        )}

        {/* BIRTHDAY DAY */}
        {currentDay === 10 && (
          <section className="mt-20 border-t border-white/8 pt-12 text-center">

            <p className="text-[10px] uppercase tracking-[0.4em] text-[#e9a8b5]">
              Tomorrow is her birthday 🎂❤️
            </p>

            <p className="mt-4 text-sm text-white/35">
              The final birthday experience is waiting.
            </p>

            <Link
              href="/journey"
              className="mt-7 inline-flex min-h-[54px] items-center rounded-full bg-[#e9a8b5] px-8 text-sm font-medium text-[#171319] transition hover:bg-[#f2bdc8]"
            >
              Enter Final Birthday Surprise →
            </Link>

          </section>
        )}

      </div>
    </main>
  );
}

function Countdown({
  countdown,
  large = false,
}: {
  countdown: CountdownTime;
  large?: boolean;
}) {
  return (
    <div
      className={`mx-auto mt-7 grid max-w-2xl grid-cols-4 gap-2.5 md:gap-4 ${
        large ? "md:max-w-3xl" : ""
      }`}
    >

      <TimeBox
        value={countdown.days}
        label="Days"
        large={large}
      />

      <TimeBox
        value={countdown.hours}
        label="Hours"
        large={large}
      />

      <TimeBox
        value={countdown.minutes}
        label="Minutes"
        large={large}
      />

      <TimeBox
        value={countdown.seconds}
        label="Seconds"
        large={large}
      />

    </div>
  );
}

function TimeBox({
  value,
  label,
  large,
}: {
  value: number;
  label: string;
  large?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm ${
        large
          ? "px-2 py-6 md:px-6 md:py-8"
          : "px-2 py-5 md:px-5 md:py-6"
      }`}
    >

      <div
        className={`font-display text-[#e9a8b5] ${
          large
            ? "text-4xl md:text-5xl"
            : "text-3xl md:text-4xl"
        }`}
      >
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-2 text-[8px] uppercase tracking-[0.2em] text-white/25 md:text-[9px]">
        {label}
      </div>

    </div>
  );
}

function numberToWord(number: number) {
  const words = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
  ];

  return words[number];
}