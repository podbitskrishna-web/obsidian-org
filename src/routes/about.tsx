import { createFileRoute, Link } from "@tanstack/react-router";
import { BackgroundOrbs } from "@/components/site/BackgroundOrbs";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Diamond, Eye, Lightbulb, Mail, Instagram, MessageCircle, ShieldCheck, Sparkles, Workflow } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Founder — Krishna | Obsidian Labs" },
      { name: "description", content: "Meet Krishna, Founder and CEO of Obsidian Labs — a self-taught builder creating elite AI systems, premium websites, and digital growth engines." },
      { property: "og:title", content: "Meet The Founder — Obsidian Labs" },
      { property: "og:description", content: "Founder-led websites, AI systems, and automation built with quality and long-term partnership in mind." },
    ],
  }),
  component: AboutPage,
});

const email = "obsidianlabs.global@gmail.com";
const phone = "+919964212891";
const instagram = "https://instagram.com/obsidianlabs.global";
const whatsapp = `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent("Hi Krishna, I want to discuss a project with Obsidian Labs.")}`;

const values = [
  { icon: Lightbulb, t: "Continuous Learning", d: "Adapting constantly to new tech, framework shifts, and AI updates to keep your systems ahead." },
  { icon: Eye, t: "Long-Term Thinking", d: "We build systems and partnerships planned for durable business value, not quick launches." },
  { icon: Sparkles, t: "Innovation", d: "Integrating AI agent intelligence and modern design styles to capture client attention." },
  { icon: Diamond, t: "Quality Over Quantity", d: "Every section, transition, and database sync is hand-built with extreme pixel-level detail." },
  { icon: ShieldCheck, t: "Honest Business Practices", d: "Ambitious but realistic positioning. Clean estimates, clear scope, and no inflated promises." },
  { icon: Workflow, t: "Real Problem Solving", d: "Funnels, voice agents, and lead workflows designed to solve direct operational pain points." },
];

function AboutPage() {
  return (
    <div className="pt-32 pb-24 relative grain">
      <BackgroundOrbs />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan)] font-medium">/ founder</div>
          <h1
            className="mt-4 font-display font-extrabold max-w-4xl"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            Meet The Founder Behind{" "}
            <span className="gradient-text">Obsidian Labs.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "rgba(239,239,239,0.55)" }}>
            A founder-led AI, development, automation, creative, and growth agency engineering elite digital systems for ambitious businesses worldwide.
          </p>
        </Reveal>

        <div className="mt-20 grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <img src="/assets/founder-krishna.png" alt="Krishna, Founder and CEO of Obsidian Labs" className="h-full w-full object-cover object-center" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.15) 45%, rgba(8,8,8,0.3) 100%)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-display text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>Krishna</div>
                <div className="mt-1 text-sm" style={{ color: "rgba(239,239,239,0.5)" }}>Founder & CEO, Obsidian Labs</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-56 h-56 rounded-full pointer-events-none" style={{ background: "rgba(123,142,250,0.07)", filter: "blur(50px)" }} />
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">/ meet the founder</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Meet The Founder</h2>
              <div className="mt-6 space-y-4 text-white/72 text-lg leading-relaxed">
                <p>
                  Krishna is a self-taught builder, designer, and entrepreneur focused on helping businesses grow through technology, automation, and modern digital experiences.
                </p>
                <p>
                  His journey began with a deep interest in business, technology, AI, and problem-solving. Rather than following a traditional path, he dedicated himself to learning website development, digital systems, automation, branding, and business growth strategies through hands-on building and continuous experimentation.
                </p>
                <p>
                  Today, he is building Obsidian Labs with a long-term vision of creating premium digital solutions that help businesses attract more customers, improve operations, and leverage modern AI technologies.
                </p>
                <p className="font-semibold text-white">
                  His focus is not simply building websites. His focus is building systems that create measurable business value.
                </p>
              </div>
              
              <blockquote className="mt-8 border-l-2 border-[color:var(--cyan)] pl-4 italic text-white/80 text-lg">
                "I believe the future belongs to businesses that combine great experiences, intelligent systems, and continuous innovation."
              </blockquote>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${email}`} className="btn-cyan-outline px-5 py-3 rounded-full inline-flex items-center gap-2"><Mail size={16} /> Email</a>
                <a href={instagram} target="_blank" rel="noreferrer" className="btn-cyan-outline px-5 py-3 rounded-full inline-flex items-center gap-2"><Instagram size={16} /> Instagram</a>
                <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-cyan px-5 py-3 rounded-full inline-flex items-center gap-2"><MessageCircle size={16} /> WhatsApp</a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-28 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">/ trust</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight">Building credibility through execution.</h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <div className="glass rounded-3xl p-8 md:p-10">
              <p className="text-white/72 text-lg leading-relaxed">
                Obsidian Labs is early-stage, ambitious, and focused on earning trust through useful work. The company prioritizes quality, long-term relationships, continuous improvement, and modern AI-powered systems that solve practical business problems.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {["Premium presentation", "Clear conversion paths", "Modern AI workflows", "Direct founder collaboration"].map((x) => (
                  <div key={x} className="flex items-center gap-3 text-white/76">
                    <CheckCircle2 size={17} className="text-[color:var(--cyan)] shrink-0" />
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-28">
          <Reveal>
            <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">/ principles</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">What we do not compromise on.</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 70}>
                <div
                  className="rounded-2xl p-6 h-full group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "border-color 0.25s, background 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(123,142,250,0.22)";
                    el.style.background = "rgba(123,142,250,0.03)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.05)";
                    el.style.background = "rgba(255,255,255,0.02)";
                    el.style.transform = "none";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl grid place-items-center mb-4"
                    style={{ background: "rgba(123,142,250,0.06)", border: "1px solid rgba(123,142,250,0.15)" }}
                  >
                    <v.icon size={17} className="text-[color:var(--cyan)]" />
                  </div>
                  <div className="font-display text-lg font-bold mb-2" style={{ letterSpacing: "-0.02em" }}>{v.t}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(239,239,239,0.5)" }}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-24 text-center">
            <Link to="/contact" className="btn-cyan px-7 py-3.5 rounded-full inline-flex items-center gap-2">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
