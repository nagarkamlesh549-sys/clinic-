"use client";

import { motion } from "framer-motion";

export default function EyeGraphic() {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] aspect-square flex items-center justify-center mx-auto select-none pointer-events-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal/20 via-teal-soft/10 to-gold/10 rounded-full blur-3xl opacity-60 scale-90" />
      <div className="absolute w-3/4 h-3/4 bg-teal/15 rounded-full blur-2xl animate-pulse-glow" />

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(19,163,168,0.25)]"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E6C875" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="tealGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="45%" stopColor="#13A3A8" />
            <stop offset="100%" stopColor="#5EEAD4" />
          </linearGradient>

          <radialGradient id="pupilGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#040D18" />
            <stop offset="70%" stopColor="#081A30" />
            <stop offset="100%" stopColor="#0B2545" />
          </radialGradient>

          <radialGradient id="irisCaustic" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#18BAC0" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#13A3A8" stopOpacity="0.12" />
            <stop offset="85%" stopColor="#0B2545" stopOpacity="0.25" />
          </radialGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbit Light-Ray Axis (Slow Rotation) */}
        <g className="animate-rays-slow">
          <circle
            cx="250"
            cy="250"
            r="230"
            stroke="url(#tealGrad)"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.35"
          />
          <circle
            cx="250"
            cy="250"
            r="215"
            stroke="#C9A24B"
            strokeWidth="0.75"
            strokeDasharray="2 12"
            opacity="0.4"
          />
          {/* Calibrated Tick Marks */}
          {[...Array(24)].map((_, i) => (
            <line
              key={`tick-${i}`}
              x1="250"
              y1="24"
              x2="250"
              y2={i % 6 === 0 ? "14" : "18"}
              stroke={i % 6 === 0 ? "#C9A24B" : "#13A3A8"}
              strokeWidth={i % 6 === 0 ? "1.5" : "0.75"}
              opacity={i % 6 === 0 ? "0.8" : "0.35"}
              transform={`rotate(${i * 15} 250 250)`}
            />
          ))}
        </g>

        {/* Counter-Rotating Optical Reticle */}
        <g className="animate-rays-reverse">
          <circle
            cx="250"
            cy="250"
            r="185"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="6 14"
          />
          <circle
            cx="250"
            cy="250"
            r="165"
            stroke="#13A3A8"
            strokeWidth="0.75"
            strokeDasharray="1 6"
            opacity="0.45"
          />
          {/* Focal Crosshairs */}
          <line x1="250" y1="75" x2="250" y2="105" stroke="#C9A24B" strokeWidth="1" opacity="0.6" />
          <line x1="250" y1="395" x2="250" y2="425" stroke="#C9A24B" strokeWidth="1" opacity="0.6" />
          <line x1="75" y1="250" x2="105" y2="250" stroke="#C9A24B" strokeWidth="1" opacity="0.6" />
          <line x1="395" y1="250" x2="425" y2="250" stroke="#C9A24B" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Main Eye Contour (Corneal Arch) */}
        <path
          d="M 60 250 Q 250 90 440 250 Q 250 410 60 250 Z"
          stroke="url(#tealGrad)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
          filter="url(#softGlow)"
        />
        <path
          d="M 80 250 Q 250 115 420 250 Q 250 385 80 250 Z"
          stroke="#C9A24B"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          fill="none"
          opacity="0.4"
        />

        {/* Iris Outer Border with Gold Accent */}
        <circle
          cx="250"
          cy="250"
          r="120"
          stroke="url(#goldRing)"
          strokeWidth="2"
          opacity="0.85"
        />

        {/* Iris Body with Depth Caustic */}
        <circle
          cx="250"
          cy="250"
          r="118"
          fill="url(#irisCaustic)"
          className="animate-iris-pulse"
        />

        {/* Radiating Iris Fibers */}
        <g className="animate-rays-slow" opacity="0.65">
          {[...Array(36)].map((_, i) => (
            <line
              key={`fiber-${i}`}
              x1="250"
              y1="135"
              x2="250"
              y2={195 + (i % 3) * 6}
              stroke={i % 4 === 0 ? "#C9A24B" : i % 2 === 0 ? "#5EEAD4" : "#13A3A8"}
              strokeWidth={i % 4 === 0 ? "1.5" : "1"}
              strokeLinecap="round"
              opacity={0.4 + (i % 3) * 0.2}
              transform={`rotate(${i * 10} 250 250)`}
            />
          ))}
        </g>

        {/* Pupil (High-tech transparent optical aperture) */}
        <circle
          cx="250"
          cy="250"
          r="54"
          fill="url(#pupilGrad)"
          stroke="#13A3A8"
          strokeWidth="1.5"
          opacity="0.35"
        />

        {/* Laser Precision Calibration Beam / Target Point */}
        <circle cx="250" cy="250" r="16" stroke="#C9A24B" strokeWidth="1" strokeDasharray="2 3" opacity="0.75" />
        <circle cx="250" cy="250" r="3.5" fill="#5EEAD4" filter="url(#softGlow)" />

        {/* Specular Light Reflection (Corneal Highlight) */}
        <ellipse
          cx="225"
          cy="225"
          rx="18"
          ry="10"
          transform="rotate(-30 225 225)"
          fill="#FFFFFF"
          opacity="0.65"
        />
        <circle cx="270" cy="265" r="4" fill="#FFFFFF" opacity="0.45" />

        {/* Outer Orbiting Satellite Light Points */}
        <circle cx="250" cy="18" r="3.5" fill="#C9A24B" className="animate-pulse" />
        <circle cx="482" cy="250" r="3" fill="#13A3A8" />
        <circle cx="250" cy="482" r="3" fill="#5EEAD4" />
        <circle cx="18" cy="250" r="3" fill="#C9A24B" />
      </svg>
    </div>
  );
}
