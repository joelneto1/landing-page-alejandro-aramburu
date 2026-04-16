import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** On mobile, trigger much earlier so animations fire as soon as the section peeks in */
const triggerStart = () => (window.innerWidth < 768 ? "top 98%" : "top 82%");

/**
 * Gentle scroll-triggered reveal for a section container.
 * Animates children with `.gsap-fade` class.
 */
export function useScrollReveal(options?: { stagger?: number; y?: number; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const els = ref.current.querySelectorAll(".gsap-fade");
    if (els.length === 0) return;

    if (prefersReducedMotion()) {
      // Ensure content is visible even when animations are off
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(els, { opacity: 0, y: options?.y ?? 40 });

    const ctx = gsap.context(() => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.9,
        stagger: options?.stagger ?? 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart(),
          once: true,
        },
      });
    }, ref);

    // Safety fallback: if GSAP hasn't animated after 5s, show everything
    const fallback = setTimeout(() => {
      els.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (parseFloat(getComputedStyle(htmlEl).opacity) < 0.5) {
          gsap.set(el, { opacity: 1, y: 0 });
        }
      });
    }, 5000);

    return () => {
      clearTimeout(fallback);
      ctx.revert();
    };
  }, [options?.stagger, options?.y, options?.duration]);

  return ref;
}

/**
 * GSAP timeline for hero entrance (runs on mount, not scroll-triggered).
 */
export function useHeroTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.7 })
        .from(".hero-headline", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".hero-body", { opacity: 0, y: 25, duration: 0.7 }, "-=0.4")
        .from(".hero-badges", { opacity: 0, x: -20, duration: 0.6 }, "-=0.3")
        .from(".hero-cta-wrap", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2")
        .from(".hero-image-wrap", { opacity: 0, scale: 0.92, duration: 1 }, "-=0.8")
        .from(".hero-float-badge", { opacity: 0, scale: 0.5, duration: 0.5, ease: "back.out(2)" }, "-=0.3");
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Subtle scale-in for a single element on scroll.
 */
export function useScaleIn(options?: { scale?: number; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1, scale: 1 });
      return;
    }

    gsap.set(ref.current, { opacity: 0, scale: options?.scale ?? 0.85 });

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        scale: 1,
        duration: options?.duration ?? 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart(),
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [options?.scale, options?.duration]);

  return ref;
}

/**
 * Slide-in from a direction on scroll.
 */
export function useSlideIn(direction: "left" | "right" = "left", options?: { distance?: number; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1, x: 0 });
      return;
    }

    const x = direction === "left" ? -(options?.distance ?? 60) : (options?.distance ?? 60);
    gsap.set(ref.current, { opacity: 0, x });

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        x: 0,
        duration: options?.duration ?? 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart(),
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [direction, options?.distance, options?.duration]);

  return ref;
}
