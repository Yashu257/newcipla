import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitAssessment } from "@/lib/api.functions";

export const Route = createFileRoute("/assessment")({
  head: () => ({ meta: [
    { title: "Self-Assessment — Ciplostem" },
    { name: "description", content: "Understand your knee health in 4 quick steps." },
    { property: "og:title", content: "Knee OA Self-Assessment" },
    { property: "og:description", content: "Quick, private 4-step assessment." },
  ]}),
  component: Assessment,
});

const freqs = ["Daily","Several times a week","Occasionally","Rarely"];
const stiffOpts = ["None","Mild","Moderate","Severe"];
const swellOpts = ["None","Occasional","Frequent","Constant"];
const crackOpts = ["No","Sometimes","Often","Always"];

function Assessment() {
  const [step, setStep] = useState(1);
  const [a, setA] = useState({ pain_frequency:"", pain_intensity:5, stiffness:"", swelling:"", cracking:"" });
  const [profile, setProfile] = useState({ name:"", email:"", age:"" });
  const [done, setDone] = useState<{score:number; risk:string}|null>(null);
  const [busy, setBusy] = useState(false);

  function score(): {score:number; risk:string} {
    let s = 0;
    s += {Daily:25,"Several times a week":18,Occasionally:8,Rarely:2}[a.pain_frequency] ?? 0;
    s += a.pain_intensity * 3;
    s += {None:0,Mild:5,Moderate:12,Severe:20}[a.stiffness] ?? 0;
    s += {None:0,Occasional:5,Frequent:12,Constant:18}[a.swelling] ?? 0;
    s += {No:0,Sometimes:3,Often:7,Always:10}[a.cracking] ?? 0;
    const score = Math.min(100, s);
    const risk = score >= 65 ? "High" : score >= 35 ? "Moderate" : "Low";
    return { score, risk };
  }

  async function submit() {
    const r = score();
    setBusy(true);
    try {
      await submitAssessment({
        name: profile.name, email: profile.email,
        age: profile.age ? parseInt(profile.age) : null,
        pain_frequency: a.pain_frequency, pain_intensity: a.pain_intensity,
        stiffness: a.stiffness, swelling: a.swelling, cracking: a.cracking,
        score: r.score, risk_level: r.risk,
      });
      setDone(r);
      toast.success("Assessment saved");
    } catch (err: any) {
      toast.error(err.message || "Could not submit");
    } finally { setBusy(false); }
  }

  const stepValid =
    (step===1 && a.pain_frequency) ||
    (step===2 && a.pain_intensity>=0) ||
    (step===3 && a.stiffness && a.swelling) ||
    (step===4 && a.cracking);

  return (
    <Layout>
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Self-Assessment</div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold">Understand your <em className="not-italic text-gradient-warm">knee health</em>.</h1>
            <p className="mt-4 text-muted-foreground">A 4-step quiz. Private. Takes under 2 minutes.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          {done ? (
            <div className="p-10 rounded-3xl bg-card border border-border shadow-warm text-center animate-scale-in">
              <CheckCircle2 className="mx-auto text-primary" size={48}/>
              <h2 className="mt-4 text-3xl font-bold">Your result</h2>
              <div className="mt-6 text-6xl font-display font-bold text-gradient-warm">{done.score}<span className="text-2xl text-muted-foreground">/100</span></div>
              <div className="mt-2 text-lg">Risk level: <span className="font-semibold text-primary">{done.risk}</span></div>
              <p className="mt-6 text-sm text-muted-foreground">
                {done.risk === "High" && "We strongly recommend consulting a Ciplostem-certified orthopedic specialist."}
                {done.risk === "Moderate" && "Consider speaking with a specialist to assess your knee health early."}
                {done.risk === "Low" && "Your symptoms suggest low risk. Continue monitoring and stay active."}
              </p>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-card border border-border shadow-soft">
              <div className="flex justify-between mb-2 text-xs font-semibold text-muted-foreground">
                <span>STEP {step} / 4</span>
                <span>{Math.round((step/4)*100)}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-8">
                <div className="h-full bg-gradient-clay transition-all duration-500" style={{width:`${(step/4)*100}%`}}/>
              </div>

              {step===1 && (
                <div className="animate-fade-up">
                  <h3 className="text-2xl font-display font-bold">How often do you experience knee pain?</h3>
                  <div className="mt-6 space-y-3">
                    {freqs.map(f=>(
                      <button key={f} onClick={()=>setA({...a, pain_frequency:f})} className={`w-full p-4 rounded-xl border-2 text-left transition ${a.pain_frequency===f?"border-primary bg-primary/5":"border-border hover:border-primary/40"}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step===2 && (
                <div className="animate-fade-up">
                  <h3 className="text-2xl font-display font-bold">Pain intensity</h3>
                  <p className="text-sm text-muted-foreground mt-2">0 = none, 10 = severe</p>
                  <div className="mt-8 text-center">
                    <div className="text-7xl font-display font-bold text-gradient-warm">{a.pain_intensity}</div>
                  </div>
                  <input type="range" min={0} max={10} value={a.pain_intensity} onChange={e=>setA({...a, pain_intensity:parseInt(e.target.value)})} className="w-full mt-6 accent-primary"/>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2"><span>Mild</span><span>Severe</span></div>
                </div>
              )}

              {step===3 && (
                <div className="animate-fade-up space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-bold">Joint stiffness?</h3>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {stiffOpts.map(o=>(
                        <button key={o} onClick={()=>setA({...a, stiffness:o})} className={`p-3 rounded-xl border-2 text-sm ${a.stiffness===o?"border-primary bg-primary/5":"border-border"}`}>{o}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold">Swelling around the joint?</h3>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {swellOpts.map(o=>(
                        <button key={o} onClick={()=>setA({...a, swelling:o})} className={`p-3 rounded-xl border-2 text-sm ${a.swelling===o?"border-primary bg-primary/5":"border-border"}`}>{o}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step===4 && (
                <div className="animate-fade-up space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-bold">Cracking sounds when moving?</h3>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {crackOpts.map(o=>(
                        <button key={o} onClick={()=>setA({...a, cracking:o})} className={`p-3 rounded-xl border-2 text-sm ${a.cracking===o?"border-primary bg-primary/5":"border-border"}`}>{o}</button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border space-y-3">
                    <p className="text-sm text-muted-foreground">Optional: tell us a bit about you so we can follow up.</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input value={profile.name} onChange={e=>setProfile({...profile, name:e.target.value})} className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Name (optional)"/>
                      <input value={profile.age} onChange={e=>setProfile({...profile, age:e.target.value})} className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Age (optional)" type="number"/>
                    </div>
                    <input value={profile.email} onChange={e=>setProfile({...profile, email:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Email (optional)" type="email"/>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between gap-3">
                {step>1 ? <button onClick={()=>setStep(step-1)} className="px-6 py-3 rounded-full border-2 border-border font-semibold">Back</button> : <div/>}
                {step<4 ? (
                  <button disabled={!stepValid} onClick={()=>setStep(step+1)} className="ml-auto px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold inline-flex items-center gap-2 hover:opacity-90 transition disabled:opacity-50">
                    Next <ArrowRight size={16}/>
                  </button>
                ) : (
                  <button disabled={busy || !stepValid} onClick={submit} className="ml-auto px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50">
                    {busy ? "Calculating..." : "See my result"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
