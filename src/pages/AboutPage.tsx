import { Award, Check } from "lucide-react";
import { SectionHeading } from "@/components/portfolio/section";
import { useResume } from "@/lib/use-resume";

export default function AboutPage() {
  const r = useResume();
  if (!r) return null;
  const { meta, experience, education, achievements, metrics, tools, certifications } = r;

  return (
    <div className="page-shell">
      <header className="about-hero grid-surface">
        <p className="eyebrow">ABOUT / {meta.name.toUpperCase()}</p>
        <h1>{meta.aboutHeading1}<br />{meta.aboutHeading2}<br /><span>{meta.aboutHeading3}</span></h1>
        <div><p>{meta.aboutPara1}</p><p>{meta.aboutPara2}</p><p>{meta.aboutPara3}</p></div>
      </header>

      <section className="experience section-pad">
        <SectionHeading eyebrow="01 / EXPERIENCE" title="Building across backend and AI systems." />
        <div className="timeline">
          {experience.map((exp) => (
            <article key={exp.id}>
              <span>{exp.startDate.toUpperCase()} — {exp.endDate.toUpperCase()}</span>
              <div>
                <h3>{exp.company}</h3>
                <p className="role">{exp.role} · {exp.location}</p>
                <p>{exp.description}</p>
                {exp.tags.length > 0 && <div className="tag-cloud">{exp.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="recognition section-pad">
        <SectionHeading eyebrow="02 / ACHIEVEMENTS" title="Proof in the work." />
        <div className="metrics about-metrics">
          {metrics.map(({ value, label }) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
        <div className="recognition-list">
          {certifications?.map((cert) => (
            <p key={cert.id}><Award size={16} /> <strong>{cert.title}</strong> — {cert.issuer} ({cert.date}{cert.validUntil ? `, valid until ${cert.validUntil}` : ""})</p>
          ))}
          {achievements.map((a) => <p key={a}><Check /> {a}</p>)}
          {education.map((edu) => <p key={edu.id}><Check /> {edu.degree}, {edu.institution}{edu.cgpa ? ` · CGPA: ${edu.cgpa}` : ""} ({edu.startYear} – {edu.endYear})</p>)}
        </div>
      </section>

      <section className="tools section-pad">
        <SectionHeading eyebrow="03 / TOOLKIT" title="Technology serves the problem." />
        <div className="tool-grid">
          {Object.entries(tools).map(([group, items]) => <div key={group}><h3>{group}</h3><p>{items.join(" · ")}</p></div>)}
        </div>
      </section>
    </div>
  );
}
