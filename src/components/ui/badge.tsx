import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export interface CustomBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The content of the badge */
  children?: React.ReactNode;
  /** The visual style */
  variant?: 'solid' | 'subtle' | 'outline';
  /** The semantic meaning/color */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  /** The size of the badge */
  size?: 'sm' | 'md' | 'lg';
  /** The geometry */
  shape?: 'pill' | 'rounded' | 'square';
  /** If true, renders as a small dot without text */
  isDot?: boolean;
  /** Use this to position the badge over another element */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'none';
  /** Additional custom classes */
  className?: string;
}

const sizeClasses = {
  sm: 'text-[10px] px-1.5 py-0.5 min-h-[1.25rem] min-w-[1.25rem]',
  md: 'text-xs px-2 py-0.5 min-h-[1.5rem] min-w-[1.5rem]',
  lg: 'text-sm px-2.5 py-1 min-h-[1.75rem] min-w-[1.75rem]',
};

const dotSizeClasses = {
  sm: 'w-2 h-2 p-0',
  md: 'w-2.5 h-2.5 p-0',
  lg: 'w-3 h-3 p-0',
};

const shapeClasses = {
  pill: 'rounded-full',
  rounded: 'rounded-md',
  square: 'rounded-none',
};

const positionClasses = {
  'top-right': 'absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
  'top-left': 'absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2',
  'bottom-right': 'absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2',
  'bottom-left': 'absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2',
  'none': 'relative inline-flex',
};

const colorVariantClasses = {
  solid: {
    primary: 'bg-indigo-600 text-white border-transparent shadow-sm shadow-indigo-100',
    success: 'bg-emerald-600 text-white border-transparent shadow-sm shadow-emerald-100',
    warning: 'bg-amber-500 text-white border-transparent shadow-sm shadow-amber-100',
    danger: 'bg-rose-600 text-white border-transparent shadow-sm shadow-rose-100',
    neutral: 'bg-slate-700 text-white border-transparent shadow-sm shadow-slate-100',
  },
  subtle: {
    primary: 'bg-indigo-50 text-indigo-700 border-transparent',
    success: 'bg-emerald-50 text-emerald-800 border-transparent',
    warning: 'bg-amber-50/80 text-amber-800 border-transparent',
    danger: 'bg-rose-50 text-rose-800 border-transparent',
    neutral: 'bg-slate-100 text-slate-800 border-transparent',
  },
  outline: {
    primary: 'bg-transparent text-indigo-700 border-indigo-200',
    success: 'bg-transparent text-emerald-700 border-emerald-200',
    warning: 'bg-transparent text-amber-700 border-amber-200',
    danger: 'bg-transparent text-rose-700 border-rose-200',
    neutral: 'bg-transparent text-slate-700 border-slate-200',
  },
};

export const CustomBadge: React.FC<CustomBadgeProps> = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  shape = 'pill',
  isDot = false,
  position = 'none',
  className = '',
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold tracking-tight leading-none whitespace-nowrap z-10 shrink-0 border transition-all duration-200";
  
  const currentSize = isDot ? dotSizeClasses[size] : sizeClasses[size];
  const currentShape = isDot ? 'rounded-full' : shapeClasses[shape];
  const currentPosition = positionClasses[position];
  const currentColorStyle = colorVariantClasses[variant]?.[color] || colorVariantClasses.solid.primary;

  return (
    <span
      className={cn(
        baseClasses,
        currentSize,
        currentShape,
        currentPosition,
        currentColorStyle,
        className
      )}
      {...props}
    >
      {!isDot && children}
    </span>
  );
};

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: any;
  size?: any;
  shape?: any;
  isDot?: boolean;
  position?: any;
}

function Badge({ className, variant, color, size, shape, isDot, position, children, ...props }: BadgeProps) {
  const v = variant as string | null | undefined;
  if (color || isDot || shape || (size && size !== 'default') || v === 'solid' || v === 'subtle') {
    return (
      <CustomBadge
        variant={v as any}
        color={color}
        size={size}
        shape={shape}
        isDot={isDot}
        position={position}
        className={className}
        {...(props as any)}
      >
        {children}
      </CustomBadge>
    );
  }
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export { Badge, badgeVariants };
export default CustomBadge;
