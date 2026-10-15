import { expect, test } from "@playwright/test";
import { projects, showcaseProjects } from "../../data/projects";
import { workingPrinciples } from "../../data/working-principles";

test("homepage shows the project preview and working detail links", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Mohamed Nejjari — Software Engineer");
  await expect(page.getByRole("heading", { level: 1, name: "NEJJARI Mohamed" })).toBeVisible();
  await expect(page.getByText("Software engineering · Full Stack / DevOps")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Six projects. Different systems." }),
  ).toBeVisible();

  for (const project of showcaseProjects) {
    const cardLink = page.getByRole("link", { name: project.title, exact: true });
    await expect(cardLink).toBeVisible();
    await expect(cardLink).toHaveAttribute("href", `/projects/${project.slug}`);
    const sourceLink = page.getByRole("link", {
      name: `View ${project.title} source on GitHub`,
    });
    if (project.repositoryUrl) {
      await expect(sourceLink).toHaveAttribute("href", project.repositoryUrl);
      await expect(sourceLink).toHaveAttribute("target", "_blank");
      await expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");
    } else {
      await expect(sourceLink).toHaveCount(0);
    }
  }
});

test("navbar wordmark keeps its name hierarchy across viewport sizes", async ({ page }) => {
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const name = page.locator(".header-topline .navbar-wordmark-name");
    const primary = name.locator(".navbar-wordmark-primary");
    const secondary = name.locator(".navbar-wordmark-secondary");
    await expect(primary).toHaveText("NEJJARI");
    await expect(secondary).toHaveText("Mohamed");
    await expect(primary).toHaveCSS("font-weight", "800");
    await expect(secondary).toHaveCSS("font-size", "10.56px");
    await expect(name).toBeVisible();
    expect(await page.locator("body").evaluate((body) => body.scrollWidth)).toBeLessThanOrEqual(width);
    if (process.env.WORDMARK_VISUAL_QA === "1") {
      await page.screenshot({ path: `.next/wordmark-${width}.png` });
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  const mobileName = page.locator(".mobile-menu-topline .navbar-wordmark-name");
  await expect(mobileName.locator(".navbar-wordmark-primary")).toHaveText("NEJJARI");
  await expect(mobileName.locator(".navbar-wordmark-secondary")).toHaveText("Mohamed");
  if (process.env.WORDMARK_VISUAL_QA === "1") {
    await page.waitForTimeout(250);
    await page.screenshot({ path: ".next/wordmark-mobile-menu.png" });
  }
});

test("brand logo and browser icons resolve from the App Router metadata", async ({ page }) => {
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    for (const selector of ["header .wordmark img", "footer .wordmark img"]) {
      const logo = page.locator(selector);
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute("alt", "");
      await expect(logo).toHaveJSProperty("naturalWidth", 454);
      await expect(logo).toHaveJSProperty("naturalHeight", 316);
    }

    expect(await page.locator("body").evaluate((body) => body.scrollWidth)).toBeLessThanOrEqual(width);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const icon = page.locator('link[rel="icon"][type="image/png"]');
  await expect(icon).toHaveCount(1);
  const iconResponse = await page.request.get(new URL(await icon.getAttribute("href") ?? "", page.url()).toString());
  expect(iconResponse.ok()).toBeTruthy();
  expect(iconResponse.headers()["content-type"]).toContain("image/png");

  const appleIcon = page.locator('link[rel="apple-touch-icon"]');
  await expect(appleIcon).toHaveCount(1);
  const appleResponse = await page.request.get(new URL(await appleIcon.getAttribute("href") ?? "", page.url()).toString());
  expect(appleResponse.ok()).toBeTruthy();
});

test("page metadata and crawler files use the configured canonical origin", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /software engineering student focused on backend engineering/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  const siteUrl = process.env.SITE_URL;
  const canonical = page.locator('link[rel="canonical"]');
  const socialImage = page.locator('meta[property="og:image"]');

  if (siteUrl) {
    await expect(canonical).toHaveAttribute("href", siteUrl);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      siteUrl,
    );
    await expect(socialImage).toHaveAttribute("content", `${siteUrl}/cv/photo.jpg`);

    const photoResponse = await page.request.get("/cv/photo.jpg");
    expect(photoResponse.ok()).toBeTruthy();
    expect(photoResponse.headers()["content-type"]).toContain("image/jpeg");
  } else {
    await expect(canonical).toHaveCount(0);
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
    await expect(socialImage).toHaveCount(0);
  }

  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.ok()).toBeTruthy();
  const robots = await robotsResponse.text();
  expect(robots).toContain("User-Agent: *");
  expect(robots).toContain("Allow: /");

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  if (siteUrl) {
    expect(sitemap).toContain(`${siteUrl}/education`);
    for (const project of projects) {
      expect(sitemap).toContain(`${siteUrl}/projects/${project.slug}`);
    }
    expect(robots).toContain(`${siteUrl}/sitemap.xml`);
  } else {
    expect(sitemap).not.toContain("<loc>");
    expect(robots).not.toContain("Sitemap:");
  }
});

