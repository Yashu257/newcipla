import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin Login — Ciplostem" }, { name: "description", content: "Admin sign in." }]}),
  component: Login,
});

// Map simple username to internal email
function toEmail(u: string) {
  const v = u.trim();
  if (!v) return "";
  return v.includes("@") ? v : `${v}@ciplostem.local`;
}

function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const email = toEmail(username);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in");
      nav({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message);
    } finally { setBusy(false); }
  }

  return (
    <Layout>
      <section className="py-20 min-h-[70vh] flex items-center">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-warm animate-scale-in">
            <h1 className="text-3xl font-display font-bold text-center">Admin Sign In</h1>
            <p className="text-sm text-muted-foreground text-center mt-2">Access the Ciplostem admin dashboard.</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <input required autoFocus value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none"/>
              <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none"/>
              <button disabled={busy} type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60">
                {busy ? "Please wait..." : "Sign in"}
              </button>
            </form>
            <p className="mt-6 text-xs text-muted-foreground text-center">
              <Link to="/" className="text-primary">Back to home</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
