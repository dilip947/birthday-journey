"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const yesMessages = [
  "But you don't love me. 😒",
  "Wrong answer. 😂",
  "Nice try, cutie.",
  "You really chose YES?",
  "I'm not accepting that answer.",
  "Try again, baccha. 😌",
  "That is definitely not what I wanted to hear.",
  "Are you trying to hurt my feelings? 🥺",
];

export function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  const [yesMessage, setYesMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleYes = () => {
    const randomMessage =
      yesMessages[
        Math.floor(Math.random() * yesMessages.length)
      ];

    setYesMessage(randomMessage);
  };

  const handleNo = () => {
    setShowPopup(true);
    setAnswer("");
    setError("");
  };

  const correctAnswer =
    answer.trim().toLowerCase() === "i love you more";

  const handleContinue = () => {
    if (!correctAnswer) {
      setError(
        'You need to type "I love you more". ❤️'
      );
      return;
    }

    window.location.href = "/journey";
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0b0f] px-6 text-[#f8f1e8]">

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.24, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9d5366]/20 blur-[140px]"
      />

      <div className="relative z-10 w-full max-w-2xl text-center">

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-8 text-[10px] uppercase tracking-[0.45em] text-[#e9a8b5]/70 md:text-xs"
        >
          Before we begin...
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
          Do you
          <br />
          <span className="text-[#e9a8b5]">
            love me?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="mt-7 text-sm leading-6 text-white/40"
        >
          Choose carefully.
          <br />
          There is only one way forward.
        </motion.p>

        <div className="mt-8 h-8">

          <AnimatePresence mode="wait">

            {yesMessage && (
              <motion.p
                key={yesMessage}
                initial={{
                  opacity: 0,
                  y: 8,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                className="text-sm text-[#e9a8b5]"
              >
                {yesMessage}
              </motion.p>
            )}

          </AnimatePresence>

        </div>

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
            delay: 1,
            duration: 0.8,
          }}
          className="mt-6 flex flex-col justify-center gap-4 sm:flex-row"
        >

          <button
            type="button"
            onClick={handleYes}
            className="min-h-[52px] min-w-[150px] rounded-full border border-[#e9a8b5]/30 bg-[#e9a8b5]/5 px-8 text-sm transition-all duration-300 hover:border-[#e9a8b5]/60 hover:bg-[#e9a8b5]/10"
          >
            Yes ❤️
          </button>

          <button
            type="button"
            onClick={handleNo}
            className="min-h-[52px] min-w-[150px] rounded-full border border-white/15 px-8 text-sm text-white/65 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04] hover:text-white"
          >
            No →
          </button>

        </motion.div>

      </div>

      {/* ===================================================
          LOVE POPUP
      =================================================== */}

      <AnimatePresence>

        {showPopup && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171319] p-8 text-center shadow-2xl md:p-10"
            >

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e9a8b5]/10 text-2xl">
                ❤️
              </div>

              <h2 className="mt-6 font-display text-4xl md:text-5xl">
                But I love you.
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/45">
                So before we continue...
                <br />
                say it properly.
              </p>

              <input
                autoFocus
                type="text"
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setError("");
                }}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    correctAnswer
                  ) {
                    handleContinue();
                  }
                }}
                placeholder="Type your answer..."
                className="mt-7 min-h-[52px] w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-center text-sm text-white outline-none placeholder:text-white/20 focus:border-[#e9a8b5]/50"
              />

              {error && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-3 text-xs text-[#e9a8b5]"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="button"
                onClick={handleContinue}
                className={`mt-6 min-h-[52px] w-full rounded-2xl px-6 text-sm font-medium transition-all ${
                  correctAnswer
                    ? "bg-[#e9a8b5] text-[#171319] hover:bg-[#f2bdc8]"
                    : "bg-white/5 text-white/25"
                }`}
              >
                Continue →
              </button>

              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="mt-5 text-xs text-white/25 transition hover:text-white/50"
              >
                Change my answer
              </button>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </main>
  );
}