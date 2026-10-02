"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Pipe = {
  x: number;
  gapY: number;
  counted: boolean;
};

const DESKTOP_WIDTH = 900;
const DESKTOP_HEIGHT = 560;

const DESKTOP_BIRD_X = 150;
const MOBILE_BIRD_X = 82;

const BIRD_SIZE = 34;

const GRAVITY = 0.42;
const FLAP_POWER = -7.2;
const PIPE_WIDTH = 78;
const PIPE_GAP = 185;
const PIPE_SPEED = 4.2;

function createPipe(
  x: number,
  gameHeight: number
): Pipe {
  const min = 110;
  const max = gameHeight - 110 - PIPE_GAP;

  return {
    x,
    gapY: min + Math.random() * Math.max(1, max - min),
    counted: false,
  };
}

export default function FlappyHeartPage() {
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const gameWidthRef = useRef(DESKTOP_WIDTH);
  const gameHeightRef = useRef(DESKTOP_HEIGHT);
  const birdXRef = useRef(DESKTOP_BIRD_X);
  const mobileRef = useRef(false);

  const birdYRef = useRef(DESKTOP_HEIGHT / 2);
  const velocityRef = useRef(0);
  const pipesRef = useRef<Pipe[]>([]);
  const scoreRef = useRef(0);
  const runningRef = useRef(false);
  const gameOverRef = useRef(false);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [mobile, setMobile] = useState(false);

  const configureGameSize = useCallback(() => {
    const isMobile = window.matchMedia("(max-width: 800px)").matches;

    mobileRef.current = isMobile;
    setMobile(isMobile);

    if (isMobile) {
      const width = Math.min(window.innerWidth * 0.96, 430);
      const height = Math.max(560, window.innerHeight - 125);

      gameWidthRef.current = width;
      gameHeightRef.current = height;
      birdXRef.current = Math.min(MOBILE_BIRD_X, width * 0.22);
    } else {
      gameWidthRef.current = DESKTOP_WIDTH;
      gameHeightRef.current = DESKTOP_HEIGHT;
      birdXRef.current = DESKTOP_BIRD_X;
    }

    const width = gameWidthRef.current;
    const height = gameHeightRef.current;

    birdYRef.current = height / 2;

    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }

    pipesRef.current = [
      createPipe(width + 160, height),
      createPipe(width + 520, height),
      createPipe(width + 880, height),
    ];
  }, []);

  const drawHeart = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha = 1
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      const top = y - size * 0.25;

      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.45);
      ctx.bezierCurveTo(
        x - size * 0.65,
        y - size * 0.05,
        x - size * 0.55,
        top - size * 0.55,
        x,
        top - size * 0.05
      );
      ctx.bezierCurveTo(
        x + size * 0.55,
        top - size * 0.55,
        x + size * 0.65,
        y - size * 0.05,
        x,
        y + size * 0.45
      );
      ctx.closePath();

      const gradient = ctx.createLinearGradient(
        x - size,
        y - size,
        x + size,
        y + size
      );

      gradient.addColorStop(0, "#ff9aae");
      gradient.addColorStop(0.5, "#f15d7d");
      gradient.addColorStop(1, "#d62f59");

      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(241,93,125,0.45)";
      ctx.shadowBlur = 18;
      ctx.fill();

      ctx.shadowBlur = 0;

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.beginPath();
      ctx.arc(
        x - size * 0.18,
        y - size * 0.08,
        Math.max(2, size * 0.07),
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();
    },
    []
  );

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAME_WIDTH = gameWidthRef.current;
    const GAME_HEIGHT = gameHeightRef.current;
    const BIRD_X = birdXRef.current;

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const background = ctx.createLinearGradient(
      0,
      0,
      0,
      GAME_HEIGHT
    );

    background.addColorStop(0, "#19111b");
    background.addColorStop(1, "#09070a");

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const glow = ctx.createRadialGradient(
      GAME_WIDTH * 0.5,
      GAME_HEIGHT * 0.45,
      20,
      GAME_WIDTH * 0.5,
      GAME_HEIGHT * 0.45,
      Math.max(400, GAME_WIDTH * 0.55)
    );

    glow.addColorStop(0, "rgba(220,164,183,0.08)");
    glow.addColorStop(1, "rgba(220,164,183,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const heartCount = mobileRef.current ? 22 : 15;

    for (let i = 0; i < heartCount; i++) {
      const x = (i * 97 + 50) % GAME_WIDTH;
      const y = (i * 137 + 80) % GAME_HEIGHT;

      drawHeart(ctx, x, y, 11, 0.08);
    }

    pipesRef.current.forEach((pipe) => {
      const topHeight = pipe.gapY;
      const bottomY = pipe.gapY + PIPE_GAP;

      const pipeGradient = ctx.createLinearGradient(
        pipe.x,
        0,
        pipe.x + PIPE_WIDTH,
        0
      );

      pipeGradient.addColorStop(0, "#8d4059");
      pipeGradient.addColorStop(0.5, "#c66a83");
      pipeGradient.addColorStop(1, "#7c334d");

      ctx.fillStyle = pipeGradient;

      ctx.fillRect(
        pipe.x,
        0,
        PIPE_WIDTH,
        topHeight
      );

      ctx.fillRect(
        pipe.x,
        bottomY,
        PIPE_WIDTH,
        GAME_HEIGHT - bottomY
      );

      ctx.fillStyle = "#d18499";

      ctx.fillRect(
        pipe.x - 7,
        topHeight - 17,
        PIPE_WIDTH + 14,
        17
      );

      ctx.fillRect(
        pipe.x - 7,
        bottomY,
        PIPE_WIDTH + 14,
        17
      );

      ctx.fillStyle = "rgba(255,255,255,0.12)";

      ctx.fillRect(
        pipe.x + 11,
        0,
        7,
        topHeight - 20
      );

      ctx.fillRect(
        pipe.x + 11,
        bottomY + 20,
        7,
        GAME_HEIGHT - bottomY
      );
    });

    drawHeart(
      ctx,
      BIRD_X,
      birdYRef.current,
      BIRD_SIZE,
      1
    );

    if (!started) {
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      ctx.textAlign = "center";

      ctx.font = mobileRef.current
        ? "36px Georgia, serif"
        : "48px Georgia, serif";

      ctx.fillStyle = "#f8f1e8";

      ctx.fillText(
        "Flappy Heart",
        GAME_WIDTH / 2,
        GAME_HEIGHT * 0.42
      );

      ctx.font = "14px Manrope, Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.5)";

      ctx.fillText(
        "Tap or press SPACE to fly",
        GAME_WIDTH / 2,
        GAME_HEIGHT * 0.48
      );

      ctx.font = "12px Manrope, Arial, sans-serif";
      ctx.fillStyle = "#dca4b7";

      ctx.fillText(
        "Your heart is counting on you. ❤️",
        GAME_WIDTH / 2,
        GAME_HEIGHT * 0.53
      );
    }

    if (gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.58)";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      ctx.textAlign = "center";

      ctx.font = mobileRef.current
        ? "42px Georgia, serif"
        : "52px Georgia, serif";

      ctx.fillStyle = "#f8f1e8";

      ctx.fillText(
        "Game Over",
        GAME_WIDTH / 2,
        GAME_HEIGHT * 0.42
      );

      ctx.font = "18px Manrope, Arial, sans-serif";
      ctx.fillStyle = "#dca4b7";

      ctx.fillText(
        `Score · ${scoreRef.current}`,
        GAME_WIDTH / 2,
        GAME_HEIGHT * 0.49
      );
    }
  }, [drawHeart, gameOver, started]);

  const resetGame = useCallback(() => {
    const width = gameWidthRef.current;
    const height = gameHeightRef.current;

    birdYRef.current = height / 2;
    velocityRef.current = 0;

    pipesRef.current = [
      createPipe(width + 160, height),
      createPipe(width + 520, height),
      createPipe(width + 880, height),
    ];

    scoreRef.current = 0;

    setScore(0);
    setGameOver(false);
    setStarted(true);

    gameOverRef.current = false;
    runningRef.current = true;
  }, []);

  const flap = useCallback(() => {
    if (!started) {
      resetGame();
      return;
    }

    if (gameOverRef.current) return;

    velocityRef.current = FLAP_POWER;
  }, [resetGame, started]);

  useEffect(() => {
    configureGameSize();

    const handleResize = () => {
      configureGameSize();
      drawGame();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [configureGameSize, drawGame]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const loop = () => {
      const GAME_WIDTH = gameWidthRef.current;
      const GAME_HEIGHT = gameHeightRef.current;
      const BIRD_X = birdXRef.current;

      if (runningRef.current && !gameOverRef.current) {
        velocityRef.current += GRAVITY;
        birdYRef.current += velocityRef.current;

        pipesRef.current.forEach((pipe) => {
          pipe.x -= PIPE_SPEED;

          if (
            !pipe.counted &&
            pipe.x + PIPE_WIDTH < BIRD_X
          ) {
            pipe.counted = true;

            scoreRef.current += 1;
            setScore(scoreRef.current);
          }
        });

        const lastPipe =
          pipesRef.current[pipesRef.current.length - 1];

        if (
          lastPipe &&
          lastPipe.x < GAME_WIDTH - 270
        ) {
          pipesRef.current.push(
            createPipe(GAME_WIDTH + 80, GAME_HEIGHT)
          );
        }

        pipesRef.current =
          pipesRef.current.filter(
            (pipe) =>
              pipe.x > -PIPE_WIDTH - 20
          );

        const birdTop =
          birdYRef.current -
          BIRD_SIZE * 0.4;

        const birdBottom =
          birdYRef.current +
          BIRD_SIZE * 0.4;

        let hit = false;

        if (
          birdTop < 0 ||
          birdBottom > GAME_HEIGHT
        ) {
          hit = true;
        }

        for (const pipe of pipesRef.current) {
          const horizontal =
            BIRD_X +
              BIRD_SIZE * 0.35 >
              pipe.x &&
            BIRD_X -
              BIRD_SIZE * 0.35 <
              pipe.x + PIPE_WIDTH;

          const vertical =
            birdTop < pipe.gapY ||
            birdBottom >
              pipe.gapY + PIPE_GAP;

          if (horizontal && vertical) {
            hit = true;
            break;
          }
        }

        if (hit) {
          gameOverRef.current = true;
          runningRef.current = false;
          setGameOver(true);
        }
      }

      drawGame();

      animationRef.current =
        requestAnimationFrame(loop);
    };

    animationRef.current =
      requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [drawGame]);

  useEffect(() => {
    const handleKey = (
      event: KeyboardEvent
    ) => {
      if (
        event.code === "Space" ||
        event.code === "ArrowUp"
      ) {
        event.preventDefault();
        flap();
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [flap]);

  return (
    <main className="flappy-page">
      <section className="flappy-wrapper">

        <div className="top-controls">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              router.push("/week/fun")
            }
          >
            ← Fun Day
          </button>

          <div className="top-score">
            <span>SCORE</span>
            <strong>{score}</strong>
          </div>

          <button
            type="button"
            className="restart-button"
            onClick={resetGame}
          >
            Restart
          </button>

        </div>

        <div
          className="game-area"
          onPointerDown={flap}
          role="button"
          tabIndex={0}
          aria-label="Flappy Heart game"
        >
          <canvas
            ref={canvasRef}
          />
        </div>

        {gameOver && (
          <div className="result-overlay">
            <div className="result-card">

              {score > 5 ? (
                <>
                  <h2>
                    My Wifey is the best. ❤️
                  </h2>

                  <p>
                    You played really well.
                  </p>

                  <img
                    src="/gif/kiss.gif"
                    alt="Kissing cats"
                    className="result-gif"
                  />

                  <button
                    type="button"
                    className="result-button"
                    onClick={() =>
                      router.push("/week/fun")
                    }
                  >
                    GO BACK
                  </button>
                </>
              ) : (
                <>
                  <h2>
                    That is not my wife's
                    problem. 😭
                  </h2>

                  <p>
                    That is the network problem.
                  </p>

                  <p>
                    My wife can score a
                    little bit more. ❤️
                  </p>

                  <img
                    src="/gif/sad.gif"
                    alt="Sad cat"
                    className="result-gif"
                  />

                  <button
                    type="button"
                    className="result-button"
                    onClick={resetGame}
                  >
                    TRY AGAIN
                  </button>
                </>
              )}

            </div>
          </div>
        )}

      </section>

      <style jsx>{`
        .flappy-page {
          min-height: 100vh;
          min-height: 100dvh;
          background: #09070a;
          color: #f8f1e8;
          padding: 14px 0 30px;
          font-family:
            var(--font-sans),
            Arial,
            sans-serif;
          overflow: hidden;
        }

        .flappy-wrapper {
          width: 100%;
          min-height: calc(100dvh - 44px);
          position: relative;
        }

        .top-controls {
          width: min(900px, 96vw);
          margin: 0 auto 12px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          position: relative;
          z-index: 5;
        }

        .back-button,
        .restart-button {
          border-radius: 999px;
          cursor: pointer;
          font-family: var(--font-sans), Arial, sans-serif;
        }

        .back-button {
          justify-self: start;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          padding: 10px 16px;
          color: rgba(255,255,255,0.55);
          font-size: 11px;
        }

        .restart-button {
          justify-self: end;
          border: 1px solid rgba(220,164,183,0.3);
          background: rgba(220,164,183,0.08);
          padding: 10px 18px;
          color: #e8bac8;
          font-size: 10px;
          letter-spacing: 0.08em;
        }

        .top-score {
          text-align: center;
        }

        .top-score span {
          display: block;
          margin-bottom: 1px;
          font-size: 7px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.3);
        }

        .top-score strong {
          display: block;
          font-family:
            var(--font-display),
            Georgia,
            serif;
          font-size: 27px;
          font-weight: 500;
          color: #dca4b7;
        }

        .game-area {
          width: min(900px, 96vw);
          height: auto;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid
            rgba(220,164,183,0.18);
          border-radius: 24px;
          box-shadow:
            0 30px 80px
              rgba(0,0,0,0.45),
            inset 0 0 60px
              rgba(255,255,255,0.015);
          cursor: pointer;
          outline: none;
          background: #09070a;
        }

        .game-area canvas {
          display: block;
          width: 100%;
          height: auto;
          margin: 0;
          padding: 0;
        }

        .result-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background:
            rgba(5,3,6,0.78);
          backdrop-filter: blur(10px);
        }

        .result-card {
          width: min(430px, 90vw);
          padding: 30px 24px;
          text-align: center;
          border: 1px solid
            rgba(220,164,183,0.25);
          border-radius: 26px;
          background: #121013;
          box-shadow:
            0 30px 90px
              rgba(0,0,0,0.65);
        }

        .result-card h2 {
          margin: 0;
          font-family:
            var(--font-display),
            Georgia,
            serif;
          font-size: 31px;
          font-weight: 500;
          color: #f8f1e8;
        }

        .result-card p {
          margin: 10px 0 0;
          color: rgba(255,255,255,0.55);
          font-size: 12px;
          line-height: 1.6;
        }

        .result-gif {
          display: block;
          width: 145px;
          height: 145px;
          margin: 20px auto;
          object-fit: cover;
          border-radius: 20px;
        }

        .result-button {
          border: 1px solid
            rgba(220,164,183,0.35);
          border-radius: 999px;
          background:
            rgba(220,164,183,0.1);
          padding: 12px 26px;
          color: #e8bac8;
          font-size: 11px;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        @media (max-width: 800px) {
          .flappy-page {
            padding: 10px 0 12px;
          }

          .flappy-wrapper {
            min-height: calc(100dvh - 22px);
          }

          .top-controls {
            width: 96vw;
            margin-bottom: 8px;
          }

          .back-button {
            padding: 8px 12px;
            font-size: 10px;
          }

          .restart-button {
            padding: 8px 13px;
            font-size: 9px;
          }

          .top-score strong {
            font-size: 25px;
          }

          .game-area {
            width: 96vw;
            height: calc(100dvh - 125px);
            min-height: 560px;
            max-height: none;
          }

          .game-area canvas {
            width: 100%;
            height: 100%;
          }

          .result-card {
            width: 88vw;
            padding: 26px 20px;
          }

          .result-card h2 {
            font-size: 28px;
          }
        }

        @media (min-width: 801px) {
          .game-area {
            max-height: 560px;
          }
        }
      `}</style>
    </main>
  );
}