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
      <div className="workspace-agent"><div className="agent-icon"><Bot /></div><div><small>CAMPAIGN AGENT</small><p className="streaming-line">Analyzing audience and campaign context<span className="typing-dots">...</span></p><div className="workspace-steps">{steps.map((step,index)=><div className={index < visible ? "is-visible" : ""} key={step}>{index < visible ? <Check /> : <Circle />}<span>{step}</span></div>)}</div>{visible === steps.length && <p className="preparing"><ArrowRight /> Preparing recommendations</p>}</div></div>
      <div className="workspace-footer"><span>Human approval required</span><Button size="sm" disabled={visible < steps.length} onClick={() => setReviewed(true)}>{reviewed ? "Plan opened" : "Review plan"}<ArrowRight /></Button></div>
    </div>
  );
}
