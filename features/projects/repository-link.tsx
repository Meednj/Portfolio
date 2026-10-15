import { ArrowUpRight, GitBranch } from "lucide-react";

type RepositoryLinkProps = {
  href: string;
  projectTitle: string;
  variant: "card" | "detail";
};

export function RepositoryLink({ href, projectTitle, variant }: RepositoryLinkProps) {
  const accessibleLabel = `View ${projectTitle} source on GitHub`;

  return (
    <a
      aria-label={accessibleLabel}
      className={`repository-link repository-link--${variant}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <GitBranch aria-hidden="true" size={variant === "card" ? 15 : 16} />
      {variant === "detail" ? (
        <>
          <span>Source on GitHub</span>
          <ArrowUpRight
            aria-hidden="true"
            className="repository-link-arrow"
            size={13}
          />
        </>
      ) : null}
    </a>
  );
}
