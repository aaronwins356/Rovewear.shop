"use client";

import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-slate-200 focus-visible:outline-white/80 focus-visible:ring-2 focus-visible:ring-white/60",
  secondary:
    "border border-white/30 text-white hover:border-white/60 focus-visible:outline-white/80 focus-visible:ring-2 focus-visible:ring-white/40",
  ghost:
    "text-white hover:text-slate-200 focus-visible:outline-white/80 focus-visible:ring-2 focus-visible:ring-white/40",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.35em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type={type}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    />
  ),
);

Button.displayName = "Button";

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {
  variant?: Variant;
  size?: Size;
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {children}
    </Link>
  );
}
