import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { FileText, Download, HelpCircle, BookOpen } from "lucide-react";
import heroCells from "@/assets/hero-cells.jpg";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [
    { title: "Resources — Ciplostem" },
    { name: "description", content: "Patient education, clinical research and FAQs." },
    { property: "og:title", content: "Resources — Ciplostem" },
    { property: "og:description", content: "Knowledge hub for patients and doctors." },
  ]}),
  component: Resources,
});

const articles = [
  { i:BookOpen, t:"Understanding Knee Osteoarthritis", d:"Causes, symptoms, and risk factors explained." },
  { i:FileText, t:"Stem Cell Therapy: What to Expect", d:"A walkthrough of the treatment journey." },
  { i:HelpCircle, t:"Patient Stories & FAQs", d:"Hear from people who've reclaimed mobility." },
];
const downloads = [
  { t:"Phase III Clinical Trial Results", y:"2023" },
  { t:"Monograph: Mechanism of Action", y:"2024" },
  { t:"Patient Education Leaflet", y:"2024" },
];

function Resources() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Resources</div>
              <h1 className="mt-4 text-5xl md:text-6xl font-bold">Knowledge hub for patients & <em className="not-italic text-gradient-warm">doctors</em>.</h1>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative animate-float">
              <div className="absolute -inset-6 bg-gradient-clay opacity-20 rounded-[3rem] blur-2xl" />
              <img src={heroCells} alt="3D stem cells" loading="lazy" width={1280} height={896} className="relative rounded-3xl shadow-warm w-full"/>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal><h2 className="text-3xl font-bold">Patient Education</h2></Reveal>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {articles.map((a,i)=>(
              <Reveal key={a.t} delay={i*100}>
                <div className="p-7 rounded-2xl bg-card border border-border hover-lift h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 grid place-items-center text-primary"><a.i/></div>
                  <h3 className="mt-4 font-semibold text-lg">{a.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.d}</p>
                  <button className="mt-4 text-sm font-semibold text-primary story-link">Read article</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal><h2 className="text-3xl font-bold">Clinical Research & Downloads</h2></Reveal>
          <div className="mt-8 space-y-4">
            {downloads.map((d,i)=>(
              <Reveal key={d.t} delay={i*80}>
                <button className="w-full flex items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border hover-lift text-left">
                  <div>
                    <div className="font-semibold">{d.t}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">PDF · {d.y}</div>
                  </div>
                  <Download className="text-primary"/>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
