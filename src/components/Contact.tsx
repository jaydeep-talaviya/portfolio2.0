import { useState, type FormEvent } from "react";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const socials = [
  { label: "GitHub", href: "https://github.com/jaydeep-talaviya", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/jaydeep-talaviya-540901195", Icon: LinkedinIcon },
  { label: "WhatsApp", href: "https://wa.me/916353701592", Icon: WhatsAppIcon },
  { label: "Email", href: "mailto:jaydeeptalaviya7@gmail.com", Icon: MailIcon },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message, to_name: "Jaydeep Talaviya", to_email: "jaydeeptalaviya7@gmail.com" },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: any) {
      console.error("EmailJS error:", err);
      setErrorMsg(err?.text || err?.message || "Unknown error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const inputStyle = { background: "var(--color-bg)", border: "1px solid var(--color-border)", color: "var(--color-text)" };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4">
          <p className="text-sm font-mono tracking-widest uppercase" style={{ color: "var(--color-accent)" }}>05 &mdash; Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Let's Work Together</h2>
          <p className="text-base max-w-lg" style={{ color: "var(--color-text-muted)" }}>
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always open to new opportunities and interesting conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-4 py-3 rounded-xl text-sm outline-none focus:ring-1 transition-all duration-200" style={inputStyle} />
              <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="px-4 py-3 rounded-xl text-sm outline-none focus:ring-1 transition-all duration-200" style={inputStyle} />
            </div>
            <textarea placeholder="Your Message" rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none focus:ring-1 transition-all duration-200" style={inputStyle} />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: status === "sent" ? "#22c55e" : status === "error" ? "#ef4444" : "var(--color-accent)",
                color: "var(--color-bg)",
              }}
            >
              {status === "sending" && <><Spinner /> Sending...</>}
              {status === "sent" && <><CheckIcon /> Message Sent!</>}
              {status === "error" && "Failed — Try Again"}
              {status === "idle" && <><SendIcon /> Send Message</>}
            </button>
            {status === "error" && errorMsg && (
              <p className="text-xs font-mono" style={{ color: "#ef4444" }}>
                {errorMsg}
              </p>
            )}
          </form>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-mono uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>Connect</p>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01]" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }} onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)"; }} onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; }}>
                    <s.Icon />
                    <span className="text-sm font-medium">{s.label}</span>
                    <ExternalLinkIcon />
                  </a>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--color-accent)" }}>Location</p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Ahmedabad, Gujarat, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
