"use client";

import { useRouter } from "next/navigation";

export default function FunPage() {
  const router = useRouter();

  return (
    <main className="fun-page">
      <div className="fun-glow fun-glow-one" />
      <div className="fun-glow fun-glow-two" />

      <section className="fun-container">
        <p className="fun-eyebrow">A LITTLE BONUS WORLD</p>

        <h1 className="fun-title">
          Fun <span>Day</span>
        </h1>

        <p className="fun-subtitle">
          
          <br />
          
          <br />
          
        </p>        <div className="game-grid">
        <a href="/week/fun/mines" className="game-card">
          <div className="game-icon">💣</div>
          <h2>Mines</h2>
          <p>Find the safe tiles. Build your fortune. ❤️</p>
          <span className="game-button">PLAY GAME →</span>
        </a>
          <button
            type="button"
            className="game-card"
            onClick={() => router.push("/week/fun/flappy")}
          >
            <div className="game-icon flappy-icon">♥</div>

            <h2>Flappy Heart</h2>

            <p>
              Fly through the hearts.
              <br />
              Score higher. ❤️
            </p>

            <span>PLAY →</span>
          </button>
        </div>
      </section>

      <style jsx>{`
        .fun-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(155, 79, 105, 0.13),
              transparent 38%
            ),
            #09070a;
          color: #f8f1e8;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 70px 20px;
        }

        .fun-container {
          width: 100%;
          max-width: 900px;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .fun-eyebrow {
          margin: 0 0 18px;
          font-family: var(--font-sans), Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: rgba(220, 164, 183, 0.65);
        }

        .fun-title {
          margin: 0;
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(64px, 10vw, 110px);
          line-height: 0.82;
          font-weight: 500;
          color: #f8f1e8;
        }

        .fun-title span {
          color: #dca4b7;
        }

        .fun-subtitle {
          margin: 35px auto 55px;
          font-family: var(--font-sans), Arial, sans-serif;
          font-size: 13px;
          line-height: 2;
          color: rgba(255, 255, 255, 0.42);
        }

        .game-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          width: 100%;
        }

        .game-card {
          appearance: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.025);
          min-height: 330px;
          padding: 42px 30px;
          color: white;
          cursor: pointer;
          text-align: center;
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            background 0.35s ease,
            box-shadow 0.35s ease;
        }

        .game-card:hover {
          transform: translateY(-6px);
          border-color: rgba(220, 164, 183, 0.35);
          background: rgba(220, 164, 183, 0.045);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
        }

        .game-icon {
          height: 105px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .flappy-icon {
          font-family: Arial, sans-serif;
          font-size: 88px;
          line-height: 1;
          color: #ef6b87;
          text-shadow:
            0 0 8px rgba(239, 107, 135, 0.35),
            0 0 35px rgba(239, 107, 135, 0.18);
        }

        .dice-icon {
          perspective: 700px;
        }

        .mini-dice {
          display: flex;
          width: 78px;
          height: 78px;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: #fff;
          color: #111;
          font-family: Arial, sans-serif;
          font-size: 57px;
          line-height: 1;
          box-shadow:
            inset -7px -7px 0 rgba(0, 0, 0, 0.08),
            0 18px 35px rgba(0, 0, 0, 0.35);
          transform: rotate(-8deg) rotateX(8deg) rotateY(-8deg);
        }

        .riddle-icon {
          width: 78px;
          height: 78px;
          margin: 0 auto 27px;
          border: 1px solid rgba(220, 164, 183, 0.28);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display), Georgia, serif;
          font-size: 54px;
          color: #dca4b7;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
        }
        .game-card h2 {
          margin: 0;
          font-family: var(--font-sans), Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.82);
        }

        .game-card p {
          margin: 18px 0 25px;
          font-family: var(--font-sans), Arial, sans-serif;
          font-size: 12px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.35);
        }

        .game-card span:last-child {
          font-family: var(--font-sans), Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          color: #dca4b7;
        }

        .fun-glow {
          position: absolute;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(100px);
        }

        .fun-glow-one {
          width: 350px;
          height: 350px;
          top: -150px;
          left: -100px;
          background: rgba(220, 164, 183, 0.06);
        }

        .fun-glow-two {
          width: 400px;
          height: 400px;
          bottom: -200px;
          right: -100px;
          background: rgba(107, 53, 75, 0.08);
        }

        @media (max-width: 700px) {
          .game-grid {
            grid-template-columns: 1fr;
          }

          .game-card {
            min-height: 290px;
          }
        }
      `}</style>
    </main>
  );
}
