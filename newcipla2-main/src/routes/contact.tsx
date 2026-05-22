import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { submitContact } from "@/lib/api.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Ciplostem" },
    { name: "description", content: "Get in touch with the Ciplostem team. Mumbai headquarters and toll-free support." },
    { property: "og:title", content: "Contact Ciplostem" },
    { property: "og:description", content: "Reach our team — call, email or visit." },
  ]}),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ full_name:"", email:"", phone:"", message:"" });
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await submitContact(form);
      toast.success("Message sent! We'll be in touch soon.");
      setForm({ full_name:"", email:"", phone:"", message:"" });
    } catch (err: any) {
      toast.error(err.message || "Could not send. Please try again.");
    } finally { setBusy(false); }
  }

  return (
    <Layout>
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Contact</div>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold">Get in touch with <em className="not-italic text-gradient-warm">Ciplostem</em>.</h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6 animate-fade-up">
            <div className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <Phone className="text-primary"/>
              <div className="mt-3 font-semibold">Toll-Free Support</div>
              <a href="tel:18001234567" className="text-primary story-link">1-800-123-4567</a>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <Mail className="text-primary"/>
              <div className="mt-3 font-semibold">Email</div>
              <a href="mailto:info@ciplostem.com" className="text-primary story-link">info@ciplostem.com</a>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <MapPin className="text-primary"/>
              <div className="mt-3 font-semibold">Headquarters</div>
              <div className="text-sm text-muted-foreground">Bandra Kurla Complex, Mumbai 400051, India</div>
            </div>
          </div>

          <form onSubmit={submit} className="lg:col-span-3 p-8 rounded-3xl bg-card border border-border shadow-soft space-y-4 animate-fade-up delay-100">
              <h2 className="font-display font-bold text-2xl">Send us a message</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Full name" maxLength={120}/>
                <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Email address" maxLength={255}/>
              </div>
              <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none" placeholder="Phone number (optional)" maxLength={40}/>
              <textarea required rows={5} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none resize-none" placeholder="Your message" maxLength={2000}/>
              <button disabled={busy} type="submit" className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60">
                {busy ? "Sending..." : (<>Send message <Send size={16}/></>)}
              </button>
          </form>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-warm border border-border">
              <iframe
                title="Ciplostem HQ map"
                src="https://www.google.com/maps?q=Bandra+Kurla+Complex+Mumbai&output=embed"
                className="w-full h-[420px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
