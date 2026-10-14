import React from 'react';

/**
 * Clean, subtle Islamic geometric motifs and architectural accents.
 * Designed to look refined, modern, and spiritual without visual clutter.
 */

export const KaabaGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad" x1="200" y1="0" x2="200" y2="300" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#063228" />
        <stop offset="60%" stopColor="#0B5D4B" />
        <stop offset="100%" stopColor="#084538" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#C9A24D" />
        <stop offset="50%" stopColor="#F3DC9B" />
        <stop offset="100%" stopColor="#C9A24D" />
      </linearGradient>
      <radialGradient id="glowGrad" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#C9A24D" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0B5D4B" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background Atmosphere */}
    <rect width="400" height="300" rx="16" fill="url(#skyGrad)" />
    <circle cx="200" cy="140" r="160" fill="url(#glowGrad)" />

    {/* Subtle Star Particles */}
    <circle cx="60" cy="40" r="1.5" fill="#F8F5EE" opacity="0.6" />
    <circle cx="340" cy="50" r="1.5" fill="#F8F5EE" opacity="0.6" />
    <circle cx="120" cy="70" r="1" fill="#F8F5EE" opacity="0.5" />
    <circle cx="290" cy="65" r="1.2" fill="#F8F5EE" opacity="0.5" />
    <circle cx="80" cy="110" r="1" fill="#F8F5EE" opacity="0.4" />
    <circle cx="330" cy="120" r="1" fill="#F8F5EE" opacity="0.4" />

    {/* Courtyard Floor with Tawaf Rings */}
    <ellipse cx="200" cy="245" rx="170" ry="45" fill="#08382E" opacity="0.7" />
    <ellipse cx="200" cy="245" rx="140" ry="36" stroke="#C9A24D" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="3 3" />
    <ellipse cx="200" cy="245" rx="110" ry="28" stroke="#C9A24D" strokeWidth="0.75" strokeOpacity="0.4" strokeDasharray="4 4" />
    <ellipse cx="200" cy="245" rx="80" ry="20" stroke="#F8F5EE" strokeWidth="0.75" strokeOpacity="0.3" />

    {/* Distant Minarets */}
    <g opacity="0.55">
      {/* Left Minaret */}
      <rect x="75" y="60" width="10" height="150" fill="#0E483B" />
      <polygon points="73,60 80,40 87,60" fill="#C9A24D" />
      <circle cx="80" cy="38" r="2" fill="#F3DC9B" />
      <rect x="71" y="90" width="18" height="5" rx="1" fill="#C9A24D" opacity="0.7" />
      <rect x="73" y="140" width="14" height="4" rx="1" fill="#C9A24D" opacity="0.7" />

      {/* Right Minaret */}
      <rect x="315" y="60" width="10" height="150" fill="#0E483B" />
      <polygon points="313,60 320,40 327,60" fill="#C9A24D" />
      <circle cx="320" cy="38" r="2" fill="#F3DC9B" />
      <rect x="311" y="90" width="18" height="5" rx="1" fill="#C9A24D" opacity="0.7" />
      <rect x="313" y="140" width="14" height="4" rx="1" fill="#C9A24D" opacity="0.7" />
    </g>

    {/* The Holy Kaaba Base & Shadow */}
    <polygon points="140,240 200,258 260,240 200,224" fill="#041F18" opacity="0.9" />

    {/* Kaaba Left Face (in gentle shadow) */}
    <polygon points="145,150 200,165 200,245 145,230" fill="#111B17" />
    {/* Kaaba Right Face (facing light) */}
    <polygon points="200,165 255,150 255,230 200,245" fill="#1C2723" />
    {/* Kaaba Top Roof */}
    <polygon points="145,150 200,135 255,150 200,165" fill="#24312B" />

    {/* Kiswah Gold Band (Kiswa Belt) - Left */}
    <polygon points="145,168 200,183 200,188 145,173" fill="url(#goldGrad)" />
    {/* Kiswah Gold Band - Right */}
    <polygon points="200,183 255,168 255,173 200,188" fill="url(#goldGrad)" />

    {/* Upper Gold Calligraphy Accent */}
    <polygon points="145,160 200,175 200,177 145,162" fill="#C9A24D" opacity="0.6" />
    <polygon points="200,175 255,160 255,162 200,177" fill="#C9A24D" opacity="0.6" />

    {/* Golden Door of Kaaba (Bab ar-Rahman) on right face */}
    <polygon points="220,188 238,183 238,218 220,223" fill="url(#goldGrad)" stroke="#A68134" strokeWidth="0.75" />
    {/* Door Details */}
    <line x1="229" y1="185" x2="229" y2="220" stroke="#7D5E1E" strokeWidth="0.75" />

    {/* Shadhirwan (Marble base trim) */}
    <polygon points="143,230 200,245 200,248 143,233" fill="#D8D2C2" opacity="0.8" />
    <polygon points="200,245 257,230 257,233 200,248" fill="#ECE8DB" opacity="0.9" />

    {/* Pilgrims in Ihram (Artistic subtle dots in Tawaf) */}
    <g fill="#F8F5EE" opacity="0.75">
      <circle cx="160" cy="238" r="1.5" />
      <circle cx="170" cy="242" r="1.5" />
      <circle cx="185" cy="246" r="1.5" />
      <circle cx="215" cy="247" r="1.5" />
      <circle cx="230" cy="242" r="1.5" />
      <circle cx="242" cy="236" r="1.5" />
      <circle cx="130" cy="245" r="1.2" />
      <circle cx="150" cy="252" r="1.3" />
      <circle cx="180" cy="257" r="1.4" />
      <circle cx="220" cy="258" r="1.4" />
      <circle cx="250" cy="250" r="1.2" />
      <circle cx="270" cy="243" r="1.2" />
      <circle cx="110" cy="248" r="1" />
      <circle cx="140" cy="262" r="1.1" />
      <circle cx="200" cy="266" r="1.3" />
      <circle cx="260" cy="260" r="1.1" />
      <circle cx="290" cy="247" r="1" />
    </g>
  </svg>
);

