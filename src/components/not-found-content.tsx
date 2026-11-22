import Link from "next/link";
import Arrow from "@/components/arrow";
import PageHead from "@/components/page-head";
import Container from "@/components/container";

export default function NotFoundContent() {
  return (
    <>
      <PageHead label="Error 404" title="There's nothing at this address." lede="The page may have moved, or the link may have been wrong. Everything on the site is reachable from the home page." />
      <Container>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Link href="/" className="arrow-link">
            Home <Arrow />
          </Link>
          <Link href="/projects" className="arrow-link">
            Projects <Arrow />
          </Link>
        </div>
      </Container>
    </>
  );
}
