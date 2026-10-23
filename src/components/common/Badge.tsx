import React from 'react';

interface BadgeProps {
  type?: 'discount' | 'status-current' | 'status-upcoming' | 'status-past' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type = 'discount', children, className = '' }) => {
  const styles = {
    discount: 'bg-[#E30613] text-white font-bold text-xs px-2.5 py-0.5 rounded-full shadow-sm',
    'status-current': 'bg-[#E30613] text-white font-semibold text-xs px-3 py-1 rounded-full shadow-sm',
    'status-upcoming': 'bg-[#0284C7] text-white font-semibold text-xs px-3 py-1 rounded-full shadow-sm',
    'status-past': 'bg-[#64748B] text-white font-semibold text-xs px-3 py-1 rounded-full',
    neutral: 'bg-gray-100 text-gray-700 font-medium text-xs px-2.5 py-0.5 rounded-full'
  };

  return (
    <span className={`inline-flex items-center justify-center tracking-tight ${styles[type]} ${className}`}>
      {children}
    </span>
  );
};
