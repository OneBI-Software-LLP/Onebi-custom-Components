import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from 'react';
import { createPortal } from 'react-dom';
import { CustomButton } from './CustomButton';

// ─── Animation keyframes (injected once) ────────────────────────────────────

const STYLES = `
@keyframes modal-overlay-in  { from { opacity: 0; }                              to { opacity: 1; } }
@keyframes modal-overlay-out { from { opacity: 1; }                              to { opacity: 0; } }
@keyframes modal-scale-in    { from { opacity: 0; transform: scale(0.94) translateY(8px); }  to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes modal-scale-out   { from { opacity: 1; transform: scale(1) translateY(0); }       to { opacity: 0; transform: scale(0.94) translateY(8px); } }
@keyframes modal-slide-up-in    { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
@keyframes modal-slide-up-out   { from { opacity: 1; transform: translateY(0); }    to { opacity: 0; transform: translateY(100%); } }
@keyframes modal-slide-right-in  { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
@keyframes modal-slide-right-out { from { opacity: 1; transform: translateX(0); }    to { opacity: 0; transform: translateX(100%); } }
@keyframes modal-slide-left-in   { from { opacity: 0; transform: translateX(-100%); } to { opacity: 1; transform: translateX(0); } }
@keyframes modal-slide-left-out  { from { opacity: 1; transform: translateX(0); }     to { opacity: 0; transform: translateX(-100%); } }
@keyframes modal-fade-in  { from { opacity: 0; } to { opacity: 1; } }
@keyframes modal-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes modal-flip-in  { from { opacity: 0; transform: perspective(800px) rotateX(-12deg); } to { opacity: 1; transform: perspective(800px) rotateX(0deg); } }
@keyframes modal-flip-out { from { opacity: 1; transform: perspective(800px) rotateX(0deg); } to { opacity: 0; transform: perspective(800px) rotateX(-12deg); } }
@keyframes modal-spin  { to { transform: rotate(360deg); } }
.modal-scroll-lock { overflow: hidden !important; }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = STYLES;
  document.head.appendChild(el);
  stylesInjected = true;
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function cn(...cls: (string | undefined | false | null)[]) {
  return cls.filter(Boolean).join(' ');
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ModalContext = createContext<{ onClose?: () => void } | null>(null);
function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal sub-component must be inside <CustomModal>');
  return ctx;
}

// ─── Size map ────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<string, { maxWidth: number | string; minWidth: number | string }> = {
  xs:   { maxWidth: 320,  minWidth: 280 },
  sm:   { maxWidth: 440,  minWidth: 320 },
  md:   { maxWidth: 560,  minWidth: 360 },
  lg:   { maxWidth: 720,  minWidth: 440 },
  xl:   { maxWidth: 960,  minWidth: 560 },
  '2xl':{ maxWidth: 1200, minWidth: 640 },
  full: { maxWidth: '100vw', minWidth: '100vw' },
};

// ─── Animation helpers ───────────────────────────────────────────────────────

function getAnimation(type: string, enter: boolean, duration: number, easing: string) {
  const map: Record<string, [string | null, string | null]> = {
    scale: ['modal-scale-in', 'modal-scale-out'],
    fade:  ['modal-fade-in',  'modal-fade-out'],
    'slide-up':    ['modal-slide-up-in',    'modal-slide-up-out'],
    'slide-right': ['modal-slide-right-in', 'modal-slide-right-out'],
    'slide-left':  ['modal-slide-left-in',  'modal-slide-left-out'],
    flip:  ['modal-flip-in',  'modal-flip-out'],
    none:  [null, null],
  };
  const [inAnim, outAnim] = map[type] ?? map.scale;
  const name = enter ? inAnim : outAnim;
  if (!name) return {};
  return { animation: `${name} ${duration}ms ${easing} both` };
}

// ─── Close Button ─────────────────────────────────────────────────────────────

export interface CloseButtonProps {
  onClose?: () => void;
  style?: React.CSSProperties;
}

function CloseButton({ onClose, style = {} }: CloseButtonProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClose}
      aria-label="Close modal"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute', top: 14, right: 14,
        width: 28, height: 28, borderRadius: 6,
        border: '0.5px solid var(--modal-border, rgba(0,0,0,0.10))',
        background: hov ? 'var(--modal-close-hover-bg, rgba(0,0,0,0.06))' : 'transparent',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--modal-close-color, rgba(0,0,0,0.4))',
        transition: 'background 0.15s, color 0.15s',
        flexShrink: 0,
        ...style,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// ─── ModalHeader ─────────────────────────────────────────────────────────────

export interface ModalHeaderProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  iconVariant?: 'info' | 'success' | 'warning' | 'danger' | 'purple' | 'neutral';
  showClose?: boolean;
  divider?: boolean;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ModalHeader({
  children,
  title,
  subtitle,
  icon,
  iconVariant = 'info',
  showClose = true,
  divider = true,
  padding = '20px 24px',
  className = '',
  style = {},
}: ModalHeaderProps) {
  const { onClose } = useModalContext();

  const iconColors: Record<string, { bg: string; color: string }> = {
    info:    { bg: '#E6F1FB', color: '#185FA5' },
    success: { bg: '#EAF3DE', color: '#3B6D11' },
    warning: { bg: '#FAEEDA', color: '#854F0B' },
    danger:  { bg: '#FCEBEB', color: '#A32D2D' },
    purple:  { bg: '#EEEDFE', color: '#534AB7' },
    neutral: { bg: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.5)' },
  };

  const ic = iconColors[iconVariant] ?? iconColors.info;

  return (
    <>
      <div
        className={cn('modal-header', className)}
        style={{
          padding,
          position: 'relative',
          display: 'flex',
          alignItems: icon ? 'flex-start' : 'center',
          gap: 12,
          flexShrink: 0,
          ...style,
        }}
      >
        {icon && (
          <div style={{
            width: 38, height: 38, borderRadius: 8, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: ic.bg, color: ic.color, fontSize: 18,
          }}>
            {icon}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div style={{
              fontWeight: 500, fontSize: 16, lineHeight: 1.3,
              color: 'var(--modal-title-color, inherit)',
              paddingRight: showClose ? 32 : 0,
            }}>
              {title}
            </div>
          )}
          {subtitle && (
            <div style={{
              fontSize: 13, marginTop: 3,
              color: 'var(--modal-subtitle-color, rgba(0,0,0,0.45))',
              lineHeight: 1.4,
            }}>
              {subtitle}
            </div>
          )}
          {children}
        </div>
        {showClose && <CloseButton onClose={onClose} />}
      </div>
      {divider && (
        <hr style={{ border: 'none', borderTop: '0.5px solid var(--modal-border, rgba(0,0,0,0.10))', margin: 0, flexShrink: 0 }} />
      )}
    </>
  );
}

// ─── ModalBody ────────────────────────────────────────────────────────────────

export interface ModalBodyProps {
  children?: React.ReactNode;
  padding?: string;
  scrollable?: boolean;
  maxHeight?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function ModalBody({
  children,
  padding = '20px 24px',
  scrollable = true,
  maxHeight,
  className = '',
  style = {},
}: ModalBodyProps) {
  return (
    <div
      className={cn('modal-body', className)}
      style={{
        padding,
        flex: '1 1 auto',
        overflowY: scrollable ? 'auto' : 'visible',
        maxHeight: maxHeight,
        minHeight: 0,
        color: 'var(--modal-body-color, rgba(0,0,0,0.6))',
        fontSize: 14,
        lineHeight: 1.65,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── ModalFooter ──────────────────────────────────────────────────────────────

export interface ModalFooterProps {
  children?: React.ReactNode;
  align?: 'start' | 'end' | 'center' | 'between';
  padding?: string;
  divider?: boolean;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ModalFooter({
  children,
  align = 'end',
  padding = '16px 24px',
  divider = true,
  gap = 8,
  className = '',
  style = {},
}: ModalFooterProps) {
  const justifyMap: Record<string, string> = {
    start: 'flex-start', end: 'flex-end',
    center: 'center', between: 'space-between',
  };

  return (
    <>
      {divider && (
        <hr style={{ border: 'none', borderTop: '0.5px solid var(--modal-border, rgba(0,0,0,0.10))', margin: 0, flexShrink: 0 }} />
      )}
      <div
        className={cn('modal-footer', className)}
        style={{
          padding,
          display: 'flex',
          alignItems: 'center',
          justifyContent: justifyMap[align] ?? 'flex-end',
          gap,
          flexShrink: 0,
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );
}

// ─── ModalButton ─────────────────────────────────────────────────────────────

export interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export function ModalButton({
  children,
  variant = 'secondary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  fullWidth = false,
  className = '',
  style = {},
  ...rest
}: ModalButtonProps) {
  const [pressed, setPressed] = useState(false);
  const [hov, setHov] = useState(false);

  const variantMap: Record<string, { bg: string; bg2: string | null; color: string; border: string }> = {
    primary:   { bg: '#378ADD',                bg2: '#2d6fb0', color: '#fff',                          border: 'transparent' },
    secondary: { bg: hov ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.03)', bg2: null, color: 'var(--modal-title-color, #111)', border: 'rgba(0,0,0,0.12)' },
    ghost:     { bg: hov ? 'rgba(0,0,0,0.04)' : 'transparent',       bg2: null, color: 'rgba(0,0,0,0.5)', border: 'rgba(0,0,0,0.10)' },
    danger:    { bg: '#E24B4A',                bg2: '#b83b3b', color: '#fff',                          border: 'transparent' },
    success:   { bg: '#639922',                bg2: '#4e7a1a', color: '#fff',                          border: 'transparent' },
    warning:   { bg: '#BA7517',                bg2: '#96600f', color: '#fff',                          border: 'transparent' },
    link:      { bg: 'transparent',            bg2: null,      color: '#378ADD',                       border: 'transparent' },
  };

  const sizeMap: Record<string, { fontSize: number; padding: string; borderRadius: number; height: number }> = {
    sm: { fontSize: 12, padding: '5px 12px', borderRadius: 6, height: 30 },
    md: { fontSize: 13, padding: '7px 16px', borderRadius: 8, height: 36 },
    lg: { fontSize: 14, padding: '9px 20px', borderRadius: 9, height: 42 },
  };

  const v = variantMap[variant] ?? variantMap.secondary;
  const s = sizeMap[size] ?? sizeMap.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={cn('modal-btn', className)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: 'inherit', fontWeight: 400, lineHeight: 1, whiteSpace: 'nowrap',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        border: `0.5px solid ${v.border}`,
        background: pressed ? (v.bg2 ?? v.bg) : v.bg,
        color: v.color,
        opacity: disabled ? 0.42 : 1,
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'background 0.12s, opacity 0.12s, transform 0.08s',
        outline: 'none',
        width: fullWidth ? '100%' : 'auto',
        ...s, ...style,
      }}
      {...rest}
    >
      {loading && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ animation: 'modal-spin 0.7s linear infinite', flexShrink: 0 }}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && <span style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>{icon}</span>}
    </button>
  );
}

// ─── ModalDivider ─────────────────────────────────────────────────────────────

export interface ModalDividerProps {
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

export function ModalDivider({ label, style = {} }: ModalDividerProps) {
  if (label) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0', ...style }}>
        <hr style={{ flex: 1, border: 'none', borderTop: '0.5px solid var(--modal-border, rgba(0,0,0,0.10))' }} />
        <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', whiteSpace: 'nowrap' }}>{label}</span>
        <hr style={{ flex: 1, border: 'none', borderTop: '0.5px solid var(--modal-border, rgba(0,0,0,0.10))' }} />
      </div>
    );
  }
  return <hr style={{ border: 'none', borderTop: '0.5px solid var(--modal-border, rgba(0,0,0,0.10))', margin: '4px 0', ...style }} />;
}

// ─── ModalStep (for stepper/wizard modals) ────────────────────────────────────

export interface ModalStepperProps {
  steps?: string[];
  current?: number;
  style?: React.CSSProperties;
}

export function ModalStepper({ steps = [], current = 0, style = {} }: ModalStepperProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0 24px 16px', flexShrink: 0, ...style }}>
      {steps.map((step, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 500,
                background: done ? '#378ADD' : active ? '#E6F1FB' : 'rgba(0,0,0,0.04)',
                color:      done ? '#fff'    : active ? '#185FA5' : 'rgba(0,0,0,0.35)',
                border:     active ? '1.5px solid #378ADD' : '0.5px solid rgba(0,0,0,0.12)',
                transition: 'all 0.25s',
              }}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i + 1}
              </div>
              <span style={{
                fontSize: 11, fontWeight: active ? 500 : 400,
                color: active ? 'var(--modal-title-color, #111)' : 'rgba(0,0,0,0.38)',
                whiteSpace: 'nowrap',
              }}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: 1, marginBottom: 16,
                background: done ? '#378ADD' : 'rgba(0,0,0,0.10)',
                transition: 'background 0.25s',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export interface CustomModalProps {
  open?: boolean;
  isOpen?: boolean; // legacy compat
  onClose?: () => void;
  title?: string;   // legacy compat
  children?: React.ReactNode;
  footer?: React.ReactNode; // legacy compat
  
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  animation?: 'scale' | 'fade' | 'slide-up' | 'slide-right' | 'slide-left' | 'flip' | 'none';
  animationDuration?: number;
  animationEasing?: string;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
  blur?: boolean;
  blurAmount?: number;
  overlayColor?: string;
  overlayOpacity?: number;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  scrollable?: boolean;
  zIndex?: number;
  portalTarget?: HTMLElement | null;
  className?: string;
  style?: React.CSSProperties;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
}

const ModalRoot: React.FC<CustomModalProps> = ({
  open,
  isOpen,
  onClose = () => {},
  children,
  title,
  footer,
  size = 'md',
  position = 'center',
  animation = 'scale',
  animationDuration = 220,
  animationEasing = 'cubic-bezier(0.16,1,0.3,1)',
  closeOnOverlay = true,
  closeOnEsc = true,
  lockScroll = true,
  blur = false,
  blurAmount = 4,
  overlayColor,
  overlayOpacity = 0.45,
  radius = 'lg',
  shadow = 'lg',
  fullScreen = false,
  scrollable = true,
  zIndex = 1000,
  portalTarget,
  className = '',
  style = {},
  onAfterOpen,
  onAfterClose,
}) => {
  const isActuallyOpen = open !== undefined ? open : (isOpen !== undefined ? isOpen : false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  injectStyles();

  // Mount / unmount with animation
  useEffect(() => {
    if (isActuallyOpen) {
      if (typeof document !== 'undefined') {
        prevFocus.current = document.activeElement as HTMLElement;
      }
      setMounted(true);
      requestAnimationFrame(() => {
        setVisible(true);
        if (lockScroll && typeof document !== 'undefined') document.body.classList.add('modal-scroll-lock');
        setTimeout(() => { onAfterOpen?.(); panelRef.current?.focus(); }, animationDuration);
      });
    } else {
      setVisible(false);
      setTimeout(() => {
        setMounted(false);
        if (lockScroll && typeof document !== 'undefined') document.body.classList.remove('modal-scroll-lock');
        prevFocus.current?.focus();
        onAfterClose?.();
      }, animationDuration);
    }
    return () => {
      if (lockScroll && typeof document !== 'undefined') document.body.classList.remove('modal-scroll-lock');
    };
  }, [isActuallyOpen, lockScroll, animationDuration, onAfterOpen, onAfterClose]);

  // Esc key
  useEffect(() => {
    if (!closeOnEsc || typeof document === 'undefined') return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isActuallyOpen) onClose?.(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeOnEsc, isActuallyOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!mounted || !panelRef.current || typeof document === 'undefined') return;
    const panel = panelRef.current;
    const focusable = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const els = Array.from(panel.querySelectorAll(focusable)).filter(el => !el.closest('[aria-hidden]')) as HTMLElement[];
      if (!els.length) { e.preventDefault(); return; }
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mounted]);

  if (!mounted) return null;

  // ── Layout / position ─────────────────────────────────────────────────────

  const radiusMap: Record<string, number> = { none: 0, sm: 6, md: 10, lg: 14, xl: 20 };
  const shadowMap: Record<string, string> = {
    none: 'none',
    sm:   '0 2px 8px rgba(0,0,0,0.10)',
    md:   '0 8px 24px rgba(0,0,0,0.14)',
    lg:   '0 16px 48px rgba(0,0,0,0.18)',
    xl:   '0 24px 80px rgba(0,0,0,0.24)',
  };

  const sz = fullScreen ? { maxWidth: '100vw', minWidth: '100vw', height: '100vh' } : SIZE_MAP[size] ?? SIZE_MAP.md;

  // Auto-pick animation based on position
  const autoAnim = animation === 'scale' ? (
    position === 'bottom' ? 'slide-up' :
    position === 'right'  ? 'slide-right' :
    position === 'left'   ? 'slide-left' :
    'scale'
  ) : animation;

  const positionStyle = (() => {
    const base = { position: 'fixed' as const, zIndex: zIndex + 1 };
    if (fullScreen) return { ...base, inset: 0 };
    switch (position) {
      case 'top':    return { ...base, top: 24, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom': return { ...base, bottom: 0, left: 0, right: 0, borderRadius: `${radiusMap[radius] ?? 14}px ${radiusMap[radius] ?? 14}px 0 0` };
      case 'left':   return { ...base, top: 0, bottom: 0, left: 0, borderRadius: `0 ${radiusMap[radius] ?? 14}px ${radiusMap[radius] ?? 14}px 0`, height: '100vh' };
      case 'right':  return { ...base, top: 0, bottom: 0, right: 0, borderRadius: `${radiusMap[radius] ?? 14}px 0 0 ${radiusMap[radius] ?? 14}px`, height: '100vh' };
      default:       return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  })();

  const isSidebar = position === 'left' || position === 'right';
  const isSheet   = position === 'bottom';

  const panelStyle = {
    ...positionStyle,
    background: 'var(--modal-bg, #fff)',
    borderRadius: fullScreen || isSheet || isSidebar ? (positionStyle as any).borderRadius : radiusMap[radius] ?? 14,
    boxShadow: shadowMap[shadow] ?? shadowMap.lg,
    display: 'flex',
    flexDirection: 'column' as const,
    outline: 'none',
    overflowY: scrollable ? 'auto' as const : 'hidden' as const,
    overflowX: 'hidden' as const,
    maxWidth: isSidebar ? (sz.maxWidth ?? 440) : (sz.maxWidth ?? 560),
    minWidth: isSidebar ? (sz.minWidth ?? 320) : (sz.minWidth ?? 360),
    width: fullScreen || isSheet ? '100%' : undefined,
    maxHeight: fullScreen ? '100vh' : isSidebar ? '100vh' : isSheet ? '90vh' : '90vh',
    ...getAnimation(autoAnim, visible, animationDuration, animationEasing),
    ...style,
  };

  const overlayStyle = {
    position: 'fixed' as const, inset: 0, zIndex,
    backgroundColor: overlayColor ?? `rgba(0,0,0,${overlayOpacity})`,
    backdropFilter: blur ? `blur(${blurAmount}px)` : undefined,
    WebkitBackdropFilter: blur ? `blur(${blurAmount}px)` : undefined,
    animation: `${visible ? 'modal-overlay-in' : 'modal-overlay-out'} 200ms ease both`,
  };

  const isLegacy = title !== undefined;

  const content = (
    <ModalContext.Provider value={{ onClose }}>
      <div style={overlayStyle} onClick={closeOnOverlay ? onClose : undefined} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn('modal-panel', className)}
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {isLegacy ? (
          <>
            <ModalHeader title={title} showClose={true} />
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {footer || (
                <>
                  <CustomButton variant="secondary" onClick={onClose}>Cancel</CustomButton>
                  <CustomButton onClick={onClose}>Confirm</CustomButton>
                </>
              )}
            </ModalFooter>
          </>
        ) : (
          children
        )}
      </div>
    </ModalContext.Provider>
  );

  const target = portalTarget ?? (typeof document !== 'undefined' ? document.body : null);
  return target ? createPortal(content, target) : null;
};

// ─── Attach sub-components ────────────────────────────────────────────────────

export const CustomModal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Button: ModalButton,
  Divider: ModalDivider,
  Stepper: ModalStepper,
});

export default CustomModal;
