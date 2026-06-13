import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BackgroundOrbs } from "@/components/site/BackgroundOrbs";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Instagram, MessageCircle, ArrowRight, CheckCircle2, AlertCircle, Loader2, Phone } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Obsidian Labs" },
      { name: "description", content: "Start a project with Obsidian Labs. Founder-led websites, AI systems, and automation." },
      { property: "og:title", content: "Contact Obsidian Labs" },
      { property: "og:description", content: "Tell us about your business. We respond personally and clearly." },
    ],
  }),
  component: ContactPage,
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/meewlpwj";
const email = "obsidianlabs.global@gmail.com";
const phone = "+919964212891";
const instagram = "https://instagram.com/obsidianlabs.global";
const whatsapp = `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent("Hi Krishna, I want to discuss a project with Obsidian Labs.")}`;

const schema = z.object({
  name: z.string().trim().min(1, "Full name is required.").max(120),
  email: z.string().trim().email("Enter a valid email.").max(255),
  phone: z.string().trim().min(6, "Phone number is required.").max(40),
  company: z.string().trim().min(1, "Company name is required.").max(160),
  service: z.string().trim().min(1, "Choose a service."),
  budget: z.string().trim().min(1, "Choose a budget range."),
  message: z.string().trim().min(10, "Share a little context about the project.").max(2000),
});

const services = [
  "Premium Website Development",
  "AI Chatbot",
  "AI Voice Agent",
  "Business Automation",
  "Lead Generation System",
  "Full Growth System",
];

const budgets = ["Under $1,500", "$1,500 - $3,000", "$3,000 - $8,000", "$8,000 - $15,000", "$15,000+"];

type FormStatus = "idle" | "loading" | "success" | "error";

function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus("error");
      toast.error("Please complete the required fields.");
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      if (!response.ok) throw new Error("Formspree submission failed");

      setStatus("success");
      form.reset();
      toast.success("Message sent. Krishna will respond personally.");
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please email or WhatsApp us directly.");
    }
  };

  return (
    <div className="pt-32 pb-24 relative grain">
      <BackgroundOrbs />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">/ contact</div>
          <h1 className="mt-3 font-display text-5xl md:text-7xl font-bold max-w-3xl leading-[1.05]">
            Let&apos;s Build <span className="gradient-text">Together.</span>
          </h1>
          <p className="mt-6 text-white/64 max-w-2xl text-lg">
            Share the business problem, the market, and what you want the website or AI system to achieve. You will get a direct response from Obsidian Labs.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            {status === "success" ? (
              <Reveal>
                <div className="glass-cyan rounded-3xl p-10 text-center glow-cyan">
                  <CheckCircle2 className="mx-auto text-[color:var(--cyan)]" size={38} />
                  <h2 className="mt-4 font-display text-3xl font-bold">Message received.</h2>
                  <p className="mt-3 text-white/72">Krishna will review your project and respond personally.</p>
                  <button onClick={() => setStatus("idle")} className="mt-7 btn-cyan-outline px-5 py-2.5 rounded-full text-sm">
                    Send another message
                  </button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8 grid sm:grid-cols-2 gap-5">
                  <input type="hidden" name="_subject" value="New Obsidian Labs project inquiry" />
                  <Field name="name" label="Full Name" required error={errors.name} />
                  <Field name="email" type="email" label="Email" required error={errors.email} />
                  <Field name="phone" label="Phone Number" required error={errors.phone} />
                  <Field name="company" label="Company Name" required error={errors.company} />
                  <Select name="service" label="Service Needed" options={services} required error={errors.service} />
                  <Select name="budget" label="Budget Range" options={budgets} required error={errors.budget} />
                  <div className="sm:col-span-2">
                    <Field name="message" label="Message" required textarea error={errors.message} />
                  </div>
                  {status === "error" && (
                    <div className="sm:col-span-2 flex items-start gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                      <AlertCircle size={17} className="mt-0.5 shrink-0" />
                      <span>Please check the highlighted fields, or contact us directly by email or WhatsApp.</span>
                    </div>
                  )}
                  <div className="sm:col-span-2 flex items-center justify-between flex-wrap gap-4 pt-2">
                    <p className="text-xs text-white/50">Required fields are marked with *. Your details are used only to respond to your inquiry.</p>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-cyan px-6 py-3 rounded-full inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                      {status === "loading" ? "Sending..." : "Start Your Project"}
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>

          <Reveal className="lg:col-span-4" delay={150}>
            <div className="glass rounded-3xl p-8 h-full">
              <h3 className="font-display text-2xl font-bold">Direct Contact</h3>
              <p className="mt-2 text-white/62 text-sm leading-relaxed">
                Founder-led communication keeps projects clear, fast, and accountable from the first message.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { Icon: MessageCircle, label: "WhatsApp Krishna", href: whatsapp },
                  { Icon: Mail, label: email, href: `mailto:${email}` },
                  { Icon: Phone, label: "+91 99642 12891", href: `tel:${phone}` },
                  { Icon: Instagram, label: "@obsidianlabs.global", href: instagram },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-[color:var(--cyan)]/50 hover:glow-cyan transition"
                  >
                    <span className="w-9 h-9 grid place-items-center rounded-full glass-cyan">
                      <Icon size={15} className="text-[color:var(--cyan)]" />
                    </span>
                    <span className="text-white/82 text-sm break-all">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
}) {
  const cls = `w-full bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none focus:border-[color:var(--cyan)] focus:glow-cyan transition ${
    error ? "border-red-400/60" : "border-white/10"
  }`;
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-white/50 mb-2">{label}{required && " *"}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={6} className={cls} maxLength={2000} />
      ) : (
        <input name={name} type={type} required={required} className={cls} maxLength={255} />
      )}
      {error && <span className="mt-1.5 block text-xs text-red-200">{error}</span>}
    </label>
  );
}

function Select({ name, label, options, required, error }: { name: string; label: string; options: string[]; required?: boolean; error?: string }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-white/50 mb-2">{label}{required && " *"}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none focus:border-[color:var(--cyan)] focus:glow-cyan transition appearance-none ${
          error ? "border-red-400/60" : "border-white/10"
        }`}
      >
        <option value="" disabled className="bg-background">Select...</option>
        {options.map((o) => <option key={o} value={o} className="bg-background">{o}</option>)}
      </select>
      {error && <span className="mt-1.5 block text-xs text-red-200">{error}</span>}
    </label>
  );
}
