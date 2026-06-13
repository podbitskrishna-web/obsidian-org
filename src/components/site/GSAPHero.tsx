import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

// SplitText may not be available in free GSAP — we'll do manual split
export function useHeroAnimation(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Find animatable elements
      const badge   = el.querySelector<HTMLElement>("[data-hero-badge]");
      const h1Lines = el.querySelectorAll<HTMLElement>("[data-hero-line]");
      const sub     = el.querySelector<HTMLElement>("[data-hero-sub]");
      const ctas    = el.querySelectorAll<HTMLElement>("[data-hero-cta]");
      const scroll  = el.querySelector<HTMLElement>("[data-hero-scroll]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (badge) {
        tl.from(badge, { opacity: 0, y: 20, duration: 0.6 }, 0.1);
      }

      if (h1Lines.length) {
        tl.from(h1Lines, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        }, 0.25);
      }

      if (sub) {
        tl.from(sub, { opacity: 0, y: 24, duration: 0.7 }, 0.65);
      }

      if (ctas.length) {
        tl.from(ctas, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
        }, 0.85);
      }

      if (scroll) {
        tl.from(scroll, { opacity: 0, duration: 0.5 }, 1.2);
      }

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (h1Lines.length) {
            gsap.set(h1Lines, { y: progress * -60 });
          }
          if (sub) {
            gsap.set(sub, { y: progress * -40, opacity: 1 - progress * 1.5 });
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, [containerRef]);
}

// Counter animation hook
export function useCounterAnimation(ref: React.RefObject<HTMLElement | null>, end: number, suffix = "") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [ref, end, suffix]);
}

// Horizontal scroll section
export function useHorizontalScroll(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll<HTMLElement>("[data-panel]");
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + container.offsetWidth * panels.length,
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef]);
}
