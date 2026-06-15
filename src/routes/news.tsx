import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Layout } from "@/components/site/Layout";
import { Search, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import {
  motion, useScroll, useTransform, useSpring, useInView, AnimatePresence,
} from "framer-motion";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Rochas Foundation College" },
      { name: "description", content: "The latest stories, achievements and upcoming events from Rochas Foundation College." },
      { property: "og:title", content: "News & Events" },
      { property: "og:description", content: "Latest stories, achievements and upcoming events at Rochas Foundation College." },
    ],
  }),
  component: NewsPage,
});

/* ─── IMAGES ─── */
const IMGS = {
  hero:     "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80",
  library:  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
  campus:   "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
  students: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&q=80",
  grad:     "https://images.unsplash.com/photo-1627556704302-624286467c65?w=900&q=80",
};

/* ══════════════════════════════════════════════════
   SHARED ANIMATION PRIMITIVES
══════════════════════════════════════════════════ */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px 0px", amount: 0.05 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
      transition={{ duration: 0.6, delay: inView ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: "opacity, transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeFrom({ children, dir = "left", delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px 0px", amount: 0.05 });
  const xVal = dir === "left" ? -40 : dir === "right" ? 40 : 0;
  const yVal = dir === "up" ? 32 : dir === "down" ? -32 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xVal, y: yVal }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : xVal, y: inView ? 0 : yVal }}
      transition={{ duration: 0.6, delay: inView ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: "opacity, transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function DrawLine({ className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-40px 0px", amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: inView ? 1 : 0 }}
      transition={{ duration: 0.65, delay: inView ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformOrigin: "left center", willChange: "transform" }}
      className={className}
    />
  );
}

function SectionLabel({ label, light = true }) {
  return (
    <FadeFrom dir="left" className="flex items-center gap-3 mb-4">
      <DrawLine className={`h-px w-8 ${light ? "bg-blue-400" : "bg-blue-600"}`} />
      <p className={`text-[10px] uppercase tracking-widest font-semibold ${light ? "text-blue-400" : "text-blue-600"}`}>
        {label}
      </p>
    </FadeFrom>
  );
}

