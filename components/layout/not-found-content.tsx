import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function NotFoundContent() {
  return (
    <main className="not-found-page shell" id="main">
      <p className="eyebrow">ROUTE NOT FOUND / 404</p>
      <h1>That address doesn’t point to a page.</h1>
      <p>
        The page may have moved, or the address may be incomplete. Head back to
        the portfolio or browse the project case studies.
      </p>
      <div className="not-found-actions">
        <Link className="button-primary" href="/">
          <ArrowLeft aria-hidden="true" size={16} /> Back to home
        </Link>
        <Link className="text-link" href="/#projects">
          Explore projects <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </main>
  );
}
