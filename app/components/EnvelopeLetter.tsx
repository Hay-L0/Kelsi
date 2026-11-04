"use client";
import { useState } from "react";
import { SectionLabel } from "./BirthdayCake";
import ConfettiBurst from "./ConfettiBurst";

export default function EnvelopeLetter({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTriggerConfetti(true);
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
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      <ConfettiBurst trigger={triggerConfetti} />
      <SectionLabel>💌 a message for you</SectionLabel>

      {!open ? (
        <button
          onClick={handleOpen}
          className="reveal group cursor-pointer"
          style={{
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
            position: "relative",
          }}
          aria-label="Open birthday letter"
        >
          {/* Envelope Card */}
          <div
            style={{
              width: "min(88vw, 360px)",
              height: 220,
              background: "#16121a",
              border: "1px solid var(--border)",
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 15px 40px rgba(0,0,0,0.6), 0 0 30px var(--rose-glow)",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }}
          >
            {/* Flap Triangles */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "55%",
                background: "#1e1724",
                clipPath: "polygon(0 0, 50% 65%, 100% 0)",
                borderBottom: "1px solid rgba(194,68,110,0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "55%",
                background: "#120e17",
                clipPath: "polygon(0 100%, 50% 45%, 100% 100%)",
              }}
            />

            {/* Wax Seal */}
            <div
              style={{
                position: "absolute",
                top: "52%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, var(--rose-light), var(--rose) 70%, #6e1c3b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.4rem",
                boxShadow: "0 4px 18px rgba(194,68,110,0.6), inset 0 2px 4px rgba(255,255,255,0.3)",
                zIndex: 5,
              }}
            >
              🌹
            </div>
          </div>

          <p
            className="font-handwriting"
            style={{ color: "var(--rose-light)", fontSize: "1.3rem" }}
          >
            tap the envelope to break the seal 🕯️
          </p>
        </button>
      ) : (
        <div
          className="reveal visible w-full"
          style={{
            background: "#141018",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "2.5rem 2rem",
            position: "relative",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 40px var(--rose-glow)",
          }}
        >
          {/* Subtle Stamp in Corner */}
          <div
            className="font-typewriter"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              border: "1.5px dashed var(--rose)",
              padding: "4px 10px",
              fontSize: "0.65rem",
              color: "var(--rose-light)",
              letterSpacing: "0.2em",
              transform: "rotate(6deg)",
              opacity: 0.8,
            }}
          >
            FOR KELSI ♥
          </div>

          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
              fontStyle: "italic",
              color: "var(--rose-light)",
              marginBottom: "1.5rem",
            }}
          >
            Dearest {name},
          </h3>

          <div
            className="font-serif"
            style={{
              fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)",
              lineHeight: 1.8,
              color: "var(--text)",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <p>
              Happy Birthday, my favorite person in the whole universe.
            </p>
            <p>
              If someone asked me to describe love, I wouldn’t give them words — I’d tell them about your smile, your chaotic laugh, the way your hand fits into mine, and how effortless every minute feels with you.
            </p>
            <p>
              You make ordinary days feel like poetry and turn every heavy thought into something calm. Thank you for simply existing as you are, and for letting me be the lucky one who gets to celebrate another year of your light.
            </p>
            <p>
              May this new chapter bring you everything your beautiful heart desires. I’m right beside you for all of it.
            </p>
          </div>

          <div style={{ marginTop: "2rem", textAlign: "right" }}>
            <p
              className="font-handwriting"
              style={{
                fontSize: "2rem",
                color: "var(--gold-light)",
              }}
            >
              Forever and always, yours ❤️
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
