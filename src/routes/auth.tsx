import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BackgroundOrbs } from "@/components/site/BackgroundOrbs";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Obsidian Labs" },
      { name: "description", content: "Sign in or create your Obsidian Labs account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(mode === "in" ? "Welcome back." : "Account created.");
    try { localStorage.setItem("obsidian:auth", "1"); } catch {}
    navigate({ to: "/dashboard" });
  };

  const oauth = (p: string) => {
    toast.message(`${p} sign-in coming online soon.`);
    try { localStorage.setItem("obsidian:auth", "1"); } catch {}
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 relative grain grid place-items-center">
      <BackgroundOrbs />
      <div className="relative z-10 w-full max-w-md px-6">
        <Reveal>
          <div className="glass-cyan rounded-3xl p-8 glow-cyan">
            <div className="text-center">
              <div className="font-display text-2xl font-bold tracking-wider text-glow-cyan">
                OBSIDIAN <span style={{ color: "var(--cyan)" }}>LABS</span>
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold">
                {mode === "in" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-2 text-white/60 text-sm">
                {mode === "in" ? "Sign in to your client dashboard." : "Join Obsidian Labs in seconds."}
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              <OAuthBtn provider="Google" onClick={() => oauth("Google")} />
              <OAuthBtn provider="GitHub" onClick={() => oauth("GitHub")} />
              <OAuthBtn provider="Apple" onClick={() => oauth("Apple")} />
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-white/40">
              <div className="flex-1 h-px bg-white/10" /> or with email <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email" required placeholder="you@business.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[color:var(--cyan)] focus:glow-cyan transition"
                />
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password" required placeholder="Password" minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[color:var(--cyan)] focus:glow-cyan transition"
                />
              </div>
              <button type="submit" className="w-full btn-cyan px-5 py-3 rounded-xl inline-flex items-center justify-center gap-2">
                {mode === "in" ? "Sign In" : "Create Account"} <ArrowRight size={16} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/60">
              {mode === "in" ? (
                <>New here? <button onClick={() => setMode("up")} className="text-[color:var(--cyan)] hover:underline">Create an account</button></>
              ) : (
                <>Already have one? <button onClick={() => setMode("in")} className="text-[color:var(--cyan)] hover:underline">Sign in</button></>
              )}
            </p>
            <p className="mt-4 text-center text-xs text-white/40">
              <Link to="/" className="hover:text-white/70">← Back home</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function OAuthBtn({ provider, onClick }: { provider: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full glass rounded-xl px-4 py-3 text-sm flex items-center justify-center gap-3 hover:border-[color:var(--cyan)]/50 hover:glow-cyan transition"
    >
      <ProviderIcon name={provider} />
      Continue with {provider}
    </button>
  );
}

function ProviderIcon({ name }: { name: string }) {
  if (name === "Google") return (
    <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.2 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.3-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.2 29.1 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.6 13-4.4l-6-5c-2 1.4-4.5 2.4-7 2.4-5.3 0-9.7-3.1-11.3-7.5L6 33.7C9.3 39.5 16 43.5 24 43.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6 5C40.6 35.5 43.5 30.2 43.5 24c0-1.2-.1-2.4 .1-3.5z"/></svg>
  );
  if (name === "GitHub") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17.77.84 1.23 1.92 1.23 3.23 0 4.61-2.81 5.63-5.49 5.93.44.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5z"/></svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M16.5 1.5c.1 1.2-.4 2.4-1.1 3.3-.8.9-2 1.6-3.2 1.5-.1-1.2.5-2.4 1.2-3.2.8-.9 2-1.5 3.1-1.6zM20.5 17.6c-.6 1.4-.9 2-1.7 3.2-1.1 1.7-2.6 3.7-4.5 3.8-1.7 0-2.1-1.1-4.4-1.1-2.3 0-2.8 1.1-4.4 1.1-1.9 0-3.4-1.9-4.5-3.5-3-4.6-3.3-10-1.4-12.9 1.3-2 3.3-3.2 5.3-3.2 2 0 3.2 1.1 4.9 1.1 1.6 0 2.6-1.1 4.9-1.1 1.8 0 3.6.9 4.9 2.5-4.3 2.4-3.6 8.5.9 10.1z"/></svg>
  );
}
