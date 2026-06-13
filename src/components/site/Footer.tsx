import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";

const email = "obsidianlabs.global@gmail.com";
const phone = "+919964212891";
const instagram = "https://instagram.com/obsidianlabs.global";
const whatsapp = `https://wa.me/${phone.replace("+", "")}`;

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background overflow-hidden">
      <div className="orb animate-orb" style={{ width: 340, height: 340, background: "var(--violet)", left: "-12%", bottom: "-26%" }} />
      <div className="orb animate-orb" style={{ width: 260, height: 260, background: "var(--cyan)", right: "-8%", bottom: "-18%", animationDelay: "3s" }} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-4 group" aria-label="Obsidian Labs home">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1F23] to-[#0E2A30] shadow-[inset_0_2px_8px_rgba(0,0,0,0.4),0_0_15px_rgba(0,224,209,0.08)] border border-white/5 flex items-center justify-center shrink-0">
              <img
                src="/assets/obsidian-labs-logo-official.png"
                alt="Obsidian Labs Logo"
                className="h-[140%] w-[140%] min-w-[140%] max-w-[140%] object-cover opacity-95 transition-all duration-300 group-hover:scale-[1.48]"
                style={{
                  objectPosition: "50% 22%",
                  filter: "invert(1) hue-rotate(180deg) saturate(0.8) brightness(0.85)"
                }}
              />
            </div>
            <div className="font-display text-xl font-bold tracking-[0.25em] text-white/80 transition-colors group-hover:text-white select-none">
              OBSIDIAN <span className="gradient-text font-extrabold">LABS</span>
            </div>
          </Link>
          <p className="mt-5 text-white/62 max-w-md leading-relaxed">
            AI, Development, Automation, Creative, and Growth Agency engineering elite digital systems, premium content, and scalable customer acquisition engines.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: MessageCircle, href: whatsapp, label: "WhatsApp Obsidian Labs" },
              { Icon: Instagram, href: instagram, label: "Instagram @obsidianlabs.global" },
              { Icon: Mail, href: `mailto:${email}`, label: "Email Obsidian Labs" },
              { Icon: Phone, href: `tel:${phone}`, label: "Call Obsidian Labs" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="w-10 h-10 grid place-items-center rounded-full glass hover:glow-cyan transition-all"
                aria-label={label}
              >
                <Icon size={16} className="text-white/82" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/50 mb-4">Pages</h4>
          <ul className="space-y-2 text-white/80">
            <li><Link to="/" className="hover:text-[color:var(--cyan)]">Home</Link></li>
            <li><Link to="/services" className="hover:text-[color:var(--cyan)]">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-[color:var(--cyan)]">Portfolio</Link></li>
            <li><Link to="/about" className="hover:text-[color:var(--cyan)]">Founder</Link></li>
            <li><Link to="/contact" className="hover:text-[color:var(--cyan)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/50 mb-4">Reach Out</h4>
          <ul className="space-y-3 text-white/80 text-sm">
            <li><a className="hover:text-[color:var(--cyan)]" href={`mailto:${email}`}>{email}</a></li>
            <li><a className="hover:text-[color:var(--cyan)]" href={`tel:${phone}`}>+91 99642 12891</a></li>
            <li><a className="hover:text-[color:var(--cyan)]" href={instagram} target="_blank" rel="noreferrer">@obsidianlabs.global</a></li>
            <li>Mysore, India. Serving international clients.</li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 py-6 text-center text-white/42 text-xs">
        © 2026 Obsidian Labs. Founder-led digital systems studio.
      </div>
    </footer>
  );
}
