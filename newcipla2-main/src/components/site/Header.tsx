import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/patients", label: "For Patients" },
  { to: "/doctors", label: "For Doctors" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-lg shadow-soft border-b border-border/60" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-11 h-11 rounded-full grid place-items-center group-hover:scale-105 transition-transform"
               style={{ background: "linear-gradient(135deg, #3270B8 0%, #5DC4D0 100%)", boxShadow: "0 6px 20px -6px rgba(50,112,184,0.5)" }}>
            <div className="w-4 h-4 rounded-full bg-white" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-2xl tracking-tight">
              <span style={{ color: "#3270B8" }}>Ciplo</span><span style={{ color: "#5DC4D0" }}>Stem</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Regenerative Medicine</div>
          </div>
        </Link>


        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="story-link text-sm font-medium text-foreground/80 hover:text-primary transition"
              activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/assessment" className="ml-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-warm hover:opacity-90 hover:scale-[1.02] transition">
            Self-Assessment
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="px-6 py-6 flex flex-col gap-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-base font-medium py-2"
                activeProps={{ className: "text-primary" }}>{n.label}</Link>
            ))}
            <Link to="/assessment" onClick={() => setOpen(false)} className="mt-2 text-center py-3 rounded-full bg-primary text-primary-foreground font-semibold">
              Self-Assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
