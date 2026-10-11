import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Lahu Andhale — Let's Build" },
      { name: "description", content: "Start a conversation with Lahu Andhale about product interfaces, frontend systems, AI workflows, and digital experiences." },
      { property: "og:title", content: "Contact Lahu Andhale — Let's Build" },
      { property: "og:description", content: "Have a product idea, interface challenge, or AI workflow worth building? Start a conversation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const message = `Name: ${values.get("name")}\nEmail: ${values.get("email")}\n\n${values.get("message")}`;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast.success("Message copied. Nothing has been sent.");
    } catch {
      toast.error("Could not copy. Please select and copy your message manually.");
    }
  }

  return (
    <div className="page-shell">
      <header className="contact-hero grid-surface">
        <p className="eyebrow">CONTACT / LAHU ANDHALE</p>
        <h1>Good products start<br />with a <span>conversation.</span></h1>
        <p>A frontend role, a product challenge, or an AI experience worth exploring — let's talk about what your team wants to build.</p>
      </header>
      <section className="contact-layout section-pad">
        <div className="contact-copy">
          <h2>Design thinking.<br />Engineering follow-through.</h2>
          <p>I’m interested in work where product design, frontend engineering, and AI meet.</p>
          <div className="contact-summary">
            <div><small>PRODUCT INTERFACES</small><p>Enterprise workflows, financial products, and experiences that make complex information clear.</p></div>
            <div><small>FRONTEND ENGINEERING</small><p>Reusable systems, real-time interactions, and thoughtful implementation across screen sizes.</p></div>
            <div><small>AI & AGENTIC UI</small><p>Transparent progress, understandable recommendations, and human approval before action.</p></div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} onChange={() => setCopied(false)}>
          <label>Your name<Input name="name" placeholder="How should I address you?" required /></label>
          <label>Email address<Input name="email" type="email" placeholder="you@company.com" required /></label>
          <label>Your message<Textarea name="message" placeholder="Tell me about the role, your team, or the product." required /></label>
          <p className="draft-note">Direct contact details are not connected yet. You can prepare and copy a message; this form does not send it.</p>
          <Button type="submit" size="lg">{copied ? <><Check /> Message copied</> : <><Copy /> Copy message draft</>}</Button>
        </form>
      </section>
    </div>
  );
}