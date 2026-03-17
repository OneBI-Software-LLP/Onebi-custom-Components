import React from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary': return { backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0' };
      case 'outline': return { backgroundColor: 'transparent', color: '#6366f1', border: '1px solid #6366f1' };
      case 'danger': return { backgroundColor: '#ef4444', color: 'white', border: 'none' };
      case 'ghost': return { backgroundColor: 'transparent', color: '#64748b', border: 'none' };
      default: return { backgroundColor: '#6366f1', color: 'white', border: 'none' };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return { padding: '6px 12px', fontSize: '13px' };
      case 'lg': return { padding: '12px 24px', fontSize: '16px' };
      default: return { padding: '8px 16px', fontSize: '14px' };
    }
  };

  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: props.disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity: props.disabled || loading ? 0.6 : 1,
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style
      }}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
        <svg 
          style={{ width: '16px', height: '16px' }} 
          className="animate-spin" 
          viewBox="0 0 24 24"
        >
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      {!loading && icon}
      {children}
    </button>
  );
};
