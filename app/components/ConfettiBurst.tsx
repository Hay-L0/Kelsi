"use client";
import { useEffect, useRef } from "react";

export default function ConfettiBurst({ trigger }: { trigger: boolean }) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!trigger || firedRef.current) return;
    firedRef.current = true;
    import("canvas-confetti").then((mod) => {
      const confetti = mod.default;
      const colors = ["#c2446e", "#e8cc7a", "#fff", "#f7c8d8", "#c9a84c"];
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 }, colors });
      setTimeout(() => confetti({ particleCount: 70, spread: 130, origin: { y: 0.5, x: 0.1 }, colors }), 350);
      setTimeout(() => confetti({ particleCount: 70, spread: 130, origin: { y: 0.5, x: 0.9 }, colors }), 600);
    });
  }, [trigger]);

  return null;
}
