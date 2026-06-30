import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
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
  nigerian:   "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
  students:   "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&q=80",
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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/95 via-blue-700/85 to-blue-700/70" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />

      <motion.div style={{ y: yContent, opacity }}
        className="relative mx-auto max-w-7xl px-6 text-center w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-700/60 bg-blue-600/60 px-4 py-1.5 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-white">About Us</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
          Building a New<br />
          <em className="not-italic text-blue-400">Africa Through Charity</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed">
          Founded in 2000 with a simple belief: every intelligent child deserves access to free, 
          quality education — regardless of tribe, religion, or class.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOUNDATION STORY — incorporating history
══════════════════════════════════════════════ */
function FoundationStory() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Our Story" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              A Legacy of <em className="not-italic text-blue-700">Transformation</em>
            </h2>
          </FadeUp>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <FadeFrom dir="left">
            <div className="relative">
              <div className="absolute top-5 left-5 right-[-18px] bottom-[-18px] rounded-3xl border border-blue-200 pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <motion.img
                  src={IMGS.students}
                  alt="Rochas Foundation students"
                  style={{ y: imgY }}
                  className="h-[116%] w-full object-cover absolute inset-0 -top-[8%]"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeFrom>

          <div>
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Founded in 2000</span>
              </div>
              <p className="text-base text-gray-800 leading-relaxed mb-6">
                The Rochas Foundation is a non-governmental, non-political, and non-religious 
                organization established to ensure that intelligent children from less privileged 
                homes have access to free and qualitative education.
              </p>
              <p className="text-base text-gray-800 leading-relaxed mb-6">
                What began as a vision to make education free and accessible to every less 
                privileged African child has grown into a network of colleges spanning across Nigeria.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-white border border-blue-100 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">21,000+</div>
                  <div className="text-xs text-gray-700">Children Educated</div>
                </div>
                <div className="rounded-xl bg-white border border-blue-100 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">3,000+</div>
                  <div className="text-xs text-gray-500">Graduates & Undergraduates</div>
                </div>
              </div>
              <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700 text-sm mb-6">
                "Building a new Africa through charity — providing educational shelter for 
                the less privileged all over the world."
              </blockquote>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   VISION & MISSION
══════════════════════════════════════════════ */
function VisionMission() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
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
                To make education free and accessible to every less privileged African child, 
                regardless of tribe, religion, or class.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" /> Mission
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed pl-7">
                To build a new Africa through charity, providing educational shelter for 
                the less privileged all over the world.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Free tuition, books, and uniforms for all students",
                "Full boarding facilities with monthly allowances",
                "Comprehensive Medicare and feeding programs",
                "Annual exchange program to the United States for top students",
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
              alt="Rochas Foundation campus"
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
   COLLEGE NETWORK — campuses across Nigeria
