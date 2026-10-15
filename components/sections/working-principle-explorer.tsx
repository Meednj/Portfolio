"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { workingPrinciples } from "@/data/working-principles";

type PrincipleId = (typeof workingPrinciples)[number]["id"];

export function WorkingPrincipleExplorer() {
  const [activeId, setActiveId] = useState<PrincipleId>(workingPrinciples[0].id);
  const active = workingPrinciples.find(({ id }) => id === activeId) ?? workingPrinciples[0];

  return (
    <div className="work-explorer">
      <figure className="work-visual-frame">
        <div className="work-visual-meta">
          <span className="mono-label">SYSTEM / ADAPTIVE</span>
          <span className="mono-label">MAP 01</span>
        </div>
        <div className="work-visual">
          <ChameleonDiagram activeId={activeId} />
          <span aria-hidden="true" className="work-coordinate work-coordinate-top">X / 04</span>
          <span aria-hidden="true" className="work-coordinate work-coordinate-side">NODE FIELD</span>
        </div>
        <figcaption className="work-visual-caption">
          <span aria-hidden="true" className="status-dot" />
          One engineering mindset, responding to different constraints.
        </figcaption>
      </figure>

      <div className="work-principles-column">
        <div className="work-principle-list" aria-label="Select a working principle" role="group">
          {workingPrinciples.map((principle) => {
            const selected = principle.id === active.id;
            return (
              <button
                aria-controls="working-principle-detail"
                aria-pressed={selected}
                className={`work-principle-choice${selected ? " is-selected" : ""}`}
                key={principle.id}
                onClick={() => setActiveId(principle.id)}
                type="button"
              >
                <span className="work-principle-number">{principle.number}</span>
                <span className="work-principle-labels">
                  <span className="work-principle-title">{principle.title}</span>
                  <span className="work-principle-core">{principle.coreIdea}</span>
                </span>
                <span aria-hidden="true" className="work-principle-marker" />
              </button>
            );
          })}
        </div>

        <article
          aria-atomic="true"
          aria-live="polite"
          className="work-principle-detail"
          id="working-principle-detail"
        >
          <div className="work-principle-detail-heading">
            <p className="eyebrow">{active.number} / {active.title}</p>
            <h3>{active.coreIdea}</h3>
            <p className="work-principle-description">{active.description}</p>
          </div>

          <div className="work-practice">
            <h4>In practice</h4>
            <ul>
              {active.behaviors.map((behavior) => <li key={behavior}>{behavior}</li>)}
            </ul>
          </div>

          <p className="work-team-value">
            <span className="mono-label">Why it matters to a team</span>
            <span>{active.teamValue}</span>
          </p>

          {"projectContext" in active && active.projectContext ? (
            <Link className="work-project-context" href={`/projects/${active.projectContext.slug}`}>
              <span className="work-project-context-copy">
                <span className="mono-label">Project context / {active.projectContext.title}</span>
                <span>{active.projectContext.description}</span>
              </span>
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          ) : null}
        </article>
      </div>
    </div>
  );
}

