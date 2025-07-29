"use client"

export default function TaoHeroImage() {
  return (
    <>
      {/* Fallback image for accessibility and SEO */}
      <img
        src="/tao-transparent.png"
        alt="Tao, chat perdu - Chat tigré aux pattes blanches"
        className="sr-only"
      />
      
      {/* SVG with 3D pop-out effect */}
      <div className="relative w-[214px] h-[300px] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 264 300"
          className="image-popout w-full h-full"
          aria-hidden="true"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Gradient for the circular background */}
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#fed7aa', stopOpacity: 1 }} />
            </linearGradient>
            
            {/* Border gradient (slightly darker) */}
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
            </linearGradient>
            
            {/* Drop shadow filter */}
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
            
            {/* Clip path for the background (circular container) */}
            <clipPath id="maskBackground" clipPathUnits="userSpaceOnUse">
              <circle cx="132" cy="132" r="128" />
            </clipPath>
            
            {/* Clip path for the foreground (allows paws to extend) */}
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
          
          {/* Border circle */}
          <circle 
            cx="132" 
            cy="132" 
            r="130" 
            fill="none" 
            stroke="url(#borderGradient)" 
            strokeWidth="5"
            filter="url(#dropShadow)"
          />
          
          {/* Background circle with gradient */}
          <circle 
            cx="132" 
            cy="132" 
            r="128" 
            fill="url(#orangeGradient)"
          />
          
          {/* Image group with dual clip paths */}
          <g transform="translate(0 0)">
            {/* Background image (clipped to circle) */}
            <image
              clipPath="url(#maskBackground)"
              width="320"
              height="340"
              x="-28"
              y="29"
              href="/tao-transparent.png"
              className="image__background"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: 'brightness(0.95)' }}
            />
            
            {/* Foreground image (allows pop-out effect) */}
            <image
              clipPath="url(#maskForeground)"
              width="320"
              height="340"
              x="-28"
              y="29"
              href="/tao-transparent.png"
              className="image__foreground"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))' }}
            />
          </g>
        </svg>
      </div>
      
      <style jsx>{`
        .image-popout {
          filter: drop-shadow(0 10px 20px rgba(234, 88, 12, 0.2));
        }
      `}</style>
    </>
  )
}
