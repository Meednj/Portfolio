import type { ProjectSlug } from "@/data/projects";

export const educationCopy = {
    eyebrow: "Education / 01 — Foundations to engineering",
    title: "From foundations to engineering.",
    introduction:
      "My studies began with practical computer science foundations at ESTM and continue at EILCO in engineering studies. That progression is shaping my direction in software engineering and DevOps.",
    timelineLabel: "Academic timeline",
    timelineTitle: "A progression in practice.",
    estmStatus: "Completed · 2024–2026",
    estmDegree: "DUT in Computer Science",
    estmDetail: "Génie Informatique",
    eilcoStatus: "Current · 2026–2029",
    eilcoDegree: "Engineering studies · ING 1",
    eilcoDetail: "Informatique · EILCO",
    distinctionLabel: "Academic distinction / Reported",
    distinction: "Top 5 in a cohort of approximately 130 students.",
    distinctionNote: "Reported academic standing; no award or certificate is implied.",
    curriculumLabel: "Curriculum explorer",
    curriculumTitle: "Topics across the program.",
    curriculumNote:
      "These areas summarize the supplied curriculum. Module-by-module attribution to ESTM or EILCO was not specified.",
    categories: [
      {
        title: "Software Engineering",
        index: "01",
        modules: [
          "Algorithmics and C",
          "Advanced data structures and algorithms",
          "Java and object-oriented programming",
          "Spring Boot",
          "Frontend and backend development",
          "Mobile development with Kotlin",
          "UML and design patterns",
        ],
      },
      {
        title: "Data and Databases",
        index: "02",
        modules: ["Database fundamentals", "Oracle", "SQL", "MySQL", "PostgreSQL", "Machine learning"],
      },
      {
        title: "Systems and Networks",
        index: "03",
        modules: ["Linux", "Computer architecture", "Operating systems", "Computer networks", "TCP/IP", "DevOps"],
      },
      {
        title: "Applied Computing",
        index: "04",
        modules: [
          "Python",
          "HTML / CSS / JavaScript / PHP",
          "Engineering mathematics",
          "Electronic systems",
          "University work methodology",
          "Digital culture",
          "Final-year project",
        ],
      },
    ],
    workLabel: "Selected academic work",
    workTitle: "Learning through projects.",
    finalProject: "Final-year project",
    projectLink: "Read case study",
    directionLabel: "Engineering direction",
    directionTitle: "Building toward full-stack and DevOps.",
    directionText:
      "I’m interested in how APIs, backend architecture and databases connect to containers, automation and deployment. These are areas I’m continuing to explore as I develop as a software engineer.",
    backHome: "Back to portfolio",
  } as const;

export const academicWork: readonly {
  slug: ProjectSlug;
  note?: "finalProject";
}[] = [
  { slug: "harris-vs-cnn-feature-detection", note: "finalProject" },
  { slug: "estm-platform" },
  { slug: "secure-spring-boot-backend" },
  { slug: "marjane-ems" },
];

