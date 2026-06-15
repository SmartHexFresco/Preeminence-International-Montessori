import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Layout } from "@/components/site/Layout";
import {
  MapPin, Phone, Mail, MessageCircle, Building2, ChevronDown, ArrowRight, CheckCircle2,
} from "lucide-react";
import {
  motion, useScroll, useTransform, useSpring, useInView, AnimatePresence,
} from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rochas Foundation College" },
      { name: "description", content: "Get in touch with admissions, faculty or campus services. We respond within 24 hours." },
      { property: "og:title", content: "Contact Rochas Foundation" },
      { property: "og:description", content: "Get in touch with admissions, faculty or campus services." },
    ],
  }),
  component: ContactPage,
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
    <section ref={ref} className="relative overflow-hidden pb-24 min-h-[500px] flex items-center bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 origin-center">
        <img src={HERO_IMG} alt="Contact" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-blue-900/60" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <motion.div style={{ y: yContent, opacity }}
        className="relative mx-auto max-w-7xl px-6 text-center w-full pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-800/50 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-blue-200/80">Contact</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
          Let's start a<br />
          <em className="not-italic text-blue-300">conversation.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-blue-200/70 max-w-2xl mx-auto leading-relaxed">
          Whether you're applying, partnering or just curious — we'd love to hear from you.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT FORM + MAP - Blue Section