/* ══════════════════════════════════════════════════
   PAGE HERO - Blue Gradient
══════════════════════════════════════════════════ */
function PageHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const yBg      = useTransform(smooth, [0, 1], [0, 160]);
  const scaleBg  = useTransform(smooth, [0, 1], [1.06, 1]);
  const yContent = useTransform(smooth, [0, 1], [0, -40]);
  const opacity  = useTransform(smooth, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-24 min-h-[500px] flex items-center bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 origin-center">
        <img src={IMGS.hero} alt="Newsroom" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-blue-900/60" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <motion.div style={{ y: yContent, opacity }}
        className="relative mx-auto max-w-7xl px-6 text-center w-full pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-800/50 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-blue-200/80">Newsroom</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
          Stories from<br />
          <em className="not-italic text-blue-300">the College.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-blue-200/70 max-w-2xl mx-auto leading-relaxed">
          Discoveries, performances, championships and the people behind them.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CATEGORY BADGE COLORS
══════════════════════════════════════════════════ */
const catStyle = {
  Academic:  { badge: "bg-blue-800/60 text-blue-300 border-blue-600/40",          bar: "bg-blue-400"    },
  Community: { badge: "bg-emerald-800/60 text-emerald-300 border-emerald-600/40", bar: "bg-emerald-400" },
};

/* ══════════════════════════════════════════════════
   ALL POSTS DATA
══════════════════════════════════════════════════ */
const ALL_POSTS = [
  { t: "Service Corps logs 12,000 community hours",         c: "Community", img: "/images/hero.jpg", d: "Apr 18, 2026" },
  { t: "New AI ethics curriculum debuts in Grade 9",        c: "Academic",  img: IMGS.library,  d: "Apr 10, 2026" },
  { t: "Open House registration now live",                  c: "Community", img: IMGS.students, d: "Apr 4, 2026"  },
  { t: "Alumni spotlight: Liam Park, founder of Helio AI", c: "Community", img: IMGS.grad,     d: "Mar 12, 2026" },
];

/* ══════════════════════════════════════════════════
   FEATURED STORY - Blue Section
══════════════════════════════════════════════════ */
function FeaturedStory({ post }) {
  const cs = catStyle[post.c] || catStyle.Community;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel label="Featured Story" light={true} />
        <div className="rounded-3xl overflow-hidden grid lg:grid-cols-2 bg-blue-800/40 border border-blue-700/40 backdrop-blur-sm">
          <FadeFrom dir="left" className="aspect-video lg:aspect-auto overflow-hidden relative min-h-[280px]">
            <motion.img
              src={post.img} alt={post.t}
              style={{ y: imgY }}
              className="h-[116%] w-full object-cover absolute inset-0 -top-[8%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-900/50" />
            <span className={`absolute top-4 left-4 rounded-full border text-[10px] font-medium px-3 py-1 ${cs.badge}`}>
              {post.c}
            </span>
          </FadeFrom>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-2 text-xs text-blue-300/60 mb-4">
                <Calendar className="h-3 w-3" /> {post.d}
              </div>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white leading-snug mb-4">
                {post.t}
              </h2>
              <p className="text-base text-blue-200/60 leading-relaxed mb-8">
                A celebration of the work, late nights and breakthroughs that shape our community — and a look at what comes next.
              </p>
              <button className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-sm font-semibold transition-colors">
                Read story <ArrowRight className="h-4 w-4" />
              </button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   NEWS GRID - White Section (Cards on white background)
══════════════════════════════════════════════════ */
function NewsGrid() {
  const cats = ["All", "Academic", "Community"];
  const [activecat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = ALL_POSTS.filter((p) => {
    const matchCat = activecat === "All" || p.c === activecat;
    const matchQ   = p.t.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <SectionLabel label="All Stories" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
              What's been <em className="not-italic text-blue-600">happening.</em>
            </h2>
          </FadeUp>
        </div>

        {/* Filter bar */}
        <FadeUp delay={0.08} className="flex flex-wrap items-center gap-3 mb-10">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500/60" />
            <input
              placeholder="Search stories…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-100 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-400 transition"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((k) => (
              <button key={k} onClick={() => setActiveCat(k)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activecat === k
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"
                }`}>
                {k}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Cards - White cards with blue accents */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const cs = catStyle[p.c] || catStyle.Community;
              return (
                <motion.article key={p.t}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img src={p.img} alt={p.t}
                      className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <span className={`absolute top-3 right-3 rounded-full border text-[10px] font-medium px-2.5 py-0.5 ${cs.badge}`}>
                      {p.c}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className={`h-px w-8 ${cs.bar} mb-3`} />
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                      <Calendar className="h-3 w-3" /> {p.d}
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                      {p.t}
                    </h3>
                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:gap-2 transition-all">
                      Read more <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <FadeUp className="py-20 text-center">
            <p className="text-slate-400 text-sm">No stories match your search.</p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   OPEN HOUSE BANNER - Blue Gradient
══════════════════════════════════════════════════ */
function OpenHouseBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px 0px", amount: 0.15 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-blue-800 to-blue-900">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl bg-blue-700/50 border border-blue-500/30 backdrop-blur-sm overflow-hidden">
          <motion.img
            src="/images/hero.jpg"
            alt=""
            style={{ y: bgY }}
            className="absolute inset-0 h-[116%] w-full object-cover -top-[8%] opacity-10"
          />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
          <div className="relative p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-800/50 px-3 py-1 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-blue-200/80 font-medium">Event Registration</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  Open House — June 14, 2026
                </h3>
                <p className="text-blue-200/70 text-sm leading-relaxed max-w-lg">
                  Tour the campus, meet the faculty and sit in on a live class. Spaces are limited — reserve yours today.
                </p>
              </FadeUp>
            </div>
            <FadeFrom dir="right" delay={0.1}>
              <button className="rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 font-bold text-sm transition-colors whitespace-nowrap flex items-center gap-2 shadow-lg">
                Reserve a spot <ArrowRight className="h-4 w-4" />
              </button>
            </FadeFrom>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════ */
function NewsPage() {
  return (
    <Layout>
      <PageHero />
      <FeaturedStory post={ALL_POSTS[0]} />
      <NewsGrid />
      <OpenHouseBanner />
    </Layout>
  );
}