import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  opacity: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    // Mouse tracking — influences particle drift
    let mx = -1000, my = -1000;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Resize handler
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Fewer particles = cleaner, more premium look
    const COUNT = Math.min(55, Math.floor((w * h) / 20000));

    // Monochromatic — only accent color
    const ACCENT = { r: 123, g: 142, b: 250 };
    const CONNECT_DIST = 12000; // squared distance

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:       Math.random() * w,
      y:       Math.random() * h,
      vx:      (Math.random() - 0.5) * 0.18,
      vy:      (Math.random() - 0.5) * 0.18,
      r:       Math.random() * 1.2 + 0.5,
      opacity: Math.random() * 0.35 + 0.08,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Subtle attraction toward cursor
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist2 = dx * dx + dy * dy;
        const CURSOR_RADIUS = 22000;

        if (dist2 < CURSOR_RADIUS && dist2 > 0) {
          const force = (1 - dist2 / CURSOR_RADIUS) * 0.0015;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Velocity damping — keeps it slow and graceful
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Max speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.5) { p.vx = (p.vx / speed) * 0.5; p.vy = (p.vy / speed) * 0.5; }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${p.opacity})`;
        ctx.fill();
      }

      // Connect close particles — very subtle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;

          if (d2 < CONNECT_DIST) {
            const alpha = (1 - d2 / CONNECT_DIST) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };

    loop();

    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}
