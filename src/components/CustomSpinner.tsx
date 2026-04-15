import React from "react";

const SIZE_MAP: Record<string, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

const SPEED_MAP: Record<string, number> = {
  slow: 1200,
  normal: 700,
  fast: 400,
};

const COLOR_MAP: Record<string, string> = {
  primary: "#185FA5",
  blue:    "#185FA5",
  teal:    "#1D9E75",
  purple:  "#534AB7",
  coral:   "#D85A30",
  amber:   "#BA7517",
  green:   "#3B6D11",
  red:     "#E24B4A",
  pink:    "#993556",
  dark:    "#444441",
  muted:   "#B4B2A9",
};

const KEYFRAMES = `
@keyframes __sp_spin        { to { transform: rotate(360deg); } }
@keyframes __sp_spin_rev    { to { transform: rotate(-360deg); } }
@keyframes __sp_pulse       { 0%,100% { transform: scale(0.55); opacity: .35; } 50% { transform: scale(1); opacity: 1; } }
@keyframes __sp_bar         { 0%,100% { transform: scaleY(0.3); opacity: .4; } 50% { transform: scaleY(1); opacity: 1; } }
@keyframes __sp_dot_bounce  { 0%,80%,100% { transform: scale(0); opacity: .25; } 40% { transform: scale(1); opacity: 1; } }
@keyframes __sp_bounce      { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
@keyframes __sp_orbit       { 0% { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); } 100% { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); } }
@keyframes __sp_clock_hand  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes __sp_ripple      { 0% { transform: scale(0); opacity: .85; } 100% { transform: scale(1); opacity: 0; } }
`;

let _kfInjected = false;
function ensureKeyframes() {
  if (_kfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.spinnerId = "1";
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
  _kfInjected = true;
}

function resolveColor(color?: string) {
  if (!color) return COLOR_MAP.primary;
  return COLOR_MAP[color] ?? color;
}

function resolveSize(size?: string | number) {
  if (typeof size === "number") return size;
  return SIZE_MAP[size || "md"] ?? SIZE_MAP.md;
}

function resolveSpeed(speed?: string | number) {
  if (typeof speed === "number") return speed;
  return SPEED_MAP[speed || "normal"] ?? SPEED_MAP.normal;
}

function resolveThickness(thickness: number | undefined, sizePx: number) {
  if (thickness != null) return thickness;
  if (sizePx <= 20) return 2;
  if (sizePx <= 30) return 2.5;
  if (sizePx <= 44) return 3;
  if (sizePx <= 56) return 4;
  return 5;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "0,0,0";
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

function makeTrackColor(color: string, trackColor?: string, trackOpacity?: number) {
  if (trackColor) return trackColor;
  if (color.startsWith("#") && color.length === 7) {
    return `rgba(${hexToRgb(color)},${trackOpacity})`;
  }
  return `rgba(0,0,0,${trackOpacity})`;
}

export type SpinnerType = "ring" | "arc" | "dual-ring" | "dots" | "bounce" | "bars" | "pulse" | "orbit" | "clock" | "ripple";
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
export type SpinnerSpeed = "slow" | "normal" | "fast" | number;
export type SpinnerColor = "primary" | "blue" | "teal" | "purple" | "coral" | "amber" | "green" | "red" | "pink" | "dark" | "muted" | (string & {});
export type SpinnerLabelPosition = "bottom" | "right" | "top" | "left";

export interface SpinnerProps {
  type?: SpinnerType;
  size?: SpinnerSize;
  color?: SpinnerColor;
  trackColor?: string;
  trackOpacity?: number;
  thickness?: number;
  speed?: SpinnerSpeed;
  easing?: string;
  paused?: boolean;
  label?: React.ReactNode;
  labelPosition?: SpinnerLabelPosition;
  labelStyle?: React.CSSProperties;
  overlay?: boolean;
  overlayColor?: string;
  overlayBlur?: boolean;
  style?: React.CSSProperties;
  className?: string;
  role?: string;
}

interface CommonGraphicProps {
  size: number;
  sw: number;
  color: string;
  trackC: string;
  dur: number;
  easing: string;
  paused: boolean;
}

function RingSpinner({ size, sw, color, trackC, dur, easing, paused }: CommonGraphicProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: `${sw}px solid ${trackC}`,
    borderTopColor: color,
    animation: `__sp_spin ${dur}ms ${easing} infinite`,
    animationPlayState: paused ? "paused" : "running",
    flexShrink: 0,
  };
  return <div style={style} />;
}

function ArcSpinner({ size, sw, color, trackC, dur, easing, paused }: CommonGraphicProps) {
  const r = (size - sw * 2) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        animation: `__sp_spin ${dur}ms ${easing} infinite`,
        animationPlayState: paused ? "paused" : "running",
        flexShrink: 0,
      }}
    >
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={trackC} strokeWidth={sw} />
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.72}
        transform={`rotate(-90 ${cx} ${cx})`}
      />
    </svg>
  );
}

