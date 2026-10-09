"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

/* =========================================================
   PHOTOS
========================================================= */

const photos = {
  1: "/images/hero/1.JPG",
  2: "/images/hero/2.JPG",
  3: "/images/hero/3.JPG",
  4: "/images/hero/4.JPG",
  5: "/images/hero/5.JPG",
  6: "/images/hero/6.JPG",
  7: "/images/hero/7.JPG",

  9: "/images/memories/9.JPG",
  10: "/images/memories/10.JPG",
  11: "/images/memories/11.JPG",
  12: "/images/memories/12.JPG",
  13: "/images/memories/13.jpeg",
  14: "/images/memories/14.JPG",
  15: "/images/memories/15.JPG",
  16: "/images/memories/16.JPG",

  17: "/images/finale/17.jpg",
  18: "/images/finale/18.JPG",
  19: "/images/finale/19.JPG",
  20: "/images/finale/20.JPG",
  21: "/images/finale/21.JPG",
  22: "/images/finale/22.JPG",
  23: "/images/finale/23.JPG",
  24: "/images/finale/24.JPG",
  25: "/images/finale/25.JPG",
  26: "/images/finale/26.JPG",
  27: "/images/finale/27.jpeg",
  28: "/images/finale/28.JPG",
};

/* =========================================================
   LOVE / BIRTHDAY LINES
========================================================= */

const photoLines: Record<number, string> = {
  2: "And this is where I start remembering how ridiculously lucky I am to have you. ❤️",

  3: "Happy birthday to the girl who can somehow make even an ordinary photograph feel special. 🥹❤️",

  4: "You are beautiful in photographs, but somehow even more beautiful in all the little moments nobody else gets to see. 🌸",

  5: "My cutie pie, I hope you know just how deeply loved you are. 🫶🏻❤️",

  6: "If birthdays were measured by how much someone is loved, yours would be impossible to count. 🎂❤️",

  7: "You make my world softer, brighter, funnier and infinitely more colourful. 🌈🥰",

  9: "I could look at this picture a hundred times and still find another reason to smile. ❤️",

  10: "Your birthday is special because the person celebrating it is one of the most special people in my world. 🎂✨",

  11: "I don't just love the way you look. I love the way you make life feel. 🥹",

  12: "Some people enter your life and become memories. You entered mine and became a part of me. ❤️",

  13: "Happy birthday to my favourite person to annoy, love, tease, hug and annoy again. 😂❤️",

  14: "You somehow became my favourite notification, favourite conversation and favourite person. 🫶🏻",

  15: "If I had to choose one person to make a thousand more memories with, I'd still choose you. ❤️",

  16: "You are my little piece of happiness in a world that can sometimes be far too serious. 🌸",

  17: "Your smile deserves its own birthday celebration. 🥰🎂",

  18: "I love you for the big things, but I think I love you even more for all the tiny things. ❤️",

  19: "There is something about you that makes ordinary days feel like something worth remembering. ✨",

  20: "My baccha, you deserve all the love, happiness and beautiful moments this world can possibly give you. ❤️",

  21: "I hope one day we look back at these pictures and laugh about how young and stupidly in love we were. 😂❤️",

  22: "You are not just part of my memories. You are part of the future I want to create. 🥹❤️",

  23: "Every photograph here is proof that some of my favourite moments have your face somewhere inside them. 📸❤️",

  24: "I don't know what I did to deserve you, but I'm very happy the universe somehow got this one right. 🌎❤️",

  25: "Happy birthday to the girl who makes my heart simultaneously peaceful and completely pagal. 😂🥰",

  26: "If I could give you one thing today, it would be the ability to see yourself through my eyes. ❤️",

  27: "Then maybe you'd finally understand why I think you're ridiculously beautiful. 🥹🌸",

  28: "And after everything, I still look at you and think: yes, this is my person. ❤️",
};

/* =========================================================
   SCRATCH COUPONS
========================================================= */

