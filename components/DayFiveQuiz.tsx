"use client";

import { useEffect, useRef, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
  images?: string[];
};

const questions: Question[] = [
  {
    question: "When did we first meet?",
    options: [
      "In college",
      "In the classroom",
      "At the bus stop",
      "During a friends group conversation",
    ],
    answer: 0,
  },
  {
    question: "What was one of our first memorable conversations?",
    options: [
      "On the group bunk",
      "In the corridor",
      "On the first day of college",
      "During a class",
    ],
    answer: 0,
  },
  {
    question: "What nickname did I give you first?",
    options: [
      "Darling",
      "Bacha",
      "Love",
      "Cutie Pie",
    ],
    answer: 2,
  },
  {
    question: "What was one of our funniest moments?",
    options: [
      "At the movie",
      "Giggling continuously for the filter",
      "At the mall",
      "Tempo",
    ],
    answer: 3,
  },
  {
    question:
      "Which photo from our relationship do I secretly love the most?",
    options: [
      "Image 1",
      "Image 3",
      "Image 18",
      "Image 28",
    ],
    answer: 1,
    images: [
      "/images/hero/1.JPG",
      "/images/hero/3.JPG",
      "/images/finale/18.JPG",
      "/images/finale/28.JPG",
    ],
  },
  {
    question: "What is my greatest weakness?",
    options: [
      "Gaming",
      "You",
      "Food",
      "Sleep",
    ],
    answer: 2,
  },
];

function ScratchCoupon({
  onReveal,
}: {
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const revealedRef = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#4a4148";
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "#e4d7de";
    ctx.font = "500 14px Manrope, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "SCRATCH TO REVEAL ❤️",
      rect.width / 2,
      rect.height / 2
    );
  }, []);

  function scratch(event: React.PointerEvent<HTMLCanvasElement>) {
    if (revealedRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 58;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 29, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPoint.current = point;
    checkProgress();
  }

  function checkProgress() {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparent = 0;
    let checked = 0;

    // Sample alpha values across the canvas.
    for (let i = 3; i < pixels.length; i += 32) {
      checked++;
      if (pixels[i] < 80) transparent++;
    }

    // Reveal after roughly 40% of the surface has been scratched.
    if (checked > 0 && transparent / checked > 0.40) {
      revealedRef.current = true;
      scratching.current = false;
      lastPoint.current = null;
      setIsRevealed(true);
      onReveal();
    }
  }

  return (
    <div className="final-scratch-wrap">
      <div className="final-coupon">
        <p className="coupon-small">
          YOUR REWARD ❤️
        </p>

        <h3>
          Jhumkas on Me
        </h3>

        <p>
          One pair of jhumkas of your choice,
          bought by me. 💕
        </p>

        <strong>
          📸 SCREENSHOT THIS TO CLAIM
        </strong>
      </div>

      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="final-scratch-canvas"
          onPointerDown={(e) => {
            scratching.current = true;
            lastPoint.current = null;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={(e) => {
            if (scratching.current) scratch(e);
          }}
          onPointerUp={() => {
            scratching.current = false;
            lastPoint.current = null;
          }}
          onPointerCancel={() => {
            scratching.current = false;
            lastPoint.current = null;
          }}
          onPointerLeave={() => {
            scratching.current = false;
            lastPoint.current = null;
          }}
        />
      )}
    </div>
  );
}

