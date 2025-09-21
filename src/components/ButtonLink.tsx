import React from 'react';
import { Link, type LinkProps } from '../router/RouterProvider';
import clsx from 'clsx';

interface ButtonLinkProps extends LinkProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<NonNullable<ButtonLinkProps['variant']>, string> = {
  primary: 'bg-white text-black hover:bg-brand.light hover:text-brand-accent shadow-lg',
  secondary: 'bg-brand.accent text-white hover:bg-white/10 border border-white/20',
  ghost: 'bg-transparent text-white hover:bg-white/10'
};

const sizeStyles: Record<NonNullable<ButtonLinkProps['size']>, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm md:text-base'
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => (
  <Link
    {...props}
    className={clsx(
      'inline-flex items-center justify-center rounded-full transition-all font-semibold tracking-wide uppercase',
      variantStyles[variant],
      sizeStyles[size],
      className
    )}
  >
    {children}
  </Link>
);
