import { Command } from "commander";
import prompts from "prompts";
// @ts-ignore
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import { logger } from "../utils/logger.js";
import { fetchComponentFromRegistry } from "../utils/registry.js";
import { getMissingDependencies, installDependencies } from "../utils/install.js";

const fallbackRegistry: Record<string, any> = {
  button: {
    name: "button",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        name: "button.tsx",
        content: `import React from 'react';\n/* Import the local button styles */\nimport './button.css';\n\n// ─────────────────────────────────────────────────────────────\n//  TYPES\n// ─────────────────────────────────────────────────────────────\n\nexport type ButtonVariant =\n  | 'solid'\n  | 'outline'\n  | 'soft'\n  | 'ghost'\n  | 'link';\n\nexport type ButtonColor =\n  | 'primary'\n  | 'secondary'\n  | 'danger'\n  | 'success'\n  | 'warning'\n  | 'info';\n\nexport type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';\n\nexport type ButtonShape = 'default' | 'rounded' | 'square';\n\nexport interface ButtonProps\n  extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  /** Visual style family. Default: 'solid' */\n  variant?: ButtonVariant;\n\n  /** Color token. Default: 'primary' */\n  color?: ButtonColor;\n\n  /** Size preset. Default: 'md' */\n  size?: ButtonSize;\n\n  /** Border-radius shape. Default: 'default' (8px) */\n  shape?: ButtonShape;\n\n  /** Show animated loading spinner and disable the button */\n  loading?: boolean;\n\n  /** Text shown next to spinner while loading (falls back to children) */\n  loadingText?: string;\n\n  /** Icon rendered before the label */\n  iconLeft?: React.ReactNode;\n\n  /** Icon rendered after the label */\n  iconRight?: React.ReactNode;\n\n  /** When true, renders an icon-only square/circle button (no label shown) */\n  iconOnly?: boolean;\n\n  /** Stretch button to 100% width of its container */\n  fullWidth?: boolean;\n\n  /** Notification badge count. Shows a red dot with number over the button */\n  badge?: string | number;\n\n  /** Render as a different HTML element (e.g. 'a' for link buttons) */\n  as?: React.ElementType;\n\n  /** Extra CSS classes to merge in */\n  className?: string;\n\n  children?: React.ReactNode;\n}\n\n// ─────────────────────────────────────────────────────────────\n//  HELPER — build the CSS class string\n// ─────────────────────────────────────────────────────────────\n\n/**\n * Compatibility helper for existing components using shadcn/ui patterns.\n */\nexport function buttonVariants(props: any = {}): string {\n  const variant = props.variant;\n  const color = props.color;\n\n  const normalizedProps: ButtonProps = {\n    ...props,\n    // Map shadcn variants to new names\n    variant: (variant === 'default' ? 'solid' : \n              variant === 'destructive' ? 'solid' : \n              variant === 'ghost' ? 'ghost' : \n              variant === 'outline' ? 'outline' : \n              variant === 'secondary' ? 'solid' : \n              variant === 'link' ? 'link' : \n              variant) as ButtonVariant,\n    color: (variant === 'destructive' ? 'danger' : \n            variant === 'secondary' ? 'secondary' : \n            color || 'primary') as ButtonColor,\n  };\n  return buildClassName(normalizedProps);\n}\n\nfunction buildClassName(props: ButtonProps): string {\n  const {\n    variant  = 'solid',\n    color    = 'primary',\n    size     = 'md',\n    shape    = 'default',\n    iconOnly = false,\n    fullWidth= false,\n    className= '',\n  } = props;\n\n  const classes: string[] = ['btn'];\n\n  // size\n  classes.push(\`btn-\${size}\`);\n\n  // variant + color class\n  if (variant === 'solid') {\n    classes.push(\`btn-solid-\${color}\`);\n  } else if (variant === 'outline') {\n    classes.push(\`btn-outline-\${color}\`);\n  } else if (variant === 'soft') {\n    classes.push(\`btn-soft-\${color}\`);\n  } else if (variant === 'ghost') {\n    // ghost maps color to a sub-class; 'primary' uses 'default' to match HTML\n    const ghostColor = color === 'primary' ? 'default' : color;\n    classes.push(\`btn-ghost-\${ghostColor}\`);\n  } else if (variant === 'link') {\n    classes.push('btn-link');\n  }\n\n  // shape\n  if (shape === 'rounded') classes.push('btn-shape-rounded');\n  if (shape === 'square')  classes.push('btn-shape-square');\n\n  // modifiers\n  if (iconOnly)  classes.push('btn-icon-only');\n  if (fullWidth) classes.push('btn-full');\n\n  // consumer's own classes (escape hatch)\n  if (className) classes.push(className);\n\n  return classes.join(' ');\n}\n\n// ─────────────────────────────────────────────────────────────\n//  SPINNER\n// ─────────────────────────────────────────────────────────────\n\nfunction Spinner() {\n  return <span className="btn-spinner" aria-hidden="true" />;\n}\n\n// ─────────────────────────────────────────────────────────────\n//  BUTTON\n// ─────────────────────────────────────────────────────────────\n\n/**\n * Button — fully composable, zero-dependency button component.\n */\nconst Button = React.forwardRef<HTMLButtonElement, ButtonProps>(\n  (props, ref) => {\n    const {\n      variant      = 'solid',\n      color        = 'primary',\n      size         = 'md',\n      shape        = 'default',\n      loading      = false,\n      loadingText,\n      iconLeft,\n      iconRight,\n      iconOnly     = false,\n      fullWidth    = false,\n      badge,\n      as           : Tag = 'button',\n      className,\n      children,\n      disabled,\n      onClick,\n      ...rest\n    } = props;\n\n    const isDisabled = disabled || loading;\n    const cssClass   = buildClassName({ variant, color, size, shape, iconOnly, fullWidth, className });\n\n    // What renders inside the button\n    function renderContent() {\n      if (loading) {\n        return (\n          <>\n            <Spinner />\n            {!iconOnly && (loadingText ?? children)}\n          </>\n        );\n      }\n\n      if (iconOnly) {\n        // icon-only: render iconLeft (or iconRight as fallback), no label\n        return iconLeft ?? iconRight ?? null;\n      }\n\n      return (\n        <>\n          {iconLeft  && <span className="btn-icon-wrap" aria-hidden="true">{iconLeft}</span>}\n          {children}\n          {iconRight && <span className="btn-icon-wrap" aria-hidden="true">{iconRight}</span>}\n        </>\n      );\n    }\n\n    const button = (\n      <Tag\n        ref={ref}\n        className={cssClass}\n        disabled={Tag === 'button' ? isDisabled : undefined}\n        aria-disabled={isDisabled ? 'true' : undefined}\n        onClick={isDisabled ? undefined : onClick}\n        {...rest}\n      >\n        {renderContent()}\n      </Tag>\n    );\n\n    // Wrap with badge container only when badge prop is provided\n    if (badge !== undefined && badge !== null) {\n      return (\n        <span className="btn-badge-wrap">\n          {button}\n          <span className="btn-badge">{badge}</span>\n        </span>\n      );\n    }\n\n    return button;\n  }\n);\n\nButton.displayName = 'Button';\n\n// ─────────────────────────────────────────────────────────────\n//  BUTTON GROUP\n// ─────────────────────────────────────────────────────────────\n\nexport interface ButtonGroupProps {\n  children: React.ReactNode;\n  className?: string;\n}\n\nfunction ButtonGroup({ children, className = '' }: ButtonGroupProps) {\n  return (\n    <div className={\`btn-group \${className}\`.trim()}>\n      {children}\n    </div>\n  );\n}\n\n// ─────────────────────────────────────────────────────────────\n//  BUTTON GROUP ITEM\n// ─────────────────────────────────────────────────────────────\n\nexport interface ButtonGroupItemProps\n  extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  active?: boolean;\n  size?  : ButtonSize;\n  children?: React.ReactNode;\n}\n\nfunction ButtonGroupItem({\n  active = false,\n  size   = 'md',\n  className = '',\n  children,\n  ...rest\n}: ButtonGroupItemProps) {\n  const classes = [\n    'btn',\n    \`btn-\${size}\`,\n    'btn-solid-secondary',\n    active ? 'btn-group-active' : '',\n    className,\n  ]\n    .filter(Boolean)\n    .join(' ');\n\n  return (\n    <button className={classes} {...rest}>\n      {children}\n    </button>\n  );\n}\n\nexport { Button, ButtonGroup, ButtonGroupItem };\nexport default Button;\n`
      },
      {
        name: "button.css",
        content: `/* ============================================================\n   Button.css — All button styles\n   Import this once at the top of your app (e.g. in main.tsx\n   or App.tsx):  import './Button.css'\n   ============================================================ */\n\n/* ── CSS TOKENS ─────────────────────────────────────────── */\n:root {\n  --btn-font-family    : -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n  --btn-font-weight    : 500;\n  --btn-transition     : all 0.15s ease;\n  --btn-focus-shadow   : 0 0 0 3px;\n\n  /* radius scale */\n  --btn-radius-default : 8px;\n  --btn-radius-pill    : 999px;\n  --btn-radius-square  : 4px;\n\n  /* solid colors */\n  --color-primary      : #1a1a1a;\n  --color-primary-hover: #333333;\n  --color-danger       : #dc2626;\n  --color-danger-hover : #b91c1c;\n  --color-success      : #16a34a;\n  --color-success-hover: #15803d;\n  --color-warning      : #d97706;\n  --color-warning-hover: #b45309;\n  --color-info         : #2563eb;\n  --color-info-hover   : #1d4ed8;\n\n  /* focus rings */\n  --ring-primary       : rgba(0, 0, 0, 0.25);\n  --ring-danger        : rgba(220, 38, 38, 0.35);\n  --ring-success       : rgba(22, 163, 74, 0.35);\n  --ring-warning       : rgba(217, 119, 6, 0.35);\n  --ring-info          : rgba(37, 99, 235, 0.35);\n\n  /* surface / neutral */\n  --color-surface      : #f3f4f6;\n  --color-surface-hover: #e5e7eb;\n  --color-border       : #d1d5db;\n  --color-text         : #111827;\n  --color-text-muted   : #6b7280;\n}\n\n\n/* ── BASE ────────────────────────────────────────────────── */\n.btn {\n  display         : inline-flex;\n  align-items     : center;\n  justify-content : center;\n  gap             : 6px;\n  height          : 38px;\n  padding         : 0 16px;\n  font-family     : var(--btn-font-family);\n  font-size       : 14px;\n  font-weight     : var(--btn-font-weight);\n  line-height     : 1;\n  white-space     : nowrap;\n  border          : 1px solid transparent;\n  border-radius   : var(--btn-radius-default);\n  cursor          : pointer;\n  outline         : none;\n  text-decoration : none;\n  position        : relative;\n  overflow        : visible;\n  transition      : var(--btn-transition);\n  -webkit-user-select: none;\n  user-select     : none;\n  box-sizing      : border-box;\n}\n\n.btn:focus-visible {\n  box-shadow: var(--btn-focus-shadow) var(--_ring, var(--ring-primary));\n}\n\n.btn:active:not(:disabled) {\n  transform: scale(0.97);\n}\n\n.btn:disabled,\n.btn[aria-disabled="true"] {\n  opacity        : 0.45;\n  cursor         : not-allowed;\n  pointer-events : none;\n}\n\n.btn svg {\n  flex-shrink: 0;\n  display    : block;\n}\n\n\n/* ── SIZES ───────────────────────────────────────────────── */\n.btn-xs {\n  height       : 26px;\n  padding      : 0 10px;\n  font-size    : 12px;\n  border-radius: var(--btn-radius-square);\n  gap          : 4px;\n}\n\n.btn-sm {\n  height   : 32px;\n  padding  : 0 12px;\n  font-size: 13px;\n}\n\n.btn-md {\n  height   : 38px;\n  padding  : 0 16px;\n  font-size: 14px;\n}\n\n.btn-lg {\n  height   : 44px;\n  padding  : 0 20px;\n  font-size: 15px;\n  gap      : 8px;\n}\n\n.btn-xl {\n  height   : 52px;\n  padding  : 0 28px;\n  font-size: 16px;\n  gap      : 10px;\n}\n\n\n/* ── SHAPES ──────────────────────────────────────────────── */\n.btn-shape-rounded { border-radius: var(--btn-radius-pill) !important; }\n.btn-shape-square  { border-radius: var(--btn-radius-square) !important; }\n\n\n/* ── ICON-ONLY ───────────────────────────────────────────── */\n.btn-icon-only         { padding: 0 !important; }\n.btn-icon-only.btn-xs  { width: 26px; }\n.btn-icon-only.btn-sm  { width: 32px; }\n.btn-icon-only.btn-md  { width: 38px; }\n.btn-icon-only.btn-lg  { width: 44px; }\n.btn-icon-only.btn-xl  { width: 52px; }\n\n\n/* ── FULL WIDTH ──────────────────────────────────────────── */\n.btn-full { width: 100%; }\n\n\n/* ══════════════════════════════════════════════════════════\n   SOLID VARIANTS\n══════════════════════════════════════════════════════════ */\n\n.btn-solid-primary {\n  background  : var(--color-primary);\n  color       : #ffffff;\n  border-color: var(--color-primary);\n  --_ring     : var(--ring-primary);\n}\n.btn-solid-primary:hover:not(:disabled) {\n  background  : var(--color-primary-hover);\n  border-color: var(--color-primary-hover);\n}\n\n.btn-solid-secondary {\n  background  : var(--color-surface);\n  color       : var(--color-text);\n  border-color: var(--color-border);\n  --_ring     : var(--ring-primary);\n}\n.btn-solid-secondary:hover:not(:disabled) {\n  background: var(--color-surface-hover);\n}\n\n.btn-solid-danger {\n  background  : var(--color-danger);\n  color       : #ffffff;\n  border-color: var(--color-danger);\n  --_ring     : var(--ring-danger);\n}\n.btn-solid-danger:hover:not(:disabled) {\n  background  : var(--color-danger-hover);\n  border-color: var(--color-danger-hover);\n}\n\n.btn-solid-success {\n  background  : var(--color-success);\n  color       : #ffffff;\n  border-color: var(--color-success);\n  --_ring     : var(--ring-success);\n}\n.btn-solid-success:hover:not(:disabled) {\n  background  : var(--color-success-hover);\n  border-color: var(--color-success-hover);\n}\n\n.btn-solid-warning {\n  background  : var(--color-warning);\n  color       : #ffffff;\n  border-color: var(--color-warning);\n  --_ring     : var(--ring-warning);\n}\n.btn-solid-warning:hover:not(:disabled) {\n  background  : var(--color-warning-hover);\n  border-color: var(--color-warning-hover);\n}\n\n.btn-solid-info {\n  background  : var(--color-info);\n  color       : #ffffff;\n  border-color: var(--color-info);\n  --_ring     : var(--ring-info);\n}\n.btn-solid-info:hover:not(:disabled) {\n  background  : var(--color-info-hover);\n  border-color: var(--color-info-hover);\n}\n\n\n/* ══════════════════════════════════════════════════════════\n   OUTLINE VARIANTS\n══════════════════════════════════════════════════════════ */\n\n.btn-outline-primary {\n  background  : transparent;\n  color       : var(--color-primary);\n  border-color: var(--color-primary);\n  --_ring     : var(--ring-primary);\n}\n.btn-outline-primary:hover:not(:disabled) {\n  background: rgba(0, 0, 0, 0.06);\n}\n\n.btn-outline-secondary {\n  background  : transparent;\n  color       : var(--color-text);\n  border-color: var(--color-border);\n  --_ring     : var(--ring-primary);\n}\n.btn-outline-secondary:hover:not(:disabled) {\n  background: var(--color-surface);\n}\n\n.btn-outline-danger {\n  background  : transparent;\n  color       : var(--color-danger);\n  border-color: var(--color-danger);\n  --_ring     : var(--ring-danger);\n}\n.btn-outline-danger:hover:not(:disabled) {\n  background: rgba(220, 38, 38, 0.06);\n}\n\n.btn-outline-success {\n  background  : transparent;\n  color       : var(--color-success);\n  border-color: var(--color-success);\n  --_ring     : var(--ring-success);\n}\n.btn-outline-success:hover:not(:disabled) {\n  background: rgba(22, 163, 74, 0.06);\n}\n\n.btn-outline-warning {\n  background  : transparent;\n  color       : var(--color-warning);\n  border-color: var(--color-warning);\n  --_ring     : var(--ring-warning);\n}\n.btn-outline-warning:hover:not(:disabled) {\n  background: rgba(217, 119, 6, 0.06);\n}\n\n.btn-outline-info {\n  background  : transparent;\n  color       : var(--color-info);\n  border-color: var(--color-info);\n  --_ring     : var(--ring-info);\n}\n.btn-outline-info:hover:not(:disabled) {\n  background: rgba(37, 99, 235, 0.06);\n}\n\n\n/* ══════════════════════════════════════════════════════════\n   SOFT VARIANTS\n══════════════════════════════════════════════════════════ */\n\n.btn-soft-primary {\n  background  : rgba(0, 0, 0, 0.07);\n  color       : var(--color-primary);\n  border-color: transparent;\n}\n.btn-soft-primary:hover:not(:disabled) { background: rgba(0, 0, 0, 0.12); }\n\n.btn-soft-secondary {\n  background  : var(--color-surface);\n  color       : var(--color-text-muted);\n  border-color: transparent;\n}\n.btn-soft-secondary:hover:not(:disabled) { background: var(--color-surface-hover); }\n\n.btn-soft-danger {\n  background  : rgba(220, 38, 38, 0.10);\n  color       : var(--color-danger-hover);\n  border-color: transparent;\n  --_ring     : var(--ring-danger);\n}\n.btn-soft-danger:hover:not(:disabled) { background: rgba(220, 38, 38, 0.16); }\n\n.btn-soft-success {\n  background  : rgba(22, 163, 74, 0.10);\n  color       : var(--color-success-hover);\n  border-color: transparent;\n  --_ring     : var(--ring-success);\n}\n.btn-soft-success:hover:not(:disabled) { background: rgba(22, 163, 74, 0.16); }\n\n.btn-soft-warning {\n  background  : rgba(217, 119, 6, 0.10);\n  color       : var(--color-warning-hover);\n  border-color: transparent;\n  --_ring     : var(--ring-warning);\n}\n.btn-soft-warning:hover:not(:disabled) { background: rgba(217, 119, 6, 0.16); }\n\n.btn-soft-info {\n  background  : rgba(37, 99, 235, 0.10);\n  color       : var(--color-info-hover);\n  border-color: transparent;\n  --_ring     : var(--ring-info);\n}\n.btn-soft-info:hover:not(:disabled) { background: rgba(37, 99, 235, 0.18); }\n\n\n/* ══════════════════════════════════════════════════════════\n   GHOST VARIANTS\n══════════════════════════════════════════════════════════ */\n\n.btn-ghost-default {\n  background  : transparent;\n  color       : var(--color-text);\n  border-color: transparent;\n}\n.btn-ghost-default:hover:not(:disabled) { background: var(--color-surface); }\n\n.btn-ghost-primary {\n  background  : transparent;\n  color       : var(--color-primary);\n  border-color: transparent;\n  --_ring     : var(--ring-primary);\n}\n.btn-ghost-primary:hover:not(:disabled) { background: rgba(0, 0, 0, 0.06); }\n\n.btn-ghost-danger {\n  background  : transparent;\n  color       : var(--color-danger);\n  border-color: transparent;\n  --_ring     : var(--ring-danger);\n}\n.btn-ghost-danger:hover:not(:disabled) { background: rgba(220, 38, 38, 0.06); }\n\n.btn-ghost-info {\n  background  : transparent;\n  color       : var(--color-info);\n  border-color: transparent;\n  --_ring     : var(--ring-info);\n}\n.btn-ghost-info:hover:not(:disabled) { background: rgba(37, 99, 235, 0.06); }\n\n.btn-ghost-success {\n  background  : transparent;\n  color       : var(--color-success);\n  border-color: transparent;\n  --_ring     : var(--ring-success);\n}\n.btn-ghost-success:hover:not(:disabled) { background: rgba(22, 163, 74, 0.06); }\n\n\n/* ══════════════════════════════════════════════════════════\n   LINK VARIANT\n══════════════════════════════════════════════════════════ */\n\n.btn-link {\n  background           : transparent;\n  border-color         : transparent;\n  color                : var(--color-info);\n  padding              : 0 4px;\n  height               : auto;\n  text-decoration      : underline;\n  text-underline-offset: 2px;\n  --_ring              : var(--ring-info);\n}\n.btn-link:hover:not(:disabled) {\n  color          : var(--color-info-hover);\n  text-decoration: underline;\n}\n\n\n/* ══════════════════════════════════════════════════════════\n   LOADING SPINNER\n══════════════════════════════════════════════════════════ */\n\n.btn-spinner {\n  display      : inline-block;\n  width        : 14px;\n  height       : 14px;\n  border       : 2px solid currentColor;\n  border-top-color: transparent;\n  border-radius: 50%;\n  animation    : btn-spin 0.7s linear infinite;\n  flex-shrink  : 0;\n}\n\n@keyframes btn-spin {\n  to { transform: rotate(360deg); }\n}\n\n\n/* ══════════════════════════════════════════════════════════\n   BADGE\n══════════════════════════════════════════════════════════ */\n\n.btn-badge-wrap {\n  position: relative;\n  display : inline-flex;\n}\n\n.btn-badge {\n  position        : absolute;\n  top             : -6px;\n  right           : -6px;\n  background      : var(--color-danger);\n  color           : #ffffff;\n  font-size       : 10px;\n  font-weight     : 600;\n  font-family     : var(--btn-font-family);\n  border-radius   : 999px;\n  min-width       : 17px;\n  height          : 17px;\n  padding         : 0 4px;\n  display         : flex;\n  align-items     : center;\n  justify-content : center;\n  line-height     : 1;\n  border          : 2px solid #ffffff;\n  pointer-events  : none;\n}\n\n\n/* ══════════════════════════════════════════════════════════\n   BUTTON GROUP\n══════════════════════════════════════════════════════════ */\n\n.btn-group {\n  display      : inline-flex;\n  border       : 1px solid var(--color-border);\n  border-radius: var(--btn-radius-default);\n  overflow     : hidden;\n}\n\n.btn-group .btn {\n  border-radius: 0;\n  border       : none;\n  border-right : 1px solid var(--color-border);\n}\n\n.btn-group .btn:last-child {\n  border-right: none;\n}\n\n.btn-group .btn.btn-group-active {\n  background: var(--color-primary);\n  color     : #ffffff;\n}\n\n\n/* ══════════════════════════════════════════════════════════\n   DARK MODE\n══════════════════════════════════════════════════════════ */\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --color-primary      : #f9fafb;\n    --color-primary-hover: #e5e7eb;\n    --color-surface      : #1f2937;\n    --color-surface-hover: #374151;\n    --color-border       : #374151;\n    --color-text         : #f9fafb;\n    --color-text-muted   : #9ca3af;\n    --ring-primary       : rgba(249, 250, 251, 0.25);\n  }\n\n  .btn-solid-primary { color: #111827; }\n\n  .btn-soft-primary {\n    background: rgba(255, 255, 255, 0.08);\n    color     : #f9fafb;\n  }\n  .btn-soft-primary:hover:not(:disabled) { background: rgba(255, 255, 255, 0.14); }\n\n  .btn-badge { border-color: #111827; }\n}\n`
      }
    ]
  }
};

