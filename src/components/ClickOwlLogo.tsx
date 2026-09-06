import React from 'react';

interface ClickOwlLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const ClickOwlLogo: React.FC<ClickOwlLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  animated = false,
}) => {
  const iconSizes = {
    sm: 32,
    md: 44,
    lg: 56,
    xl: 72,
  };

  const iconDimension = iconSizes[size] || 44;

  const yellowColor = '#FBBF24';
  const eyeColor = '#FFFFFF';
  const pupilColor = '#111827';
  const beakColor = '#FFFFFF';
  const wifiColor = '#1F2937';
  const textColor = '#0F172A';

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      id="clickowl-logo"
    >
      <svg
        width={iconDimension}
        height={iconDimension}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${animated ? 'transition-transform duration-300 hover:scale-105' : ''}`}
      >
        <g id="wifi-signals" stroke={wifiColor} strokeWidth="3.5" strokeLinecap="round">
          <path d="M 44 20 C 54 13, 66 13, 76 20" />
          <path d="M 49 26 C 56 21, 64 21, 71 26" />
          <path d="M 54 32 C 58 29, 62 29, 66 32" />
        </g>

        <g id="owl-mask">
          <path
            d="M 22 46
               C 22 46, 32 49, 42 49
               C 52 49, 57 43, 60 41
               C 63 43, 68 49, 78 49
               C 88 49, 98 46, 98 46
               C 106 56, 107 72, 97 84
               C 86 96, 68 94, 60 83
               C 52 94, 34 96, 23 84
               C 13 72, 14 56, 22 46 Z"
            fill={variant === 'monochrome' ? '#111827' : yellowColor}
          />

          <circle cx="41" cy="67" r="17" fill="#FFFFFF" />
          <circle cx="41" cy="67" r="10" fill={variant === 'monochrome' ? '#111827' : yellowColor} />
          <circle cx="41" cy="67" r="5" fill="#0F172A" />

          <circle cx="79" cy="67" r="17" fill="#FFFFFF" />
          <circle cx="79" cy="67" r="10" fill={variant === 'monochrome' ? '#111827' : yellowColor} />
          <circle cx="79" cy="67" r="5" fill="#0F172A" />

          <polygon
            points="60,78 54,92 66,92"
            fill={beakColor}
            stroke="#E5E7EB"
            strokeWidth="0.5"
          />
        </g>
      </svg>

      {variant !== 'mark' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center tracking-tight font-black">
            <span
              style={{ color: textColor }}
              className={`font-['Outfit'] tracking-tight ${
                size === 'sm' ? 'text-lg font-bold' :
                size === 'lg' ? 'text-2xl font-extrabold' :
                size === 'xl' ? 'text-3xl font-black' : 'text-xl font-bold'
              }`}
            >
              Click
            </span>
            <span
              style={{ color: textColor }}
              className={`font-['Outfit'] ml-1.5 font-extrabold ${
                size === 'sm' ? 'text-lg' :
                size === 'lg' ? 'text-2xl' :
                size === 'xl' ? 'text-3xl' : 'text-xl'
              }`}
            >
              Owl
            </span>
          </div>

          {variant === 'full' && (
            <span
              style={{ color: yellowColor }}
              className={`font-semibold tracking-wider uppercase font-['Plus_Jakarta_Sans'] ${
                size === 'sm' ? 'text-[8px] mt-0.5' :
                size === 'lg' ? 'text-[11px] mt-1' :
                size === 'xl' ? 'text-xs mt-1' : 'text-[9.5px] mt-0.5'
              }`}
            >
              Wisdom In Every Click
            </span>
          )}
        </div>
      )}
    </div>
  );
};
