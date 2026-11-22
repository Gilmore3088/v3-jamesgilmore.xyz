import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import NotFoundContent from "@/components/not-found-content";

export const metadata: Metadata = { title: "Page not found" };

export default function RootNotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navigation />
      <main id="main" className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
}