function ChameleonDiagram({ activeId }: { activeId: PrincipleId }) {
  return (
    <svg
      aria-hidden="true"
      className="working-map"
      data-principle={activeId}
      fill="none"
      viewBox="0 0 600 360"
    >
      <defs>
        <pattern height="24" id="work-grid" patternUnits="userSpaceOnUse" width="24">
          <path d="M24 0H0v24" stroke="var(--border)" strokeWidth=".6" />
        </pattern>
        <linearGradient id="chameleon-surface" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--card)" />
          <stop offset="1" stopColor="var(--background)" />
        </linearGradient>
      </defs>

      <path d="M18 18h564v324H18z" fill="url(#work-grid)" opacity=".55" />
      <path d="M34 56h92M474 56h92M34 300h64M502 300h64" stroke="var(--border)" strokeWidth="1" />
      <path d="M34 52v8m92-8v8M474 52v8m92-8v8M34 296v8m64-8v8M502 296v8m64-8v8" stroke="var(--muted-foreground)" strokeWidth="1" />

      <g className="map-connections" stroke="var(--muted-foreground)" strokeWidth="1.2">
        <path className="map-path" data-map-layer="adaptability" d="M128 176 196 126l83 24 83-39 112 15" />
        <path className="map-path" data-map-layer="problem-solving" d="M128 176 193 223l86-73 64 84 102-58" />
        <path className="map-path" data-map-layer="team-collaboration" d="M196 126 245 80l104 31 74-57 51 72" />
        <path className="map-path" data-map-layer="analytical-thinking" d="M193 223 245 80l104 31-70 40 64 84 80-26 62 34" />
        <path className="map-path" data-map-layer="learning-agility" d="M128 176 245 80m34 70 70-39 74 57 62-42" />
        <path className="map-path" data-map-layer="ownership-reliability" d="M193 223 279 150l64 84 80-26 62 34" />
      </g>

      <g className="chameleon-shape">
        <path
          className="chameleon-tail"
          d="M149 184c-59-9-86 15-77 42 7 22 36 27 52 12 15-14 4-35-12-32-12 2-14 16-3 21"
          stroke="var(--foreground)"
          strokeWidth="3"
        />
        <path
          d="M136 145c18-36 89-59 158-43 23 5 42 12 57 20 17-9 27-31 48-45 23-16 52-4 57 18 4 19-10 33-29 37 23 0 39 13 38 30-2 18-19 30-39 25-17-4-27-17-39-29-8 26-24 45-47 58l-7 43h-23l-8-39c-24 6-50 5-72-2l-14 41h-22l1-48c-36-12-62-37-69-66-18-1-27-19-18-34 7-12 17-12 28-6Z"
          fill="url(#chameleon-surface)"
          stroke="var(--foreground)"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path d="M212 211c30 13 67 14 100 2m-85-39c42 10 87 4 118-16m-88-57c-4 28-1 52 8 72m48-68c3 29 16 50 36 65" stroke="var(--border)" strokeWidth="1" />
        <circle cx="437" cy="102" r="17" stroke="var(--foreground)" strokeWidth="2" />
        <circle cx="441" cy="101" r="5" fill="var(--accent)" />
        <path d="M466 146c11 2 19 8 23 16" stroke="var(--muted-foreground)" strokeLinecap="round" strokeWidth="1.5" />
        <circle cx="194" cy="266" r="3" fill="var(--accent)" />
        <circle cx="346" cy="267" r="3" fill="var(--accent)" />
      </g>

      <g className="map-nodes">
        <circle className="map-node" data-map-layer="adaptability" cx="128" cy="176" r="5" />
        <circle className="map-node" data-map-layer="team-collaboration" cx="196" cy="126" r="5" />
        <circle className="map-node" data-map-layer="analytical-thinking" cx="193" cy="223" r="5" />
        <circle className="map-node" data-map-layer="learning-agility" cx="245" cy="80" r="5" />
        <circle className="map-node" data-map-layer="problem-solving" cx="279" cy="150" r="5" />
        <circle className="map-node" data-map-layer="ownership-reliability" cx="343" cy="234" r="5" />
        <circle className="map-node" data-map-layer="team-collaboration" cx="349" cy="111" r="5" />
        <circle className="map-node" data-map-layer="problem-solving" cx="429" cy="185" r="5" />
        <circle className="map-node" data-map-layer="learning-agility" cx="423" cy="168" r="5" />
        <circle className="map-node" data-map-layer="ownership-reliability" cx="485" cy="242" r="5" />
        <circle className="map-node" data-map-layer="adaptability" cx="479" cy="126" r="5" />
      </g>
      <path className="map-orbit" d="M104 176c0-22 18-40 40-40m335-39c20 0 36 16 36 36" />
    </svg>
  );
}
