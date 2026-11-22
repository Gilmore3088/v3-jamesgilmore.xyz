const PATHS: Record<string, React.ReactNode> = {
  water: <path d="M3 12c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5M3 17c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5M3 7c2 0 2-1.5 4-1.5S9 7 11 7s2-1.5 4-1.5S17 7 19 7" />,
  plane: <path d="M10.5 20.5 13 13l6.5-6.5a1.8 1.8 0 0 0-2.5-2.5L10.5 10.5 3 13l2 2 4-1 1 4 .5 2.5z" />,
  run: <><circle cx="15" cy="4.5" r="1.8" /><path d="M6 20l3.5-6 3 2 1.5 4M9 11l3-3 3.5 2.5 3-1M12 8l-3 3-3-1" /></>,
  leaf: <path d="M5 19c0-8 5-13 14-13-1 9-6 14-14 13zM5 19l7-7" />,
  book: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21zM4 18.5A2.5 2.5 0 0 1 6.5 16H20M8 7h8M8 11h6" />,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>,
  ball: <><circle cx="12" cy="12" r="9" /><path d="M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18M3 12h18" /></>,
  wrench: <path d="M14.5 4.5a5 5 0 0 0-5.5 6.7L3 17.2V21h3.8l6-6a5 5 0 0 0 6.7-5.5l-3 3-3-3z" />,
};

/** Small line icon for lists. Decorative. */
export default function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name] ?? PATHS.wrench}
    </svg>
  );
}
