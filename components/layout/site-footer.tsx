import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="shell footer-main">
        <div>
          <p className="eyebrow">Have something in mind?</p>
          <h2>Let’s build something useful.</h2>
          <p className="footer-copy">
            I’m looking for an opportunity to learn, contribute and ship with a
            thoughtful engineering team.
          </p>
          <p className="contact-note">
            Email me, connect on LinkedIn, or review my CV.
          </p>
        </div>
        <nav aria-label="Contact links" className="footer-actions">
          <a className="footer-contact footer-contact-primary" href="mailto:mohamednejjari561@gmail.com">
            Email me <Mail aria-hidden="true" size={16} />
          </a>
          <a
            className="footer-contact"
            href="https://linkedin.com/in/mohamed-nejjari-20j07j06"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn <ArrowUpRight aria-hidden="true" size={16} />
          </a>
          <a
            className="footer-contact"
            href="/cv/mohamed-nejjari-cv.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            View CV <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <Link
          aria-label="Mohamed Nejjari, home"
          className="wordmark footer-wordmark"
          href="/#top"
        >
          <BrandMark className="wordmark-mark" />
          <span>NEJJARI Mohamed</span>
        </Link>
        <p>Designed & built with care.</p>
        <span className="mono-label">© NEJJARI Mohamed</span>
      </div>
    </footer>
  );
}
