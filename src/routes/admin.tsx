import { useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Plus,
  Trash2,
  Save,
  Lock,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getResume, saveResume, type ResumeData, type Project, type Experience } from "@/lib/resume-store";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Resume Editor" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: () => getResume(),
  component: AdminPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  multiline = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <div className="admin-field">
      <label className="admin-label">
        {label}
        {hint && <span className="admin-hint"> — {hint}</span>}
      </label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="admin-input"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input"
        />
      )}
    </div>
  );
}

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="admin-section">
      <button className="admin-section-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>{title}</span>
      </button>
      {open && <div className="admin-section-body">{children}</div>}
    </div>
  );
}

function TagListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <div className="admin-tag-list">
        {items.map((item, i) => (
          <span key={i} className="admin-tag">
            {item}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="admin-tag-add">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add item..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              e.preventDefault();
              onChange([...items, draft.trim()]);
              setDraft("");
            }
          }}
          className="admin-input"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            if (draft.trim()) {
              onChange([...items, draft.trim()]);
              setDraft("");
            }
          }}
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  );
}

// ─── Project editor ───────────────────────────────────────────────────────────

function ProjectEditor({
  project,
  index,
  onChange,
  onRemove,
}: {
  project: Project;
  index: number;
  onChange: (p: Project) => void;
  onRemove: () => void;
}) {
  const set = <K extends keyof Project>(key: K, val: Project[K]) =>
    onChange({ ...project, [key]: val });
  const setCS = <K extends keyof Project["caseStudy"]>(
    key: K,
    val: string,
  ) => onChange({ ...project, caseStudy: { ...project.caseStudy, [key]: val } });

  return (
    <Section title={`${project.number} — ${project.title || "Untitled"}`}>
      <div className="admin-row-2">
        <Field label="Number" value={project.number} onChange={(v) => set("number", v)} />
        <Field label="Slug (URL)" value={project.slug} onChange={(v) => set("slug", v)} />
      </div>
      <Field label="Title" value={project.title} onChange={(v) => set("title", v)} />
      <Field label="Kicker (optional badge)" value={project.kicker ?? ""} onChange={(v) => set("kicker", v)} />
      <Field label="Category" value={project.category} onChange={(v) => set("category", v)} />
      <Field label="Tone (visual theme)" value={project.tone} onChange={(v) => set("tone", v as Project["tone"])} hint="legal | cogrow | flux | savr | agent | orbit | signal" />
      <Field label="Status" value={project.status} onChange={(v) => set("status", v)} />
      <Field label="Description" value={project.description} onChange={(v) => set("description", v)} multiline />
      <Field label="Outcome" value={project.outcome} onChange={(v) => set("outcome", v)} multiline />
      <TagListEditor label="Screens (press Enter to add)" items={project.screens} onChange={(v) => set("screens", v)} />
      <TagListEditor label="Facts / badges (press Enter to add)" items={project.facts ?? []} onChange={(v) => set("facts", v)} />
      <TagListEditor label="Filters" items={project.filters} onChange={(v) => set("filters", v)} />

      <div className="admin-subsection-label">Case Study</div>
      {(
        [
          ["problem", "The problem"],
          ["users", "The people / users"],
          ["constraints", "Constraints"],
          ["exploration", "Exploration"],
          ["architecture", "Architecture"],
          ["visual", "Visual direction"],
          ["system", "System thinking"],
          ["responsive", "Responsive behavior"],
          ["interaction", "Interaction model"],
          ["ai", "AI behavior"],
          ["engineering", "Engineering"],
          ["challenges", "Challenges"],
          ["learnings", "Learnings"],
        ] as [keyof Project["caseStudy"], string][]
      ).map(([key, label]) => (
        <Field
          key={key}
          label={label}
          value={project.caseStudy[key]}
          onChange={(v) => setCS(key, v)}
          multiline
        />
      ))}

      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="admin-remove-btn"
        onClick={onRemove}
      >
        <Trash2 size={14} /> Remove project #{index + 1}
      </Button>
    </Section>
  );
}

// ─── Experience editor ────────────────────────────────────────────────────────

