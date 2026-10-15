export const projectSlugs = [
  'oneep-it-asset-management',
  'estm-platform',
  'secure-spring-boot-backend',
  'harris-vs-cnn-feature-detection',
  'marjane-ems',
  'medtheg-prod',
  'portfolio',
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export const disciplines = ['Backend', 'Frontend', 'AI / Computer Vision'] as const;
export type Discipline = (typeof disciplines)[number];
export const projectFilters = ['All', ...disciplines] as const;
export type ProjectFilter = (typeof projectFilters)[number];

export type Project = {
  slug: ProjectSlug;
  title: string;
  category: string;
  summary: string;
  context?: string;
  repositoryUrl?: `https://github.com/${string}`;
  disciplines: readonly Discipline[];
  technologies: readonly string[];
  implementedFeatures: readonly string[];
  plannedFeatures: readonly string[];
  overview: string;
  architecture: readonly string[];
  engineeringDetails: readonly string[];
  delivery: readonly string[];
  status: string;
  verificationNotes: readonly string[];
};

/** Evidence-based summaries of the inspected local source repositories. */
export const projects: readonly Project[] = [
  {
    slug: 'oneep-it-asset-management',
    title: 'ONEEP IT Asset Management',
    category: 'Enterprise software',
    summary: 'A Laravel application for registering, searching and managing IT equipment records.',
    context: 'Local repository: Projet_ONEEP',
    repositoryUrl: 'https://github.com/ben-bader/PROJET-ONEEP.git',
    disciplines: ['Backend', 'Frontend'],
    technologies: ['PHP', 'Laravel 12', 'Blade', 'SQLite', 'Vite', 'Tailwind CSS', 'Alpine.js'],
    implementedFeatures: [
      'Create, view, update and delete peripheral records, with a searchable, paginated inventory.',
      'Manage employee, site and brand records through dedicated option pages.',
      'Associate equipment with employee, site and brand data; serial numbers have a database uniqueness constraint.',
      'Login uses employee matricule credentials and Laravel Breeze authentication scaffolding.',
    ],
    plannedFeatures: [],
    overview: 'The repository implements an asset inventory workflow around peripheral records and their organizational associations.',
    architecture: [
      'Laravel routes and controllers render Blade views and persist Eloquent models.',
      'The peripheral schema references employees by matricule and stores site and brand associations; migrations configure SQLite for the example environment.',
    ],
    engineeringDetails: [
      'Inventory listing can search designation, serial number, assignee and matricule, and is paginated.',
      'Inventory routes use authenticated and verified middleware. Some option-management routes are outside that middleware group and need a security review before deployment.',
    ],
    delivery: ['The repository includes Laravel Breeze example authentication tests; no asset-workflow-specific test suite was found.'],
    status: 'Implemented local application; production deployment was not verified.',
    verificationNotes: ['The repository README is the Laravel starter README, so the application behavior was verified from routes, controllers, migrations and views.'],
  },
  {
    slug: 'estm-platform',
    title: 'ESTM Platform',
    category: 'Institutional website',
    summary: 'A React website for browsing EST Meknes information, departments, admissions and contact pages.',
    context: 'Local repository: est-website',
    repositoryUrl: 'https://github.com/Meednj/ESTM-Website',
    disciplines: ['Frontend'],
    technologies: ['JavaScript', 'React 19', 'Vite', 'React Router 7', 'Tailwind CSS 4', 'Framer Motion', 'Lucide React', 'Lenis'],
    implementedFeatures: [
      'Routes for the home, about, department, admissions, contact and student pages.',
      'Responsive navigation with department and admissions menus.',
      'Home page carousel and institution, programme and news content rendered from local source data.',
    ],
    plannedFeatures: [],
    overview: 'This repository is a client-rendered institutional website built with React and Vite. It is not a Next.js application.',
    architecture: [
      'React Router maps page components under the shared application shell.',
      'The reviewed content is defined locally in the frontend; no API client or third-party data integration was found in the inspected source.',
    ],
    engineeringDetails: ['The home page includes a rotating hero carousel and reusable department and content sections.'],
    delivery: ['The package exposes Vite development/build scripts and an ESLint script. No project test script or automated deployment configuration was found.'],
    status: 'Frontend implementation present; content accuracy and deployment status were not verified.',
    verificationNotes: ['The source contradicts the supplied Next.js and third-party API description: the repository uses React/Vite and the inspected pages use local content.'],
  },
  {
    slug: 'secure-spring-boot-backend',
    title: 'Residence Management Backend',
    category: 'Backend engineering',
    summary: 'A Spring Boot REST backend for residence apartments, residents, contracts, complaints and payments.',
    context: 'Local repository: residence',
    repositoryUrl: 'https://github.com/Meednj/residence-handling-backend-system.git',
    disciplines: ['Backend'],
    technologies: ['Java 17', 'Spring Boot 4', 'Spring Web', 'Spring Data JPA', 'MySQL', 'Maven'],
    implementedFeatures: [
      'CRUD and query endpoints for apartments, residents, contracts, complaints and payments.',
      'Operations to find available apartments, query contracts by resident or apartment, and filter complaints and pending payments.',
      'Payment records can be marked paid; a background thread scans pending payments and appends a log entry.',
    ],
    plannedFeatures: [],
    overview: 'A modular REST application backed by JPA entities and a MySQL database for residence management workflows.',
    architecture: [
      'Spring MVC controllers delegate to repositories and services; entities model resident, apartment, contract, complaint and payment data.',
      'Contracts link residents and apartments; payments link to contracts.',
    ],
    engineeringDetails: [
      'The late-payment scan is started with a raw Java Thread and Runnable and writes findings to a text log.',
      'Spring Security is present as a dependency, but no SecurityFilterChain, user service or authorization rules were found. The application should not be described as secured.',
    ],
    delivery: ['Maven includes Spring Boot test support. The repository has a context-load smoke test; no container or CI deployment setup was found.'],
    status: 'Backend source and local MySQL configuration are present; production deployment was not verified.',
    verificationNotes: ['The original “Secure” title was corrected because security configuration could not be verified in the source.'],
  },
  {
    slug: 'harris-vs-cnn-feature-detection',
    title: 'Harris vs. CNN Feature Point Detection',
    category: 'AI / Computer Vision',
    summary: 'An interactive image tool that compares classical Harris corner detection with a CNN detector.',
    context: 'Local repository: mainProject / CornerDetector',
    repositoryUrl: 'https://github.com/Meednj/mainProject.git',
    disciplines: ['Backend', 'Frontend', 'AI / Computer Vision'],
    technologies: ['Python', 'Flask', 'PyTorch', 'OpenCV', 'NumPy', 'Pillow', 'MATLAB', 'HTML', 'JavaScript'],
    implementedFeatures: [
      'Upload an image and run the CNN detector and MATLAB Harris detector with adjustable thresholds and non-maximum suppression settings.',
      'Display detections as overlays and return detector parameters, corner counts and result data.',
      'CNN implementation uses an encoder-decoder with convolution blocks, max pooling, transposed-convolution upsampling, skip connections and a one-channel heatmap output.',
    ],
    plannedFeatures: [],
    overview: 'A browser-based comparison interface connects a Flask application to a PyTorch corner detector and a classical Harris implementation in MATLAB.',
    architecture: [
      'Flask coordinates uploaded images, CNN inference and a MATLAB subprocess; results are returned for browser rendering.',
      'The Harris code computes image derivatives, smooths second-moment terms, evaluates the Harris response and applies local-maximum suppression.',
    ],
    engineeringDetails: [
      'The CNN produces a heatmap from grayscale input; thresholding and non-maximum suppression select detected points.',
      'The plotted curves are sorted detection-score curves generated from detector scores. They are not accuracy, precision or recall measurements.',
    ],
    delivery: ['Python requirements and a browser interface are present. No verified benchmark values or deployment configuration were found.'],
    status: 'Research/prototype code is present; trained model quality and deployment were not independently verified.',
    verificationNotes: ['No benchmark results are presented because the inspected graph code plots detector scores rather than ground-truth evaluation metrics.'],
  },
  {
    slug: 'marjane-ems',
    title: 'Marjane EMS',
    category: 'Enterprise management system',
    summary: 'A Spring Boot and React management system for employee operations, schedules, availability and support tickets.',
    context: 'Local repository: marjane-ems-v2',
    repositoryUrl: 'https://github.com/Meednj/marjane_ems.git',
    disciplines: ['Backend', 'Frontend'],
    technologies: ['Java 21', 'Spring Boot 4', 'Spring Data JPA', 'Spring Security', 'JWT', 'MySQL', 'React 19', 'TypeScript', 'Vite', 'Axios', 'Docker Compose'],
    implementedFeatures: [
      'Backend modules expose employee, technician, department, team, shift, availability, presence, leave and ticket workflows.',
      'JWT authentication, BCrypt password encoding, stateless request filtering and role-based method restrictions are configured.',
      'React frontend communicates with the backend through an Axios API client.',
      'Docker Compose defines MySQL, backend and frontend services; GitHub Actions builds the Maven and frontend projects and builds the images.',
    ],
    plannedFeatures: [],
    overview: 'A full-stack employee and operations management application with a Spring REST API and a React/TypeScript client.',
    architecture: [
      'Spring MVC controllers expose JPA-backed domain workflows; the frontend uses React Router and Axios to call the API.',
      'The backend uses MySQL and a stateless JWT security filter. Compose describes the database and both application services.',
    ],
    engineeringDetails: [
      'The controller source contains 103 distinct HTTP method/path mappings after combining class-level RequestMapping prefixes with Get/Post/Put/Patch/Delete mappings and deduplicating verb/path pairs.',
      'An asynchronous audit logger uses a fixed two-thread executor to process selected POST and PUT audit events.',
    ],
    delivery: [
      'CI runs Maven packaging with tests skipped, installs frontend dependencies and runs the frontend build, then builds Docker images.',
      'The backend test tree contains a Spring context-load test; the CI workflow does not run a broader automated test suite.',
    ],
    status: 'Substantial application source and local container configuration are present; production deployment was not verified.',
    verificationNotes: ['The endpoint count counts distinct HTTP verb + expanded controller path combinations; class-level prefixes are included and duplicate combinations are collapsed.'],
  },
  {
    slug: 'medtheg-prod',
    title: 'MedTheG Prod',
    category: 'Digital products',
    summary: 'A music-production digital marketplace with a modular Spring backend and an API-connected React storefront.',
    context: 'Local repository: medtheg-prod',
    repositoryUrl: 'https://github.com/Meednj/medtheg-prod.git',
    disciplines: ['Backend', 'Frontend'],
    technologies: ['Java 21', 'Spring Boot 4', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'Spring Security', 'Redis', 'Stripe', 'MinIO', 'React 19', 'TypeScript', 'Vite', 'TanStack Query', 'Zustand', 'Docker Compose', 'Testcontainers'],
    implementedFeatures: [
      'Backend modules cover identity, catalog, sales, entitlements and the customer library.',
      'Published catalog products, Stripe Checkout handoff and signed, idempotent webhook handling for paid orders.',
      'Purchase entitlements are created after payment; library access checks entitlement before issuing short-lived MinIO download links.',
      'Frontend source includes API-backed catalog, product, authentication, checkout, order/library and administration flows.',
    ],
    plannedFeatures: [],
    overview: 'An actively developed digital marketplace for music-production products, with a modular Java backend and a Vite/React TypeScript client.',
    architecture: [
      'Backend is organized into identity, catalog, sales, entitlement and library modules with application, domain and infrastructure boundaries.',
      'PostgreSQL schema changes are managed with Flyway; Hibernate validates the schema. Local Compose infrastructure includes PostgreSQL, Redis, MinIO, Prometheus and Grafana.',
    ],
    engineeringDetails: [
      'Identity uses BCrypt password hashing and JWT bearer tokens; product previews and library downloads use short-lived MinIO URLs.',
      'Stripe webhook processing verifies signatures and handles paid events idempotently; entitlement creation is deferred until transaction commit.',
      'Request IDs, audit events and Actuator/Prometheus instrumentation support operational visibility.',
    ],
    delivery: ['The repository includes Testcontainers PostgreSQL support and backend tests. No production deployment or cloud infrastructure was verified.'],
    status: 'In active development. Repository documentation describes additional roadmap work; only functionality present in current source is listed above.',
    verificationNotes: ['The root README has stale frontend wording; current frontend source and API client were inspected directly. Deployment status and public availability were not verified.'],
  },
  {
    slug: 'portfolio',
    title: 'Personal portfolio',
    category: 'Web development',
    summary: 'A Next.js portfolio presenting selected engineering projects through a filtered showcase and static detail routes.',
    context: 'Current portfolio repository',
    disciplines: ['Frontend'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Lucide React', 'Motion', 'Vitest', 'Playwright'],
    implementedFeatures: [
      'Project showcase with discipline filters and stable project slugs.',
      'Static project detail routes generated from typed project data.',
      'Interactive system map, responsive navigation, reduced-motion-aware animation and accessible skip navigation.',
      'Unit tests for project data and Playwright end-to-end route coverage.',
    ],
    plannedFeatures: [],
    overview: 'This site documents selected engineering work with a reusable data model and dedicated project pages.',
    architecture: ['Next.js App Router pages use Server Components by default; interactive portfolio features are isolated in client components.'],
    engineeringDetails: ['Project content is typed in a central TypeScript module and drives both the showcase and statically generated detail routes.'],
    delivery: ['The repository includes lint, typecheck, unit-test, Playwright and production-build commands.'],
    status: 'The portfolio is under active development.',
    verificationNotes: [],
  },
];

export const showcaseProjects: readonly Project[] = projects.filter(
  ({ slug }) => slug !== 'portfolio',
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function filterShowcaseProjects(filter: ProjectFilter): readonly Project[] {
  if (filter === 'All') return showcaseProjects;
  return showcaseProjects.filter(({ disciplines }) => disciplines.includes(filter));
}
