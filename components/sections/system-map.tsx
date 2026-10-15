"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

const nodes = [
  { id: "ui", x: 17, y: 24, label: "Interface", detail: "TypeScript · React · Next.js", note: "Web interfaces and full-stack application development." },
  { id: "api", x: 50, y: 24, label: "Backend / API", detail: "Java · Spring Boot", note: "Backend engineering with Java and Spring Boot." },
  { id: "data", x: 83, y: 24, label: "Data", detail: "PostgreSQL", note: "Relational data and persistence." },
  { id: "cicd", x: 17, y: 76, label: "Delivery", detail: "Git · CI/CD", note: "Version control and continuous integration and delivery." },
  { id: "container", x: 50, y: 76, label: "Container", detail: "Docker", note: "Container tooling and repeatable environments." },
  { id: "infra", x: 83, y: 76, label: "Cloud & ops", detail: "Infrastructure · DevOps", note: "Cloud infrastructure and DevOps are areas of interest." },
] as const;

type NodeId = (typeof nodes)[number]["id"];

const edges: ReadonlyArray<{
  from: NodeId;
  to: NodeId;
  path: string;
}> = [
  { from: "ui", to: "api", path: "M 130 82 C 180 55, 240 55, 290 82" },
  { from: "api", to: "data", path: "M 350 82 C 400 55, 460 55, 510 82" },
  { from: "cicd", to: "container", path: "M 130 258 C 180 285, 240 285, 290 258" },
  { from: "container", to: "infra", path: "M 350 258 C 400 285, 460 285, 510 258" },
  { from: "api", to: "container", path: "M 320 112 L 320 228" },
  { from: "data", to: "infra", path: "M 530 112 C 590 145, 590 195, 550 228" },
];

export function SystemMap() {
  const [selectedId, setSelectedId] = useState<NodeId>("api");
  const selectedNode = nodes.find((node) => node.id === selectedId) ?? nodes[1];

  return (
    <section aria-labelledby="system-map-title" className="system-map-panel">
      <div className="system-map-heading">
        <div>
          <p className="eyebrow">Systems, in perspective</p>
          <h2 id="system-map-title">One stack.<br /><span>Many connections.</span></h2>
        </div>
        <span aria-hidden="true" className="map-index">MAP / 01</span>
      </div>
      <p className="system-map-caption">
        A conceptual map of tools and interests—not architecture from a specific project.
      </p>

      <div className="system-map-stage">
        <svg aria-hidden="true" className="system-map-lines" viewBox="0 0 640 340" preserveAspectRatio="none">
          {edges.map((edge, index) => {
            const active = edge.from === selectedId || edge.to === selectedId;
            return (
              <path
                className={`system-map-edge${active ? " is-connected" : ""}`}
                d={edge.path}
                key={`${edge.from}-${edge.to}`}
                style={{ "--edge-order": index } as CSSProperties}
              />
            );
          })}
        </svg>
        {nodes.map((node, index) => (
          <button
            aria-controls="system-map-details"
            aria-pressed={selectedId === node.id}
            className={`system-map-node${selectedId === node.id ? " is-selected" : ""}`}
            key={node.id}
            onFocus={() => setSelectedId(node.id)}
            onPointerEnter={() => setSelectedId(node.id)}
            onClick={() => setSelectedId(node.id)}
            style={{ left: `${node.x}%`, top: `${node.y}%`, "--node-order": index } as CSSProperties}
            type="button"
          >
            <span className="system-map-node-number">0{index + 1}</span>
            <span className="system-map-node-label">{node.label}</span>
            <span className="system-map-node-detail">{node.detail}</span>
          </button>
        ))}
      </div>

      <div aria-live="polite" className="system-map-details" id="system-map-details">
        <span className="system-map-details-index">FOCUS / {String(nodes.findIndex((node) => node.id === selectedId) + 1).padStart(2, "0")}</span>
        <div>
          <h3>{selectedNode.label}</h3>
          <p>{selectedNode.note}</p>
        </div>
        <span aria-hidden="true" className="system-map-activity"><i /><i /><i /></span>
      </div>
    </section>
  );
}
