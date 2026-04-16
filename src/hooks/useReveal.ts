import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Also reveal children with .reveal class
            entry.target.querySelectorAll(".reveal").forEach((child) => {
              child.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the container itself
    if (el.classList.contains("reveal")) {
      observer.observe(el);
    }
    // Observe children with .reveal class
    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}
