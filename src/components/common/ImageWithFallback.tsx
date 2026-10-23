import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackIcon?: React.ReactNode;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  fallbackIcon,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt || 'Image'}
          className={className}
          onError={() => {
            // If even fallback fails, show icon
            setHasError(true);
          }}
          {...props}
        />
      );
    }

    return (
      <div
        className={`bg-gray-100 text-gray-400 flex flex-col items-center justify-center p-2 rounded-xl text-center select-none ${className}`}
      >
        {fallbackIcon || <ShoppingBag className="w-8 h-8 text-gray-300" />}
        <span className="text-[10px] text-gray-400 mt-1 line-clamp-1 font-medium">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};
