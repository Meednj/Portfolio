import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { academicWork, educationCopy } from "@/data/education";
import { getProjectBySlug } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const title = "Education";
const description =
  "Academic path, curriculum themes, and selected engineering projects by Mohamed Nejjari.";
const socialImage = siteUrl ? new URL("/cv/photo.jpg", siteUrl).toString() : undefined;

export const metadata: Metadata = {
  title,
  description,
  ...(siteUrl ? { alternates: { canonical: new URL("/education", siteUrl) } } : {}),
  openGraph: {
    type: "website",
    siteName: "Mohamed Nejjari Portfolio",
    title: `${title} | Mohamed Nejjari`,
    description,
    ...(siteUrl ? { url: new URL("/education", siteUrl).toString() } : {}),
    ...(socialImage
      ? { images: [{ url: socialImage, alt: "Portrait of Mohamed Nejjari" }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Mohamed Nejjari`,
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

export default function EducationPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <EducationContent />
      <SiteFooter />
    </>
  );
}

function EducationContent() {
  const copy = educationCopy;

  return (
      <main className="education-page" id="main">
        <section aria-labelledby="education-title" className="education-intro shell">
          <div className="education-intro-copy">
            <p className="eyebrow education-eyebrow">
              <span className="status-dot" /> {copy.eyebrow}
            </p>
            <h1 id="education-title">{copy.title}</h1>
            <p className="education-lede">{copy.introduction}</p>
            <Link className="education-back-link" href="/#top">
              <ArrowLeft aria-hidden="true" size={15} /> {copy.backHome}
            </Link>
          </div>
          <div aria-hidden="true" className="education-index">
            <span>MN / 02</span>
            <div className="education-index-grid"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <span>ESTM → EILCO</span>
          </div>
        </section>

        <section aria-labelledby="timeline-title" className="education-timeline-section">
          <div className="shell education-section-shell">
            <div className="education-section-heading">
              <div>
                <p className="eyebrow">{copy.timelineLabel}</p>
                <h2 id="timeline-title">{copy.timelineTitle}</h2>
              </div>
              <span className="mono-label">2024 — 2029 / ONGOING</span>
            </div>
            <ol className="education-timeline">
              <li className="education-timeline-item">
                <span aria-hidden="true" className="timeline-marker" />
                <p className="mono-label">{copy.estmStatus}</p>
                <div className="timeline-content">
                  <h3>{copy.estmDegree}</h3>
                  <p>{copy.estmDetail} <span>·</span> Practical computer science foundations</p>
                </div>
                <span aria-hidden="true" className="timeline-arrow">01</span>
              </li>
              <li className="education-timeline-item education-timeline-current">
                <span aria-hidden="true" className="timeline-marker" />
                <p className="mono-label">{copy.eilcoStatus}</p>
                <div className="timeline-content">
                  <h3>{copy.eilcoDegree}</h3>
                  <p>{copy.eilcoDetail} <span>·</span> Engineering studies in progress</p>
                </div>
                <span aria-hidden="true" className="timeline-arrow">02</span>
              </li>
            </ol>
            <aside aria-label={copy.distinctionLabel} className="education-distinction">
              <span aria-hidden="true" className="distinction-mark">+</span>
              <div>
                <p className="mono-label">{copy.distinctionLabel}</p>
                <h3>{copy.distinction}</h3>
                <p>{copy.distinctionNote}</p>
              </div>
              <span aria-hidden="true" className="distinction-rule" />
            </aside>
          </div>
        </section>

        <section aria-labelledby="curriculum-title" className="curriculum-section shell">
          <div className="education-section-heading">
            <div>
              <p className="eyebrow">{copy.curriculumLabel}</p>
              <h2 id="curriculum-title">{copy.curriculumTitle}</h2>
            </div>
            <ArrowDownRight aria-hidden="true" className="curriculum-heading-icon" size={24} />
          </div>
          <p className="curriculum-note">{copy.curriculumNote}</p>
          <div className="curriculum-list">
            {copy.categories.map((category) => (
              <details className="curriculum-item" key={category.index} open={category.index === "01"}>
                <summary>
                  <span className="curriculum-number">{category.index}</span>
                  <span className="curriculum-category">{category.title}</span>
                  <span className="curriculum-count">{String(category.modules.length).padStart(2, "0")} topics</span>
                  <span aria-hidden="true" className="curriculum-toggle">+</span>
                </summary>
                <ul>
                  {category.modules.map((module) => <li key={module}>{module}</li>)}
                </ul>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="academic-work-title" className="academic-work-section">
          <div className="shell">
            <div className="education-section-heading">
              <div>
                <p className="eyebrow">{copy.workLabel}</p>
                <h2 id="academic-work-title">{copy.workTitle}</h2>
              </div>
              <span className="mono-label">SELECTED / 04</span>
            </div>
            <ul className="academic-work-list">
              {academicWork.map(({ slug, note }, index) => {
                const project = getProjectBySlug(slug);
                if (!project) return null;
                return (
                  <li key={slug}>
                    <Link aria-label={`${copy.projectLink}: ${project.title}`} className="academic-work-card" href={`/projects/${project.slug}`}>
                      <span className="academic-work-index">0{index + 1}</span>
                      <div className="academic-work-main">
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                      </div>
                      <span className="academic-work-context">
                        {note === "finalProject" ? copy.finalProject : project.category}
                      </span>
                      <span aria-hidden="true" className="academic-work-arrow">
                        <ArrowUpRight aria-hidden="true" size={18} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="direction-title" className="engineering-direction shell">
          <p className="eyebrow">{copy.directionLabel}</p>
          <div className="engineering-direction-content">
            <h2 id="direction-title">{copy.directionTitle}</h2>
            <p>{copy.directionText}</p>
          </div>
          <span aria-hidden="true" className="engineering-direction-index">END / 01</span>
        </section>
      </main>
  );
}
