"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { ProductSpecs } from "@/lib/types";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  specs: ProductSpecs;
}

const SIZE_GUIDE = [
  { label: "Lens Width", key: "lensWidth", unit: "mm" },
  { label: "Bridge Width", key: "bridgeWidth", unit: "mm" },
  { label: "Temple Length", key: "templeLength", unit: "mm" },
  { label: "Frame Width", key: "frameWidth", unit: "mm" },
  { label: "Lens Height", key: "lensHeight", unit: "mm" },
  { label: "Weight", key: "weight", unit: "g" },
] as const;

export function SizeGuideModal({ open, onClose, specs }: SizeGuideModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-6 text-left align-middle shadow-elevated transition-all">
                <Dialog.Title className="text-lg font-semibold uppercase tracking-[0.3em] text-white">
                  Size Guide
                </Dialog.Title>
                <p className="mt-2 text-sm text-slate-400">
                  Frame dimensions help you align fit with your face shape. Measurements below are captured from our
                  WordPress product export so you can keep shopping with confidence.
                </p>
                <dl className="mt-6 space-y-3">
                  {SIZE_GUIDE.map((spec) => (
                    <div key={spec.key} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <dt className="text-xs uppercase tracking-[0.3em] text-slate-300">{spec.label}</dt>
                      <dd className="text-sm font-semibold text-white">
                        {specs[spec.key] ? `${specs[spec.key]} ${spec.unit}` : "—"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
