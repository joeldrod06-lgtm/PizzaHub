type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400/70">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-light tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="max-w-xl text-sm leading-6 text-white/45">
        {description}
      </p>
    </div>
  );
}
