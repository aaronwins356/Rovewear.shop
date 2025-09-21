import React from 'react';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const baseStyles = 'inline-flex items-center justify-center rounded-full transition-all font-semibold tracking-wide uppercase';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-white text-black hover:bg-brand.light hover:text-brand-accent shadow-lg',
  secondary: 'bg-brand.accent text-white hover:bg-white/10 border border-white/20',
  ghost: 'bg-transparent text-white hover:bg-white/10'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm md:text-base'
};

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', loading = false, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className, {
        'cursor-not-allowed opacity-70': disabled || loading
      })}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </motion.button>
  )
);

Button.displayName = 'Button';