test("contact links use the public CV destinations", async ({ page }) => {
  await page.goto("/");

  const contact = page.getByRole("navigation", { name: "Contact links" });
  await expect(contact.getByRole("link", { name: "Email me" })).toHaveAttribute(
    "href",
    "mailto:mohamednejjari561@gmail.com",
  );
  await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://linkedin.com/in/mohamed-nejjari-20j07j06",
  );
  await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
  await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "target",
    "_blank",
  );
  await expect(contact.getByRole("link", { name: "View CV" })).toHaveAttribute(
    "href",
    "/cv/mohamed-nejjari-cv.pdf",
  );
});

test("unknown project slugs return a noindex not-found page", async ({ page }) => {
  const response = await page.goto("/projects/not-a-real-project");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /That address/ })).toBeVisible();
  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveCount(1);
  await expect(robots).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page).toHaveTitle("Page not found | Mohamed Nejjari");
  await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute(
    "href",
    "/",
  );
});

test("hero CV actions open and download the public PDF", async ({ page }) => {
  await page.goto("/");

  const viewLink = page.getByRole("link", {
    name: "View Mohamed Nejjari's CV as a PDF in a new tab",
  });
  await expect(viewLink).toHaveAttribute("href", "/cv/mohamed-nejjari-cv.pdf");
  await expect(viewLink).toHaveAttribute("target", "_blank");
  await expect(viewLink).toHaveAttribute("rel", "noopener noreferrer");
  const downloadLink = page.getByRole("link", {
    name: "Download Mohamed Nejjari's CV as a PDF",
  });
  await expect(downloadLink).toHaveAttribute("href", "/cv/mohamed-nejjari-cv.pdf");
  await expect(downloadLink).toHaveAttribute("download", "Mohamed-Nejjari-CV.pdf");

  const assetResponse = await page.request.get(
    new URL("/cv/mohamed-nejjari-cv.pdf", page.url()).toString(),
  );
  expect(assetResponse.ok()).toBeTruthy();
  expect(assetResponse.headers()["content-type"]).toContain("application/pdf");
  expect((await assetResponse.body()).subarray(0, 5).toString()).toBe("%PDF-");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadLink.click(),
  ]);
  expect(download.suggestedFilename()).toBe("Mohamed-Nejjari-CV.pdf");
});

test("project discipline filters update the visible showcase", async ({ page }) => {
  await page.goto("/#projects");
  const filters = page.getByRole("group", { name: "Filter projects by discipline" });
  await filters.getByRole("button", { name: "AI / Computer Vision" }).click();
  await expect(page.getByRole("link", { name: "Harris vs. CNN Feature Point Detection", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "ONEEP IT Asset Management", exact: true })).toHaveCount(0);
  await filters.getByRole("button", { name: "All" }).click();
  await expect(page.getByRole("link", { name: "ONEEP IT Asset Management", exact: true })).toBeVisible();
});

