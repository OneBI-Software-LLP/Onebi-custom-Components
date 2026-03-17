import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  style,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{label}</label>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leftIcon && (
          <div style={{ position: 'absolute', left: '12px', color: '#94a3b8' }}>
            {leftIcon}
          </div>
        )}
        <input
          style={{
            width: '100%',
            padding: `10px 12px 10px ${leftIcon ? '40px' : '12px'}`,
            borderRadius: '8px',
            border: `1px solid ${error ? '#ef4444' : '#e2e8f0'}`,
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            ...style
          }}
          {...props}
        />
      </div>
      {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
      {!error && helperText && <span style={{ fontSize: '12px', color: '#64748b' }}>{helperText}</span>}
    </div>
  );
};
