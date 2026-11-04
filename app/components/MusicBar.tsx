"use client";
import { useState } from "react";

const BARS = [1, 2, 3, 4, 5];

export default function MusicBar() {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      onClick={() => setPlaying((p) => !p)}
      aria-label={playing ? "Pause music visualiser" : "Play music visualiser"}
      className="flex items-end gap-[3px] h-7 px-3 py-1 rounded-full border border-current opacity-70 hover:opacity-100 transition-opacity"
      style={{ color: "var(--sepia)" }}
    >
      {BARS.map((b) => (
        <span
          key={b}
          className={playing ? "music-bar" : ""}
          style={{
            display: "block",
            width: 4,
            height: playing ? undefined : 4,
            background: "currentColor",
            borderRadius: 2,
            animationDelay: `${b * 0.12}s`,
            transition: "height 0.3s",
          }}
        />
      ))}
      <span className="ml-2 font-handwriting text-sm">{playing ? "♪ playing" : "♪ tap"}</span>
    </button>
  );
}

