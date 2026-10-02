"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const faces = {
  1: [[50, 50]],
  2: [
    [30, 30],
    [70, 70],
  ],
  3: [
    [30, 30],
    [50, 50],
    [70, 70],
  ],
  4: [
    [30, 30],
    [70, 30],
    [30, 70],
    [70, 70],
  ],
  5: [
    [30, 30],
    [70, 30],
    [50, 50],
    [30, 70],
    [70, 70],
  ],
  6: [
    [30, 25],
    [70, 25],
    [30, 50],
    [70, 50],
    [30, 75],
    [70, 75],
  ],
};

type FaceNumber = keyof typeof faces;

type Person = "Dilip" | "Diya";

const fantasyMessages: Record<Person, Record<FaceNumber, string>> = {
  Dilip: {
    1: "A little moment with you, just the way I'd want it. ❤️",
    2: "A long evening together, with nowhere else to be. 🌙",
    3: "A little extra affection from my favorite person. 🫂",
    4: "A date where I get all of your attention. ❤️",
    5: "A night full of laughs, conversations, and closeness. ✨",
    6: "A beautiful memory that belongs only to us. 💕",
  },

  Diya: {
    1: "A little surprise planned especially for you. 🌸",
    2: "A day where you get completely spoiled. 👑",
    3: "A cute date with your favorite person. ❤️",
    4: "A whole evening dedicated to making you smile. ✨",
    5: "A cozy night full of talking and laughing together. 🌙",
    6: "A beautiful little adventure for the two of us. 💕",
  },
};

