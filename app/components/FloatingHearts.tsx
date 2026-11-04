"use client";
import { useEffect } from "react";

export default function FloatingHearts() {
  useEffect(() => {
    const emojis = ["🌹", "❤️", "✨", "💫", "🕯️", "🌸"];
    const spawn = () => {
      const el = document.createElement("div");
      el.className = "float-heart";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 95 + "vw";
      el.style.bottom = "0";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2400);
    };
    const id = setInterval(spawn, 1100);
    return () => clearInterval(id);
  }, []);

  return null;
}
