"use client";
import { useState, useRef, useEffect } from "react";
import { SectionLabel } from "./BirthdayCake";

interface VinylPlayerProps {
  songTitle?: string;
  artist?: string;
  audioSrc?: string;
}

export default function VinylPlayer({
  songTitle = "Golden Hour & Soft Memories",
  artist = "Our Favorite Song",
  audioSrc = "/audio.mp3",
}: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn("Audio play prevented or file not yet uploaded:", e);
          // If no file exists yet, we still animate for visual delight
          setIsPlaying(true);
        });
    }
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
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      <SectionLabel>🎵 soundtrack of us</SectionLabel>

      <div style={{ textAlign: "center" }}>
        <h2
          className="reveal font-serif"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 2.8rem)",
            fontStyle: "italic",
            color: "var(--text)",
          }}
        >
          The Vinyl Record
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
          {isPlaying ? "Now Playing • Tap to pause" : "Tap the record to play our song"}
        </p>
      </div>

      {/* Vinyl & Turntable Base */}
      <div
        className="reveal cursor-pointer"
        onClick={togglePlay}
        style={{
          width: "min(88vw, 340px)",
          height: 340,
          background: "linear-gradient(145deg, #18121f 0%, #0d0912 100%)",
          borderRadius: 24,
          border: "1px solid var(--border)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 35px var(--rose-glow)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Tonearm graphic */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 32,
            width: 10,
            height: 100,
            background: "#55435e",
            borderRadius: 4,
            transformOrigin: "top right",
            transform: isPlaying ? "rotate(24deg)" : "rotate(0deg)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 10,
            boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {/* Needle Head */}
          <div
            style={{
              position: "absolute",
              bottom: -4,
              left: -4,
              width: 18,
              height: 12,
              background: "var(--gold)",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Vinyl Disc */}
        <div
          className={`vinyl-spin ${!isPlaying ? "paused" : ""}`}
          style={{
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "radial-gradient(circle, #251e29 0%, #0e0a12 60%, #000 100%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.9), inset 0 0 20px rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            border: "2px solid #2b1f33",
          }}
        >
          {/* Subtle Grooves */}
          <div
            style={{
              position: "absolute",
              inset: 20,
              borderRadius: "50%",
              border: "1px dashed rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 45,
              borderRadius: "50%",
              border: "1px dashed rgba(255,255,255,0.06)",
            }}
          />

          {/* Center Label */}
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--rose) 0%, #6e1c3b 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              padding: "4px",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              KELSI
            </span>
            <span style={{ fontSize: "1.1rem" }}>❤️</span>
            <span style={{ fontSize: "0.5rem", opacity: 0.8 }}>33 RPM</span>
          </div>

          {/* Center Spindle Hole */}
          <div
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#0d0912",
              border: "1px solid #44324f",
            }}
          />
        </div>
      </div>

      {/* Track Details */}
      <div
        className="reveal"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          textAlign: "center",
        }}
      >
        <span className="font-serif" style={{ fontSize: "1.25rem", color: "var(--text)" }}>
          {songTitle}
        </span>
        <span
          className="font-typewriter"
          style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.15em" }}
        >
          {artist}
        </span>

        {/* Music Bars Animation */}
        <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: 20, marginTop: 8 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className={isPlaying ? "music-bar-anim" : ""}
              style={{
                width: 3,
                height: isPlaying ? undefined : 4,
                background: "var(--rose-light)",
                borderRadius: 2,
                animationDelay: `${i * 0.15}s`,
                transition: "height 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

