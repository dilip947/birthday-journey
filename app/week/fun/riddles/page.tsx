"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question:
      "A bat and a ball cost ₹110 together. The bat costs ₹100 more than the ball. How much does the ball cost?",
    options: ["₹5", "₹10", "₹4", "₹6"],
    answer: 0,
    explanation:
      "If the ball costs ₹5, the bat costs ₹105. Together they make exactly ₹110.",
  },

  {
    question:
      "An analogue clock shows exactly 3:15. What is the smaller angle between the hour hand and the minute hand?",
    options: ["7.5°", "7°", "8°", "7.25°"],
    answer: 0,
    explanation:
      "The minute hand is at 90°, but the hour hand has already moved 7.5° past 3 because 15 minutes have passed.",
  },

  {
    question:
      "Five identical machines make five widgets in five minutes. At the same rate, how long will 100 machines take to make 100 widgets?",
    options: ["5 minutes", "4 minutes", "6 minutes", "10 minutes"],
    answer: 0,
    explanation:
      "Each machine makes one widget in five minutes. With 100 machines working simultaneously, 100 widgets still take five minutes.",
  },

  {
    question:
      "A patch of lily pads doubles its area every day. It completely covers a lake on day 48. On which day was the lake exactly half covered?",
    options: ["Day 47", "Day 46", "Day 48", "Day 24"],
    answer: 0,
    explanation:
      "Because the patch doubles each day, it must have been half its final size exactly one day before it became full.",
  },

  {
    question:
      "A woman has four daughters. Each daughter has exactly one brother. How many children does the woman have?",
    options: ["5", "4", "8", "9"],
    answer: 0,
    explanation:
      "The four daughters all share the same brother. Four daughters plus one brother equals five children.",
  },

  {
    question:
      "A girl has as many brothers as sisters. Each of her brothers has half as many brothers as sisters. How many children are in the family?",
    options: ["7", "6", "8", "9"],
    answer: 0,
    explanation:
      "There are 4 girls and 3 boys. Each girl sees 3 brothers and 3 sisters. Each boy sees 2 brothers and 4 sisters, so the brothers are half the sisters.",
  },

  {
    question:
      "What comes next in this sequence? 1, 11, 21, 1211, 111221, ___",
    options: [
      "312211",
      "311221",
      "312121",
      "321211",
    ],
    answer: 0,
    explanation:
      "Each number describes the previous number: 111221 is three 1s, two 2s, and one 1 — giving 312211.",
  },

  {
    question:
      "A doctor tells you to take three pills, one every 30 minutes. If you take the first pill immediately, how long does the entire course take?",
    options: ["60 minutes", "90 minutes", "75 minutes", "45 minutes"],
    answer: 0,
    explanation:
      "You take pill one immediately, pill two after 30 minutes, and pill three after another 30 minutes. The total elapsed time is 60 minutes.",
  },

  {
    question:
      "You are running a race. You overtake the person currently in second place. What position are you now in?",
    options: ["Second", "First", "Third", "It cannot be determined"],
    answer: 0,
    explanation:
      "You take the position of the person you passed. Since that person was second, you become second.",
  },

  {
    question:
      "Three friends pay ₹30 for a room. The room actually costs ₹25. A bellboy returns ₹5, keeps ₹2, and gives ₹1 back to each friend. Which equation correctly accounts for all ₹30?",
    options: [
      "₹27 + ₹2 = ₹29",
      "₹27 + ₹3 = ₹30",
      "₹25 + ₹2 + ₹3 = ₹30",
      "₹25 + ₹5 = ₹30, so ₹2 is missing",
    ],
    answer: 2,
    explanation:
      "The friends ultimately paid ₹27: ₹25 went to the hotel and ₹2 stayed with the bellboy. The ₹3 returned to the friends completes the original ₹30.",
  },
];

