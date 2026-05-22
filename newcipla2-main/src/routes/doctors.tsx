import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { FlaskConical, FileText, GraduationCap, Microscope } from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";

export const Route = createFileRoute("/doctors")({
  head: () => ({ meta: [
    { title: "For Doctors — Ciplostem" },
    { name: "description", content: "Clinical trials, monographs, training and mechanism of action for healthcare professionals." },
    { property: "og:title", content: "For Doctors — Ciplostem" },
    { property: "og:description", content: "Advancing regenerative medicine together." },
  ]}),
  component: Doctors,
});

function Doctors() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">For Doctors</div>
              <h1 className="mt-4 text-5xl md:text-6xl font-bold">Advancing regenerative medicine <em className="not-italic text-gradient-warm">together</em>.</h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">Clinical evidence, training, and the latest research — built for orthopedic specialists.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative animate-float">
              <div className="absolute -inset-6 bg-gradient-clay opacity-20 rounded-[3rem] blur-2xl" />
              <img src={heroDoctor} alt="3D doctor" loading="lazy" width={1280} height={896} className="relative rounded-3xl shadow-warm w-full"/>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            { i:FlaskConical, t:"Clinical Trials & Research", d:"Phase III results and ongoing studies." },
            { i:FileText, t:"Monographs & Publications", d:"Peer-reviewed papers and product monographs." },
            { i:GraduationCap, t:"Training & Events", d:"Hands-on workshops and CME programs." },
          ].map((c,i)=>(
            <Reveal key={c.t} delay={i*100}>
              <div className="p-8 rounded-2xl bg-card border border-border hover-lift h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-clay grid place-items-center text-primary-foreground"><c.i size={22}/></div>
                <h3 className="mt-5 font-semibold text-xl">{c.t}</h3>
                <p className="mt-2 text-muted-foreground">{c.d}</p>
                <button className="mt-4 text-sm font-semibold text-primary story-link">Learn more</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Mechanism of Action</div>
            <h2 className="mt-3 text-4xl font-bold">How Ciplostem works</h2>
            <ul className="mt-6 space-y-4 text-muted-foreground">
              {[
                "Mesenchymal stem cells deliver paracrine signaling that modulates inflammation.",
                "Encourages chondrocyte proliferation and extracellular matrix remodeling.",
                "Standardized cell counts ensure consistent dose-response across patients.",
              ].map(t=>(
                <li key={t} className="flex gap-3"><Microscope className="text-primary shrink-0" size={20}/> <span>{t}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="p-8 rounded-3xl bg-card border border-border shadow-soft">
              <h3 className="font-display font-bold text-2xl">Request a professional briefing</h3>
              <p className="mt-2 text-sm text-muted-foreground">Our medical team will reach out within 1 business day.</p>
              <form className="mt-6 space-y-4">
                <input className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Name" />
                <input className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Email / Telephone" />
                <input className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Specialty" />
                <button type="button" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">Request briefing</button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
