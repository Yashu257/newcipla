import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Shield, Phone, Globe, Bot, ArrowRight, Sparkles, Activity, Award } from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";
import heroPatient from "@/assets/hero-patient.jpg";
import cells from "@/assets/hero-cells.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ciplostem — A New Era of Mobility | Stem Cell Therapy for Knee OA" },
      { name: "description", content: "First-in-class, off-the-shelf stem cell therapy for knee osteoarthritis. Approved by DCGI. Restore mobility with regenerative medicine." },
      { property: "og:title", content: "Ciplostem — A New Era of Mobility" },
      { property: "og:description", content: "Pioneering regenerative stem cell therapy for knee osteoarthritis." },
    ],
  }),
  component: Home,
});

const badges = [
  { icon: Shield, label: "DCGI Approved", desc: "Risk-covered safety" },
  { icon: Phone, label: "Toll-Free", desc: "1-800-123-4567" },
  { icon: Globe, label: "Global Reach", desc: "Trusted worldwide" },
  { icon: Bot, label: "AI Chatbot", desc: "24/7 guidance" },
];

function Home() {
  const slides = [
    { src: heroDoctor, alt: "Ciplostem certified doctor", caption: "For Doctors" },
    { src: heroPatient, alt: "Active patient with renewed mobility", caption: "For Patients" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary-glow/15 blur-3xl animate-float" style={{animationDelay:"2s"}} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24 lg:pt-20 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
              <Sparkles size={12}/> First-in-class · Off-the-shelf
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              A New Era of <span className="text-gradient-warm italic font-medium">Mobility</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Ciplostem is a standardized, off-the-shelf stem cell therapy for knee osteoarthritis — approved by the Drug Controller General of India (DCGI).
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/assessment" className="group px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-warm hover:scale-[1.03] transition-all inline-flex items-center gap-2">
                Take Self-Assessment <ArrowRight className="group-hover:translate-x-1 transition" size={18}/>
              </Link>
              <Link to="/patients" className="px-7 py-3.5 rounded-full border-2 border-primary/30 text-foreground font-semibold hover:bg-primary/5 transition">
                Find Treatment
              </Link>
              <a href="tel:18001234567" className="px-7 py-3.5 rounded-full border-2 border-transparent text-foreground font-medium hover:border-primary/20 transition">
                Or call 1-800-123-4567
              </a>
            </div>
          </div>
          <div className="relative animate-scale-in delay-200">
            <div className="absolute -inset-6 bg-gradient-clay opacity-20 rounded-[3rem] blur-2xl" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-warm border-8 border-background h-[520px]">
              {slides.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  width={1280}
                  height={896}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs font-semibold text-primary shadow-soft">
                {slides[idx].caption}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-primary/40"}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl shadow-warm px-5 py-4 flex items-center gap-3 animate-float">
              <div className="relative w-12 h-12 rounded-full bg-primary/15 grid place-items-center pulse-ring">
                <Activity className="text-primary" size={20}/>
              </div>
              <div>
                <div className="text-2xl font-display font-bold">40%</div>
                <div className="text-xs text-muted-foreground">of Indians may have OA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-background py-14 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((b, i) => (
            <Reveal key={b.label} delay={i*80}>
              <div className="flex items-center gap-4 p-5 rounded-2xl hover-lift bg-card border border-border/60">
                <div className="w-12 h-12 rounded-xl bg-gradient-clay grid place-items-center text-primary-foreground">
                  <b.icon size={22}/>
                </div>
                <div>
                  <div className="font-semibold">{b.label}</div>
                  <div className="text-xs text-muted-foreground">{b.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* KNEE OA */}
      <section className="py-24 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Knee Osteoarthritis</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">A chronic, progressive joint disorder.</h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                Knee OA is characterized by gradual loss of cartilage in the joint. Nearly 40% of people in India could be suffering — and the knee is the most commonly affected joint.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[{n:"40%",l:"Indians affected"},{n:"30%",l:"Knee OA prevalence"},{n:"IV",l:"Severity grades"}].map((s,i)=>(
                  <div key={i} className="text-center p-4 rounded-2xl bg-card/80 backdrop-blur border border-border/40">
                    <div className="text-3xl font-display font-bold text-primary">{s.n}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <img src={cells} alt="Mesenchymal stem cells" loading="lazy" width={1400} height={1000} className="rounded-3xl shadow-warm w-full"/>
              <div className="absolute top-6 right-6 bg-background/95 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                <Award size={14} className="text-primary"/> Scientifically Backed
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Your Journey</div>
              <h2 className="text-4xl md:text-5xl font-bold">Renewed mobility, step by step.</h2>
            </div>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {n:"01", t:"Self-Assessment", d:"Take our short quiz to understand your symptoms and OA risk level."},
              {n:"02", t:"Consult & Plan", d:"Locate a certified Ciplostem center and consult an orthopedic specialist."},
              {n:"03", t:"Recover & Thrive", d:"Receive the standardized therapy and follow a tailored recovery plan."},
            ].map((s,i)=>(
              <Reveal key={s.n} delay={i*120}>
                <div className="relative p-8 rounded-3xl bg-card border border-border hover-lift h-full">
                  <div className="text-6xl font-display font-bold text-primary/15 leading-none">{s.n}</div>
                  <h3 className="mt-4 text-2xl font-semibold">{s.t}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-clay p-12 md:p-16 text-center text-primary-foreground shadow-warm">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-foreground/10 blur-3xl"/>
              <h2 className="text-4xl md:text-5xl font-bold">Start your journey to mobility</h2>
              <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">Find a Ciplostem center near you or speak with our team today.</p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="px-7 py-3.5 rounded-full bg-background text-foreground font-semibold hover:scale-[1.03] transition">Contact Us</Link>
                <Link to="/assessment" className="px-7 py-3.5 rounded-full border-2 border-primary-foreground/40 font-semibold hover:bg-primary-foreground/10 transition">Self-Assessment</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
