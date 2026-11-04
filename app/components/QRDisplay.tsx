"use client";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

interface QRDisplayProps {
  url: string;
}

export default function QRDisplay({ url }: QRDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* QR code with vintage frame */}
      <div
        className="qr-card"
        style={{ position: "relative" }}
      >
        {/* corner washi tapes */}
        <div className="corner-tape tl" />
        <div className="corner-tape br" />

        <QRCodeSVG
          value={url}
          size={220}
          bgColor="#ffffff"
          fgColor="#2c1810"
          level="H"
          imageSettings={{
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext y='20' font-size='20'%3E❤️%3C/text%3E%3C/svg%3E",
            x: undefined,
            y: undefined,
            height: 32,
            width: 32,
            excavate: true,
          }}
        />

        <p
          className="font-handwriting text-sm mt-3 text-center"
          style={{ color: "var(--ink-faded)", maxWidth: 220 }}
        >
          scan me to open {`Nimaht's`} birthday scrapbook 🌹
        </p>
      </div>

      {/* URL display */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-sm font-typewriter text-sm"
        style={{ background: "var(--paper-dark)", border: "1px solid var(--sepia)", color: "var(--ink-faded)" }}
      >
        <span className="truncate max-w-xs">{url}</span>
        <button
          onClick={copy}
          aria-label="Copy link"
          className="shrink-0 px-2 py-1 rounded transition-opacity hover:opacity-70"
          style={{ background: "var(--sepia)", color: "#fff", fontSize: "0.7rem" }}
        >
          {copied ? "✓ copied!" : "copy"}
        </button>
      </div>
    </div>
  );
}