const coupons = [
  {
    title: "The Long Hug 🫂❤️",
    text: "One ridiculously long hug. No rushing away. No escaping. Just you and me.",
  },
  {
    title: "Forehead Kiss 💋",
    text: "One slow, soft forehead kiss whenever my baccha decides she needs one.",
  },
  {
    title: "Full-Body Kiss Pass 💋❤️",
    text: "A romantic trail of kisses from your forehead downward. Redeem when you're feeling extra loved.",
  },
  {
    title: "Make-Out Pass 🔥💋",
    text: "One long, passionate kissing session. Phones away. No distractions. Just us.",
  },
  {
    title: "Cuddle Attack 🫂🥰",
    text: "Redeem whenever you want me to pull you close and refuse to let go for a while.",
  },
  {
    title: "Your Lap, My Home ❤️",
    text: "One private cuddle session where you get to keep me exactly where you want me.",
  },
  {
    title: "Midnight Mischief 🌙😈",
    text: "One late-night date where we forget the clock and enjoy being together.",
  },
  {
    title: "Kiss Everywhere 💋",
    text: "A ridiculous number of kisses. Forehead, cheeks, hands, shoulders... basically wherever my favourite girl permits.",
  },
  {
    title: "Spoil My Girl 👑❤️",
    text: "One entire day dedicated to making you feel ridiculously special.",
  },
  {
    title: "Long Oral 🌙😈",
    text: "You decide the time for oral sex, minimum timeline of 30 mins",
  },
  {
    title: "Sunset Date 🌅",
    text: "One sunset, two people, no phones and enough time to forget everything else exists.",
  },
  {
    title: "Three-Date Challenge 💕",
    text: "Three little dates planned by me, because one birthday celebration isn't nearly enough.",
  },
  {
    title: "You Choose 😈",
    text: "For one evening, you make the rules. I get one veto. Maybe.",
  },
  {
    title: "Private Romance Pass 🔥",
    text: "One evening dedicated entirely to affection, cuddles, kisses and making each other feel wanted.",
  },
  {
    title: "Birthday Encore 🎂❤️",
    text: "Because apparently one birthday isn't enough. Redeem for another celebration whenever you want.",
  },
];

/* =========================================================
   MAIN
========================================================= */

export function JourneyTimeline() {
  const [unlocked, setUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date("2026-10-11T15:00:00+05:30");

    const updateCountdown = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setUnlocked(true);
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);

      setTimeLeft({
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4ede5] px-6 text-center text-[#17151a]">
        <div className="w-full max-w-2xl">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9d5366] md:text-xs">
            Something special is waiting
          </p>

          <h1 className="mt-7 font-display text-5xl leading-none md:text-8xl">
            Your Final Journey
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-black/50 md:text-base">
            I've saved the most special part of your birthday journey for
            your birthday itself. ❤️
            <br />
            It opens at 3:00 PM.
          </p>

          <div className="mx-auto mt-12 flex max-w-md justify-center gap-3 md:gap-5">
            <div className="min-w-[82px] rounded-2xl border border-black/10 bg-white/40 px-4 py-5">
              <strong className="block font-display text-3xl md:text-4xl">
                {String(Math.floor(
                  (timeLeft.hours + 24) % 24
                )).padStart(2, "0")}
              </strong>
              <span className="mt-2 block text-[8px] uppercase tracking-[0.3em] text-black/40">
                Hours
              </span>
            </div>

            <div className="min-w-[82px] rounded-2xl border border-black/10 bg-white/40 px-4 py-5">
              <strong className="block font-display text-3xl md:text-4xl">
                {String(timeLeft.minutes).padStart(2, "0")}
              </strong>
              <span className="mt-2 block text-[8px] uppercase tracking-[0.3em] text-black/40">
                Minutes
              </span>
            </div>

            <div className="min-w-[82px] rounded-2xl border border-black/10 bg-white/40 px-4 py-5">
              <strong className="block font-display text-3xl md:text-4xl">
                {String(timeLeft.seconds).padStart(2, "0")}
              </strong>
              <span className="mt-2 block text-[8px] uppercase tracking-[0.3em] text-black/40">
                Seconds
              </span>
            </div>
          </div>

          <p className="mt-10 font-display text-xl italic text-[#9d5366] md:text-2xl">
            Come back on your birthday. 🌸❤️
          </p>
        </div>
      </main>
    );
  }

  return <JourneyTimelineContent />;
}

