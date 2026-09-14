import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Mail, Send } from "lucide-react";
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
  const [sent, setSent] = useState(false);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    toast.success("Thanks — your note is ready to send.");
  }

  return (
    <div className="page-shell">
      <header className="contact-hero grid-surface">
        <p className="eyebrow">LET'S BUILD / CONTACT</p>
        <h1>Bring the rough idea.<br />I’ll help shape the <span>experience.</span></h1>
        <p>Whether you need a product interface, a thoughtful frontend system, an AI workflow, or a second pair of eyes on a complex interaction, I’d love to hear what you’re working on.</p>
      </header>
      <section className="contact-layout section-pad">
        <div className="contact-copy">
          <h2>Start with a useful conversation.</h2>
          <p>No pitch deck required. Share what you’re trying to make, where it feels stuck, and what a good outcome would look like.</p>
          <div className="contact-links">
            <a href="mailto:hello@lahuandhale.com"><span><Mail /> hello@lahuandhale.com</span><ArrowUpRight /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><span>LinkedIn <small>profile link to be updated</small></span><ArrowUpRight /></a>
            <a href="https://github.com/" target="_blank" rel="noreferrer"><span>GitHub <small>profile link to be updated</small></span><ArrowUpRight /></a>
            <a href="mailto:hello@lahuandhale.com?subject=Resume request"><span>Resume <small>available on request</small></span><ArrowUpRight /></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your name<Input name="name" placeholder="How should I address you?" required /></label>
          <label>Email address<Input name="email" type="email" placeholder="you@company.com" required /></label>
          <label>What are you building?<Textarea name="message" placeholder="A little context goes a long way." required /></label>
          <Button type="submit" size="lg" disabled={sent}>{sent ? <><Check /> Message noted</> : <><Send /> Send your note</>}</Button>
        </form>
      </section>
    </div>
  );
}