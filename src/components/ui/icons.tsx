import type { SVGProps } from "react";

export function ShoppingBagIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M6 7h12l-1 12H7L6 7z" />
      <path d="M9 10a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <circle cx={11} cy={11} r={7} />
      <path d="m20 20-3-3" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="m12 3.5 2.4 5 5.5.8-4 4 1 5.7L12 16.8 7.1 19l1-5.7-4-4 5.5-.8z" />
    </svg>
  );
}
