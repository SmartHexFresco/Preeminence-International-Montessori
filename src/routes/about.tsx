import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { motion } from "framer-motion";
import { Award, Heart, Lightbulb, Globe2, Users, Target, Trophy } from "lucide-react";
import principalImg from "@/assets/principal.jpg";
import campusImg from "@/assets/campus-aerial.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Northbridge International Academy" },
      { name: "description", content: "30 years of excellence. Meet our leadership, history, vision and accreditations." },
      { property: "og:title", content: "About Northbridge" },
      { property: "og:description", content: "30 years of excellence. Meet our leadership, history and vision." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const values = [
    { i: Lightbulb, t: "Curiosity", d: "We chase questions, not just answers." },
    { i: Heart, t: "Empathy", d: "Leaders who listen before they lead." },
    { i: Globe2, t: "Global Mindset", d: "Citizens of every place." },
    { i: Target, t: "Excellence", d: "Mastery as a daily practice." },
  ];
  const timeline = [
    { y: "1994", t: "Founded", d: "Opened with 80 students in a converted observatory." },
    { y: "2003", t: "IB Accredited", d: "First school in the region to offer the IB Diploma." },
    { y: "2011", t: "STEM Wing", d: "$40M innovation campus opens." },
    { y: "2018", t: "Global Network", d: "Joined the Round Square international consortium." },
    { y: "2024", t: "AI Initiative", d: "Launched ethical AI curriculum across all grades." },
  ];
  return (
    <Layout>
      <PageHero eyebrow="About Us" title="Three decades of bold education." subtitle="Founded in 1994 with a simple belief: the world doesn't need more graduates — it needs more thinkers." />

      <section className="py-16 mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-center">
        <img src={campusImg} alt="" className="rounded-3xl shadow-elegant" loading="lazy" />
        <div>
          <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Vision & Mission</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Educators of consequence.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our mission is to graduate young adults who think rigorously, act ethically and live joyfully. Our vision is a world made better by the people we send into it.
          </p>
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-10">Our core values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-3xl bg-card border border-border p-6 hover:shadow-elegant transition">
                <div className="h-12 w-12 rounded-xl gradient-cyan flex items-center justify-center mb-4">
                  <v.i className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg">{v.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 mx-auto max-w-5xl px-4">
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-12">Our journey</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 gradient-gold md:-translate-x-1/2" />
          {timeline.map((t, i) => (
            <motion.div key={t.y}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative pl-12 md:pl-0 mb-8 md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full gradient-gold ring-4 ring-background" />
              <div className="md:[direction:ltr]">
                <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
                  <div className="text-xs uppercase tracking-widest text-cyan font-bold">{t.y}</div>
                  <div className="mt-1 font-display font-bold text-lg">{t.t}</div>
                  <p className="text-sm text-muted-foreground mt-1">{t.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 mx-auto max-w-7xl px-4">
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-10">Leadership team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { n: "Dr. Eleanor Vance", r: "Head of School", img: principalImg },
            { n: "Marcus Reyes", r: "Director of Academics" },
            { n: "Aisha Okafor", r: "Dean of Students" },
            { n: "James Park", r: "Head of Innovation" },
          ].map((p, i) => (
            <motion.div key={p.n}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-3xl overflow-hidden bg-card border border-border hover:shadow-elegant transition group">
              <div className="aspect-square overflow-hidden gradient-hero">
                {p.img ? (
                  <img src={p.img} alt={p.n} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center"><Users className="h-16 w-16 text-gold/50" /></div>
                )}
              </div>
              <div className="p-5">
                <div className="font-display font-bold">{p.n}</div>
                <div className="text-sm text-muted-foreground">{p.r}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Recognition</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Awards & accreditations</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["IB World School", "Cambridge Assessment", "Round Square", "CIS Accredited", "WASC", "EARCOS"].map((a) => (
              <div key={a} className="rounded-2xl glass px-6 py-4 flex items-center gap-2 shadow-soft">
                <Award className="h-5 w-5 text-gold" />
                <span className="font-semibold text-sm">{a}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 inline-flex items-center gap-3 rounded-full glass px-5 py-3">
            <Trophy className="h-5 w-5 text-gold" />
            <span className="text-sm font-semibold">Top 10 International Schools — Global Education Review 2024</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
