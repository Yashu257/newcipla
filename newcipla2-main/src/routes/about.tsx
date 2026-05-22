import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import doc from "@/assets/doctor-patient.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Ciplostem" },
    { name: "description", content: "Pioneering regenerative medicine with scientifically-backed stem cell therapies." },
    { property: "og:title", content: "About Ciplostem" },
    { property: "og:description", content: "Our mission, milestones, and the team behind Ciplostem." },
  ]}),
  component: About,
});

const milestones = [
  { y: "2016", t: "Foundational Research", d: "Early-stage cell biology work begins in Mumbai." },
  { y: "2018", t: "Clinical Trials Begin", d: "Phase I trials in knee OA patients." },
  { y: "2020", t: "Phase III Success", d: "Pivotal trial demonstrates safety and efficacy." },
  { y: "2022", t: "Regulatory Approval", d: "DCGI approval for knee osteoarthritis." },
  { y: "2023", t: "Ciplostem Launch", d: "Nationwide rollout to certified centers." },
];

const team = [
  { n: "Dr. Aarya Sharma", r: "Lead Scientist" },
  { n: "Mr. Raj Patel", r: "Head of Operations" },
  { n: "Dr. Jian Li", r: "Medical Advisor" },
  { n: "Ms. Sara Khan", r: "Patient Relations" },
];

function About() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">About Ciplostem</div>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold">Pioneering regenerative medicine for a <em className="text-gradient-warm not-italic">healthier tomorrow</em>.</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              We empower individuals living with knee osteoarthritis to reclaim mobility through scientifically-backed stem cell therapies.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <Reveal><img src={doc} alt="Doctor consulting patient" loading="lazy" width={1400} height={1000} className="rounded-3xl shadow-warm"/></Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To bring regenerative therapies within reach of every patient suffering from joint disease — combining clinical rigor, supply-chain reliability, and compassionate care.
            </p>
            <ul className="mt-6 space-y-3">
              {["Standardized, off-the-shelf product","Backed by Phase III evidence","Trained orthopedic network across India"].map(t=>(
                <li key={t} className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"/> <span>{t}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal><h2 className="text-4xl font-bold text-center mb-16">Milestones</h2></Reveal>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 hidden md:block"/>
            {milestones.map((m,i)=>(
              <Reveal key={m.y} delay={i*100}>
                <div className={`relative md:grid md:grid-cols-2 gap-8 mb-12 ${i%2?"md:[&>div:first-child]:order-2":""}`}>
                  <div className={`${i%2?"md:text-left md:pl-12":"md:text-right md:pr-12"}`}>
                    <div className="text-5xl font-display font-bold text-primary">{m.y}</div>
                  </div>
                  <div className={`${i%2?"md:pr-12":"md:pl-12"}`}>
                    <div className="p-6 rounded-2xl bg-card border border-border hover-lift">
                      <h3 className="font-semibold text-lg">{m.t}</h3>
                      <p className="mt-2 text-muted-foreground text-sm">{m.d}</p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background"/>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal><h2 className="text-4xl font-bold text-center">Meet the Team</h2></Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t,i)=>(
              <Reveal key={t.n} delay={i*80}>
                <div className="p-6 rounded-2xl bg-card border border-border hover-lift text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-clay grid place-items-center text-3xl font-display font-bold text-primary-foreground shadow-warm">{t.n[0]}</div>
                  <div className="mt-4 font-semibold">{t.n}</div>
                  <div className="text-sm text-muted-foreground">{t.r}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
