"use client";

import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { ShoppingBagIcon } from "@/components/ui/icons";

export function CartToggle({ className }: { className?: string }): JSX.Element {
  const { itemCount, toggleDrawer } = useCart();

  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-100",
        className
      )}
      onClick={toggleDrawer}
      aria-label="Open shopping cart"
    >
      <ShoppingBagIcon className="h-4 w-4" aria-hidden />
      Cart
      <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-neutral-900 px-1 text-xs font-bold text-white">
        {itemCount}
      </span>
    </button>
  );
}
