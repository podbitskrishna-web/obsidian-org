import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowDown,
  Globe, Bot, PhoneCall, Workflow, Sparkles,
  Video, Megaphone, TrendingUp, Gauge,
  Mail, Instagram, MessageCircle,
  CheckCircle2, Handshake,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeroAnimation } from "@/components/site/GSAPHero";
gsap.registerPlugin(ScrollTrigger);
import { ParticleField } from "@/components/site/ParticleField";
import { HorizontalServices } from "@/components/site/HorizontalServices";
import { BackgroundOrbs } from "@/components/site/BackgroundOrbs";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Obsidian Labs — AI, Web Development & Digital Growth Agency" },
      { name: "description", content: "Founder-led agency building elite AI systems, premium websites, automation, video content, and digital growth engines for ambitious businesses worldwide." },
      { property: "og:title", content: "Obsidian Labs — Elite Digital Systems" },
      { property: "og:description", content: "Premium web, AI automation, video content, ad creative, and growth systems engineered for revenue." },
    ],
  }),
  component: HomePage,
} as Parameters<typeof createFileRoute<"/", "/", string>>[0]));

const email     = "obsidianlabs.global@gmail.com";
const phone     = "+919964212891";
const instagram = "https://instagram.com/obsidianlabs.global";
const whatsapp  = `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent("Hi Krishna, I want to discuss a project with Obsidian Labs.")}`;

const services = [
  { icon: Globe,      name: "Web Development",          desc: "Sharp, conversion-focused websites built to load instantly, display beautifully, and turn traffic into booked meetings.", num: "01" },
  { icon: Bot,        name: "AI Chatbots",              desc: "Website and WhatsApp agents trained on your business that answer questions, qualify leads 24/7, and book calls.", num: "02" },
  { icon: PhoneCall,  name: "AI Voice Agents",          desc: "Natural voice receptionists for call answering, screening, automated intake, and CRM logging that resolve calls instantly.", num: "03" },
  { icon: Workflow,   name: "Business Automation",      desc: "Connected pipelines mapping forms, CRMs, calendars, email, and WhatsApp flows to eliminate manual operational work.", num: "04" },
  { icon: Video,      name: "Video Editing",            desc: "Transform raw footage into highly engaging Reels, TikToks, YouTube content, and ads that build brand authority.", num: "05" },
  { icon: Sparkles,   name: "Motion Graphics",          desc: "Premium logo, UI, and product animations that make your brand feel modern, trustworthy, and memorable.", num: "06" },
  { icon: Megaphone,  name: "Ad Creatives",             desc: "Conversion-optimized design and copywriting for ad assets across Meta, YouTube, and Google to maximize CTR and ROAS.", num: "07" },
  { icon: TrendingUp, name: "Social Media Management", desc: "Strategic content calendars, publishing routines, and community management to grow brand visibility and build trust.", num: "08" },
  { icon: Gauge,      name: "Growth Systems",           desc: "A complete multi-channel acquisition engine uniting websites, AI, content, ads, and funnel tracking to scale revenue.", num: "09" },
];

const processSteps = [
  { num: "01", title: "Discovery",  desc: "We clarify your offer, audience, and conversion goals before design or development begins." },
  { num: "02", title: "Strategy",   desc: "Systems architecture is planned — website, AI, automations, and content treated as one engine." },
  { num: "03", title: "Build",      desc: "Founder-led execution. Krishna stays directly involved, keeping quality and communication consistent." },
  { num: "04", title: "Launch",     desc: "Coordinated deployment with tracking, integrations, and performance verification." },
  { num: "05", title: "Optimize",   desc: "Ongoing monitoring, AI tuning, content iteration, and growth reporting." },
];

const industries = ["Clinics", "Consultants", "Coaches", "Real Estate", "Hospitality", "Local Services", "B2B Services", "Personal Brands", "Agencies", "E-commerce", "Education"];

