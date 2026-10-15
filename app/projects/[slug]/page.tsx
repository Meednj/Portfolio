import type { Metadata } from 'next';
import Link from 'next/link';
import { cache } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ProjectArtwork } from '@/features/projects/project-artwork';
import { RepositoryLink } from '@/features/projects/repository-link';
import {
  getProjectBySlug as findProjectBySlug,
  projects,
} from '@/data/projects';
import type { Project } from '@/data/projects';
import { notFound } from 'next/navigation';
import { getSiteUrl } from '@/lib/site-url';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// Deduplicates the lookup between generateMetadata and ProjectContent.
const getProjectBySlug = cache(findProjectBySlug);

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  const siteUrl = getSiteUrl();
  const canonical = siteUrl
    ? new URL(`/projects/${project.slug}`, siteUrl)
    : undefined;
  const socialImage = siteUrl ? new URL("/cv/photo.jpg", siteUrl).toString() : undefined;

  return {
    title: project.title,
    description: project.summary,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type: 'article',
      siteName: 'Mohamed Nejjari Portfolio',
      title: `${project.title} | Mohamed Nejjari`,
      description: project.summary,
      ...(canonical ? { url: canonical.toString() } : {}),
      ...(socialImage
        ? { images: [{ url: socialImage, alt: 'Portrait of Mohamed Nejjari' }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Mohamed Nejjari`,
      description: project.summary,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <ProjectContent project={project} />
      <SiteFooter />
    </>
  );
}

function ProjectContent({ project }: { project: Project }) {
  return (
    <main className="project-detail shell" id="main">
      <Link className="project-back-link" href="/#projects">
        <ArrowLeft aria-hidden="true" size={15} /> Back to projects
      </Link>

      <div className="project-detail-masthead">
        <header className="project-detail-header">
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <div className="project-detail-meta">
            <span>PROJECT / {project.slug}</span>
            {project.context ? <span>{project.context}</span> : null}
          </div>
          <p className="project-detail-summary">{project.summary}</p>
          {project.repositoryUrl ? (
            <RepositoryLink
              href={project.repositoryUrl}
              projectTitle={project.title}
              variant="detail"
            />
          ) : null}
          {project.technologies.length > 0 ? (
            // Decorative duplicate of the "Technologies" section below,
            // hidden from assistive tech so it isn't announced twice.
            <ul aria-hidden="true" className="project-tags project-detail-tags">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : null}
        </header>
        <ProjectArtwork project={project} variant="detail" />
      </div>

      <div className="project-detail-grid">
        <section aria-labelledby="overview-title" className="project-detail-section">
          <h2 id="overview-title">Overview</h2>
          <p>{project.overview}</p>
          <p className="project-detail-pending">{project.status}</p>
        </section>

        <section
          aria-labelledby="implemented-title"
          className="project-detail-section"
        >
          <h2 id="implemented-title">Implemented functionality</h2>
          {project.implementedFeatures.length > 0 ? (
            <ul>
              {project.implementedFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : (
            <p className="project-detail-pending">
              Specific implemented functionality has not been provided yet.
            </p>
          )}
        </section>

        {project.plannedFeatures.length > 0 ? (
          <section aria-labelledby="planned-title" className="project-detail-section">
            <h2 id="planned-title">Planned functionality</h2>
            <ul>
              {project.plannedFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="architecture-title" className="project-detail-section">
          <h2 id="architecture-title">Architecture and implementation</h2>
          <ul>
            {project.architecture.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </section>

        <section aria-labelledby="engineering-title" className="project-detail-section">
          <h2 id="engineering-title">Engineering details</h2>
          <ul>
            {project.engineeringDetails.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </section>

        <section aria-labelledby="delivery-title" className="project-detail-section">
          <h2 id="delivery-title">Testing and delivery</h2>
          <ul>
            {project.delivery.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </section>

        <section
          aria-labelledby="technologies-title"
          className="project-detail-section"
        >
          <h2 id="technologies-title">Technologies</h2>
          {project.technologies.length > 0 ? (
            <ul className="project-tags">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : (
            <p className="project-detail-pending">
              The technical stack has not been provided yet.
            </p>
          )}
        </section>

        {project.verificationNotes?.length ? (
          <section
            aria-labelledby="verification-title"
            className="project-detail-section project-detail-verification"
          >
            <h2 id="verification-title">Verification notes</h2>
            <ul>
              {project.verificationNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <Link className="project-contact-link" href="/#contact">
        Get in touch <ArrowUpRight aria-hidden="true" size={16} />
      </Link>
    </main>
  );
}