function JourneyTimelineContent() {
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;

    setSoundOn(next);

    window.dispatchEvent(
      new CustomEvent("birthday-sound-toggle", {
        detail: next,
      })
    );
  };

  return (
    <main className="bg-[#f4ede5] text-[#17151a]">

      {/* FIXED SOUND CONTROL */}

      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundOn ? "Mute sound" : "Turn sound on"}
        className="fixed right-4 top-4 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lg text-white shadow-xl backdrop-blur-xl transition hover:scale-105 active:scale-95 md:right-6 md:top-6"
      >
        {soundOn ? "🔊" : "🔇"}
      </button>

      {/* ===================================================
          INTRO
      =================================================== */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">

        <div className="absolute inset-0 bg-[#f4ede5]" />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.6,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 2,
          }}
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c98291]/10 blur-[120px] md:h-[600px] md:w-[600px]"
        />

        <div className="relative z-10 max-w-6xl">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[9px] uppercase tracking-[0.4em] text-[#9d5366] md:text-xs"
          >
            Chapter 01
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 50,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.5,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-7 font-display text-5xl leading-[0.9] tracking-[-0.04em] md:text-7xl lg:text-9xl"
          >
            The most important day
            <br />
            <span className="text-[#9d5366]">
              of my life.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
              duration: 1,
            }}
            className="mx-auto mt-7 max-w-xl text-sm leading-7 text-black/45 md:text-base"
          >
            And I want to spend today reminding you exactly why.
          </motion.p>

        </div>
      </section>

      {/* ===================================================
          FIRST PHOTO + LETTER
      =================================================== */}

      <HeroMemory />

      {/* ===================================================
          PHOTO 2
      =================================================== */}

      <FullPhoto
        src={photos[2]}
        line={photoLines[2]}
      />

      {/* ===================================================
          V1 + PHOTOS
      =================================================== */}

      <VideoPhotoSequence
        video="/videos/intro/v1.MP4"
        photos={[
          {
            src: photos[3],
            line: photoLines[3],
          },
          {
            src: photos[4],
            line: photoLines[4],
          },
          {
            src: photos[5],
            line: photoLines[5],
          },
        ]}
        soundOn={soundOn}
      />

      {/* ===================================================
          V2
      =================================================== */}

      <BackgroundVideo
        src="/videos/finale/v2.MP4"
        label="And then there was more..."
        soundOn={soundOn}
      />

      {/* ===================================================
          V3 + PHOTOS
      =================================================== */}

      <VideoPhotoSequence
        video="/videos/finale/v3.MP4"
        photos={[
          {
            src: photos[6],
            line: photoLines[6],
          },
          {
            src: photos[7],
            line: photoLines[7],
          },
          {
            src: photos[9],
            line: photoLines[9],
          },
          {
            src: photos[10],
            line: photoLines[10],
          },
        ]}
        soundOn={soundOn}
      />

      {/* ===================================================
          REMAINING PHOTOS
      =================================================== */}

      <FullPhoto
        src={photos[11]}
        line={photoLines[11]}
      />

      <FullPhoto
        src={photos[12]}
        line={photoLines[12]}
      />

      <FullPhoto
        src={photos[13]}
        line={photoLines[13]}
      />

      <FullPhoto
        src={photos[14]}
        line={photoLines[14]}
      />

      <FullPhoto
        src={photos[15]}
        line={photoLines[15]}
      />

      <FullPhoto
        src={photos[16]}
        line={photoLines[16]}
      />

      <FullPhoto
        src={photos[17]}
        line={photoLines[17]}
      />

      <FullPhoto
        src={photos[18]}
        line={photoLines[18]}
      />

      <FullPhoto
        src={photos[19]}
        line={photoLines[19]}
      />

      <FullPhoto
        src={photos[20]}
        line={photoLines[20]}
      />

      <FullPhoto
        src={photos[21]}
        line={photoLines[21]}
      />

      <FullPhoto
        src={photos[22]}
        line={photoLines[22]}
      />

      <FullPhoto
        src={photos[23]}
        line={photoLines[23]}
      />

      <FullPhoto
        src={photos[24]}
        line={photoLines[24]}
      />

      <FullPhoto
        src={photos[25]}
        line={photoLines[25]}
      />

      <FullPhoto
        src={photos[26]}
        line={photoLines[26]}
      />

      <FullPhoto
        src={photos[27]}
        line={photoLines[27]}
      />

      <FullPhoto
        src={photos[28]}
        line={photoLines[28]}
      />

      {/* ===================================================
          V4
      =================================================== */}

      <BackgroundVideo
        src="/videos/memories/v4.MP4"
        label="And these are the memories I never want to lose."
        soundOn={soundOn}
      />

      {/* ===================================================
          ALL COUPONS
      =================================================== */}

      <CouponSection />

      {/* ===================================================
          FINAL SCRATCH
      =================================================== */}

      <FinalBirthdayScratch />

      {/* ===================================================
          PROPOSAL
      =================================================== */}

      <Proposal />

    </main>
  );
}


