import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Bot, PhoneCall, Workflow, Sparkles, Check, ArrowRight, Video, Megaphone, TrendingUp, Gauge } from "lucide-react";
import { BackgroundOrbs } from "@/components/site/BackgroundOrbs";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Obsidian Labs" },
      { name: "description", content: "Premium web development, AI chatbots, AI voice agents, business automation, video editing, motion graphics, ad creatives, social media, and growth systems." },
      { property: "og:title", content: "Services — Obsidian Labs" },
      { property: "og:description", content: "Nine core services engineered for growth: websites, AI agents, automation, creative content, and complete growth systems." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Globe,
    name: "Premium Web Development",
    desc: "Cinematic, conversion-engineered websites built to load instantly, display beautifully across all screen sizes, and turn traffic into booked meetings.",
    incl: ["Custom design tokens", "Performance-optimized layout", "SEO foundation", "Responsive mobile UX", "Google Analytics & pixel tracking"],
    benefits: ["Increased brand trust", "Higher page conversion rates", "Stronger mobile engagement"]
  },
  {
    icon: Bot,
    name: "AI Chatbots",
    desc: "Custom-trained AI agents that engage website and WhatsApp visitors in real-time, answer complex questions, and capture lead details.",
    incl: ["Custom knowledge base setup", "Intake & qualification flows", "CRM & database syncing", "WhatsApp API integration", "Conversation memory logging"],
    benefits: ["24/7 client response coverage", "Automated lead pre-screening", "Fewer scheduling bottlenecks"]
  },
  {
    icon: PhoneCall,
    name: "AI Voice Agents",
    desc: "Intelligent digital voice receptionists that handle phone inquiries instantly, verify prospect details, and book calendar appointments.",
    incl: ["Natural text-to-speech voicing", "Outbound/inbound call routing", "Calendar link integration", "Lead screening scripts", "Call summaries & CRM logs"],
    benefits: ["Zero missed calls or leads", "Drastically reduced support costs", "24/7 instant appointment booking"]
  },
  {
    icon: Workflow,
    name: "Business Automation",
    desc: "Operational pipelines connecting your calendar, forms, email, SMS, and WhatsApp so your business runs efficiently in the background.",
    incl: ["End-to-end workflow audit", "Zapier & Make integrations", "Auto-responder templates", "Multi-stage nurture pipelines", "Real-time admin notifications"],
    benefits: ["90% less manual administrative work", "Faster client follow-up speed", "Eliminated data-entry mistakes"]
  },
  {
    icon: Video,
    name: "Professional Video Editing",
    desc: "Transform raw footage into high-converting video assets optimized for social platforms to capture attention and scale organic reach.",
    incl: ["Short-form Reels & TikTok cuts", "YouTube video pacing & color", "Corporate narrative videos", "Podcast clip extraction", "Subtitles, captions & sound design"],
    benefits: ["Higher viewer retention rates", "Rapid multi-channel content output", "Stronger social brand authority"]
  },
  {
    icon: Sparkles,
    name: "Motion Graphics & Visual Content",
    desc: "Elite vector animations and motion design that make your digital interfaces and promotional media feel modern, credible, and premium.",
    incl: ["Animated brand logos", "Explainer video animations", "Product feature showcases", "Interactive UI animations", "Social media motion assets"],
    benefits: ["Premium market positioning", "Higher ad CTR attention", "Improved conceptual storytelling"]
  },
  {
    icon: Megaphone,
    name: "Ad Creative Development",
    desc: "Conversion-engineered visual and copywriting assets tailored for paid advertising campaigns to reduce acquisition costs.",
    incl: ["Meta ad asset variations", "YouTube video ad assets", "Display ad banner designs", "Landing page creative assets", "Creative testing matrix assets"],
    benefits: ["Increased click-through rates (CTR)", "Better return on ad spend (ROAS)", "More qualified inbound inquiries"]
  },
  {
    icon: TrendingUp,
    name: "Social Media Growth Management",
    desc: "Full-service organic distribution planning, publishing cadence, and audience building to grow industry-wide authority.",
    incl: ["Monthly content calendars", "Platform-specific scheduling", "Organic outreach planning", "Community response routing", "Monthly growth performance reports"],
    benefits: ["Consistent organic visibility", "Scalable audience community", "Stronger prospect loyalty and trust"]
  },
  {
    icon: Gauge,
    name: "Digital Growth Systems",
    desc: "A unified acquisition engine consolidating websites, AI, content distribution, paid ads, and CRM pipelines into one scalable growth path.",
    incl: ["Omnichannel growth strategy", "Multi-channel funnel building", "AI chatbot lead capture routing", "Performance tracking & attribution", "Monthly executive review calls"],
    benefits: ["Predictable new client acquisition", "Complete attribution visibility", "Scalable business revenue"]
  }
];

