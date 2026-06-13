import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { to: "/",         label: "Home"      },
  { to: "/services", label: "Services"  },
  { to: "/portfolio",label: "Portfolio" },
  { to: "/about",    label: "Founder"   },
  { to: "/contact",  label: "Contact"   },
] as const;

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu  = () => { setMenuOpen(true);  setTimeout(() => setMenuVisible(true),  10); };
  const closeMenu = () => { setMenuVisible(false); setTimeout(() => setMenuOpen(false), 320); };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl"
            : "bg-transparent"
        }`}
        style={scrolled ? {
          background: "rgba(8,8,8,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        } : {}}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 h-[72px] flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Obsidian Labs home"
          >
            {/* Logo container — blends with navbar */}
            <div
              className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(123,142,250,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow   = "0 0 16px rgba(123,142,250,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow   = "none";
              }}
            >
              <img
                src="/assets/obsidian-labs-logo-official.png"
                alt="Obsidian Labs"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                  filter: "brightness(0.6) saturate(0.5) contrast(1.1)",
                  objectPosition: "50% 22%",
                }}
              />
            </div>

            {/* Wordmark */}
            <span
              className="font-display font-bold text-sm tracking-[0.2em] select-none transition-colors duration-300"
              style={{ color: "rgba(239,239,239,0.75)", letterSpacing: "0.22em" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(239,239,239,0.75)")}
            >
              OBSIDIAN{" "}
              <span className="gradient-text font-extrabold">LABS</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative text-sm transition-colors duration-200"
                style={{ color: "rgba(239,239,239,0.55)" }}
                activeProps={{ style: { color: "rgba(239,239,239,0.9)" } }}
                activeOptions={{ exact: l.to === "/" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(239,239,239,0.9)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(239,239,239,0.55)")}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="btn-cyan px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2"
            >
              Book a Call <ArrowRight size={13} />
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden w-9 h-9 grid place-items-center rounded-xl transition-colors"
            style={{ color: "rgba(239,239,239,0.7)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ── Mobile menu — full-screen overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col"
          style={{
            background: "rgba(8,8,8,0.97)",
            backdropFilter: "blur(24px)",
            opacity: menuVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <div className="h-[72px] flex items-center justify-end px-5">
            <button
              className="w-9 h-9 grid place-items-center rounded-xl"
              style={{ color: "rgba(239,239,239,0.7)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 pb-24 space-y-2">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={closeMenu}
                className="font-display font-bold py-4 transition-colors"
                style={{
                  fontSize: "2rem",
                  letterSpacing: "-0.02em",
                  color: "rgba(239,239,239,0.55)",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  transform: menuVisible ? "none" : "translateY(20px)",
                  opacity: menuVisible ? 1 : 0,
                  transition: `transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, opacity 0.4s ease ${i * 60}ms, color 0.2s`,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(239,239,239,0.55)")}
                activeProps={{ style: { color: "var(--cyan)", fontSize: "2rem", letterSpacing: "-0.02em", borderBottom: "1px solid rgba(255,255,255,0.04)" } }}
              >
                {l.label}
              </Link>
            ))}

            <div
              className="pt-6"
              style={{
                transform: menuVisible ? "none" : "translateY(20px)",
                opacity: menuVisible ? 1 : 0,
                transition: `transform 0.4s cubic-bezier(0.16,1,0.3,1) ${links.length * 60}ms, opacity 0.4s ease ${links.length * 60}ms`,
              }}
            >
              <Link
                to="/contact"
                onClick={closeMenu}
                className="btn-cyan w-full py-4 rounded-full text-center text-base font-semibold inline-flex items-center justify-center gap-2"
              >
                Book a Discovery Call <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
