import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly
      gsap.set(dot, { x: mx, y: my });
      // Ring follows with lag
      gsap.to(ring, { x: mx, y: my, duration: 0.15, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Magnetic hover on buttons / links
    const magneticEls = document.querySelectorAll<HTMLElement>(
      "a, button, [data-magnetic]"
    );

    const magneticHandlers: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = [];

    magneticEls.forEach((el) => {
      const enter = () => {
        gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: "power2.out" });
        gsap.to(dot,  { scale: 0.5, duration: 0.3, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(dot,  { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(el,   { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      };
      const moveEl = (e: MouseEvent) => {
        const rect   = el.getBoundingClientRect();
        const relX   = e.clientX - rect.left - rect.width  / 2;
        const relY   = e.clientY - rect.top  - rect.height / 2;
        gsap.to(el, { x: relX * 0.22, y: relY * 0.22, duration: 0.4, ease: "power2.out" });
      };

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("mousemove",  moveEl);
      magneticHandlers.push({ el, enter, leave });
    });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      magneticHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8, height: 8,
          borderRadius: "50%",
          background: "var(--cyan)",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 36, height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(123,142,250,0.6)",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s",
        }}
      />
    </>
  );
}
