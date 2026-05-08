import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Play, MapPin, Sparkles, GraduationCap, FlaskConical, Trophy,
  BookOpen, Theater, Compass, Bus, Star, ChevronRight, Calendar, Search,
  User, Users, Library, CalendarDays, UtensilsCrossed, CreditCard, Map,
  Quote, Filter, ImageIcon, ArrowUpRight, CheckCircle2,
} from "lucide-react";
import heroImg from "@/assets/hero-campus.jpg";
import principalImg from "@/assets/principal.jpg";
import stemImg from "@/assets/stem-lab.jpg";
import sportsImg from "@/assets/sports.jpg";
import libraryImg from "@/assets/library.jpg";
import artsImg from "@/assets/arts.jpg";
import campusImg from "@/assets/campus-aerial.jpg";

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
      }}
      className="relative min-h-[100svh] flex items-center pt-32 pb-20 overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroImg} alt="Northbridge campus" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background" />
        <div className="absolute inset-0 gradient-mesh mix-blend-overlay" />
      </motion.div>

      <div className="absolute top-32 left-10 h-72 w-72 rounded-full bg-cyan/30 blur-3xl animate-blob" />
      <div className="absolute bottom-32 right-10 h-80 w-80 rounded-full bg-gold/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-coral/20 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-4 w-full grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 text-primary-foreground">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-medium tracking-wider uppercase"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Admissions Open · Class of 2031
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display text-5xl md:text-7xl xl:text-8xl font-bold leading-[0.95]"
          >
            Where{" "}
            <span className="relative inline-block">
              <span className="text-gradient-gold">curious minds</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10">
                <path d="M0 5 Q50 0 100 5 T200 5" stroke="oklch(0.78 0.16 75)" strokeWidth="2" fill="none" />
              </svg>
            </span>
            <br /> shape the future.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-primary-foreground/80 max-w-xl"
          >
            A premier international secondary school for grades 6–12, blending Cambridge & IB curricula with cutting-edge STEM, performing arts and global citizenship.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/admissions" className="group inline-flex items-center gap-2 rounded-xl gradient-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-gold hover:scale-[1.03] transition">
              Apply Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-xl glass-dark px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-white/10 transition">
              <Play className="h-4 w-4 text-gold" /> Virtual Tour
            </button>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground/90 hover:text-gold transition">
              <MapPin className="h-4 w-4" /> Explore Campus
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative h-[420px] hidden lg:block">
          {[
            { top: "8%", left: "10%", icon: Trophy, label: "World #1", value: "STEM Olympiad", color: "gradient-gold", delay: 0 },
            { top: "32%", left: "55%", icon: GraduationCap, label: "98%", value: "University placement", color: "gradient-cyan", delay: 0.2 },
            { top: "62%", left: "5%", icon: Users, label: "42 nations", value: "in our community", color: "gradient-coral", delay: 0.4 },
            { top: "75%", left: "55%", icon: BookOpen, label: "AP · IB · IGCSE", value: "Triple curriculum", color: "gradient-hero", delay: 0.6 },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + c.delay }}
              style={{
                top: c.top, left: c.left,
                transform: `translate(${mouse.x * (i % 2 ? 18 : -18)}px, ${mouse.y * (i % 2 ? 18 : -18)}px)`,
              }}
              className="absolute glass-dark rounded-2xl p-4 shadow-elegant animate-float min-w-[180px]"
            >
              <div className={`h-9 w-9 rounded-lg ${c.color} flex items-center justify-center mb-2`}>
                <c.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-primary-foreground font-display font-bold text-lg leading-none">{c.label}</div>
              <div className="text-xs text-primary-foreground/60 mt-1">{c.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/70 text-xs flex flex-col items-center gap-2"
      >
        <span className="uppercase tracking-widest">Scroll</span>
        <div className="h-10 w-5 rounded-full border border-primary-foreground/30 flex items-start justify-center p-1">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- TICKER ---------- */
function Ticker() {
  const items = [
    "🏆 5 students qualify for International Math Olympiad finals",
    "🎭 Spring Musical 'Hadestown' tickets on sale May 18",
    "🚌 New shuttle routes for Westbridge & Harborfront",
    "🌍 Model UN team takes 1st place in Geneva",
    "📚 Library extended hours during finals week",
  ];
  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden border-y border-white/10">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="text-sm flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- PRINCIPAL ---------- */
function Principal() {
  return (
    <section className="relative py-24 overflow-hidden">
      <svg className="absolute bottom-0 left-0 w-full opacity-50" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 100 Q360 20 720 100 T1440 100 V200 H0 Z" fill="url(#wg)" />
        <defs>
          <linearGradient id="wg" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.15 220 / 0.15)" />
            <stop offset="100%" stopColor="oklch(0.78 0.16 75 / 0.15)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 gradient-cyan rounded-full blur-3xl opacity-30 scale-90" />
          <div className="relative h-80 w-80 md:h-96 md:w-96 rounded-full overflow-hidden ring-4 ring-gold shadow-glow">
            <img src={principalImg} alt="Principal Dr. Eleanor Vance" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-2 -right-2 glass rounded-2xl px-4 py-3 shadow-elegant">
            <div className="text-xs text-muted-foreground">Head of School</div>
            <div className="font-display font-bold">Dr. Eleanor Vance</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-widest text-cyan font-semibold">A Message From Our Principal</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
            "We don't just teach subjects.<br />
            <span className="text-gradient-gold">We cultivate purpose.</span>"
          </h2>
          <Quote className="absolute h-12 w-12 text-gold/20 -translate-y-4" />
          <p className="mt-5 text-muted-foreground leading-relaxed">
            For three decades, Northbridge has been a place where students are challenged to think bigger, act bolder and lead with empathy. Every classroom is a launchpad. Every teacher, a mentor. Every student, a future architect of change.
          </p>
          <button className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b-2 border-gold pb-1 hover:gap-3 transition-all">
            Read Full Message <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- WHY CHOOSE ---------- */
function WhyChoose() {
  const features = [
    { icon: FlaskConical, title: "STEM Labs", desc: "Robotics, AI, biotech and aerospace pods.", stat: "12 Labs", grad: "gradient-cyan" },
    { icon: Trophy, title: "Sports Academy", desc: "16 varsity teams. Olympian-level coaching.", stat: "120+ Trophies", grad: "gradient-gold" },
    { icon: Library, title: "Digital Library", desc: "85k volumes. AI research assistants.", stat: "85k+ Titles", grad: "gradient-cyan" },
    { icon: Theater, title: "Performing Arts", desc: "Theater, orchestra, dance, film studio.", stat: "8 Stages", grad: "gradient-coral" },
    { icon: Compass, title: "Career Counseling", desc: "1:1 mentoring from Ivy alumni.", stat: "98% placed", grad: "gradient-gold" },
    { icon: Bus, title: "Smart Transport", desc: "GPS-tracked, climate-controlled fleet.", stat: "32 Routes", grad: "gradient-cyan" },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Why Northbridge</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Built for the world your<br /> children will inherit.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-3xl bg-card border border-border p-6 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full ${f.grad} opacity-0 group-hover:opacity-30 blur-3xl transition duration-500`} />
              <div className={`relative h-12 w-12 rounded-xl ${f.grad} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="relative font-display font-bold text-xl mb-1">{f.title}</h3>
              <p className="relative text-sm text-muted-foreground">{f.desc}</p>
              <div className="relative mt-5 flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{f.stat}</span>
                <ArrowUpRight className="h-4 w-4 text-foreground/40 group-hover:text-gold group-hover:rotate-12 transition" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- COUNTERS ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1800;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 text-primary-foreground">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">By The Numbers</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">A community that performs.</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: 98, s: "%", l: "University Acceptance", d: "Ivy & Russell Group" },
            { v: 320, s: "+", l: "Awards This Decade", d: "National & global" },
            { v: 64, s: "", l: "Partner Universities", d: "Across 18 countries" },
            { v: 100, s: "%", l: "Certified Faculty", d: "75% with Masters/PhD" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-dark rounded-2xl p-6"
            >
              <div className="font-display text-5xl md:text-6xl font-bold text-gradient-gold leading-none">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 font-semibold">{s.l}</div>
              <div className="text-sm text-primary-foreground/60">{s.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- COUNTDOWN + EVENTS ---------- */
function Countdown({ target }: { target: Date }) {
  const [t, setT] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setT(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const d = Math.max(0, Math.floor(t / 86400000));
  const h = Math.max(0, Math.floor((t / 3600000) % 24));
  const m = Math.max(0, Math.floor((t / 60000) % 60));
  const s = Math.max(0, Math.floor((t / 1000) % 60));
  return (
    <div className="flex gap-2">
      {[{ v: d, l: "Days" }, { v: h, l: "Hrs" }, { v: m, l: "Min" }, { v: s, l: "Sec" }].map((u) => (
        <div key={u.l} className="rounded-xl glass-dark px-3 py-2 min-w-[60px] text-center">
          <div className="font-display font-bold text-2xl text-gold leading-none">{String(u.v).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-wider text-primary-foreground/60">{u.l}</div>
        </div>
      ))}
    </div>
  );
}

function Events() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Academic", "Sports", "Arts", "Community"];
  const events = [
    { d: "MAY 18", t: "Spring Showcase", c: "Arts", img: artsImg, desc: "Annual celebration of student creativity." },
    { d: "MAY 24", t: "Robotics State Final", c: "Academic", img: stemImg, desc: "Our team defends their championship." },
    { d: "JUN 02", t: "Inter-School Championships", c: "Sports", img: sportsImg, desc: "Track, swim & basketball finals." },
    { d: "JUN 10", t: "Community Service Fair", c: "Community", img: campusImg, desc: "100+ partner organizations." },
  ];
  const filtered = filter === "All" ? events : events.filter((e) => e.c === filter);
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-end mb-10">
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-widest text-cyan font-semibold">News & Events</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">What's happening on campus.</h2>
          </div>
          <div className="rounded-2xl gradient-hero p-5 text-primary-foreground">
            <div className="text-xs uppercase tracking-wider text-gold mb-2">Next big event</div>
            <div className="font-display font-bold mb-3">Open House · June 14</div>
            <Countdown target={new Date(Date.now() + 1000 * 60 * 60 * 24 * 32)} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search events…" className="w-full rounded-xl bg-card border border-border pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan/40" />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            {cats.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  filter === c ? "gradient-hero text-primary-foreground shadow-soft" : "bg-card border border-border hover:bg-accent"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((e, i) => (
            <motion.article
              key={e.t}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group rounded-3xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={e.img} alt={e.t} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute top-3 left-3 rounded-lg gradient-gold px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
                  {e.d}
                </div>
                <div className="absolute top-3 right-3 rounded-full glass-dark px-2 py-0.5 text-[10px] font-medium text-primary-foreground">{e.c}</div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg group-hover:text-cyan transition">{e.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan">
                  Read more <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PORTAL ---------- */
function Portal() {
  const items = [
    { i: User, l: "Student Portal", c: "gradient-cyan" },
    { i: Users, l: "Parent Login", c: "gradient-gold" },
    { i: BookOpen, l: "e-Learning", c: "gradient-cyan" },
    { i: CalendarDays, l: "Calendar", c: "gradient-coral" },
    { i: Users, l: "Staff Directory", c: "gradient-cyan" },
    { i: UtensilsCrossed, l: "Lunch Menu", c: "gradient-gold" },
    { i: Bus, l: "Bus Tracking", c: "gradient-coral" },
    { i: CreditCard, l: "Payments", c: "gradient-cyan" },
  ];
  return (
    <section className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Quick Access</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Your school. One dashboard.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.button
              key={it.l}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="group rounded-2xl bg-card border border-border p-5 text-left hover:shadow-elegant hover:-translate-y-1 transition-all"
            >
              <div className={`h-11 w-11 rounded-xl ${it.c} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                <it.i className="h-5 w-5 text-primary" />
              </div>
              <div className="font-semibold">{it.l}</div>
              <div className="mt-2 flex items-center gap-1 text-xs text-cyan opacity-0 group-hover:opacity-100 transition">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ACADEMICS TABS ---------- */
function Academics() {
  const tabs = ["Junior School", "Senior School", "STEM", "Arts", "ICT"];
  const [active, setActive] = useState(0);
  const data = [
    { t: "Grades 6–8 · Foundation Years", d: "Building inquiry, critical thinking and the love of learning. Cambridge Lower Secondary aligned with project-based modules in coding, design and global studies.", b: ["Personalized learning pathways", "Mandatory second language", "Weekly outdoor science", "Mentor-based pastoral care"] },
    { t: "Grades 9–12 · Diploma Years", d: "IGCSE, IB Diploma and AP courses with university counseling from grade 9. Graduates accepted at Cambridge, MIT, Stanford and beyond.", b: ["Triple curriculum (IB, IGCSE, AP)", "Senior research thesis", "Dual enrollment programs", "Ivy mentor 1:1"] },
    { t: "STEM · Innovation Pods", d: "Robotics, biotech, AI, aerospace and renewable-energy research labs led by working scientists in residence.", b: ["Maker space + 3D printing", "Mars Habitat simulator", "AI / ML curriculum from grade 7", "Patent program"] },
    { t: "Arts & Humanities", d: "Conservatory-grade programs in music, theater, visual art, film and creative writing. Annual showcases on three stages.", b: ["Recording studio + film lab", "Visiting artists residency", "Lit magazine & podcast", "Black-box theater"] },
    { t: "ICT & Digital Literacy", d: "Cyber-security, ethical AI, data science and game development. Every student graduates fluent in computational thinking.", b: ["1:1 device program", "Capture-the-flag league", "Esports varsity team", "Ethics-of-AI seminar"] },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Academics</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">A curriculum without ceilings.</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                active === i ? "gradient-hero text-primary-foreground shadow-elegant" : "bg-card border border-border hover:bg-accent"
              }`}>
              {t}
            </button>
          ))}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl bg-card border border-border p-8 shadow-soft"
        >
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold">{data[active].t}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{data[active].d}</p>
            <ul className="mt-5 grid gap-2.5">
              {data[active].b.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" /> {b}
                </li>
              ))}
            </ul>
            <button className="mt-6 inline-flex items-center gap-2 rounded-xl gradient-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold hover:scale-[1.03] transition">
              Download Syllabus <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <img src={[campusImg, libraryImg, stemImg, artsImg, stemImg][active]} alt="" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const items = [
    { name: "Aria Chen", role: "Class of 2024 · MIT", t: "Northbridge taught me to think like an engineer and lead like a humanitarian. The robotics lab basically wrote my college essay.", r: 5 },
    { name: "Mr. & Mrs. Okafor", role: "Parents", t: "Three children, three completely different paths. Northbridge somehow made each of them feel like the most important student in the building.", r: 5 },
    { name: "Liam Park", role: "Alumni · Founder, Helio AI", t: "I came in shy and obsessed with coding. I left with a startup, a Cambridge offer and friends from 12 countries.", r: 5 },
    { name: "Dr. Priya Sharma", role: "Parent · Surgeon", t: "The teacher mentorship is unlike anywhere I've seen. My daughter has weekly 1:1 time with her advisor — and it shows.", r: 5 },
  ];
  const [i, setI] = useState(0);
  return (
    <section className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Voices of Northbridge</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Loved by students.<br />Trusted by families.</h2>
        </div>
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
          className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-elegant text-center"
        >
          <div className="flex justify-center gap-1 mb-5">
            {Array.from({ length: items[i].r }).map((_, k) => (
              <Star key={k} className="h-5 w-5 fill-gold text-gold" />
            ))}
          </div>
          <p className="font-display text-xl md:text-2xl leading-snug">"{items[i].t}"</p>
          <div className="mt-6">
            <div className="font-semibold">{items[i].name}</div>
            <div className="text-sm text-muted-foreground">{items[i].role}</div>
          </div>
        </motion.div>
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, k) => (
            <button key={k} onClick={() => setI(k)}
              className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-2 bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
function Gallery() {
  const imgs = [stemImg, artsImg, sportsImg, libraryImg, campusImg, heroImg];
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-cyan font-semibold">Life At Northbridge</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Inside our world.</h2>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {imgs.map((src, i) => (
            <button key={i} onClick={() => setOpen(src)}
              className="mb-4 block w-full break-inside-avoid relative group overflow-hidden rounded-2xl">
              <img src={src} alt="" className="w-full h-auto group-hover:scale-110 transition duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <div className="text-primary-foreground">
                  <div className="text-xs text-gold uppercase tracking-wider">View</div>
                  <div className="font-semibold flex items-center gap-1">
                    <ImageIcon className="h-4 w-4" /> Campus moment
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-50 bg-primary/90 backdrop-blur flex items-center justify-center p-4 animate-in fade-in">
          <img src={open} alt="" className="max-h-[90vh] max-w-full rounded-2xl shadow-elegant" />
        </div>
      )}
    </section>
  );
}

/* ---------- VIRTUAL TOUR ---------- */
function VirtualTour() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative rounded-3xl overflow-hidden gradient-hero p-8 md:p-16 text-primary-foreground">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-gold/30 blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-cyan/30 blur-3xl animate-blob" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">360° Experience</span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Step inside Northbridge.</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-md">
                Wander our STEM pods, theater, sports complex and dorms — all from your sofa. Available 24/7 in immersive 360°.
              </p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-xl gradient-gold text-gold-foreground px-6 py-3.5 text-sm font-bold shadow-gold hover:scale-[1.03] transition">
                <Play className="h-4 w-4" /> Start Virtual Tour
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden glass-dark group cursor-pointer">
              <img src={campusImg} alt="" className="h-full w-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full gradient-gold flex items-center justify-center shadow-gold group-hover:scale-110 transition">
                  <Play className="h-8 w-8 text-primary fill-primary ml-1" />
                </div>
              </div>
              <div className="absolute top-3 left-3 rounded-full glass-dark px-3 py-1 text-xs flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" /> LIVE PREVIEW
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- NEWSLETTER ---------- */
function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative rounded-3xl bg-card border border-border p-8 md:p-14 overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-60" />
          <div className="absolute top-6 right-6 h-24 w-24 rounded-full bg-gold/30 blur-2xl animate-float" />
          <div className="relative text-center max-w-xl mx-auto">
            <Sparkles className="h-8 w-8 text-gold mx-auto mb-3" />
            <h2 className="font-display text-3xl md:text-4xl font-bold">Stay in the loop.</h2>
            <p className="mt-3 text-muted-foreground">Monthly updates on admissions, events and student wins. No spam — just signal.</p>
            {done ? (
              <div className="mt-6 rounded-xl gradient-cyan text-white px-5 py-3 inline-flex items-center gap-2 animate-in fade-in zoom-in">
                <CheckCircle2 className="h-5 w-5" /> Welcome aboard!
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input required type="email" placeholder="you@email.com"
                  className="flex-1 rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" />
                <button className="rounded-xl gradient-gold text-gold-foreground px-5 py-3 text-sm font-bold shadow-gold hover:scale-[1.03] transition">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- LOADING ---------- */
function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] gradient-hero flex items-center justify-center animate-out fade-out duration-500">
      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl gradient-gold flex items-center justify-center shadow-gold mx-auto animate-pulse">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <div className="mt-4 font-display font-bold text-primary-foreground tracking-widest text-sm">NORTHBRIDGE</div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <Ticker />
      <Principal />
      <WhyChoose />
      <Stats />
      <Events />
      <Portal />
      <Academics />
      <Testimonials />
      <Gallery />
      <VirtualTour />
      <Newsletter />
    </>
  );
}
