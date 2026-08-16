import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import {
  Award, Heart, Lightbulb, Globe2, Users, Target,
  Trophy, ArrowRight, CheckCircle2, GraduationCap, 
  School, MapPin, BookOpen, Sparkles, Building2,
  Users2, Calendar, AwardIcon, Eye
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us · Preeminence International Montessori" },
      { name: "description", content: "Our vision, mission and accreditations." },
      { property: "og:title", content: "About Preeminence International Montessori" },
      { property: "og:description", content: "Our vision, mission and accreditations." },
    ],
  }),
  component: AboutPage,
});

/* ─── IMAGES ─── */
const IMGS = {
  campus:     "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
  principal:  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80",
  hero:       "/images/optimized/classroom-1-hero.webp",
  curiosity:  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80",
  empathy:    "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=700&q=80",
  global:     "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=700&q=80",
  excellence: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=700&q=80",
  awards:     "https://images.unsplash.com/photo-1546519638405-a2c39b0a0a4b?w=1200&q=80",
  nigerian:   "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
  students:   "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&q=80",
};

/* ══════════════════════════════════════════════════
   SHARED SCROLL ANIMATION PRIMITIVES
══════════════════════════════════════════════════ */

// Type definitions for animation components
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface FadeFromProps {
  children: React.ReactNode;
  dir?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
}

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

interface DrawLineProps {
  className?: string;
  delay?: number;
}

interface SectionLabelProps {
  label: string;
  light?: boolean;
}

