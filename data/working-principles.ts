import type { ProjectSlug } from "@/data/projects";

export type WorkingPrinciple = {
  id: string;
  number: string;
  title: string;
  coreIdea: string;
  description: string;
  behaviors: readonly string[];
  teamValue: string;
  projectContext?: {
    slug: ProjectSlug;
    title: string;
    description: string;
  };
};

export const workingPrinciples = [
  {
    id: "adaptability",
    number: "01",
    title: "Adaptability",
    coreIdea: "Adapt the approach. Keep the standards.",
    description:
      "I adjust to the problem, the team, and the constraints while keeping the engineering objective in view.",
    behaviors: [
      "Understand the existing system before changing it.",
      "Learn unfamiliar tools by building and testing small pieces.",
      "Fit implementation to project constraints and team conventions.",
      "Preserve quality as requirements change.",
    ],
    teamValue:
      "The team gets a solution that fits its system and constraints without losing sight of the goal.",
  },
  {
    id: "problem-solving",
    number: "02",
    title: "Autonomous problem-solving",
    coreIdea: "Investigate first. Escalate with evidence.",
    description:
      "I break ambiguous issues into smaller questions, investigate their causes, and ask for input when it is the most useful next step.",
    behaviors: [
      "Reproduce the issue and separate symptoms from causes.",
      "Use source code, documentation, logs, and tests to gather evidence.",
      "Validate a possible fix against the expected behavior.",
      "Share findings and blockers clearly, including what remains uncertain.",
    ],
    teamValue:
      "Teammates receive a specific question or a traceable finding instead of an untested guess.",
    projectContext: {
      slug: "harris-vs-cnn-feature-detection",
      title: "Harris vs. CNN Feature Point Detection",
      description:
        "This project connects a Flask interface to PyTorch inference and a MATLAB Harris detector.",
    },
  },
  {
    id: "team-collaboration",
    number: "03",
    title: "Team collaboration",
    coreIdea: "Independent execution. Shared understanding.",
    description:
      "I work through tasks with ownership while keeping objectives, interfaces, and risks visible to the people involved.",
    behaviors: [
      "Clarify objectives, interfaces, and responsibilities early.",
      "Communicate progress, assumptions, and risks before they become surprises.",
      "Share useful findings and document decisions that affect others.",
      "Give and receive constructive feedback with respect.",
    ],
    teamValue:
      "Clearer handoffs help the team coordinate changes and resolve integration questions sooner.",
    projectContext: {
      slug: "marjane-ems",
      title: "Marjane EMS",
      description:
        "The React and TypeScript client communicates with Spring Boot APIs through an Axios client.",
    },
  },
  {
    id: "analytical-thinking",
    number: "04",
    title: "Analytical thinking",
    coreIdea: "Understand the system before optimizing it.",
    description:
      "I compare technical options against the requirements and evidence, including the trade-offs each option introduces.",
    behaviors: [
      "Separate symptoms from root causes.",
      "Examine dependencies and relevant trade-offs.",
      "Compare options against explicit requirements.",
      "Prefer the simplest reliable solution that fits the problem.",
    ],
    teamValue:
      "Decisions are easier to review when their constraints, evidence, and trade-offs are explicit.",
    projectContext: {
      slug: "harris-vs-cnn-feature-detection",
      title: "Harris vs. CNN Feature Point Detection",
      description:
        "The tool exposes detector settings and presents results from classical Harris detection and a CNN model.",
    },
  },
  {
    id: "learning-agility",
    number: "05",
    title: "Learning agility",
    coreIdea: "Turn unfamiliarity into a repeatable process.",
    description:
      "I make learning practical: identify a gap, study a working example, test my understanding, then apply it to the real task.",
    behaviors: [
      "Identify what I need to understand before implementation.",
      "Read official documentation and inspect working examples.",
      "Build a small proof of concept to test assumptions.",
      "Apply the result and document details that will help later.",
    ],
    teamValue:
      "A small, validated learning step reduces uncertainty before it reaches the wider implementation.",
  },
  {
    id: "ownership-reliability",
    number: "06",
    title: "Ownership and reliability",
    coreIdea: "Deliver the result, not just the code.",
    description:
      "I consider what done means, how the change can fail, and what needs to be communicated after implementation.",
    behaviors: [
      "Clarify expected behavior and edge cases.",
      "Consider failure scenarios as well as the happy path.",
      "Validate changes before describing them as complete.",
      "Follow through on feedback and disclose remaining limitations.",
    ],
    teamValue:
      "A handoff includes the result, its verification, and any remaining risk the team should know about.",
    projectContext: {
      slug: "medtheg-prod",
      title: "MedTheG Prod",
      description:
        "The repository includes idempotent payment webhook handling, PostgreSQL Testcontainers support, and backend tests.",
    },
  },
] as const satisfies readonly WorkingPrinciple[];
