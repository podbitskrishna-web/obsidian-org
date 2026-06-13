import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Code2, BrainCircuit, Mic, Compass } from "lucide-react";
import { BackgroundOrbs } from "@/components/site/BackgroundOrbs";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio - Obsidian Labs" },
      { name: "description", content: "Elite showcase concept systems and project blueprints engineered by Obsidian Labs." },
      { property: "og:title", content: "Portfolio - Obsidian Labs" },
      { property: "og:description", content: "Elite digital experiences and AI automation showcases." },
    ],
  }),
  component: PortfolioPage,
});

const projects = [
  {
    name: "Apex Dental Clinic System",
    desc: "A premium website and appointment engine engineered for dental clinics in Dubai. Fuses real-time calendar availability with automated WhatsApp notifications, reducing booking abandonment by 40%.",
    tags: ["Premium Website", "AI Scheduling", "CRM Integration", "Dubai"],
    href: "/contact",
    icon: Code2,
    bg: "linear-gradient(135deg, rgba(0, 245, 255, 0.08), rgba(124, 58, 237, 0.08))",
    accent: "var(--cyan)",
  },
  {
    name: "Vanguard Remodeling Funnel",
    desc: "An interactive, multi-step construction cost estimator built for US remodeling contractors. Captures detailed project scopes and routes high-value leads instantly to Salesforce CRM.",
    tags: ["Lead Gen Funnel", "Interactive Estimator", "Home Remodeling", "USA"],
    href: "/contact",
    icon: BrainCircuit,
    bg: "linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(255, 215, 0, 0.08))",
    accent: "var(--violet)",
  },
  {
    name: "Orion AI Voice Receptionist",
    desc: "A natural-sounding AI telephone assistant programmed for B2B consulting firms. Manages inbound calls, screens lead inquiries, routes calendars, and saves summaries automatically to Slack.",
    tags: ["AI Voice Agent", "Appointment Routing", "Automated Intake", "Global"],
    href: "/contact",
    icon: Mic,
    bg: "linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(0, 245, 255, 0.08))",
    accent: "var(--gold)",
  },
  {
    name: "Apex Executive Brand Engine",
    desc: "A conversion-focused personal brand platform built for leadership coaches. Integrates automated email sequences and smart scheduling triggers to systematically book discovery calls.",
    tags: ["Personal Brand Page", "Automated Nurture", "Coaches & Consultants", "UK"],
    href: "/contact",
    icon: Compass,
    bg: "linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(255, 215, 0, 0.05))",
    accent: "var(--cyan)",
  },
];

function PortfolioPage() {
  return (
    <div className="pt-32 pb-24 relative grain">
      <BackgroundOrbs />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">/ showcase</div>
          <h1 className="mt-3 font-display text-5xl md:text-7xl font-bold">
            Elite <span className="gradient-text">Showcases</span>
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl text-lg leading-relaxed">
            A focused presentation of premium systems, custom interfaces, and automation blueprints designed to solve operational friction.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <Link
                to={p.href}
                className="group block rounded-3xl overflow-hidden glass hover-lift hover:border-[color:var(--cyan)]/60 transition relative h-full flex flex-col"
              >
                <div className="aspect-[16/9] relative overflow-hidden flex items-center justify-center" style={{ background: p.bg }}>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-all">
                    <p.icon size={56} className="text-white/20 group-hover:text-white/40 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 100px ${p.accent}15` }} />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full grid place-items-center glass-cyan opacity-0 group-hover:opacity-100 transition duration-300">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full glass-cyan text-white/90">
                      System Blueprint
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[color:var(--cyan)] transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-white/60 text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/70 bg-white/2"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-[color:var(--cyan)] font-semibold uppercase tracking-wider">
                      Request system blueprint <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-28 text-center glass rounded-3xl p-8 max-w-3xl mx-auto border border-white/10 glow-cyan">
          <Reveal>
            <Sparkles className="mx-auto text-[color:var(--cyan)] animate-pulse" size={28} />
            <h2 className="mt-4 font-display text-3xl font-bold">Have a custom system in mind?</h2>
            <p className="mt-3 text-white/65 text-sm max-w-xl mx-auto">
              We design, build, and deploy premium sites, AI voice agents, and lead workflows around your specific business goals.
            </p>
            <Link to="/contact" className="mt-7 inline-flex btn-cyan px-7 py-3 rounded-full text-sm">
              Let&apos;s build together
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