function DualRingSpinner({ size, sw, color, trackC, dur, easing, paused }: CommonGraphicProps) {
  const innerSize = Math.round(size * 0.55);
  const offset = Math.round((size - innerSize) / 2 - sw);
  const innerDur = Math.round(dur * 0.65);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${sw}px solid ${trackC}`,
        borderTopColor: color,
        animation: `__sp_spin ${dur}ms ${easing} infinite`,
        animationPlayState: paused ? "paused" : "running",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: offset,
          left: offset,
          width: innerSize,
          height: innerSize,
          borderRadius: "50%",
          border: `${Math.max(1, sw - 1)}px solid ${trackC}`,
          borderBottomColor: color,
          animation: `__sp_spin_rev ${innerDur}ms ${easing} infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
    </div>
  );
}

function DotsSpinner({ size, color, dur, paused }: { size: number; color: string; dur: number; paused: boolean }) {
  const dotSize = Math.max(5, Math.round(size / 5));
  const gap = Math.round(dotSize * 0.6);
  const count = 3;
  return (
    <div style={{ display: "flex", alignItems: "center", gap, flexShrink: 0 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: color,
            animation: `__sp_dot_bounce ${dur}ms ease-in-out infinite`,
            animationDelay: `${i * (dur / count / 2)}ms`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      ))}
    </div>
  );
}

function BounceSpinner({ size, color, dur, paused }: { size: number; color: string; dur: number; paused: boolean }) {
  const dotSize = Math.max(6, Math.round(size / 4));
  const gap = Math.round(dotSize * 0.4);
  const count = 3;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap,
        height: size,
        flexShrink: 0,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: color,
            animation: `__sp_bounce ${dur}ms ease-in-out infinite`,
            animationDelay: `${i * (dur / count / 2.2)}ms`,
            animationPlayState: paused ? "paused" : "running",
            transformOrigin: "center bottom",
          }}
        />
      ))}
    </div>
  );
}

function BarsSpinner({ size, color, dur, paused }: { size: number; color: string; dur: number; paused: boolean }) {
  const count = 5;
  const barW = Math.max(3, Math.round(size / 7));
  const barH = Math.round(size * 0.75);
  const gap = Math.max(2, Math.round(barW * 0.55));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap,
        height: size,
        flexShrink: 0,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: barW,
            height: barH,
            borderRadius: barW,
            background: color,
            animation: `__sp_bar ${dur}ms ease-in-out infinite`,
            animationDelay: `${i * 100}ms`,
            animationPlayState: paused ? "paused" : "running",
            transformOrigin: "center center",
          }}
        />
      ))}
    </div>
  );
}

function PulseSpinner({ size, color, dur, paused }: { size: number; color: string; dur: number; paused: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        animation: `__sp_pulse ${dur}ms ease-in-out infinite`,
        animationPlayState: paused ? "paused" : "running",
        flexShrink: 0,
      }}
    />
  );
}

function OrbitSpinner({ size, sw, color, trackC, dur, easing, paused }: CommonGraphicProps) {
  const orbitR = Math.round(size / 4);
  const dotSize = Math.max(4, Math.round(size / 6));
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${sw}px solid ${trackC}`,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: color,
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: -(dotSize / 2),
          marginLeft: -(dotSize / 2),
          "--orbit-r": `${orbitR}px` as any,
          animation: `__sp_orbit ${dur}ms ${easing} infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
    </div>
  );
}

