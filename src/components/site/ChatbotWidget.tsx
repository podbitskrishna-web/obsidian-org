import { useEffect, useRef, useState, useCallback } from "react";
import { MessageCircle, X, Send, Sparkles, ChevronDown, Bot } from "lucide-react";
import { chatWithOrion } from "@/lib/api/chat.functions";

// ── Types ──────────────────────────────────────────────────
type MsgRole = "user" | "bot";
interface Msg {
  role: MsgRole;
  text: string;
  ts:   string;
}
interface HistoryEntry { role: "user" | "model"; content: string; }

// ── Quick starter suggestions ──────────────────────────────
const SUGGESTIONS = [
  "What services does Obsidian Labs offer?",
  "How much does a website cost?",
  "Tell me about AI chatbots",
  "How do I get started on a project?",
  "What's your process?",
];

// ── Fallback KB for when Gemini key isn't set ──────────────
const FALLBACK: { keys: string[]; answer: string }[] = [
  { keys: ["service", "offer", "what do you do", "capabilities"], answer: "Obsidian Labs offers 9 core services:\n1. Premium Web Development\n2. AI Chatbots\n3. AI Voice Agents\n4. Business Automation\n5. Video Editing\n6. Motion Graphics\n7. Ad Creative Development\n8. Social Media Management\n9. Digital Growth Systems\n\nWhich one would you like to know more about?" },
  { keys: ["price", "cost", "how much", "budget", "rates"], answer: "Pricing at Obsidian Labs is always tailored to your specific project scope and goals — we don't use one-size-fits-all packages. To get a clear estimate, we scope the project together with you. Want to start that conversation?" },
  { keys: ["website", "web dev", "web design", "landing page"], answer: "Our web development service covers custom-designed, conversion-focused websites, landing pages, and web apps. Built with modern frameworks (React, Next.js, Vite), fully responsive, performance-optimized, and SEO-ready." },
  { keys: ["chatbot", "ai chat", "ai agent", "bot"], answer: "We build custom AI chatbots trained on your business for website and WhatsApp. They qualify leads 24/7, answer complex questions, and connect to your CRM — reducing support costs while increasing lead capture." },
  { keys: ["voice", "phone", "receptionist", "call"], answer: "Our AI Voice Agents act as 24/7 digital receptionists for your phone lines. They answer calls naturally, screen prospects, book appointments directly into your calendar, and log summaries to your CRM." },
  { keys: ["automation", "automate", "workflow", "zapier", "crm"], answer: "We build business automation workflows using Zapier, Make, and n8n. These connect your CRM, calendar, email, SMS, and WhatsApp so your business runs efficiently in the background with zero manual work." },
  { keys: ["video", "reel", "tiktok", "youtube", "edit"], answer: "Our video editing service transforms raw footage into high-converting Reels, TikToks, YouTube content, and corporate videos. We handle subtitles, color grading, pacing, and platform optimization." },
  { keys: ["timeline", "how long", "duration", "weeks"], answer: "Typical timelines:\n• Websites: 2–6 weeks\n• AI chatbots: 1–3 weeks\n• Automation: 1–2 weeks\n• Video editing: 3–7 business days\n• Full growth system: 4–8 weeks" },
  { keys: ["contact", "email", "whatsapp", "reach", "krishna"], answer: "You can reach Krishna directly:\n📧 obsidianlabs.global@gmail.com\n💬 WhatsApp: +91 9964212891\n📸 @obsidianlabs.global\n\nOr submit an inquiry via the Contact page and he'll respond within 24 hours." },
  { keys: ["start", "begin", "hire", "project", "quote", "proposal", "work with"], answer: "Starting a project is straightforward:\n1. Share your goals & business context\n2. We scope the project together\n3. You receive a tailored proposal\n4. Kick off with a strategy session\n\nWould you like to start that conversation here? I just need a few quick details." },
];

function fallbackAnswer(input: string): string {
  const q = input.toLowerCase();
  for (const entry of FALLBACK) {
    if (entry.keys.some((k) => q.includes(k))) return entry.answer;
  }
  return "That's a great question! To give you the most accurate answer, I'd recommend connecting directly with Krishna at obsidianlabs.global@gmail.com or WhatsApp +91 9964212891. He responds personally to every inquiry.";
}

function getTimestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ── Render text with **bold** and newlines ─────────────────
function RichText({ text }: { text: string }) {
  return (
    <span>
      {text.split("\n").map((line, li) => (
        <span key={li}>
          {line.split(/(\*\*[^*]+\*\*)/).map((part, pi) =>
            part.startsWith("**") && part.endsWith("**")
              ? <strong key={pi} className="font-semibold text-white">{part.slice(2, -2)}</strong>
              : <span key={pi}>{part}</span>
          )}
          {li < text.split("\n").length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}

// ══════════════════════════════════════════════════════════════
// ChatbotWidget
// ══════════════════════════════════════════════════════════════
export function ChatbotWidget() {
  const [open,         setOpen]         = useState(false);
  const [msgs,         setMsgs]         = useState<Msg[]>([{
    role: "bot",
    text: "Hi, I'm **Orion** — Obsidian Labs' AI business consultant. 👋\n\nI can help with services, pricing, AI systems, web development, automation, and more. What can I help you with today?",
    ts:   getTimestamp(),
  }]);
  const [history,      setHistory]      = useState<HistoryEntry[]>([]);
  const [input,        setInput]        = useState("");
  const [isTyping,     setIsTyping]     = useState(false);
  const [showSugg,     setShowSugg]     = useState(true);
  const [hasApiKey,    setHasApiKey]    = useState(true); // optimistic — we try and fallback
  const endRef    = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, isTyping, open]);

  // ── Add bot message ──────────────────────────────────────
  const addBot = useCallback((text: string) => {
    setMsgs((m) => [...m, { role: "bot", text, ts: getTimestamp() }]);
  }, []);

  // ── Save lead to localStorage + Formspree ────────────────
  const saveToFormspree = async (name: string, email: string, context: string) => {
    try {
      const fd = new FormData();
      fd.append("name",    name);
      fd.append("email",   email);
      fd.append("message", context);
      fd.append("_subject", `Orion AI Lead: ${name}`);
      await fetch("https://formspree.io/f/meewlpwj", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
    } catch (_) {}
  };

  // ── Main send handler ────────────────────────────────────
  const send = useCallback(async (text?: string) => {
    const t = (text ?? input).trim();
    if (!t || isTyping) return;

    setInput("");
    setShowSugg(false);
    setMsgs((m) => [...m, { role: "user", text: t, ts: getTimestamp() }]);
    setIsTyping(true);
    inputRef.current?.focus();

    // Attempt Gemini API via server function
    try {
      const result = await chatWithOrion({
        data: { history, userMessage: t },
      });

      setIsTyping(false);

      if (result.error === "no_api_key" || !hasApiKey) {
        setHasApiKey(false);
        const answer = fallbackAnswer(t);
        addBot(answer);
        setHistory((h) => [
          ...h.slice(-18),
          { role: "user",  content: t      },
          { role: "model", content: answer },
        ]);
      } else if (result.text) {
        addBot(result.text);
        setHistory((h) => [
          ...h.slice(-18),
          { role: "user",  content: t           },
          { role: "model", content: result.text! },
        ]);

        // Auto-detect lead info mentions and save
        const lower = t.toLowerCase() + " " + (result.text ?? "").toLowerCase();
        if (lower.includes("@") || lower.includes("email")) {
          const emailMatch = t.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
          if (emailMatch) {
            saveToFormspree("Chat Lead", emailMatch[0], `Conversation context: ${t}`);
          }
        }
      } else {
        addBot("I had a small hiccup. Feel free to reach Krishna directly at obsidianlabs.global@gmail.com or WhatsApp +91 9964212891.");
      }
    } catch (err) {
      console.error("[ChatWidget] Error:", err);
      setIsTyping(false);
      // Fallback to keyword system
      setHasApiKey(false);
      const answer = fallbackAnswer(t);
      addBot(answer);
      setHistory((h) => [
        ...h.slice(-18),
        { role: "user",  content: t      },
        { role: "model", content: answer },
      ]);
    }
  }, [input, isTyping, history, hasApiKey, addBot]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ── Toggle button ── */}
      <button
        id="chatbot-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Orion chat" : "Open Orion chat"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full grid place-items-center btn-cyan shadow-2xl hover:scale-110 transition-transform"
        style={{ boxShadow: "0 0 28px rgba(123,142,250,0.3), 0 8px 32px rgba(0,0,0,0.5)" }}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div
          id="chatbot-window"
          className="fixed bottom-24 right-6 z-50 flex flex-col animate-fade-up"
          style={{
            width: "min(420px, calc(100vw - 2rem))",
            height: "clamp(480px, 60vh, 620px)",
            background: "rgba(8,8,8,0.97)",
            border: "1px solid rgba(123,142,250,0.16)",
            borderRadius: "24px",
            boxShadow:
              "0 0 60px rgba(123,142,250,0.08), " +
              "0 40px 80px rgba(0,0,0,0.6), " +
              "inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "24px 24px 0 0",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-full grid place-items-center"
                  style={{
                    background: "rgba(123,142,250,0.1)",
                    border: "1px solid rgba(123,142,250,0.2)",
                  }}
                >
                  <Bot size={16} className="text-[color:var(--cyan)]" />
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#080808]"
                  style={{ background: "#22c55e" }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-display font-bold text-sm text-white tracking-wide">
                  Orion AI
                  <Sparkles size={10} className="text-[color:var(--cyan)] opacity-70" />
                </div>
                <div className="text-[11px]" style={{ color: "rgba(239,239,239,0.38)" }}>
                  Obsidian Labs · Business Consultant
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 grid place-items-center rounded-full transition"
              style={{ color: "rgba(239,239,239,0.4)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "rgba(239,239,239,0.4)";
              }}
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[87%] text-sm leading-relaxed px-4 py-3 ${
                    m.role === "user" ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-tl-sm"
                  }`}
                  style={
                    m.role === "user"
                      ? {
                          background: "var(--cyan)",
                          color: "#080808",
                          fontWeight: 500,
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(239,239,239,0.88)",
                        }
                  }
                >
                  {m.role === "bot"
                    ? <RichText text={m.text} />
                    : m.text
                  }
                </div>
                <span
                  className="text-[10px] mt-1 px-1"
                  style={{ color: "rgba(239,239,239,0.22)" }}
                >
                  {m.ts}
                </span>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div
                  className="px-4 py-3 rounded-2xl rounded-tl-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex gap-1.5 items-center h-4">
                    {[0, 0.18, 0.36].map((d, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          background: "var(--cyan)",
                          animationDelay: `${d}s`,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick suggestions (first open only) */}
            {showSugg && msgs.length === 1 && !isTyping && (
              <div className="pt-1 space-y-1.5">
                <p className="text-[10px] uppercase tracking-widest px-1" style={{ color: "rgba(239,239,239,0.28)" }}>
                  Quick questions
                </p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="w-full text-left text-xs px-3.5 py-2.5 rounded-xl transition-all"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(239,239,239,0.65)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(123,142,250,0.35)";
                      el.style.color = "rgba(123,142,250,0.9)";
                      el.style.background = "rgba(123,142,250,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255,255,255,0.07)";
                      el.style.color = "rgba(239,239,239,0.65)";
                      el.style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* API key notice */}
            {!hasApiKey && (
              <div
                className="text-[11px] text-center px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(123,142,250,0.06)",
                  border: "1px solid rgba(123,142,250,0.12)",
                  color: "rgba(239,239,239,0.45)",
                }}
              >
                Running in knowledge-base mode · Full AI available with API key
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            className="shrink-0 p-3"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "0 0 24px 24px",
            }}
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                id="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                placeholder="Ask me anything about Obsidian Labs..."
                className="flex-1 text-sm text-white placeholder-white/30 outline-none bg-transparent disabled:opacity-40"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px",
                  padding: "0.6rem 1rem",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(123,142,250,0.45)")}
                onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              <button
                id="chatbot-send"
                onClick={() => send()}
                disabled={isTyping || !input.trim()}
                className="w-10 h-10 grid place-items-center rounded-full btn-cyan shrink-0 hover:scale-110 transition-transform disabled:opacity-35"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
            <p
              className="text-center text-[10px] mt-2"
              style={{ color: "rgba(239,239,239,0.2)" }}
            >
              Powered by Obsidian Labs AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