export const addCommand = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("[components...]", "the components to add")
  .action(async (components: string[]) => {
    try {
      const configPath = path.resolve(process.cwd(), "onebi.config.json");
      if (!fs.existsSync(configPath)) {
        logger.error("Configuration file not found. Please run init first.");
        process.exit(1);
      }

      const config = JSON.parse(await fs.readFile(configPath, "utf8"));
      let componentsToAdd = components;
      
      if (!componentsToAdd || componentsToAdd.length === 0) {
        const response = await prompts({
          type: "text",
          name: "component",
          message: "Which component would you like to add? (e.g. button)"
        });
        
        if (!response.component) {
           logger.warn("No component selected. Exiting.");
           process.exit(0);
        }
        componentsToAdd = [response.component];
      }

      for (const component of componentsToAdd) {
        logger.break();
        const spinner = ora(`Fetching component '${component}'...`).start();

        let registryComponent = await fetchComponentFromRegistry(component);
        if (!registryComponent) {
          if (fallbackRegistry[component]) {
            registryComponent = fallbackRegistry[component];
          } else {
            spinner.fail(`Component '${component}' not found in registry.`);
            continue;
          }
        }
        spinner.succeed(`Found '${component}'`);

        // Handle NPM Dependencies
        const missingDeps = getMissingDependencies(registryComponent!.dependencies || []);
        if (missingDeps.length > 0) {
           const depSpinner = ora(`Installing dependencies: ${missingDeps.join(", ")}...`).start();
           installDependencies(missingDeps);
           depSpinner.succeed("Dependencies installed.");
        }

        // Install registry dependencies (Recursive)
        if (registryComponent!.registryDependencies && registryComponent!.registryDependencies.length > 0) {
          const regDeps = registryComponent!.registryDependencies;
          logger.info(`Recursively adding registry dependencies: ${regDeps.join(", ")}`);
          for (const rx of regDeps) {
             execSync(`npx onebi-ui add ${rx}`, { stdio: "inherit" });
          }
        }

        // Write files
        const writeSpinner = ora(`Writing files for '${component}'...`).start();
        fs.ensureDirSync(path.resolve(process.cwd(), config.componentsPath));

        const isTS = config.typescript;

        for (const file of registryComponent!.files) {
          let fileName = file.name;
          if (!isTS && fileName.endsWith(".tsx")) {
             fileName = fileName.replace(".tsx", ".jsx");
          } else if (!isTS && fileName.endsWith(".ts")) {
             fileName = fileName.replace(".ts", ".js");
          }

          let targetPath = path.resolve(process.cwd(), config.componentsPath, fileName);
          
          if (fileName.endsWith(".css")) {
            const stylesDir = path.resolve(process.cwd(), config.componentsPath, "styles");
            fs.ensureDirSync(stylesDir);
            targetPath = path.join(stylesDir, fileName);
          }

          if (fs.existsSync(targetPath)) {
            logger.warn(`\nFile ${fileName} already exists. Overwriting.`);
          }

          await fs.writeFile(targetPath, file.content, "utf8");
          
          try {
            execSync(`npx prettier --write "${targetPath}"`, { stdio: "ignore" });
          } catch(e) {}
        }

        writeSpinner.succeed(`Successfully added ${component} to ${config.componentsPath}`);
      }
    } catch (error) {
      logger.error("\nAn error occurred while adding the component.");
      console.error(error);
      process.exit(1);
    }
  });
