import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BackgroundOrbs } from "@/components/site/BackgroundOrbs";
import { Reveal } from "@/components/site/Reveal";
import { LogOut, FolderKanban, MessageCircle, Sparkles, User, Calendar, Trash2 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Obsidian Labs" }] }),
  component: Dashboard,
});

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  country: string;
  service: string;
  timestamp: string;
};

function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    try {
      if (!localStorage.getItem("obsidian:auth")) {
        navigate({ to: "/auth" });
        return;
      }
      const rawLeads = localStorage.getItem("obsidian:leads");
      if (rawLeads) {
        setLeads(JSON.parse(rawLeads));
      }
    } catch {}
  }, [navigate]);

  const signOut = () => {
    try {
      localStorage.removeItem("obsidian:auth");
    } catch {}
    navigate({ to: "/" });
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    try {
      localStorage.setItem("obsidian:leads", JSON.stringify(updated));
      toast.success("Lead record deleted successfully.");
    } catch {}
  };

  return (
    <div className="pt-32 pb-24 relative grain min-h-screen">
      <BackgroundOrbs />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">/ dashboard</div>
              <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">
                Welcome to your <span className="gradient-text">command center</span>
              </h1>
            </div>
            <button
              onClick={signOut}
              className="btn-cyan-outline px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm cursor-pointer"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { Icon: FolderKanban, t: "Your projects", d: "Active builds and milestones will appear here." },
            { Icon: MessageCircle, t: "Messages", d: "Direct line to the Obsidian Labs team." },
            { Icon: Sparkles, t: "AI usage", d: "Track your AI agent activity in real time." },
          ].map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="glass rounded-2xl p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl grid place-items-center glass-cyan glow-cyan">
                  <Icon size={20} className="text-[color:var(--cyan)]" />
                </div>
                <div className="mt-4 font-display text-xl font-semibold">{t}</div>
                <p className="mt-2 text-white/60 text-sm">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Lead Qualification Dashboard Display */}
        <Reveal delay={200}>
          <div className="mt-12 glass rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Sparkles size={20} className="text-[color:var(--cyan)] animate-pulse" />
              Chatbot Qualified Inquiries
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Leads captured live by your 24/7 Orion AI agent.
            </p>

            {leads.length === 0 ? (
              <div className="mt-6 border border-white/10 rounded-2xl p-8 text-center text-white/40 text-sm">
                No chatbot inquiries received yet. Try starting an inquiry inside the Orion chat bubble!
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {leads.map((l) => (
                  <div
                    key={l.id}
                    className="border border-white/10 rounded-2xl p-5 bg-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[color:var(--cyan)]/30 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-semibold text-white text-base inline-flex items-center gap-1.5">
                          <User size={14} className="text-[color:var(--cyan)]" />
                          {l.name}
                        </span>
                        {l.company && (
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/80">
                            🏢 {l.company}
                          </span>
                        )}
                        {l.service && (
                          <span className="text-xs px-2 py-0.5 rounded bg-[color:var(--cyan)]/10 text-[color:var(--cyan)] font-medium">
                            🛠️ {l.service}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white/70 flex flex-wrap gap-x-4 gap-y-1">
                        <span>📧 {l.email}</span>
                        <span>📞 {l.phone}</span>
                        {l.industry && <span>💼 {l.industry}</span>}
                        {l.country && <span>📍 {l.country}</span>}
                      </div>
                      <div className="text-xs text-white/40 inline-flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(l.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteLead(l.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer shrink-0"
                      aria-label="Remove lead log"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-12 glass-cyan rounded-3xl p-8 text-center glow-cyan">
          <h2 className="font-display text-2xl font-bold">Need anything? Krishna's a message away.</h2>
          <Link to="/contact" className="mt-5 inline-flex btn-cyan px-5 py-2.5 rounded-full text-sm">
            Send a message
          </Link>
        </div>
      </div>
    </div>
  );
}
