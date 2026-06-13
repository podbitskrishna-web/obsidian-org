import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: any;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number;
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
  direction = "up",
  distance = 40,
  duration = 0.9,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay: delay / 1000,
      ease: "power3.out",
    };

    if (direction === "up")    { fromVars.y = distance; }
    if (direction === "down")  { fromVars.y = -distance; }
    if (direction === "left")  { fromVars.x = distance; }
    if (direction === "right") { fromVars.x = -distance; }
    if (direction === "scale") { fromVars.scale = 0.88; fromVars.y = 20; }
    if (direction === "fade")  { /* opacity only */ }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [delay, direction, distance, duration]);

  return <As ref={ref} className={className}>{children}</As>;
}

// Stagger reveal for lists
export function RevealList({
  children,
  className = "",
  stagger = 0.1,
  direction = "up",
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  direction?: "up" | "left" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.children;
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 0.7,
      stagger,
      ease: "power3.out",
    };

    if (direction === "up")    { fromVars.y = 30; }
    if (direction === "left")  { fromVars.x = 30; }
    if (direction === "scale") { fromVars.scale = 0.9; fromVars.y = 20; }

    const ctx = gsap.context(() => {
      gsap.from(items, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [stagger, direction]);

  return <div ref={ref} className={className}>{children}</div>;
}
