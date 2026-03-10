interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-14">
      <h2 className="font-display text-3xl font-semibold text-gold-gradient sm:text-4xl">
        {title}
      </h2>
      <hr className="hr-gold mt-4 opacity-30" />
      {subtitle && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
