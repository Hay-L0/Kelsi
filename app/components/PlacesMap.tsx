"use client";
import { useState } from "react";
import { SectionLabel } from "./BirthdayCake";

interface PlacePoint {
  id: number;
  name: string;
  tagline: string;
  coords: { x: number; y: number }; // percentage on the stylized map
  memory: string;
  icon: string;
}

const PLACES: PlacePoint[] = [
  {
    id: 1,
    name: "Our First Coffee",
    tagline: "Where the nervous smiles began",
    coords: { x: 28, y: 35 },
    memory: "We were supposed to stay for 30 minutes, but we ended up talking until the café shut down.",
    icon: "☕",
  },
  {
    id: 2,
    name: "The Sunset Viewpoint",
    tagline: "The golden hour we never forgot",
    coords: { x: 70, y: 25 },
    memory: "The sky was dyed pink and orange, but I couldn't stop looking over at you.",
    icon: "🌅",
  },
  {
    id: 3,
    name: "Midnight Diner Stop",
    tagline: "Late night fries and endless laughs",
    coords: { x: 45, y: 65 },
    memory: "Laughing so loudly people turned around, completely lost in our own private universe.",
    icon: "🍔",
  },
  {
    id: 4,
    name: "That Rainstorm Shelter",
    tagline: "Drenched and laughing",
    coords: { x: 75, y: 75 },
    memory: "Running under the awning while thunderstorm rolled over us, completely unbothered.",
    icon: "🌧️",
  },
];

export default function PlacesMap() {
  const [activePlace, setActivePlace] = useState<PlacePoint>(PLACES[0]);

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
      <SectionLabel>🗺️ cartography of love</SectionLabel>

      <div style={{ textAlign: "center" }}>
        <h2
          className="reveal font-serif"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 2.8rem)",
            fontStyle: "italic",
            color: "var(--text)",
          }}
        >
          Special Places We Shared
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
          Tap any pin on the map to explore the memory
        </p>
      </div>

      {/* Styled Constellation / Vintage Map Card */}
      <div
        className="reveal"
        style={{
          width: "min(92vw, 440px)",
          height: 280,
          background: "radial-gradient(ellipse at center, #1b1322 0%, #0d0912 100%)",
          borderRadius: 16,
          border: "1px solid var(--border)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px var(--rose-glow)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(194,68,110,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(194,68,110,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.6,
          }}
        />

        {/* Connecting dotted lines between points */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <polyline
            points="28%,35% 70%,25% 45%,65% 75%,75%"
            fill="none"
            stroke="rgba(232,204,122,0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Pins */}
        {PLACES.map((p) => {
          const isSelected = activePlace.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePlace(p)}
              className="cursor-pointer"
              style={{
                position: "absolute",
                top: `${p.coords.y}%`,
                left: `${p.coords.x}%`,
                transform: "translate(-50%, -50%)",
                background: isSelected
                  ? "linear-gradient(135deg, var(--rose) 0%, #8e2b4d 100%)"
                  : "#201628",
                border: isSelected ? "2px solid #fff" : "1px solid var(--border)",
                borderRadius: "50%",
                width: isSelected ? 42 : 34,
                height: isSelected ? 42 : 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isSelected ? "1.2rem" : "1rem",
                boxShadow: isSelected
                  ? "0 0 20px var(--rose-glow), 0 0 10px #fff"
                  : "0 4px 10px rgba(0,0,0,0.5)",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                zIndex: isSelected ? 5 : 2,
              }}
              aria-label={p.name}
            >
              {p.icon}
            </button>
          );
        })}
      </div>

      {/* Selected Location Card */}
      <div
        className="reveal visible"
        style={{
          width: "min(92vw, 440px)",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "1.5rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.6rem" }}>{activePlace.icon}</span>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.3rem", color: "var(--rose-light)" }}>
              {activePlace.name}
            </h3>
            <p
              className="font-typewriter"
              style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.1em" }}
            >
              {activePlace.tagline}
            </p>
          </div>
        </div>

        <p
          className="font-serif"
          style={{
            fontSize: "1.05rem",
            color: "var(--text)",
            marginTop: "1rem",
            lineHeight: 1.6,
          }}
        >
          "{activePlace.memory}"
        </p>
      </div>
    </section>
  );
}

