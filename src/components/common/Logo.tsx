import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: { icon: 'w-7 h-7', text: 'text-xl', arabic: 'text-xs' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', arabic: 'text-sm' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', arabic: 'text-base' }
  };

  const currentSize = sizes[size];

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Custom Red Shopping Cart Icon */}
      <div className="relative flex items-center justify-center text-[#E30613] transition-transform duration-200 group-hover:scale-105">
        <svg
          className={`${currentSize.icon}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="21" r="1.5" fill="#E30613" />
          <circle cx="19" cy="21" r="1.5" fill="#E30613" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      </div>

      {/* Typography: AZIZA + عزيزة */}
      <div className="flex flex-col leading-tight">
        <span className={`font-black tracking-tight text-[#E30613] ${currentSize.text} font-sans leading-none`}>
          AZIZA
        </span>
        <span className={`text-[#E30613] font-bold ${currentSize.arabic} tracking-wider font-arabic leading-none mt-0.5 text-center`}>
          عزيزة
        </span>
      </div>
    </Link>
  );
};
