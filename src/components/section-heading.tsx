interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
      <div className="mt-3 mx-auto h-0.5 w-16 bg-gold" />
      {subtitle && (
        <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
