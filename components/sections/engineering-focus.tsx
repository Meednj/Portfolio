import { Boxes, CloudCog, Code2, GitBranch } from "lucide-react";

const focusAreas = [
  {
    icon: Code2,
    title: "Backend engineering",
    detail: "Java · Spring Boot · PostgreSQL",
  },
  {
    icon: Boxes,
    title: "Full-stack development",
    detail: "TypeScript · React · Next.js",
  },
  {
    icon: CloudCog,
    title: "Cloud & DevOps",
    detail: "Docker · infrastructure · CI/CD",
  },
  {
    icon: GitBranch,
    title: "Developer tooling",
    detail: "Git · automation · maintainability",
  },
];

export function EngineeringFocus() {
  return (
    <section aria-labelledby="focus-title" className="focus-section" id="focus">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">The toolkit</p>
          <h2 id="focus-title">Engineering, end to end.</h2>
          <p className="section-description">
            The tools I use and the parts of the stack I’m most interested in.
          </p>
        </div>

        <ul className="focus-grid">
          {focusAreas.map(({ icon: Icon, title, detail }, index) => (
            <li className="focus-item" key={title}>
              <span aria-hidden="true" className="focus-icon">
                <Icon size={19} strokeWidth={1.7} />
              </span>
              <span className="focus-number mono-label">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </li>
          ))}
        </ul>

        <p className="focus-note">
          <span aria-hidden="true" className="status-dot" />
          Also exploring cloud infrastructure and better developer workflows.
        </p>
      </div>
    </section>
  );
}
