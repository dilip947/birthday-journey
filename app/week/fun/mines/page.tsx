"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const SIZE = 25;
const STARTING_BALANCE = 100;
const ROUND_COST = 20;
const FIRST_REWARD = 5;
const FIFTH_REWARD = 10;
const MINE_COUNT = 3;
type Tile = {
  mine: boolean;
  revealed: boolean;
};

function makeBoard(): Tile[] {
  const mines = new Set<number>();

  while (mines.size < MINE_COUNT) {
    mines.add(Math.floor(Math.random() * SIZE));
  }

  return Array.from({ length: SIZE }, (_, index) => ({
    mine: mines.has(index),
    revealed: false,
  }));
}

export default function MinesPage() {
  const router = useRouter();

  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [board, setBoard] = useState<Tile[]>([]);
  const [playing, setPlaying] = useState(false);
  const [safeCount, setSafeCount] = useState(0);
  const [message, setMessage] = useState("Ready to test your luck, wifey? ❤️");
  const [roundResult, setRoundResult] = useState<"win" | "mine" | null>(null);
  const [bestBalance, setBestBalance] = useState(STARTING_BALANCE);

  const reward = useMemo(() => {
    if (safeCount >= 5) return FIFTH_REWARD;
    return FIRST_REWARD;
  }, [safeCount]);

  const startGame = () => {
    if (balance < ROUND_COST) {
      setMessage("Not enough fortune points. 😭");
      return;
    }

    setBalance((value) => value - ROUND_COST);
    setBoard(makeBoard());
    setSafeCount(0);
    setPlaying(true);
    setRoundResult(null);
    setMessage("Choose your first tile... 😈");
  };

  const revealTile = (index: number) => {
    if (!playing || board[index]?.revealed) return;

    const tile = board[index];

    if (tile.mine) {
      const updated = board.map((item) => ({
        ...item,
        revealed: item.mine || item.revealed,
      }));

      setBoard(updated);
      setPlaying(false);
      setRoundResult("mine");
      setMessage(
        safeCount >= 4
          ? "You found the mine after building a little fortune. 😭"
          : "BOOM. The mine got you. 💣"
      );
      return;
    }

    const nextSafeCount = safeCount + 1;
    const earned = nextSafeCount >= 5 ? FIFTH_REWARD : FIRST_REWARD;
    const nextBalance = balance + earned;

    const updated = board.map((item, itemIndex) =>
      itemIndex === index ? { ...item, revealed: true } : item
    );

    setBoard(updated);
    setSafeCount(nextSafeCount);
    setBalance(nextBalance);
    setBestBalance((value) => Math.max(value, nextBalance));

    if (nextSafeCount === SIZE - MINE_COUNT) {
      setPlaying(false);
      setRoundResult("win");
      setMessage("YOU CLEARED THE WHOLE BOARD! 👑❤️");
      return;
    }

    setMessage(
      nextSafeCount === 4
        ? "BREAK-EVEN! One more safe tile changes the reward. 👀"
        : nextSafeCount >= 5
          ? `SAFE! +${earned} points. You're getting dangerous. 🔥`
          : `SAFE! +${earned} points. Keep going, wifey. ❤️`
    );
  };

  const resetGame = () => {
    setBoard([]);
    setPlaying(false);
    setSafeCount(0);
    setRoundResult(null);
    setMessage("Ready to test your luck, wifey? ❤️");
  };

  return (
    <main className="mines-page">
      <header className="mines-header">
        <button className="back-button" onClick={() => router.push("/week/fun")}>
          ← Fun Day
        </button>

        <div className="balance">
          <span>FORTUNE</span>
          <strong>{balance} 💰</strong>
        </div>

        <button className="restart-button" onClick={resetGame}>
          Restart
        </button>
      </header>

      <section className="hero">
        <p className="eyebrow">WIFEY FORTUNE</p>
        <h1>💣 Mines</h1>
        <p className="subtitle">
          Find the safe tiles. Avoid the mines. Build your fortune. ❤️
        </p>
      </section>

      <section className="game-card">
        <div className="game-info">
          <div>
            <span>ROUND COST</span>
            <strong>20 💰</strong>
          </div>

          <div>
            <span>SAFE REVEALS</span>
            <strong>{safeCount}</strong>
          </div>

          <div>
            <span>NEXT REWARD</span>
            <strong>+{reward} 💰</strong>
          </div>
        </div>

        {!playing && board.length === 0 && (
          <div className="start-screen">
            <div className="bomb">💣</div>
            <h2>Ready, Wifey?</h2>
            <p>
              Every round costs 20 points.
              <br />
              Safe tiles earn points.
              <br />
              The fifth safe tile unlocks the bigger reward.
            </p>

            <button
              className="play-button"
              onClick={startGame}
              disabled={balance < ROUND_COST}
            >
              PLAY GAME — 20 💰
            </button>
          </div>
        )}

        {board.length > 0 && (
          <>
            <div className="message">{message}</div>

            <div className="mine-grid">
              {board.map((tile, index) => (
                <button
                  key={index}
                  className={`mine-tile ${
                    tile.revealed ? (tile.mine ? "mine" : "safe") : ""
                  }`}
                  onClick={() => revealTile(index)}
                  disabled={!playing || tile.revealed}
                >
                  {tile.revealed ? (tile.mine ? "💣" : "💎") : "?"}
                </button>
              ))}
            </div>

            {!playing && (
              <div className={`result ${roundResult}`}>
                {roundResult === "mine" ? (
                  <>
                    <strong>💥 Mine!</strong>
                    <span>The board got you this time.</span>
                  </>
                ) : (
                  <>
                    <strong>👑 Board cleared!</strong>
                    <span>Wifey has officially become dangerous.</span>
                  </>
                )}

                <button className="play-button" onClick={startGame}>
                  PLAY AGAIN — 20 💰
                </button>
              </div>
            )}
          </>
        )}

        {playing && (
          <div className="continue-note">
            Every safe reveal adds to your fortune. Choose carefully. 👀
          </div>
        )}
      </section>

      <section className="coupons">
        <div className="coupon-heading">
          <span>🔒</span>
          <div>
            <p className="eyebrow">SECRET REWARDS</p>
            <h2>Wifey Coupons</h2>
            <p>Keep playing. Your hidden rewards unlock as your fortune grows.</p>
          </div>
        </div>

        <Coupon
          unlocked={bestBalance >= 150}
          threshold="150+ FORTUNE"
          title="30-Minute Wifey Privilege"
          text="A special 30-minute of Oral ❤️"
        />

        <Coupon
          unlocked={bestBalance >= 200}
          threshold="200+ FORTUNE"
          title="Three-Round Pass"
          text="Three special rounds for my sexy wifey ❤️"
        />

        <Coupon
          unlocked={bestBalance >= 250}
          threshold="250+ FORTUNE"
          title="👑 Ultimate Wifey Pass"
          text="Three rounds with one-hour Oral for each.❤️"
        />
      </section>

      <style jsx>{`
        .mines-page {
          min-height: 100vh;
          padding: 24px 20px 60px;
          background:
            radial-gradient(circle at top, rgba(255, 105, 180, 0.12), transparent 35%),
            #09090d;
          color: #fff;
          font-family: inherit;
        }

        .mines-header {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
        }

        button {
          font: inherit;
        }

        .back-button,
        .restart-button {
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.06);
          color: #fff;
          border-radius: 12px;
          padding: 10px 15px;
          cursor: pointer;
        }

        .back-button {
          justify-self: start;
        }

        .restart-button {
          justify-self: end;
        }

        .balance {
          text-align: center;
        }

        .balance span,
        .game-info span {
          display: block;
          font-size: 10px;
          letter-spacing: .14em;
          opacity: .55;
        }

        .balance strong {
          font-size: 20px;
        }

        .hero {
          text-align: center;
          margin: 42px auto 25px;
        }

        .eyebrow {
          margin: 0 0 7px;
          font-size: 11px;
          letter-spacing: .18em;
          opacity: .55;
          font-weight: 700;
        }

        h1 {
          margin: 0;
          font-size: clamp(38px, 7vw, 58px);
        }

        .subtitle {
          margin: 8px 0 0;
          opacity: .65;
        }

        .game-card {
          max-width: 620px;
          margin: 0 auto;
          padding: 22px;
          border-radius: 24px;
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,255,255,.09);
          box-shadow: 0 25px 80px rgba(0,0,0,.35);
        }

        .game-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
          text-align: center;
        }

        .game-info > div {
          padding: 12px 6px;
          border-radius: 14px;
          background: rgba(255,255,255,.05);
        }

        .game-info strong {
          display: block;
          margin-top: 3px;
          font-size: 17px;
        }

        .start-screen {
          text-align: center;
          padding: 30px 15px 20px;
        }

        .bomb {
          font-size: 62px;
          margin-bottom: 10px;
        }

        .start-screen h2 {
          margin: 0;
          font-size: 28px;
        }

        .start-screen p {
          line-height: 1.65;
          opacity: .65;
        }

        .play-button {
          border: 0;
          border-radius: 14px;
          padding: 14px 24px;
          font-weight: 800;
          cursor: pointer;
          background: #fff;
          color: #111;
          transition: transform .15s ease;
        }

        .play-button:hover {
          transform: translateY(-2px);
        }

        .play-button:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .message {
          text-align: center;
          margin: 8px 0 16px;
          min-height: 22px;
          font-weight: 700;
        }

        .mine-grid {
          width: min(100%, 500px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }

        .mine-tile {
          aspect-ratio: 1;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 12px;
          background: rgba(255,255,255,.075);
          color: rgba(255,255,255,.25);
          font-size: clamp(18px, 4vw, 26px);
          cursor: pointer;
          transition: transform .12s ease, background .12s ease;
        }

        .mine-tile:not(:disabled):hover {
          transform: scale(.96);
          background: rgba(255,255,255,.14);
        }

        .mine-tile.safe {
          background: rgba(90, 220, 150, .14);
          border-color: rgba(90,220,150,.25);
        }

        .mine-tile.mine {
          background: rgba(255,70,100,.16);
          border-color: rgba(255,70,100,.3);
        }

        .continue-note {
          text-align: center;
          margin-top: 16px;
          opacity: .5;
          font-size: 12px;
        }

        .result {
          margin-top: 18px;
          padding: 18px;
          border-radius: 16px;
          text-align: center;
          background: rgba(255,255,255,.055);
        }

        .result strong,
        .result span {
          display: block;
        }

        .result strong {
          font-size: 21px;
        }

        .result span {
          margin: 5px 0 14px;
          opacity: .6;
          font-size: 13px;
        }

        .coupons {
          max-width: 620px;
          margin: 30px auto 0;
        }

        .coupon-heading {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .coupon-heading > span {
          font-size: 28px;
        }

        .coupon-heading h2 {
          margin: 0;
        }

        .coupon-heading p:last-child {
          margin: 5px 0 0;
          opacity: .5;
          font-size: 13px;
        }

        .coupon {
          position: relative;
          overflow: hidden;
          margin-top: 12px;
          padding: 18px;
          border-radius: 18px;
          border: 1px dashed rgba(255,255,255,.14);
          background: rgba(255,255,255,.035);
        }

        .coupon.locked {
          opacity: .45;
        }

        .coupon.unlocked {
          border-color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.075);
        }

        .coupon-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
        }

        .coupon-threshold {
          font-size: 10px;
          letter-spacing: .12em;
          opacity: .55;
          font-weight: 800;
        }

        .coupon h3 {
          margin: 6px 0 5px;
          font-size: 19px;
        }

        .coupon p {
          margin: 0;
          opacity: .68;
          font-size: 13px;
          line-height: 1.5;
        }

        .claim-note {
          margin-top: 14px;
          padding-top: 10px;
          border-top: 1px dashed rgba(255,255,255,.12);
          text-align: center;
          font-size: 11px;
          letter-spacing: .03em;
          opacity: .7;
          font-weight: 700;
        }

        @media (max-width: 600px) {
          .mines-page {
            padding: 15px 12px 40px;
          }

          .mines-header {
            gap: 8px;
          }

          .back-button,
          .restart-button {
            padding: 8px 10px;
            font-size: 12px;
          }

          .balance strong {
            font-size: 16px;
          }

          .hero {
            margin-top: 28px;
          }

          .game-card {
            padding: 15px;
            border-radius: 20px;
          }

          .mine-grid {
            gap: 6px;
          }

          .mine-tile {
            border-radius: 9px;
          }
        }
      `}</style>
    </main>
  );
}

