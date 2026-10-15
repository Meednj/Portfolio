import { WorkingPrincipleExplorer } from "@/components/sections/working-principle-explorer";

const workflow = [
  { title: "Understand", detail: "Define the objective and constraints." },
  { title: "Investigate", detail: "Gather evidence and find the cause." },
  { title: "Align", detail: "Clarify assumptions and interfaces." },
  { title: "Implement", detail: "Build the smallest appropriate change." },
  { title: "Validate", detail: "Check expected behavior and edge cases." },
  { title: "Communicate", detail: "Share results, trade-offs, and risks." },
] as const;

export function HowIWork() {
  return (
    <section aria-labelledby="how-i-work-title" className="how-i-work-section" id="how-i-work">
      <div className="shell">
        <header className="how-i-work-heading">
          <div>
            <p className="eyebrow">How I work / principles in practice</p>
            <h2 id="how-i-work-title">Different environments.<br />One engineering mindset.</h2>
          </div>
          <p className="how-i-work-intro">
            I adapt to the problem, the team, and the constraints. I explore unfamiliar systems
            independently, ask questions when alignment matters, and turn ambiguity into
            practical next steps.
          </p>
        </header>

        <WorkingPrincipleExplorer />

        <div className="work-flow-section">
          <div className="work-flow-heading">
            <div>
              <p className="eyebrow">A repeatable way to start</p>
              <h3>From ambiguity to a clear handoff.</h3>
            </div>
            <p>This is a guide, not a fixed sequence; the work determines where to spend time.</p>
          </div>
          <ol className="work-flow">
            {workflow.map(({ title, detail }, index) => (
              <li className="work-flow-step" key={title}>
                <span aria-hidden="true" className="work-flow-index">0{index + 1}</span>
                <h4>{title}</h4>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
