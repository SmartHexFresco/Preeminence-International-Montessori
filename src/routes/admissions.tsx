

import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Layout } from "@/components/site/Layout";
import { Check, Download, ChevronDown, FileText, ArrowRight, GraduationCap, Star } from "lucide-react";
import {
  motion, useScroll, useTransform, useSpring, useInView, AnimatePresence
} from "framer-motion";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Rochas Foundation College" },
      { name: "description", content: "Apply to Rochas Foundation. Step-by-step admissions, fees, scholarships and FAQ." },
      { property: "og:title", content: "Admissions at Rochas Foundation" },
      { property: "og:description", content: "Apply to Rochas Foundation. Step-by-step admissions, fees, scholarships." },
    ],
  }),
  component: AdmissionsPage,
});

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

function StaggerList({ children, className = "", stagger = 0.07 }) {
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

function SectionLabel({ label, light = true }) {
  return (
    <FadeFrom dir="left" className="flex items-center gap-3 mb-4">
      <DrawLine className={`h-px w-8 ${light ? "bg-blue-700" : "bg-blue-600"}`} />
      <p className={`text-[10px] uppercase tracking-widest font-semibold ${light ? "text-blue-400" : "text-blue-700"}`}>
        {label}
      </p>
    </FadeFrom>
  );
}

/* ══════════════════════════════════════════════════
   PAGE HERO — parallax bg
══════════════════════════════════════════════════ */
const HERO_IMG = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80";

function PageHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const yBg      = useTransform(smooth, [0, 1], [0, 160]);
  const scaleBg  = useTransform(smooth, [0, 1], [1.06, 1]);
  const yContent = useTransform(smooth, [0, 1], [0, -40]);
  const opacity  = useTransform(smooth, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-24 min-h-[500px] flex items-center bg-blue-700">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 origin-center">
        <img src={HERO_IMG} alt="Admissions" className="absolute inset-0 h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/95 via-blue-700/85 to-blue-700/70" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <motion.div style={{ y: yContent, opacity }}
        className="relative mx-auto max-w-7xl px-6 text-center w-full pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-700/60 bg-blue-700/60 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-blue-300/80">Admissions</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
          Begin your<br />
          <em className="not-italic text-blue-400">Rochas Foundation story.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-blue-200/60 max-w-2xl mx-auto leading-relaxed">
          A simple six-step journey to one of the world's most exciting classrooms.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   STEPS
══════════════════════════════════════════════════ */
function Steps() {
  const steps = [
    { t: "Inquire",  d: "Submit your interest form online.",                         num: "01" },
    { t: "Visit",    d: "Tour campus or take a virtual walkthrough.",                 num: "02" },
    { t: "Apply",    d: "Complete the online application and supporting documents.",  num: "03" },
    { t: "Assess",   d: "Entrance assessment and student interview.",                 num: "04" },
    { t: "Offer",    d: "Decision letters sent within 2 weeks.",                      num: "05" },
    { t: "Enroll",   d: "Confirm your place and welcome aboard.",                     num: "06" },
  ];

  return (
    <section className="py-24 bg-blue-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="The Process" light={true} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Six steps to <em className="not-italic text-blue-400">joining us.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s) => (
            <motion.div key={s.t} variants={staggerItem}
              className="relative rounded-2xl bg-blue-600/60 border border-blue-700/60 p-6 hover:-translate-y-1 hover:border-blue-600/50 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-4 right-4 font-display font-bold text-5xl text-blue-600/60 select-none group-hover:text-blue-600/60 transition-colors">
                {s.num}
              </div>
              <div className="h-8 w-8 rounded-lg bg-blue-700/60 border border-blue-600/40 flex items-center justify-center mb-4">
                <span className="text-xs font-bold text-blue-300">{s.num}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">{s.t}</h3>
              <p className="text-sm text-blue-200/55 leading-relaxed">{s.d}</p>
              <DrawLine className="h-px w-0 group-hover:w-full bg-blue-500/40 mt-4 transition-all duration-500" />
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FEES
══════════════════════════════════════════════════ */
function Fees() {
  const fees = [
    { g: "Grades 6–8",            a: "$24,500", e: "$1,800" },
    { g: "Grades 9–10 (IGCSE)",   a: "$28,500", e: "$2,200" },
    { g: "Grades 11–12 (IB / AP)",a: "$32,000", e: "$2,500" },
  ];

  return (
    <section className="py-24 bg-slate-600">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Tuition & Fees" light={true} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Transparent <em className="not-italic text-blue-400">pricing.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="text-blue-200/50 mt-3">2025–2026 academic year</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.05}>
          <div className="rounded-2xl bg-blue-700/60 border border-blue-600/60 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-blue-600/60 border-b border-blue-700/40">
              {["Grade Level", "Annual Tuition", "Enrollment Fee"].map((h) => (
                <div key={h} className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/70">{h}</div>
              ))}
            </div>
            {/* Rows */}
            <StaggerList stagger={0.1}>
              {fees.map((f) => (
                <motion.div key={f.g} variants={staggerItem}
                  className="grid grid-cols-3 gap-4 px-6 py-5 border-b border-blue-600/30 last:border-0 hover:bg-blue-600/60 transition-colors items-center">
                  <div className="font-semibold text-white text-sm">{f.g}</div>
                  <div className="font-display font-bold text-2xl text-blue-300">{f.a}</div>
                  <div className="text-blue-200/50 text-sm">{f.e}</div>
                </motion.div>
              ))}
            </StaggerList>
          </div>
        </FadeUp>

        {/* Scholarship banner */}
        <FadeUp delay={0.1} className="mt-6">
          <div className="relative rounded-2xl bg-blue-700 border border-blue-600/50 p-6 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                <div className="font-display font-bold text-xl text-white">Rochas Foundation Scholars Program</div>
              </div>
              <div className="text-sm text-blue-200/70">Up to 75% tuition coverage for exceptional students.</div>
            </div>
            <button className="relative rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 text-sm font-bold transition-colors whitespace-nowrap flex-shrink-0">
              Apply for Scholarship <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "When does the application window open?",          a: "Applications open every September for the following academic year. Rolling admissions thereafter, subject to availability." },
    { q: "Do you offer scholarships?",                      a: "Yes. Merit-based scholarships cover up to 75% of tuition. Need-based financial aid is also available for qualifying families." },
    { q: "Is boarding offered?",                            a: "Yes — weekly and full boarding are available for students in Grades 9–12, with dedicated house parents and 24-hour security." },
    { q: "What languages of instruction are available?",    a: "English-medium with Spanish, Mandarin, French and Arabic available as second-language pathways." },
    { q: "Can international students apply?",               a: "Absolutely. We represent 42+ nationalities and have dedicated support for visa applications and international transitions." },
  ];

  return (
    <section className="py-24 bg-blue-700">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="FAQ" light={true} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Frequently <em className="not-italic text-blue-400">asked.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="space-y-3" stagger={0.07}>
          {faqs.map((f, i) => (
            <motion.div key={f.q} variants={staggerItem}
              className="rounded-2xl bg-blue-900/40 border border-blue-800/40 overflow-hidden hover:border-blue-700/60 transition-colors">
              <button onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4">
                <span className="font-semibold text-white text-sm leading-snug">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 ${open === i ? "text-blue-400" : "text-blue-600"}`} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden">
                    <div className="px-6 pb-5 text-sm text-blue-200/60 leading-relaxed border-t border-blue-800/40 pt-4">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   INQUIRY + DOWNLOADS
══════════════════════════════════════════════════ */
function InquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const downloads = [
    "Application Form 2025",
    "Financial Aid Application",
    "Medical Records Form",
    "Transfer Records Request",
  ];

  return (
    <section className="py-24 bg-slate-700">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Get Started" light={true} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Take the first <em className="not-italic text-blue-400">step.</em>
            </h2>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Inquiry form */}
          <FadeFrom dir="left">
            <div className="rounded-2xl bg-blue-600/60 border border-blue-600/60 p-7 h-full">
              <h3 className="font-display font-bold text-xl text-white mb-5">Inquiry form</h3>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-48 gap-3 text-center">
                  <div className="h-14 w-14 rounded-full bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center">
                    <Check className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="font-semibold text-white">Inquiry submitted!</p>
                  <p className="text-sm text-blue-200/50">Our admissions team will reach out within 2 business days.</p>
                </motion.div>
              ) : (
                <div className="grid gap-3">
                  <input
                    className="rounded-xl bg-blue-950/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition w-full"
                    placeholder="Parent / guardian name" />
                  <input type="email"
                    className="rounded-xl bg-blue-950/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition w-full"
                    placeholder="Email address" />
                  <input
                    className="rounded-xl bg-blue-950/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition w-full"
                    placeholder="Grade applying for" />
                  <textarea rows={3}
                    className="rounded-xl bg-blue-950/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition w-full resize-none"
                    placeholder="Tell us a little about your child…" />
                  <button onClick={() => setSubmitted(true)}
                    className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    Submit Inquiry <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </FadeFrom>

          {/* Downloads */}
          <FadeFrom dir="right">
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl bg-blue-900/40 border border-blue-800/40 p-7">
                <h3 className="font-display font-bold text-xl text-white mb-5">Downloadable forms</h3>
                <StaggerList className="space-y-3" stagger={0.07}>
                  {downloads.map((f) => (
                    <motion.a key={f} href="#" variants={staggerItem}
                      className="rounded-xl bg-blue-950/50 border border-blue-800/40 p-4 flex items-center gap-3 hover:border-blue-600/50 hover:bg-blue-900/50 transition-all duration-200 group">
                      <div className="h-10 w-10 rounded-lg bg-blue-700/60 border border-blue-600/40 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-blue-300" />
                      </div>
                      <div className="flex-1 font-medium text-sm text-white">{f}</div>
                      <Download className="h-4 w-4 text-blue-600 group-hover:text-blue-400 transition-colors" />
                    </motion.a>
                  ))}
                </StaggerList>
              </div>

              {/* Rolling admissions notice */}
              <FadeUp delay={0.1}>
                <div className="rounded-2xl bg-emerald-900/30 border border-emerald-700/40 p-5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-800/60 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-emerald-300 leading-snug">
                    Rolling admissions for Grades 6, 7 and 9 still open.
                  </span>
                </div>
              </FadeUp>
            </div>
          </FadeFrom>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CTA BANNER
══════════════════════════════════════════════════ */
function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px 0px", amount: 0.15 });
  return (
    <section className="py-24 bg-blue-950">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl bg-blue-800 border border-blue-700/50 p-12 md:p-16 overflow-hidden text-center">
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"
            alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" />
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
          <div className="relative">
            <FadeUp>
              <div className="h-14 w-14 rounded-2xl bg-blue-700/60 border border-blue-600/40 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to apply?<br />
                <em className="not-italic text-blue-300">We're ready for you.</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base text-blue-200/70 max-w-xl mx-auto leading-relaxed mb-10">
                Applications for the 2025–2026 academic year are now open. Join a community of curious minds from 42 nations.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/admissions/apply"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-7 py-3.5 text-sm font-bold transition-colors">
                  Start Application <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/admissions/tour"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 text-white hover:bg-blue-700/50 px-7 py-3.5 text-sm font-semibold transition-colors">
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

/* ══════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════ */
function AdmissionsPage() {
  return (
    <Layout>
      <PageHero />
      <Steps />
      <Fees />
      <FAQ />
      <InquirySection />
      <CTABanner />
    </Layout>
  );
}