/* =========================================================
   HERO MEMORY
========================================================= */

function HeroMemory() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      <Image
        src={photos[1]}
        alt="The beginning"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-black/85" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 md:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 1.5,
          }}
          className="max-w-3xl text-center"
        >

          <p className="text-[9px] uppercase tracking-[0.4em] text-white/60 md:text-[10px]">
            For my cutie pie
          </p>

          <h2 className="mt-6 font-display text-5xl leading-none md:text-8xl">
            Today is your birthday.
          </h2>

          <div className="mx-auto my-8 h-px w-14 bg-white/30 md:my-10 md:w-16" />

          <div className="space-y-7 text-base leading-8 text-white/85 md:space-y-8 md:text-xl md:leading-10">

            <p>
              Happy birthday to my cutie pie 🥹❤️🎂,
              <br />
              my baccha 🫶🏻, my favourite person,
              <br />
              and the person who somehow managed to
              <br className="hidden md:block" />
              make my life so much more colourful 🌸✨🌈.
            </p>

            <p>
              Today is your birthday 🎂🎉,
              <br />
              but honestly...
              <br />
              it feels a little like my birthday too 🥹❤️.
            </p>

            <p>
              Because on this day,
              <br />
              the best gift I could have ever received
              <br />
              came into this world 🌎❤️.
            </p>

            <p>
              And somehow, that gift became
              <br />
              <span className="text-white">
                my person, my happiness, my headache 😂,
                <br className="hidden md:block" />
                my cutie pie 🥰 and my favourite problem ❤️.
              </span>
            </p>

            <p>
              You have made my world brighter,
              <br />
              my ordinary days more exciting,
              <br />
              and my life a lot more colourful 🌈.
            </p>

            <p>
              So today, I want to make your birthday
              <br />
              a little more colourful too 🎨❤️.
            </p>

            <p>
              Please cooperate with me today 😌,
              <br />
              please enjoy everything I've prepared 🥰,
              <br />
              and most importantly...
              <br />
              <span className="text-white">
                please don't irritate me today 😂❤️.
              </span>
            </p>

            <p>
              Today is important to me because
              <br />
              <span className="text-white">
                you are important to me. ❤️
              </span>
            </p>

          </div>

          <p className="mt-12 font-display text-3xl italic text-white md:mt-14 md:text-4xl">
            Because today isn't just your birthday.
            <br />
            It's a day I'm grateful you exist. ❤️
          </p>

        </motion.div>

      </div>
    </section>
  );
}


/* =========================================================
   FULL PHOTO
========================================================= */

