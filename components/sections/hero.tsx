import { ArrowDown, Download, MoveUpRight } from "lucide-react";
import { SystemMap } from "@/components/sections/system-map";

const cvUrl = "/cv/mohamed-nejjari-cv.pdf";
const cvFilename = "Mohamed-Nejjari-CV.pdf";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span aria-hidden="true" className="status-dot" />
          Software engineering ·  alternance
        </p>
        <h1 id="hero-title">
          NEJJARI
          <br />
          <span className="headline-accent">Mohamed</span>
        </h1>
        <p className="hero-role-line">Software engineering · Full Stack / DevOps</p>
        <p className="hero-description">
          I focus on backend engineering, thoughtful interfaces and reliable
          delivery across the stack.
        </p>
        <p className="role-note">
          Looking for a software engineering alternance.
        </p>
        <div className="hero-actions">
          <a className="button-primary" href="#contact">
            Get in touch <MoveUpRight aria-hidden="true" size={16} />
          </a>
          <a className="button-secondary" href="#projects">
            Explore projects <ArrowDown aria-hidden="true" size={16} />
          </a>
        </div>
        <div aria-label="Curriculum vitae" className="hero-cv-actions">
          <a
            aria-label="View Mohamed Nejjari's CV as a PDF in a new tab"
            className="hero-cv-link"
            href={cvUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            View CV <MoveUpRight aria-hidden="true" size={14} />
          </a>
          <a
            aria-label="Download Mohamed Nejjari's CV as a PDF"
            className="hero-cv-link"
            download={cvFilename}
            href={cvUrl}
          >
            Download CV <Download aria-hidden="true" size={14} />
          </a>
        </div>
      </div>

      <SystemMap />

      <span aria-hidden="true" className="hero-index mono-label">
        MN / 001
      </span>
    </section>
  );
}