function ExperienceEditor({
  exp,
  onChange,
  onRemove,
}: {
  exp: Experience;
  onChange: (e: Experience) => void;
  onRemove: () => void;
}) {
  const set = <K extends keyof Experience>(key: K, val: Experience[K]) =>
    onChange({ ...exp, [key]: val });

  return (
    <Section title={`${exp.company} — ${exp.role}`}>
      <Field label="ID (unique key)" value={exp.id} onChange={(v) => set("id", v)} />
      <div className="admin-row-2">
        <Field label="Company" value={exp.company} onChange={(v) => set("company", v)} />
        <Field label="Role / Title" value={exp.role} onChange={(v) => set("role", v)} />
      </div>
      <div className="admin-row-2">
        <Field label="Location" value={exp.location} onChange={(v) => set("location", v)} />
        <Field label="Start Date" value={exp.startDate} onChange={(v) => set("startDate", v)} />
      </div>
      <Field label="End Date (or 'Present')" value={exp.endDate} onChange={(v) => set("endDate", v)} />
      <Field label="Short description" value={exp.description} onChange={(v) => set("description", v)} multiline />
      <div className="admin-field">
        <label className="admin-label">Bullet points (one per line)</label>
        <Textarea
          rows={6}
          value={exp.bullets.join("\n")}
          onChange={(e) =>
            set(
              "bullets",
              e.target.value.split("\n").filter((l) => l.trim()),
            )
          }
          className="admin-input"
        />
      </div>
      <TagListEditor label="Tags / highlights (press Enter)" items={exp.tags} onChange={(v) => set("tags", v)} />
      <Button type="button" variant="destructive" size="sm" className="admin-remove-btn" onClick={onRemove}>
        <Trash2 size={14} /> Remove experience
      </Button>
    </Section>
  );
}

// ─── Main admin page ──────────────────────────────────────────────────────────

