import { EngineeringFocus } from "@/components/sections/engineering-focus";
import { Hero } from "@/components/sections/hero";
import { HowIWork } from "@/components/sections/how-i-work";
import { ProjectPreview } from "@/components/sections/project-preview";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <EngineeringFocus />
        <HowIWork />
        <ProjectPreview />
      </main>
      <SiteFooter />
    </>
  );
}
