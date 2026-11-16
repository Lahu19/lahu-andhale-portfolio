import { useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EMAILJS_SERVICE_ID  = import.meta.env["VITE_EMAILJS_SERVICE_ID"] as string;
const EMAILJS_TEMPLATE_ID = import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = event.currentTarget;
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, { publicKey: EMAILJS_PUBLIC_KEY });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="page-shell">
      <header className="contact-hero grid-surface">
        <p className="eyebrow">CONTACT / LAHU ANDHALE</p>
        <h1>Good systems start<br />with a <span>conversation.</span></h1>
        <p>A backend role, a distributed systems challenge, or an AI-integrated architecture worth exploring — let us talk about what your team wants to build.</p>
      </header>
      <section className="contact-layout section-pad">
        <div className="contact-copy">
          <h2>Systems thinking.<br />Engineering follow-through.</h2>
          <p>I am interested in backend and AI-infrastructure roles where distributed systems, performance, and intelligent automation intersect.</p>
          <div className="contact-summary">
            <div><small>BACKEND &amp; DISTRIBUTED SYSTEMS</small><p>High-scale microservices, event-driven Kafka pipelines, Redis-powered low-latency systems and production reliability engineering.</p></div>
            <div><small>AI &amp; AGENTIC AUTOMATION</small><p>LLM fine-tuning, agentic workflow integration, anomaly detection pipelines and Spring AI (MCP) backend services.</p></div>
            <div><small>FINTECH &amp; ENTERPRISE PLATFORMS</small><p>Financial report systems, payment routing engines, HRMS and CRM domain services built for real production scale.</p></div>
          </div>
        </div>
        {status === "sent" ? (
          <div className="contact-success">
            <CheckCircle size={40} />
            <h3>Message sent.</h3>
            <p>Thanks for reaching out — I will get back to you shortly.</p>
            <Button variant="outline" onClick={() => setStatus("idle")}>Send another message</Button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Your name<Input name="from_name" placeholder="How should I address you?" required disabled={status === "sending"} /></label>
            <label>Email address<Input name="from_email" type="email" placeholder="you@company.com" required disabled={status === "sending"} /></label>
            <label>Your message<Textarea name="message" placeholder="Tell me about the role, your team, or the project." required disabled={status === "sending"} rows={5} /></label>
            {status === "error" && <p className="contact-error">{errorMsg}</p>}
            <Button type="submit" size="lg" disabled={status === "sending"}>
              {status === "sending" ? <><Loader2 size={16} className="spin" /> Sending...</> : <><Send size={16} /> Send message</>}
            </Button>
          </form>
        )}
      </section>
    </div>
  );
}