export default function DayFiveQuiz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const revealed = useRef(false);

  const [scratched, setScratched] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);
  const [started, setStarted] = useState(true);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] =
    useState<number | null>(null);
  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (scratched || started) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    ctx.fillStyle = "#4a4148";
    ctx.fillRect(
      0,
      0,
      rect.width,
      rect.height
    );

    ctx.fillStyle = "#d8cbd2";
    ctx.font = "500 15px Manrope, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
      "SCRATCH TO REVEAL ❤️",
      rect.width / 2,
      rect.height / 2
    );
  }, [scratched, started]);

  function scratch(event: React.PointerEvent<HTMLCanvasElement>) {
    if (scratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress();
  }

  function checkScratchProgress() {
    const canvas = canvasRef.current;
    if (!canvas || revealed.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparent = 0;
    let checked = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      checked++;

      if (pixels[i] < 80) {
        transparent++;
      }
    }

    if (
      checked > 0 &&
      transparent / checked > 0.55
    ) {
      revealed.current = true;
      setScratched(true);
      setClaimOpen(true);
    }
  }

  function chooseAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === questions[current].answer) {
      setScore((value) => value + 1);
    }
  }

  function nextQuestion() {
    if (selected === null) return;

    if (current === questions.length - 1) {
      const finalScore =
        score +
        (selected === questions[current].answer
          ? 1
          : 0);

      setFinished(true);
      setWon(finalScore >= 5);

      return;
    }

    setCurrent((value) => value + 1);
    setSelected(null);
  }

  function startQuiz() {
    setClaimOpen(false);
    setStarted(true);
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setWon(false);
    setStarted(true);
  }

  if (finished && won) {
    return (
      <section className="day-five-quiz">
        <div className="result-card">
          <p className="quiz-eyebrow">
            YOU PASSED THE TEST ❤️
          </p>

          <h2>
            Okay, you really know your husband.
          </h2>

          <p className="result-text">
            You got at least five answers right.
            So yes... you earned your reward. ❤️
          </p>

          <img
            className="kiss-gif"
            src="/gif/kiss.gif"
            alt="Kiss"
          />

          <p className="scratch-instruction">
            One final little surprise...
          </p>

          <ScratchCoupon
            onReveal={() => {}}
          />
        </div>

        <style jsx>{styles}</style>
      </section>
    );
  }

  if (finished && !won) {
    return (
      <section className="day-five-quiz">
        <div className="result-card">
          <p className="quiz-eyebrow">
            ALMOST, CUTIE 😭
          </p>

          <h2>
            You need at least 5 correct answers.
          </h2>

          <p className="result-text">
            Nice try. But that jhumka coupon isn't
            going to be that easy to earn. ❤️
          </p>

          <button
            className="quiz-button"
            onClick={restartQuiz}
          >
            TRY AGAIN
          </button>
        </div>

        <style jsx>{styles}</style>
      </section>
    );
  }

  if (started) {
    const question = questions[current];

    return (
      <section className="day-five-quiz">
        <p className="quiz-eyebrow">
          QUESTION {current + 1} OF 6
        </p>

        <h2>
          How Well Do You Know Us? ❤️
        </h2>

        <p className="quiz-question">
          {question.question}
        </p>

        <div className="quiz-options">
          {question.options.map(
            (option, index) => {
              const isCorrect =
                selected !== null &&
                index === question.answer;

              const isWrong =
                selected === index &&
                selected !== question.answer;

              return (
                <button
                  key={option}
                  className={`quiz-option ${
                    isCorrect ? "correct" : ""
                  } ${
                    isWrong ? "wrong" : ""
                  }`}
                  disabled={selected !== null}
                  onClick={() =>
                    chooseAnswer(index)
                  }
                >
                  {question.images?.[index] ? (
                    <img
                      src={question.images[index]}
                      alt={option}
                      className="quiz-option-image"
                    />
                  ) : (
                    <span>{option}</span>
                  )}
                </button>
              );
            }
          )}
        </div>

        {selected !== null && (
          <div className="quiz-feedback">
            <p>
              {selected === question.answer
                ? "Correct. I knew you remembered. ❤️"
                : "Wrong answer, Wifey. 😭❤️"}
            </p>

            <button
              className="quiz-button"
              onClick={nextQuestion}
            >
              {current === 5
                ? "SEE MY RESULT"
                : "NEXT QUESTION →"}
            </button>
          </div>
        )}

        <style jsx>{styles}</style>
      </section>
    );
  }

  return (
    <section className="day-five-quiz">
      <p className="quiz-eyebrow">
        A LITTLE CHALLENGE
      </p>

      <h2>
        There's one little surprise waiting
        for you. ❤️
      </h2>

      <p className="intro-text">
        But before you can claim it, you have
        to prove how well you know us.
      </p>

      {!scratched ? (
        <div className="scratch-wrap">
          <div className="hidden-coupon">
            <span>🎁</span>

            <strong>
              JHUMKAS ON ME ❤️
            </strong>
          </div>

          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onPointerDown={(e) => {
              scratching.current = true;

              e.currentTarget.setPointerCapture(
                e.pointerId
              );

              scratch(e);
            }}
            onPointerMove={(e) => {
              if (scratching.current) {
                scratch(e);
              }
            }}
            onPointerUp={() => {
              scratching.current = false;
            }}
            onPointerCancel={() => {
              scratching.current = false;
            }}
            onPointerLeave={() => {
              scratching.current = false;
            }}
          />
        </div>
      ) : (
        <div className="revealed">
          <p>YOU FOUND IT ❤️</p>

          <h3>
            Jhumkas on Me
          </h3>

          <button
            className="quiz-button"
            onClick={() => setClaimOpen(true)}
          >
            CLAIM MY COUPON
          </button>
        </div>
      )}

      {claimOpen && !started && (
        <div className="modal-backdrop">
          <div className="claim-modal">
            <button
              className="close"
              onClick={() =>
                setClaimOpen(false)
              }
            >
              ×
            </button>

            <p className="quiz-eyebrow">
              ONE LAST THING
            </p>

            <h2>
              Do you really want to claim
              this coupon?
            </h2>

            <p>
              You know the rules, Cutie.
              Answer a few questions about us.
              Get at least five right and the
              jhumka coupon is yours. ❤️
            </p>

            <button
              className="quiz-button"
              onClick={startQuiz}
            >
              I'M READY ❤️
            </button>
          </div>
        </div>
      )}

      <style jsx>{styles}</style>
    </section>
  );
}

