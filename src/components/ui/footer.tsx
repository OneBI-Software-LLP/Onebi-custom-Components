import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type FooterVariant = 'simple' | 'dark' | 'light' | 'gradient' | 'bordered' | 'minimal';
export type FooterColor = 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
export type FooterSize = 'sm' | 'md' | 'lg' | 'xl';
export type FooterLayout = 'horizontal' | 'grid' | 'centered' | 'stacked';

// ─────────────────────────────────────────────────────────────
//  VARIANT BUILDER
// ─────────────────────────────────────────────────────────────

const footerVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        simple: "border-b px-6 py-6",
        dark: "p-8",
        light: "border-b p-8 text-center",
        gradient: "p-8 text-white",
        bordered: "border-2 p-8",
        minimal: "py-4 px-6",
      },
      color: {
        default: "bg-slate-50 border-slate-200 text-slate-600",
        primary: "bg-indigo-600 border-indigo-700 text-white",
        secondary: "bg-slate-700 border-slate-800 text-slate-200",
        danger: "bg-red-600 border-red-700 text-white",
        success: "bg-green-600 border-green-700 text-white",
        warning: "bg-amber-600 border-amber-700 text-white",
        info: "bg-blue-600 border-blue-700 text-white",
      },
      layout: {
        horizontal: "flex flex-col md:flex-row items-center justify-between gap-4",
        grid: "grid grid-cols-2 md:grid-cols-4 gap-8",
        centered: "flex flex-col items-center text-center",
        stacked: "flex flex-col gap-6",
      },
      size: {
        sm: "py-3 text-xs",
        md: "py-6 text-sm",
        lg: "py-10 text-base",
        xl: "py-14 text-base",
      },
    },
    compoundVariants: [
      // Gradient + Color combinations
      { variant: "gradient", color: "primary", class: "bg-gradient-to-r from-indigo-600 to-purple-600" },
      { variant: "gradient", color: "secondary", class: "bg-gradient-to-r from-slate-600 to-slate-800" },
      { variant: "gradient", color: "danger", class: "bg-gradient-to-r from-red-600 to-rose-600" },
      { variant: "gradient", color: "success", class: "bg-gradient-to-r from-green-600 to-emerald-600" },
      { variant: "gradient", color: "warning", class: "bg-gradient-to-r from-amber-600 to-orange-600" },
      { variant: "gradient", color: "info", class: "bg-gradient-to-r from-blue-600 to-cyan-600" },
      { variant: "gradient", color: "default", class: "bg-gradient-to-r from-slate-600 to-slate-700" },

      // Dark + Color combinations
      { variant: "dark", color: "primary", class: "bg-indigo-950 text-indigo-100" },
      { variant: "dark", color: "secondary", class: "bg-slate-900 text-slate-300" },
      { variant: "dark", color: "danger", class: "bg-red-950 text-red-100" },
      { variant: "dark", color: "success", class: "bg-green-950 text-green-100" },
      { variant: "dark", color: "warning", class: "bg-amber-950 text-amber-100" },
      { variant: "dark", color: "info", class: "bg-blue-950 text-blue-100" },
      { variant: "dark", color: "default", class: "bg-slate-900 text-slate-300" },

      // Bordered + Color combinations
      { variant: "bordered", color: "primary", class: "border-indigo-300 bg-indigo-50 text-indigo-700" },
      { variant: "bordered", color: "secondary", class: "border-slate-300 bg-slate-50 text-slate-700" },
      { variant: "bordered", color: "danger", class: "border-red-300 bg-red-50 text-red-700" },
      { variant: "bordered", color: "success", class: "border-green-300 bg-green-50 text-green-700" },
      { variant: "bordered", color: "warning", class: "border-amber-300 bg-amber-50 text-amber-700" },
      { variant: "bordered", color: "info", class: "border-blue-300 bg-blue-50 text-blue-700" },
      { variant: "bordered", color: "default", class: "border-slate-300 bg-white text-slate-700" },

      // Link colors for light/colored backgrounds
      { variant: "light", color: "primary", class: "bg-white border-indigo-200" },
      { variant: "light", color: "secondary", class: "bg-white border-slate-200" },
      { variant: "light", color: "danger", class: "bg-white border-red-200" },
      { variant: "light", color: "success", class: "bg-white border-green-200" },
      { variant: "light", color: "warning", class: "bg-white border-amber-200" },
      { variant: "light", color: "info", class: "bg-white border-blue-200" },
      { variant: "light", color: "default", class: "bg-white border-slate-200" },

      { variant: "simple", color: "primary", class: "bg-indigo-50 border-indigo-200" },
      { variant: "simple", color: "secondary", class: "bg-slate-100 border-slate-200" },
      { variant: "simple", color: "danger", class: "bg-red-50 border-red-200" },
      { variant: "simple", color: "success", class: "bg-green-50 border-green-200" },
      { variant: "simple", color: "warning", class: "bg-amber-50 border-amber-200" },
      { variant: "simple", color: "info", class: "bg-blue-50 border-blue-200" },

      { variant: "minimal", color: "primary", class: "bg-indigo-50 text-indigo-700" },
      { variant: "minimal", color: "secondary", class: "bg-slate-100 text-slate-700" },
      { variant: "minimal", color: "danger", class: "bg-red-50 text-red-700" },
      { variant: "minimal", color: "success", class: "bg-green-50 text-green-700" },
      { variant: "minimal", color: "warning", class: "bg-amber-50 text-amber-700" },
      { variant: "minimal", color: "info", class: "bg-blue-50 text-blue-700" },
      { variant: "minimal", color: "default", class: "bg-transparent text-slate-600 border-t border-slate-200" },
    ],
    defaultVariants: {
      variant: "simple",
      color: "default",
      layout: "horizontal",
      size: "md",
    },
  }
);

