import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
});

export async function submitContact(input: z.infer<typeof contactSchema>) {
  const data = contactSchema.parse(input);
  const { error } = await supabase.from("contacts").insert({
    full_name: data.full_name, email: data.email, phone: data.phone || null, message: data.message,
  });
  if (error) throw new Error(error.message);
  return { ok: true };
}

const assessmentSchema = z.object({
  name: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  age: z.number().int().min(1).max(120).optional().nullable(),
  pain_frequency: z.string().min(1).max(40),
  pain_intensity: z.number().int().min(0).max(10),
  stiffness: z.string().min(1).max(40),
  swelling: z.string().min(1).max(40),
  cracking: z.string().max(40).optional().or(z.literal("")),
  score: z.number().int().min(0).max(100),
  risk_level: z.string().min(1).max(20),
});

export async function submitAssessment(input: z.infer<typeof assessmentSchema>) {
  const d = assessmentSchema.parse(input);
  const { error } = await supabase.from("assessments").insert({
    name: d.name || null, email: d.email || null, age: d.age ?? null,
    pain_frequency: d.pain_frequency, pain_intensity: d.pain_intensity,
    stiffness: d.stiffness, swelling: d.swelling, cracking: d.cracking || null,
    score: d.score, risk_level: d.risk_level,
  });
  if (error) throw new Error(error.message);
  return { ok: true };
}

export const getAdminData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: roleRow } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
    if (!roleRow) throw new Error("Forbidden: admin only");
    const [contacts, assessments] = await Promise.all([
      supabase.from("contacts").select("*").order("created_at", { ascending: false }),
      supabase.from("assessments").select("*").order("created_at", { ascending: false }),
    ]);
    if (contacts.error) throw new Error(contacts.error.message);
    if (assessments.error) throw new Error(assessments.error.message);
    return { contacts: contacts.data ?? [], assessments: assessments.data ?? [] };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
    return { isAdmin: !!data };
  });