function FullPhoto({
  src,
  line,
}: {
  src: string;
  line: string;
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4ede5] px-4 py-20 md:px-6 md:py-24">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full max-w-5xl"
      >

        <div className="overflow-hidden rounded-xl shadow-2xl md:rounded-none">

          <Image
            src={src}
            alt="A memory from our story"
            width={1600}
            height={1200}
            className="h-auto max-h-[75vh] w-full object-cover"
            sizes="94vw"
          />

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            delay: 0.25,
            duration: 0.8,
          }}
          className="mx-auto max-w-3xl px-3 pt-12 text-center md:pt-16"
        >

          <div className="mx-auto mb-6 h-px w-10 bg-[#9d5366]/40" />

          <p className="font-display text-2xl leading-tight text-[#9d5366] md:text-4xl">
            {line}
          </p>

          <div className="mt-5 text-sm text-[#9d5366]/50">
            Happy birthday, my love. ❤️
          </div>

        </motion.div>

      </motion.div>

    </section>
  );
}


/* =========================================================
   BACKGROUND VIDEO
========================================================= */

function BackgroundVideo({
  src,
  label,
  soundOn,
}: {
  src: string;
  label: string;
  soundOn: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const stopOtherVideo = (event: Event) => {
      const customEvent =
        event as CustomEvent<HTMLVideoElement>;

      if (customEvent.detail !== video) {
        video.pause();
        video.muted = true;
      }
    };

    window.addEventListener(
      "birthday-video-active",
      stopOtherVideo
    );

    return () => {
      window.removeEventListener(
        "birthday-video-active",
        stopOtherVideo
      );
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (active) {
      window.dispatchEvent(
        new CustomEvent("birthday-video-active", {
          detail: video,
        })
      );

      video.muted = !soundOn;

      video.play().catch(() => {});
    } else {
      video.pause();
      video.muted = true;
    }
  }, [active, soundOn]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const toggle = (event: Event) => {
      const customEvent =
        event as CustomEvent<boolean>;

      video.muted = !customEvent.detail;

      if (active) {
        video.play().catch(() => {});
      }
    };

    window.addEventListener(
      "birthday-sound-toggle",
      toggle
    );

    return () => {
      window.removeEventListener(
        "birthday-sound-toggle",
        toggle
      );
    };
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >

      <video
        ref={videoRef}
        src={src}
        playsInline
        loop
        preload="auto"
        muted
        className="absolute inset-0 h-full w-full object-cover"
        onLoadedData={() => {
          if (active) {
            videoRef.current?.play().catch(() => {});
          }
        }}
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-xl text-[10px] uppercase tracking-[0.4em] text-white/65 md:text-xs"
        >
          {label}
        </motion.p>

      </div>

    </section>
  );
}


/* =========================================================
   VIDEO + OVERLAY PHOTOS
========================================================= */

