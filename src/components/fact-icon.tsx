const PATHS: Record<string, React.ReactNode> = {
  run: <><path d="M4 17l4-8 3 5 2-3 4 6" /><path d="M3 21h18" /></>,
  star: <path d="M12 3l2.5 5.5L20 9l-4 4 1 5.5-5-2.7-5 2.7 1-5.5-4-4 5.5-.5z" />,
  calendar: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M8 4v6M16 4v6" /></>,
  trend: <path d="M12 19V5M5 12l7-7 7 7" />,
  mic: <><path d="M12 3a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4z" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.5 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0 0 12 3z" />,
};

export default function FactIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.star}
    </svg>
  );
}