function ClockSpinner({ size, sw, color, trackC, dur, paused }: { size: number; sw: number; color: string; trackC: string; dur: number; paused: boolean }) {
  const cx = size / 2;
  const r = cx - sw / 2;
  const handLen = cx * 0.6;
  const minLen = cx * 0.42;
  const hw = Math.max(1.5, sw - 1);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ flexShrink: 0 }}
    >
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={trackC} strokeWidth={sw} />
      <line x1={cx} y1={cx} x2={cx + minLen} y2={cx} stroke={color} strokeWidth={hw} strokeLinecap="round" />
      <line
        x1={cx} y1={cx} x2={cx} y2={cx - handLen}
        stroke={color} strokeWidth={hw + 1} strokeLinecap="round"
        style={{
          transformOrigin: `${cx}px ${cx}px`,
          animation: `__sp_clock_hand ${dur}ms linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
      <circle cx={cx} cy={cx} r={hw} fill={color} />
    </svg>
  );
}

function RippleSpinner({ size, sw, color, dur, paused }: { size: number; sw: number; color: string; dur: number; paused: boolean }) {
  const centerDot = Math.round(size * 0.16);
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `${sw}px solid ${color}`,
            animation: `__sp_ripple ${dur}ms ease-out infinite`,
            animationDelay: `${i * (dur / 2)}ms`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      ))}
      <div
        style={{
          width: centerDot,
          height: centerDot,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

function SpinnerGraphic({ type, sizePx, sw, color, trackC, dur, easing, paused }: CommonGraphicProps & { type: SpinnerType }) {
  const shared = { size: sizePx, sw, color, trackC, dur, easing, paused };
  switch (type) {
    case "arc":       return <ArcSpinner {...shared} />;
    case "dual-ring": return <DualRingSpinner {...shared} />;
    case "dots":      return <DotsSpinner size={sizePx} color={color} dur={dur} paused={paused} />;
    case "bounce":    return <BounceSpinner size={sizePx} color={color} dur={dur} paused={paused} />;
    case "bars":      return <BarsSpinner size={sizePx} color={color} dur={dur} paused={paused} />;
    case "pulse":     return <PulseSpinner size={sizePx} color={color} dur={dur} paused={paused} />;
    case "orbit":     return <OrbitSpinner {...shared} />;
    case "clock":     return <ClockSpinner size={sizePx} sw={sw} color={color} trackC={trackC} dur={dur} paused={paused} />;
    case "ripple":    return <RippleSpinner size={sizePx} sw={sw} color={color} dur={dur} paused={paused} />;
    case "ring":
    default:          return <RingSpinner {...shared} />;
  }
}

export function Spinner({
  type = "ring",
  size = "md",
  color = "primary",
  trackColor,
  trackOpacity = 0.15,
  thickness,
  speed = "normal",
  easing = "linear",
  paused = false,
  label,
  labelPosition = "bottom",
  labelStyle,
  overlay = false,
  overlayColor = "rgba(255,255,255,0.75)",
  overlayBlur = false,
  style: styleProp,
  className = "",
  role = "status",
}: SpinnerProps) {
  ensureKeyframes();

  const sizePx = resolveSize(size);
  const dur = resolveSpeed(speed);
  const resolvedColor = resolveColor(color);
  const sw = resolveThickness(thickness, sizePx);
  const trackC = makeTrackColor(resolvedColor, trackColor, trackOpacity);

  const isHorizontal = labelPosition === "left" || labelPosition === "right";

  const ariaLabel =
    typeof label === "string" ? label : "Loading";

  const labelFontSize = Math.max(11, Math.round(sizePx / 3));
  const labelGap = Math.round(sizePx / 4);

  const graphic = (
    <SpinnerGraphic
      type={type}
      sizePx={sizePx}
      sw={sw}
      color={resolvedColor}
      trackC={trackC}
      dur={dur}
      easing={easing}
      paused={paused}
    />
  );

  const labelEl = label ? (
    <span
      style={{
        fontSize: labelFontSize,
        color: "var(--color-text-secondary, #888)",
        whiteSpace: "nowrap",
        lineHeight: 1.4,
        ...labelStyle,
      }}
    >
      {label}
    </span>
  ) : null;

  const content = (
    <div
      role={role}
      aria-label={ariaLabel}
      aria-live="polite"
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: "center",
        gap: labelEl ? labelGap : 0,
        ...styleProp,
      }}
    >
      {(labelPosition === "top" || labelPosition === "left") && labelEl}
      {graphic}
      {(labelPosition === "bottom" || labelPosition === "right") && labelEl}
    </div>
  );

  if (overlay) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: overlayColor,
          backdropFilter: overlayBlur ? "blur(4px)" : "none",
          WebkitBackdropFilter: overlayBlur ? "blur(4px)" : "none",
          zIndex: 10,
          borderRadius: "inherit",
        }}
        aria-busy="true"
      >
        {content}
      </div>
    );
  }

  return content;
}

export const InlineSpinner: React.FC<SpinnerProps> = (props) => (
  <Spinner type="ring" size="xs" {...props} />
);

export const PageSpinner: React.FC<SpinnerProps> = ({ label = "Loading…", color = "primary", type = "arc", ...props }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-background-primary, #fff)",
      zIndex: 9999,
    }}
  >
    <Spinner type={type} size="lg" color={color} label={label} labelPosition="bottom" {...props} />
  </div>
);

export const OverlaySpinner: React.FC<SpinnerProps> = (props) => (
  <Spinner overlay {...props} />
);

// We keep export Spinner as well so both styles work out of the box
export const CustomSpinner = Spinner;
