import { cn } from "@/lib/cn";

export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}
