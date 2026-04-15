import React, { useState } from 'react';

// ─── Utility ────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// ─── Sub-components ─────────────────────────────────────────────────────────

export interface CardAvatarProps {
  initials?: string;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'teal' | 'coral' | 'purple' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export const CardAvatar: React.FC<CardAvatarProps> = ({ initials = '', color = 'blue', size = 'md', className = '', style = {} }) => {
  const sizes = { sm: 32, md: 40, lg: 48 };
  const px = sizes[size] ?? 40;
  const fontSize = px * 0.35;

  const colorMap: Record<string, { background: string, color: string }> = {
    blue:   { background: 'var(--card-avatar-blue-bg,   #E6F1FB)', color: 'var(--card-avatar-blue-fg,   #185FA5)' },
    green:  { background: 'var(--card-avatar-green-bg,  #EAF3DE)', color: 'var(--card-avatar-green-fg,  #3B6D11)' },
    amber:  { background: 'var(--card-avatar-amber-bg,  #FAEEDA)', color: 'var(--card-avatar-amber-fg,  #854F0B)' },
    red:    { background: 'var(--card-avatar-red-bg,    #FCEBEB)', color: 'var(--card-avatar-red-fg,    #A32D2D)' },
    teal:   { background: 'var(--card-avatar-teal-bg,   #E1F5EE)', color: 'var(--card-avatar-teal-fg,   #0F6E56)' },
    coral:  { background: 'var(--card-avatar-coral-bg,  #FAECE7)', color: 'var(--card-avatar-coral-fg,  #993C1D)' },
    purple: { background: 'var(--card-avatar-purple-bg, #EEEDFE)', color: 'var(--card-avatar-purple-fg, #534AB7)' },
    gray:   { background: 'var(--card-avatar-gray-bg,   #F1EFE8)', color: 'var(--card-avatar-gray-fg,   #5F5E5A)' },
  };

  const colors = colorMap[color] ?? colorMap.blue;

  return (
    <div
      className={cn('card-avatar', className)}
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        fontSize,
        flexShrink: 0,
        userSelect: 'none',
        ...colors,
        ...style,
      }}
    >
      {initials}
    </div>
  );
};

export interface CardBadgeProps {
  children?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral' | 'purple';
  className?: string;
  style?: React.CSSProperties;
}

