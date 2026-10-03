"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TEST_MODE } from "../../lib/testMode";

type Day = {
  day: number;
  title: string;
  image: string;
};

const days: Day[] = [
  {
    day: 1,
    title: "The Beginning",
    image: "/images/hero/1.JPG",
  },
  {
    day: 2,
    title: "A Little More Love",
    image: "/images/hero/2.JPG",
  },
  {
    day: 3,
    title: "Our Little World",
    image: "/images/hero/3.JPG",
  },
  {
    day: 4,
    title: "More Memories",
    image: "/images/hero/4.JPG",
  },
  {
    day: 5,
    title: "Halfway There",
    image: "/images/hero/5.JPG",
  },
  {
    day: 6,
    title: "Almost Your Day",
    image: "/images/hero/6.JPG",
  },
  {
    day: 7,
    title: "Getting Closer",
    image: "/images/hero/7.JPG",
  },
  {
    day: 8,
    title: "Almost Time",
    image: "/images/memories/9.JPG",
  },
  {
    day: 9,
    title: "One More Sleep",
    image: "/images/memories/10.JPG",
  },
  {
    day: 10,
    title: "The Final Countdown",
    image: "/images/memories/11.JPG",
  },
];

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

  return words[number] || String(number);
}

function getIndiaNow() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());

  const values: Record<string, string> = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function getCurrentDay() {
  const now = getIndiaNow();

  if (now.month < 10) {
    return 1;
  }

  if (now.month > 10) {
    return 10;
  }

  if (now.day <= 1) {
    return 1;
  }

  if (now.day >= 10) {
    return 10;
  }

  return now.day;
}

