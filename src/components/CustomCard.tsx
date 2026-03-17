import React from 'react';

interface CustomCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  title,
  subtitle,
  footer,
  children,
  padding = '24px',
  style,
}) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f1f5f9',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }}>
      {(title || subtitle) && (
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
          {title && <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{title}</h3>}
          {subtitle && <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>{subtitle}</p>}
        </div>
      )}
      <div style={{ padding, flex: 1 }}>
        {children}
      </div>
      {footer && (
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
          {footer}
        </div>
      )}
    </div>
  );
};