export const MadinahGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="madinahSky" x1="200" y1="0" x2="200" y2="300" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0B5D4B" />
        <stop offset="60%" stopColor="#136F5A" />
        <stop offset="100%" stopColor="#EAF3EF" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="200" cy="110" r="120">
        <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#0B5D4B" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="greenDomeGrad" x1="160" y1="100" x2="240" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1B7A63" />
        <stop offset="50%" stopColor="#0B5D4B" />
        <stop offset="100%" stopColor="#063D31" />
      </linearGradient>
    </defs>

    {/* Sky & Dawn Glow */}
    <rect width="400" height="300" rx="16" fill="url(#madinahSky)" />
    <circle cx="200" cy="110" r="120" fill="url(#sunGlow)" />

    {/* Open Umbrellas of Madinah (Courtyard Shading Canopies) */}
    <g opacity="0.45" stroke="#FFFFFF" strokeWidth="1.2">
      {/* Far Left Umbrella */}
      <polygon points="50,160 80,140 110,160" fill="#FFFFFF" fillOpacity="0.2" />
      <line x1="80" y1="140" x2="80" y2="240" stroke="#FFFFFF" strokeWidth="2" />

      {/* Near Left Umbrella */}
      <polygon points="100,175 140,150 180,175" fill="#FFFFFF" fillOpacity="0.25" />
      <line x1="140" y1="150" x2="140" y2="255" stroke="#FFFFFF" strokeWidth="2.5" />

      {/* Near Right Umbrella */}
      <polygon points="220,175 260,150 300,175" fill="#FFFFFF" fillOpacity="0.25" />
      <line x1="260" y1="150" x2="260" y2="255" stroke="#FFFFFF" strokeWidth="2.5" />

      {/* Far Right Umbrella */}
      <polygon points="290,160 320,140 350,160" fill="#FFFFFF" fillOpacity="0.2" />
      <line x1="320" y1="140" x2="320" y2="240" stroke="#FFFFFF" strokeWidth="2" />
    </g>

    {/* The Prophet's Mosque Main Silhouette Wall */}
    <rect x="120" y="170" width="160" height="70" fill="#0D4B3D" opacity="0.85" />
    <rect x="135" y="180" width="130" height="5" fill="#C9A24D" opacity="0.7" />

    {/* The Iconic Green Dome (Al-Qubbah al-Khadra) */}
    <path
      d="M165,170 C165,125 235,125 235,170 Z"
      fill="url(#greenDomeGrad)"
      stroke="#C9A24D"
      strokeWidth="1.2"
    />
    {/* Silver/Gold Crescent on the Dome */}
    <line x1="200" y1="125" x2="200" y2="108" stroke="#C9A24D" strokeWidth="1.5" />
    <circle cx="200" cy="106" r="3.5" fill="#F8F5EE" stroke="#C9A24D" strokeWidth="1" />

    {/* Adjacent Silver Dome */}
    <path
      d="M236,170 C236,140 270,140 270,170 Z"
      fill="#ECECE6"
      opacity="0.85"
    />
    <line x1="253" y1="140" x2="253" y2="128" stroke="#C9A24D" strokeWidth="1" />

    {/* Tall Madinah Minaret */}
    <rect x="142" y="60" width="12" height="110" fill="#0F4C3F" />
    <polygon points="140,60 148,32 156,60" fill="#C9A24D" />
    <circle cx="148" cy="30" r="2.5" fill="#F8F5EE" />
    <rect x="138" y="90" width="20" height="5" rx="1" fill="#C9A24D" />
    <rect x="140" y="130" width="16" height="4" rx="1" fill="#C9A24D" />

    {/* Polished White Marble Courtyard Floor */}
    <polygon points="0,240 400,240 400,300 0,300" fill="#F8F5EE" />
    <ellipse cx="200" cy="242" rx="190" ry="10" fill="#E2DDD2" opacity="0.5" />

    {/* Reflections on the courtyard */}
    <rect x="175" y="242" width="50" height="35" fill="#0B5D4B" opacity="0.1" />
  </svg>
);

