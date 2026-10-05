import React from 'react';

interface DeevoLogoProps {
  variant?: 'horizontal' | 'icon' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
}

export const DeevoLogo: React.FC<DeevoLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showSlogan = false,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: { main: 'text-lg', sub: 'text-[9px]', slogan: 'text-[8px]' },
    md: { main: 'text-xl', sub: 'text-[10px]', slogan: 'text-[9px]' },
    lg: { main: 'text-2xl', sub: 'text-xs', slogan: 'text-[10px]' },
    xl: { main: 'text-3xl', sub: 'text-sm', slogan: 'text-xs' }
  };

  const isLightText = variant === 'white';
  const textColor = isLightText ? 'text-white' : variant === 'dark' ? 'text-black' : 'text-[#0F172A]';
  const subColor = isLightText ? 'text-blue-200' : 'text-[#0F172A]';

  // Faceted 3D "D" Icon SVG
  const IconSvg = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizes[size]} shrink-0`}
    >
      <defs>
        <linearGradient id="deevoFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00F0FF" />
          <stop offset="50%" stop-color="#0099FF" />
          <stop offset="100%" stop-color="#0B5FFF" />
        </linearGradient>
        <linearGradient id="deevoFacetTop" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="#D9FAFF" />
          <stop offset="30%" stop-color="#38E1FF" />
          <stop offset="100%" stop-color="#0066FF" />
        </linearGradient>
        <linearGradient id="deevoFacetRight" x1="0%" y1="30%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0077FF" />
          <stop offset="60%" stop-color="#0044EE" />
          <stop offset="100%" stop-color="#022B99" />
        </linearGradient>
        <linearGradient id="deevoFacetBottom" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0055FF" />
          <stop offset="60%" stop-color="#00B4FF" />
          <stop offset="100%" stop-color="#00F0FF" />
        </linearGradient>
      </defs>

      {/* Facet 1: Left Vertical Pillar */}
      <path d="M 16 10 L 38 24 L 38 76 L 16 90 Z" fill="url(#deevoFacetLeft)" />

      {/* Facet 2: Top Diagonal Wing */}
      <path d="M 16 10 L 62 10 L 86 42 L 38 24 Z" fill="url(#deevoFacetTop)" />

      {/* Facet 3: Right Curved Point */}
      <path d="M 86 42 L 90 52 L 68 90 L 38 76 L 76 50 Z" fill="url(#deevoFacetRight)" />

      {/* Facet 4: Bottom Fold */}
      <path d="M 16 90 L 38 76 L 68 90 Z" fill="url(#deevoFacetBottom)" />

      {/* White Central Arrow / Forward Triangle */}
      <polygon points="38,24 76,50 38,76" fill="#FFFFFF" />
    </svg>
  );

  if (variant === 'icon') {
    return IconSvg;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {IconSvg}
      <div className="flex flex-col justify-center">
        <span className={`font-black ${textSizes[size].main} tracking-tight leading-none ${textColor}`}>
          DEEVO
        </span>
        <span
          className={`font-semibold ${textSizes[size].sub} tracking-wide leading-tight mt-0.5 ${subColor}`}
        >
          Soluções Financeiras
        </span>
        {showSlogan && (
          <span
            className={`text-[8px] sm:text-[9px] uppercase tracking-wider font-bold mt-1 ${
              isLightText ? 'text-blue-300' : 'text-blue-600'
            }`}
          >
            Crédito com segurança, para um futuro melhor.
          </span>
        )}
      </div>
    </div>
  );
};
