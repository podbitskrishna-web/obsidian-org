import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Bot, PhoneCall, Workflow, Video, Sparkles, Megaphone, TrendingUp, Gauge } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Globe,      num: "01", name: "Web Development",       desc: "Sharp, conversion-focused websites built to load instantly and turn traffic into booked meetings." },
  { icon: Bot,        num: "02", name: "AI Chatbots",           desc: "Website and WhatsApp agents trained on your business that answer questions and qualify leads 24/7." },
  { icon: PhoneCall,  num: "03", name: "AI Voice Agents",       desc: "Natural voice receptionists that answer calls, screen prospects, and book appointments automatically." },
  { icon: Workflow,   num: "04", name: "Business Automation",   desc: "Connected pipelines mapping CRMs, calendars, email, and WhatsApp to eliminate manual work." },
  { icon: Video,      num: "05", name: "Video Editing",         desc: "Transform raw footage into engaging Reels, YouTube content, and ads that build authority." },
  { icon: Sparkles,   num: "06", name: "Motion Graphics",       desc: "Premium logo, UI, and product animations that make your brand feel modern and memorable." },
  { icon: Megaphone,  num: "07", name: "Ad Creatives",         desc: "Conversion-optimized design and copy for Meta, YouTube, and Google to maximize CTR and ROAS." },
  { icon: TrendingUp, num: "08", name: "Social Media",         desc: "Strategic content calendars and community management to grow brand visibility and trust." },
  { icon: Gauge,      num: "09", name: "Growth Systems",       desc: "Multi-channel acquisition engine uniting websites, AI, content, ads, and funnel tracking." },
];

export function HorizontalServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - section.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth + section.offsetHeight}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Each card fades in as it enters
      const cards = track.querySelectorAll<HTMLElement>("[data-card]");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: ScrollTrigger.getById("track-scroll") ?? undefined,
            start: "left 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Sticky header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-16 pb-8 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #080808 60%, transparent)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-xs uppercase tracking-[0.2em] mb-3 font-medium" style={{ color: "var(--cyan)" }}>/ services</div>
          <h2 className="font-display font-extrabold" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>
            Nine Ways We <span className="gradient-text">Grow Your Business</span>
          </h2>
        </div>
      </div>

      {/* Horizontal track */}
      <div className="flex items-center" style={{ height: "100vh" }}>
        <div ref={trackRef} className="flex gap-6 pl-6 pr-24 will-change-transform" style={{ paddingTop: "10rem" }}>
          {services.map((s) => (
            <div
              key={s.num}
              data-card
              className="shrink-0 rounded-2xl p-8 flex flex-col hover-lift"
              style={{
                width: "min(380px, 80vw)",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(123,142,250,0.35)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(123,142,250,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl grid place-items-center"
                  style={{ background: "rgba(123,142,250,0.1)", border: "1px solid rgba(123,142,250,0.15)" }}>
                  <s.icon size={20} style={{ color: "var(--cyan)" }} />
                </div>
                <span className="font-display text-5xl font-extrabold" style={{ color: "rgba(255,255,255,0.04)", letterSpacing: "-0.05em" }}>{s.num}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-3" style={{ letterSpacing: "-0.02em" }}>{s.name}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(239,239,239,0.5)" }}>{s.desc}</p>
              <div className="mt-6 text-xs uppercase tracking-widest font-medium" style={{ color: "var(--cyan)" }}>Learn more →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