function Coupon({
  unlocked,
  threshold,
  title,
  text,
}: {
  unlocked: boolean;
  threshold: string;
  title: string;
  text: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [scratched, setScratched] = useState(false);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    if (!unlocked || scratched) return;

    const canvas = canvasRef.current;
    const card = cardRef.current;

    if (!canvas || !card) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const drawCover = () => {
      const rect = card.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        rect.width,
        rect.height
      );

      gradient.addColorStop(0, "#c8c8cc");
      gradient.addColorStop(0.5, "#77777c");
      gradient.addColorStop(1, "#b0b0b4");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "rgba(255,255,255,.14)";

      for (let x = -rect.height; x < rect.width; x += 20) {
        ctx.save();
        ctx.translate(x, 0);
        ctx.rotate(-0.45);
        ctx.fillRect(0, -rect.height, 7, rect.height * 2);
        ctx.restore();
      }

      ctx.fillStyle = "#fff";
      ctx.font = "800 13px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        "SCRATCH TO REVEAL ✨",
        rect.width / 2,
        rect.height / 2
      );
    };

    drawCover();

    const observer = new ResizeObserver(drawCover);

    observer.observe(card);

    return () => observer.disconnect();
  }, [unlocked, scratched]);

  const scratch = (event: PointerEvent) => {
    if (!unlocked || scratched) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    checkAmountScratched();
  };

  const checkAmountScratched = () => {
    const canvas = canvasRef.current;

    if (!canvas || scratched) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparent = 0;
    let samples = 0;

    for (let i = 3; i < pixels.length; i += 32) {
      samples++;

      if (pixels[i] < 50) {
        transparent++;
      }
    }

    if (samples > 0 && transparent / samples >= 0.45) {
      setScratched(true);
    }
  };

  const handleDown = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (!unlocked || scratched) return;

    setDrawing(true);

    event.currentTarget.setPointerCapture(event.pointerId);

    scratch(event.nativeEvent);
  };

  const handleMove = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (!drawing || !unlocked || scratched) return;

    scratch(event.nativeEvent);
  };

  const handleUp = () => {
    setDrawing(false);
    checkAmountScratched();
  };

  const reveal = () => {
    setScratched(true);
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    minHeight: 205,
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    border: "1px dashed rgba(255,255,255,.18)",
    background: "rgba(255,255,255,.045)",
  };

  const contentStyle: React.CSSProperties = {
    minHeight: 205,
    padding: 22,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <div
      ref={cardRef}
      style={cardStyle}
    >
      {!unlocked ? (
        <div style={{
          minHeight: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 6,
        }}>
          <span style={{ fontSize: 30 }}>🔒</span>
          <strong>LOCKED</strong>
          <small style={{ opacity: .6 }}>
            Reach {threshold} to unlock this coupon.
          </small>
        </div>
      ) : (
        <>
          <div style={contentStyle}>
            <div style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: ".15em",
              opacity: .6,
            }}>
              🎁 WIFEY REWARD
            </div>

            <div style={{
              marginTop: 7,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: ".13em",
              opacity: .55,
            }}>
              NEED {threshold}
            </div>

            <h3 style={{
              margin: "8px 0 6px",
              fontSize: 21,
            }}>
              {title}
            </h3>

            <p style={{
              maxWidth: 470,
              margin: 0,
              fontSize: 14,
              lineHeight: 1.5,
              opacity: .72,
            }}>
              {text}
            </p>

            {scratched && (
              <div style={{
                maxWidth: 470,
                marginTop: 15,
                paddingTop: 11,
                borderTop: "1px dashed rgba(255,255,255,.15)",
                fontSize: 11,
                lineHeight: 1.45,
                fontWeight: 800,
                opacity: .82,
              }}>
                📸 SCREENSHOT THIS TO CLAIM — otherwise this voucher is not valid.
              </div>
            )}
          </div>

          {!scratched && (
            <>
              <canvas
                ref={canvasRef}
                onPointerDown={handleDown}
                onPointerMove={handleMove}
                onPointerUp={handleUp}
                onPointerCancel={handleUp}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 5,
                  cursor: "crosshair",
                  touchAction: "none",
                }}
                aria-label="Scratch to reveal coupon"
              />

              <button
                type="button"
                onClick={reveal}
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 12,
                  zIndex: 6,
                  transform: "translateX(-50%)",
                  border: 0,
                  borderRadius: 999,
                  padding: "7px 14px",
                  background: "rgba(0,0,0,.58)",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".08em",
                  cursor: "pointer",
                }}
              >
                TAP TO REVEAL
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}