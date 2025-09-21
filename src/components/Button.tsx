import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const buttonStyles = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.3em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-700',
    secondary: 'bg-slate-900/10 text-neutral-900 hover:bg-slate-900/20',
    outline: 'border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white',
    ghost: 'text-neutral-500 hover:text-neutral-900',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-[0.6rem]',
    md: 'px-5 py-3 text-[0.65rem]',
    lg: 'px-6 py-3.5 text-[0.7rem]',
  };

  return cn(base, variants[variant], sizes[size], className);
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => (
    <button ref={ref} type={type} className={buttonStyles(variant, size, className)} {...props} />
  ),
);

Button.displayName = 'Button';

export default Button;
