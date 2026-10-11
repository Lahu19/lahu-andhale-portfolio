import { useEffect, useState } from "react";
import { ArrowRight, Bot, Check, Circle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = ["Audience identified", "Campaign goals defined", "Influencer segments found"];

export function AIWorkspace() {
  const [visible, setVisible] = useState(0);
  const [reviewed, setReviewed] = useState(false);
  useEffect(() => {
    if (visible >= steps.length) return;
    const timer = window.setTimeout(() => setVisible((value) => value + 1), 850);
    return () => window.clearTimeout(timer);
  }, [visible]);
  return (
    <div className="ai-workspace" aria-label="Interactive AI campaign workspace">
      <div className="workspace-head"><span><Sparkles /> AI WORKSPACE</span><span className="live-status"><i /> LIVE</span></div>
      <div className="workspace-user"><small>YOU</small><p>Prepare a campaign plan for our next launch.</p></div>
      <div className="workspace-agent"><div className="agent-icon"><Bot /></div><div><small>CAMPAIGN AGENT</small><p className="streaming-line">{visible < steps.length ? "Analyzing campaign context…" : "Campaign context is ready."}</p><div className="workspace-steps">{steps.map((step,index)=><div className={index < visible ? "is-visible" : ""} key={step}>{index < visible ? <Check /> : <Circle />}<span>{step}</span></div>)}</div>{visible === steps.length && <p className="preparing"><ArrowRight /> {reviewed ? "Recommendations ready for your review" : "Preparing recommendations"}</p>}</div></div>
      {reviewed && <div className="workspace-plan" aria-live="polite"><small>PROPOSED PLAN</small><p>Shortlist relevant creators, compare audience fit, and draft outreach.</p><span>No outreach will be sent without your approval.</span></div>}
      <div className="workspace-footer"><span>Human approval required</span><Button size="sm" disabled={visible < steps.length} onClick={() => setReviewed(value => !value)}>{reviewed ? "Close plan" : "Review plan"}<ArrowRight /></Button></div>
    </div>
  );
}