// ── Word-by-word reveal component ─────────────────────────
function WordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-reveal"
          style={{ animationDelay: `${delay + i * 55}ms` }}
        >
          {word}{i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

// ── Hero with cursor-reactive gradient ────────────────────
function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.4 });
  const heroRef = useRef<HTMLElement>(null);
  useHeroAnimation(heroRef);

  const onMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    });
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen grain overflow-hidden flex items-center pt-28 pb-20"
    >
      <BackgroundOrbs />

      {/* Cursor-reactive accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(70% 80% at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(123,142,250,0.10) 0%, rgba(167,139,250,0.04) 40%, transparent 70%)`,
        }}
      />

      {/* Particle canvas */}
      <div className="absolute inset-0">
        <ParticleField />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-5xl">
          {/* Badge */}
          <Reveal>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{
                background: "rgba(123,142,250,0.06)",
                border: "1px solid rgba(123,142,250,0.18)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--cyan)] animate-pulse-dot" />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: "rgba(239,239,239,0.65)" }}>
                Founder-led · AI & Digital Agency
              </span>
            </div>
          </Reveal>

          {/* Headline — word reveal */}
          <h1 className="font-display font-extrabold leading-[1.0] tracking-[-0.03em]" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
            <WordReveal text="Premium Systems," delay={80} />
            <br />
            <WordReveal
              text="Elite Creative"
              delay={300}
              className="gradient-text"
            />
            <span className="word-reveal inline-block" style={{ animationDelay: "490ms" }}>&nbsp;&amp;</span>
            <br />
            <WordReveal text="Digital Growth." delay={540} />
          </h1>

          {/* Subhead */}
          <Reveal delay={700}>
            <p
              className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{ color: "rgba(239,239,239,0.58)" }}
            >
              Obsidian Labs designs elite AI systems, premium websites, automation workflows, and high-converting creative content that expand brand visibility, capture qualified leads, and accelerate revenue growth.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={900}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn-cyan px-7 py-3.5 rounded-full inline-flex items-center gap-2 text-sm font-semibold"
              >
                Book a Discovery Call <ArrowRight size={15} />
              </Link>
              <Link
                to="/services"
                className="btn-cyan-outline px-7 py-3.5 rounded-full inline-flex items-center gap-2 text-sm"
              >
                Explore Services
              </Link>
            </div>
          </Reveal>

          {/* Tags */}
          <Reveal delay={1050}>
            <div className="mt-10 flex flex-wrap gap-3">
              {["AI & Web Engineering", "High-Converting Creative", "Scalable Growth Engines"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(239,239,239,0.6)",
                  }}
                >
                  <CheckCircle2 size={12} className="text-[color:var(--cyan)]" />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-scroll-bounce" style={{ color: "rgba(239,239,239,0.28)" }}>
        <span className="text-[10px] uppercase tracking-[0.25em]">scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}