export const IslamicStarIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-[#C9A24D]' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L14.4 7.6L20 8.5L15.8 12.4L17 18L12 15.1L7 18L8.2 12.4L4 8.5L9.6 7.6L12 2Z" />
  </svg>
);

export const RubElHizbIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#C9A24D]' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Square 1 */}
    <rect x="5" y="5" width="14" height="14" rx="1" transform="rotate(0 12 12)" />
    {/* Square 2 rotated 45 deg */}
    <rect x="5" y="5" width="14" height="14" rx="1" transform="rotate(45 12 12)" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

export const HajjGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arafatSky" x1="200" y1="0" x2="200" y2="300" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#073E32" />
        <stop offset="50%" stopColor="#0E5444" />
        <stop offset="100%" stopColor="#C9A24D" stopOpacity="0.4" />
      </linearGradient>
      <radialGradient id="mercyGlow" cx="200" cy="110" r="140">
        <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#C9A24D" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#073E32" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8C6E33" />
        <stop offset="50%" stopColor="#54431F" />
        <stop offset="100%" stopColor="#1B2620" />
      </linearGradient>
      <linearGradient id="tentGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
    </defs>

    {/* Sky & Spiritual Dawn Glow */}
    <rect width="400" height="300" rx="16" fill="url(#arafatSky)" />
    <circle cx="200" cy="110" r="140" fill="url(#mercyGlow)" />

    {/* Distant Mina Mountain Ridges */}
    <path d="M0,210 Q90,165 190,195 T400,200 L400,300 L0,300 Z" fill="#062E25" opacity="0.6" />
    <path d="M0,230 Q120,185 240,215 T400,225 L400,300 L0,300 Z" fill="#08382E" opacity="0.8" />

    {/* Jabal ar-Rahmah (Mount of Mercy, Arafat) */}
    <path d="M60,265 Q130,170 200,160 Q270,170 340,265 Z" fill="url(#hillGrad)" />
    
    {/* White Pillar of Mount Arafat (Sha'khisah) */}
    <rect x="197" y="130" width="6" height="32" rx="1" fill="#FFFFFF" />
    <polygon points="195,130 200,122 205,130" fill="#F8F5EE" />
    <circle cx="200" cy="120" r="2.5" fill="#C9A24D" />

    {/* Pilgrims standing in prayer & contemplation on the Mount */}
    <g fill="#F8F5EE" opacity="0.9">
      <circle cx="185" cy="168" r="1.5" />
      <circle cx="195" cy="164" r="1.5" />
      <circle cx="205" cy="165" r="1.5" />
      <circle cx="215" cy="169" r="1.5" />
      <circle cx="175" cy="178" r="1.4" />
      <circle cx="190" cy="174" r="1.4" />
      <circle cx="210" cy="175" r="1.4" />
      <circle cx="225" cy="179" r="1.4" />
      <circle cx="160" cy="195" r="1.3" />
      <circle cx="180" cy="190" r="1.3" />
      <circle cx="200" cy="188" r="1.3" />
      <circle cx="220" cy="191" r="1.3" />
      <circle cx="240" cy="196" r="1.3" />
      <circle cx="145" cy="215" r="1.2" />
      <circle cx="170" cy="210" r="1.2" />
      <circle cx="230" cy="212" r="1.2" />
      <circle cx="255" cy="218" r="1.2" />
      <circle cx="125" cy="238" r="1.2" />
      <circle cx="275" cy="240" r="1.2" />
    </g>

    {/* White Tents of Mina (Valley of Tents) in foreground */}
    <g opacity="0.95">
      <polygon points="30,265 42,242 54,265" fill="url(#tentGrad)" stroke="#C9A24D" strokeWidth="0.5" />
      <polygon points="52,268 64,245 76,268" fill="url(#tentGrad)" stroke="#C9A24D" strokeWidth="0.5" />
      <polygon points="74,270 86,247 98,270" fill="url(#tentGrad)" stroke="#C9A24D" strokeWidth="0.5" />
      
      <polygon points="300,270 312,247 324,270" fill="url(#tentGrad)" stroke="#C9A24D" strokeWidth="0.5" />
      <polygon points="322,268 334,245 346,268" fill="url(#tentGrad)" stroke="#C9A24D" strokeWidth="0.5" />
      <polygon points="344,265 356,242 368,265" fill="url(#tentGrad)" stroke="#C9A24D" strokeWidth="0.5" />
    </g>

    {/* Ground Plain with Pilgrims in Ihram */}
    <rect x="0" y="270" width="400" height="30" fill="#0A362D" />
    <ellipse cx="200" cy="272" rx="190" ry="8" fill="#C9A24D" opacity="0.25" />
  </svg>
);
