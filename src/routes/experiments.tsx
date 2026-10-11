import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Circle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/portfolio/section";
import { experiments } from "@/data/portfolio";

export const Route = createFileRoute("/experiments")({
  head: () => ({
    meta: [
      { title: "Experiments — Lahu Andhale" },
      { name: "description", content: "A living lab of agentic UI, adaptive interfaces, real-time collaboration, and human-in-the-loop product ideas." },
      { property: "og:title", content: "Experiments — Lahu Andhale" },
      { property: "og:description", content: "Explorations into what digital products can become when interfaces understand context and help people act." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/experiments" }],
  }),
  component: ExperimentsPage,
});

function ExperimentsPage() {
  const [active, setActive] = useState(0);
  const [approved, setApproved] = useState(false);
  const activeExperiment = experiments[active] ?? experiments[0];

  return (
    <div className="page-shell">
      <header className="page-hero grid-surface">
        <p className="eyebrow">LAB / OPEN EXPLORATIONS</p>
        <h1>Testing the edges of <span>interface.</span></h1>
        <p>Small, focused explorations into agentic products, adaptive systems, and the interaction patterns that make new technology feel understandable.</p>
      </header>
      <section className="experiments-page section-pad">
        <SectionHeading eyebrow="01 / ACTIVE LAB" title="Ideas become clearer when they can be used." copy="Each study is a prompt to explore a different relationship between user intent, system behavior, and interface feedback." />
        <div className="experiment-lab">
          <div className="experiment-list" role="tablist" aria-label="Experiment topics">
            {experiments.map((experiment, index) => (
              <Button variant="ghost" key={experiment} className={active === index ? "active" : ""} onClick={() => { setActive(index); setApproved(false); }} role="tab" aria-selected={active === index}>
                <span>0{index + 1}</span>{experiment}<ArrowRight />
              </Button>
            ))}
          </div>
          <div className="experiment-detail" role="tabpanel">
            <div className="experiment-detail-head"><span><Sparkles /> CURRENT EXPLORATION</span><i>0{active + 1} / 10</i></div>
            <h2>{activeExperiment}</h2>
            <p>{activeExperiment} explores how a product can make context visible before asking a person to make a decision.</p>
            <div className="experiment-demo">
              <div className="demo-toolbar"><span>WORKFLOW / DRAFT</span><span className="demo-live"><i /> LISTENING</span></div>
              {["Understand intent", "Prepare a reversible plan", "Ask for approval"].map((step, index) => (
                <div className="demo-step" key={step}><span>{index < 2 || approved ? <Check /> : <Circle />}</span><div><strong>{step}</strong><small>{index === 0 ? "Context gathered from the current workspace" : index === 1 ? "Actions are previewed before they happen" : approved ? "Approved by you" : "Waiting for your review"}</small></div></div>
              ))}
              <Button size="sm" onClick={() => setApproved(true)} disabled={approved}>{approved ? "Approved" : "Approve next step"}<ArrowRight /></Button>
            </div>
          </div>
        </div>
      </section>
      <section className="lab-notes section-pad grid-surface">
        <SectionHeading eyebrow="02 / NOTES" title="Principles I keep testing." />
        <div className="lab-note-grid">{["Make system state legible.", "Keep consequential actions reversible.", "Let people inspect the reasoning.", "Design the handoff, not only the answer."].map((note, index) => <article key={note}><span>0{index + 1}</span><h3>{note}</h3><p>Good product behavior turns uncertainty into a clear next question.</p></article>)}</div>
      </section>
    </div>
  );
}