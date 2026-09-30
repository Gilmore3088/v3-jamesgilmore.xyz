import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-2 focus:border-ink focus:bg-mustard focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
