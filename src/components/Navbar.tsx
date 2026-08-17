import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = links.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b"
          : "bg-transparent"
      }`}
      style={{ borderColor: scrolled ? "var(--color-border)" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--color-accent)" }}
        >
          JT<span style={{ color: "var(--color-text)" }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color:
                  active === link.href
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "var(--color-accent)",
              color: "var(--color-accent)",
            }}
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "var(--color-accent)",
              transform: mobileOpen
                ? "rotate(45deg) translate(2px, 2px)"
                : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "var(--color-accent)",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "var(--color-accent)",
              transform: mobileOpen
                ? "rotate(-45deg) translate(2px, -2px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 space-y-4 border-b"
          style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium transition-colors duration-200"
              style={{
                color:
                  active === link.href
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="inline-block px-4 py-2 text-sm font-medium rounded-lg border"
            style={{
              borderColor: "var(--color-accent)",
              color: "var(--color-accent)",
            }}
          >
            Let's Connect
          </a>
        </div>
      )}
    </nav>
  );
}
