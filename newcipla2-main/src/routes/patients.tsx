import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { CheckCircle2, AlertCircle, Activity, Sparkles } from "lucide-react";
import heroPatient from "@/assets/hero-patient.jpg";


export const Route = createFileRoute("/patients")({
  head: () => ({ meta: [
    { title: "For Patients — Ciplostem" },
    { name: "description", content: "Understand knee OA, learn what to expect from stem cell therapy, and find a Ciplostem center." },
    { property: "og:title", content: "For Patients — Ciplostem" },
    { property: "og:description", content: "Disease info, treatment journey and recovery for knee osteoarthritis patients." },
  ]}),
  component: Patients,
});

const symptoms = [
  { t:"Joint pain", d:"Pain from deep within the joint; worse with use, better with rest." },
  { t:"Stiffness", d:"Limited range of motion and a sensation of the joint freezing." },
  { t:"Swelling & warmth", d:"Response to cartilage damage and irritation." },
  { t:"Cracking sounds", d:"Crunching when moving, due to roughened cartilage." },
];

const grades = [
  { g:"Grade I", d:"Minor cartilage wear; mild discomfort." },
  { g:"Grade II", d:"Cartilage damage with early bony spurs." },
  { g:"Grade III", d:"Moderate cartilage loss; joint space narrowing begins." },
  { g:"Grade IV", d:"Severe cartilage loss; extensive bony spurs." },
];

function Patients() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">For Patients</div>
              <h1 className="mt-4 text-5xl md:text-6xl font-bold">Disease information & your treatment <em className="not-italic text-gradient-warm">journey</em>.</h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                The prevalence of knee OA in India is nearly 30%. Knowing the signs early lets you act before joint damage becomes severe.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/assessment" className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-warm hover:scale-[1.03] transition inline-flex gap-2">
                  <Sparkles size={18}/> Take Knee OA Self-Test
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative animate-float">
              <div className="absolute -inset-6 bg-gradient-clay opacity-20 rounded-[3rem] blur-2xl" />
              <img src={heroPatient} alt="3D patient walking" loading="lazy" width={1280} height={896} className="relative rounded-3xl shadow-warm w-full"/>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal><h2 className="text-4xl font-bold">Signs & symptoms</h2></Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {symptoms.map((s,i)=>(
              <Reveal key={s.t} delay={i*100}>
                <div className="p-7 rounded-2xl bg-card border border-border hover-lift flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
                    <AlertCircle size={22}/>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{s.t}</h3>
                    <p className="text-muted-foreground mt-1">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl font-bold">Progression: Grade I → IV</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">Ignoring knee OA can lead to severe joint damage. Early action makes a difference.</p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {grades.map((g,i)=>(
              <Reveal key={g.g} delay={i*120}>
                <div className="relative p-6 rounded-2xl bg-card border border-border hover-lift">
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">{g.g}</div>
                  <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-clay" style={{width: `${(i+1)*25}%`}}/>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{g.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            { t:"How it works", d:"A standardized off-the-shelf stem cell preparation is injected into the affected knee." },
            { t:"What to expect", d:"A short clinic visit, minimal downtime, and a structured follow-up schedule." },
            { t:"Recovery & aftercare", d:"Guided physiotherapy and lifestyle support to maximize results." },
          ].map((c,i)=>(
            <Reveal key={c.t} delay={i*100}>
              <div className="p-7 rounded-2xl bg-card border border-border hover-lift h-full">
                <CheckCircle2 className="text-primary" />
                <h3 className="mt-4 font-semibold text-xl">{c.t}</h3>
                <p className="mt-2 text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
