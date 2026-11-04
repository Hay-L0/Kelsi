"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface MusicTrack {
  title: string;
  artist: string;
  src: string;
  artwork?: string;
}

// Single Track: "Tommy Saint - who knows?"
const TRACK: MusicTrack = {
  title: "who knows?",
  artist: "Tommy Saint • Our Song for Kelsi",
  src: "/song.opus",
  artwork: "/kelsi_1.jpeg", // Uses her real WhatsApp photo as the cover art!
};

export default function VengeanceMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
          console.warn("Audio playback error:", e);
          setIsPlaying(true);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = percent * duration;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : isPlaying ? 35 : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 440,
        margin: "0 auto",
      }}
    >
      <audio
        ref={audioRef}
        src={TRACK.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        loop
      />

      {/* Vengeance UI Glassmorphism Floating Shell */}
      <div
        className="reveal"
        style={{
          width: isCollapsed ? "auto" : "100%",
          background: "linear-gradient(135deg, rgba(28, 20, 34, 0.75) 0%, rgba(14, 10, 18, 0.85) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(194, 68, 110, 0.28)",
          borderRadius: isCollapsed ? 9999 : 20,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75), 0 0 35px rgba(194, 68, 110, 0.2)",
          padding: isCollapsed ? "8px 18px" : "18px 20px 14px",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle top glow highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(232, 120, 158, 0.6), transparent)",
          }}
        />

        {/* COLLAPSED PILL VIEW */}
        {isCollapsed ? (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                animation: isPlaying ? "spinDisc 4s linear infinite" : "none",
              }}
            >
              <Image src={TRACK.artwork!} alt={TRACK.title} fill style={{ objectFit: "cover" }} sizes="32px" />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="font-serif" style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 600 }}>
                {TRACK.title}
              </span>
              <span className="font-typewriter" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                {TRACK.artist}
              </span>
            </div>

            {/* Play/Pause icon button */}
            <button
              onClick={togglePlay}
              className="cursor-pointer"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--rose)",
                border: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>

            {/* Expand toggle */}
            <button
              onClick={() => setIsCollapsed(false)}
              className="cursor-pointer"
              style={{
                background: "none",
                border: "none",
                color: "var(--rose-light)",
                fontSize: "0.8rem",
                opacity: 0.8,
              }}
              aria-label="Expand player"
            >
              ⤢
            </button>
          </div>
        ) : (
          /* EXPANDED FULL VENGEANCE CARD */
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* Artwork / Vinyl Avatar */}
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 14,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  flexShrink: 0,
                }}
              >
                <Image src={TRACK.artwork!} alt={TRACK.title} fill style={{ objectFit: "cover" }} sizes="60px" />
                {/* Vinyl Grooves overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    border: "1px dashed rgba(255,255,255,0.15)",
                  }}
                />
              </div>

              {/* Title & Artist */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <h4
                    className="font-serif truncate"
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--text)",
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {TRACK.title}
                  </h4>
                  <span
                    className="font-typewriter"
                    style={{
                      fontSize: "0.55rem",
                      color: "var(--gold)",
                      padding: "1px 5px",
                      borderRadius: 4,
                      background: "rgba(201,168,76,0.12)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ONLY TRACK
                  </span>
                </div>
                <p
                  className="font-typewriter truncate"
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    marginTop: 2,
                    letterSpacing: "0.06em",
                  }}
                >
                  {TRACK.artist}
                </p>
              </div>

              {/* Collapse button */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="cursor-pointer"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  padding: "4px 8px",
                  opacity: 0.7,
                }}
                aria-label="Collapse player"
              >
                ⤡
              </button>
            </div>

            {/* Seekable Progress Bar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                onClick={handleSeek}
                className="cursor-pointer"
                style={{
                  width: "100%",
                  height: 5,
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, var(--rose) 0%, var(--rose-light) 100%)",
                    boxShadow: "0 0 10px var(--rose-glow)",
                    borderRadius: 3,
                    transition: "width 0.2s linear",
                  }}
                />
              </div>

              <div
                className="font-typewriter"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                  padding: "0 2px",
                }}
              >
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : isPlaying ? "2:45" : "0:00"}</span>
              </div>
            </div>

            {/* Controls & Equalizer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 2,
              }}
            >
              {/* Animated Equalizer Waves */}
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 16 }}>
                {[1, 2, 3, 4, 5].map((bar) => (
                  <span
                    key={bar}
                    className={isPlaying ? "music-bar-anim" : ""}
                    style={{
                      width: 2.5,
                      height: isPlaying ? undefined : 4,
                      background: "var(--rose-light)",
                      borderRadius: 1.5,
                      animationDelay: `${bar * 0.12}s`,
                      transition: "height 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* Single Play / Pause Button */}
              <button
                onClick={togglePlay}
                className="cursor-pointer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--rose) 0%, #8e2b4d 100%)",
                  border: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  boxShadow: "0 4px 18px var(--rose-glow)",
                  transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              {/* Volume / Heart icon indicator */}
              <div style={{ fontSize: "0.95rem", color: "var(--rose)", opacity: 0.9 }}>
                ♥
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spinDisc {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