const styles = `
  .day-five-quiz {
    position: relative;
    margin-top: 45px;
    padding: 34px 20px;
    border: 1px solid #302b31;
    border-radius: 24px;
    background: #111013;
    text-align: center;
  }

  .quiz-eyebrow {
    margin: 0 0 14px;
    color: #817783;
    font-size: 9px;
    letter-spacing: 4px;
  }

  h2 {
    max-width: 650px;
    margin: 0 auto 18px;
    color: #f1dfe5;
    font-family: "Cormorant Garamond",
      Georgia, serif;
    font-size: clamp(28px, 6vw, 42px);
    font-weight: 500;
    line-height: 1.1;
  }

  .intro-text,
  .result-text {
    max-width: 560px;
    margin: 0 auto 28px;
    color: #b9adb7;
    font-size: 13px;
    line-height: 1.8;
  }

  .scratch-wrap,
  .final-scratch-wrap {
    position: relative;
    width: min(100%, 480px);
    height: 170px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid #514952;
  }

  .hidden-coupon,
  .final-coupon {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #171419;
    color: #f1dfe5;
  }

  .hidden-coupon span {
    font-size: 32px;
  }

  .hidden-coupon strong {
    font-size: 12px;
    letter-spacing: 2px;
  }

  .final-coupon {
    padding: 20px;
  }

  .coupon-small {
    margin: 0;
    color: #817783;
    font-size: 9px;
    letter-spacing: 3px;
  }

  .final-coupon h3 {
    margin: 0;
    color: #f1dfe5;
    font-family: "Cormorant Garamond",
      Georgia, serif;
    font-size: 32px;
    font-weight: 500;
  }

  .final-coupon p {
    margin: 0;
    color: #b9adb7;
    font-size: 13px;
  }

  .final-coupon strong {
    margin-top: 6px;
    color: #e4d7de;
    font-size: 9px;
    letter-spacing: 2px;
  }

  .scratch-canvas,
  .final-scratch-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    touch-action: none;
    cursor: grab;
  }

  .scratch-instruction {
    margin: 20px 0 15px;
    color: #817783;
    font-size: 10px;
    letter-spacing: 2px;
  }

  .revealed {
    padding: 20px 10px;
  }

  .revealed p {
    margin: 0 0 8px;
    color: #817783;
    font-size: 9px;
    letter-spacing: 3px;
  }

  .revealed h3 {
    margin: 0 0 20px;
    color: #f1dfe5;
    font-family: "Cormorant Garamond",
      Georgia, serif;
    font-size: 34px;
    font-weight: 500;
  }

  .quiz-question {
    max-width: 650px;
    margin: 0 auto 25px;
    color: #e7dfe5;
    font-family: "Cormorant Garamond",
      Georgia, serif;
    font-size: clamp(22px, 4vw, 30px);
    line-height: 1.3;
  }

  .quiz-options {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .quiz-option {
    min-height: 58px;
    padding: 14px 16px;
    border: 1px solid #39343b;
    border-radius: 15px;
    background: #171419;
    color: #d8ced6;
    font-family: Manrope, sans-serif;
    font-size: 13px;
    line-height: 1.4;
    cursor: pointer;
    transition: .2s ease;
  }

  .quiz-option:hover:not(:disabled) {
    border-color: #675c67;
    transform: translateY(-1px);
  }
  .quiz-option-image {
    display: block;
    width: 88%;
    height: 220px;
    margin: 10px auto 12px;
    object-fit: contain;
    border-radius: 10px;
  }

  .quiz-option span {
    display: block;
  }

  .quiz-option.correct {
    border-color: #77707a;
    background: #242026;
    color: #f4e8ee;
  }

  .quiz-option.wrong {
    border-color: #4c454d;
    background: #1c181d;
    opacity: .65;
  }

  .quiz-feedback {
    margin-top: 25px;
  }

  .quiz-feedback p {
    margin: 0 0 18px;
    color: #b9adb7;
    font-size: 13px;
  }

  .quiz-button {
    border: 1px solid #514952;
    background: #171419;
    color: #eee5ea;
    padding: 12px 25px;
    border-radius: 999px;
    font-family: Manrope, sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .kiss-gif {
    display: block;
    width: 150px;
    height: 150px;
    object-fit: contain;
    margin: 10px auto 25px;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, .72);
  }

  .claim-modal {
    position: relative;
    width: min(100%, 500px);
    padding: 35px 25px;
    border: 1px solid #514952;
    border-radius: 22px;
    background: #111013;
    text-align: center;
    box-shadow: 0 25px 80px rgba(0, 0, 0, .5);
  }

  .claim-modal p:not(.quiz-eyebrow) {
    margin: 0 auto 25px;
    color: #b9adb7;
    font-size: 13px;
    line-height: 1.8;
  }

  .close {
    position: absolute;
    top: 12px;
    right: 15px;
    border: 0;
    background: transparent;
    color: #817783;
    font-size: 24px;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .day-five-quiz {
      margin-top: 35px;
      padding: 28px 14px;
    }

    .quiz-options {
      grid-template-columns: 1fr;
    }

    .scratch-wrap,
    .final-scratch-wrap {
      height: 155px;
    }

    .claim-modal {
      padding: 32px 20px;
    }
  }
`;