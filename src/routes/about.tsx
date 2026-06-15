


import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import {
  Award, Heart, Lightbulb, Globe2, Users, Target,
  Trophy, ArrowRight, CheckCircle2, GraduationCap
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us · Rochas Foundation College" },
      { name: "description", content: "Meet our leadership, history, vision and accreditations." },
      { property: "og:title", content: "About Rochas Foundation College" },
      { property: "og:description", content: "Meet our leadership, history and vision." },
    ],
  }),
  component: AboutPage,
});

/* ─── IMAGES ─── */
const IMGS = {
  campus:     "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
  principal:  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80",
  hero:       "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80",
  curiosity:  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80",
  empathy:    "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=700&q=80",
  global:     "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=700&q=80",
  excellence: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=700&q=80",
  awards:     "https://images.unsplash.com/photo-1546519638405-a2c39b0a0a4b?w=1200&q=80",
};

/* ══════════════════════════════════════════════════
   SHARED SCROLL ANIMATION PRIMITIVES
══════════════════════════════════════════════════ */

function FadeUp({ children, delay = 0, className = "", amount = 0.25 }) {
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

function StaggerList({ children, className = "", stagger = 0.07, amount = 0.15 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px 0px", amount: 0.05 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerItem = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

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

function SectionLabel({ label, light = false }) {
  return (
    <FadeFrom dir="left" className="flex items-center gap-3 mb-4">
      <DrawLine className={`h-px w-8 ${light ? "bg-blue-400" : "bg-blue-600"}`} />
      <p className={`text-[10px] uppercase tracking-widest font-semibold ${light ? "text-blue-400" : "text-blue-700"}`}>
        {label}
      </p>
    </FadeFrom>
  );
}

/* ══════════════════════════════════════════════
   PAGE HERO — parallax bg + staggered text
══════════════════════════════════════════════ */
function PageHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const yBg      = useTransform(smoothProgress, [0, 1], [0, 160]);
  const scaleBg  = useTransform(smoothProgress, [0, 1], [1.06, 1]);
  const yContent = useTransform(smoothProgress, [0, 1], [0, -40]);
  const opacity  = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative -z-10 overflow-hidden pb-24 min-h-[500px] flex items-center">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 origin-center">
        <img src={IMGS.hero} alt="Rochas Foundation College students" className="absolute inset-0 h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/95 via-blue-7000/85 to-blue-700/70" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />

      <motion.div style={{ y: yContent, opacity }}
        className="relative mx-auto max-w-7xl px-6 text-center w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-700/60 bg-blue-600/60 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-blue-300/80">About Us</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
          Three decades of<br />
          <em className="not-italic text-blue-400">bold education.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-blue-200/60 max-w-2xl mx-auto leading-relaxed">
          Founded in 1994 with a simple belief: the world doesn't need more graduates —
          it needs more thinkers.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   VISION & MISSION — slide from sides + parallax image
══════════════════════════════════════════════ */
function VisionMission() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <FadeFrom dir="left" className="relative">
          <div className="absolute top-5 left-5 right-[-18px] bottom-[-18px] rounded-3xl border border-blue-200 pointer-events-none" />
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            {/* ↓ replaced IMGS.campus with local asset */}
            <motion.img
              src="/images/hero.jpg"
              alt="Rochas Foundation campus"
              style={{ y: imgY }}
              className="h-[116%] w-full object-cover absolute inset-0 -top-[8%]"
              loading="lazy"
            />
          </div>
        </FadeFrom>

        <div>
          <SectionLabel label="Vision & Mission" light={false} />
          <FadeUp delay={0.05}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">Educators of</h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-700 italic leading-tight mb-6">consequence.</h2>
          </FadeUp>
          <FadeUp delay={0.18}>
            <DrawLine className="h-px w-12 bg-blue-600 mb-6" delay={0.3} />
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Our mission is to graduate young adults who think rigorously, act ethically and live joyfully.
              Our vision is a world made better by the people we send into it.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Cambridge & IB dual-curriculum framework",
                "Student-centred learning at every level",
                "Character development alongside academic rigour",
                "A global community of 42+ nationalities",
              ].map((item, i) => (
                <motion.li key={item}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-60px 0px' }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />{item}
                </motion.li>
              ))}
            </ul>
            <a href="/admissions"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 text-sm font-semibold transition-colors">
              Start Your Application <ArrowRight className="h-4 w-4" />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CORE VALUES — staggered cards with scale
══════════════════════════════════════════════ */
function CoreValues() {
  const values = [
    { icon: Lightbulb, title: "Curiosity",      desc: "We chase questions, not just answers. Inquiry is the engine of everything we do.",           accent: "text-blue-300",   iconBg: "bg-blue-700/70",   border: "border-blue-700/40",   img: IMGS.curiosity  },
    { icon: Heart,     title: "Empathy",        desc: "Leaders who listen before they lead. We build communities through understanding.",             accent: "text-purple-300", iconBg: "bg-purple-700/60", border: "border-purple-700/40", img: IMGS.empathy    },
    { icon: Globe2,    title: "Global Mindset", desc: "Citizens of every place. We prepare students for a world without borders.",                   accent: "text-sky-300",    iconBg: "bg-sky-700/60",    border: "border-sky-700/40",    img: IMGS.global     },
    { icon: Target,    title: "Excellence",     desc: "Mastery as a daily practice — not a destination, but a direction we commit to every morning.", accent: "text-indigo-300", iconBg: "bg-indigo-700/60", border: "border-indigo-700/40", img: IMGS.excellence },
  ];

  return (
    <section className="py-24 bg-blue-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="What We Stand For" light={true} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Our core <em className="not-italic text-blue-400">values.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} variants={{
                hidden:  { opacity: 0, y: 32, scale: 0.95 },
                visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
                className={`group rounded-2xl overflow-hidden border ${v.border} hover:-translate-y-1 transition-all duration-300`}>
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={v.img} alt={v.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-blue-700/60 to-transparent" />
                  <div className={`absolute top-4 left-4 h-10 w-10 rounded-xl ${v.iconBg} backdrop-blur-sm flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${v.accent}`} />
                  </div>
                </div>
                <div className="bg-blue-700/50 p-5">
                  <h3 className="font-display font-bold text-xl text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-blue-200/60 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   TIMELINE — alternating slide-in cards + draw line
══════════════════════════════════════════════ */
function Timeline() {
  const events = [
    { year: "1994", title: "Founded",        desc: "Opened with 80 students and a bold belief that education could look completely different."   },
    { year: "2003", title: "IB Accredited",  desc: "First school in the region to offer the full IB Diploma Programme."                          },
    { year: "2011", title: "STEM Wing",      desc: "₦2 billion innovation campus opens — 12 labs, maker space and a Mars Habitat simulator."     },
    { year: "2018", title: "Global Network", desc: "Joined the Round Square international consortium, connecting us to 200+ schools worldwide."   },
    { year: "2024", title: "AI Initiative",  desc: "Launched an ethical AI curriculum across all grades — the first of its kind in West Africa." },
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-16">
          <SectionLabel label="Our Story" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              Our <em className="not-italic text-blue-700">journey.</em>
            </h2>
          </FadeUp>
        </div>

        <div className="relative">
          <DrawLine className="absolute left-6 md:left-1/2 top-0 h-full w-px bg-blue-200 md:-translate-x-px origin-top" delay={0.1} />

          {events.map((event, i) => (
            <FadeFrom key={event.year} dir={i % 2 === 0 ? "left" : "right"} delay={i * 0.07}
              className={`relative mb-10 pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
              <motion.div
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, amount: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-blue-700 border-4 border-zinc-50 z-10" />

              <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                <div className="rounded-2xl bg-white border border-blue-100 p-6 hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300">
                  <span className="inline-block text-[10px] uppercase tracking-widest text-blue-700 font-semibold bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-3">
                    {event.year}
                  </span>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            </FadeFrom>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CAMPUS HIGHLIGHTS — stagger stats + feature cards
══════════════════════════════════════════════ */
function CampusHighlights() {
  const highlights = [
    { value: "52",   label: "Acres",             sub: "Landscaped campus grounds"     },
    { value: "12",   label: "STEM Labs",          sub: "Robotics, AI & biotech pods"   },
    { value: "3",    label: "Sports Complexes",   sub: "Olympic pool, tracks & courts" },
    { value: "8",    label: "Performance Stages", sub: "Theater, recital & film"       },
    { value: "85k+", label: "Library Volumes",    sub: "Digital & physical collection" },
    { value: "400+", label: "Boarding Rooms",     sub: "Safe, modern residences"       },
  ];
  const features = [
    { title: "Innovation Hub",      desc: "A dedicated maker space with 3D printers, laser cutters, and a Mars Habitat simulator used by students from Grade 7 upward." },
    { title: "Sports Academy",      desc: "Olympic-standard swimming pool, six tennis courts, two football pitches, and a fully equipped indoor gymnasium." },
    { title: "Arts Centre",         desc: "Professional recording studio, black-box theater, film editing suite, and dedicated gallery space for visual arts." },
    { title: "Boarding Residences", desc: "Safe, modern dormitories with dedicated house parents, common rooms, study halls, and 24-hour security." },
  ];

  return (
    <section className="py-24 bg-blue-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <SectionLabel label="Our Campus" light={true} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              A space built for<br /><em className="not-italic text-blue-400">curious minds.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-base text-blue-200/55 max-w-xl mx-auto leading-relaxed">
              Over 52 acres of world-class facilities designed to inspire learning, creativity,
              sport and community — every single day.
            </p>
          </FadeUp>
        </div>

        <StaggerList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14" stagger={0.07}>
          {highlights.map((h) => (
            <motion.div key={h.label} variants={staggerItem}
              className="rounded-2xl bg-blue-900/40 border border-blue-700/60 p-5 text-center hover:border-blue-700/60 transition-colors">
              <div className="font-display text-3xl font-bold text-white leading-none mb-1">{h.value}</div>
              <div className="text-sm font-semibold text-blue-300 mb-1">{h.label}</div>
              <div className="text-xs text-blue-400/50 leading-snug">{h.sub}</div>
            </motion.div>
          ))}
        </StaggerList>

        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10" stagger={0.08}>
          {features.map((f) => (
            <motion.div key={f.title} variants={staggerItem}
              className="rounded-2xl bg-blue-900/30 border border-blue-700/60 p-6 hover:border-blue-700/60 hover:-translate-y-0.5 transition-all duration-300">
              <DrawLine className="h-1 w-8 bg-blue-500 rounded-full mb-4" />
              <h3 className="font-display font-bold text-lg text-white mb-2">{f.title}</h3>
              <p className="text-sm text-blue-200/55 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </StaggerList>

        <FadeUp className="text-center">
          <a href="/about/campus"
            className="inline-flex items-center gap-2 rounded-xl border border-blue-600/50 text-blue-300 hover:bg-blue-800/50 hover:text-white px-6 py-3 text-sm font-semibold transition-all">
            Explore Full Campus Tour <ArrowRight className="h-4 w-4" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   AWARDS & ACCREDITATIONS — scale-in badges + slide stats
══════════════════════════════════════════════ */
function Accreditations() {
  const badges = [
    "IB World School", "Cambridge Assessment", "Round Square",
    "CIS Accredited", "WASC", "EARCOS",
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-14">
          <SectionLabel label="Recognition" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              Awards &amp; <em className="not-italic text-blue-700">accreditations.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="flex flex-wrap justify-center gap-3 mb-10" stagger={0.06}>
          {badges.map((badge) => (
            <motion.div key={badge} variants={{
              hidden:  { opacity: 0, scale: 0.85 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
              className="flex items-center gap-2 rounded-2xl bg-white border border-blue-100 px-6 py-4 hover:border-blue-300 hover:-translate-y-0.5 transition-all">
              <Award className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-sm text-gray-800">{badge}</span>
            </motion.div>
          ))}
        </StaggerList>

        <FadeUp>
          <div className="inline-flex items-center gap-3 rounded-2xl bg-blue-700 text-white px-7 py-4">
            <Trophy className="h-5 w-5 text-blue-200 flex-shrink-0" />
            <span className="text-sm font-semibold">Top 10 International Schools — Global Education Review 2024</span>
          </div>
        </FadeUp>

        <div className="mt-14 relative rounded-3xl overflow-hidden">
          <img src={IMGS.awards} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" loading="lazy" />
          <StaggerList className="relative grid sm:grid-cols-3 gap-5 p-2" stagger={0.1}>
            {[
              { value: "30+", label: "Years of Excellence",   sub: "Est. 1994"                },
              { value: "42",  label: "Nations Represented",   sub: "In our student community" },
              { value: "98%", label: "University Acceptance", sub: "Ivy & Russell Group"      },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}
                className="rounded-2xl bg-white border border-blue-100 p-7 text-center hover:border-blue-200 transition-colors relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-transparent" />
                <div className="font-display text-5xl font-bold text-blue-700 leading-none mb-2">{stat.value}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.sub}</div>
              </motion.div>
            ))}
          </StaggerList>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CTA BANNER — scale up reveal
══════════════════════════════════════════════ */
function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px 0px', amount: 0.15 });

  return (
    <section className="py-24 bg-blue-800">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: 0.94, y: 32 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-blue-700 border border-blue-600/50 p-12 md:p-16 overflow-hidden text-center">
          <img src={IMGS.campus} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" />
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
          <div className="relative">
            <FadeUp delay={0.05}>
              <div className="h-14 w-14 rounded-2xl bg-blue-600/60 border border-blue-500/40 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to be part of<br /><em className="not-italic text-blue-200">our story?</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-base text-blue-200/70 max-w-xl mx-auto leading-relaxed mb-10">
                Applications for the 2025–2026 academic year are now open. Join a community
                of curious minds from 42 nations.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/admissions/apply"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-7 py-3.5 text-sm font-bold transition-colors">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/admissions/tour"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 text-white hover:bg-blue-600/50 px-7 py-3.5 text-sm font-semibold transition-colors">
                  Book a Campus Tour
                </a>
              </div>
            </FadeUp>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════ */
function AboutPage() {
  return (
    <Layout>
      <PageHero />
      <VisionMission />
      <CoreValues />
      <Timeline />
      <CampusHighlights />
      <Accreditations />
      <CTABanner />
    </Layout>
  );
}