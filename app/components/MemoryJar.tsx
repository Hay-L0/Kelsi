"use client";

const MEMORIES = [
  "The way you laugh at your own jokes before the punchline 😂",
  "How you always order the weirdest thing on the menu — and it's always the best",
  "That road trip where nothing went to plan and everything was perfect",
  "The way you hum songs you don't know the words to 🎵",
  "Late-night conversations that felt like time stood still",
  "Your ridiculous (but accurate) movie ratings",
  "Sunrise walks that turned into 3-hour adventures",
  "The way you care about everyone around you so deeply 💛",
  "Sharing earphones so we could both hear the same song",
  "Every single mundane moment — grocery runs, traffic jams, all of it 🌸",
];

export default function MemoryJar() {
  return (
    <div
      className="relative w-full max-w-sm mx-auto rounded-sm p-6"
      style={{
        background: "#fffdf5",
        border: "1.5px dashed var(--sepia)",
        boxShadow: "inset 0 0 20px rgba(139,105,20,0.07)",
      }}
    >
      {/* Jar label */}
      <div
        className="text-center mb-5 pb-3"
        style={{ borderBottom: "1px solid var(--paper-dark)" }}
      >
        <span className="text-4xl">🫙</span>
        <h3
          className="font-serif italic text-xl mt-1"
          style={{ color: "var(--sepia)" }}
        >
          A Jar of Memories
        </h3>
        <p className="font-handwriting text-sm mt-1" style={{ color: "var(--ink-faded)" }}>
          things I never want to forget about us
        </p>
      </div>

      {/* Memory slips */}
      <ul className="flex flex-col gap-3">
        {MEMORIES.map((m, i) => (
          <li
            key={i}
            className="reveal"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div
              className="font-handwriting text-base px-4 py-2 rounded-sm relative"
              style={{
                background: i % 3 === 0 ? "#fff9e6" : i % 3 === 1 ? "#ffeef2" : "#f0fff4",
                border: "1px solid rgba(139,105,20,0.15)",
                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * ([1.2, 0.8, 1.5, 0.6, 1.1, 0.9, 1.3, 0.7, 1.4, 1.0][i % 10])}deg)`,
                boxShadow: "1px 2px 6px rgba(44,24,16,0.08)",
              }}
            >
              {m}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
