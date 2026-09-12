import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow?: string; title: ReactNode; copy?: string; align?: "left" | "center" }) {
  return <header className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</header>;
}
