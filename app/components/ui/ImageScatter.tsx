"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Your 16 real WhatsApp photos directly mapped to the scattered deck
const ALL_IMAGES = [
  "/kelsi_1.jpeg",
  "/kelsi_2.jpeg",
  "/kelsi_3.jpeg",
  "/kelsi_4.jpeg",
  "/kelsi_5.jpeg",
  "/kelsi_6.jpeg",
  "/kelsi_7.jpeg",
  "/kelsi_8.jpeg",
  "/kelsi_9.jpeg",
  "/kelsi_10.jpeg",
  "/kelsi_11.jpeg",
  "/kelsi_12.jpeg",
  "/kelsi_13.jpeg",
  "/kelsi_14.jpeg",
  "/kelsi_15.jpeg",
  "/kelsi_16.jpeg",
];

// Positions scattered naturally across the canvas
const SCATTER_SLOTS = [
  { top: "5%", left: "4%", rotate: -8, z: 2 },
  { top: "3%", left: "38%", rotate: 5, z: 3 },
  { top: "6%", left: "72%", rotate: -6, z: 1 },
  { top: "34%", left: "14%", rotate: 9, z: 4 },
  { top: "30%", left: "50%", rotate: -4, z: 2 },
  { top: "38%", left: "78%", rotate: 7, z: 3 },
  { top: "66%", left: "6%", rotate: -5, z: 1 },
  { top: "68%", left: "40%", rotate: 8, z: 4 },
  { top: "64%", left: "74%", rotate: -10, z: 2 },
];

export default function ImageScatter() {
  // We display 9 scattered photos at a time from your 16 WhatsApp photos
  const [startIndex, setStartIndex] = useState(0);

  // Auto shuffle / switch in & out every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 9) % ALL_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleManualShuffle = () => {
    setStartIndex((prev) => (prev + 5) % ALL_IMAGES.length);
  };

  return (
    <div className="relative w-full py-8 flex flex-col items-center select-none overflow-hidden">
      {/* Top Tagline */}
      <div className="text-center mb-6">
        <p className="font-handwriting text-xl" style={{ color: "var(--rose-light)" }}>
          memories shuffling in the wind 🍃
        </p>
      </div>

      {/* Scattered Canvas Box */}
      <div
        className="relative w-full max-w-5xl h-[560px] sm:h-[640px] md:h-[680px] rounded-2xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(32, 20, 38, 0.4) 0%, transparent 70%)",
        }}
      >
        <AnimatePresence mode="popLayout">
          {SCATTER_SLOTS.map((slot, i) => {
            const imgIndex = (startIndex + i) % ALL_IMAGES.length;
            const src = ALL_IMAGES[imgIndex];

            return (
              <motion.div
                key={`${imgIndex}-${i}`}
                className="absolute cursor-pointer"
                style={{
                  top: slot.top,
                  left: slot.left,
                  zIndex: slot.z,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.4,
                  rotate: slot.rotate * 2.5,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: slot.rotate,
                  y: 0,
                  transition: {
                    duration: 0.85,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  rotate: slot.rotate * -1.5,
                  y: -35,
                  transition: { duration: 0.5 },
                }}
                whileHover={{
                  scale: 1.18,
                  rotate: 0,
                  zIndex: 50,
                  transition: { duration: 0.25 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Vintage Polaroid with Tape */}
                <div
                  style={{
                    width: "min(36vw, 175px)",
                    background: "#fbf8f5",
                    padding: "8px 8px 28px",
                    borderRadius: 2,
                    boxShadow:
                      "0 15px 35px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    position: "relative",
                  }}
                  className="hover:shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(194,68,110,0.4)]"
                >
                  {/* Washi tape strip */}
                  <div
                    style={{
                      position: "absolute",
                      top: -8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 48,
                      height: 16,
                      background: "rgba(255, 230, 140, 0.75)",
                      backdropFilter: "blur(2px)",
                      borderRadius: 1,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                    }}
                  />

                  {/* Photo itself */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1",
                      background: "#1c1420",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Memory ${imgIndex + 1}`}
                      fill
                      sizes="(max-width: 640px) 35vw, 175px"
                      style={{
                        objectFit: "cover",
                        filter: "sepia(0.12) contrast(1.08)",
                      }}
                    />
                  </div>

                  {/* Small cute stamp in corner */}
                  <div
                    className="font-handwriting"
                    style={{
                      textAlign: "center",
                      marginTop: 6,
                      fontSize: "0.85rem",
                      color: "#6b4c3b",
                      lineHeight: 1,
                    }}
                  >
                    moment #{imgIndex + 1} ♥
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Manual shuffle control */}
      <button
        onClick={handleManualShuffle}
        className="font-serif enter-btn cursor-pointer mt-6"
        style={{ fontSize: "0.9rem", padding: "10px 24px" }}
      >
        ✦ Shuffle Deck of Photos ✦
      </button>

      <p
        className="font-typewriter text-xs text-center mt-3 opacity-50"
        style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
      >
        photos smoothly cycle in & out automatically • hover to inspect
      </p>
    </div>
  );
}
