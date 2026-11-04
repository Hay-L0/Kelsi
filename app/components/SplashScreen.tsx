"use client";
import { useState, useEffect } from "react";

const NAME = "Kelsi";

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Slight delay so the fade-in feels cinematic
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      id="splash"
      className={mounted ? "" : "opacity-0"}
      style={{ transition: "opacity 1s ease" }}
    >
      {/* Ambient glow rings */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(194,68,110,0.15)",
          animation: "pulseRing 3s ease-in-out infinite",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(194,68,110,0.08)",
          animation: "pulseRing 3s ease-in-out 1s infinite",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        {/* Rose icon */}
        <div style={{ fontSize: "3.5rem", lineHeight: 1 }}>🌹</div>

        {/* Subtitle */}
        <p
          className="font-typewriter"
          style={{
            color: "var(--gold)",
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          a birthday surprise for
        </p>

        {/* Name */}
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(3rem, 12vw, 5.5rem)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "var(--text)",
            lineHeight: 1.1,
          }}
        >
          {NAME}
        </h1>

        {/* Decorative line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
            maxWidth: 260,
            opacity: 0.5,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, var(--rose))" }} />
          <span style={{ color: "var(--rose)", fontSize: "0.6rem", letterSpacing: "0.3em" }}>♥</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, var(--rose))" }} />
        </div>

        {/* Enter button */}
        <button
          className="enter-btn font-serif"
          onClick={onEnter}
        >
          Open Your Gift
        </button>

        <p
          className="font-typewriter"
          style={{ color: "var(--text-muted)", fontSize: "0.65rem", letterSpacing: "0.1em", marginTop: "0.5rem" }}
        >
          🔊 turn sound on for the full experience
        </p>
      </div>

      <style>{`
        @keyframes pulseRing {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.1; transform: translate(-50%, -50%) scale(1.06); }
        }
      `}</style>
    </div>
  );
}

