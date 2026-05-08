import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHero } from "@/components/site/Layout";
import { Search, Calendar, ArrowRight } from "lucide-react";
import stemImg from "@/assets/stem-lab.jpg";
import sportsImg from "@/assets/sports.jpg";
import artsImg from "@/assets/arts.jpg";
import libraryImg from "@/assets/library.jpg";
import campusImg from "@/assets/campus-aerial.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Northbridge International Academy" },
      { name: "description", content: "The latest stories, achievements and upcoming events from across the Northbridge campus." },
      { property: "og:title", content: "News & Events" },
      { property: "og:description", content: "Latest stories, achievements and upcoming events at Northbridge." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const cats = ["All", "Academic", "Sports", "Arts", "Community"];
  const [c, setC] = useState("All");
  const posts = [
    { t: "5 students qualify for International Math Olympiad", c: "Academic", img: stemImg, d: "May 2, 2026" },
    { t: "Inter-school basketball champions for 4th year running", c: "Sports", img: sportsImg, d: "Apr 28, 2026" },
    { t: "'Hadestown' — our biggest spring musical yet", c: "Arts", img: artsImg, d: "Apr 22, 2026" },
    { t: "Service Corps logs 12,000 community hours", c: "Community", img: campusImg, d: "Apr 18, 2026" },
    { t: "New AI ethics curriculum debuts in grade 9", c: "Academic", img: libraryImg, d: "Apr 10, 2026" },
    { t: "Open House registration now live", c: "Community", img: campusImg, d: "Apr 4, 2026" },
  ];
  const filtered = c === "All" ? posts : posts.filter((p) => p.c === c);
  return (
    <Layout>
      <PageHero eyebrow="Newsroom" title="Stories from the bridge." subtitle="Discoveries, performances, championships and the people behind them." />

      <section className="py-12 mx-auto max-w-7xl px-4">
        <div className="rounded-3xl overflow-hidden grid lg:grid-cols-2 bg-card border border-border shadow-elegant">
          <div className="aspect-video lg:aspect-auto overflow-hidden">
            <img src={filtered[0]?.img ?? campusImg} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-cyan font-bold">Featured · {filtered[0]?.c}</span>
            <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold">{filtered[0]?.t}</h2>
            <p className="mt-3 text-muted-foreground">A celebration of the work, late nights and breakthroughs that shape our community.</p>
            <button className="mt-6 inline-flex items-center gap-2 self-start rounded-xl gradient-gold text-gold-foreground px-5 py-2.5 text-sm font-bold">
              Read story <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search stories…" className="w-full rounded-xl bg-card border border-border pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan/40" />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((k) => (
              <button key={k} onClick={() => setC(k)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  c === k ? "gradient-hero text-primary-foreground" : "bg-card border border-border hover:bg-accent"
                }`}>{k}</button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <article key={p.t} className="group rounded-3xl overflow-hidden bg-card border border-border hover:shadow-elegant transition">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.t} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {p.d} · {p.c}</div>
                <h3 className="mt-2 font-display font-bold text-lg group-hover:text-cyan transition">{p.t}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 mx-auto max-w-5xl px-4">
        <div className="rounded-3xl gradient-hero text-primary-foreground p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold">Event registration</div>
            <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold">Open House — June 14, 2026</h3>
            <p className="mt-2 text-primary-foreground/80">Tour the campus, meet the team and sit in on a live class.</p>
          </div>
          <button className="rounded-xl gradient-gold text-gold-foreground px-6 py-3 font-bold shadow-gold">Reserve a spot</button>
        </div>
      </section>
    </Layout>
  );
}