function DiceFace({
  number,
  className = "",
}: {
  number: FaceNumber;
  className?: string;
}) {
  return (
    <div className={`dice-face dice-${number} ${className}`}>
      {faces[number].map(([x, y], index) => (
        <span
          key={index}
          className="dot"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function FantasyDicePage() {
  const router = useRouter();

  const [result, setResult] = useState<FaceNumber>(6);
  const [rolling, setRolling] = useState(false);

  const [selectedPerson, setSelectedPerson] =
    useState<Person>("Dilip");

  function rollDice() {
    if (rolling) return;

    setRolling(true);

    let rolls = 0;

    const interval = window.setInterval(() => {
      const random =
        (Math.floor(Math.random() * 6) + 1) as FaceNumber;

      setResult(random);

      rolls += 1;

      if (rolls >= 12) {
        window.clearInterval(interval);

        const finalNumber =
          (Math.floor(Math.random() * 6) + 1) as FaceNumber;

        setResult(finalNumber);
        setRolling(false);
      }
    }, 90);
  }

  return (
    <main className="dice-page">
      <div className="dice-glow" />

      <section className="dice-container">

        {/* BACK BUTTON */}
        <button
          type="button"
          className="back-button"
          onClick={() => router.push("/week/fun")}
        >
          ← Fun Day
        </button>

        {/* HEADING */}
        <p className="dice-eyebrow">
          FANTASY DICE
        </p>

        <h1 className="dice-title">
          Let fate decide. <span>✦</span>
        </h1>

        <p className="dice-subtitle">
          One roll.
          <br />
          One number.
          <br />
          One little surprise.
        </p>

        {/* DICE */}
        <div
          className={`dice-stage ${
            rolling ? "rolling" : ""
          }`}
        >
          <DiceFace number={result} />
        </div>

        {/* RESULT */}
        <div className="result-label">
          <span>YOUR ROLL</span>

          <strong>
            {result}
          </strong>
        </div>

        {/* ROLL BUTTON */}
        <button
          type="button"
          className="roll-button"
          onClick={rollDice}
          disabled={rolling}
        >
          {rolling
            ? "ROLLING..."
            : "ROLL THE DICE"}
        </button>

        {/* PERSON SELECTOR */}
        <div className="names-section">

          <span className="names-label">
            WHO IS ROLLING?
          </span>

          <div className="names">

            <button
              type="button"
              className={`name-button ${
                selectedPerson === "Dilip"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedPerson("Dilip")
              }
              disabled={rolling}
            >
              Dilip
            </button>

            <span className="heart-divider">
              ♥
            </span>

            <button
              type="button"
              className={`name-button ${
                selectedPerson === "Diya"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedPerson("Diya")
              }
              disabled={rolling}
            >
              Diya
            </button>

          </div>
        </div>

        {/* TEMPORARY FANTASY */}
        <div className="fantasy-message">

          <span className="fantasy-label">
            {selectedPerson.toUpperCase()}
            {"'S LITTLE SURPRISE"}
          </span>

          <p key={`${selectedPerson}-${result}`}>
            {fantasyMessages[selectedPerson][result]}
          </p>

        </div>

      </section>

      <style jsx>{`

        /* =========================
           PAGE
        ========================= */

        .dice-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 42%,
              rgba(220, 164, 183, 0.1),
              transparent 30%
            ),
            #09070a;

          color: #f8f1e8;

          display: flex;
          justify-content: center;

          padding:
            55px
            20px
            80px;

          font-family:
            var(--font-sans),
            Arial,
            sans-serif;
        }

        /* =========================
           CONTAINER
        ========================= */

        .dice-container {
          width: 100%;
          max-width: 760px;

          text-align: center;

          position: relative;
          z-index: 2;
        }

        /* =========================
           BACK BUTTON
        ========================= */

        .back-button {
          display: block;

          margin:
            0 auto
            65px;

          border:
            1px solid
            rgba(255, 255, 255, 0.1);

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.03);

          padding:
            10px
            17px;

          color:
            rgba(255, 255, 255, 0.5);

          cursor: pointer;

          font-size: 10px;

          transition:
            0.25s ease;
        }

        .back-button:hover {
          color: #f8f1e8;

          border-color:
            rgba(220, 164, 183, 0.35);

          transform:
            translateY(-1px);
        }

        /* =========================
           HEADING
        ========================= */

        .dice-eyebrow {
          margin:
            0
            0
            18px;

          font-size: 9px;

          letter-spacing:
            0.55em;

          color:
            rgba(220, 164, 183, 0.7);
        }

        .dice-title {
          margin: 0;

          font-family:
            var(--font-display),
            Georgia,
            serif;

          font-size:
            clamp(48px, 8vw, 78px);

          line-height: 1;

          font-weight: 500;
        }

        .dice-title span {
          color: #dca4b7;
        }

        .dice-subtitle {
          margin:
            28px
            0
            45px;

          color:
            rgba(255, 255, 255, 0.4);

          font-size: 12px;

          line-height: 2;
        }

        /* =========================
           DICE STAGE
        ========================= */

        .dice-stage {
          width: 260px;
          height: 260px;

          margin:
            0 auto
            30px;

          display: flex;

          align-items: center;
          justify-content: center;

          perspective: 900px;

          position: relative;
        }

        /* =========================
           DICE
        ========================= */

        .dice-face {
          position: relative;

          width: 170px;
          height: 170px;

          flex:
            0 0 170px;

          border-radius: 27px;

          background:
            linear-gradient(
              145deg,
              #ffffff 0%,
              #f9f9f9 55%,
              #e6e6e6 100%
            );

          box-shadow:
            inset
            -12px
            -14px
            20px
            rgba(0, 0, 0, 0.09),

            inset
            5px
            5px
            12px
            rgba(255, 255, 255, 0.9),

            0
            30px
            55px
            rgba(0, 0, 0, 0.45);

          transform:
            rotate(-5deg)
            rotateX(5deg)
            rotateY(-5deg);

          transition:
            transform
            0.15s ease,

            box-shadow
            0.15s ease;

          overflow: hidden;
        }

        .dice-face::after {
          content: "";

          position: absolute;

          inset: 7px;

          border-radius: 21px;

          border:
            1px solid
            rgba(0, 0, 0, 0.07);

          pointer-events: none;
        }

        /* =========================
           DOTS
        ========================= */

        .dot {
          position: absolute;

          width: 22px;
          height: 22px;

          border-radius: 50%;

          transform:
            translate(-50%, -50%);

          background: #111;

          box-shadow:
            inset
            2px
            2px
            3px
            rgba(255, 255, 255, 0.08),

            1px
            2px
            3px
            rgba(0, 0, 0, 0.2);
        }

        /* =========================
           ROLLING
        ========================= */

        .rolling .dice-face {
          animation:
            diceRoll
            0.18s
            linear
            infinite;
        }

        @keyframes diceRoll {

          0% {
            transform:
              rotate(-5deg)
              rotateX(5deg)
              rotateY(-5deg);
          }

          50% {
            transform:
              rotate(10deg)
              rotateX(180deg)
              rotateY(20deg)
              scale(1.03);
          }

          100% {
            transform:
              rotate(-5deg)
              rotateX(365deg)
              rotateY(355deg);
          }

        }

        /* =========================
           RESULT
        ========================= */

        .result-label {
          margin-bottom: 28px;
        }

        .result-label span {
          display: block;

          font-size: 8px;

          letter-spacing:
            0.4em;

          color:
            rgba(255, 255, 255, 0.25);
        }

        .result-label strong {
          display: block;

          margin-top: 5px;

          font-family:
            var(--font-display),
            Georgia,
            serif;

          font-size: 35px;

          font-weight: 500;

          color: #dca4b7;
        }

        /* =========================
           ROLL BUTTON
        ========================= */

        .roll-button {
          border:
            1px solid
            rgba(220, 164, 183, 0.35);

          border-radius: 999px;

          background:
            rgba(220, 164, 183, 0.1);

          padding:
            15px
            28px;

          color: #e8bac8;

          font-size: 9px;

          letter-spacing:
            0.3em;

          cursor: pointer;

          transition:
            0.25s ease;
        }

        .roll-button:hover:not(:disabled) {
          transform:
            translateY(-2px);

          background:
            rgba(220, 164, 183, 0.17);

          box-shadow:
            0
            15px
            35px
            rgba(0, 0, 0, 0.3);
        }

        .roll-button:disabled {
          opacity: 0.55;

          cursor: default;
        }

        /* =========================
           NAMES
        ========================= */

        .names-section {
          margin-top: 55px;

          text-align: center;
        }

        .names-label {
          display: block;

          margin-bottom: 12px;

          font-size: 8px;

          letter-spacing:
            0.4em;

          color:
            rgba(255, 255, 255, 0.25);
        }

        .names {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 14px;
        }

        .heart-divider {
          color: #dca4b7;

          font-family:
            Arial,
            sans-serif;

          font-size: 18px;
        }

        /* =========================
           NAME BUTTONS
        ========================= */

        .name-button {
          border:
            1px solid
            rgba(220, 164, 183, 0.22);

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.025);

          min-width: 120px;

          padding:
            13px
            28px;

          color:
            rgba(248, 241, 232, 0.55);

          font-family:
            var(--font-display),
            Georgia,
            serif;

          font-size: 25px;

          font-weight: 500;

          cursor: pointer;

          transition:
            background
            0.25s ease,

            border-color
            0.25s ease,

            color
            0.25s ease,

            transform
            0.25s ease,

            box-shadow
            0.25s ease;
        }

        .name-button:hover:not(:disabled) {
          transform:
            translateY(-2px);

          border-color:
            rgba(220, 164, 183, 0.45);

          color: #f8f1e8;
        }

        .name-button.selected {
          background:
            rgba(220, 164, 183, 0.14);

          border-color:
            rgba(220, 164, 183, 0.65);

          color: #f4cbd8;

          box-shadow:
            0
            0
            0
            1px
            rgba(220, 164, 183, 0.08),

            0
            12px
            30px
            rgba(220, 164, 183, 0.08);
        }

        .name-button:disabled {
          cursor: default;

          opacity: 0.7;
        }

        /* =========================
           FANTASY MESSAGE
        ========================= */

        .fantasy-message {
          margin-top: 45px;

          text-align: center;

          min-height: 90px;
        }

        .fantasy-label {
          display: block;

          margin-bottom: 12px;

          font-size: 8px;

          letter-spacing:
            0.4em;

          color:
            rgba(220, 164, 183, 0.55);
        }

        .fantasy-message p {
          margin:
            0 auto;

          max-width: 520px;

          font-family:
            var(--font-display),
            Georgia,
            serif;

          font-size: 22px;

          line-height: 1.5;

          font-weight: 500;

          color: #f2dfe5;

          animation:
            fantasyReveal
            0.5s
            ease
            both;
        }

        @keyframes fantasyReveal {

          from {
            opacity: 0;

            transform:
              translateY(8px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

        /* =========================
           BACKGROUND GLOW
        ========================= */

        .dice-glow {
          position: absolute;

          width: 400px;
          height: 400px;

          left: 50%;
          top: 40%;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            rgba(220, 164, 183, 0.06);

          filter:
            blur(110px);

          pointer-events: none;
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {

          .dice-page {
            padding:
              35px
              16px
              60px;
          }

          .back-button {
            margin-bottom: 45px;
          }

          .dice-title {
            font-size: 48px;
          }

          .dice-subtitle {
            margin-bottom: 30px;
          }

          .dice-stage {
            width: 230px;
            height: 230px;
          }

          .dice-face {
            width: 150px;
            height: 150px;

            flex-basis: 150px;
          }

          .dot {
            width: 19px;
            height: 19px;
          }

          .name-button {
            min-width: 105px;

            padding:
              11px
              20px;

            font-size: 22px;
          }

          .names {
            gap: 9px;
          }

          .fantasy-message p {
            font-size: 19px;
          }

        }

      `}</style>
    </main>
  );
}