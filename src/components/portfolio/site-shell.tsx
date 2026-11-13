import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const nav = [{ to: "/work", label: "Work" }, { to: "/about", label: "About" }, { to: "/experiments", label: "Experiments" }, { to: "/contact", label: "Contact" }] as const;

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  useEffect(() => { const onScroll = () => setCompact(window.scrollY > 40); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`site-header ${compact ? "is-compact" : ""}`}><div className="site-header-inner"><Link to="/" className="wordmark" aria-label="Lahu Andhale home">LAHU<small>&nbsp;ANDHALE</small></Link><nav className="desktop-nav" aria-label="Primary navigation">{nav.map((item)=><Link key={item.to} to={item.to} activeProps={{ className: "active" }}>{item.label}</Link>)}</nav><div className="header-actions"><Link to="/about" className="resume-link">Experience <ArrowUpRight /></Link><Button asChild size="sm"><Link to="/contact">Let's talk <ArrowUpRight /></Link></Button></div><Sheet><SheetTrigger asChild><Button className="mobile-menu" variant="outline" size="icon" aria-label="Open navigation"><Menu /></Button></SheetTrigger><SheetContent className="mobile-sheet"><SheetTitle>Navigation</SheetTitle><SheetDescription>Explore Lahu Andhale's portfolio.</SheetDescription><nav aria-label="Mobile navigation">{nav.map((item,index)=><SheetClose asChild key={item.to}><Link to={item.to}><span>0{index+1}</span>{item.label}<ArrowUpRight /></Link></SheetClose>)}<SheetClose asChild><Link to="/contact"><span>05</span>Let's talk<ArrowUpRight /></Link></SheetClose></nav></SheetContent></Sheet></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div><Link to="/" className="footer-brand">LAHU ANDHALE</Link><p>Backend · Distributed Systems · AI</p></div><div className="footer-roles"><span>Backend Engineer</span><span>AI Systems</span><span>Fintech</span></div><p>© 2026 Lahu Andhale</p></footer>;
}
