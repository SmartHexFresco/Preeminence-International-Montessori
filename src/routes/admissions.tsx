import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHero } from "@/components/site/Layout";
import { Check, Download, ChevronDown, FileText } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Northbridge International Academy" },
      { name: "description", content: "Apply to Northbridge. Step-by-step admissions, fees, scholarships and FAQ." },
      { property: "og:title", content: "Admissions at Northbridge" },
      { property: "og:description", content: "Apply to Northbridge. Step-by-step admissions, fees, scholarships." },
    ],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  const steps = [
    { t: "Inquire", d: "Submit your interest form online." },
    { t: "Visit", d: "Tour campus or take a virtual walkthrough." },
    { t: "Apply", d: "Complete the online application + supporting docs." },
    { t: "Assess", d: "Entrance assessment and student interview." },
    { t: "Offer", d: "Decision letters within 2 weeks." },
    { t: "Enroll", d: "Confirm your place and welcome aboard." },
  ];
  const fees = [
    { g: "Grades 6–8", a: "$24,500", e: "$1,800" },
    { g: "Grades 9–10 (IGCSE)", a: "$28,500", e: "$2,200" },
    { g: "Grades 11–12 (IB / AP)", a: "$32,000", e: "$2,500" },
  ];
  const faqs = [
    { q: "When does the application window open?", a: "Applications open every September for the following academic year. Rolling admissions thereafter, subject to availability." },
    { q: "Do you offer scholarships?", a: "Yes. Merit-based scholarships cover up to 75% of tuition. Need-based aid also available." },
    { q: "Is boarding offered?", a: "Yes, weekly and full boarding available for grades 9–12." },
    { q: "What languages of instruction are available?", a: "English-medium with Spanish, Mandarin, French and Arabic as second-language pathways." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <PageHero eyebrow="Admissions" title="Begin your Northbridge story." subtitle="A simple six-step journey to one of the world's most exciting classrooms." />

      <section className="py-16 mx-auto max-w-7xl px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div key={s.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="relative rounded-3xl bg-card border border-border p-6 hover:shadow-elegant transition">
              <div className="absolute top-4 right-4 font-display font-bold text-5xl text-gold/20">0{i + 1}</div>
              <div className="font-display font-bold text-xl">{s.t}</div>
              <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-2">Tuition & fees</h2>
          <p className="text-center text-muted-foreground mb-8">2025–2026 academic year</p>
          <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-soft">
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary text-xs uppercase tracking-widest font-semibold">
              <div>Grade</div><div>Annual Tuition</div><div>Enrollment Fee</div>
            </div>
            {fees.map((f) => (
              <div key={f.g} className="grid grid-cols-3 gap-4 p-5 border-t border-border items-center">
                <div className="font-semibold">{f.g}</div>
                <div className="font-display font-bold text-lg text-gradient-gold">{f.a}</div>
                <div className="text-muted-foreground">{f.e}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl gradient-hero text-primary-foreground p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-display font-bold text-xl">Northbridge Scholars Program</div>
              <div className="text-sm opacity-80">Up to 75% tuition for exceptional students.</div>
            </div>
            <button className="rounded-xl gradient-gold text-gold-foreground px-5 py-2.5 text-sm font-bold">Apply for Scholarship</button>
          </div>
        </div>
      </section>

      <section className="py-16 mx-auto max-w-3xl px-4">
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-8">Frequently asked</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl bg-card border border-border overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-5 flex items-center justify-between text-left">
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={`h-5 w-5 transition ${open === i ? "rotate-180 text-gold" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-1">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-card border border-border p-6">
            <h3 className="font-display font-bold text-xl mb-4">Inquiry form</h3>
            <form className="grid gap-3">
              <input className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" placeholder="Parent name" />
              <input className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" placeholder="Email" type="email" />
              <input className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" placeholder="Student grade applying for" />
              <textarea rows={3} className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" placeholder="Tell us a little about your child…" />
              <button className="rounded-xl gradient-gold text-gold-foreground py-3 font-bold shadow-gold">Submit Inquiry</button>
            </form>
          </div>
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Downloadable forms</h3>
            <div className="space-y-3">
              {["Application Form 2025", "Financial Aid Application", "Medical Records Form", "Transfer Records Request"].map((f) => (
                <a key={f} href="#" className="rounded-2xl bg-card border border-border p-4 flex items-center gap-3 hover:shadow-soft transition group">
                  <div className="h-10 w-10 rounded-lg gradient-cyan flex items-center justify-center"><FileText className="h-4 w-4 text-primary" /></div>
                  <div className="flex-1 font-medium text-sm">{f}</div>
                  <Download className="h-4 w-4 text-muted-foreground group-hover:text-cyan" />
                </a>
              ))}
            </div>
            <div className="mt-6 rounded-2xl gradient-cyan text-white p-5 flex items-center gap-3">
              <Check className="h-5 w-5" /> <span className="text-sm font-medium">Rolling admissions for grades 6, 7 and 9 still open.</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
