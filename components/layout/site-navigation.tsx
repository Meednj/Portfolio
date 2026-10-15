"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { BrandMark } from "@/components/layout/brand-mark";

type Destination = "home" | "projects" | "education";

const links: readonly {
  key: Destination;
  number: string;
  href: string;
  label: string;
}[] = [
  { key: "home", number: "01", href: "/#top", label: "Home" },
  { key: "projects", number: "02", href: "/#projects", label: "Projects" },
  { key: "education", number: "03", href: "/education", label: "Education" },
];

function WordmarkName() {
  return (
    <span className="navbar-wordmark-name">
      <span className="navbar-wordmark-primary">NEJJARI</span>
      <span className="navbar-wordmark-secondary">Mohamed</span>
    </span>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const activeDestination: Destination = pathname === "/education"
    ? "education"
    : pathname.startsWith("/projects/") || (pathname === "/" && activeHash === "#projects")
      ? "projects"
      : "home";

  function closeMenu(restoreFocus = false) {
    setMenuOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    const first = focusable.item(0);
    const last = focusable.item(focusable.length - 1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <header className="site-header">
      <div className="shell header-masthead">
        <div className="header-topline">
          <Link aria-label="Mohamed Nejjari, home" className="wordmark" href="/#top">
            <BrandMark className="wordmark-mark" />
            <WordmarkName />
          </Link>

          <p className="masthead-note">
            <span className="mono-label">Software engineering</span>
            <span aria-hidden="true" className="masthead-divider" />
            <span>Full Stack / DevOps</span>
          </p>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="mobile-menu-trigger"
            onClick={() => setMenuOpen(true)}
            ref={triggerRef}
            type="button"
          >
            <Menu aria-hidden="true" size={17} />
            <span>Menu</span>
          </button>
        </div>

        <div className="desktop-nav">
          <nav aria-label="Main navigation" className="nav-links">
            {links.map((link) => {
              const active = activeDestination === link.key;
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`nav-link${active ? " nav-link-active" : ""}`}
                  href={link.href}
                  key={link.key}
                >
                  <span aria-hidden="true" className="nav-link-number">{link.number}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="nav-actions">
            <Link className="nav-contact" href="/#contact">
              Get in touch
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div
          aria-label="Mobile navigation"
          aria-modal="true"
          className="mobile-menu-overlay"
          id="mobile-navigation"
          onKeyDown={handleDialogKeyDown}
          role="dialog"
        >
          <div className="mobile-menu-topline">
            <Link aria-label="Mohamed Nejjari, home" className="wordmark" href="/#top" onClick={() => closeMenu()}>
              <BrandMark className="wordmark-mark" />
              <WordmarkName />
            </Link>
            <button
              aria-label="Close navigation"
              className="mobile-menu-close"
              onClick={() => closeMenu(true)}
              ref={closeRef}
              type="button"
            >
              <X aria-hidden="true" size={17} />
              <span>Close</span>
            </button>
          </div>

          <nav aria-label="Main navigation" className="mobile-nav-links">
            {links.map((link) => {
              const active = activeDestination === link.key;
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`mobile-nav-link${active ? " nav-link-active" : ""}`}
                  href={link.href}
                  key={link.key}
                  onClick={() => closeMenu()}
                >
                  <span aria-hidden="true" className="mobile-nav-number">{link.number}</span>
                  <span>{link.label}</span>
                  <ArrowUpRight aria-hidden="true" size={20} />
                </Link>
              );
            })}
          </nav>

          <div className="mobile-menu-bottom">
            <Link className="nav-contact" href="/#contact" onClick={() => closeMenu()}>
              Get in touch
              <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
