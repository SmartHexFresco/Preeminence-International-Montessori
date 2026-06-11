import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { Download, BookOpen, FlaskConical, Palette, Code2, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — Rochas Foundation College" },
      { name: "description", content: "IB, IGCSE and AP programs. Curriculum, departments, exam system and downloadable resources." },
      { property: "og:title", content: "Academics at Northbridge" },
      { property: "og:description", content: "IB, IGCSE and AP programs. Curriculum, departments, exam system." },
    ],
  }),
  component: AcademicsPage,
});

function AcademicsPage() {
  const depts = [
    { i: BookOpen, t: "Languages & Literature", d: "English, Spanish, Mandarin, French, Arabic." },
    { i: FlaskConical, t: "Sciences", d: "Biology, Chemistry, Physics, Environmental Sci." },
    { i: Code2, t: "Mathematics & Computing", d: "Pure, Applied, AP Calculus, AI & Data Sci." },
    { i: Palette, t: "Arts", d: "Visual, Music, Theater, Film, Design." },
  ];
  return (
    <Layout>
      <PageHero eyebrow="Academics" title="A curriculum without ceilings." subtitle="Three world-class diploma pathways. Limitless ways to shine." />

      <section className="py-16 mx-auto max-w-7xl px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Our departments</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {depts.map((d, i) => (
            <motion.div key={d.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-3xl bg-card border border-border p-6 hover:shadow-elegant transition">
              <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center mb-4">
                <d.i className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg">{d.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{d.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Daily Rhythm</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">A timetable that breathes.</h2>
            <p className="mt-4 text-muted-foreground">Eight 50-minute periods, two recess windows and a daily 40-minute mentor block.</p>
            <div className="mt-6 rounded-2xl bg-card border border-border overflow-hidden">
              {[
                ["08:00", "Mentor block"],
                ["08:40", "Period 1 — Core"],
                ["09:35", "Period 2 — Core"],
                ["10:30", "Recess"],
                ["10:50", "Period 3 — Specialism"],
                ["12:30", "Lunch + Clubs"],
                ["13:30", "Period 5–7"],
                ["15:30", "Athletics & Arts"],
              ].map(([t, l]) => (
                <div key={t} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
                  <Calendar className="h-4 w-4 text-cyan" />
                  <span className="font-mono text-sm w-16 text-muted-foreground">{t}</span>
                  <span className="font-medium">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Assessment</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Exam system & reports.</h2>
            <p className="mt-4 text-muted-foreground">Continuous assessment supplemented by external IGCSE, IBDP and AP examinations. Detailed reports issued each term with narrative feedback.</p>
            <div className="mt-6 grid gap-3">
              {[
                "IGCSE — Grades 9–10",
                "IB Diploma — Grades 11–12",
                "AP Courses — Grades 10–12",
                "Termly narrative reports",
                "Parent–teacher conferences ×3/yr",
              ].map((x) => (
                <div key={x} className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold" /> <span className="text-sm">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 mx-auto max-w-7xl px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Download center</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            "Curriculum Handbook 2025",
            "IB Diploma Guide",
            "IGCSE Subject Choices",
            "Academic Calendar",
            "Parent Portal Manual",
            "University Counseling Brochure",
          ].map((f) => (
            <a key={f} href="#" className="group rounded-2xl bg-card border border-border p-5 flex items-center gap-4 hover:shadow-elegant transition">
              <div className="h-12 w-12 rounded-xl gradient-cyan flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{f}</div>
                <div className="text-xs text-muted-foreground">PDF · 2 MB</div>
              </div>
              <Download className="h-5 w-5 text-muted-foreground group-hover:text-cyan transition" />
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
}