export default function RiddlesPage() {
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const question = questions[current];

  const chooseAnswer = (index: number) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((value) => value + 1);
    }
  };

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((value) => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setShowReward(false);
  };

  if (finished) {
    return (
      <main className="riddle-page">
        <section className="result-card">

          <p className="eyebrow">RIDDLE CHALLENGE</p>

          <h1>
            {score === questions.length
              ? "You cracked every one. 🧠"
              : score >= 7
                ? "That was seriously close. ❤️"
                : "The riddles got you this time. 😭"}
          </h1>

          <div className="final-score">
            {score}
            <span> / {questions.length}</span>
          </div>

          <p className="result-text">
            {score === questions.length
              ? "My wifey is officially too smart. I knew it. ❤️"
              : score >= 7
                ? "Okay wifey, that brain is definitely working."
                : "No worries. My wifey gets another chance."}
          </p>

          {score === questions.length ? (
            <button
              type="button"
              className="primary-button"
              onClick={() => setShowReward(true)}
            >
              VIEW REWARD
            </button>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={restart}
            >
              TRY AGAIN
            </button>
          )}

          <button
            type="button"
            className="back-button"
            onClick={() => router.push("/week/fun")}
          >
            ← Fun Day
          </button>

        </section>

        {showReward && (
          <div className="reward-overlay">
            <div className="reward-card">

              <p className="eyebrow">
                YOU DID IT
              </p>

              <h2>
                My wifey is the best. ❤️
              </h2>

              <img
                src="/gif/kiss.gif"
                alt="Kissing cats"
                className="reward-gif"
              />

              <p>
                You actually cracked all of them.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={() => router.push("/week/fun")}
              >
                GO BACK
              </button>

            </div>
          </div>
        )}

        <style jsx>{`
          .riddle-page {
            min-height: 100vh;
            min-height: 100dvh;
            background: #09070a;
            color: #f8f1e8;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px 20px;
            font-family: var(--font-sans), Arial, sans-serif;
          }

          .result-card {
            width: min(620px, 94vw);
            text-align: center;
            padding: 45px 30px;
            border: 1px solid rgba(220,164,183,0.18);
            border-radius: 28px;
            background: #121013;
            box-shadow: 0 30px 90px rgba(0,0,0,0.5);
          }

          .eyebrow {
            margin: 0 0 15px;
            font-size: 8px;
            letter-spacing: 0.45em;
            color: rgba(220,164,183,0.65);
          }

          h1 {
            margin: 0;
            font-family: var(--font-display), Georgia, serif;
            font-size: 42px;
            font-weight: 500;
          }

          .final-score {
            margin: 25px 0 12px;
            font-family: var(--font-display), Georgia, serif;
            font-size: 72px;
            color: #dca4b7;
          }

          .final-score span {
            font-size: 28px;
            color: rgba(255,255,255,0.3);
          }

          .result-text {
            color: rgba(255,255,255,0.5);
            line-height: 1.7;
            font-size: 13px;
            margin: 0 0 28px;
          }

          .primary-button,
          .back-button {
            border-radius: 999px;
            cursor: pointer;
            font-family: var(--font-sans), Arial, sans-serif;
          }

          .primary-button {
            border: 1px solid rgba(220,164,183,0.35);
            background: rgba(220,164,183,0.1);
            color: #e8bac8;
            padding: 12px 25px;
            font-size: 10px;
            letter-spacing: 0.1em;
          }

          .back-button {
            display: block;
            margin: 16px auto 0;
            border: 0;
            background: transparent;
            color: rgba(255,255,255,0.4);
            padding: 8px 15px;
            font-size: 10px;
          }

          .reward-overlay {
            position: fixed;
            inset: 0;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(5,3,6,0.82);
            backdrop-filter: blur(10px);
          }

          .reward-card {
            width: min(430px, 90vw);
            padding: 32px 24px;
            text-align: center;
            border: 1px solid rgba(220,164,183,0.25);
            border-radius: 26px;
            background: #121013;
            box-shadow: 0 30px 90px rgba(0,0,0,0.65);
          }

          .reward-card h2 {
            margin: 0;
            font-family: var(--font-display), Georgia, serif;
            font-size: 32px;
            font-weight: 500;
          }

          .reward-gif {
            display: block;
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 20px;
            margin: 22px auto;
          }

          .reward-card p:not(.eyebrow) {
            color: rgba(255,255,255,0.5);
            font-size: 12px;
            margin: 0 0 20px;
          }

          @media (max-width: 600px) {
            h1 {
              font-size: 34px;
            }

            .result-card {
              padding: 35px 20px;
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="riddle-page">
      <section className="riddle-container">

        <div className="top-bar">
          <button
            type="button"
            className="back-button"
            onClick={() => router.push("/week/fun")}
          >
            ← Fun Day
          </button>

          <div className="progress">
            {current + 1} / {questions.length}
          </div>

          <div className="score">
            SCORE {score}
          </div>
        </div>

        <div className="question-card">

          <p className="eyebrow">
            RIDDLE {current + 1}
          </p>

          <h1>
            {question.question}
          </h1>

          <div className="options">
            {question.options.map((option, index) => {

              const isCorrect =
                selected !== null &&
                index === question.answer;

              const isWrong =
                selected === index &&
                index !== question.answer;

              return (
                <button
                  key={option}
                  type="button"
                  className={[
                    "option",
                    isCorrect ? "correct" : "",
                    isWrong ? "wrong" : "",
                  ].join(" ")}
                  onClick={() => chooseAnswer(index)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="explanation">
              <strong>
                {selected === question.answer
                  ? "Correct. 🧠"
                  : "Not quite. 👀"}
              </strong>

              <p>
                {question.explanation}
              </p>

              <button
                type="button"
                className="next-button"
                onClick={nextQuestion}
              >
                {current === questions.length - 1
                  ? "SEE RESULT"
                  : "NEXT RIDDLE →"}
              </button>
            </div>
          )}

        </div>

      </section>

      <style jsx>{`
        .riddle-page {
          min-height: 100vh;
          min-height: 100dvh;
          background: #09070a;
          color: #f8f1e8;
          padding: 30px 20px 50px;
          font-family: var(--font-sans), Arial, sans-serif;
        }

        .riddle-container {
          width: min(760px, 94vw);
          margin: 0 auto;
        }

        .top-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          margin-bottom: 25px;
        }

        .back-button {
          justify-self: start;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.55);
          padding: 10px 16px;
          cursor: pointer;
          font-size: 10px;
        }

        .progress {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.35);
        }

        .score {
          justify-self: end;
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #dca4b7;
        }

        .question-card {
          border: 1px solid rgba(220,164,183,0.18);
          border-radius: 28px;
          background: #121013;
          padding: 42px 38px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.4);
        }

        .eyebrow {
          margin: 0 0 18px;
          text-align: center;
          font-size: 8px;
          letter-spacing: 0.45em;
          color: rgba(220,164,183,0.65);
        }

        h1 {
          margin: 0 auto 35px;
          max-width: 650px;
          text-align: center;
          font-family: var(--font-display), Georgia, serif;
          font-size: 31px;
          line-height: 1.25;
          font-weight: 500;
        }

        .options {
          display: grid;
          gap: 12px;
        }

        .option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px;
          background: rgba(255,255,255,0.025);
          color: rgba(255,255,255,0.75);
          padding: 15px 17px;
          cursor: pointer;
          font-size: 13px;
          transition: 0.2s ease;
        }

        .option:hover {
          border-color: rgba(220,164,183,0.3);
          background: rgba(220,164,183,0.05);
        }

        .option:disabled {
          cursor: default;
        }

        .option-letter {
          width: 28px;
          height: 28px;
          flex: 0 0 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          color: #dca4b7;
          font-size: 10px;
        }

        .option.correct {
          border-color: rgba(120,190,150,0.55);
          background: rgba(120,190,150,0.08);
        }

        .option.wrong {
          border-color: rgba(220,100,120,0.55);
          background: rgba(220,100,120,0.08);
        }

        .explanation {
          margin-top: 22px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
          text-align: center;
        }

        .explanation strong {
          color: #dca4b7;
          font-family: var(--font-display), Georgia, serif;
          font-size: 22px;
          font-weight: 500;
        }

        .explanation p {
          margin: 8px auto 18px;
          max-width: 600px;
          color: rgba(255,255,255,0.45);
          font-size: 11px;
          line-height: 1.7;
        }

        .next-button {
          border: 1px solid rgba(220,164,183,0.3);
          border-radius: 999px;
          background: rgba(220,164,183,0.08);
          color: #e8bac8;
          padding: 11px 22px;
          cursor: pointer;
          font-size: 10px;
          letter-spacing: 0.08em;
        }

        @media (max-width: 600px) {
          .riddle-page {
            padding: 18px 14px 35px;
          }

          .question-card {
            padding: 30px 18px;
            border-radius: 22px;
          }

          h1 {
            font-size: 25px;
            margin-bottom: 28px;
          }

          .option {
            padding: 13px 12px;
            font-size: 12px;
          }

          .top-bar {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </main>
  );
}