"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import taoImage from "/public/tao-transparent.png";

const TaoHeroImage = React.memo(function TaoHeroImage() {
  // Détection Safari précoce avec fallback SSR-friendly
  const [useSafariFallback, setUseSafariFallback] = useState(true); // Démarrer avec Safari par défaut
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
    
    // Détection Safari plus robuste
    const isSafari = () => {
      if (typeof window === "undefined") return false;
      const ua = navigator.userAgent;
      return /^((?!chrome|android).)*safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    };
    
    // Seulement changer si ce n'est PAS Safari
    if (!isSafari()) {
      setUseSafariFallback(false);
    }
  }, []);

  return (
    <>
      {/* Fallback image pour SEO et accessibilité */}
      <Image
        src="/tao-transparent.png"
        alt="Tao, chat perdu - Chat tigré aux pattes blanches"
        width={320}
        height={340}
        className="sr-only"
        priority
      />

      <div className="relative w-[214px] h-[300px] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 264 300"
          className="w-full h-full"
          aria-hidden="true"
          style={{
            overflow: "visible",
            filter: "drop-shadow(0 10px 20px rgba(234, 88, 12, 0.2))",
            // Transition fluide quand on change de mode
            transition: isClientMounted ? "opacity 0.2s ease-in-out" : "none",
            opacity: isClientMounted ? 1 : 0.95,
          }}
        >
          <defs>
            {/* Gradient pour le fond */}
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>

            {/* Gradient de bordure */}
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>

            {/* Drop shadow filter pour Safari */}
            <filter id="dropShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="4" result="offsetblur"/>
              <feFlood floodColor="#000000" floodOpacity="0.15"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Masque pour le fond circulaire */}
            <clipPath id="maskBackground" clipPathUnits="userSpaceOnUse">
              <circle cx="132" cy="132" r="128" />
            </clipPath>

            {/* Masque pour l'effet pop-out (pattes qui dépassent) */}
            <clipPath id="maskForeground" clipPathUnits="userSpaceOnUse">
              <path d="M 132 4 
                      A 128 128 0 0 1 259.4 132
                      A 128 128 0 0 1 180 240
                      L 180 400
                      L 84 400
                      L 0 240
                      A 128 128 0 0 1 4.6 132
                      A 128 128 0 0 1 132 4
                      Z" />
            </clipPath>
          </defs>

          {/* Bordure */}
          <circle
            cx="132"
            cy="132"
            r="130"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="5"
            filter={useSafariFallback ? "url(#dropShadow)" : undefined}
          />

          {/* Fond circulaire */}
          <circle cx="132" cy="132" r="128" fill="url(#orangeGradient)" />

          {/* Les deux versions toujours présentes, visibility contrôlée par CSS */}
          
          {/* Version Safari : SVG natif sans foreignObject */}
          <g style={{ 
            display: useSafariFallback ? 'block' : 'none',
            // Dimensions fixes pour éviter reflow
            width: '320px',
            height: '340px',
          }}>
            {/* Image de fond (clippée au cercle) */}
            <image
              clipPath="url(#maskBackground)"
              width="320"
              height="340"
              x="-28"
              y="29"
              href="/tao-transparent.png"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: 'brightness(0.95)' }}
            />
            
            {/* Image de premier plan (effet pop-out) */}
            <image
              clipPath="url(#maskForeground)"
              width="320"
              height="340"
              x="-28"
              y="29"
              href="/tao-transparent.png"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))' }}
            />
          </g>

          {/* Version optimisée : Next.js Image avec foreignObject */}
          <g style={{ 
            display: !useSafariFallback ? 'block' : 'none',
            // Dimensions fixes pour éviter reflow
            width: '320px',
            height: '340px',
          }}>
            {/* Image optimisée - Fond circulaire */}
            <foreignObject
              x="-28"
              y="29"
              width="320"
              height="340"
              clipPath="url(#maskBackground)"
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
              clipPath="url(#maskForeground)"
            >
              <Image
                src={taoImage}
                alt=""
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
          </g>
        </svg>
      </div>
    </>
  );
});

export default TaoHeroImage;