function FadeUp({ children, delay = 0, className = "" }: FadeUpProps) {
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

function FadeFrom({ children, dir = "left", delay = 0, className = "" }: FadeFromProps) {
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

function StaggerList({ children, className = "", stagger = 0.07 }: StaggerListProps) {
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

function DrawLine({ className = "", delay = 0 }: DrawLineProps) {
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

function SectionLabel({ label, light = false }: SectionLabelProps) {
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
  const yBg      = useTransform(smoothProgress, [0, 1], [0, 60]);
  const scaleBg  = useTransform(smoothProgress, [0, 1], [1.03, 1]);
  const yContent = useTransform(smoothProgress, [0, 1], [0, -14]);
  const opacity  = useTransform(smoothProgress, [0, 1], [1, 0.25]);

  return (
    <section ref={ref} className="relative -z-10 overflow-hidden pb-24 min-h-[500px] flex items-center bg-white">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 origin-center">
        <img src={IMGS.hero} alt="Preeminence International Montessori students" className="absolute inset-0 h-full w-full object-cover opacity-85" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />

      <motion.div style={{ y: yContent, opacity }}
        className="relative mx-auto max-w-7xl px-6 text-center w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-blue-700">About Us</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-blue-900 leading-[1.05] mb-6">
          Where Every Child's<br />
          <em className="not-italic text-[#C21E1E]">Brilliance Blooms</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A warm, inspiring place where curious young minds are guided to discover their full
          potential — through joy, discovery, and a love of learning.
        </motion.p>
      </motion.div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   VISION & MISSION
══════════════════════════════════════════════ */
function VisionMission() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={sectionRef} className="py-24 bg-warm-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionLabel label="Vision & Mission" light={false} />
          <FadeUp delay={0.05}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">Our Guiding</h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-700 italic leading-tight mb-6">Principles.</h2>
          </FadeUp>
          <FadeUp delay={0.18}>
            <DrawLine className="h-px w-12 bg-blue-600 mb-6" delay={0.3} />
            
            <div className="mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" /> Vision
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed pl-7">
                To nurture every child's natural curiosity into lifelong confidence, creativity
                and character — so each learner grows into the fullest version of themselves.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" /> Mission
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed pl-7">
                To deliver a joyful, child-centred Montessori education where every learner is
                guided, not pushed, toward their own excellence — mind, heart, and hands together.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Small class sizes and personalised learning journeys",
                "The authentic Montessori method, child-centred and hands-on",
                "Strong academics, arts, sports and character development",
                "A safe, nurturing and joyful campus community",
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
              Join Our Mission <ArrowRight className="h-4 w-4" />
            </a>
          </FadeUp>
        </div>

        <FadeFrom dir="right" className="relative">
          <div className="absolute top-5 left-5 right-[-18px] bottom-[-18px] rounded-3xl border border-blue-200 pointer-events-none" />
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <motion.img
              src={IMGS.campus}
              alt="Preeminence campus"
              style={{ y: imgY }}
              className="h-[116%] w-full object-cover absolute inset-0 -top-[8%]"
              loading="lazy"
            />
          </div>
        </FadeFrom>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ACADEMIC EXCELLENCE — curriculum & achievements
══════════════════════════════════════════════ */
function AcademicExcellence() {
  const subjects = [
    "English", "Mathematics", "Reading", "Writing", "Science & Nature",
    "Creative Arts", "Music", "Physical Education", "Social Studies",
    "Religious Studies", "Civic Education", "ICT for Kids", "French", "Yoruba"
  ];

  const achievements = [
    "Annual reading week & science fairs",
    "Outstanding results in academic competitions",
    "Victories in sports and inter-school games",
    "Recognition for good character and leadership",
  ];

  return (
    <section className="py-24 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <FadeFrom dir="left">
            <SectionLabel label="Academics" light={false} />
            <FadeUp delay={0.05}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Excellence in <em className="not-italic text-[#C21E1E]">Education</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Our school operates the Nigerian primary curriculum alongside the Montessori method,
                with a child-centred programme in English, Mathematics, Science, Creative Arts, Music
                and more. We also nurture non-academic skills in sports, music, communication, crafts
                and everyday confidence.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {subjects.map((subject) => (
                  <span key={subject}
                    className="text-xs bg-warm-white border border-blue-100 rounded-full px-3 py-1 text-gray-600">
                    {subject}
                  </span>
                ))}
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-200 p-5 mb-6">
                <h4 className="font-semibold text-blue-700 text-sm mb-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Rewarding Excellence
                </h4>
                <p className="text-sm text-gray-600">
                  We celebrate hard work with termly prize-giving ceremonies, special certificates,
                  medals and fun treats — so every child feels proud of their effort, their character
                  and their own small victories.
                </p>
              </div>
            </FadeUp>
          </FadeFrom>

          <FadeFrom dir="right">
            <div className="space-y-4">
              <div className="rounded-2xl bg-warm-white border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Holistic Development</h4>
                    <p className="text-xs text-gray-400">Beyond the classroom</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {achievements.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-warm-white border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-green-600/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Student Support</h4>
                    <p className="text-xs text-gray-400">Full care package</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    Free tuition, books, and uniforms
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    After-school care & clubs
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    Comprehensive Medicare
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    Nutritious feeding program
                  </li>
                </ul>
              </div>
            </div>
          </FadeFrom>
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
    { icon: Lightbulb, title: "Curiosity",      desc: "We chase questions, not just answers. Inquiry is the engine of everything we do.",           accent: "text-blue-600",   iconBg: "bg-blue-100",   border: "border-blue-200",   img: IMGS.curiosity  },
    { icon: Heart,     title: "Empathy",        desc: "Leaders who listen before they lead. We build communities through understanding.",             accent: "text-purple-600", iconBg: "bg-purple-100", border: "border-purple-200", img: IMGS.empathy    },
    { icon: Globe2,    title: "Global Mindset", desc: "Citizens of every place. We prepare students for a world without borders.",                   accent: "text-sky-600",    iconBg: "bg-sky-100",    border: "border-sky-200",    img: IMGS.global     },
    { icon: Target,    title: "Excellence",     desc: "Mastery as a daily practice — not a destination, but a direction we commit to every morning.", accent: "text-indigo-600", iconBg: "bg-indigo-100", border: "border-indigo-200", img: IMGS.excellence },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="What We Stand For" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-900">
              Our Core <em className="not-italic text-[#C21E1E]">Values.</em>
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
                className={`group rounded-2xl overflow-hidden border ${v.border} hover:-translate-y-1 transition-all duration-300 bg-warm-white hover:shadow-md`}>
                <div className="aspect-[16/9] overflow-hidden relative">
                  {/* Image - removed the gradient overlay */}
                  <img 
                    src={v.img} 
                    alt={v.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" 
                    loading="lazy" 
                  />
                  {/* Icon badge - moved to bottom with subtle background */}
                  <div className={`absolute bottom-4 left-4 h-10 w-10 rounded-xl ${v.iconBg} flex items-center justify-center border border-blue-100/60`}>
                    <Icon className={`h-5 w-5 ${v.accent}`} />
                  </div>
                </div>
                <div className="bg-white p-5">
                  <h3 className="font-display font-bold text-xl text-blue-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
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
   AWARDS & ACCREDITATIONS — scale-in badges + slide stats
══════════════════════════════════════════════ */
function Accreditations() {
  const badges = [
    "Montessori Method", "Nigerian Primary Curriculum", "ISO 21001",
    "Safe & Caring School", "Trained Montessori Guides", "Excellence in Education",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-14">
          <SectionLabel label="Recognition" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              Awards &amp; <em className="not-italic text-[#C21E1E]">Accreditations.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="flex flex-wrap justify-center gap-3 mb-10" stagger={0.06}>
          {badges.map((badge) => (
            <motion.div key={badge} variants={{
              hidden:  { opacity: 0, scale: 0.85 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
              className="flex items-center gap-2 rounded-2xl bg-warm-white border border-blue-100 px-6 py-4 hover:border-blue-300 hover:-translate-y-0.5 transition-all">
              <AwardIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-sm text-gray-800">{badge}</span>
            </motion.div>
          ))}
        </StaggerList>
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
    <section className="py-24 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: 0.94, y: 32 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-blue-50 border border-blue-200 p-12 md:p-16 overflow-hidden text-center">
          <img src={IMGS.campus} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
          <div className="relative">
            <FadeUp delay={0.05}>
              <div className="h-14 w-14 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-7 w-7 text-blue-600" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                Join the <em className="not-italic text-[#C21E1E]">Preeminence Family</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-10">
                Be part of a legacy that's transforming lives through education. 
                Applications for the 2025–2026 academic year are now open.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/admissions/apply"
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-7 py-3.5 text-sm font-bold transition-colors">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/admissions/tour"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-300 text-blue-700 hover:bg-blue-100 px-7 py-3.5 text-sm font-semibold transition-colors">
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
      <AcademicExcellence />
      <CoreValues />
      <Accreditations />
      <CTABanner />
    </Layout>
  );
}
