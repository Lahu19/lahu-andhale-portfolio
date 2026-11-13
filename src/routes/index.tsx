import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIWorkspace } from "@/components/portfolio/ai-workspace";
import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionHeading } from "@/components/portfolio/section";
import { getResume } from "@/lib/resume-store";

export const Route = createFileRoute("/")({
  loader: () => getResume(),
  head: ({ loaderData: r }) => ({
    meta: [
      { title: `${r.meta.name} — ${r.meta.title}` },
      { name: "description", content: r.meta.summary },
      { property: "og:title", content: `${r.meta.name} — ${r.meta.title}` },
      { property: "og:description", content: r.meta.heroDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const r = Route.useLoaderData();
  const { meta, projects, capabilities, tools, experiments, metrics } = r;

  const featured = [projects[2], projects[1], projects[0], projects[4]].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: meta.name,
            jobTitle: meta.title,
            description: meta.summary,
            worksFor: {
              "@type": "Organization",
              name: r.experience[0]?.company ?? "",
            },
            knowsAbout: Object.values(tools).flat().slice(0, 8),
            email: meta.email,
            url: meta.linkedin,
          }),
        }}
      />

      {/* ── Hero ── */}
      <section className="hero recruiter-hero">
        <div className="hero-topline">
          <p className="eyebrow">
            <span /> {meta.heroEyebrow}
          </p>
          <p>{meta.heroSubtitle}</p>
        </div>
        <h1>
          {meta.name}
          <span className="name-period">.</span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-copy">
            <h2>
              {meta.tagline1}
              <br />
              {meta.tagline2}
              <br />
              <span>{meta.tagline3}</span>
            </h2>
            <p className="hero-description">{meta.heroDescription}</p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <Link to="/work">
                  See selected work <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Experience &amp; background <ArrowRight />
                </Link>
              </Button>
            </div>
            <p className="hero-current">
              {r.experience[0]?.role?.toUpperCase()}{" "}
              <span>at {r.experience[0]?.company}</span>
            </p>
          </div>
          <div className="hero-product">
            <div className="workspace-caption">
              <span>INTERACTION STUDY / 001</span>
              <span>HUMAN × AGENT</span>
            </div>
            <AIWorkspace />
          </div>
        </div>
      </section>

      {/* ── Proof strip ── */}
      <section className="proof-strip" aria-label="Engineering achievements">
        {metrics.slice(0, 3).map((m) => (
          <div key={m.label}>
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </div>
        ))}
        <Link to="/about">
          The experience behind the work <ArrowUpRight />
        </Link>
      </section>

      {/* ── Selected work ── */}
      <section className="work section-pad recruiter-work">
        <SectionHeading
          eyebrow="01 / SELECTED WORK"
          title={
            <>
              Complex problems.
              <br />
              <span>Real solutions.</span>
            </>
          }
          copy="Professional engineering work and self-initiated studies. A look at the problem, the decisions, and the outcome."
        />
        <div className="featured-work">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
        </div>
        <div className="section-action">
          <Button asChild variant="outline" size="lg">
            <Link to="/work">
              Explore all case studies <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Perspective ── */}
      <section className="intro section-pad" id="intro">
        <p className="eyebrow">02 / PERSPECTIVE</p>
        <div>
          <h2>
            Not just writing code.
            <br />
            <span>Engineering systems that scale and self-heal.</span>
          </h2>
          <p>
            I build production backend systems where correctness, latency and resilience
            are not trade-offs — they are requirements. Lately that work has expanded into
            agentic AI workflows, where the system understands failures and fixes itself
            without waiting for a human to intervene.
          </p>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="capabilities section-pad">
        <SectionHeading
          eyebrow="03 / CAPABILITIES"
          title={
            <>
              One engineer.
              <br />
              Three connected disciplines.
            </>
          }
        />
        <div className="capability-grid">
          {capabilities.map((cap) => (
            <article key={cap.number} className="capability-card">
              <div className="capability-top">
                <span>{cap.number}</span>
                <ArrowUpRight />
              </div>
              <h3>{cap.title}</h3>
              <p>{cap.copy}</p>
              <div className="tag-cloud">
                {cap.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Agentic section ── */}
      <section className="agentic section-pad grid-surface">
        <SectionHeading
          eyebrow="04 / AGENTIC AI"
          title={
            <>
              Systems that don&apos;t just respond.
              <br />
              <span>They act, adapt, and recover.</span>
            </>
          }
        />
        <div className="agentic-grid">
          <div className="flow-compare">
            <div>
              <small>TRADITIONAL SYSTEM</small>
              <p>
                Request <ArrowRight /> Service <ArrowRight /> Response
              </p>
            </div>
            <div className="agentic-flow">
              <small>AGENTIC SYSTEM</small>
              {[
                "Receives intent",
                "Understands context",
                "Plans action",
                "Executes with tools",
                "Monitors result",
                "Self-heals on failure",
                "Logs & observes",
                "Improves over time",
              ].map((item, index) => (
                <span key={item}>
                  <i>{index < 6 ? `0${index + 1}` : <Check />}</i>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="principles">
            <p>
              Agentic backend systems need an engineering grammar for intent, planning,
              tool execution, failure recovery, and observability.
            </p>
            {[
              "Idempotent execution",
              "Exactly-once processing",
              "Self-healing workflows",
              "Observability first",
              "Fault tolerance",
              "Graceful degradation",
              "LLM-powered reasoning",
              "Human-in-the-loop",
            ].map((item) => (
              <span key={item}>
                <Check />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── About preview ── */}
      <section className="about-preview section-pad">
        <SectionHeading
          eyebrow="05 / ABOUT"
          title={
            <>
              {meta.aboutHeading1}
              <br />
              {meta.aboutHeading2}
              <br />
              <span>{meta.aboutHeading3}</span>
            </>
          }
        />
        <div className="about-copy">
          <p>{meta.aboutPara1}</p>
          <p>{meta.aboutPara2}</p>
          <Button asChild variant="outline">
            <Link to="/about">
              More about {meta.name.split(" ")[0]} <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="metrics section-pad">
        {metrics.map(({ value, label }) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      {/* ── Toolkit ── */}
      <section className="tools section-pad">
        <SectionHeading
          eyebrow="06 / TOOLKIT"
          title="Technologies that serve the problem."
          copy="The right choice depends on the system requirements, not personal preference."
        />
        <div className="tool-grid">
          {Object.entries(tools).map(([group, items]) => (
            <div key={group}>
              <h3>{group}</h3>
              <p>{items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lab ── */}
      <section className="lab section-pad">
        <SectionHeading eyebrow="07 / LAB" title="Things I am currently exploring." />
        <div className="experiment-strip">
          {experiments.slice(0, 5).map((experiment, index) => (
            <Link to="/experiments" key={experiment}>
              <span>0{index + 1}</span>
              <strong>{experiment}</strong>
              <div className={`mini-demo mini-demo-${index}`}>
                <i />
                <i />
                <i />
              </div>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="contact-cta section-pad">
        <p className="eyebrow">08 / CONTACT</p>
        <h2>
          Ready to build
          <br />
          something <span>real?</span>
        </h2>
        <p>
          Backend roles, distributed systems challenges, or AI-infrastructure projects —
          let's talk.
        </p>
        <div>
          <Button asChild size="lg">
            <Link to="/contact">
              Start a conversation <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
