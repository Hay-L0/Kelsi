"use client";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import BirthdayCake from "./components/BirthdayCake";
import DaysCounter from "./components/DaysCounter";
import EnvelopeLetter from "./components/EnvelopeLetter";
import ClawMachine from "./components/ClawMachine";
import WishJar from "./components/WishJar";
import PhotoBooth from "./components/PhotoBooth";
import VengeanceMusicPlayer from "./components/VengeanceMusicPlayer";
import PlacesMap from "./components/PlacesMap";
import ImageScatter from "./components/ui/ImageScatter";
import Finale from "./components/Finale";
import FloatingHearts from "./components/FloatingHearts";
import RevealObserver from "./components/RevealObserver";

const NAME = "Kelsi";

// ── Polaroid Scrapbook Photo Collection ──
const POLAROIDS = [
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    alt: "That one sunset",
    caption: "our little escape 🌅",
    rotate: -4,
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
    alt: "Midnight drives",
    caption: "laughing till 3am ✨",
    rotate: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    alt: "My favorite portrait",
    caption: "my absolute favorite view 🌸",
    rotate: -2,
  },
  {
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80",
    alt: "Spontaneous road trip",
    caption: "wherever you are is home 🚗",
    rotate: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80",
    alt: "Holding hands",
    caption: "safe in your warmth 🌹",
    rotate: -3,
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    alt: "Celebration",
    caption: "cheers to another year 🥂",
    rotate: 2,
  },
];

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <FloatingHearts />
      <RevealObserver />

      {/* 1. Cinematic Splash Intro */}
      {!entered && <SplashScreen onEnter={() => setEntered(true)} />}

      <main
        style={{
          opacity: entered ? 1 : 0,
          transition: "opacity 1.2s ease",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 980,
          margin: "0 auto",
        }}
      >
        {/* 2. Interactive Cake & Candle Blowing */}
        <BirthdayCake name={NAME} />

        <div className="section-divider" />

        {/* 3. Days Together Counter */}
        <DaysCounter />

        <div className="section-divider" />

        {/* 4. Vengeance UI Music Player */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
            padding: "4rem 1.5rem 3rem",
            width: "100%",
          }}
        >
          <p
            className="font-typewriter"
            style={{
              color: "var(--gold)",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            🎵 soundtrack of us
          </p>

          <VengeanceMusicPlayer />
        </section>

        <div className="section-divider" />

        {/* 5. Vengeance UI Image Scatter — Memories Frozen in Time */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            padding: "5rem 1.5rem 3rem",
            width: "100%",
          }}
        >
          <p
            className="font-typewriter"
            style={{
              color: "var(--gold)",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            📸 scrapbook snapshots
          </p>

          <h2
            className="reveal font-serif"
            style={{
              fontSize: "clamp(1.6rem, 6vw, 2.8rem)",
              fontStyle: "italic",
              color: "var(--text)",
              textAlign: "center",
            }}
          >
            Memories Frozen in Time
          </h2>

          <p
            className="font-serif text-center max-w-lg"
            style={{
              color: "var(--text-muted)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            A scattered deck of our favorite memories. Click any photo to unfold the quiet story behind it.
          </p>

          <ImageScatter />
        </section>

        <div className="section-divider" />

        {/* 6. Interactive Activities */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2.5rem",
            padding: "4rem 1.5rem",
            width: "100%",
            maxWidth: 900,
          }}
        >
          <p
            className="font-typewriter"
            style={{
              color: "var(--gold)",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            ✦ games & surprises ✦
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
            style={{ placeItems: "center" }}
          >
            <PhotoBooth />
            <ClawMachine />
            <WishJar />
            <PlacesMap />
          </div>
        </section>

        <div className="section-divider" />

        {/* 10. Wax-Sealed Birthday Love Letter */}
        <EnvelopeLetter name={NAME} />

        {/* 11. Finale & Celebration */}
        <Finale name={NAME} />
      </main>
    </>
  );
}
