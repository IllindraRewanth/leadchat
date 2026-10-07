export default function PagePlaceholder({
  title,
  description,
  comingIn,
  children,
}: {
  title: string;
  description: string;
  comingIn?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-muted">{description}</p>
      {comingIn && (
        <p className="mt-3 inline-block rounded-full border border-border px-3 py-1 text-xs text-muted">
          Placeholder · built in {comingIn}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}
