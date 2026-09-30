"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type DayData = {
  day: number;
  title: string;
  image: string;
  paragraph: string;
  coupons: string[];
};

const dayData: Record<string, DayData> = {
  "1": {
    day: 1,
    title: "The Beginning",
    image: "/images/hero/1.JPG",

    paragraph: `The countdown has officially begun. ❤️ Your birthday is getting closer, and honestly, I think I'm more excited than you are. There are so many little things I want to do for you, so many surprises waiting to happen, and a whole lot of love that I want to put into these next few days. I don't want your birthday to be just one ordinary day on the calendar. I want the days leading up to it to feel special too — filled with little smiles, unexpected moments, cute surprises, and reminders of how much you mean to me. So consider today the beginning of your little birthday journey. There are still more days to go, and I have a lot planned for my favorite person. For now, enjoy today's little surprises... and don't forget to scratch your coupons. 😌❤️`,

    coupons: [
      "One Long Hug 🫂❤️",
      "One Kiss 💋❤️",
      "Hold My Hand 🤝❤️",
    ],
  },

  "2": {
    day: 2,
    title: "A Little More Love",
    image: "/images/hero/2.JPG",
    paragraph:
      "Another little chapter is waiting for you. ❤️",
    coupons: [],
  },

  "3": {
    day: 3,
    title: "Our Little World",
    image: "/images/hero/3.JPG",
    paragraph:
      "Another day, another little surprise. ❤️",
    coupons: [],
  },

  "4": {
    day: 4,
    title: "More Memories",
    image: "/images/hero/4.JPG",
    paragraph:
      "We're getting closer to your special day. ❤️",
    coupons: [],
  },

  "5": {
    day: 5,
    title: "Halfway There",
    image: "/images/hero/5.JPG",
    paragraph:
      "Five days down, and the surprises are only getting better. ❤️",
    coupons: [],
  },

  "6": {
    day: 6,
    title: "Almost Your Day",
    image: "/images/hero/6.JPG",
    paragraph:
      "The excitement is starting to build. ❤️",
    coupons: [],
  },

  "7": {
    day: 7,
    title: "Getting Closer",
    image: "/images/hero/7.JPG",
    paragraph:
      "Only a few more little surprises before your birthday. ❤️",
    coupons: [],
  },

  "8": {
    day: 8,
    title: "Almost Time",
    image: "/images/memories/9.JPG",
    paragraph:
      "We're entering the final stretch. ❤️",
    coupons: [],
  },

  "9": {
    day: 9,
    title: "One More Sleep",
    image: "/images/memories/10.JPG",
    paragraph:
      "Tomorrow is almost here. ❤️",
    coupons: [],
  },

  "10": {
    day: 10,
    title: "The Final Countdown",
    image: "/images/memories/11.JPG",
    paragraph:
      "Tomorrow is your birthday. And I have something much bigger waiting for you. ❤️",
    coupons: [],
  },
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
  };
}

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

function getBirthdayCountdown(): CountdownTime {
  const now = getIndiaNow();

  let year = now.year;

  if (
    now.month > 10 ||
    (now.month === 10 && now.day > 11)
  ) {
    year += 1;
  }

  const birthdayUTC = Date.UTC(
    year,
    9,
    11,
    -5,
    -30,
    0
  );

  return makeCountdown(
    Math.max(
      birthdayUTC - Date.now(),
      0
    )
  );
}