export const CardBadge: React.FC<CardBadgeProps> = ({ children, variant = 'info', className = '', style = {} }) => {
  const variantMap: Record<string, { background: string; color: string }> = {
    info:    { background: '#E6F1FB', color: '#185FA5' },
    success: { background: '#EAF3DE', color: '#3B6D11' },
    warning: { background: '#FAEEDA', color: '#854F0B' },
    danger:  { background: '#FCEBEB', color: '#A32D2D' },
    neutral: { background: '#F1EFE8', color: '#5F5E5A' },
    purple:  { background: '#EEEDFE', color: '#534AB7' },
  };

  const styles = variantMap[variant] ?? variantMap.info;

  return (
    <span
      className={cn('card-badge', className)}
      style={{
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 20,
        lineHeight: 1.5,
        ...styles,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export interface CardHeaderProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  badgeVariant?: CardBadgeProps['variant'];
  avatar?: string;
  avatarColor?: CardAvatarProps['color'];
  avatarSize?: CardAvatarProps['size'];
  action?: React.ReactNode;
  divider?: boolean;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  badge,
  badgeVariant = 'info',
  avatar,
  avatarColor = 'blue',
  avatarSize = 'md',
  action,
  divider = true,
  padding = '16px 20px',
  className = '',
  style = {},
  children,
}) => {
  return (
    <>
      <div
        className={cn('card-header', className)}
        style={{ padding, ...style }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          {avatar && (
            <CardAvatar
              initials={avatar}
              color={avatarColor}
              size={avatarSize}
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            {badge && (
              <div style={{ marginBottom: 4 }}>
                <CardBadge variant={badgeVariant}>{badge}</CardBadge>
              </div>
            )}
            {title && (
              <div
                className="card-title"
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1.3,
                  color: 'var(--card-title-color, inherit)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </div>
            )}
            {subtitle && (
              <div
                className="card-subtitle"
                style={{
                  fontSize: 13,
                  marginTop: 2,
                  color: 'var(--card-subtitle-color, rgba(0,0,0,0.45))',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {subtitle}
              </div>
            )}
            {children}
          </div>
          {action && (
            <div style={{ flexShrink: 0 }}>{action}</div>
          )}
        </div>
      </div>
      {divider && (
        <hr
          style={{
            border: 'none',
            borderTop: '0.5px solid var(--card-divider-color, rgba(0,0,0,0.1))',
            margin: 0,
          }}
        />
      )}
    </>
  );
};

export interface CardMediaProps {
  src?: string;
  alt?: string;
  height?: number | string;
  objectFit?: React.CSSProperties['objectFit'];
  placeholder?: React.ReactNode;
  placeholderStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
}

export const CardMedia: React.FC<CardMediaProps> = ({
  src,
  alt = '',
  height = 180,
  objectFit = 'cover',
  placeholder,
  placeholderStyle = {},
  className = '',
  style = {},
}) => {
  return (
    <div
      className={cn('card-media', className)}
      style={{
        width: '100%',
        height,
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', display: 'block', objectFit }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #B5D4F4, #378ADD)',
            color: 'rgba(255,255,255,0.8)',
            fontSize: 13,
            letterSpacing: '0.04em',
            ...placeholderStyle,
          }}
        >
          {placeholder ?? 'Image'}
        </div>
      )}
    </div>
  );
};

export interface CardBodyProps {
  children?: React.ReactNode;
  padding?: string;
  stats?: Array<{ label: React.ReactNode; value: React.ReactNode }>;
  className?: string;
  style?: React.CSSProperties;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  padding = '16px 20px',
  stats,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={cn('card-body', className)}
      style={{ padding, ...style }}
    >
      {children}
      {stats && stats.length > 0 && (
        <div
          style={{
            display: 'flex',
            marginTop: 16,
            borderTop: '0.5px solid var(--card-divider-color, rgba(0,0,0,0.1))',
            paddingTop: 14,
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--card-title-color, inherit)' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--card-subtitle-color, rgba(0,0,0,0.45))', marginTop: 2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export interface CardFooterProps {
  children?: React.ReactNode;
  align?: 'start' | 'end' | 'center' | 'between' | 'around';
  padding?: string;
  divider?: boolean;
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  align = 'end',
  padding = '12px 20px',
  divider = true,
  gap = 8,
  className = '',
  style = {},
}) => {
  const justifyMap: Record<string, string> = {
    start:   'flex-start',
    end:     'flex-end',
    center:  'center',
    between: 'space-between',
    around:  'space-around',
  };

  return (
    <div
      className={cn('card-footer', className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: justifyMap[align] ?? 'flex-end',
        padding,
        gap,
        borderTop: divider
          ? '0.5px solid var(--card-divider-color, rgba(0,0,0,0.1))'
          : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export interface CardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const CardButton: React.FC<CardButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  style = {},
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);

  const variantStyles: Record<string, React.CSSProperties> = {
    primary:   { background: '#378ADD',                   color: '#fff',                         border: '0.5px solid transparent' },
    secondary: { background: 'rgba(0,0,0,0.04)',          color: 'var(--card-title-color, #111)', border: '0.5px solid rgba(0,0,0,0.12)' },
    ghost:     { background: 'transparent',               color: 'rgba(0,0,0,0.5)',              border: '0.5px solid rgba(0,0,0,0.1)' },
    danger:    { background: '#E24B4A',                   color: '#fff',                         border: '0.5px solid transparent' },
    success:   { background: '#639922',                   color: '#fff',                         border: '0.5px solid transparent' },
    link:      { background: 'transparent',               color: '#378ADD',                      border: 'none', padding: '0' },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { fontSize: 12, padding: '4px 10px', borderRadius: 6 },
    md: { fontSize: 13, padding: '6px 14px', borderRadius: 8 },
    lg: { fontSize: 14, padding: '8px 18px', borderRadius: 10 },
  };

  const vs = variantStyles[variant] ?? variantStyles.secondary;
  const ss = sizeStyles[size] ?? sizeStyles.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={cn('card-btn', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        fontWeight: 400,
        lineHeight: 1,
        transition: 'opacity 0.15s, transform 0.1s',
        opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        outline: 'none',
        ...vs,
        ...ss,
        ...style,
      }}
      {...rest}
    >
      {loading && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'card-spin 0.7s linear infinite' }}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
    </button>
  );
};

export interface CardDividerProps {
  style?: React.CSSProperties;
}

export const CardDivider: React.FC<CardDividerProps> = ({ style = {} }) => {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '0.5px solid var(--card-divider-color, rgba(0,0,0,0.1))',
        margin: '12px 0',
        ...style,
      }}
    />
  );
};

// ─── Root Card ───────────────────────────────────────────────────────────────

export interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled' | 'ghost';
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: 'none' | 'lift' | 'border' | 'dim' | 'glow';
  clickable?: boolean;
  selected?: boolean;
  loading?: boolean;
  width?: string | number;
  maxWidth?: string | number;

  // Legacy/Shorthand props to maintain backward compatibility
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: string;
}

const CardRoot: React.FC<CustomCardProps> = ({
  children,
  variant = 'outlined',
  radius = 'lg',
  shadow = 'none',
  hover = 'none',
  clickable = false,
  onClick,
  selected = false,
  loading = false,
  width,
  maxWidth,
  className = '',
  style = {},
  title,
  subtitle,
  footer,
  padding,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);

  const radiusMap: Record<string, number> = { none: 0, sm: 6, md: 8, lg: 12, xl: 16 };
  const borderRadius = radiusMap[radius] ?? 12;

  const shadowMap: Record<string, string> = {
    none: 'none',
    sm:   '0 1px 4px rgba(0,0,0,0.08)',
    md:   '0 4px 16px rgba(0,0,0,0.10)',
    lg:   '0 8px 32px rgba(0,0,0,0.14)',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    elevated: {
      background: '#fff',
      border: 'none',
      boxShadow: hovered && hover !== 'none' ? shadowMap.lg : shadowMap.md,
    },
    outlined: {
      background: '#fff',
      border: selected
        ? '2px solid #378ADD'
        : hovered && hover === 'border'
        ? '1.5px solid #378ADD'
        : '0.5px solid rgba(0,0,0,0.12)',
      boxShadow: shadowMap[shadow],
    },
    filled: {
      background: 'rgba(0,0,0,0.03)',
      border: '0.5px solid rgba(0,0,0,0.06)',
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  };

  const hoverTransforms: Record<string, string> = {
    lift: hovered ? 'translateY(-4px)' : 'none',
    none: 'none',
    border: 'none',
    dim: 'none',
    glow: 'none',
  };

  const hoverOpacity = hover === 'dim' && hovered ? 0.65 : 1;

  const glowShadow =
    hover === 'glow' && hovered
      ? '0 0 0 3px rgba(55,138,221,0.25)'
      : undefined;

  const vs = variantStyles[variant] ?? variantStyles.outlined;
  const hasLegacyProps = title || subtitle || footer || padding;

  return (
    <div
      role={clickable || onClick ? 'button' : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      className={cn('card', className)}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>); } : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: clickable || onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, border-color 0.2s ease',
        transform: hoverTransforms[hover],
        opacity: hoverOpacity,
        width: width ?? '100%',
        maxWidth,
        borderRadius,
        boxShadow: glowShadow ?? vs.boxShadow,
        ...vs,
        ...style,
      }}
      {...rest}
    >
      {loading && <CardSkeleton />}
      {!loading && !hasLegacyProps && children}
      {!loading && hasLegacyProps && (
        <>
          {(title || subtitle) && (
            <CardHeader title={title} subtitle={subtitle} padding={padding || '20px 24px'} />
          )}
          <CardBody padding={padding || '24px'}>
            {children}
          </CardBody>
          {footer && (
            <CardFooter padding="16px 24px" style={{ background: '#f8fafc' }}>
              {footer}
            </CardFooter>
          )}
        </>
      )}
    </div>
  );
};

// ─── Skeleton Overlay ─────────────────────────────────────────────────────────

function CardSkeleton() {
  const shimmer: React.CSSProperties = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'card-shimmer 1.4s ease-in-out infinite',
    borderRadius: 6,
  };
  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', ...shimmer }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 13, width: '55%', ...shimmer }} />
          <div style={{ height: 11, width: '35%', ...shimmer }} />
        </div>
      </div>
      <div style={{ height: 11, width: '100%', ...shimmer }} />
      <div style={{ height: 11, width: '88%', ...shimmer }} />
      <div style={{ height: 11, width: '72%', ...shimmer }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
        <div style={{ height: 30, width: 70, borderRadius: 8, ...shimmer }} />
        <div style={{ height: 30, width: 80, borderRadius: 8, ...shimmer }} />
      </div>
      <style>{`
        @keyframes card-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes card-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Compound Component Attachments ──────────────────────────────────────────

export const CustomCard = Object.assign(CardRoot, {
  Header: CardHeader,
  Media: CardMedia,
  Body: CardBody,
  Footer: CardFooter,
  Button: CardButton,
  Badge: CardBadge,
  Avatar: CardAvatar,
  Divider: CardDivider,
});

export default CustomCard;
