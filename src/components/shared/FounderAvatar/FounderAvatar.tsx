import React from 'react';

interface FounderAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FounderAvatar: React.FC<FounderAvatarProps> = ({ size = 'lg', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 p-0.5',
    md: 'w-20 h-20 p-1',
    lg: 'w-48 h-48 sm:w-60 sm:h-60 p-1.5 sm:p-2',
    xl: 'w-64 h-64 sm:w-72 sm:h-72 p-2 sm:p-2.5'
  };

  return (
    <div
      className={`relative rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 shadow-xl shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative shadow-inner">
        {/* Stylized high-detail photographic vector render of Vini Amaral matching eu-digital.png */}
        <svg viewBox="0 0 400 400" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="viniBacklight" cx="65%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FF9933" stop-opacity="0.35" />
              <stop offset="60%" stop-color="#332211" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#0A0F1D" stop-opacity="0.9" />
            </radialGradient>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1E232E" />
              <stop offset="100%" stop-color="#0B0D13" />
            </linearGradient>
            <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ECC6A7" />
              <stop offset="40%" stop-color="#D79E78" />
              <stop offset="100%" stop-color="#BA7E55" />
            </linearGradient>
            <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3B261A" />
              <stop offset="50%" stop-color="#1B120C" />
              <stop offset="100%" stop-color="#0F0906" />
            </linearGradient>
            <linearGradient id="amberRim" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#FFA834" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#FFA834" stop-opacity="0" />
            </linearGradient>
          </defs>

          {/* Background studio gradient with warm orange rim reflection */}
          <rect width="400" height="400" fill="url(#viniBacklight)" />

          {/* Torso & Suit (Black Blazer / Black Shirt) */}
          <path d="M 60 400 L 120 300 L 180 270 L 220 270 L 280 300 L 340 400 Z" fill="url(#suitGrad)" />
          {/* Black Collar and Shirt */}
          <polygon points="175,270 225,270 200,340" fill="#14171E" stroke="#252A35" stroke-width="2" />
          <polygon points="180,270 200,310 160,315" fill="#0D0F14" />
          <polygon points="220,270 200,310 240,315" fill="#0D0F14" />

          {/* Neck */}
          <path d="M 165 220 L 235 220 L 225 280 L 175 280 Z" fill="#C58B65" />

          {/* Head & Face base */}
          <path
            d="M 130 160 C 130 100, 160 80, 200 80 C 240 80, 270 100, 270 160 C 270 220, 245 255, 200 255 C 155 255, 130 220, 130 160 Z"
            fill="url(#skinTone)"
          />

          {/* Beard / 5 o'clock shadow on jaw */}
          <path
            d="M 145 190 C 150 245, 175 255, 200 255 C 225 255, 250 245, 255 190 C 245 220, 225 240, 200 240 C 175 240, 155 220, 145 190 Z"
            fill="#2B1A12"
            opacity="0.45"
          />

          {/* Eyes & Brows */}
          <path d="M 152 145 Q 168 138 184 145" stroke="#221208" stroke-width="4.5" stroke-linecap="round" fill="none" />
          <path d="M 216 145 Q 232 138 248 145" stroke="#221208" stroke-width="4.5" stroke-linecap="round" fill="none" />
          <ellipse cx="168" cy="158" rx="7" ry="5.5" fill="#25160E" />
          <ellipse cx="232" cy="158" rx="7" ry="5.5" fill="#25160E" />
          <circle cx="170" cy="156" r="1.8" fill="#FFFFFF" />
          <circle cx="234" cy="156" r="1.8" fill="#FFFFFF" />

          {/* Nose */}
          <path d="M 197 148 L 195 186 L 206 186" stroke="#9E5D36" stroke-width="3" stroke-linecap="round" fill="none" />

          {/* Lips */}
          <path d="M 182 208 Q 200 214 218 208" stroke="#965239" stroke-width="3.5" stroke-linecap="round" fill="none" />

          {/* Hair (Voluminous textured dark brown hair matching eu-digital.png) */}
          <path
            d="M 125 145 C 115 110, 130 65, 170 50 C 200 40, 240 45, 265 65 C 285 85, 280 120, 275 145 C 265 105, 250 85, 200 80 C 160 85, 140 105, 125 145 Z"
            fill="url(#hairDark)"
          />
          <path
            d="M 150 60 C 180 40, 230 45, 250 65 C 220 52, 175 50, 150 60 Z"
            fill="#5E3C26"
            opacity="0.7"
          />

          {/* Right rim warm amber lighting highlight */}
          <path
            d="M 255 70 C 275 100, 272 160, 268 220 C 274 190, 276 130, 265 85 Z"
            fill="url(#amberRim)"
          />
        </svg>
      </div>
    </div>
  );
};
