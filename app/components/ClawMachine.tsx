"use client";
import { useState } from "react";
import { SectionLabel } from "./BirthdayCake";

interface Capsule {
  id: number;
  color: string;
  emoji: string;
  reason: string;
}

const CAPSULES: Capsule[] = [
  { id: 1, color: "#e8789e", emoji: "💖", reason: "The way your eyes crinkle whenever you laugh really hard." },
  { id: 2, color: "#e8cc7a", emoji: "✨", reason: "How you make anywhere we go feel immediately warm and like home." },
  { id: 3, color: "#9d65c9", emoji: "🔮", reason: "Your random bursts of excitement over the smallest cute things." },
  { id: 4, color: "#5dade2", emoji: "🌊", reason: "That you always know what song to play when words aren't enough." },
  { id: 5, color: "#f39c12", emoji: "🍯", reason: "The sheer kindness and empathy you show to everyone around you." },
  { id: 6, color: "#e74c3c", emoji: "🌹", reason: "Because every single future plan feels incomplete without you in it." },
];

export default function ClawMachine() {
  const [activeCapsule, setActiveCapsule] = useState<Capsule | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [clawX, setClawX] = useState(50); // percentage

  const grabPrize = () => {
    if (isGrabbing) return;
    setIsGrabbing(true);
    setActiveCapsule(null);

    // Pick a random capsule
    const randomIdx = Math.floor(Math.random() * CAPSULES.length);
    const chosen = CAPSULES[randomIdx];
    const targetX = 20 + randomIdx * 12;
    setClawX(targetX);

    // Claw drops down then opens prize
    setTimeout(() => {
      setActiveCapsule(chosen);
      setIsGrabbing(false);
    }, 1800);
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "5rem 1.5rem",
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
      }}
    >
      <SectionLabel>🕹️ interactive arcade</SectionLabel>

      <div style={{ textAlign: "center" }}>
        <h2
          className="reveal font-serif"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 2.8rem)",
            fontStyle: "italic",
            color: "var(--text)",
          }}
        >
          What I Love About You
        </h2>
        <p
          className="font-typewriter"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            marginTop: "0.5rem",
          }}
        >
          Tap the button to grab a capsule!
        </p>
      </div>

      {/* Claw Machine Box */}
      <div
        className="reveal"
        style={{
          width: "min(92vw, 420px)",
          height: 380,
          background: "linear-gradient(180deg, #181120 0%, #0d0912 100%)",
          border: "2px solid var(--border)",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 35px var(--rose-glow)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        {/* Top Header Marquee */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 12px",
            background: "rgba(194,68,110,0.15)",
            border: "1px solid rgba(194,68,110,0.3)",
            borderRadius: 8,
          }}
        >
          <span className="font-typewriter" style={{ fontSize: "0.7rem", color: "var(--gold)" }}>
            ✦ KELSI CLAW ✦
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--rose-light)" }}>
            {isGrabbing ? "GRABBING..." : "READY"}
          </span>
        </div>

        {/* Claw Rail & Arm */}
        <div style={{ position: "relative", height: 180, width: "100%" }}>
          {/* Rail */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              right: 10,
              height: 4,
              background: "#3a2842",
              borderRadius: 2,
            }}
          />

          {/* The Claw Mechanism */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: `${clawX}%`,
              transform: "translateX(-50%)",
              transition: isGrabbing ? "left 0.6s ease-in-out" : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Cable that extends down */}
            <div
              style={{
                width: 2,
                height: isGrabbing ? 100 : 20,
                background: "var(--gold)",
                transition: "height 0.8s ease-in-out",
              }}
            />
            {/* Claw Head */}
            <div
              style={{
                fontSize: "1.5rem",
                lineHeight: 1,
                transform: isGrabbing ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s",
              }}
            >
              🦾
            </div>
          </div>
        </div>

        {/* Capsule Pit */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            padding: "8px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            border: "1px dashed rgba(194,68,110,0.2)",
          }}
        >
          {CAPSULES.map((c) => (
            <div
              key={c.id}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, #fff, ${c.color})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                boxShadow: `0 4px 10px ${c.color}66`,
                cursor: "pointer",
                transform: activeCapsule?.id === c.id ? "scale(1.25) translateY(-6px)" : "none",
                transition: "transform 0.3s ease",
              }}
              onClick={() => setActiveCapsule(c)}
            >
              {c.emoji}
            </div>
          ))}
        </div>

        {/* Grab Trigger Button */}
        <button
          onClick={grabPrize}
          disabled={isGrabbing}
          className="font-serif cursor-pointer"
          style={{
            marginTop: 8,
            padding: "10px 0",
            background: isGrabbing ? "#2a1e30" : "linear-gradient(90deg, var(--rose), #8e2b4d)",
            border: "none",
            borderRadius: 8,
            color: "#fff",
            fontSize: "0.95rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            boxShadow: isGrabbing ? "none" : "0 4px 20px var(--rose-glow)",
            transition: "all 0.3s ease",
          }}
        >
          {isGrabbing ? "Grabbing a Memory..." : "🕹️ Pull The Lever!"}
        </button>
      </div>

      {/* Revealed Capsule Card */}
      {activeCapsule && (
        <div
          className="reveal visible"
          style={{
            width: "min(92vw, 420px)",
            background: "var(--bg-card)",
            border: `1px solid ${activeCapsule.color}88`,
            borderRadius: 12,
            padding: "1.4rem",
            boxShadow: `0 10px 30px ${activeCapsule.color}33`,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            animation: "fadeInUp 0.4s ease",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, #fff, ${activeCapsule.color})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            {activeCapsule.emoji}
          </div>
          <div>
            <span
              className="font-typewriter"
              style={{ fontSize: "0.65rem", color: activeCapsule.color, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Capsule #{activeCapsule.id}
            </span>
            <p className="font-serif" style={{ fontSize: "1.1rem", color: "var(--text)", marginTop: 2, lineHeight: 1.4 }}>
              "{activeCapsule.reason}"
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

