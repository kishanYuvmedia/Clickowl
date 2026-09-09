import React from 'react';
import logoImg from '../assets/logo/logo.png';

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
    sm: 150,
    md: 150,
    lg: 150,
    xl: 150,
  };

  const iconDimension = iconSizes[size] || 100;
  const yellowColor = '#FFD10A';
  const textColor = '#010101';

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      id="clickowl-logo"
    >
      <img
        src={logoImg}
        alt="ClickOwl Logo"
        width={iconDimension}
        height={iconDimension}
        className={`shrink-0 object-contain ${animated ? 'transition-transform duration-300 hover:scale-105' : ''}`}
      />
    </div>
  );
};
