"use client";
import { useState } from "react";
import ConfettiBurst from "./ConfettiBurst";

export default function BirthdayCake({ name }: { name: string }) {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const blowCandles = () => {
    if (blown) return;
    setBlown(true);
    setConfetti(true);
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "5rem 1.5rem",
        textAlign: "center",
      }}
    >
      <ConfettiBurst trigger={confetti} />

      {/* Section label */}
      <SectionLabel>🎂 make a wish</SectionLabel>

      {/* Cake */}
      <div className="reveal" style={{ fontSize: "clamp(5rem, 20vw, 9rem)", lineHeight: 1, position: "relative" }}>
        {/* Candles row */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "0.5rem" }}>
          {["🕯️", "🕯️", "🕯️", "🕯️"].map((_, i) =>
            blown ? (
              <span key={i} style={{ fontSize: "1.8rem" }}>✨</span>
            ) : (
              <span key={i} className="candle-flame" style={{ fontSize: "1.8rem" }}>🔥</span>
            )
          )}
        </div>
        🎂
      </div>

      {/* Heading */}
      <h2
        className="reveal font-serif"
        style={{
          fontSize: "clamp(1.8rem, 7vw, 3.2rem)",
          fontStyle: "italic",
          fontWeight: 400,
          color: "var(--rose-light)",
          lineHeight: 1.2,
        }}
      >
        Happy Birthday,<br />
        <span className="font-handwriting" style={{ fontSize: "clamp(2.2rem, 9vw, 4rem)", color: "var(--text)" }}>
          {name} 🌹
        </span>
      </h2>

      {/* Blow button */}
      {!blown ? (
        <button
          className="reveal enter-btn font-serif"
          onClick={blowCandles}
        >
          🎉 Blow the candles!
        </button>
      ) : (
        <p
          className="reveal font-handwriting"
          style={{ fontSize: "1.5rem", color: "var(--gold)", opacity: 0.9 }}
        >
          Make a wish... ✨🌙
        </p>
      )}
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-typewriter"
      style={{
        color: "var(--gold)",
        fontSize: "0.65rem",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        opacity: 0.7,
      }}
    >
      {children}
    </p>
  );
}
