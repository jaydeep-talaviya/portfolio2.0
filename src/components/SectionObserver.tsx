import { useEffect, useState } from "react";

const SECTIONS = ["home", "about", "experience", "projects", "certifications", "contact"];

export default function SectionObserver() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const section = entry.target.id;
              setActive(section);
              window.dispatchEvent(new CustomEvent("section-change", { detail: section }));
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
