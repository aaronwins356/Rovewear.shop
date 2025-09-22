interface PageHeroProps {
  title: string;
  subtitle: string;
}

export function PageHero({ title, subtitle }: PageHeroProps): JSX.Element {
  return (
    <header className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="text-4xl font-semibold text-neutral-900">{title}</h1>
      <p className="mt-4 text-sm text-neutral-600">{subtitle}</p>
    </header>
  );
}
