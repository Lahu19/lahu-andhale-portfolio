import { useEffect, useState } from "react";
import type { ResumeData } from "./resume-types";

export function useResume() {
  const [data, setData] = useState<ResumeData | null>(null);
  useEffect(() => {
    fetch("/resume.json")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);
  return data;
}
