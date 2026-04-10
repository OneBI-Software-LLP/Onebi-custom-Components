import React from 'react';
import './skeleton.css';

export type SkeletonVariant  = 'default' | 'shimmer' | 'wave' | 'pulse';
export type SkeletonShape    = 'rectangle' | 'circle' | 'rounded' | 'pill';
export type SkeletonSize     = 'sm' | 'md' | 'lg';

export interface SkeletonProps {
  variant?  : SkeletonVariant;
  shape?    : SkeletonShape;
  width?    : string | number;
  height?   : string | number;
  size?     : SkeletonSize;
  className?: string;
  style?    : React.CSSProperties;
}

export interface SkeletonTextProps {
  lines?    : number;
  variant?  : SkeletonVariant;
  lastLineWidth?: string;
  gap?      : string | number;
  size?     : SkeletonSize;
  className?: string;
}

export interface SkeletonAvatarProps {
  size?     : SkeletonSize | number;
  variant?  : SkeletonVariant;
  shape?    : 'circle' | 'rounded';
  className?: string;
}

export interface SkeletonCardProps {
  variant?    : SkeletonVariant;
  hasAvatar?  : boolean;
  hasImage?   : boolean;
  lines?      : number;
  hasActions? : boolean;
  className?  : string;
}

export interface SkeletonTableProps {
  rows?     : number;
  cols?     : number;
  variant?  : SkeletonVariant;
  hasHeader?: boolean;
  className?: string;
}

const avatarSizeMap: Record<string, string> = {
  sm: '32px',
  md: '40px',
  lg: '56px',
};

export function Skeleton({
  variant   = 'shimmer',
  shape     = 'rectangle',
  width,
  height,
  size      = 'md',
  className = '',
  style,
}: SkeletonProps) {
  const cls = [
    'sk-base',
    `sk-variant-${variant}`,
    `sk-shape-${shape}`,
    `sk-size-${size}`,
    className,
  ].filter(Boolean).join(' ');

  const inlineStyle: React.CSSProperties = {
    ...(width  !== undefined ? { width:  typeof width  === 'number' ? `${width}px`  : width  } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  };

  return <div className={cls} style={inlineStyle} aria-hidden="true" />;
}

export function SkeletonText({
  lines        = 3,
  variant      = 'shimmer',
  lastLineWidth = '60%',
  gap          = 8,
  size         = 'md',
  className    = '',
}: SkeletonTextProps) {
  return (
    <div
      className={['sk-text-block', className].filter(Boolean).join(' ')}
      style={{ display:'flex', flexDirection:'column', gap: typeof gap === 'number' ? `${gap}px` : gap }}
      aria-hidden="true"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          shape="pill"
          size={size}
          width={i === lines - 1 && lines > 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({
  size      = 'md',
  variant   = 'shimmer',
  shape     = 'circle',
  className = '',
}: SkeletonAvatarProps) {
  const dim = typeof size === 'number' ? `${size}px` : avatarSizeMap[size] ?? '40px';
  return (
    <Skeleton
      variant={variant}
      shape={shape === 'circle' ? 'circle' : 'rounded'}
      width={dim}
      height={dim}
      className={className}
    />
  );
}

export function SkeletonCard({
  variant    = 'shimmer',
  hasAvatar  = true,
  hasImage   = false,
  lines      = 3,
  hasActions = false,
  className  = '',
}: SkeletonCardProps) {
  return (
    <div className={['sk-card', className].filter(Boolean).join(' ')} aria-hidden="true">
      {hasImage && (
        <Skeleton variant={variant} shape="rectangle" width="100%" height={180} className="sk-card-image" />
      )}
      <div className="sk-card-body">
        {hasAvatar && (
          <div className="sk-card-header">
            <SkeletonAvatar variant={variant} size="md" />
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
              <Skeleton variant={variant} shape="pill" width="40%" height={12} />
              <Skeleton variant={variant} shape="pill" width="28%" height={10} />
            </div>
          </div>
        )}
        <SkeletonText variant={variant} lines={lines} />
        {hasActions && (
          <div className="sk-card-actions">
            <Skeleton variant={variant} shape="pill" width={80} height={32} />
            <Skeleton variant={variant} shape="pill" width={80} height={32} />
          </div>
        )}
      </div>
    </div>
  );
}

export function SkeletonTable({
  rows      = 4,
  cols      = 4,
  variant   = 'shimmer',
  hasHeader = true,
  className = '',
}: SkeletonTableProps) {
  return (
    <div className={['sk-table', className].filter(Boolean).join(' ')} aria-hidden="true">
      {hasHeader && (
        <div className="sk-table-row sk-table-header">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} variant={variant} shape="pill" height={12} width={i === 0 ? '60%' : '80%'} />
          ))}
        </div>
      )}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="sk-table-row">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} variant={variant} shape="pill" height={12}
              width={c === 0 ? '50%' : c === cols - 1 ? '30%' : '90%'} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Skeleton;