import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { Trophy, Music, Code, Globe, HeartHandshake, Mic } from "lucide-react";
import sportsImg from "@/assets/sports.jpg";
import artsImg from "@/assets/arts.jpg";
import stemImg from "@/assets/stem-lab.jpg";
import libraryImg from "@/assets/library.jpg";
import campusImg from "@/assets/campus-aerial.jpg";
import heroImg from "@/assets/hero-campus.jpg";

export const Route = createFileRoute("/student-life")({
  head: () => ({
    meta: [
      { title: "Student Life — Northbridge International Academy" },
      { name: "description", content: "Clubs, sports, arts, leadership and the moments that make a Northbridge education unforgettable." },
      { property: "og:title", content: "Student Life at Northbridge" },
      { property: "og:description", content: "Clubs, sports, arts, leadership and unforgettable moments." },
    ],
  }),
  component: StudentLifePage,
});

function StudentLifePage() {
  const clubs = [
    { i: Code, t: "Robotics & Coding", n: "120 members" },
    { i: Mic, t: "Debate & Model UN", n: "85 members" },
    { i: Music, t: "Symphony & Jazz", n: "150 members" },
    { i: Globe, t: "Global Issues", n: "60 members" },
    { i: HeartHandshake, t: "Service Corps", n: "200 members" },
    { i: Trophy, t: "Athletic Council", n: "All varsity" },
  ];
  const imgs = [stemImg, sportsImg, artsImg, libraryImg, campusImg, heroImg];
  return (
    <Layout>
      <PageHero eyebrow="Student Life" title="Where school becomes a life." subtitle="40+ clubs. 16 varsity sports. One ridiculously vibrant community." />

      <section className="py-16 mx-auto max-w-7xl px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Clubs & societies</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clubs.map((c) => (
            <div key={c.t} className="rounded-3xl bg-card border border-border p-6 hover:shadow-elegant transition flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl gradient-coral flex items-center justify-center">
                <c.i className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold">{c.t}</div>
                <div className="text-xs text-muted-foreground">{c.n}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-6 text-center">
          {[
            { t: "Sports Teams", v: "16 Varsity", d: "Basketball, swim, track, tennis, soccer, rugby & more." },
            { t: "Arts & Culture", v: "8 Stages", d: "Theater, orchestra, dance studio, film lab, recording booth." },
            { t: "Student Leadership", v: "30 Roles", d: "House captains, prefects, council, Model UN officers." },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl bg-card border border-border p-8 shadow-soft">
              <div className="font-display text-3xl text-gradient-gold font-bold">{x.v}</div>
              <div className="font-semibold mt-2">{x.t}</div>
              <p className="text-sm text-muted-foreground mt-2">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 mx-auto max-w-7xl px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Achievement gallery</h2>
        <div className="columns-2 md:columns-3 gap-4">
          {imgs.map((src, i) => (
            <img key={i} src={src} alt="" className="mb-4 w-full rounded-2xl break-inside-avoid hover:scale-[1.02] transition" loading="lazy" />
          ))}
        </div>
      </section>
    </Layout>
  );
}
