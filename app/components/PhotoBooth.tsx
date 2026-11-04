"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SectionLabel } from "./BirthdayCake";

// Initial 4 WhatsApp photos selected for the four-cut memory strip
const INITIAL_PHOTOS = [
  "/kelsi_1.jpeg",
  "/kelsi_2.jpeg",
  "/kelsi_3.jpeg",
  "/kelsi_4.jpeg",
];

export default function PhotoBooth() {
  const [photos, setPhotos] = useState<string[]>(INITIAL_PHOTOS);
  const [flashing, setFlashing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [currentSlot, setCurrentSlot] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Turn Camera On
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera permission denied or camera not found on this device.");
    }
  };

  // Turn Camera Off
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Take photo from real camera feed
  const snapLivePhoto = () => {
    if (!videoRef.current || !canvasRef.current || countdown !== null) return;
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);

          // Flash effect
          setFlashing(true);
          setTimeout(() => setFlashing(false), 450);

          // Capture frame
          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (video && canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              canvas.width = video.videoWidth || 480;
              canvas.height = video.videoHeight || 360;
              // Mirror effect for front camera
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

              const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

              // Concurrently fill the slots in the strip (cycles slot 0 -> 1 -> 2 -> 3)
              setPhotos((prev) => {
                const next = [...prev];
                next[currentSlot % 4] = dataUrl;
                return next;
              });
              setCurrentSlot((prev) => (prev + 1) % 4);
            }
          }
          return null;
        }
        return prev - 1;
      });
    }, 800);
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.8rem",
        padding: "4rem 1.5rem",
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
      }}
    >
      <SectionLabel>🎞️ live camera photo booth</SectionLabel>

      <div style={{ textAlign: "center" }}>
        <h2
          className="reveal font-serif"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 2.8rem)",
            fontStyle: "italic",
            color: "var(--text)",
          }}
        >
          Our Live Photo Booth
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
          Take live photos right now to fill the four-cut memory strip!
        </p>
      </div>

      {/* Screen flash effect */}
      {flashing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#ffffff",
            zIndex: 9999,
            pointerEvents: "none",
            animation: "flashAnim 0.45s ease-out forwards",
          }}
        />
      )}

      {/* Real-Time Camera Feed Box */}
      <div
        className="w-full max-w-sm rounded-xl overflow-hidden relative"
        style={{
          background: "#140f1a",
          border: "1px solid var(--border)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.7), 0 0 25px var(--rose-glow)",
          display: isCameraActive ? "block" : "none",
        }}
      >
        <video
          ref={videoRef}
          playsInline
          muted
          style={{
            width: "100%",
            aspectRatio: "4/3",
            objectFit: "cover",
            transform: "scaleX(-1)", // Mirror selfie preview
          }}
        />
        {countdown !== null && (
          <div
            className="absolute inset-0 flex items-center justify-center font-serif text-6xl text-white font-bold"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
              color: "var(--rose-light)",
            }}
          >
            {countdown}
          </div>
        )}
      </div>

      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {cameraError && (
        <p
          className="font-typewriter text-xs text-center"
          style={{ color: "#e74c3c", maxWidth: 360 }}
        >
          {cameraError}
        </p>
      )}

      {/* The Physical Strip */}
      <div
        className="reveal"
        style={{
          width: "min(80vw, 250px)",
          background: "#fbf8f5",
          padding: "16px 14px 28px",
          borderRadius: 2,
          boxShadow: "0 15px 40px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "relative",
          transform: "rotate(-1.5deg)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Top Header on Strip */}
        <div
          className="font-typewriter"
          style={{
            textAlign: "center",
            fontSize: "0.6rem",
            color: "#6b4c3b",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            borderBottom: "1px dashed #d8cfc4",
            paddingBottom: "6px",
          }}
        >
          ★ KELSI & ME • PHOTOBOOTH ★
        </div>

        {/* 4 Photo Slots */}
        {photos.map((src, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/3",
              background: "#221c24",
              overflow: "hidden",
              border:
                isCameraActive && currentSlot === index
                  ? "2px solid var(--rose)"
                  : "none",
            }}
          >
            <Image
              src={src}
              alt={`Photo slot ${index + 1}`}
              fill
              unoptimized={src.startsWith("data:")}
              style={{
                objectFit: "cover",
                filter: "sepia(0.18) contrast(1.1)",
              }}
              sizes="240px"
            />
            {isCameraActive && currentSlot === index && (
              <span
                className="absolute top-1 right-1 font-typewriter text-[9px] px-1 rounded bg-rose-600 text-white"
              >
                NEXT
              </span>
            )}
          </div>
        ))}

        {/* Footer date on strip */}
        <div
          className="font-typewriter"
          style={{
            textAlign: "center",
            fontSize: "0.65rem",
            color: "#8c6d58",
            marginTop: 4,
          }}
        >
          HAPPY BIRTHDAY 🌹 2026
        </div>
      </div>

      {/* Camera & Snap Controls */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        {!isCameraActive ? (
          <button
            onClick={startCamera}
            className="enter-btn font-serif cursor-pointer"
            style={{ fontSize: "0.85rem", padding: "10px 20px" }}
          >
            📷 Open Device Camera
          </button>
        ) : (
          <>
            <button
              onClick={snapLivePhoto}
              disabled={countdown !== null}
              className="enter-btn font-serif cursor-pointer"
              style={{
                fontSize: "0.85rem",
                padding: "10px 24px",
                background: "var(--rose)",
                color: "#fff",
              }}
            >
              {countdown !== null ? `📸 Snapping in ${countdown}...` : `📸 Snap Slot #${currentSlot + 1}`}
            </button>

            <button
              onClick={stopCamera}
              className="enter-btn font-serif cursor-pointer"
              style={{ fontSize: "0.85rem", padding: "10px 16px", borderColor: "var(--text-muted)", color: "var(--text-muted)" }}
            >
              ✕ Close Cam
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes flashAnim {
          0% { opacity: 0.95; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
