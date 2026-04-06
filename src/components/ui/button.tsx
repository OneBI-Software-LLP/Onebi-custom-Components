import React from 'react';
/* Import the local button styles */
import '@/styles/ui/button.css';

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type ButtonVariant =
  | 'solid'
  | 'outline'
  | 'soft'
  | 'ghost'
  | 'link';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonShape = 'default' | 'rounded' | 'square';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style family. Default: 'solid' */
  variant?: ButtonVariant;

  /** Color token. Default: 'primary' */
  color?: ButtonColor;

  /** Size preset. Default: 'md' */
  size?: ButtonSize;

  /** Border-radius shape. Default: 'default' (8px) */
  shape?: ButtonShape;

  /** Show animated loading spinner and disable the button */
  loading?: boolean;

  /** Text shown next to spinner while loading (falls back to children) */
  loadingText?: string;

  /** Icon rendered before the label */
  iconLeft?: React.ReactNode;

  /** Icon rendered after the label */
  iconRight?: React.ReactNode;

  /** When true, renders an icon-only square/circle button (no label shown) */
  iconOnly?: boolean;

  /** Stretch button to 100% width of its container */
  fullWidth?: boolean;

  /** Notification badge count. Shows a red dot with number over the button */
  badge?: string | number;

  /** Render as a different HTML element (e.g. 'a' for link buttons) */
  as?: React.ElementType;

  /** Extra CSS classes to merge in */
  className?: string;

  children?: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────
//  HELPER — build the CSS class string
// ─────────────────────────────────────────────────────────────

/**
 * Compatibility helper for existing components using shadcn/ui patterns.
 */
export function buttonVariants(props: any = {}): string {
  const variant = props.variant;
  const color = props.color;

  const normalizedProps: ButtonProps = {
    ...props,
    // Map shadcn variants to new names
    variant: (variant === 'default' ? 'solid' : 
              variant === 'destructive' ? 'solid' : 
              variant === 'ghost' ? 'ghost' : 
              variant === 'outline' ? 'outline' : 
              variant === 'secondary' ? 'solid' : 
              variant === 'link' ? 'link' : 
              variant) as ButtonVariant,
    color: (variant === 'destructive' ? 'danger' : 
            variant === 'secondary' ? 'secondary' : 
            color || 'primary') as ButtonColor,
  };
  return buildClassName(normalizedProps);
}

function buildClassName(props: ButtonProps): string {
  const {
    variant  = 'solid',
    color    = 'primary',
    size     = 'md',
    shape    = 'default',
    iconOnly = false,
    fullWidth= false,
    className= '',
  } = props;

  const classes: string[] = ['btn'];

  // size
  classes.push(`btn-${size}`);

  // variant + color class
  if (variant === 'solid') {
    classes.push(`btn-solid-${color}`);
  } else if (variant === 'outline') {
    classes.push(`btn-outline-${color}`);
  } else if (variant === 'soft') {
    classes.push(`btn-soft-${color}`);
  } else if (variant === 'ghost') {
    // ghost maps color to a sub-class; 'primary' uses 'default' to match HTML
    const ghostColor = color === 'primary' ? 'default' : color;
    classes.push(`btn-ghost-${ghostColor}`);
  } else if (variant === 'link') {
    classes.push('btn-link');
  }

  // shape
  if (shape === 'rounded') classes.push('btn-shape-rounded');
  if (shape === 'square')  classes.push('btn-shape-square');

  // modifiers
  if (iconOnly)  classes.push('btn-icon-only');
  if (fullWidth) classes.push('btn-full');

  // consumer's own classes (escape hatch)
  if (className) classes.push(className);

  return classes.join(' ');
}

// ─────────────────────────────────────────────────────────────
//  SPINNER
// ─────────────────────────────────────────────────────────────

function Spinner() {
  return <span className="btn-spinner" aria-hidden="true" />;
}

// ─────────────────────────────────────────────────────────────
//  BUTTON
// ─────────────────────────────────────────────────────────────

/**
 * Button — fully composable, zero-dependency button component.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant      = 'solid',
      color        = 'primary',
      size         = 'md',
      shape        = 'default',
      loading      = false,
      loadingText,
      iconLeft,
      iconRight,
      iconOnly     = false,
      fullWidth    = false,
      badge,
      as           : Tag = 'button',
      className,
      children,
      disabled,
      onClick,
      ...rest
    } = props;

    const isDisabled = disabled || loading;
    const cssClass   = buildClassName({ variant, color, size, shape, iconOnly, fullWidth, className });

    // What renders inside the button
    function renderContent() {
      if (loading) {
        return (
          <>
            <Spinner />
            {!iconOnly && (loadingText ?? children)}
          </>
        );
      }

      if (iconOnly) {
        // icon-only: render iconLeft (or iconRight as fallback), no label
        return iconLeft ?? iconRight ?? null;
      }

      return (
        <>
          {iconLeft  && <span className="btn-icon-wrap" aria-hidden="true">{iconLeft}</span>}
          {children}
          {iconRight && <span className="btn-icon-wrap" aria-hidden="true">{iconRight}</span>}
        </>
      );
    }

    const button = (
      <Tag
        ref={ref}
        className={cssClass}
        disabled={Tag === 'button' ? isDisabled : undefined}
        aria-disabled={isDisabled ? 'true' : undefined}
        onClick={isDisabled ? undefined : onClick}
        {...rest}
      >
        {renderContent()}
      </Tag>
    );

    // Wrap with badge container only when badge prop is provided
    if (badge !== undefined && badge !== null) {
      return (
        <span className="btn-badge-wrap">
          {button}
          <span className="btn-badge">{badge}</span>
        </span>
      );
    }

    return button;
  }
);

Button.displayName = 'Button';

// ─────────────────────────────────────────────────────────────
//  BUTTON GROUP
// ─────────────────────────────────────────────────────────────

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

function ButtonGroup({ children, className = '' }: ButtonGroupProps) {
  return (
    <div className={`btn-group ${className}`.trim()}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  BUTTON GROUP ITEM
// ─────────────────────────────────────────────────────────────

export interface ButtonGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  size?  : ButtonSize;
  children?: React.ReactNode;
}

function ButtonGroupItem({
  active = false,
  size   = 'md',
  className = '',
  children,
  ...rest
}: ButtonGroupItemProps) {
  const classes = [
    'btn',
    `btn-${size}`,
    'btn-solid-secondary',
    active ? 'btn-group-active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export { Button, ButtonGroup, ButtonGroupItem };
export default Button;
