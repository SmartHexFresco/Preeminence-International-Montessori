



import { useRef, useState, useEffect } from "react";
import {
  motion, useScroll, useTransform, useSpring, useInView, AnimatePresence,
} from "framer-motion";
import {
  ArrowRight, Play, MapPin, Sparkles,
  BookOpen, Bus, Star, Search,
  User, Users, CalendarDays, UtensilsCrossed, CreditCard,
  ArrowUpRight, CheckCircle2, Microscope, Music, Laptop, Palette,
  ChevronLeft, ChevronRight, X,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   IMAGES — Replace each value with your own image path or URL.
───────────────────────────────────────────────────────────────────────────── */
const IMGS = {
  hero:      "/images/optimized/hero.webp",
  stem:      "/images/optimized/classroom-3.webp",
  sports:    "/images/optimized/sports.webp",
  library:   "/images/optimized/classroom-1.webp",
  arts:      "/images/optimized/classroom-2.webp",
  campus:    "/images/optimized/gallery-1.webp",
  students:  "/images/optimized/students.webp",
  grad:      "/images/optimized/gallery-2.webp",
  lab2:      "/images/optimized/gallery-3.webp",
  texture:   "/images/optimized/image.webp",
  gallery4:  "/images/optimized/gallery-4.webp",
  gallery5:  "/images/optimized/gallery-5.webp",
};

const CUSTOM_HERO_IMAGE = "";
const HERO_BG = CUSTOM_HERO_IMAGE || IMGS.hero;
const NAV_H = 64;

/* ══════════════════════════════════════════════════
   GLOBAL STYLES — smooth scroll (respecting reduced motion)
══════════════════════════════════════════════════ */
function GlobalStyles() {
  return (
    <style>{`
      html {
        scroll-behavior: smooth;
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
      }
      /* Portrait framing helper — keeps faces centered & visible
         regardless of container aspect ratio. Adjust object-position
         per-image if a particular photo needs different framing. */
      .portrait-fill {
        object-fit: cover;
        object-position: 50% 22%;
      }
      .portrait-fill-tight {
        object-fit: cover;
        object-position: 50% 18%;
      }
    `}</style>
  );
}

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
   HERO
══════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const yBgFar   = useTransform(smoothProgress, [0, 1], [0, 70]);
  const yContent = useTransform(smoothProgress, [0, 1], [0, -16]);
  const opacityContent = useTransform(smoothProgress, [0, 1], [1, 0.25]);
  const scaleBg  = useTransform(smoothProgress, [0, 1], [1.03, 1]);
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  return (
    <section ref={ref}
      className="relative flex items-center overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800"
      style={{ minHeight: "100svh", paddingTop: NAV_H }}>
      <motion.div style={{ y: yBgFar, scale: scaleBg }} className="absolute inset-0 origin-center">
        <img src={HERO_BG} alt="campus" fetchpriority="high" decoding="async" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] pointer-events-none bg-gradient-to-r from-blue-950/80 via-blue-950/50 to-transparent" />
      <motion.div style={{ y: yContent, opacity: opacityContent }}
        className="relative mx-auto max-w-7xl px-6 w-full py-20">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl xl:text-[72px] font-bold leading-[1.04] text-white mb-6 [text-shadow:0_3px_24px_rgba(13,29,77,0.6)]">
            Where curious<br /><em className="not-italic text-[#C21E1E]">minds</em> shape<br />the future.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            className="text-base md:text-lg text-white max-w-lg leading-relaxed mb-9 [text-shadow:0_2px_16px_rgba(13,29,77,0.7)]">
            A warm, child-centred international Montessori school for Nursery&nbsp;through Primary,
            blending the Montessori method and the Nigerian curriculum with joyful, hands-on learning.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-10">
            <a href="/admissions" className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 px-6 py-3.5 text-sm font-semibold text-white transition-colors">
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/14 transition-colors">
              <Play className="h-4 w-4 fill-blue-300 text-blue-300" /> Virtual Tour
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="flex items-center gap-5 flex-wrap">
            {["Montessori Method", "Nigerian Primary Curriculum", "ISO 21001"].map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-white/85 flex-shrink-0" />
                <span className="text-xs text-white/85 [text-shadow:0_1px_10px_rgba(13,29,77,0.6)]">{b}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <motion.div style={{ opacity: indicatorOpacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.28em] text-blue-400/40 font-medium">Scroll</span>
        <div className="h-9 w-5 rounded-full border border-blue-500/30 flex items-start justify-center p-1.5">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        </div>
</motion.div>
    </section>
  );
}

function WhyChoose() {
  const features = [
    { icon: BookOpen,       title: "Early Literacy & Phonics",  desc: "Joyful phonics, storytelling, and read-aloud time that grow confident young readers step by step.",            stat: "Phonics-first",    accent: "text-blue-600",   iconBg: "bg-blue-100",   border: "border-blue-200"   },
    { icon: Star,           title: "Learning Through Play",     desc: "Purposeful play and Montessori activities that build concentration, motor skills, and curiosity every day.",   stat: "Hands-on fun",     accent: "text-sky-600",    iconBg: "bg-sky-100",    border: "border-sky-200"    },
    { icon: Music,          title: "Creative Arts & Music",     desc: "Daily singing, drawing, and craft sessions that spark imagination, rhythm, and self-expression.",             stat: "Daily creativity", accent: "text-indigo-600", iconBg: "bg-indigo-100",  border: "border-indigo-200" },
    { icon: Microscope,     title: "Nature & Discovery",        desc: "Nature walks and a school garden where little ones observe, ask questions, and explore the living world.",      stat: "Explore & grow",   accent: "text-purple-600", iconBg: "bg-purple-100",  border: "border-purple-200"  },
    { icon: Users,          title: "Caring Small Classes",      desc: "Trained, patient guides and small class sizes so every child feels seen, safe, and supported.",             stat: "1:8 ratio",        accent: "text-blue-600",   iconBg: "bg-blue-100",   border: "border-blue-200"   },
    { icon: UtensilsCrossed,title: "Healthy Meals & Rest",      desc: "Nutritious meals, snacks, and quiet rest time to keep little learners energized and happy all day.",           stat: "Nourished daily",  accent: "text-cyan-600",   iconBg: "bg-cyan-100",   border: "border-cyan-200"   },
  ];
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sky-100/60 blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="text-center mb-14">
          <SectionLabel label="Why Preeminence" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800">
              Where curious little minds<br /><em className="not-italic text-[#C21E1E]">begin to love learning.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} variants={staggerItem}
                className={`group relative bg-warm-white border ${f.border} p-6 hover:-translate-y-1 hover:border-blue-300 transition-all duration-300`}>
                <div className={`h-11 w-11 rounded-xl ${f.iconBg} flex items-center justify-center mb-5`}>
                  <Icon className={`h-5 w-5 ${f.accent}`} />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-800 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-xs font-medium uppercase tracking-wider ${f.accent}`}>{f.stat}</span>
                  <ArrowUpRight className={`h-4 w-4 text-slate-300 group-hover:${f.accent} transition-colors`} />
                </div>
              </motion.div>
            );
          })}
        </StaggerList>
      </div>
    </section>
  );
}

//* ══════════════════════════════════════════════════ EVENTS - with backdrop image */
function Events() {
  const [filter, setFilter] = useState("All");
  const cats = ["All","Academic","Sports","Community"];
  const catStyle = {
    Academic:  { bar:"bg-blue-500",    badge:"bg-blue-100 text-blue-700 border-blue-200"       },
    Sports:    { bar:"bg-sky-500",     badge:"bg-sky-100 text-sky-700 border-sky-200"          },
    Community: { bar:"bg-emerald-500", badge:"bg-emerald-100 text-emerald-700 border-emerald-200"},
  };
  const events = [
    { d:"MAY 18", t:"Laptop Learning Time",      c:"Academic",  img:IMGS.library,  desc:"Children get hands-on with laptops — typing practice, drawing and safe educational games." },
    { d:"MAY 24", t:"School Sports Day",        c:"Sports",    img:IMGS.sports,   desc:"Sack races, relay games and fun fitness activities for every class." },
    { d:"JUN 02", t:"Digital Learning Day",     c:"Academic",  img:IMGS.campus,   desc:"Little learners explore computers, typing and fun educational apps together." },
    { d:"JUN 10", t:"Science & Discovery Fair", c:"Academic",  img:IMGS.stem,     desc:"Little scientists showcase simple experiments and nature projects." },
    { d:"JUN 14", t:"Open House Day",           c:"Community", img:IMGS.students, desc:"Tour our classrooms, meet our guides and watch learning in action." },
    { d:"JUN 21", t:"Interactive ICT Fun",      c:"Academic",  img:IMGS.arts,     desc:"Children explore interactive learning apps and creative digital games together." },
  ];
  const filtered = filter === "All" ? events : events.filter(e => e.c === filter);
  return (
    <section className="py-24 bg-warm-white relative overflow-hidden">
      {/* faint campus backdrop image, kept subtle so content stays readable */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={IMGS.campus} alt="" className="h-full w-full object-cover opacity-[0.04]" />
        <div className="absolute inset-0 bg-white/60" />
      </div>
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="mb-10">
          <div>
            <SectionLabel label="News & Events" light={false} />
            <FadeUp>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800">
                What's happening<br /><em className="not-italic text-[#C21E1E]">on campus.</em>
              </h2>
            </FadeUp>
          </div>
        </div>
        <FadeUp delay={0.1} className="flex items-center flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input placeholder="Search events…"
              className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-400 transition" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${filter===c?"bg-blue-600 text-white":"bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"}`}>
                {c}
              </button>
            ))}
          </div>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((e, i) => {
              const cs = catStyle[e.c];
              return (
                <motion.article key={e.t}
                  initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group rounded-2xl overflow-hidden bg-warm-white border border-slate-200 hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={e.img} alt={e.t} loading="lazy" decoding="async"
                      className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute top-3 left-3 rounded-lg bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{e.d}</div>
                    <span className={`absolute top-3 right-3 rounded-full border text-[10px] font-medium px-2.5 py-0.5 ${cs.badge}`}>{e.c}</span>
                  </div>
                  <div className="p-5">
                    <div className={`h-px w-8 ${cs.bar} mb-3`} />
                    <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{e.t}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{e.desc}</p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ PORTAL - Blue */
function Portal() {
  const items = [
    { icon: User,            label: "Student Portal",  sub: "Classwork & reports", accent:"text-blue-600",   bg:"bg-blue-100",   border:"border-blue-200"   },
    { icon: Users,           label: "Parent Login",    sub: "Progress & billing",   accent:"text-sky-600",    bg:"bg-sky-100",    border:"border-sky-200"    },
    { icon: BookOpen,        label: "e-Learning",      sub: "Courses & materials",  accent:"text-indigo-600", bg:"bg-indigo-100", border:"border-indigo-200" },
    { icon: CalendarDays,    label: "Calendar",        sub: "Events & schedule",    accent:"text-cyan-600",   bg:"bg-cyan-100",   border:"border-cyan-200"   },
    { icon: Users,           label: "Staff Directory", sub: "Contact faculty",      accent:"text-blue-600",   bg:"bg-blue-100",   border:"border-blue-200"   },
    { icon: UtensilsCrossed, label: "Lunch Menu",      sub: "Weekly nutrition",     accent:"text-teal-600",   bg:"bg-teal-100",   border:"border-teal-200"   },
    { icon: Bus,             label: "Bus Tracking",    sub: "Live GPS tracking",    accent:"text-sky-600",    bg:"bg-sky-100",    border:"border-sky-200"    },
    { icon: CreditCard,      label: "Payments",        sub: "Fees & receipts",      accent:"text-indigo-600", bg:"bg-indigo-100", border:"border-indigo-200" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Quick Access" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-900">
              Your school. <em className="not-italic text-[#C21E1E]">One dashboard.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.06}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button key={item.label} variants={staggerItem}
                className={`group rounded-2xl bg-warm-white border ${item.border} p-5 text-left hover:-translate-y-1 hover:bg-blue-50 transition-all duration-200`}>
                <div className={`h-11 w-11 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition`}>
                  <Icon className={`h-5 w-5 ${item.accent}`} />
                </div>
                <div className="font-semibold text-sm text-slate-800">{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${item.accent} opacity-0 group-hover:opacity-100 transition`}>
                  Open <ArrowRight className="h-3 w-3" />
                </div>
              </motion.button>
            );
          })}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ ACADEMICS - with soft background pattern */
function Academics() {
  const [active, setActive] = useState(0);
  const tabs = ["Montessori Method","Digital Learning","Creative Computing","Science & Discovery","Play & Movement"];
  const data = [
    { title:"Nursery–Primary 6 · The Montessori Way", badge:"Child-Led",  desc:"A child-centred approach where each little learner follows their own interests with hands-on materials, gently guided by trained Montessori guides.",                               bullets:["Child-led learning stations","Montessori materials & sensorial work","Mixed-age, family-like classrooms","Patient observation & individual guidance"], img:IMGS.students, icon:BookOpen  },
    { title:"Digital Learning & Computer Skills",      badge:"Digital Skills",desc:"Children build digital confidence from day one — typing, navigating computers and exploring safe, playful educational apps with our guides.",                                          bullets:["Guided typing & computer basics","Safe educational apps & games","Digital drawing & creativity tools","ICT woven into every lesson"],                                    img:IMGS.library,  icon:Laptop    },
    { title:"Creative Computing & Multimedia",           badge:"Creative Tech",desc:"Children explore technology creatively — digital art, drawing, animations and multimedia projects that blend imagination with computer skills.",                                              bullets:["Digital art & drawing apps","Animation & creative projects","Making music & videos with tech","Showcase of digital creations"],                                     img:IMGS.arts,     icon:Palette   },
    { title:"Nature & Hands-on Science",              badge:"Discovery",  desc:"Nature walks, our school garden and simple safe experiments that let children observe, question and explore the living world.",                                                  bullets:["School garden & nature walks","Simple, safe experiments","Discovery corners in every class","Curiosity-first questioning"],                              img:IMGS.stem,     icon:Microscope},
    { title:"Learning Through Play",                  badge:"Play-Based", desc:"Purposeful play, outdoor games and structured movement that build motor skills, teamwork, confidence and joy every single day.",                                                   bullets:["Daily outdoor playtime","Motor-skills development","Team games & sharing","Play-based learning curriculum"],                                          img:IMGS.sports,   icon:Users     },
  ];
  return (
    <section className="py-24 bg-blue-50/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-warm-white to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="text-center mb-12">
          <SectionLabel label="Academics" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800">
              A curriculum that grows<br /><em className="not-italic text-[#C21E1E]">with every child.</em>
            </h2>
          </FadeUp>
        </div>
        <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${active===i?"bg-blue-600 text-white":"bg-warm-white border border-slate-200 text-slate-600 hover:bg-slate-100"}`}>
              {t}
            </button>
          ))}
        </FadeUp>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-10 items-center bg-warm-white border border-slate-200 rounded-3xl p-8">
            <div>
              <span className="inline-block rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-medium px-3 py-1 tracking-wider uppercase mb-5">{data[active].badge}</span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-800 mb-4 leading-snug">{data[active].title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{data[active].desc}</p>
              <ul className="space-y-3 mb-8">
                {data[active].bullets.map((b, bi) => (
                  <motion.li key={b} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: bi * 0.07 }}
                    className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />{b}
                  </motion.li>
                ))}
              </ul>
              <button className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-5 py-3 text-sm font-semibold transition-colors">
                Download Prospectus <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <img src={data[active].img} alt={data[active].title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl p-3">
                {(() => { const I = data[active].icon; return <I className="h-6 w-6 text-blue-600" />; })()}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ TESTIMONIALS - Blue */
function Testimonials() {
  const [active, setActive] = useState(0);
  const items = [
    { name:"Mrs. Adaeze Obi",      role:"Mother · Nursery 2",          quote:"The guides know my daughter by name and by heart. She comes home singing phonics songs and counting everything in sight.", img:IMGS.students },
    { name:"Mr. & Mrs. Okoye",     role:"Parents · Primary 2 & 4",     quote:"Both our children wake up excited for school. Small classes and warm teachers — we couldn't ask for more.",                    img:IMGS.campus  },
    { name:"Mrs. Funmilayo Ade",   role:"Mother · Primary 6",          quote:"The move from a big school to Preeminence was seamless. Our son's reading has blossomed and his confidence has soared.",        img:IMGS.library },
    { name:"Mr. Emeka Eze",        role:"Father · Nursery 1",          quote:"His first school was a big step for our family. The guides made him feel safe from day one — now he can't wait to go.",         img:IMGS.sports  },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Voices of Preeminence" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-900">
              Loved by children.<br /><em className="not-italic text-[#C21E1E]">Trusted by families.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid md:grid-cols-2 gap-5" stagger={0.1}>
          {items.map((item, i) => (
            <motion.button key={item.name} variants={staggerItem} onClick={() => setActive(i)}
              className={`text-left rounded-2xl border p-6 transition-all duration-300 ${active===i?"bg-blue-50 border-blue-200":"bg-warm-white border-slate-200 hover:border-blue-300 hover:bg-slate-50"}`}>
              <div className="flex gap-1 mb-4">
                {Array.from({length:5}).map((_,k) => (
                  <Star key={k} className={`h-4 w-4 fill-current ${active===i?"text-blue-600":"text-yellow-500/80"}`} />
                ))}
              </div>
              <p className={`font-display text-lg leading-snug italic mb-5 ${active===i?"text-blue-900":"text-slate-700"}`}>"{item.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-slate-200">
                  <img src={item.img} alt={item.name} loading="lazy" decoding="async" className="h-full w-full portrait-fill" />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${active===i?"text-blue-900":"text-slate-800"}`}>{item.name}</div>
                  <div className={`text-xs ${active===i?"text-blue-600/80":"text-slate-500"}`}>{item.role}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ GALLERY - White */
function Gallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const photos = [
    { src:IMGS.campus,   label:"Bright Classrooms"    },
    { src:IMGS.stem,      label:"Discovery Corner"     },
    { src:IMGS.gallery5,  label:"Hands-on Building"    },
    { src:IMGS.arts,      label:"Arts & Crafts Studio" },
    { src:IMGS.sports,   label:"Playground Fun"       },
    { src:IMGS.library,  label:"Reading Corner"       },
    { src:IMGS.students, label:"Little Learners"      },
    { src:IMGS.gallery4, label:"School Life"          },
  ];
  const close = () => setOpenIdx(null);
  const prev = () => setOpenIdx((idx) => (idx === null || idx === 0) ? photos.length - 1 : idx - 1);
  const next = () => setOpenIdx((idx) => (idx === null || idx >= photos.length - 1) ? 0 : idx + 1);
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setOpenIdx((openIdx + photos.length - 1) % photos.length);
      else if (e.key === "ArrowRight") setOpenIdx((openIdx + 1) % photos.length);
      else if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);
  return (
    <section className="py-24 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Life at Preeminence" light={false} />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800">
              Inside <em className="not-italic text-[#C21E1E]">our world.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid grid-cols-2 md:grid-cols-3 gap-3" stagger={0.07}>
          {photos.map((photo, i) => (
            <motion.button key={i} variants={{
              hidden:  { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
            }} onClick={() => setOpenIdx(i)}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 ${i===0?"md:col-span-2":""}`}>
              <div className={`${i===0?"aspect-[16/9]":"aspect-square"} overflow-hidden`}>
                <img src={photo.src} alt={photo.label} loading="lazy" decoding="async"
                  className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition duration-300">
                  <p className="text-[10px] text-blue-400 uppercase tracking-wider font-medium">View</p>
                  <p className="text-white font-semibold text-sm">{photo.label}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </StaggerList>
      </div>
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.img key={photos[openIdx].src} initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ ease: [0.22,1,0.36,1], duration: 0.4 }}
              src={photos[openIdx].src} alt={photos[openIdx].label}
              className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl" />
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition"
              aria-label="Previous photo">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition"
              aria-label="Next photo">
              <ChevronRight className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute right-4 md:right-6 top-4 md:top-6 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition"
              aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-slate-900/70 border border-white/10 px-4 py-2">
              <p className="text-sm text-white font-medium">{openIdx + 1} / {photos.length}</p>
              <span className="h-3 w-px bg-white/20" />
              <p className="text-xs text-white/70">{photos[openIdx].label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════ VIRTUAL TOUR - Blue */
function VirtualTour() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 p-10 md:p-16">
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel label="360° Experience" light={false} />
              <FadeUp>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-900 mb-5">
                  Step inside<br /><em className="not-italic text-[#C21E1E]">Preeminence.</em>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-base text-slate-600 leading-relaxed max-w-md mb-8">
                  Wander our bright classrooms, playground, reading corners and creative arts studio —
                  all from the comfort of home. Available 24/7 in immersive 360°.
                </p>
                <button className="inline-flex items-center gap-3 rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-7 py-3.5 text-sm font-semibold transition-colors">
                  <Play className="h-4 w-4 fill-blue-900 text-blue-900" /> Start Virtual Tour
                </button>
              </FadeUp>
            </div>
            <FadeFrom dir="right" className="aspect-video rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 shadow-md">
              <motion.img src={IMGS.campus} alt="Virtual tour preview" loading="lazy" decoding="async"
                style={{ y: bgY }}
                className="h-[116%] w-full object-cover absolute inset-0 -top-[8%] opacity-60 group-hover:opacity-80 transition-all duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-blue-600 border border-blue-500 flex items-center justify-center group-hover:bg-blue-700 transition">
                  <Play className="h-8 w-8 fill-white text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-blue-950/70 border border-blue-800 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-white/80 font-medium">Live Preview</span>
              </div>
            </FadeFrom>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ NEWSLETTER - Blue */
function Newsletter() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px 0px', amount: 0.3 });
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: 0.94, y: 32 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-warm-white border border-slate-200 p-10 md:p-14 text-center overflow-hidden shadow-sm">
          <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-blue-100 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-blue-100 pointer-events-none" />
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-blue-900 mb-3">Stay in the loop.</h2>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              Monthly updates on admissions, events and student achievements.<br />No spam — just what matters.
            </p>
            {done ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-3 font-semibold text-sm">
                <CheckCircle2 className="h-4 w-4" /> Welcome aboard! Check your inbox.
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-blue-900 placeholder:text-slate-400 outline-none focus:border-blue-400 transition" />
                <button onClick={() => email && setDone(true)}
                  className="rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors">
                  Subscribe
                </button>
              </div>
            )}
            <p className="text-xs text-slate-400 mt-4">Join 4,200+ members of the Preeminence community. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ ROOT */
export default function Home() {
  return (
    <>
      <GlobalStyles />
      <Hero />
      <WhyChoose />
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
