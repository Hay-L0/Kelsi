"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { SectionLabel } from "./BirthdayCake";

// ── Relationship & Birthday Dates ──
// Friends since 2023 (~3 years of friendship)
const FRIENDSHIP_START = new Date("2023-01-01T00:00:00");
// Born November 4th, 2009
const BIRTH_DATE = new Date("2009-11-04T00:00:00");

function getDiff(from: Date) {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - from.getTime());
  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = totalSecs % 60;
  return { days, hours, minutes, seconds };
}

// Animated Counter component from Vengeance UI specification
function CounterItem({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [displayVal, setDisplayVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayVal(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return (
    <div
      ref={ref}
      style={{
        background: "linear-gradient(145deg, rgba(24, 18, 31, 0.75) 0%, rgba(13, 9, 18, 0.85) 100%)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: "1.4rem 1rem",
        textAlign: "center",
        boxShadow: "0 15px 35px rgba(0,0,0,0.7), 0 0 25px var(--rose-glow)",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top highlight bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 1,
          background: "linear-gradient(90deg, transparent, var(--rose-light), transparent)",
        }}
      />

      <div
        className="font-serif"
        style={{
          fontSize: "clamp(2rem, 6vw, 3rem)",
          color: "var(--rose-light)",
          fontWeight: 600,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {displayVal}
        {suffix}
      </div>

      <div
        className="font-typewriter"
        style={{
          fontSize: "0.65rem",
          color: "var(--gold)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function DaysCounter() {
  const [friendshipTime, setFriendshipTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // Live ticking counter for friendship duration
  useEffect(() => {
    setFriendshipTime(getDiff(FRIENDSHIP_START));
    const timer = setInterval(() => {
      setFriendshipTime(getDiff(FRIENDSHIP_START));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

    // Compute her exact age milestone on the client
  const [ageYears, setAgeYears] = useState(0);

  useEffect(() => {
    const now = new Date();
    setAgeYears(now.getFullYear() - BIRTH_DATE.getFullYear());
  }, []);
  
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.2rem",
        padding: "5rem 1.5rem 4rem",
        width: "100%",
        maxWidth: 780,
        margin: "0 auto",
      }}
    >
      <SectionLabel>⏳ us in numbers • 3 years & counting</SectionLabel>

      <div style={{ textAlign: "center" }}>
        <h2
          className="reveal font-serif"
          style={{
            fontSize: "clamp(1.8rem, 6vw, 3rem)",
            fontStyle: "italic",
            color: "var(--text)",
          }}
        >
          Counting Every Golden Second
        </h2>
        <p
          className="font-typewriter"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            marginTop: "0.4rem",
          }}
        >
          BORN NOV 4, 2009 • BEST FRIENDS FROM 2023 TO FOREVER
        </p>
      </div>

      {/* Vengeance UI Stats Counter Grid */}
      <div
        className="w-full grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <CounterItem
          value={3}
          label="Years Friends"
          suffix="+"
        />
        <CounterItem
          value={friendshipTime ? friendshipTime.days : 1100}
          label="Days Together"
        />
        <CounterItem
          value={ageYears}
          label="Years of Kelsi"
          suffix="th"
        />
        <CounterItem
          value={100}
          label="Infinite Love"
          suffix="%"
        />
      </div>

      {/* Real-time Live Ticker Box */}
      <div
        className="reveal"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(19, 15, 24, 0.6)",
          border: "1px dashed rgba(194,68,110,0.3)",
          borderRadius: 12,
          padding: "1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          className="font-typewriter"
          style={{ fontSize: "0.68rem", color: "var(--gold)", letterSpacing: "0.15em" }}
        >
          LIVE TICKER (2023 → NOW):
        </span>
        <span
          className="font-typewriter"
          style={{
            fontSize: "0.85rem",
            color: "var(--rose-light)",
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {friendshipTime
            ? `${friendshipTime.days}d ${friendshipTime.hours}h ${friendshipTime.minutes}m ${friendshipTime.seconds}s`
            : "Calculating moments..."}
        </span>
      </div>

      <p
        className="font-handwriting"
        style={{
          color: "var(--text-muted)",
          fontSize: "1.35rem",
          textAlign: "center",
          marginTop: -6,
        }}
      >
        3 years of unforgettable laughs, and a lifetime more to go 🌹
      </p>
    </section>
  );
}
