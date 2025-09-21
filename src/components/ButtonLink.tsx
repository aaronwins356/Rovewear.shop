import { ForwardedRef, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ButtonSize, ButtonVariant, buttonStyles } from './Button';

export interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => (
    <Link ref={ref} {...props} className={buttonStyles(variant, size, className)} />
  ),
);

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