function getBirthdayCountdown() {
  const now = new Date();

  const target = new Date(
    "2026-10-11T00:00:00+05:30"
  );

  const difference = Math.max(
    0,
    target.getTime() - now.getTime()
  );

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function getNextDayCountdown() {
  const now = new Date();
  const india = getIndiaNow();

  const nextDay = india.day + 1;

  let target: Date;

  if (nextDay >= 11) {
    target = new Date(
      "2026-10-11T00:00:00+05:30"
    );
  } else {
    target = new Date(
      `2026-10-${String(nextDay).padStart(
        2,
        "0"
      )}T00:00:00+05:30`
    );
  }

  const difference = Math.max(
    0,
    target.getTime() - now.getTime()
  );

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

export default function BirthdayWeek() {
  const router = useRouter();

  const [currentDay, setCurrentDay] =
    useState(getCurrentDay());

  const [birthdayCountdown, setBirthdayCountdown] =
    useState(getBirthdayCountdown());

  const [nextDayCountdown, setNextDayCountdown] =
    useState(getNextDayCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay(getCurrentDay());

      setBirthdayCountdown(
        getBirthdayCountdown()
      );

      setNextDayCountdown(
        getNextDayCountdown()
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /*
    TEST MODE:
    All 10 days are visible.

    When you are finished testing, change:
    to:
    */

  const visibleDays = TEST_MODE
    ? days
    : days.filter(
        (day) => day.day <= currentDay
      );

  return (
    <main className="page">

      <div className="container">

        {TEST_MODE && (
          <div className="test-banner">
            TEST MODE · ALL DAYS UNLOCKED
          </div>
        )}

        <section className="intro">

          <p className="eyebrow">
            YOUR BIRTHDAY CELEBRATION
          </p>

          <h1>
            Ten little days.
            <br />
            Ten little surprises.
          </h1>

          <p className="intro-text">
            Your birthday celebration starts
            this month. ❤️
          </p>

          <p className="intro-subtext">
            Ten days. Ten little surprises.
            One very special birthday.
          </p>

        </section>

        <section className="birthday-countdown">

          <p className="countdown-label">
            UNTIL HER BIRTHDAY · OCTOBER 11
          </p>

          <div className="countdown">

            <div className="count-box">
              <strong>
                {String(
                  birthdayCountdown.days
                ).padStart(2, "0")}
              </strong>
              <span>DAYS</span>
            </div>

            <div className="count-box">
              <strong>
                {String(
                  birthdayCountdown.hours
                ).padStart(2, "0")}
              </strong>
              <span>HOURS</span>
            </div>

            <div className="count-box">
              <strong>
                {String(
                  birthdayCountdown.minutes
                ).padStart(2, "0")}
              </strong>
              <span>MIN</span>
            </div>

            <div className="count-box">
              <strong>
                {String(
                  birthdayCountdown.seconds
                ).padStart(2, "0")}
              </strong>
              <span>SEC</span>
            </div>

          </div>

          <p className="coming-text">
            The big day is coming... 🎂
          </p>

        </section>

        <section className="days-section">

          <div className="section-heading">

            <p className="eyebrow">
              THE COUNTDOWN
            </p>

            <h2>
              {TEST_MODE
                ? "Explore the days"
                : `Day ${numberToWord(
                    currentDay
                  )}`}
            </h2>

          </div>

          <div className="days-grid">

            {visibleDays.map((day) => {

              const isToday =
                day.day === currentDay;

              const isFuture =
                day.day > currentDay;

              return (
                <button
                  key={day.day}
                  className={`day-card ${
                    isToday
                      ? "today"
                      : ""
                  } ${
                    isFuture
                      ? "future"
                      : ""
                  }`}
                  onClick={() => {

                    if (
                      TEST_MODE ||
                      !isFuture
                    ) {
                      router.push(
                        `/week/${day.day}`
                      );
                    }

                  }}
                >

                  <div className="day-image">

                    <img
                      src={day.image}
                      alt={day.title}
                    />

                    {!TEST_MODE &&
                      isFuture && (
                        <div className="locked">
                          LOCKED
                        </div>
                      )}

                  </div>

                  <div className="day-info">

                    <p className="day-number">
                      DAY{" "}
                      {numberToWord(
                        day.day
                      ).toUpperCase()}
                    </p>

                    <h3>
                      {day.title}
                    </h3>

                    {isToday && (
                      <span className="today-label">
                        TODAY
                      </span>
                    )}

                  </div>

                </button>
              );
            })}

          </div>

        </section>
	<section className="fun-time">
  	<button
   	 className="fun-time-card"
   	 onClick={() => router.push("/week/fun")}
 	 >
   	 <div className="fun-time-icon">♥</div>

    	<div className="fun-time-content">
     	 <p>JUST FOR FUN</p>
     	 <h2>Fun Time</h2>
     	 <span>
    	    Two tiny games are waiting for you
     	 </span>
   	 </div>

    	<div className="fun-time-arrow">
    	  →
   	 </div>
  	</button>
	</section>
        <section className="next-day">

          <p className="next-label">
            DAY{" "}
            {numberToWord(
              Math.min(
                currentDay + 1,
                10
              )
            ).toUpperCase()}{" "}
            UNLOCKS IN
          </p>

          <div className="countdown small">

            <div className="count-box">
              <strong>
                {String(
                  nextDayCountdown.days
                ).padStart(2, "0")}
              </strong>
              <span>DAYS</span>
            </div>

            <div className="count-box">
              <strong>
                {String(
                  nextDayCountdown.hours
                ).padStart(2, "0")}
              </strong>
              <span>HOURS</span>
            </div>

            <div className="count-box">
              <strong>
                {String(
                  nextDayCountdown.minutes
                ).padStart(2, "0")}
              </strong>
              <span>MIN</span>
            </div>

            <div className="count-box">
              <strong>
                {String(
                  nextDayCountdown.seconds
                ).padStart(2, "0")}
              </strong>
              <span>SEC</span>
            </div>

          </div>

        </section>

        <footer>
          A few little surprises for you ❤️
        </footer>

      </div>

      <style jsx>{`

        .page {
          min-height: 100vh;

          background: #0d0b0e;

          color: #f5edf2;

          font-family:
            Manrope,
            sans-serif;

          padding:
            40px 18px 80px;

          box-sizing: border-box;
        }

        .container {
          width: 100%;
          max-width: 1050px;
          margin: 0 auto;
        }

        .test-banner {
          text-align: center;

          margin-bottom: 25px;

          color: #77707a;

          font-size: 9px;

          letter-spacing: 4px;
        }

        .intro {
          text-align: center;

          max-width: 750px;

          margin:
            30px auto 60px;
        }

        .eyebrow {
          margin: 0 0 15px;

          color: #817783;

          font-size: 10px;

          letter-spacing: 5px;

          font-weight: 500;
        }

        .intro h1 {
          margin: 0;

          color: #f1dfe5;

          font-family:
            "Cormorant Garamond",
            Georgia,
            serif;

          font-size:
            clamp(
              46px,
              8vw,
              76px
            );

          font-weight: 500;

          line-height: 0.95;
        }

        .intro-text {
          margin:
            30px 0 8px;

          color: #c9bdc5;

          font-family:
            "Cormorant Garamond",
            Georgia,
            serif;

          font-size: 24px;
        }

        .intro-subtext {
          margin: 0;

          color: #817783;

          font-size: 13px;

          letter-spacing: 1px;
        }

        .birthday-countdown {
          text-align: center;

          padding:
            35px 20px;

          border-top:
            1px solid #29252a;

          border-bottom:
            1px solid #29252a;
        }

        .countdown-label,
        .next-label {
          margin:
            0 0 20px;

          color: #817783;

          font-size: 10px;

          letter-spacing: 3px;
        }

        .countdown {
          display: flex;

          justify-content: center;

          gap: 12px;

          flex-wrap: wrap;
        }

        .count-box {
          min-width: 78px;

          padding:
            14px 12px;

          box-sizing: border-box;

          border:
            1px solid #302b31;

          border-radius: 16px;

          background: #121013;
        }

        .count-box strong {
          display: block;

          color: #f1dfe5;

          font-family:
            "Cormorant Garamond",
            Georgia,
            serif;

          font-size: 34px;

          font-weight: 500;
        }

        .count-box span {
          display: block;

          margin-top: 4px;

          color: #756c76;

          font-size: 8px;

          letter-spacing: 2px;
        }

        .coming-text {
          margin:
            20px 0 0;

          color: #9d929c;

          font-family:
            "Cormorant Garamond",
            Georgia,
            serif;

          font-size: 19px;
        }

        .days-section {
          margin-top: 70px;
        }

        .section-heading {
          text-align: center;

          margin-bottom: 35px;
        }

        .section-heading h2 {
          margin: 0;

          color: #f1dfe5;

          font-family:
            "Cormorant Garamond",
            Georgia,
            serif;

          font-size: 42px;

          font-weight: 500;
        }

        .days-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 20px;
        }

        .day-card {
          width: 100%;

          padding: 0;

          overflow: hidden;

          border:
            1px solid #302b31;

          border-radius: 22px;

          background: #121013;

          color: #fff;

          text-align: left;

          cursor: pointer;

          transition:
            transform 0.25s ease,
            border-color 0.25s ease;
        }

        .day-card:hover {
          transform:
            translateY(-4px);

          border-color:
            #514651;
        }

        .day-image {
          position: relative;

          width: 100%;

          height: 300px;

          overflow: hidden;
        }

        .day-image img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          display: block;

          transition:
            transform 0.5s ease;
        }

        .day-card:hover
          .day-image img {
          transform: scale(1.03);
        }

        .day-info {
          position: relative;

          padding:
            20px 22px 24px;
        }

        .day-number {
          margin: 0 0 8px;

          color: #756b76;

          font-size: 9px;

          letter-spacing: 3px;
        }

        .day-info h3 {
          margin: 0;

          color: #f1dfe5;

          font-family:
            "Cormorant Garamond",
            Georgia,
            serif;

          font-size: 29px;

          font-weight: 500;
        }

        .today-label {
          position: absolute;

          right: 20px;
          top: 22px;

          color: #c8aab4;

          font-size: 8px;

          letter-spacing: 2px;
        }

        .locked {
          position: absolute;

          inset: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          background:
            rgba(
              13,
              11,
              14,
              0.6
            );

          color: #d4cbd1;

          font-size: 9px;

          letter-spacing: 4px;
        }

        .next-day {
          text-align: center;

          margin-top: 70px;

          padding-top: 35px;

          border-top:
            1px solid #29252a;
        }

        .small .count-box {
          min-width: 70px;
        }

        footer {
          margin-top: 70px;

          text-align: center;

          color: #514a52;

          font-size: 9px;

          letter-spacing: 4px;

          text-transform: uppercase;
        }

        @media (max-width: 700px) {

          .page {
            padding-left: 12px;
            padding-right: 12px;
          }

          .days-grid {
            grid-template-columns: 1fr;
          }

          .day-image {
            height: 330px;
          }

          .intro {
            margin-top: 20px;
          }

        }

        @media (max-width: 450px) {

          .day-image {
            height: 270px;
          }

          .countdown {
            gap: 7px;
          }

          .count-box {
            min-width: 65px;
            padding:
              12px 8px;
          }

        }

      `}</style>

    </main>
  );
}






