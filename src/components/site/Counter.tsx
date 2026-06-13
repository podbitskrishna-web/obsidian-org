import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

export function Counter({ to, suffix = "", duration = 1600, prefix = "" }: { to: number; suffix?: string; duration?: number; prefix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}
