import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Layout } from "@/components/site/Layout";
import {
  MapPin, Mail, MessageCircle, Phone, Building2, ChevronDown, ArrowRight, CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import {
  motion, useScroll, useTransform, useSpring, useInView, AnimatePresence,
} from "framer-motion";
import {
  WHATSAPP_NUMBER, whatsappLink, getLocation, locationLink,
  type GeoCoords,
} from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Preeminence International Montessori" },
      { name: "description", content: "Get in touch with admissions, our guides or campus services. We respond within 24 hours." },
      { property: "og:title", content: "Contact Preeminence" },
      { property: "og:description", content: "Get in touch with admissions, our guides or campus services." },
    ],
  }),
  component: ContactPage,
});

const SCHOOL_ADDRESS =
  "39 Obodoko Layout, Amankpaka, Ugwuogo Nike, Enugu";
const mapsSearchLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

type InfoCard = {
  icon: LucideIcon;
  title: string;
  accent: string;
  bg: string;
  val?: string;
  href?: string;
  numbers?: { label: string; href: string }[];
};

const CONTACT_CARDS: InfoCard[] = [
  {
    icon: MapPin,
    title: "Visit",
    val: SCHOOL_ADDRESS,
    href: mapsSearchLink(SCHOOL_ADDRESS),
    accent: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    val: WHATSAPP_NUMBER,
    href: whatsappLink("Hello! I'd like to know more about Preeminence International Montessori."),
    accent: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: Phone,
    title: "Call Us",
    numbers: [
      { label: "0803 794 4661", href: "tel:+2348037944661" },
      { label: "0806 901 4998", href: "tel:+2348069014998" },
    ],
    accent: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    icon: Mail,
    title: "Email",
    val: "hello@preeminence.edu",
    href: "mailto:hello@preeminence.edu",
    accent: "text-indigo-600",
    bg: "bg-indigo-100",
  },
];

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
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
const HERO_IMG = "/images/optimized/classroom-1.webp";

function PageHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const yBg      = useTransform(smooth, [0, 1], [0, 60]);
  const scaleBg  = useTransform(smooth, [0, 1], [1.03, 1]);
  const yContent = useTransform(smooth, [0, 1], [0, -14]);
  const opacity  = useTransform(smooth, [0, 1], [1, 0.25]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-24 min-h-[500px] flex items-center bg-white">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 origin-center">
        <img src={HERO_IMG} alt="Contact" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 to-transparent" />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <motion.div style={{ y: yContent, opacity }}
        className="relative mx-auto max-w-7xl px-6 text-center w-full pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-blue-700">Contact</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-blue-900 leading-[1.05] mb-6">
          Let's start a<br />
          <em className="not-italic text-[#C21E1E]">conversation.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Whether you're applying, partnering or just curious — we'd love to hear from you.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT FORM + MAP - Blue Section
   Form fields are collected and handed straight to WhatsApp — no email
   sending on this page. Phone numbers are listed for direct calls.
══════════════════════════════════════════════════ */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "Admissions",
    message: "",
  });
  const [shareLoc, setShareLoc] = useState(false);
  const [location, setLocation] = useState<GeoCoords | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState(false);

  const updateField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const isValid =
    form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.message.trim();

  const toggleShareLoc = async () => {
    if (shareLoc) {
      setShareLoc(false);
      setLocation(null);
      setLocError(false);
      return;
    }
    setLocating(true);
    setLocError(false);
    const loc = await getLocation();
    setLocating(false);
    if (loc) {
      setLocation(loc);
      setShareLoc(true);
    } else {
      setLocError(true);
    }
  };

  const handleSend = () => {
    if (!isValid) return;

    const text = [
      "New enquiry from the Preeminence website:",
      "",
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Department: ${form.department}`,
      "",
      `Message: ${form.message}`,
      ...(location ? ["", `📍 From: ${locationLink(location)}`] : []),
    ].join("\n");

    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const resetForm = () => {
    setForm({ firstName: "", lastName: "", email: "", department: "Admissions", message: "" });
    setLocation(null);
    setShareLoc(false);
    setLocError(false);
    setSent(false);
  };

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-8">

        {/* Form */}
        <FadeFrom dir="left">
          <div className="rounded-2xl bg-warm-white border border-slate-200 p-8 h-full">
            <h3 className="font-display font-bold text-2xl text-blue-900 mb-6">Send us a message</h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-64 gap-3 text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                </div>
                <p className="font-semibold text-blue-900 text-lg">Message ready on WhatsApp!</p>
                <p className="text-sm text-slate-600 max-w-xs">
                  We opened WhatsApp with your details filled in — just hit send there. If it
                  didn't open,{" "}
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                    chat with us directly
                  </a>.
                </p>
                <button onClick={resetForm}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700 transition-colors">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <div className="grid gap-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    placeholder="First name"
                    value={form.firstName}
                    onChange={updateField("firstName")}
                    className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-blue-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition w-full" />
                  <input
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={updateField("lastName")}
                    className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-blue-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition w-full" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={updateField("email")}
                  className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-blue-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition w-full" />
                <select
                  value={form.department}
                  onChange={updateField("department")}
                  className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-blue-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition w-full">
                  <option>Admissions</option>
                  <option>Academics</option>
                  <option>Finance</option>
                  <option>Administration</option>
                </select>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={updateField("message")}
                  className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-blue-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition w-full resize-none" />
                <label className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={shareLoc}
                    onChange={toggleShareLoc}
                    disabled={locating}
                    className="mt-1 h-4 w-4 accent-blue-600"
                  />
                  <div className="text-sm">
                    <div className="text-slate-800 font-medium">Share my location</div>
                    <div className="text-slate-500 text-xs">
                      {locating
                        ? "Detecting location…"
                        : locError
                          ? "Location unavailable — we'll send your message without it."
                          : location
                            ? "Location ready — it'll be added to your message."
                            : "Lets our team know which area you're writing from."}
                    </div>
                  </div>
                </label>
                <button
                  onClick={handleSend}
                  disabled={!isValid}
                  className="rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed  py-3 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  Send Message <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-center text-[11px] text-slate-400">
                  Sending opens WhatsApp with your message ready to go.
                </p>
              </div>
            )}
          </div>
        </FadeFrom>

        {/* Map + info cards */}
        <FadeFrom dir="right">
          <div className="flex flex-col gap-4 h-full">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 flex-1 min-h-[240px]">
              <iframe
                title="Campus Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=7.50%2C6.49%2C7.58%2C6.57&layer=mapnik&marker=6.53%2C7.54"
                className="w-full h-full min-h-[240px]"
                loading="lazy"
              />
            </div>

            {/* Info cards — WhatsApp, phone & email channels */}
            <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" stagger={0.08}>
              {CONTACT_CARDS.map((item) => {
                const Icon = item.icon;
                if (item.numbers) {
                  return (
                    <motion.div
                      key={item.title}
                      variants={staggerItem}
                      className="rounded-xl bg-warm-white border border-slate-200 p-4 flex flex-col items-center text-center hover:border-blue-300 transition-colors">
                      <div className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center mb-2 flex-shrink-0`}>
                        <Icon className={`h-4 w-4 ${item.accent}`} />
                      </div>
                      <div className="font-semibold text-sm text-blue-900">{item.title}</div>
                      <div className="mt-1 space-y-1">
                        {item.numbers.map((n) => (
                          <a key={n.href} href={n.href} className={`block text-xs ${item.accent} hover:underline`}>
                            {n.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <motion.a
                    key={item.title}
                    variants={staggerItem}
                    href={item.href}
                    target={item.title !== "Email" ? "_blank" : undefined}
                    rel={item.title !== "Email" ? "noopener noreferrer" : undefined}
                    className="rounded-xl bg-warm-white border border-slate-200 p-4 flex flex-col items-center text-center hover:border-blue-300 transition-colors group">
                    <div className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center mb-2 flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${item.accent}`} />
                    </div>
                    <div className="font-semibold text-sm text-blue-900">{item.title}</div>
                    <div className={`text-xs mt-1 break-words ${item.accent}`}>
                      {item.val}
                    </div>
                  </motion.a>
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
   Every department routes through the same single WhatsApp number —
   no direct-dial numbers anywhere.
══════════════════════════════════════════════════ */
function Departments() {
  const depts = [
    { t: "Admissions", e: "admissions@preeminence.edu", accent: "text-blue-600",   iconBg: "bg-blue-100",   border: "border-blue-200"   },
    { t: "Academics",  e: "academics@preeminence.edu",  accent: "text-sky-600",    iconBg: "bg-sky-100",    border: "border-sky-200"    },
    { t: "Finance",    e: "finance@preeminence.edu",    accent: "text-indigo-600", iconBg: "bg-indigo-100", border: "border-indigo-200" },
    { t: "Administration", e: "admin@preeminence.edu",    accent: "text-cyan-600",   iconBg: "bg-cyan-100",   border: "border-cyan-200"   },
  ];

  return (
    <section className="py-24 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Department Contacts" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
              Reach the right <em className="not-italic text-[#C21E1E]">team.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {depts.map((d) => (
            <motion.div key={d.t} variants={staggerItem}
              className="group rounded-2xl bg-warm-white border border-slate-200 p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className={`h-11 w-11 rounded-xl ${d.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition`}>
                <Building2 className={`h-5 w-5 ${d.accent}`} />
              </div>
              <div className="font-display font-bold text-slate-800 text-lg mb-2">{d.t}</div>
              <a href={`mailto:${d.e}`} className={`block text-xs break-words mb-4 hover:underline ${d.accent}`}>
                {d.e}
              </a>
              <a
                href={whatsappLink(`Hello! I have an enquiry for the ${d.t} department.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors"
              >
                Chat on WhatsApp <ArrowRight className="h-3 w-3" />
              </a>
            </motion.div>
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
    { q: "What's the fastest way to book a campus tour?",  a: "Message us on WhatsApp or email admissions directly. Tours run Tuesday–Thursday at 10am and 2pm." },
    { q: "Do you offer evening drop-in sessions?",         a: "Yes — the first Wednesday of each month from 5–7pm. RSVP via the events page." },
    { q: "Can I reach a specific teacher?",                a: "Yes. Use the staff directory in the parent portal, or message us on WhatsApp and we'll connect you." },
    { q: "How quickly do you respond to enquiries?",       a: "We aim to respond to all enquiries within 24 hours on weekdays. Urgent matters can be sent straight to us on WhatsApp." },
  ];

  return (
    <section className="py-24 bg-warm-white">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="FAQ" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-900">
              Quick <em className="not-italic text-[#C21E1E]">answers.</em>
            </h2>
          </FadeUp>
        </div>

        <StaggerList className="space-y-3" stagger={0.07}>
          {faqs.map((f, i) => (
            <motion.div key={f.q} variants={staggerItem}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-blue-300 transition-colors">
              <button onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4">
                <span className="font-semibold text-blue-900 text-sm leading-snug">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 ${open === i ? "text-blue-600" : "text-slate-400"}`} />
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
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-4">
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
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl bg-blue-50 border border-blue-200 p-12 md:p-16 overflow-hidden text-center">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"
            alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
          <div className="relative">
            <FadeUp>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                Ready to visit us<br />
                <em className="not-italic text-[#C21E1E]">in person?</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-10">
                Nothing beats seeing the campus for yourself. Book a personal tour and meet our team face to face.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/admissions/tour"
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-7 py-3.5 text-sm font-bold transition-colors shadow-lg">
                  Book a Campus Tour <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/admissions"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-300 text-blue-700 hover:bg-blue-100 px-7 py-3.5 text-sm font-semibold transition-colors">
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