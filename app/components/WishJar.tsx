"use client";
import { useState } from "react";
import { SectionLabel } from "./BirthdayCake";

interface StarWish {
  id: number;
  star: string;
  wish: string;
}

const WISHES: StarWish[] = [
  { id: 1, star: "⭐", wish: "I wish this year brings you unshakeable peace and overflowing joy." },
  { id: 2, star: "✨", wish: "I wish every dream you're quietly working toward becomes your reality." },
  { id: 3, star: "🌟", wish: "I wish for countless more midnight drives and shared laughs between us." },
  { id: 4, star: "💫", wish: "I wish you always feel just how deeply admired and loved you are." },
  { id: 5, star: "🌙", wish: "I wish all your days are as radiant and genuine as your smile." },
  { id: 6, star: "🔮", wish: "I wish that wherever life takes us, we are always dancing to our own beat." },
];

export default function WishJar() {
  const [selectedWish, setSelectedWish] = useState<StarWish | null>(null);

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
      <SectionLabel>🫙 celestial bottle</SectionLabel>

      <div style={{ textAlign: "center" }}>
        <h2
          className="reveal font-serif"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 2.8rem)",
            fontStyle: "italic",
            color: "var(--text)",
          }}
        >
          Jar of Star Wishes
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
          Tap any glowing star to unroll a birthday wish
        </p>
      </div>

      {/* Glass Jar Graphic */}
      <div
        className="reveal"
        style={{
          width: "min(85vw, 320px)",
          height: 380,
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(194,68,110,0.08) 100%)",
          border: "2px solid rgba(255,255,255,0.15)",
          borderRadius: "30px 30px 50px 50px",
          position: "relative",
          backdropFilter: "blur(6px)",
          boxShadow: "inset 0 0 30px rgba(255,255,255,0.08), 0 20px 50px rgba(0,0,0,0.7), 0 0 30px var(--rose-glow)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "40px 20px 20px",
        }}
      >
        {/* Cork Stopper Top */}
        <div
          style={{
            position: "absolute",
            top: -18,
            width: 90,
            height: 24,
            background: "#8b5a2b",
            borderRadius: "6px 6px 2px 2px",
            border: "1px solid #5a3a1b",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          }}
        />

        {/* Floating Stars inside the Jar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            placeItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {WISHES.map((w, idx) => (
            <button
              key={w.id}
              onClick={() => setSelectedWish(w)}
              className="cursor-pointer"
              style={{
                background: "none",
                border: "none",
                fontSize: "2.2rem",
                filter: "drop-shadow(0 0 10px rgba(232,204,122,0.8))",
                transform: selectedWish?.id === w.id ? "scale(1.4)" : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                animation: `floatStar 3s ease-in-out ${idx * 0.4}s infinite alternate`,
              }}
              aria-label={`Unroll wish ${w.id}`}
            >
              {w.star}
            </button>
          ))}
        </div>
      </div>

      {/* Unrolled Paper Strip */}
      {selectedWish && (
        <div
          className="reveal visible"
          style={{
            width: "min(92vw, 420px)",
            background: "linear-gradient(90deg, #fbf7ee 0%, #ede4d3 100%)",
            color: "#2c1810",
            padding: "1.5rem",
            borderRadius: "4px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.7), 2px 2px 0 rgba(0,0,0,0.1)",
            position: "relative",
            borderLeft: "6px solid var(--rose)",
          }}
        >
          <div
            className="font-typewriter"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rose)",
              marginBottom: 4,
            }}
          >
            Wish for Kelsi #{selectedWish.id}
          </div>
          <p className="font-handwriting" style={{ fontSize: "1.45rem", lineHeight: 1.4 }}>
            "{selectedWish.wish}"
          </p>
        </div>
      )}

      <style>{`
        @keyframes floatStar {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-12px) rotate(15deg); }
        }
      `}</style>
    </section>
  );
}

