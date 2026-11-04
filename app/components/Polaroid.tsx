"use client";
import { useState } from "react";
import Image from "next/image";

interface PolaroidProps {
  src: string;
  alt: string;
  caption: string;
  rotate?: number;
}

export default function Polaroid({ src, alt, caption, rotate = 0 }: PolaroidProps) {
  const [hovered, setHovered] = useState(false);
  const hover = rotate > 0 ? rotate + 5 : rotate - 5;

  return (
    <div
      className="polaroid relative"
      style={{ transform: `rotate(${hovered ? hover : rotate}deg) scale(${hovered ? 1.07 : 1})` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="tape" />
      <Image
        src={src}
        alt={alt}
        width={280}
        height={280}
        style={{ width: "100%", height: "auto", objectFit: "cover", aspectRatio: "1" }}
        sizes="(max-width: 640px) 85vw, 280px"
      />
      <p className="caption">{caption}</p>
    </div>
  );
}