// ── Service cards — numbered, borderless-to-border pattern ─
function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={i * 60}>
      <div
        className="relative group rounded-2xl p-8 h-full flex flex-col justify-between cursor-default"
        style={{
          background: hovered ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.015)",
          border: "1px solid " + (hovered ? "rgba(123,142,250,0.28)" : "rgba(255,255,255,0.05)"),
          borderLeft: "2px solid " + (hovered ? "var(--cyan)" : "transparent"),
          transform: hovered ? "translateY(-4px)" : "none",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Ghost number */}
        <span
          className="absolute top-4 right-5 font-display font-extrabold select-none pointer-events-none"
          style={{
            fontSize: "5.5rem",
            lineHeight: 1,
            color: hovered ? "rgba(123,142,250,0.07)" : "rgba(255,255,255,0.03)",
            transition: "color 0.3s",
          }}
        >
          {s.num}
        </span>

        <div>
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl grid place-items-center mb-5 transition-all duration-300"
            style={{
              background: hovered ? "rgba(123,142,250,0.1)" : "rgba(255,255,255,0.04)",
              border: "1px solid " + (hovered ? "rgba(123,142,250,0.22)" : "rgba(255,255,255,0.07)"),
            }}
          >
            <s.icon size={18} style={{ color: hovered ? "var(--cyan)" : "rgba(239,239,239,0.55)" }} />
          </div>

          <h3
            className="font-display font-bold text-xl mb-3 transition-colors duration-300"
            style={{ color: hovered ? "#fff" : "rgba(239,239,239,0.9)", letterSpacing: "-0.02em" }}
          >
            {s.name}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(239,239,239,0.48)" }}>
            {s.desc}
          </p>
        </div>

        <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            style={{ color: hovered ? "var(--cyan)" : "rgba(239,239,239,0.35)" }}
          >
            Start Your Project
            <ArrowRight size={11} style={{ transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.2s" }} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

// ── Process step component ─────────────────────────────────
function ProcessStep({ step, i, isLast }: { step: typeof processSteps[0]; i: number; isLast: boolean }) {
  const [active, setActive] = useState(false);
  return (
    <Reveal delay={i * 80}>
      <div
        className="relative flex gap-8 pb-12 group"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {/* Timeline spine */}
        {!isLast && (
          <div
            className="absolute left-6 top-16 bottom-0 w-px"
            style={{ background: active ? "rgba(123,142,250,0.35)" : "rgba(255,255,255,0.06)", transition: "background 0.4s" }}
          />
        )}

        {/* Step bubble */}
        <div className="shrink-0">
          <div
            className="w-12 h-12 rounded-full grid place-items-center font-display font-bold text-sm transition-all duration-300"
            style={{
              background: active ? "rgba(123,142,250,0.12)" : "rgba(255,255,255,0.04)",
              border: "1px solid " + (active ? "rgba(123,142,250,0.4)" : "rgba(255,255,255,0.07)"),
              color: active ? "var(--cyan)" : "rgba(239,239,239,0.45)",
              boxShadow: active ? "0 0 20px rgba(123,142,250,0.15)" : "none",
            }}
          >
            {step.num}
          </div>
        </div>

        {/* Content */}
        <div className="pt-2.5">
          <h3
            className="font-display font-bold text-2xl mb-2 transition-colors duration-300"
            style={{ color: active ? "#fff" : "rgba(239,239,239,0.85)", letterSpacing: "-0.02em" }}
          >
            {step.title}
          </h3>
          <p className="text-base leading-relaxed max-w-md" style={{ color: "rgba(239,239,239,0.48)" }}>
            {step.desc}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

// ── Main page ──────────────────────────────────────────────
function HomePage() {
  const ticker = "Premium Websites · AI Chatbots · Voice Agents · Business Automation · Video Editing · Motion Graphics · Ad Creatives · Growth Systems · ";

  return (
    <div>
      <HeroSection />

      {/* ── 3-pillar strip ── */}
      <section
        className="relative py-14"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
          {[
            ["Positioning", "Built for businesses that want to look credible at an international level."],
            ["Delivery", "Founder-led strategy, design, build, and iteration — Krishna handles every project."],
            ["Markets", "Serving clients across India, UAE, US, UK, Canada, and Australia."],
          ].map(([title, text]) => (
            <Reveal key={title}>
              <div
                className="rounded-2xl p-7"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-3 font-medium">{title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(239,239,239,0.55)" }}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Ticker marquee ── */}
      <section className="py-8 overflow-hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex whitespace-nowrap animate-marquee font-display text-4xl md:text-6xl font-extrabold select-none">
          <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(123,142,250,0.18)" }}>{ticker.repeat(4)}</span>
          <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(123,142,250,0.18)" }}>{ticker.repeat(4)}</span>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="relative py-32 grain overflow-hidden">
        <BackgroundOrbs />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-4 font-medium">/ services</div>
            <h2
              className="font-display font-extrabold max-w-4xl leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Everything You Need to{" "}
              <span className="gradient-text">Grow Online</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: "rgba(239,239,239,0.5)" }}>
              Nine specialized services, one integrated growth engine — designed for businesses that take their digital presence seriously.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => <ServiceCard key={s.name} s={s} i={i} />)}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <Link to="/services" className="btn-cyan-outline px-7 py-3.5 rounded-full inline-flex items-center gap-2 text-sm">
                View All Service Details <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <HorizontalServices />

      {/* ── Founder section — elevated ── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Image — cinematic frame */}
            <Reveal className="lg:col-span-5">
              <div className="relative">
                <div
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <img
                    src="/assets/founder-krishna.png"
                    alt="Krishna — Founder & CEO, Obsidian Labs"
                    className="h-full w-full object-cover object-center"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 40%, transparent 70%)" }} />
                  {/* Top vignette */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, transparent 30%)" }} />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="font-display font-bold text-2xl text-white" style={{ letterSpacing: "-0.02em" }}>Krishna</div>
                    <div className="text-sm mt-0.5" style={{ color: "rgba(239,239,239,0.5)" }}>Founder & CEO, Obsidian Labs</div>
                  </div>
                </div>

                {/* Accent glow behind image */}
                <div
                  className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: "rgba(123,142,250,0.08)", filter: "blur(60px)" }}
                />
              </div>
            </Reveal>

            {/* Story */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-4 font-medium">/ meet the founder</div>
                <h2
                  className="font-display font-extrabold leading-tight"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", letterSpacing: "-0.03em" }}
                >
                  Building Systems That <span className="gradient-text">Create Value</span>
                </h2>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-8 space-y-5 text-base leading-relaxed" style={{ color: "rgba(239,239,239,0.6)" }}>
                  <p>
                    Krishna is a self-taught builder and entrepreneur who started Obsidian Labs with one clear belief: businesses deserve digital systems that actually solve problems — not just look good.
                  </p>
                  <p>
                    He dedicated years to learning website development, AI systems, automation architecture, and growth strategy through hands-on building, not credentials. Today, he works directly on every project — from strategy through delivery.
                  </p>
                </div>
              </Reveal>

              {/* Values grid */}
              <Reveal delay={200}>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {[
                    ["Direct Collaboration", "You work with the decision-maker, not an account manager."],
                    ["Quality Over Volume", "Every project is treated as a flagship — no templates, no shortcuts."],
                    ["Honest Positioning", "Early-stage and ambitious. Trust through execution, not claims."],
                    ["Long-Term Thinking", "Systems built for durable value, not quick launches."],
                  ].map(([title, desc]) => (
                    <div
                      key={title}
                      className="rounded-xl p-4"
                      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="text-sm font-semibold text-white mb-1">{title}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(239,239,239,0.45)" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Quote */}
              <Reveal delay={300}>
                <blockquote
                  className="mt-8 text-lg leading-relaxed italic"
                  style={{
                    borderLeft: "2px solid var(--cyan)",
                    paddingLeft: "1.25rem",
                    color: "rgba(239,239,239,0.75)",
                  }}
                >
                  "I believe the future belongs to businesses that combine great experiences, intelligent systems, and continuous innovation."
                </blockquote>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/about" className="btn-cyan px-5 py-3 rounded-full inline-flex items-center gap-2 text-sm">
                    Full Story <ArrowRight size={14} />
                  </Link>
                  <a href={`mailto:${email}`} className="btn-cyan-outline px-5 py-3 rounded-full inline-flex items-center gap-2 text-sm">
                    <Mail size={14} /> Email
                  </a>
                  <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-cyan-outline px-5 py-3 rounded-full inline-flex items-center gap-2 text-sm">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process — visual timeline ── */}
      <section
        className="relative py-32 grain overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <BackgroundOrbs />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left — heading */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-4 font-medium">/ process</div>
                <h2
                  className="font-display font-extrabold leading-tight"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
                >
                  How We Build<br />
                  <span className="gradient-text">Your System</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(239,239,239,0.5)" }}>
                  Every engagement follows a structured path from discovery to optimization — ensuring nothing is built without strategic intent.
                </p>
                <div className="mt-8">
                  <Link to="/contact" className="btn-cyan px-6 py-3.5 rounded-full inline-flex items-center gap-2 text-sm">
                    Start the Process <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right — steps */}
            <div className="lg:col-span-7">
              {processSteps.map((step, i) => (
                <ProcessStep key={step.num} step={step} i={i} isLast={i === processSteps.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ticker ── */}
      <section
        className="py-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto max-w-7xl px-6 mb-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-2 font-medium">/ industries</div>
            <h2 className="font-display font-bold text-3xl" style={{ letterSpacing: "-0.02em" }}>
              Built for ambitious operators
            </h2>
          </Reveal>
        </div>
        <div className="flex gap-3 animate-marquee whitespace-nowrap overflow-hidden">
          {[...industries, ...industries].map((t, i) => (
            <span
              key={i}
              className="shrink-0 px-5 py-2.5 rounded-full text-sm font-medium"
              style={{
                background: "rgba(123,142,250,0.05)",
                border: "1px solid rgba(123,142,250,0.12)",
                color: "rgba(239,239,239,0.65)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Trust section ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)] mb-4 font-medium">/ trust</div>
              <h2
                className="font-display font-extrabold leading-tight"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.03em" }}
              >
                Credibility Through <span className="gradient-text">Execution</span>
              </h2>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={120}>
              <div className="space-y-5">
                <p className="text-base leading-relaxed" style={{ color: "rgba(239,239,239,0.6)" }}>
                  Obsidian Labs is an early-stage company. We say this openly because we believe trust is built through honest communication and quality of work — not inflated claims.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Quality over inflated claims",
                    "Clear, direct communication",
                    "Long-term partnership mindset",
                    "Continuous iteration & improvement",
                    "Founder personally involved in every project",
                    "Built for international clients from day one",
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-3" style={{ color: "rgba(239,239,239,0.7)" }}>
                      <CheckCircle2 size={16} className="text-[color:var(--cyan)] shrink-0 mt-0.5" />
                      <span className="text-sm leading-snug">{x}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Link to="/contact" className="btn-cyan px-6 py-3.5 rounded-full inline-flex items-center gap-2 text-sm">
                    Contact Obsidian Labs <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="relative py-36 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(60% 70% at 50% 50%, rgba(123,142,250,0.1) 0%, rgba(167,139,250,0.04) 50%, transparent 70%)" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Handshake className="mx-auto mb-6 text-[color:var(--cyan)] opacity-70" size={32} />
            <h2
              className="font-display font-extrabold leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              Ready to Build Your{" "}
              <span className="gradient-text">Growth System?</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(239,239,239,0.55)" }}>
              Start with a clear conversation about your website, AI, automation, and conversion goals.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex justify-center gap-3 flex-wrap">
              <Link to="/contact" className="btn-cyan px-8 py-4 rounded-full inline-flex items-center gap-2 text-sm font-semibold">
                Start Your Project <ArrowRight size={15} />
              </Link>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-cyan-outline px-8 py-4 rounded-full inline-flex items-center gap-2 text-sm">
                WhatsApp Krishna
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