test("How I Work exposes six keyboard-selectable principles and factual project contexts", async ({ page, browser }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const section = page.locator("#how-i-work");
  await expect(section.getByRole("heading", { name: "Different environments. One engineering mindset." })).toBeVisible();
  await expect(section.getByText("I adapt to the problem, the team, and the constraints.", { exact: false })).toBeVisible();

  const choices = section.getByRole("group", { name: "Select a working principle" });
  const panel = section.locator("#working-principle-detail");
  for (const [index, principle] of workingPrinciples.entries()) {
    const button = choices.getByRole("button", { name: new RegExp(principle.title) });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-pressed", index === 0 ? "true" : "false");
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(panel.getByRole("heading", { name: principle.coreIdea })).toBeVisible();
    await expect(panel.getByRole("heading", { name: "In practice" })).toBeVisible();
    await expect(panel.locator("ul li")).toHaveCount(4);
    if ("projectContext" in principle && principle.projectContext) {
      await expect(panel.getByRole("link", { name: new RegExp(principle.projectContext.title) }))
        .toHaveAttribute("href", `/projects/${principle.projectContext.slug}`);
    }
  }

  const keyboardChoice = choices.getByRole("button", { name: /Team collaboration/ });
  await keyboardChoice.focus();
  await page.keyboard.press("Space");
  await expect(keyboardChoice).toHaveAttribute("aria-pressed", "true");

  const touchContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const touchPage = await touchContext.newPage();
  await touchPage.goto("/");
  const touchSection = touchPage.locator("#how-i-work");
  await touchSection.getByRole("button", { name: /Ownership and reliability/ }).tap();
  await expect(touchSection.getByRole("button", { name: /Ownership and reliability/ })).toHaveAttribute("aria-pressed", "true");
  expect(await touchPage.locator("body").evaluate((body) => body.scrollWidth)).toBeLessThanOrEqual(390);
  await touchContext.close();
});

