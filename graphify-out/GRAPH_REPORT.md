# Graph Report - portfolio  (2026-10-09)

## Corpus Check
- 147 files · ~214,042 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 56 file(s) not represented in the graph (top: .csv 53, (none) 1, .ico 1)

## Summary
- 1473 nodes · 2190 edges · 138 communities (58 shown, 80 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.87)
- Token cost: 51,380 input · 15,370 output

## Community Hubs (Navigation)
- BM25 Search Core
- UI UX Data Quality Tests
- Design Token Validation
- Design Token Primitives
- Design Token Palette
- CIP Search Core
- Component Token Values
- Slide Search Formatting
- Design Token Types
- Icon Asset Generation
- Tailwind Configuration Tests
- Portfolio App Metadata
- Design System Formatter
- Tailwind Configuration Generator
- Next.js Project Configuration
- Slide Deck Generator
- Shadcn UI Configuration
- Background Image Fetching
- Catalog Contract Tests
- Tooltip Component Library
- TypeScript Compiler Settings
- UI UX Design System Generator
- Brand And Design Guidance
- Shadcn Component Tests
- Dropdown Menu Components
- Corporate Identity Generator
- Design Token Components
- Brand Color Extraction
- Design Reasoning Rules
- Catalog Refresh Tests
- Catalog Search Tests
- Brand Asset Validation
- Style Taxonomy Tests
- Web Stack Compatibility Tests
- Project Runtime Dependencies
- Domain Routing Tests
- Search Domain Tests
- Corporate Identity Renderer
- Token Validation Scripts
- Shadcn Component Installer
- Accessible Dark Palettes
- Theme Mode Resolution
- Text Layout Contract Tests
- Development Tool Dependencies
- Brand Reference Library
- Brand Context Injection
- Brand Token Synchronization
- Design Token Embedding
- Motion And Token Values
- Design System Search Logic
- Native Stack Compatibility Tests
- Card Component Library
- Design Token Generator
- Curated Design Data Tests
- Logo Design Search
- Tailwind Config Output Tests
- Dark Mode Design Tests
- Color Luminance Tests
- Logo Design Search Tool
- Design System Component Specs
- Design Token Radius Values
- Design System Generation
- Portfolio Build Commands
- UI UX Search Commands
- Relevance Evaluation Tests
- Design Token Shadow Values
- UI Styling System Guide
- Search Tokenizer Tests
- Dataset Provenance Tests
- Design Token Size Values
- BM25 Search Tests
- Search Ranking Metric Tests
- Extra Large Token Values
- Medium Token Values
- Default Token Values
- Test Fixture Validation
- Document Icon Artwork
- Next.js Brand Artwork
- Vercel Brand Artwork
- Prettier Formatting Settings
- Globe Icon Artwork
- Browser Window Artwork
- Banner Design Guidance
- Slide Layout Guidance
- Logo Color Psychology
- Logo Prompt Engineering
- Logo Style Guidance
- Continuous Integration Workflow
- Repository Agent Instructions
- Brand Update Workflow
- Brand Guidelines Template
- Slide Copywriting Formulas
- Slide Skill Invocation
- HTML Slide Template
- Apache License Terms
- Shadcn Theme Customization
- Tailwind Customization Guide
- Responsive Tailwind Layouts
- Tailwind Utility Guide
- UI Styling Dependencies
- UI Styling Test Dependencies
- UI UX Pro Max Skill
- Globe Icon Details
- Window Icon Details