function VideoPhotoSequence({
  video,
  photos: sequencePhotos,
  soundOn,
}: {
  video: string;
  photos: {
    src: string;
    line: string;
  }[];
  soundOn: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      {
        threshold: 0.01,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const stopOtherVideo = (event: Event) => {
      const customEvent =
        event as CustomEvent<HTMLVideoElement>;

      if (customEvent.detail !== video) {
        video.pause();
        video.muted = true;
      }
    };

    window.addEventListener(
      "birthday-video-active",
      stopOtherVideo
    );

    return () => {
      window.removeEventListener(
        "birthday-video-active",
        stopOtherVideo
      );
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (active) {
      window.dispatchEvent(
        new CustomEvent("birthday-video-active", {
          detail: video,
        })
      );

      video.muted = !soundOn;

      video.play().catch(() => {});
    } else {
      video.pause();
      video.muted = true;
    }
  }, [active, soundOn]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const toggle = (event: Event) => {
      const customEvent =
        event as CustomEvent<boolean>;

      video.muted = !customEvent.detail;

      if (active) {
        video.play().catch(() => {});
      }
    };

    window.addEventListener(
      "birthday-sound-toggle",
      toggle
    );

    return () => {
      window.removeEventListener(
        "birthday-sound-toggle",
        toggle
      );
    };
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
    >

      {/* VIDEO */}

      <div className="sticky top-0 h-screen overflow-hidden">

        <video
          ref={videoRef}
          src={video}
          playsInline
          loop
          preload="auto"
          muted
          className="absolute inset-0 h-full w-full object-cover"
          onLoadedData={() => {
            if (active) {
              videoRef.current?.play().catch(() => {});
            }
          }}
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/65" />

      </div>

      {/* PHOTOS OVER VIDEO */}

      <div className="relative z-10 -mt-[100vh]">

        {sequencePhotos.map((photo) => (
          <motion.div
            key={photo.src}
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex min-h-screen items-center justify-center px-4 py-20 md:px-6 md:py-24"
          >

            <div className="relative w-full max-w-4xl">

              <div className="overflow-hidden rounded-2xl shadow-2xl">

                <Image
                  src={photo.src}
                  alt="A memory from our story"
                  width={1600}
                  height={1200}
                  className="h-auto max-h-[72vh] w-full object-cover"
                  sizes="92vw"
                />

              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                }}
                className="mx-auto max-w-3xl px-3 pt-8 text-center md:pt-10"
              >

                <p className="font-display text-2xl leading-tight text-white md:text-4xl">
                  {photo.line}
                </p>

                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/40">
                  Happy birthday, my cutie pie ❤️
                </p>

              </motion.div>

            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   COUPON SECTION
========================================================= */

function CouponSection() {
  return (
    <section className="relative bg-[#171319] px-5 py-24 text-white md:px-6 md:py-32">

      <div className="mx-auto max-w-6xl">

        <div className="text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#e9a8b5]/60 md:text-[10px]">
            Birthday presents
          </p>

          <h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">
            A few things
            <br />
            <span className="text-[#e9a8b5]">
              you can claim.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/40">
            Some gifts don't fit inside a box.
            <br />
            These ones have to be discovered.
          </p>

        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">

          {coupons.map((coupon, index) => (
            <ScratchCoupon
              key={coupon.title}
              title={coupon.title}
              text={coupon.text}
              index={index}
            />
          ))}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SCRATCH COUPON
========================================================= */

function ScratchCoupon({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [scratching, setScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const lastPoint = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const scratchDistance = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;

    if (!canvas || !card) return;

    const rect = card.getBoundingClientRect();

    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    canvas.width = width * 2;
    canvas.height = height * 2;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.scale(2, 2);

    ctx.fillStyle = "#a89ba1";

    ctx.fillRect(
      0,
      0,
      width,
      height
    );

    for (let i = 0; i < 350; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      ctx.fillStyle =
        i % 2 === 0
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.05)";

      ctx.fillRect(
        x,
        y,
        1.5,
        1.5
      );
    }

    ctx.globalCompositeOperation =
      "destination-out";
  }, []);

  const vibrate = () => {
    if (
      typeof navigator !== "undefined" &&
      "vibrate" in navigator
    ) {
      navigator.vibrate(8);
    }
  };

  const getPoint = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const drawBrush = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const point = getPoint(event);

    if (!point) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.globalCompositeOperation =
      "destination-out";

    ctx.lineWidth = 55;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPoint.current) {
      ctx.beginPath();

      ctx.moveTo(
        lastPoint.current.x,
        lastPoint.current.y
      );

      ctx.lineTo(
        point.x,
        point.y
      );

      ctx.stroke();

      const dx =
        point.x - lastPoint.current.x;

      const dy =
        point.y - lastPoint.current.y;

      scratchDistance.current += Math.sqrt(
        dx * dx + dy * dy
      );
    }

    ctx.beginPath();

    ctx.arc(
      point.x,
      point.y,
      27,
      0,
      Math.PI * 2
    );

    ctx.fill();

    lastPoint.current = point;

    vibrate();

    if (scratchDistance.current > 450) {
      setRevealed(true);

      if (
        typeof navigator !== "undefined" &&
        "vibrate" in navigator
      ) {
        navigator.vibrate([
          15,
          30,
          20,
        ]);
      }
    }
  };

  const beginScratch = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    setScratching(true);

    lastPoint.current = null;
    scratchDistance.current = 0;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    drawBrush(event);
  };

  const endScratch = () => {
    setScratching(false);
    lastPoint.current = null;
  };

  return (
    <div
      ref={cardRef}
      className="relative min-h-[245px] overflow-hidden rounded-3xl border border-white/10 bg-[#211b21] p-6 md:min-h-[260px] md:p-7"
    >

      <div
        className={`transition-all duration-700 ${
          revealed
            ? "blur-0 opacity-100"
            : "blur-md opacity-70"
        }`}
      >

        <p className="text-[8px] uppercase tracking-[0.3em] text-white/25 md:text-[9px]">
          Birthday surprise
        </p>

        <h3 className="mt-4 font-display text-3xl text-[#f5d8df] md:mt-5">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/70 md:mt-5">
          {text}
        </p>

      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          onPointerDown={beginScratch}
          onPointerMove={(event) => {
            if (scratching) {
              drawBrush(event);
            }
          }}
          onPointerUp={endScratch}
          onPointerCancel={endScratch}
          className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
        />
      )}

      {revealed && (
        <motion.p
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-6 text-[9px] uppercase tracking-[0.25em] text-[#e9a8b5]/70"
        >
          Coupon revealed ❤️
        </motion.p>
      )}

    </div>
  );
}


/* =========================================================
   FINAL BIRTHDAY SCRATCH
========================================================= */

function FinalBirthdayScratch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scratching, setScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const lastPoint = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const scratchDistance = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();

    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    canvas.width = width * 2;
    canvas.height = height * 2;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.scale(2, 2);

    ctx.fillStyle = "#aaa0a5";

    ctx.fillRect(
      0,
      0,
      width,
      height
    );

    for (let i = 0; i < 600; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      ctx.fillStyle =
        i % 2 === 0
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.05)";

      ctx.fillRect(
        x,
        y,
        1.5,
        1.5
      );
    }

    ctx.globalCompositeOperation =
      "destination-out";
  }, []);

  const vibrate = () => {
    if (
      typeof navigator !== "undefined" &&
      "vibrate" in navigator
    ) {
      navigator.vibrate(8);
    }
  };

  const getPoint = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const drawBrush = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const point = getPoint(event);

    if (!point) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.globalCompositeOperation =
      "destination-out";

    ctx.lineWidth = 62;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPoint.current) {
      ctx.beginPath();

      ctx.moveTo(
        lastPoint.current.x,
        lastPoint.current.y
      );

      ctx.lineTo(
        point.x,
        point.y
      );

      ctx.stroke();

      const dx =
        point.x - lastPoint.current.x;

      const dy =
        point.y - lastPoint.current.y;

      scratchDistance.current += Math.sqrt(
        dx * dx + dy * dy
      );
    }

    ctx.beginPath();

    ctx.arc(
      point.x,
      point.y,
      31,
      0,
      Math.PI * 2
    );

    ctx.fill();

    lastPoint.current = point;

    vibrate();

    if (scratchDistance.current > 550) {
      setRevealed(true);

      if (
        typeof navigator !== "undefined" &&
        "vibrate" in navigator
      ) {
        navigator.vibrate([
          15,
          30,
          20,
          30,
          30,
        ]);
      }
    }
  };

  const beginScratch = (
    event: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    setScratching(true);

    lastPoint.current = null;
    scratchDistance.current = 0;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    drawBrush(event);
  };

  const endScratch = () => {
    setScratching(false);
    lastPoint.current = null;
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#171319] px-5 py-24 text-center md:px-6 md:py-32">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,168,181,0.13),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-3xl">

        <p className="text-[9px] uppercase tracking-[0.4em] text-[#e9a8b5]/60 md:text-[10px]">
          One last little gift
        </p>

        <h2 className="mt-6 font-display text-4xl text-white md:mt-7 md:text-6xl">
          There's something underneath.
        </h2>

        <p className="mt-4 text-sm text-white/35">
          Scratch it.
        </p>

        <div
          ref={containerRef}
          className="relative mx-auto mt-10 h-[300px] w-full overflow-hidden rounded-[28px] bg-[#211b21] shadow-2xl md:mt-12 md:h-[330px]"
        >

          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-8">

            <div>

              <p className="text-[10px] uppercase tracking-[0.35em] text-[#e9a8b5]/50 md:text-xs">
                For my baccha
              </p>

              <h3 className="mt-5 font-display text-5xl leading-none text-[#f5d8df] md:text-7xl">
                Happy Birthday
                <br />
                to my baccha ❤️
              </h3>

              <p className="mt-5 text-sm text-white/35">
                You are one of the best things
                that ever happened to me.
              </p>

            </div>

          </div>

          {!revealed && (
            <canvas
              ref={canvasRef}
              onPointerDown={beginScratch}
              onPointerMove={(event) => {
                if (scratching) {
                  drawBrush(event);
                }
              }}
              onPointerUp={endScratch}
              onPointerCancel={endScratch}
              className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
            />
          )}

        </div>

        {revealed && (
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 font-display text-2xl italic text-[#e9a8b5]"
          >
            Now you know what I wanted you to find. ❤️
          </motion.p>
        )}

      </div>

    </section>
  );
}


