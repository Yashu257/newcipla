import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminData } from "@/lib/api.functions";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { LogOut, Users, ClipboardList } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Ciplostem" }]}),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/login" });
  },
  component: Admin,
});

function Admin() {
  const nav = useNavigate();
  const fetchData = useServerFn(getAdminData);
  const [tab, setTab] = useState<"contacts"|"assessments">("contacts");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-data"],
    queryFn: () => fetchData(),
    retry: false,
  });

  useEffect(() => {
    if (error) toast.error((error as Error).message);
  }, [error]);

  async function logout() {
    await supabase.auth.signOut();
    nav({ to: "/login" });
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Contact submissions and self-assessment results.</p>
            </div>
            <button onClick={logout} className="px-5 py-2.5 rounded-full border-2 border-border hover:border-primary inline-flex items-center gap-2 text-sm font-semibold transition">
              <LogOut size={16}/> Sign out
            </button>
          </div>

          {error && (
            <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive">
              {(error as Error).message}. You need the <strong>admin</strong> role to view this page.
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button onClick={()=>setTab("contacts")} className={`p-6 rounded-2xl border-2 text-left transition hover-lift ${tab==="contacts"?"border-primary bg-primary/5":"border-border bg-card"}`}>
              <Users className="text-primary"/>
              <div className="mt-3 text-3xl font-display font-bold">{data?.contacts.length ?? "—"}</div>
              <div className="text-sm text-muted-foreground">Contact submissions</div>
            </button>
            <button onClick={()=>setTab("assessments")} className={`p-6 rounded-2xl border-2 text-left transition hover-lift ${tab==="assessments"?"border-primary bg-primary/5":"border-border bg-card"}`}>
              <ClipboardList className="text-primary"/>
              <div className="mt-3 text-3xl font-display font-bold">{data?.assessments.length ?? "—"}</div>
              <div className="text-sm text-muted-foreground">Assessment results</div>
            </button>
          </div>

          {isLoading && <div className="p-8 text-center text-muted-foreground">Loading...</div>}

          {data && tab==="contacts" && (
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/40">
                    <tr><th className="text-left p-4">Name</th><th className="text-left p-4">Email</th><th className="text-left p-4">Phone</th><th className="text-left p-4">Message</th><th className="text-left p-4">Date</th></tr>
                  </thead>
                  <tbody>
                    {data.contacts.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No contact submissions yet.</td></tr>}
                    {data.contacts.map((c: any) => (
                      <tr key={c.id} className="border-t border-border hover:bg-secondary/20">
                        <td className="p-4 font-medium">{c.full_name}</td>
                        <td className="p-4 text-muted-foreground">{c.email}</td>
                        <td className="p-4 text-muted-foreground">{c.phone || "—"}</td>
                        <td className="p-4 text-muted-foreground max-w-md truncate">{c.message}</td>
                        <td className="p-4 text-muted-foreground whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {data && tab==="assessments" && (
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/40">
                    <tr><th className="text-left p-4">Name</th><th className="text-left p-4">Email</th><th className="text-left p-4">Age</th><th className="text-left p-4">Pain freq</th><th className="text-left p-4">Pain</th><th className="text-left p-4">Stiff</th><th className="text-left p-4">Swell</th><th className="text-left p-4">Score</th><th className="text-left p-4">Risk</th><th className="text-left p-4">Date</th></tr>
                  </thead>
                  <tbody>
                    {data.assessments.length === 0 && <tr><td colSpan={10} className="p-8 text-center text-muted-foreground">No assessments yet.</td></tr>}
                    {data.assessments.map((a: any) => (
                      <tr key={a.id} className="border-t border-border hover:bg-secondary/20">
                        <td className="p-4 font-medium">{a.name || "—"}</td>
                        <td className="p-4 text-muted-foreground">{a.email || "—"}</td>
                        <td className="p-4">{a.age ?? "—"}</td>
                        <td className="p-4 text-muted-foreground">{a.pain_frequency}</td>
                        <td className="p-4">{a.pain_intensity}/10</td>
                        <td className="p-4">{a.stiffness}</td>
                        <td className="p-4">{a.swelling}</td>
                        <td className="p-4 font-bold">{a.score}</td>
                        <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${a.risk_level==="High"?"bg-destructive/15 text-destructive":a.risk_level==="Moderate"?"bg-primary/15 text-primary":"bg-secondary text-foreground"}`}>{a.risk_level}</span></td>
                        <td className="p-4 text-muted-foreground whitespace-nowrap">{new Date(a.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
