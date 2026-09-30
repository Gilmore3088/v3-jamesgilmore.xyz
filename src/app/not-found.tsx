import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import NotFoundContent from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
