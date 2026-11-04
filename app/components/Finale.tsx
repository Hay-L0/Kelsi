"use client";
import { useState } from "react";
import ConfettiBurst from "./ConfettiBurst";
import { SectionLabel } from "./BirthdayCake";

export default function Finale({ name }: { name: string }) {
  const [triggerMoreConfetti, setTriggerMoreConfetti] = useState(false);

  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
        padding: "6rem 1.5rem 8rem",
        textAlign: "center",
        position: "relative",
        borderTop: "1px dashed rgba(194,68,110,0.25)",
        marginTop: "4rem",
      }}
    >
      <ConfettiBurst trigger={triggerMoreConfetti} />
      <SectionLabel>🎈 chapter next</SectionLabel>

      {/* Floating Balloon Row */}
      <div
        className="reveal"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.2rem",
          fontSize: "2.8rem",
          animation: "floatBalloons 4s ease-in-out infinite alternate",
        }}
      >
        <span>🎈</span>
        <span>✨</span>
        <span>🎂</span>
        <span>💫</span>
        <span>🎈</span>
      </div>

      <div style={{ maxWidth: 540 }}>
        <h2
          className="reveal font-serif"
          style={{
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            fontStyle: "italic",
            color: "var(--rose-light)",
            lineHeight: 1.15,
          }}
        >
          Happy Birthday, {name}!
        </h2>
        <p
          className="reveal font-handwriting"
          style={{
            fontSize: "1.6rem",
            color: "var(--gold-light)",
            marginTop: "1rem",
            lineHeight: 1.4,
          }}
        >
          May this upcoming year be the sweetest, most unforgettable adventure yet.
        </p>
      </div>

      {/* Celebration Button */}
      <button
        onClick={() => setTriggerMoreConfetti(true)}
        className="reveal enter-btn font-serif cursor-pointer"
      >
        🎉 One More Shower of Confetti!
      </button>

      {/* Final Love Note */}
      <div style={{ marginTop: "1rem" }}>
        <p
          className="font-typewriter"
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          HANDCRAFTED WITH ENDLESS LOVE JUST FOR YOU
        </p>
        <p
          className="font-typewriter"
          style={{
            fontSize: "0.65rem",
            color: "var(--rose)",
            opacity: 0.6,
            marginTop: 4,
          }}
        >
          ★ FOREVER & ALWAYS ★
        </p>
      </div>

      <style>{`
        @keyframes floatBalloons {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-16px); }
        }
      `}</style>
    </footer>
  );
}

