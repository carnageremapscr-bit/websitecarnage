import React from 'react';

interface CarnageLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function CarnageLogo({ className = "", width = 200, height = 60 }: CarnageLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="carnageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="200" height="60" rx="8" fill="#000000" />
      
      {/* CARNAGE Text */}
      <text
        x="100"
        y="25"
        textAnchor="middle"
        fill="url(#carnageGradient)"
        className="font-black text-xl tracking-wider"
        fontSize="18"
      >
        CARNAGE
      </text>
      
      {/* REMAPS Text */}
      <text
        x="100"
        y="40"
        textAnchor="middle"
        fill="#facc15"
        className="font-bold text-sm tracking-wide"
        fontSize="10"
      >
        REMAPS
      </text>
      
      {/* Decorative elements - Performance lines */}
      <path
        d="M20 50 Q 50 45, 80 48 T 140 47 Q 160 46, 180 50"
        stroke="#facc15"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M20 52 Q 50 47, 80 50 T 140 49 Q 160 48, 180 52"
        stroke="#facc15"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export function CarnageIcon({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#000000" />
      <text
        x="16"
        y="14"
        textAnchor="middle"
        fill="#facc15"
        className="font-black text-xs"
        fontSize="8"
      >
        C
      </text>
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="#facc15"
        className="font-bold text-xs"
        fontSize="6"
      >
        R
      </text>
      <circle cx="16" cy="16" r="14" stroke="#facc15" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}
