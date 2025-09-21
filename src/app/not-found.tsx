import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-semibold uppercase tracking-[0.4em] text-white">Frame not found</h1>
      <p className="text-sm text-slate-400">
        The product you are searching for has either been retired or never left the design studio. Explore the full
        ROVE lineup to discover your next pair.
      </p>
      <Link
        href="/"
        className="rounded-full border border-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:border-white/60"
      >
        Return home
      </Link>
    </div>
  );
}
