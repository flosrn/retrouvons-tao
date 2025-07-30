"use client";

import Image from "next/image";
import React from "react";
import taoImage from "/public/tao-transparent.png";

const TaoHeroImage = React.memo(function TaoHeroImage() {
  return (
    <div className="relative w-[214px] h-[300px] flex items-center justify-center">
      {/* SVG optimisé avec effet trompe-l'œil maintenu */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 264 300"
        className="w-full h-full"
        aria-hidden="true"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 10px 20px rgba(234, 88, 12, 0.2))",
        }}
      >
        <defs>
          {/* Gradient simplifié pour le fond */}
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>

          {/* Gradient de bordure */}
          <linearGradient id="border" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          {/* Masque pour le fond circulaire */}
          <clipPath id="circleMask">
            <circle cx="132" cy="132" r="128" />
          </clipPath>

          {/* Masque pour l'effet pop-out (pattes qui dépassent) */}
          <clipPath id="popoutMask">
            <path d="M132 4A128 128 0 01259.4 132A128 128 0 01180 240L180 400L84 400L0 240A128 128 0 014.6 132A128 128 0 01132 4Z" />
          </clipPath>
        </defs>

        {/* Bordure */}
        <circle
          cx="132"
          cy="132"
          r="130"
          fill="none"
          stroke="url(#border)"
          strokeWidth="5"
        />

        {/* Fond circulaire */}
        <circle cx="132" cy="132" r="128" fill="url(#bg)" />

        {/* Image optimisée - Fond circulaire */}
        <foreignObject
          x="-28"
          y="29"
          width="320"
          height="340"
          clipPath="url(#circleMask)"
        >
          <Image
            src={taoImage}
            alt=""
            width={320}
            height={340}
            priority
            quality={85}
            sizes="320px"
            style={{
              width: "320px",
              height: "340px",
              filter: "brightness(0.95)",
              objectFit: "cover",
            }}
          />
        </foreignObject>

        {/* Image optimisée - Premier plan avec effet pop-out */}
        <foreignObject
          x="-28"
          y="29"
          width="320"
          height="340"
          clipPath="url(#popoutMask)"
        >
          <Image
            src={taoImage}
            alt="Tao, chat perdu - Chat tigré aux pattes blanches"
            width={320}
            height={340}
            priority={false}
            quality={90}
            sizes="320px"
            style={{
              width: "320px",
              height: "340px",
              filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))",
              objectFit: "cover",
            }}
          />
        </foreignObject>
      </svg>
    </div>
  );
});

export default TaoHeroImage;
