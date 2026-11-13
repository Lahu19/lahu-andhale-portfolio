import { Activity, ArrowUpRight, Bot, Check, CircleDollarSign, FileText, Search, Sparkles, Users } from "lucide-react";
import type { Project } from "@/lib/resume-store";

const chart = [34, 48, 41, 68, 57, 77, 72, 91, 84, 96];

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-visual tone-${project.tone} ${compact ? "project-visual-compact" : ""}`} role="img" aria-label={`${project.title} product interface preview`}>
      <div className="mock-window">
        <div className="mock-topbar">
          <span className="mock-brand"><span className="status-dot" />{project.title}</span>
          <div className="mock-search"><Search aria-hidden="true" /> Search workspace</div>
          <span className="mock-avatar">LA</span>
        </div>
        <div className="mock-layout">
          <aside className="mock-sidebar" aria-hidden="true">
            <span className="active" /><span /><span /><span /><span />
          </aside>
          <div className="mock-main">
            <div className="mock-heading-row">
              <div><small>LIVE OVERVIEW</small><strong>{project.screens[0]}</strong></div>
              <span className="mock-action"><Sparkles /> Analyze</span>
            </div>
            {project.tone === "agent" ? <AgentPanel /> : project.tone === "cogrow" ? <CreatorPanel /> : project.tone === "flux" ? <RoutingPanel /> : project.tone === "legal" ? <LegalPanel /> : <DashboardPanel project={project} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPanel({ project }: { project: Project }) {
  return (
    <div className="mock-dashboard">
      <div className="mock-stat-row">
        {["Health", "Activity", "Success"].map((item, index) => <div className="mock-stat" key={item}><span>{item}</span><strong>{index === 0 ? "98.4%" : index === 1 ? "2,841" : "+12.6%"}</strong><small>{index === 1 ? "live events" : "stable"}</small></div>)}
      </div>
      <div className="mock-content-grid">
        <div className="mock-chart"><div className="chart-title"><span>System activity</span><Activity /></div><div className="bars">{chart.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="chart-line" /></div>
        <div className="mock-insight"><span className="ai-label"><Bot /> AI INSIGHT</span><strong>{project.tone === "savr" ? "Spending increased 18%" : project.tone === "flux" ? "Provider health is stable" : "3 items need attention"}</strong><p>{project.tone === "savr" ? "Dining and travel explain most of the change." : "Signals analyzed with context and supporting evidence."}</p><span className="insight-link">Review analysis <ArrowUpRight /></span></div>
      </div>
      <div className="mock-table"><div className="table-row header"><span>Item</span><span>Status</span><span>Updated</span></div>{project.screens.slice(1,4).map((screen, index) => <div className="table-row" key={screen}><span><FileText /> {screen}</span><span><i className="status-dot" /> {index === 1 ? "Review" : "Ready"}</span><span>{index + 2}m ago</span></div>)}</div>
    </div>
  );
}

function RoutingPanel() {
  return <div className="routing-panel"><div className="routing-summary"><div><small>ROUTING ENGINE</small><strong>&lt;30<span>ms</span></strong><p>Routing decision target</p></div><div><span className="status-dot" /> All providers operational<small>ILLUSTRATIVE LIVE STATE</small></div></div><div className="routing-map"><div className="routing-origin"><CircleDollarSign /><strong>Payment request</strong><small>UPI · Cards · Wallets</small></div><ArrowUpRight /><div className="routing-engine"><Activity /><strong>Flux engine</strong><small>Rules + Redis state</small></div><div className="routing-providers">{["UPI gateway", "Card network", "Digital wallet"].map((provider, index) => <div key={provider}><span className="status-dot" /><span>{provider}</span><small>{index === 0 ? "SELECTED" : "STANDBY"}</small></div>)}</div></div><div className="routing-stream"><span><Activity /> EVENT STREAM</span><div><i />Request validated <small>Idempotency checked</small></div><div><i />Healthy path selected <small>Rule-based decision</small></div><div><i />Event published <small>Kafka → Monitoring</small></div></div></div>;
}

function LegalPanel() {
  return <div className="legal-panel"><div className="legal-matter"><small>ACTIVE MATTER / SAMPLE</small><strong>Commercial agreement review</strong><p>Documents, decisions, and context in one workspace.</p><div className="legal-doc"><FileText /><div><strong>Service agreement.pdf</strong><small>Version 03 · Ready for review</small></div><span>12 pages</span></div><div className="legal-lines"><i /><i /><i /><i /></div><div className="legal-timeline"><span><Check /> Document received</span><span><Check /> Context prepared</span><span><Activity /> Review in progress</span></div></div><div className="legal-assistant"><span className="ai-label"><Sparkles /> REVIEW ASSISTANT</span><strong>Key terms, in context.</strong><p>Termination, liability, and renewal clauses are ready for human review.</p><div><FileText /> 3 relevant sections</div><small>Source-linked · Review required</small></div></div>;
}

function CreatorPanel() {
  return <div className="creator-layout"><div className="creator-filters"><span>Discovery</span><strong>Find the right creators</strong><div className="filter-line" /><div className="filter-line short" /><div className="filter-line" /></div><div className="creator-grid">{["AK","RM","NV","SP"].map((name,index)=><div className="creator-card" key={name}><span className="creator-photo">{name}</span><strong>{["Aarohi K.","Rhea M.","Neel V.","Sara P."][index]}</strong><small>{["Fitness","Lifestyle","Tech","Wellness"][index]} · India</small><div><Users /> {(42 + index * 17)}K</div></div>)}</div><div className="copilot"><span><Sparkles /> CAMPAIGN COPILOT</span><p>4 creator segments match your Gen Z fitness brief.</p><strong>Review shortlist →</strong></div></div>;
}

function AgentPanel() {
  const agents = ["Research Agent", "Strategy Agent", "Design Agent", "Execution Agent"];
  return <div className="agent-layout"><div className="agent-task"><small>ACTIVE TASK</small><strong>Product launch campaign</strong><p>Prepare a landing page campaign for our next launch.</p>{agents.map((agent,index)=><div className="agent-row" key={agent}><span className={index < 2 ? "done" : index === 2 ? "working" : ""}>{index < 2 ? <Check /> : <Bot />}</span><div><strong>{agent}</strong><small>{index < 2 ? "Completed" : index === 2 ? "Building page direction…" : "Waiting"}</small></div></div>)}</div><div className="agent-context"><small>ACTION PREVIEW</small><strong>3 page directions ready</strong><p>The Design Agent has prepared options based on approved research.</p><div><span>Reject</span><span className="approve">Approve</span></div></div></div>;
}
