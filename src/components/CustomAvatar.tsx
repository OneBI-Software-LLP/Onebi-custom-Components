import React, { useState } from 'react';
import { cn } from "@/lib/utils";

export interface CustomAvatarProps {
  /** The image URL for the avatar */
  src?: string;
  /** Alt text for screen readers */
  alt?: string;
  /** Fallback initials (max 2 characters recommended) */
  initials?: string;
  /** Preset sizes */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** The geometry of the avatar */
  shape?: 'circle' | 'rounded' | 'square';
  /** Optional availability status */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Where to place the status dot */
  statusPosition?: 'top-right' | 'bottom-right';
  /** Additional custom classes */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-12 h-12 text-xs',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-2xl',
};

const shapeClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
  square: 'rounded-none',
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-slate-400',
  away: 'bg-amber-400',
  busy: 'bg-rose-500',
};

const statusPositions = {
  'top-right': 'top-0.5 right-0.5',
  'bottom-right': 'bottom-0.5 right-0.5',
};

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  src,
  alt = 'User avatar',
  initials,
  size = 'md',
  shape = 'circle',
  status,
  statusPosition = 'bottom-right',
  className = '',
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);

  // Base styles for the image or the fallback wrapper
  const baseClasses = "relative inline-flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold object-cover overflow-hidden shrink-0 transition-all border border-slate-100 shadow-sm";
  
  const combinedClasses = cn(
    baseClasses,
    sizeClasses[size],
    shapeClasses[shape],
    className
  );

  return (
    <div 
      className={cn(
        "relative inline-block group",
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200' : ''
      )}
      onClick={onClick}
    >
      {/* Primary Image or Fallback */}
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          className={combinedClasses}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={combinedClasses}>
          {initials ? initials.substring(0, 2).toUpperCase() : '?'}
        </div>
      )}

      {/* Status Indicator Dot */}
      {status && (
        <span
          className={cn(
            "absolute block w-[26%] h-[26%] min-w-[10px] min-h-[10px] rounded-full border-2 border-white shadow-sm ring-1 ring-black/5",
            statusColors[status],
            statusPositions[statusPosition]
          )}
          aria-label={`User is ${status}`}
        />
      )}
    </div>
  );
};

export default CustomAvatar;
