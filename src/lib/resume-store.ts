/**
 * Server-side helpers for reading and writing resume.json.
 * This module runs only on the server (Node / Cloudflare Workers).
 * On Workers, `fs` is unavailable — we fall back to returning the
 * bundled public/resume.json fetch so the app still works in production.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ─── Schema ───────────────────────────────────────────────────────────────────

export const MetaSchema = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  email: z.string(),
  linkedin: z.string(),
  github: z.string(),
  summary: z.string(),
  tagline1: z.string(),
  tagline2: z.string(),
  tagline3: z.string(),
  heroEyebrow: z.string(),
  heroSubtitle: z.string(),
  heroDescription: z.string(),
  aboutHeading1: z.string(),
  aboutHeading2: z.string(),
  aboutHeading3: z.string(),
  aboutPara1: z.string(),
  aboutPara2: z.string(),
  aboutPara3: z.string(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  bullets: z.array(z.string()),
  tags: z.array(z.string()),
});

export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  location: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  cgpa: z.string(),
});

export const CertificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  validUntil: z.string().optional(),
  credentialId: z.string().optional(),
});

export const MetricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const CapabilitySchema = z.object({
  number: z.string(),
  title: z.string(),
  copy: z.string(),
  skills: z.array(z.string()),
});

export const CaseStudySchema = z.object({
  problem: z.string(),
  users: z.string(),
  constraints: z.string(),
  exploration: z.string(),
  architecture: z.string(),
  visual: z.string(),
  system: z.string(),
  responsive: z.string(),
  interaction: z.string(),
  ai: z.string(),
  engineering: z.string(),
  challenges: z.string(),
  learnings: z.string(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  number: z.string(),
  title: z.string(),
  kicker: z.string().default(""),
  category: z.string(),
  filters: z.array(z.string()),
  description: z.string(),
  tone: z.string(),
  status: z.string(),
  outcome: z.string(),
  screens: z.array(z.string()),
  facts: z.array(z.string()).default([]),
  caseStudy: CaseStudySchema,
});

export const ResumeSchema = z.object({
  meta: MetaSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  certifications: z.array(CertificationSchema).optional().default([]),
  achievements: z.array(z.string()),
  metrics: z.array(MetricSchema),
  capabilities: z.array(CapabilitySchema),
  tools: z.record(z.string(), z.array(z.string())),
  experiments: z.array(z.string()),
  projects: z.array(ProjectSchema),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Capability = z.infer<typeof CapabilitySchema>;
export type Certification = z.infer<typeof CertificationSchema>;

// ─── Server functions ─────────────────────────────────────────────────────────

/**
 * Read resume.json.  In dev/node we read from disk so edits persist.
 * In production (Cloudflare Workers) we fetch from /resume.json.
 */
export const getResume = createServerFn({ method: "GET" }).handler(
  async (): Promise<ResumeData> => {
    try {
      // Node.js path (dev server & Node production)
      const { readFileSync } = await import("node:fs");
      const { resolve } = await import("node:path");
      // Resolve relative to CWD which is the project root in both dev and build
      const filePath = resolve(process.cwd(), "public", "resume.json");
      const raw = readFileSync(filePath, "utf-8");
      return ResumeSchema.parse(JSON.parse(raw));
    } catch {
      // Fallback: fetch the static file (Cloudflare Workers / edge)
      const res = await fetch("/resume.json");
      const raw = await res.json();
      return ResumeSchema.parse(raw);
    }
  },
);

/**
 * Write the full resume JSON back to disk.
 * Password must equal ADMIN_PASSWORD env var, or "lahu_admin" in dev.
 */
export const saveResume = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string(), data: ResumeSchema }))
  .handler(async ({ data: { password, data } }) => {
    const adminPassword =
      (typeof process !== "undefined" && process.env.ADMIN_PASSWORD) ||
      "lahu_admin";

    if (password !== adminPassword) {
      throw new Error("Unauthorized");
    }

    try {
      const { writeFileSync } = await import("node:fs");
      const { resolve } = await import("node:path");
      const filePath = resolve(process.cwd(), "public", "resume.json");
      writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      return { ok: true };
    } catch (err) {
      throw new Error(
        `Could not write resume.json: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  });
