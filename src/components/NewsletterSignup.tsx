"use client";

import { FormEvent, useState } from "react";

export function NewsletterSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      setError("Please enter a valid email address before subscribing.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // In production, replace this timeout with a call to your newsletter provider (e.g. ConvertKit, Mailchimp).
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      event.currentTarget.reset();
    }, 750);
  };

  return (
    <footer id="journal" className="border-t border-emerald-100 bg-white/80 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Journal</p>
          <h2 className="text-2xl font-semibold text-neutral-900">Stories for living with intention</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Subscribe to receive essays on rituals, seasonal refreshes, and sustainable sourcing.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-3 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-4 sm:flex-row sm:items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-full border border-emerald-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Joining…" : "Join"}
          </button>
        </form>
      </div>
      <div className="mx-auto mt-4 max-w-6xl text-center sm:text-left">
        {isSuccess ? (
          <p className="text-sm font-medium text-emerald-700">Thanks for subscribing! Please check your inbox for a welcome note.</p>
        ) : null}
        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
      </div>
      <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-neutral-400">
        © {new Date().getFullYear()} Rovewear. All rights reserved.
      </p>
    </footer>
  );
}