for (const project of projects) {
  test(`project detail route renders ${project.title}`, async ({ page }) => {
    await page.goto(`/projects/${project.slug}`);

    await expect(page).toHaveTitle(`${project.title} | Mohamed Nejjari`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      project.summary,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      `${project.title} | Mohamed Nejjari`,
    );
    if (process.env.SITE_URL) {
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${process.env.SITE_URL}/projects/${project.slug}`,
      );
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        `${process.env.SITE_URL}/projects/${project.slug}`,
      );
    }
    await expect(page.getByRole("heading", { level: 1, name: project.title })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Implemented functionality" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Architecture and implementation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Engineering details" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Testing and delivery" })).toBeVisible();

    const sourceLink = page.getByRole("link", {
      name: `View ${project.title} source on GitHub`,
    });
    if (project.repositoryUrl) {
      await expect(sourceLink).toHaveAttribute("href", project.repositoryUrl);
      await expect(sourceLink).toHaveAttribute("target", "_blank");
      await expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");
    } else {
      await expect(sourceLink).toHaveCount(0);
    }
    await expect(page.getByRole("heading", { name: "Technologies" })).toBeVisible();

    const backLink = page.getByRole("link", { name: "Back to projects" });
    await expect(backLink).toHaveAttribute("href", "/#projects");
    await backLink.click();
    await expect(page).toHaveURL(/\/#projects$/);
    await expect(page.getByRole("heading", { name: "Six projects. Different systems." })).toBeVisible();
  });
}

test("mobile editorial navigation supports keyboard dismissal and keeps the page in bounds", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("link", { name: "View Mohamed Nejjari's CV as a PDF in a new tab" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download Mohamed Nejjari's CV as a PDF" })).toBeVisible();

  const menuButton = page.getByRole("button", { name: "Open navigation" });
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await menuButton.click();
  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  const navigation = dialog.getByRole("navigation", { name: "Main navigation" });
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog).toHaveCSS("opacity", "1");
  const dialogCoversViewportBottom = await page.evaluate(() => {
    const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight - 2);
    return element?.closest(".mobile-menu-overlay") !== null;
  });
  expect(dialogCoversViewportBottom).toBeTruthy();
  await expect(navigation.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Education" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Get in touch" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close navigation" })).toBeFocused();
  await dialog.getByRole("link", { name: "Mohamed Nejjari, home" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Get in touch" })).toBeFocused();
  await expect(dialog.locator(".language-toggle")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await menuButton.click();
  await dialog.getByRole("button", { name: "Close navigation" }).click();
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  const pageWidth = await page.locator("body").evaluate((body) => body.scrollWidth);
  expect(pageWidth).toBeLessThanOrEqual(390);
});

test("mobile navigation opens by touch and honors reduced motion", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  const trigger = page.locator(".mobile-menu-trigger");
  await trigger.tap();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("dialog", { name: "Mobile navigation" }).getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Projects" })).toBeVisible();
  const animation = await page.locator(".mobile-menu-overlay").evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe("none");
  const pageWidth = await page.locator("body").evaluate((body) => body.scrollWidth);
  expect(pageWidth).toBeLessThanOrEqual(390);
  await context.close();
});

test("education page provides the academic overview and linked project work", async ({ page }) => {
  await page.goto("/education");

  await expect(page).toHaveTitle("Education | Mohamed Nejjari");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Academic path, curriculum themes/,
  );
  if (process.env.SITE_URL) {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${process.env.SITE_URL}/education`,
    );
  }
  await expect(page.getByRole("heading", { name: "From foundations to engineering." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "DUT in Computer Science" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Engineering studies · ING 1" })).toBeVisible();
  await expect(page.getByText("Top 5 in a cohort of approximately 130 students.")).toBeVisible();

  const softwareEngineering = page.locator(".curriculum-item").nth(0);
  await expect(softwareEngineering.locator("li", { hasText: "Java and object-oriented programming" })).toBeVisible();
  const databases = page.locator(".curriculum-item").nth(1);
  await databases.locator("summary").click();
  await expect(databases.locator("li", { hasText: "PostgreSQL" })).toBeVisible();
  await expect(softwareEngineering.locator("li", { hasText: "Java and object-oriented programming" })).toBeVisible();

  for (const slug of [
    "harris-vs-cnn-feature-detection",
    "estm-platform",
    "secure-spring-boot-backend",
    "marjane-ems",
  ]) {
    await expect(page.locator(`a[href="/projects/${slug}"]`)).toBeVisible();
  }
});

test("navigation labels stay readable and active states follow the current route", async ({ page }) => {
  for (const width of [1440, 1024, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const navigation = page.getByRole("navigation", { name: "Main navigation" });
    for (const label of ["Home", "Projects", "Education"]) {
      const link = navigation.getByRole("link", { name: new RegExp(label) });
      await expect(link).toBeVisible();
      await expect(link).toHaveCSS("white-space", "nowrap");
    }

    const bounds = await navigation.locator(".nav-link").evaluateAll((links) =>
      links.map((link) => {
        const rect = link.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: rect.width };
      }),
    );
    expect(bounds.every((item) => item.width > 0)).toBeTruthy();
    expect(bounds[0].right).toBeLessThanOrEqual(bounds[1].left);
    expect(bounds[1].right).toBeLessThanOrEqual(bounds[2].left);
    await expect(navigation.getByRole("link", { name: /Home/ })).toHaveAttribute("aria-current", "page");
    await expect(page.locator(".language-toggle")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /switch the site|passer le site/i })).toHaveCount(0);
  }

  await page.goto("/education");
  const educationNavigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(educationNavigation.getByRole("link", { name: /Education/ })).toHaveAttribute("aria-current", "page");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "From foundations to engineering." })).toBeVisible();

  await page.goto("/projects/medtheg-prod");
  const projectNavigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(projectNavigation.getByRole("link", { name: /Projects/ })).toHaveAttribute("aria-current", "page");
});
