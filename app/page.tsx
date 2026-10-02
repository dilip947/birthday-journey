"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const rejectionMessages = [
  "No, wrong answer. 😌",
  "You don't love me. ❤️‍🩹",
  "Stop lying. 😭",
  "Nice try, but I know the truth. 😏",
  "Wrong again. You need to think harder. 😂",
  "Really? That's your answer? 🤨",
  "You're lying to me again. 😭❤️",
];

function getCountdown() {
  const now = new Date();

  // October 11, 2026 at 12:00 AM IST
  const birthday = new Date("2026-10-11T00:00:00+05:30");

  let difference = birthday.getTime() - now.getTime();

  // If this year's birthday has passed, count toward next year's birthday.
  if (difference < 0) {
    const nextBirthday = new Date("2027-10-11T00:00:00+05:30");
    difference = nextBirthday.getTime() - now.getTime();
  }

  const totalSeconds = Math.max(0, Math.floor(difference / 1000));

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function Home() {
  const router = useRouter();

  const [countdown, setCountdown] = useState(getCountdown());

  const [showLovePopup, setShowLovePopup] = useState(false);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);

  const [rejectionIndex, setRejectionIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [wrongAnswer, setWrongAnswer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --------------------------------------------------
  // CLICK "BEGIN"
  // --------------------------------------------------

  function beginBirthday() {
    setRejectionIndex(0);
    setShowAnswerPopup(false);
    setAnswer("");
    setWrongAnswer(false);
    setShowLovePopup(true);
  }

  // --------------------------------------------------
  // CLICK YES
  // --------------------------------------------------

  function handleYes() {
    setRejectionIndex((current) => {
      return (current + 1) % rejectionMessages.length;
    });
  }

  // --------------------------------------------------
  // CLICK NO
  // --------------------------------------------------

  function handleNo() {
    setShowLovePopup(false);

    setAnswer("");
    setWrongAnswer(false);

    setShowAnswerPopup(true);
  }

  // --------------------------------------------------
  // CHECK "I LOVE YOU MORE"
  // --------------------------------------------------

  function handleAnswerSubmit() {
    const normalized = answer.trim().toLowerCase();

    if (normalized === "i love you more") {
      // Close the popup first.
      setShowAnswerPopup(false);

      // Clear the answer.
      setAnswer("");
      setWrongAnswer(false);

      // IMPORTANT:
      // Navigate directly to Birthday Week.
      router.push("/week");

      return;
    }

    // Wrong answer
    setWrongAnswer(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09070a] text-white">
      {/* ================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[25%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#9b4f69]/10 blur-[140px]" />

        <div className="absolute bottom-0 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#6b354b]/10 blur-[120px]" />
      </div>

      {/* ================================================
          HOMEPAGE
      ================================================= */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
        <div className="w-full max-w-2xl text-center">

          <p className="mb-6 text-[9px] uppercase tracking-[0.55em] text-[#dca4b7]/60">
            Something beautiful is coming...
          </p>

          <h1 className="font-serif text-5xl leading-[1.05] text-white md:text-7xl">
            My darling's birthday
            <br />
            <span className="text-[#dca4b7]">
              is coming...
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-white/40">
            I didn't want to celebrate just one day.
            <br />
            I wanted to make the days before it special too.
            ❤️
          </p>

          {/* ============================================
              COUNTDOWN
          ============================================= */}

          <div className="mx-auto mt-10 grid max-w-md grid-cols-4 gap-2.5">

            {[
              ["Days", countdown.days],
              ["Hours", countdown.hours],
              ["Minutes", countdown.minutes],
              ["Seconds", countdown.seconds],
            ].map(([label, value]) => (

              <div
                key={String(label)}
                className="rounded-xl border border-white/10 bg-white/[0.025] px-2 py-4"
              >
                <div className="font-serif text-2xl text-[#dca4b7] md:text-3xl">
                  {String(value).padStart(2, "0")}
                </div>

                <div className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/25">
                  {label}
                </div>
              </div>

            ))}

          </div>

          <p className="mt-5 text-[8px] uppercase tracking-[0.3em] text-white/20">
            Until October 11
          </p>

          {/* ============================================
              BEGIN BUTTON
          ============================================= */}

          <button
            type="button"
            onClick={beginBirthday}
            className="mt-12 rounded-full border border-[#dca4b7]/30 bg-[#dca4b7]/10 px-8 py-4 text-sm text-[#e8bac8] transition duration-300 hover:scale-[1.02] hover:bg-[#dca4b7]/15"
          >
            Click here to begin →
          </button>

        </div>
      </div>

      {/* =================================================
          FIRST POPUP
          "DO YOU REALLY LOVE ME?"
      ================================================== */}

      {showLovePopup && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-md">

          <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-[#120e13] p-8 text-center shadow-2xl">

            <button
              type="button"
              onClick={() => setShowLovePopup(false)}
              className="absolute right-5 top-5 text-lg text-white/30 transition hover:text-white/70"
              aria-label="Close"
            >
              ×
            </button>

            <p className="text-[9px] uppercase tracking-[0.35em] text-[#dca4b7]/60">
              Before we begin...
            </p>

            <h2 className="mt-5 font-serif text-3xl text-white">
              Do you really love me? ❤️
            </h2>

            <p className="mt-3 text-sm text-white/40">
              Be honest. I'm watching. 👀
            </p>

            {/* YES / NO */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={handleYes}
                className="flex-1 rounded-full border border-[#dca4b7]/25 bg-[#dca4b7]/10 px-6 py-3 text-sm text-[#e6b2c3] transition hover:bg-[#dca4b7]/20"
              >
                Yes ❤️
              </button>

              <button
                type="button"
                onClick={handleNo}
                className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/60 transition hover:bg-white/[0.07]"
              >
                No 😌
              </button>

            </div>

            {/* ==========================================
                YES REJECTION MESSAGE
            =========================================== */}

            <div className="mt-6 min-h-[45px]">

              <p
                key={rejectionIndex}
                className="text-sm text-[#dca4b7]/75"
              >
                {rejectionMessages[rejectionIndex]}
              </p>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          SECOND POPUP
          "BUT I LOVE YOU"
      ================================================== */}

      {showAnswerPopup && (

        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-5 backdrop-blur-md">

          <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-[#120e13] p-8 text-center shadow-2xl">

            <p className="text-[9px] uppercase tracking-[0.35em] text-[#dca4b7]/60">
              Hmm... ❤️
            </p>

            <h2 className="mt-5 font-serif text-3xl text-white">
              But I love you. ❤️
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/45">
              So if you really love me...
              <br />
              tell me what the correct answer is.
            </p>

            {/* ==========================================
                ANSWER INPUT
            =========================================== */}

            <input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setWrongAnswer(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAnswerSubmit();
                }
              }}
              autoFocus
              autoComplete="off"
              placeholder="Type your answer..."
              className="mt-7 w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-center text-sm text-white outline-none placeholder:text-white/20 focus:border-[#dca4b7]/40"
            />

            {/* WRONG ANSWER */}

            {wrongAnswer && (

              <p className="mt-3 text-xs text-[#dca4b7]/80">
                Nope. Think again. 😌❤️
              </p>

            )}

            {/* CONTINUE */}

            <button
              type="button"
              onClick={handleAnswerSubmit}
              className="mt-5 w-full rounded-full border border-[#dca4b7]/25 bg-[#dca4b7]/10 px-6 py-3 text-sm text-[#e6b2c3] transition hover:bg-[#dca4b7]/20"
            >
              Continue ❤️
            </button>

          </div>

        </div>

      )}

    </main>
  );
}