## God Nodes (most connected - your core abstractions)
1. `TailwindConfigGenerator` - 58 edges
2. `TestTailwindConfigGenerator` - 35 edges
3. `DesignSystemGenerator` - 35 edges
4. `ShadcnInstaller` - 34 edges
5. `TestShadcnInstaller` - 26 edges
6. `compilerOptions` - 16 edges
7. `color` - 15 edges
8. `search()` - 15 edges
9. `CatalogRefreshTest` - 15 edges
10. `read_rows()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `TestShadcnInstaller` --uses--> `ShadcnInstaller`  [INFERRED]
  .agents/skills/ui-styling/scripts/tests/test_shadcn_add.py → .agents/skills/ui-styling/scripts/shadcn_add.py
- `TestGeneratedConfigIsValidJs` --uses--> `TailwindConfigGenerator`  [INFERRED]
  .agents/skills/ui-styling/scripts/tests/test_tailwind_config_gen.py → .agents/skills/ui-styling/scripts/tailwind_config_gen.py
- `TestTailwindConfigGenerator` --uses--> `TailwindConfigGenerator`  [INFERRED]
  .agents/skills/ui-styling/scripts/tests/test_tailwind_config_gen.py → .agents/skills/ui-styling/scripts/tailwind_config_gen.py
- `TestReasoningContract` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_data_contracts.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py
- `Slide deck strategies` --semantically_similar_to--> `Slide layout patterns`  [INFERRED] [semantically similar]
  .agents/skills/slides/references/slide-strategies.md → .agents/skills/slides/references/layout-patterns.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **UI Styling Skill combines shadcn/ui and Tailwind CSS layers** — agents_skills_ui_styling_skill_shadcn_ui, agents_skills_ui_styling_skill_tailwind_css [INFERRED]

## Communities (138 total, 80 thin omitted)

### Community 0 - "BM25 Search Core"
Cohesion: 0.06
Nodes (31): BM25, _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature() (+23 more)

### Community 1 - "UI UX Data Quality Tests"
Cohesion: 0.07
Nodes (43): read_rows(), TestAccessibilityGuidance, TestChartsTypographyAndIcons, TestCurrentReactGuidance, TestSemanticColors, _catalog_date(), _check_app_interface_contract(), _check_catalog_contract() (+35 more)

### Community 2 - "Design Token Validation"
Cohesion: 0.06
Nodes (17): get_context(), is_allowed_exception(), is_allowed_rgba(), is_inside_block(), load_css_variables(), main(), print_result(), print_summary() (+9 more)

### Community 3 - "Design Token Primitives"
Cohesion: 0.05
Nodes (53): $type, $value, $type, $value, $type, $value, $type, $value (+45 more)

### Community 4 - "Design Token Palette"
Cohesion: 0.04
Nodes (48): $type, $value, background, destructive, destructive-foreground, foreground, muted, muted-foreground (+40 more)

### Community 5 - "CIP Search Core"
Cohesion: 0.06
Nodes (13): BM25, detect_domain(), get_cip_brief(), _load_csv(), search(), search_all(), _search_csv(), BM25 (+5 more)

### Community 6 - "Component Token Values"
Cohesion: 0.06
Nodes (45): $type, $value, $type, $value, bg, fg, font-size, hover-bg (+37 more)

### Community 7 - "Slide Search Formatting"
Cohesion: 0.08
Nodes (17): format_context(), format_result(), main(), BM25, calculate_pattern_break(), detect_domain(), get_background_config(), get_color_for_emotion() (+9 more)

### Community 8 - "Design Token Types"
Cohesion: 0.06
Nodes (34): $type, $value, $type, $value, $type, $value, $type, $value (+26 more)

### Community 9 - "Icon Asset Generation"
Cohesion: 0.10
Nodes (13): apply_color(), apply_viewbox_size(), extract_svgs(), generate_batch(), generate_icon(), generate_sizes(), load_env(), main() (+5 more)

### Community 11 - "Portfolio App Metadata"
Cohesion: 0.07
Nodes (22): geistMono, geistSans, metadata, nextConfig, Automatic page updates during editing, bun dev, create-next-app bootstrap, Development server (+14 more)

### Community 12 - "Design System Formatter"
Cohesion: 0.10
Nodes (11): ansi_ljust(), _detect_page_type(), format_ascii_box(), format_master_md(), format_page_override_md(), _generate_intelligent_overrides(), hex_to_ansi(), persist_design_system() (+3 more)

### Community 14 - "Next.js Project Configuration"
Cohesion: 0.09
Nodes (22): eslintConfig, name, private, version, eslint, eslint-config-next, @hookform/resolvers, motion (+14 more)

### Community 15 - "Slide Deck Generator"
Cohesion: 0.13
Nodes (11): _e(), generate_chart_slide(), generate_cta_slide(), generate_deck(), generate_metrics_slide(), generate_problem_slide(), generate_solution_slide(), generate_testimonial_slide() (+3 more)

### Community 16 - "Shadcn UI Configuration"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "Background Image Fetching"
Cohesion: 0.16
Nodes (9): generate_css_for_background(), get_background_image(), get_curated_images(), get_overlay_css(), get_pexels_search_url(), load_backgrounds_config(), load_brand_colors(), main() (+1 more)

### Community 18 - "Catalog Contract Tests"
Cohesion: 0.16
Nodes (3): read_rows(), TestGeneratedCatalogContract, TestReasoningContract

### Community 19 - "Tooltip Component Library"
Cohesion: 0.15
Nodes (7): Badge(), badgeVariants, Button(), buttonVariants, @base-ui/react, class-variance-authority, cn

### Community 20 - "TypeScript Compiler Settings"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 21 - "UI UX Design System Generator"
Cohesion: 0.18
Nodes (3): DesignSystemGenerator, TestReasoningMatch, TestEndToEndCoherence

### Community 22 - "Brand And Design Guidance"
Cohesion: 0.12
Nodes (17): Banner sizes and art direction styles, CIP deliverable guide, CIP design reference, CIP mockup prompt engineering, CIP design style guide, Design routing guide, Icon design guide, Logo design guide (+9 more)

### Community 24 - "Dropdown Menu Components"
Cohesion: 0.12
Nodes (3): DropdownMenuContent(), DropdownMenuSubContent(), lucide-react

### Community 25 - "Corporate Identity Generator"
Cohesion: 0.19
Nodes (7): build_cip_prompt(), check_logo_required(), generate_cip_set(), generate_with_nano_banana(), load_env(), load_logo_image(), main()

### Community 26 - "Design Token Components"
Cohesion: 0.12
Nodes (16): $type, $value, $type, $value, $type, $value, $type, $value (+8 more)

### Community 27 - "Brand Color Extraction"
Cohesion: 0.20
Nodes (11): calculateCompliance(), colorDistance(), displayPalette(), extractHexColors(), findNearestBrandColor(), fs, generateImageMagickCommand(), hexToRgb() (+3 more)

### Community 28 - "Design Reasoning Rules"
Cohesion: 0.17
Nodes (4): apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), _validate_action()

### Community 31 - "Brand Asset Validation"
Cohesion: 0.25
Nodes (13): checkManifest(), formatBytes(), formatOutput(), fs, main(), parseFilename(), path, RULES (+5 more)

### Community 34 - "Project Runtime Dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @base-ui/react, class-variance-authority, cn, @hookform/resolvers, lucide-react, motion, next (+6 more)

### Community 37 - "Corporate Identity Renderer"
Cohesion: 0.21
Nodes (4): generate_html(), get_deliverable_info(), get_image_base64(), main()

### Community 38 - "Token Validation Scripts"
Cohesion: 0.24
Nodes (11): extensions, formatReport(), fs, getFiles(), main(), parseArgs(), path, patterns (+3 more)

### Community 42 - "Accessible Dark Palettes"
Cohesion: 0.24
Nodes (4): _contrast_ratio(), _derive_dark_palette(), _select_palette_for_mode(), TestPaletteSelection

### Community 43 - "Theme Mode Resolution"
Cohesion: 0.21
Nodes (4): _query_wants_dark(), _resolve_color_mode(), _style_is_dark_primary(), TestModeResolution

### Community 44 - "Text Layout Contract Tests"
Cohesion: 0.18
Nodes (3): read_rows(), TestTextLayoutDataContracts, TestTextLayoutRetrieval

### Community 45 - "Development Tool Dependencies"
Cohesion: 0.17
Nodes (12): devDependencies, eslint, eslint-config-next, @playwright/test, prettier, prettier-plugin-tailwindcss, tailwindcss, @tailwindcss/turbopack (+4 more)

### Community 46 - "Brand Reference Library"
Cohesion: 0.18
Nodes (11): approval checklist, asset organization, brand guideline template, color palette management, consistency checklist, logo usage rules, messaging framework, typography specifications (+3 more)

### Community 47 - "Brand Context Injection"
Cohesion: 0.31
Nodes (10): extractColorsFromTable(), extractCoreAttributes(), extractHexColors(), extractImageStyle(), extractTypography(), extractVoice(), fs, generatePromptAddition() (+2 more)

### Community 48 - "Brand Token Synchronization"
Cohesion: 0.25
Nodes (8): adjustBrightness(), { execFileSync }, extractColorsFromMarkdown(), fs, generateColorScale(), main(), path, updateDesignTokens()

### Community 49 - "Design Token Embedding"
Cohesion: 0.18
Nodes (8): args, fs, minimal, MINIMAL_TOKENS, path, projectRoot, tokensPath, wrapStyle

### Community 50 - "Motion And Token Values"
Cohesion: 0.18
Nodes (11): fast, normal, slow, $type, $value, $type, $value, primitive (+3 more)

### Community 54 - "Design Token Generator"
Cohesion: 0.36
Nodes (9): flattenTokens(), fs, generateCSS(), generateTailwind(), main(), parseArgs(), path, resolveReference() (+1 more)

### Community 56 - "Curated Design Data Tests"
Cohesion: 0.29
Nodes (3): split_values(), style_identities(), TestStyleIdentityContract

### Community 57 - "Logo Design Search"
Cohesion: 0.28
Nodes (3): format_brief(), format_results(), main()

### Community 61 - "Color Luminance Tests"
Cohesion: 0.31
Nodes (3): _palette_is_dark(), _relative_luminance(), TestLuminance

### Community 63 - "Design System Component Specs"
Cohesion: 0.25
Nodes (8): component specs, component tokens, primitive tokens, semantic tokens, states and variants, tailwind integration, token architecture, skill

### Community 64 - "Design Token Radius Values"
Cohesion: 0.29
Nodes (8): $type, $value, $type, $value, radius, default, full, default

### Community 65 - "Design System Generation"
Cohesion: 0.29
Nodes (3): format_markdown(), generate_design_system(), TestPersistence

### Community 67 - "Portfolio Build Commands"
Cohesion: 0.25
Nodes (8): scripts, build, dev, format, format:check, lint, start, typecheck

### Community 70 - "Design Token Shadow Values"
Cohesion: 0.47
Nodes (6): sm, shadow, sm, sm, $type, $value

### Community 71 - "UI Styling System Guide"
Cohesion: 0.33
Nodes (6): Canvas-based visual design system, shadcn accessibility patterns, shadcn component catalog, shadcn/ui component layer, Tailwind CSS styling layer, UI Styling Skill

### Community 74 - "Design Token Size Values"
Cohesion: 0.60
Nodes (5): lg, $type, $value, lg, lg

### Community 77 - "Extra Large Token Values"
Cohesion: 0.67
Nodes (4): xl, xl, $type, $value

### Community 78 - "Medium Token Values"
Cohesion: 0.67
Nodes (4): $type, $value, md, md

### Community 79 - "Default Token Values"
Cohesion: 0.67
Nodes (4): $type, $value, none, none

### Community 81 - "Document Icon Artwork"
Cohesion: 0.50
Nodes (4): Document file icon, Document outline with folded upper-right corner, Three horizontal document text lines, Gray icon fill (#666)

### Community 82 - "Next.js Brand Artwork"
Cohesion: 0.50
Nodes (4): Black vector path artwork, Next.js logo SVG asset, Next.js wordmark, SVG viewBox 0 0 394 80

### Community 83 - "Vercel Brand Artwork"
Cohesion: 0.50
Nodes (4): Filled triangular shape, Transparent canvas, Vercel SVG mark, White fill (#fff)

### Community 86 - "Globe Icon Artwork"
Cohesion: 0.67
Nodes (3): Globe icon, Latitude and longitude grid, Spherical Earth symbol

### Community 87 - "Browser Window Artwork"
Cohesion: 0.67
Nodes (3): Browser window icon, Three circular window controls, Window frame

## Knowledge Gaps
- **298 isolated node(s):** `fs`, `path`, `fs`, `path`, `fs` (+293 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 730 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TailwindConfigGenerator` connect `Tailwind Configuration Generator` to `Design Token Validation`, `Tailwind Configuration Tests`, `Tailwind Config Formatting`, `Tailwind Config Initialization`, `Tailwind Config Output Tests`, `Repeated Color Handling`, `Custom Breakpoint Handling`, `Plugin Duplicate Prevention`, `Plugin Recommendations`, `Next.js Plugin Recommendations`, `TypeScript Config Generation`, `Tailwind Default Initialization`, `Custom Color Configuration`, `Tailwind Config Validation`, `JavaScript Config Initialization`, `Tailwind Config File Output`, `Complete TypeScript Configuration`, `Framework Config Initialization`, `Custom Output Paths`, `Tailwind Color Configuration`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `ShadcnInstaller` connect `Shadcn Component Installer` to `Shadcn Config Detection`, `Missing Config Detection`, `Installed File Discovery`, `No Config Component Listing`, `Shadcn Config Tests`, `Shadcn Installation Workflow`, `Shadcn Installer Initialization`, `Shadcn Component Tests`, `Shadcn Add Command Tests`, `Component Dry Run Tests`, `Installed Component Listing Tests`, `Component Discovery Tests`, `Installer Default Settings`, `Installer Custom Settings`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `DesignSystemGenerator` connect `UI UX Design System Generator` to `Design System Generation`, `Design System Formatter`, `Dark Mode Design Tests`, `Catalog Contract Tests`, `Design System Search Logic`, `Curated Design Data Tests`, `Design Reasoning Rules`, `Catalog Refresh Tests`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `TailwindConfigGenerator` (e.g. with `TestGeneratedConfigIsValidJs` and `TestTailwindConfigGenerator`) actually correct?**
  _`TailwindConfigGenerator` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestReasoningMatch` and `TestReasoningContract`) actually correct?**
  _`DesignSystemGenerator` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `fs`, `path`, `fs` to the rest of the system?**
  _298 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BM25 Search Core` be split into smaller, more focused modules?**
  _Cohesion score 0.05563093622795115 - nodes in this community are weakly interconnected._