// ─────────────────────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────────────────────

export interface FooterProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof footerVariants> {
  children: React.ReactNode;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, variant, color, layout, size, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(footerVariants({ 
          variant, 
          color: color as FooterColor, 
          layout, 
          size: size as FooterSize, 
          className 
        }))}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

Footer.displayName = "Footer";

// ─────────────────────────────────────────────────────────────
//  FOOTER SECTION
// ─────────────────────────────────────────────────────────────

export interface FooterSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FooterSection = React.forwardRef<HTMLDivElement, FooterSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

FooterSection.displayName = "FooterSection";

// ─────────────────────────────────────────────────────────────
//  LINK STYLES (color-aware)
// ─────────────────────────────────────────────────────────────

const linkStyles: Record<FooterColor, string> = {
  default: "text-slate-600 hover:text-slate-900",
  primary: "text-indigo-100 hover:text-white",
  secondary: "text-slate-200 hover:text-white",
  danger: "text-red-100 hover:text-white",
  success: "text-green-700 hover:text-green-900",
  warning: "text-amber-800 hover:text-amber-950",
  info: "text-blue-700 hover:text-blue-900",
};

// ─────────────────────────────────────────────────────────────
//  FOOTER BRAND
// ─────────────────────────────────────────────────────────────

export interface FooterBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  logo?: React.ReactNode;
  description?: string;
}

const FooterBrand = React.forwardRef<HTMLDivElement, FooterBrandProps>(
  ({ className, name, logo, description, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        <div className="flex items-center gap-3">
          {logo || (
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {name.charAt(0)}
            </div>
          )}
          <span className="font-bold">{name}</span>
        </div>
        {description && (
          <p className="text-sm leading-relaxed">{description}</p>
        )}
      </div>
    );
  }
);

FooterBrand.displayName = "FooterBrand";

// ─────────────────────────────────────────────────────────────
//  FOOTER LINKS
// ─────────────────────────────────────────────────────────────

export interface FooterLinksProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  links: Array<{ label: string; href: string }>;
  color?: FooterColor;
}

const FooterLinks = React.forwardRef<HTMLDivElement, FooterLinksProps>(
  ({ className, title, links, color = "default", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {title && (
          <h4 className="font-semibold text-sm">{title}</h4>
        )}
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className={cn("text-sm transition-colors", linkStyles[color])}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

FooterLinks.displayName = "FooterLinks";

// ─────────────────────────────────────────────────────────────
//  FOOTER SOCIAL
// ─────────────────────────────────────────────────────────────

const socialStyles: Record<FooterColor, string> = {
  default: "bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900",
  primary: "bg-white/20 hover:bg-white/30 text-white",
  secondary: "bg-white/10 hover:bg-white/20 text-slate-200",
  danger: "bg-white/20 hover:bg-white/30 text-white",
  success: "bg-green-200 hover:bg-green-300 text-green-700 hover:text-green-900",
  warning: "bg-amber-200 hover:bg-amber-300 text-amber-800 hover:text-amber-950",
  info: "bg-blue-200 hover:bg-blue-300 text-blue-700 hover:text-blue-900",
};

export interface FooterSocialProps
  extends React.HTMLAttributes<HTMLDivElement> {
  links: Array<{ icon: React.ReactNode; href: string; label?: string }>;
  color?: FooterColor;
}

const FooterSocial = React.forwardRef<HTMLDivElement, FooterSocialProps>(
  ({ className, links, color = "default", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex gap-3", className)} {...props}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={cn("p-2 rounded-lg transition-colors", socialStyles[color])}
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    );
  }
);

FooterSocial.displayName = "FooterSocial";

// ─────────────────────────────────────────────────────────────
//  EXPORTS
// ─────────────────────────────────────────────────────────────

export { Footer, FooterSection, FooterBrand, FooterLinks, FooterSocial };