function AdminPage() {
  const serverData = Route.useLoaderData();
  const [data, setData] = useState<ResumeData>(serverData);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [rawJson, setRawJson] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // ── Auth gate ──
  if (!authed) {
    return (
      <div className="admin-auth-gate">
        <div className="admin-auth-box">
          <Lock size={32} />
          <h1>Admin — Resume Editor</h1>
          <p>Enter the admin password to continue.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password.trim()) setAuthed(true);
            }}
          >
            <div className="admin-pw-row">
              <Input
                type={showPw ? "text" : "password"}
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="admin-input"
              />
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowPw((s) => !s)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <Button type="submit" size="lg" className="admin-login-btn">
              Enter editor
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // ── Helpers ──
  const setMeta = (key: keyof ResumeData["meta"], val: string) =>
    setData((d) => ({ ...d, meta: { ...d.meta, [key]: val } }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveResume({ data: { password, data } });
      toast.success("resume.json saved — portfolio updated instantly.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Unauthorized")) {
        toast.error("Wrong password.");
        setAuthed(false);
      } else {
        toast.error(`Save failed: ${msg}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleRawApply = () => {
    try {
      const parsed = JSON.parse(rawJson) as ResumeData;
      setData(parsed);
      setShowRaw(false);
      toast.success("Raw JSON applied. Click Save to persist.");
    } catch {
      toast.error("Invalid JSON — check for syntax errors.");
    }
  };

  return (
    <div className="admin-shell" ref={topRef}>
      {/* ── Header ── */}
      <header className="admin-header">
        <div>
          <p className="eyebrow">ADMIN / RESUME EDITOR</p>
          <h1>Resume Editor</h1>
          <p className="admin-subtitle">
            Changes save to <code>public/resume.json</code> and reflect on the
            portfolio instantly — no redeployment needed.
          </p>
        </div>
        <div className="admin-header-actions">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setRawJson(JSON.stringify(data, null, 2));
              setShowRaw((s) => !s);
            }}
          >
            {showRaw ? "Hide" : "Edit"} raw JSON
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            size="lg"
          >
            {saving ? <RefreshCw size={16} className="spin" /> : <Save size={16} />}
            {saving ? "Saving…" : "Save to resume.json"}
          </Button>
        </div>
      </header>

      {/* ── Raw JSON editor ── */}
      {showRaw && (
        <div className="admin-raw">
          <Textarea
            value={rawJson}
            onChange={(e) => setRawJson(e.target.value)}
            rows={30}
            className="admin-input admin-raw-textarea"
            spellCheck={false}
          />
          <div className="admin-raw-actions">
            <Button type="button" variant="outline" onClick={() => setShowRaw(false)}>
              Discard
            </Button>
            <Button type="button" onClick={handleRawApply}>
              Apply JSON
            </Button>
          </div>
        </div>
      )}

      {/* ── Identity / Meta ── */}
      <Section title="Identity & Meta" defaultOpen>
        <div className="admin-row-2">
          <Field label="Full name" value={data.meta.name} onChange={(v) => setMeta("name", v)} />
          <Field label="Job title" value={data.meta.title} onChange={(v) => setMeta("title", v)} />
        </div>
        <div className="admin-row-2">
          <Field label="Phone" value={data.meta.phone} onChange={(v) => setMeta("phone", v)} />
          <Field label="Email" value={data.meta.email} onChange={(v) => setMeta("email", v)} />
        </div>
        <div className="admin-row-2">
          <Field label="LinkedIn URL" value={data.meta.linkedin} onChange={(v) => setMeta("linkedin", v)} />
          <Field label="GitHub URL" value={data.meta.github} onChange={(v) => setMeta("github", v)} />
        </div>
        <Field label="Summary (used in meta description)" value={data.meta.summary} onChange={(v) => setMeta("summary", v)} multiline />
        <div className="admin-subsection-label">Hero section</div>
        <Field label="Eyebrow label" value={data.meta.heroEyebrow} onChange={(v) => setMeta("heroEyebrow", v)} />
        <Field label="Subtitle line" value={data.meta.heroSubtitle} onChange={(v) => setMeta("heroSubtitle", v)} />
        <Field label="Description paragraph" value={data.meta.heroDescription} onChange={(v) => setMeta("heroDescription", v)} multiline />
        <div className="admin-row-3">
          <Field label="Tagline 1" value={data.meta.tagline1} onChange={(v) => setMeta("tagline1", v)} />
          <Field label="Tagline 2" value={data.meta.tagline2} onChange={(v) => setMeta("tagline2", v)} />
          <Field label="Tagline 3 (highlight)" value={data.meta.tagline3} onChange={(v) => setMeta("tagline3", v)} />
        </div>
        <div className="admin-subsection-label">About page headings</div>
        <div className="admin-row-3">
          <Field label="Heading line 1" value={data.meta.aboutHeading1} onChange={(v) => setMeta("aboutHeading1", v)} />
          <Field label="Heading line 2" value={data.meta.aboutHeading2} onChange={(v) => setMeta("aboutHeading2", v)} />
          <Field label="Heading line 3 (highlight)" value={data.meta.aboutHeading3} onChange={(v) => setMeta("aboutHeading3", v)} />
        </div>
        <Field label="About paragraph 1" value={data.meta.aboutPara1} onChange={(v) => setMeta("aboutPara1", v)} multiline />
        <Field label="About paragraph 2" value={data.meta.aboutPara2} onChange={(v) => setMeta("aboutPara2", v)} multiline />
        <Field label="About paragraph 3" value={data.meta.aboutPara3} onChange={(v) => setMeta("aboutPara3", v)} multiline />
      </Section>

      {/* ── Experience ── */}
      <Section title={`Experience (${data.experience.length})`}>
        {data.experience.map((exp, i) => (
          <ExperienceEditor
            key={exp.id}
            exp={exp}
            onChange={(updated) =>
              setData((d) => {
                const arr = [...d.experience];
                arr[i] = updated;
                return { ...d, experience: arr };
              })
            }
            onRemove={() =>
              setData((d) => ({
                ...d,
                experience: d.experience.filter((_, j) => j !== i),
              }))
            }
          />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setData((d) => ({
              ...d,
              experience: [
                ...d.experience,
                {
                  id: `exp-${Date.now()}`,
                  company: "New Company",
                  role: "Role",
                  location: "",
                  startDate: "",
                  endDate: "Present",
                  description: "",
                  bullets: [],
                  tags: [],
                },
              ],
            }))
          }
        >
          <Plus size={14} /> Add experience
        </Button>
      </Section>

      {/* ── Education ── */}
      <Section title={`Education (${data.education.length})`}>
        {data.education.map((edu, i) => (
          <Section key={edu.id} title={edu.institution}>
            <Field label="Institution" value={edu.institution} onChange={(v) =>
              setData((d) => { const arr = [...d.education]; arr[i] = { ...arr[i], institution: v }; return { ...d, education: arr }; })
            } />
            <Field label="Degree" value={edu.degree} onChange={(v) =>
              setData((d) => { const arr = [...d.education]; arr[i] = { ...arr[i], degree: v }; return { ...d, education: arr }; })
            } />
            <div className="admin-row-2">
              <Field label="Location" value={edu.location} onChange={(v) =>
                setData((d) => { const arr = [...d.education]; arr[i] = { ...arr[i], location: v }; return { ...d, education: arr }; })
              } />
              <Field label="CGPA" value={edu.cgpa} onChange={(v) =>
                setData((d) => { const arr = [...d.education]; arr[i] = { ...arr[i], cgpa: v }; return { ...d, education: arr }; })
              } />
            </div>
            <div className="admin-row-2">
              <Field label="Start year" value={edu.startYear} onChange={(v) =>
                setData((d) => { const arr = [...d.education]; arr[i] = { ...arr[i], startYear: v }; return { ...d, education: arr }; })
              } />
              <Field label="End year" value={edu.endYear} onChange={(v) =>
                setData((d) => { const arr = [...d.education]; arr[i] = { ...arr[i], endYear: v }; return { ...d, education: arr }; })
              } />
            </div>
            <Button type="button" variant="destructive" size="sm" className="admin-remove-btn"
              onClick={() => setData((d) => ({ ...d, education: d.education.filter((_, j) => j !== i) }))}>
              <Trash2 size={14} /> Remove
            </Button>
          </Section>
        ))}
        <Button type="button" variant="outline" size="sm"
          onClick={() => setData((d) => ({
            ...d,
            education: [...d.education, {
              id: `edu-${Date.now()}`, institution: "Institution", degree: "Degree",
              location: "", startYear: "", endYear: "", cgpa: "",
            }],
          }))}>
          <Plus size={14} /> Add education
        </Button>
      </Section>

      {/* ── Metrics ── */}
      <Section title={`Key Metrics (${data.metrics.length})`}>
        {data.metrics.map((m, i) => (
          <div key={i} className="admin-row-metric">
            <div className="admin-row-2" style={{ flex: 1 }}>
              <Field label="Value" value={m.value} onChange={(v) =>
                setData((d) => { const arr = [...d.metrics]; arr[i] = { ...arr[i], value: v }; return { ...d, metrics: arr }; })
              } />
              <Field label="Label" value={m.label} onChange={(v) =>
                setData((d) => { const arr = [...d.metrics]; arr[i] = { ...arr[i], label: v }; return { ...d, metrics: arr }; })
              } />
            </div>
            <Button type="button" variant="ghost" size="sm"
              onClick={() => setData((d) => ({ ...d, metrics: d.metrics.filter((_, j) => j !== i) }))}>
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm"
          onClick={() => setData((d) => ({ ...d, metrics: [...d.metrics, { value: "", label: "" }] }))}>
          <Plus size={14} /> Add metric
        </Button>
      </Section>

      {/* ── Achievements ── */}
      <Section title={`Achievements (${data.achievements.length})`}>
        {data.achievements.map((a, i) => (
          <div key={i} className="admin-row-metric">
            <Field
              label={`Achievement ${i + 1}`}
              value={a}
              onChange={(v) =>
                setData((d) => { const arr = [...d.achievements]; arr[i] = v; return { ...d, achievements: arr }; })
              }
              multiline
            />
            <Button type="button" variant="ghost" size="sm"
              onClick={() => setData((d) => ({ ...d, achievements: d.achievements.filter((_, j) => j !== i) }))}>
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm"
          onClick={() => setData((d) => ({ ...d, achievements: [...d.achievements, ""] }))}>
          <Plus size={14} /> Add achievement
        </Button>
      </Section>

      {/* ── Capabilities ── */}
      <Section title={`Capabilities (${data.capabilities.length})`}>
        {data.capabilities.map((cap, i) => (
          <Section key={cap.number} title={`${cap.number} — ${cap.title}`}>
            <div className="admin-row-2">
              <Field label="Number" value={cap.number} onChange={(v) =>
                setData((d) => { const arr = [...d.capabilities]; arr[i] = { ...arr[i], number: v }; return { ...d, capabilities: arr }; })
              } />
              <Field label="Title" value={cap.title} onChange={(v) =>
                setData((d) => { const arr = [...d.capabilities]; arr[i] = { ...arr[i], title: v }; return { ...d, capabilities: arr }; })
              } />
            </div>
            <Field label="Copy" value={cap.copy} onChange={(v) =>
              setData((d) => { const arr = [...d.capabilities]; arr[i] = { ...arr[i], copy: v }; return { ...d, capabilities: arr }; })
            } multiline />
            <TagListEditor label="Skills (press Enter)" items={cap.skills} onChange={(v) =>
              setData((d) => { const arr = [...d.capabilities]; arr[i] = { ...arr[i], skills: v }; return { ...d, capabilities: arr }; })
            } />
            <Button type="button" variant="destructive" size="sm" className="admin-remove-btn"
              onClick={() => setData((d) => ({ ...d, capabilities: d.capabilities.filter((_, j) => j !== i) }))}>
              <Trash2 size={14} /> Remove
            </Button>
          </Section>
        ))}
        <Button type="button" variant="outline" size="sm"
          onClick={() => setData((d) => ({
            ...d,
            capabilities: [...d.capabilities, { number: `0${d.capabilities.length + 1}`, title: "New Capability", copy: "", skills: [] }],
          }))}>
          <Plus size={14} /> Add capability
        </Button>
      </Section>

      {/* ── Toolkit ── */}
      <Section title="Toolkit / Tools">
        {Object.entries(data.tools).map(([group, items]) => (
          <div key={group} className="admin-tools-group">
            <div className="admin-row-metric">
              <div style={{ flex: 1 }}>
                <TagListEditor
                  label={group}
                  items={items}
                  onChange={(v) =>
                    setData((d) => ({ ...d, tools: { ...d.tools, [group]: v } }))
                  }
                />
              </div>
              <Button type="button" variant="ghost" size="sm"
                onClick={() => setData((d) => {
                  const { [group]: _, ...rest } = d.tools;
                  return { ...d, tools: rest };
                })}>
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm"
          onClick={() => {
            const name = `New Group ${Object.keys(data.tools).length + 1}`;
            setData((d) => ({ ...d, tools: { ...d.tools, [name]: [] } }));
          }}>
          <Plus size={14} /> Add tool group
        </Button>
      </Section>

      {/* ── Experiments ── */}
      <Section title={`Experiments / Lab (${data.experiments.length})`}>
        <TagListEditor
          label="Experiment topics (press Enter to add)"
          items={data.experiments}
          onChange={(v) => setData((d) => ({ ...d, experiments: v }))}
        />
      </Section>

      {/* ── Projects ── */}
      <Section title={`Projects (${data.projects.length})`}>
        {data.projects.map((project, i) => (
          <ProjectEditor
            key={project.slug}
            project={project}
            index={i}
            onChange={(updated) =>
              setData((d) => {
                const arr = [...d.projects];
                arr[i] = updated;
                return { ...d, projects: arr };
              })
            }
            onRemove={() =>
              setData((d) => ({
                ...d,
                projects: d.projects.filter((_, j) => j !== i),
              }))
            }
          />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setData((d) => ({
              ...d,
              projects: [
                ...d.projects,
                {
                  slug: `project-${Date.now()}`,
                  number: `0${d.projects.length + 1}`,
                  title: "New Project",
                  kicker: "",
                  category: "",
                  filters: [],
                  description: "",
                  tone: "signal",
                  status: "",
                  outcome: "",
                  screens: [],
                  facts: [],
                  caseStudy: {
                    problem: "",
                    users: "",
                    constraints: "",
                    exploration: "",
                    architecture: "",
                    visual: "",
                    system: "",
                    responsive: "",
                    interaction: "",
                    ai: "",
                    engineering: "",
                    challenges: "",
                    learnings: "",
                  },
                },
              ],
            }))
          }
        >
          <Plus size={14} /> Add project
        </Button>
      </Section>

      {/* ── Sticky save footer ── */}
      <div className="admin-save-footer">
        <Button type="button" onClick={handleSave} disabled={saving} size="lg">
          {saving ? <RefreshCw size={16} className="spin" /> : <Save size={16} />}
          {saving ? "Saving…" : "Save to resume.json"}
        </Button>
        <span className="admin-save-note">
          Saves to <code>public/resume.json</code> — portfolio reflects changes on next page load.
        </span>
      </div>
    </div>
  );
}
