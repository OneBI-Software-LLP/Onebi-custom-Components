"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CustomAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
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
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
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

export const CustomAvatar = React.forwardRef<HTMLDivElement, CustomAvatarProps>(({
  src,
  alt = 'User avatar',
  initials,
  size = 'md',
  shape = 'circle',
  status,
  statusPosition = 'bottom-right',
  className = '',
  onClick,
  ...props
}, ref) => {
  const [imgError, setImgError] = useState(false);

  // Base styles for the image or the fallback wrapper
  const baseClasses = "relative inline-flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold object-cover overflow-hidden shrink-0 transition-all border border-slate-100 shadow-sm";
  
  const combinedClasses = cn(
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    shapeClasses[shape] || shapeClasses.circle,
    className
  );

  return (
    <div 
      ref={ref}
      className={cn(
        "relative inline-block group",
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200' : ''
      )}
      onClick={onClick}
      {...props}
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
});
CustomAvatar.displayName = "CustomAvatar";

export interface AvatarComponentProps extends CustomAvatarProps {
  children?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarComponentProps>(
  ({ className, initials, shape, size, status, statusPosition, src, alt, children, ...props }, ref) => {
    if ((initials || src || shape || size || status) && !children) {
      return (
        <CustomAvatar
          ref={ref}
          initials={initials}
          shape={shape}
          size={size}
          status={status}
          statusPosition={statusPosition}
          src={src}
          alt={alt}
          className={className}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
export default CustomAvatar;