function getNextDayCountdown(): CountdownTime | null {
  const now = getIndiaNow();

  const currentDay = getCurrentDay();

  if (
    now.month !== 10 ||
    currentDay >= 10
  ) {
    return null;
  }

  const nextDay = currentDay + 1;

  const nextUnlockUTC = Date.UTC(
    now.year,
    9,
    nextDay,
    -5,
    -30,
    0
  );

  return makeCountdown(
    Math.max(
      nextUnlockUTC - Date.now(),
      0
    )
  );
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

export default function DayPage() {
  const params = useParams();

  const day =
    typeof params.day === "string"
      ? params.day
      : "";

  const data = dayData[day];

  const requestedDay = Number(day);

  const [currentDay, setCurrentDay] =
    useState<number | null>(null);

  const [birthdayCountdown, setBirthdayCountdown] =
    useState(getBirthdayCountdown());

  const [nextDayCountdown, setNextDayCountdown] =
    useState(getNextDayCountdown());

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

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b0f] text-white">
        <div className="text-center">
          <h1 className="font-display text-5xl">
            This day doesn't exist.
          </h1>

          <Link
            href="/week"
            className="mt-8 inline-block text-sm text-[#e9a8b5]"
          >
            ← Back to Birthday Countdown
          </Link>
        </div>
      </main>
    );
  }

  if (currentDay === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b0f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#e9a8b5]" />
      </main>
    );
  }

  /*
   * Future days cannot be accessed manually.
   */
  if (requestedDay > currentDay) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0b0f] px-6 text-[#f8f1e8]">

        <div className="relative z-10 w-full max-w-xl text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-3xl">
            🔒
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-[#e9a8b5]/70">
            Day {numberToWord(requestedDay)}
          </p>

          <h1 className="mt-4 font-display text-5xl md:text-6xl">
            Not yet, cutie.
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/40">
            This surprise hasn't arrived yet.
            <br />
            You'll have to wait for its day. ❤️
          </p>

          {nextDayCountdown && (
            <>
              <p className="mt-10 text-[9px] uppercase tracking-[0.35em] text-white/25">
                Next surprise unlocks in
              </p>

              <Countdown
                countdown={nextDayCountdown}
              />
            </>
          )}

          <Link
            href="/week"
            className="mt-10 inline-flex min-h-[50px] items-center rounded-full border border-white/10 px-7 text-xs text-white/50"
          >
            ← Back to today's surprise
          </Link>

        </div>
      </main>
    );
  }

  /*
   * Previous days cannot be opened.
   */
  if (requestedDay < currentDay) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b0f] px-6 text-[#f8f1e8]">

        <div className="text-center">

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#e9a8b5]/70">
            Birthday Celebration
          </p>

          <h1 className="mt-5 font-display text-5xl md:text-6xl">
            That chapter has passed. ❤️
          </h1>

          <p className="mt-5 text-sm text-white/35">
            There is a new surprise waiting for you today.
          </p>

          <Link
            href={`/week/${currentDay}`}
            className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-[#e9a8b5] px-7 text-sm font-medium text-[#171319]"
          >
            Go to today's surprise →
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0b0f] text-[#f8f1e8]">

      {/* Back */}
      <div className="fixed left-5 top-5 z-30 md:left-8 md:top-8">

        <Link
          href="/week"
          className="inline-flex h-11 items-center rounded-full border border-white/10 bg-black/30 px-5 text-xs text-white/60 backdrop-blur-md transition hover:border-white/20 hover:text-white"
        >
          ← Birthday Celebration
        </Link>

      </div>

      {/* Image */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">

        <img
          src={data.image}
          alt={`Day ${data.day}`}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b0f] via-[#0d0b0f]/35 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 md:px-10 md:pb-20">

          <p className="text-[10px] uppercase tracking-[0.45em] text-[#e9a8b5]">
            Day {numberToWord(data.day)}
          </p>

          <h1 className="mt-4 max-w-3xl font-display text-6xl leading-[0.9] md:text-8xl">
            {data.title}
          </h1>

        </div>

      </section>

      {/* Message */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-base leading-8 text-white/65 md:text-lg md:leading-9"
        >
          {data.paragraph}
        </motion.p>

        {/* Coupons */}
        {data.coupons.length > 0 && (
          <section className="mt-20">

            <div className="text-center">

              <p className="text-[10px] uppercase tracking-[0.4em] text-[#e9a8b5]/70">
                Today's little surprises
              </p>

              <h2 className="mt-4 font-display text-5xl md:text-6xl">
                Scratch these
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/35">
  Scratch a coupon today and there's a very high chance I'm covering it today. 😉❤️
  <br />
  If I don't cover it today, that coupon doubles tomorrow. 👀❤️
</p>

            </div>

            <div className="mt-12 space-y-7">

              {data.coupons.map(
                (coupon, index) => (
                  <ScratchCoupon
                    key={coupon}
                    text={coupon}
                    index={index}
                  />
                )
              )}

            </div>

          </section>
        )}

        {/* BIRTHDAY TIMER */}
        <section className="mt-24 border-t border-white/8 pt-12 text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#e9a8b5]/70">
            Until her birthday · October 11
          </p>

          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            The big day is coming... 🎂
          </h2>

          <Countdown
            countdown={birthdayCountdown}
            large
          />

        </section>

        {/* NEXT DAY TIMER */}
        {nextDayCountdown && currentDay < 10 && (
          <section className="mt-16 border-t border-white/8 pt-12 text-center">

            <p className="text-[9px] uppercase tracking-[0.4em] text-white/25">
              Day {numberToWord(currentDay + 1)} unlocks in
            </p>

            <Countdown
              countdown={nextDayCountdown}
            />

            <p className="mt-5 text-xs text-white/20">
              Come back tomorrow for another little surprise. ❤️
            </p>

          </section>
        )}

        {/* FINAL DAY */}
        {currentDay === 10 && (
          <section className="mt-16 border-t border-white/8 pt-12 text-center">

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

      </section>

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
    <div className="mx-auto mt-7 grid max-w-2xl grid-cols-4 gap-2.5 md:gap-4">

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

      <div className="mt-2 text-[8px] uppercase tracking-[0.2em] text-white/25">
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

  return words[number] || number;
}

/* =====================================================
   SCRATCH COUPON
===================================================== */

function ScratchCoupon({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const [scratched, setScratched] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    const canvas =
      document.getElementById(
        `scratch-${index}`
      ) as HTMLCanvasElement | null;

    if (!canvas) return;

    const setup = () => {
      const rect =
        canvas.getBoundingClientRect();

      const scale =
        window.devicePixelRatio || 1;

      canvas.width =
        rect.width * scale;

      canvas.height =
        rect.height * scale;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) return;

      ctx.setTransform(
        scale,
        0,
        0,
        scale,
        0,
        0
      );

      ctx.fillStyle = "#8d5363";

      ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
      );

      ctx.fillStyle =
        "rgba(255,255,255,0.18)";

      ctx.font =
        "600 11px Manrope, sans-serif";

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        "SCRATCH HERE ✨",
        rect.width / 2,
        rect.height / 2
      );
    };

    setup();

    window.addEventListener(
      "resize",
      setup
    );

    return () => {
      window.removeEventListener(
        "resize",
        setup
      );
    };
  }, [index]);

  const scratch = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas =
      event.currentTarget;

    const rect =
      canvas.getBoundingClientRect();

    const scale =
      window.devicePixelRatio || 1;

    const x =
      (event.clientX - rect.left) *
      scale;

    const y =
      (event.clientY - rect.top) *
      scale;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    ctx.globalCompositeOperation =
      "destination-out";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      42 * scale,
      0,
      Math.PI * 2
    );

    ctx.fill();

    const next =
      Math.min(
        progress + 10,
        100
      );

    setProgress(next);

    if (next >= 100) {
      setScratched(true);

      try {
        navigator.vibrate?.(25);
      } catch {}
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
    >

      <div className="relative min-h-[150px]">

        <div className="flex min-h-[150px] items-center justify-center px-7 text-center">

          <div>

            <p className="text-[9px] uppercase tracking-[0.35em] text-[#e9a8b5]/60">
              Birthday Coupon
            </p>

            <h3 className="mt-3 font-display text-3xl md:text-4xl">
              {text}
            </h3>

            {scratched && (
              <p className="mt-3 text-xs text-[#e9a8b5]">
                Coupon unlocked. ❤️
              </p>
            )}

          </div>

        </div>

        {!scratched && (
          <canvas
            id={`scratch-${index}`}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(
                event.pointerId
              );

              scratch(event);
            }}
            onPointerMove={(event) => {
              if (event.buttons === 1) {
                scratch(event);
              }
            }}
            className="absolute inset-0 h-full w-full cursor-pointer touch-none"
          />
        )}

      </div>

      {!scratched && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.3em] text-white/20">
          Scratch to reveal
        </div>
      )}

    </motion.div>
  );
}