══════════════════════════════════════════════════ */
function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-8">

        {/* Form */}
        <FadeFrom dir="left">
          <div className="rounded-2xl bg-blue-800/40 border border-blue-700/40 backdrop-blur-sm p-8 h-full">
            <h3 className="font-display font-bold text-2xl text-white mb-6">Send us a message</h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-64 gap-3 text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-800/40 border border-emerald-600/40 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                </div>
                <p className="font-semibold text-white text-lg">Message sent!</p>
                <p className="text-sm text-blue-200/60 max-w-xs">Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}
                  className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input placeholder="First name"
                    className="rounded-xl bg-blue-900/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition w-full" />
                  <input placeholder="Last name"
                    className="rounded-xl bg-blue-900/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition w-full" />
                </div>
                <input type="email" placeholder="Email address"
                  className="rounded-xl bg-blue-900/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition w-full" />
                <select className="rounded-xl bg-blue-900/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-300/70 outline-none focus:border-blue-500/60 transition w-full">
                  <option>Department · Admissions</option>
                  <option>Academics</option>
                  <option>Finance</option>
                  <option>Boarding</option>
                </select>
                <textarea rows={5} placeholder="How can we help?"
                  className="rounded-xl bg-blue-900/60 border border-blue-700/40 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition w-full resize-none" />
                <button onClick={() => setSent(true)}
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  Send Message <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </FadeFrom>

        {/* Map + info cards */}
        <FadeFrom dir="right">
          <div className="flex flex-col gap-4 h-full">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-blue-700/40 flex-1 min-h-[240px]">
              <iframe
                title="Campus Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=7.43%2C9.03%2C7.53%2C9.10&layer=mapnik"
                className="w-full h-full min-h-[240px]"
                loading="lazy"
              />
            </div>

            {/* Info cards */}
            <StaggerList className="grid sm:grid-cols-2 gap-3" stagger={0.08}>
              {[
                { icon: MapPin,        title: "Visit",     val: "88 Horizon Avenue, Abuja",  accent: "text-blue-300",   bg: "bg-blue-800/60"   },
                { icon: Phone,         title: "Call",      val: "+234 xxxxxxxxx",            accent: "text-sky-300",    bg: "bg-sky-800/50"    },
                { icon: Mail,          title: "Email",     val: "hello@rochasfoundation.edu",accent: "text-indigo-300", bg: "bg-indigo-800/50" },
                { icon: MessageCircle, title: "Live Chat", val: "Avg reply: 2 min",          accent: "text-emerald-300",bg: "bg-emerald-800/50"},
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={staggerItem}
                    className="rounded-xl bg-blue-800/40 border border-blue-700/40 p-4 flex items-start gap-3 hover:border-blue-600/60 transition-colors group">
                    <div className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${item.accent}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">{item.title}</div>
                      <div className={`text-xs mt-0.5 ${item.accent === "text-emerald-300" ? "text-emerald-300/80" : "text-blue-200/60"}`}>
                        {item.val}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </StaggerList>
          </div>
        </FadeFrom>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   DEPARTMENT CONTACTS - White Section
══════════════════════════════════════════════════ */
function Departments() {
  const depts = [
    { t: "Admissions", e: "admissions@rochasfoundation.edu", p: "+234 xxxxxxxxx", accent: "text-blue-600",   iconBg: "bg-blue-100",   border: "border-blue-200"   },
    { t: "Academics",  e: "academics@rochasfoundation.edu",  p: "+234 xxxxxxxxx", accent: "text-sky-600",    iconBg: "bg-sky-100",    border: "border-sky-200"    },
    { t: "Finance",    e: "finance@rochasfoundation.edu",    p: "+234 xxxxxxxxx", accent: "text-indigo-600", iconBg: "bg-indigo-100", border: "border-indigo-200" },
    { t: "Boarding",   e: "boarding@rochasfoundation.edu",   p: "+234 xxxxxxxxx", accent: "text-cyan-600",   iconBg: "bg-cyan-100",   border: "border-cyan-200"   },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Department Contacts" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
              Reach the right <em className="not-italic text-blue-600">team.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {depts.map((d) => (
            <motion.a key={d.t} href={`/${d.t.toLowerCase()}`} variants={staggerItem}
              className={`group rounded-2xl bg-white border ${d.border} p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 block`}>
              <div className={`h-11 w-11 rounded-xl ${d.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition`}>
                <Building2 className={`h-5 w-5 ${d.accent}`} />
              </div>
              <div className="font-display font-bold text-slate-800 text-lg mb-2">{d.t}</div>
              <div className={`text-xs break-words mb-1 ${d.accent}`}>{d.e}</div>
              <div className="text-xs text-slate-400">{d.p}</div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                Contact <ArrowRight className="h-3 w-3" />
              </div>
            </motion.a>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FAQ - Blue Section
══════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "What's the fastest way to book a campus tour?",  a: "Use the inquiry form above or email admissions directly. Tours run Tuesday–Thursday at 10am and 2pm." },
    { q: "Do you offer evening drop-in sessions?",         a: "Yes — the first Wednesday of each month from 5–7pm. RSVP via the events page." },
    { q: "Can I email a specific teacher?",                a: "Yes. Use the staff directory in the parent portal, or call our switchboard and we'll connect you." },
    { q: "How quickly do you respond to enquiries?",       a: "We aim to respond to all enquiries within 24 hours on weekdays. Urgent matters can be handled via Live Chat." },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="FAQ" light={true} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Quick <em className="not-italic text-blue-300">answers.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="space-y-3" stagger={0.07}>
          {faqs.map((f, i) => (
            <motion.div key={f.q} variants={staggerItem}
              className="rounded-2xl bg-blue-800/40 border border-blue-700/40 overflow-hidden hover:border-blue-600/60 transition-colors">
              <button onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4">
                <span className="font-semibold text-white text-sm leading-snug">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 ${open === i ? "text-blue-400" : "text-blue-500"}`} />
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
                    <div className="px-6 pb-5 text-sm text-blue-200/70 leading-relaxed border-t border-blue-700/40 pt-4">
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
   CTA BANNER - Blue Gradient
══════════════════════════════════════════════════ */
function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px 0px", amount: 0.15 });

  return (
    <section className="py-24 bg-gradient-to-b from-blue-800 to-blue-900">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl bg-blue-700/50 border border-blue-500/30 backdrop-blur-sm p-12 md:p-16 overflow-hidden text-center">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"
            alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
          <div className="relative">
            <FadeUp>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to visit us<br />
                <em className="not-italic text-blue-300">in person?</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base text-blue-200/70 max-w-xl mx-auto leading-relaxed mb-10">
                Nothing beats seeing the campus for yourself. Book a personal tour and meet our team face to face.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/admissions/tour"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-7 py-3.5 text-sm font-bold transition-colors shadow-lg">
                  Book a Campus Tour <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/admissions"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 text-white hover:bg-blue-700/50 px-7 py-3.5 text-sm font-semibold transition-colors">
                  View Admissions
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
function ContactPage() {
  return (
    <Layout>
      <PageHero />
      <ContactForm />
      <Departments />
      <FAQ />
      <CTABanner />
    </Layout>
  );
}