const pricingPrinciples = [
  { title: "Value-Driven Scope", desc: "We design and build systems around the specific operational leverage points and growth goals of your business." },
  { title: "Tailored Estimates", desc: "Project pricing depends on scope, requirements, complexity, and business goals. We'd be happy to discuss your project and provide a tailored estimate." },
  { title: "High-End Engineering", desc: "No templates or cheap shortcuts. Clean code, bespoke branding, and modern AI integration built to perform." },
  { title: "Direct Alignment", desc: "You collaborate directly with Krishna, ensuring direct accountability, rapid execution, and clear communication." },
];

function ServicesPage() {
  return (
    <div className="pt-32 pb-24 relative grain">
      <BackgroundOrbs />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)] font-medium">/ services</div>
          <h1
            className="mt-4 font-display font-extrabold max-w-5xl"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            Nine services.{" "}
            <span className="gradient-text">One growth engine.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "rgba(239,239,239,0.55)" }}>
            Every service is a precision-engineered system designed to solve a specific business growth challenge.
          </p>
        </Reveal>

        <div className="mt-16 space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 50}>
              <div
                className="rounded-2xl p-8 md:p-10 grid md:grid-cols-12 gap-8 items-start"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: "2px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderLeftColor = "var(--cyan)";
                  el.style.background = "rgba(123,142,250,0.025)";
                  el.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderLeftColor = "transparent";
                  el.style.background = "rgba(255,255,255,0.02)";
                  el.style.transform = "none";
                }}
              >
                <div className="md:col-span-1">
                  <div
                    className="w-12 h-12 rounded-xl grid place-items-center"
                    style={{
                      background: "rgba(123,142,250,0.06)",
                      border: "1px solid rgba(123,142,250,0.15)",
                    }}
                  >
                    <s.icon size={20} className="text-[color:var(--cyan)]" />
                  </div>
                </div>
                <div className="md:col-span-6">
                  <div className="text-xs uppercase tracking-[0.2em] font-medium mb-2" style={{ color: "rgba(239,239,239,0.3)" }}>0{i + 1}</div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ letterSpacing: "-0.025em" }}>{s.name}</h2>
                  <p className="mt-4 text-lg leading-relaxed" style={{ color: "rgba(239,239,239,0.55)" }}>{s.desc}</p>
                </div>
                <div className="md:col-span-5 grid sm:grid-cols-2 gap-6 md:gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] font-medium mb-3" style={{ color: "rgba(239,239,239,0.35)" }}>Deliverables</div>
                    <ul className="space-y-2">
                      {s.incl.map((x) => (
                        <li key={x} className="flex items-start gap-2 text-sm" style={{ color: "rgba(239,239,239,0.7)" }}>
                          <Check size={13} className="text-[color:var(--cyan)] mt-0.5 shrink-0" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] font-medium mb-3" style={{ color: "rgba(239,239,239,0.35)" }}>Key Benefits</div>
                    <ul className="space-y-2">
                      {s.benefits.map((x) => (
                        <li key={x} className="flex items-start gap-2 text-sm" style={{ color: "rgba(239,239,239,0.7)" }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "var(--cyan)" }} />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ENGAGEMENT & PRICING */}
        <div className="mt-28">
          <Reveal>
            <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">/ engagement</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Pricing & Engagement</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "border-color 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(123,142,250,0.25)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                    el.style.transform = "none";
                  }}
                >
                  <div className="text-xs uppercase tracking-[0.2em] font-medium mb-3" style={{ color: "var(--cyan)" }}>0{i + 1}</div>
                  <div className="font-display text-xl font-bold mb-3" style={{ letterSpacing: "-0.02em" }}>{p.title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(239,239,239,0.55)" }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link to="/contact" className="btn-cyan px-7 py-3.5 rounded-full inline-flex items-center gap-2">
            Start The Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