══════════════════════════════════════════════ */
function CollegeNetwork() {
  const campuses = [
    "Owerri", "Ogboko", "Jos", "Ibadan", "Kano",
    "Zaria", "Bauchi", "Sokoto", "Adamawa", "Enugu"
  ];

  return (
    <section className="py-24 bg-blue-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Our Campuses" light={true} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              A Growing <em className="not-italic text-white">Network</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-amber-100/70 max-w-xl mx-auto mt-4">
              From Owerri in 2001 to Enugu today — our colleges span across Nigeria, 
              providing free education to thousands.
            </p>
          </FadeUp>
        </div>

        <StaggerList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" stagger={0.06}>
          {campuses.map((city) => (
            <motion.div key={city} variants={staggerItem}
              className="rounded-2xl bg-blue-800/40 border border-blue-600/60 p-6 text-center hover:border-blue-400/80 hover:-translate-y-1 transition-all">
              <Building2 className="h-8 w-8 text-blue-300/60 mx-auto mb-2" />
              <h3 className="font-semibold text-white text-sm">{city}</h3>
              <p className="text-xs text-amber-300/50">Campus</p>
            </motion.div>
          ))}
        </StaggerList>

        <FadeUp className="text-center mt-10">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-blue-800/60 border border-blue-600/60 px-6 py-3">
            <School className="h-5 w-5 text-white" />
            <span className="text-sm text-white">
              <strong className="text-white">9+</strong> colleges across Nigeria
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ACADEMIC EXCELLENCE — curriculum & achievements
══════════════════════════════════════════════ */
function AcademicExcellence() {
  const subjects = [
    "English", "Mathematics", "Biology", "Chemistry", "Physics", 
    "Literature", "History", "Geography", "Economics", "Government",
    "Commerce", "Accounting", "Agricultural Science", "Religious Studies"
  ];

  const achievements = [
    "Annual exchange program to the United States",
    "Top performers in academic competitions",
    "Excellence in sports and tournaments",
    "Distinction in character and leadership",
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <FadeFrom dir="left">
            <SectionLabel label="Academics" light={false} />
            <FadeUp delay={0.05}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Excellence in <em className="not-italic text-blue-700">Education</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Our colleges operate the Nigerian school curriculum with over 14 subjects, 
                maintaining a high record of excellence over the years. We also empower students 
                with non-academic skills in sports, music, communication, arts, crafts, and more.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {subjects.map((subject) => (
                  <span key={subject}
                    className="text-xs bg-white border border-blue-100 rounded-full px-3 py-1 text-gray-600">
                    {subject}
                  </span>
                ))}
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-200 p-5 mb-6">
                <h4 className="font-semibold text-blue-700 text-sm mb-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Rewarding Excellence
                </h4>
                <p className="text-sm text-gray-600">
                  We reward excellence by sending the overall best students who excel exceptionally 
                  in their studies to the United States annually for an exchange program — 
                  encouraging hard work and diligence among staff and students.
                </p>
              </div>
            </FadeUp>
          </FadeFrom>

          <FadeFrom dir="right">
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border border-blue-100 p-6">
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

              <div className="rounded-2xl bg-white border border-blue-100 p-6">
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
                    Boarding facilities & monthly allowances
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
              Our Core <em className="not-italic text-blue-400">Values.</em>
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
                className={`group rounded-2xl overflow-hidden border ${v.border} hover:-translate-y-1 transition-all duration-300 bg-blue-800/30`}>
                <div className="aspect-[16/9] overflow-hidden relative">
                  {/* Image - removed the gradient overlay */}
                  <img 
                    src={v.img} 
                    alt={v.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" 
                    loading="lazy" 
                  />
                  {/* Icon badge - moved to bottom with subtle background */}
                  <div className={`absolute bottom-4 left-4 h-10 w-10 rounded-xl ${v.iconBg} backdrop-blur-sm flex items-center justify-center border border-white/10`}>
                    <Icon className={`h-5 w-5 ${v.accent}`} />
                  </div>
                </div>
                <div className="bg-blue-800/40 backdrop-blur-sm p-5">
                  <h3 className="font-display font-bold text-xl text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-blue-200/70 leading-relaxed">{v.desc}</p>
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
    "WAEC Partner", "Cambridge Certified", "IB World School",
    "ISO 21001", "Nigerian Curriculum Compliant", "Excellence in Education",
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-14">
          <SectionLabel label="Recognition" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              Awards &amp; <em className="not-italic text-blue-700">Accreditations.</em>
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
              <AwardIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-sm text-gray-800">{badge}</span>
            </motion.div>
          ))}
        </StaggerList>

        <div className="mt-14 relative rounded-3xl overflow-hidden">
          <img src={IMGS.awards} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" loading="lazy" />
          <StaggerList className="relative grid sm:grid-cols-4 gap-5 p-2" stagger={0.1}>
            {[
              { value: "24+", label: "Years of Impact",   sub: "Est. 2000"                    },
              { value: "10",  label: "Campuses",          sub: "Across Nigeria"               },
              { value: "21k+", label: "Students Served",  sub: "In our community"             },
              { value: "3k+", label: "Graduates",         sub: "Worldwide alumni network"     },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}
                className="rounded-2xl bg-white border border-blue-100 p-7 text-center hover:border-blue-200 transition-colors relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-transparent" />
                <div className="font-display text-4xl font-bold text-blue-700 leading-none mb-2">{stat.value}</div>
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
                Join the <em className="not-italic text-blue-200">Rochas Family</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-base text-blue-200/70 max-w-xl mx-auto leading-relaxed mb-10">
                Be part of a legacy that's transforming lives through education. 
                Applications for the 2025–2026 academic year are now open.
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
      <FoundationStory />
      <VisionMission />
      <CollegeNetwork />
      <AcademicExcellence />
      <CoreValues />
      <Timeline />
      <Accreditations />
      <CTABanner />
    </Layout>
  );
}