import { useEffect, useRef, useCallback } from "react";
import anime from "animejs";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Use threshold 0 on mobile so animations always trigger */
const getThreshold = (desktop: number) =>
  window.innerWidth < 768 ? 0 : desktop;

/**
 * Animate a number counter (e.g., 181 → 27).
 * Returns a ref to attach to the element displaying the number.
 */
export function useCounterAnimation(from: number, to: number, options?: { duration?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  const trigger = useCallback(() => {
    if (hasRun.current || !ref.current) return;
    hasRun.current = true;

    const prefix = options?.prefix ?? "";
    const suffix = options?.suffix ?? "";

    // If reduced motion, just set final value instantly
    if (prefersReducedMotion()) {
      ref.current.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const obj = { value: from };
    anime({
      targets: obj,
      value: to,
      round: 1,
      duration: options?.duration ?? 1500,
      easing: "easeOutExpo",
      update: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${obj.value}${suffix}`;
        }
      },
    });
  }, [from, to, options?.duration, options?.prefix, options?.suffix]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: getThreshold(0.2) }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger]);

  return ref;
}

/**
 * Stagger animation for a list of children.
 * Children should have `data-anime="stagger"` attribute.
 */
export function useStaggerReveal(options?: { translateY?: number; delay?: number; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.querySelectorAll("[data-anime='stagger']");
    if (children.length === 0) return;

    const ty = options?.translateY ?? 30;

    // Set initial state
    children.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = `translateY(${ty}px)`;
    });

    const showAll = () => {
      children.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateY(0)";
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasRun.current) {
          hasRun.current = true;

          if (prefersReducedMotion()) {
            showAll();
            observer.disconnect();
            return;
          }

          anime({
            targets: children,
            opacity: [0, 1],
            translateY: [ty, 0],
            duration: 800,
            delay: anime.stagger(options?.stagger ?? 120, { start: options?.delay ?? 0 }),
            easing: "easeOutCubic",
          });

          observer.disconnect();
        }
      },
      { threshold: getThreshold(0.1) }
    );

    observer.observe(ref.current);

    // Safety net: if observer hasn't fired after 4s, show content anyway
    const fallback = setTimeout(() => {
      if (!hasRun.current) {
        hasRun.current = true;
        showAll();
        observer.disconnect();
      }
    }, 4000);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [options?.translateY, options?.delay, options?.stagger]);

  return ref;
}

/**
 * Gentle pulse animation — draws attention to a key element (e.g., guarantee seal).
 * Pulses scale once on scroll reveal.
 */
export function usePulseReveal(options?: { scale?: number; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    // Set initial hidden state
    ref.current.style.opacity = "0";
    ref.current.style.transform = `scale(${options?.scale ?? 0.6})`;

    const showFinal = () => {
      if (ref.current) {
        ref.current.style.opacity = "1";
        ref.current.style.transform = "scale(1)";
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasRun.current) {
          hasRun.current = true;

          if (prefersReducedMotion()) {
            showFinal();
            observer.disconnect();
            return;
          }

          anime({
            targets: ref.current,
            scale: [options?.scale ?? 0.6, 1],
            opacity: [0, 1],
            duration: options?.duration ?? 900,
            easing: "easeOutElastic(1, .6)",
          });

          observer.disconnect();
        }
      },
      { threshold: getThreshold(0.1) }
    );

    observer.observe(ref.current);

    const fallback = setTimeout(() => {
      if (!hasRun.current) {
        hasRun.current = true;
        showFinal();
        observer.disconnect();
      }
    }, 4000);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [options?.scale, options?.duration]);

  return ref;
}

/**
 * Typewriter-style reveal for paragraphs — fades in one by one with a slide.
 * Wrap paragraphs in a container, each child with `data-anime="paragraph"`.
 */
export function useParagraphReveal(options?: { stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const paragraphs = ref.current.querySelectorAll("[data-anime='paragraph']");
    if (paragraphs.length === 0) return;

    paragraphs.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateX(-20px)";
    });

    const showAll = () => {
      paragraphs.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateX(0)";
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasRun.current) {
          hasRun.current = true;

          if (prefersReducedMotion()) {
            showAll();
            observer.disconnect();
            return;
          }

          anime({
            targets: paragraphs,
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 700,
            delay: anime.stagger(options?.stagger ?? 180),
            easing: "easeOutCubic",
          });

          observer.disconnect();
        }
      },
      { threshold: getThreshold(0.05) }
    );

    observer.observe(ref.current);

    const fallback = setTimeout(() => {
      if (!hasRun.current) {
        hasRun.current = true;
        showAll();
        observer.disconnect();
      }
    }, 4000);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [options?.stagger]);

  return ref;
}

/**
 * Highlight border draw — animates a left border from 0 to full height.
 * Apply to a container element with a left border.
 */
export function useBorderDraw(options?: { duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    el.style.clipPath = "inset(0 0 100% 0)";
    el.style.opacity = "0";

    const showFinal = () => {
      el.style.clipPath = "inset(0 0 0% 0)";
      el.style.opacity = "1";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasRun.current) {
          hasRun.current = true;

          if (prefersReducedMotion()) {
            showFinal();
            observer.disconnect();
            return;
          }

          anime({
            targets: el,
            opacity: [0, 1],
            duration: 400,
            easing: "easeOutCubic",
          });

          anime({
            targets: el,
            clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
            duration: options?.duration ?? 800,
            easing: "easeOutCubic",
          });

          observer.disconnect();
        }
      },
      { threshold: getThreshold(0.1) }
    );

    observer.observe(el);

    const fallback = setTimeout(() => {
      if (!hasRun.current) {
        hasRun.current = true;
        showFinal();
        observer.disconnect();
      }
    }, 4000);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [options?.duration]);

  return ref;
}

/**
 * Star fill animation — fills stars sequentially.
 */
export function useStarFill() {
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const stars = ref.current.querySelectorAll("[data-star]");
    if (stars.length === 0) return;

    stars.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "scale(0)";
    });

    const showAll = () => {
      stars.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "scale(1)";
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasRun.current) {
          hasRun.current = true;

          if (prefersReducedMotion()) {
            showAll();
            observer.disconnect();
            return;
          }

          anime({
            targets: stars,
            opacity: [0, 1],
            scale: [0, 1],
            duration: 400,
            delay: anime.stagger(100),
            easing: "easeOutBack",
          });

          observer.disconnect();
        }
      },
      { threshold: getThreshold(0.1) }
    );

    observer.observe(ref.current);

    const fallback = setTimeout(() => {
      if (!hasRun.current) {
        hasRun.current = true;
        showAll();
        observer.disconnect();
      }
    }, 4000);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return ref;
}
