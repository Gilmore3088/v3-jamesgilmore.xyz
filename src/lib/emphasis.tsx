/**
 * Renders *phrases between asterisks* as an italic evergreen <em>.
 * Used for the one accented phrase in a headline. Everything else is plain text.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="em-accent">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** The same string with the asterisks removed, for metadata and alt text. */
export function plain(text: string): string {
  return text.replace(/\*/g, "");
}