/* =========================================================
   PROPOSAL
========================================================= */

function Proposal() {
  const [answered, setAnswered] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24 text-center text-white md:py-32">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,168,181,0.15),transparent_55%)]" />

      {!answered ? (
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative z-10 max-w-3xl"
        >

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#e9a8b5]/60 md:text-[10px]">
            One last question
          </p>

          <h2 className="mt-7 font-display text-6xl leading-none md:text-9xl">
            Will you
            <br />
            marry me?
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/40">
            After everything we've shared,
            <br />
            I still want more memories with you. ❤️
          </p>

          <button
            type="button"
            onClick={() => setAnswered(true)}
            className="mt-10 rounded-full bg-[#e9a8b5] px-12 py-5 text-sm font-medium text-black transition hover:scale-105 active:scale-95 md:mt-12"
          >
            Yes. ❤️
          </button>

          <p className="mt-6 text-xs italic text-[#e9a8b5]/60">
            P.S. There is suspiciously no "No" button. 😌
          </p>

        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative z-10 max-w-3xl"
        >

          <Fireworks />

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.2,
            }}
            className="mx-auto mt-10 max-w-xl font-display text-2xl italic text-[#e9a8b5] md:text-4xl"
          >
            There was never a No button anyway. 😂❤️
            <br />
            I'm not letting this beautiful girl
            <br />
            disappear from my life.
          </motion.p>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 2,
            }}
            className="mt-7 text-sm text-white/40"
          >
            Now let's make the rest of our story even more beautiful. ❤️
          </motion.p>

        </motion.div>
      )}

    </section>
  );
}


/* =========================================================
   FIREWORKS
========================================================= */

function Fireworks() {
  const particles = Array.from(
    { length: 90 },
    (_, index) => index
  );

  return (
    <div className="relative z-10">

      <div className="pointer-events-none absolute inset-1/2">

        {particles.map((index) => {
          const angle =
            (index / particles.length) *
            Math.PI *
            2;

          const distance =
            120 + (index % 6) * 35;

          const x =
            Math.cos(angle) * distance;

          const y =
            Math.sin(angle) * distance;

          return (
            <motion.span
              key={index}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x,
                y,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration:
                  1.5 + (index % 4) * 0.2,
                repeat: Infinity,
                delay:
                  (index % 7) * 0.15,
                ease: "easeOut",
              }}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#e9a8b5]"
            />
          );
        })}

      </div>

      <motion.p
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="font-display text-6xl md:text-9xl"
      >
        She said yes. ❤️
      </motion.p>

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
        className="mt-7 text-sm text-white/40"
      >
        Now let's make the rest of our story even better.
      </motion.p>

    </div>
  );
}