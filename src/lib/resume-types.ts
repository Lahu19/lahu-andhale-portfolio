export type Meta = {
  name: string; title: string; phone: string; email: string; linkedin: string; github: string;
  summary: string; tagline1: string; tagline2: string; tagline3: string;
  heroEyebrow: string; heroSubtitle: string; heroDescription: string;
  aboutHeading1: string; aboutHeading2: string; aboutHeading3: string;
  aboutPara1: string; aboutPara2: string; aboutPara3: string;
};
export type Experience = {
  id: string; company: string; role: string; location: string;
  startDate: string; endDate: string; description: string;
  bullets: string[]; tags: string[];
};
export type Education = {
  id: string; institution: string; degree: string; location: string;
  startYear: string; endYear: string; cgpa: string;
};
export type Certification = {
  id: string; title: string; issuer: string; date: string;
  validUntil?: string; credentialId?: string;
};
export type Metric = { value: string; label: string };
export type Capability = { number: string; title: string; copy: string; skills: string[] };
export type CaseStudy = {
  problem: string; users: string; constraints: string; exploration: string;
  architecture: string; visual: string; system: string; responsive: string;
  interaction: string; ai: string; engineering: string; challenges: string; learnings: string;
};
export type Project = {
  slug: string; number: string; title: string; kicker?: string;
  category: string; filters: string[]; description: string;
  tone: string; status: string; outcome: string; screens: string[];
  facts?: string[]; caseStudy: CaseStudy;
};
export type ResumeData = {
  meta: Meta; experience: Experience[]; education: Education[];
  certifications: Certification[]; achievements: string[];
  metrics: Metric[]; capabilities: Capability[];
  tools: Record<string, string[]>; experiments: string[]; projects: Project[];
};
