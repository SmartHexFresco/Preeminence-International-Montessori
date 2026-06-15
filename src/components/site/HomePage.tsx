


// import { useEffect, useRef, useState, useCallback } from "react";
// import {
//   motion, useScroll, useTransform, useSpring, useInView, AnimatePresence,
// } from "framer-motion";
// import {
//   ArrowRight, Play, MapPin, Sparkles, GraduationCap, Trophy,
//   BookOpen, Compass, Bus, Star, ChevronRight, Search,
//   User, Users, Library, CalendarDays, UtensilsCrossed, CreditCard,
//   Quote, ArrowUpRight, CheckCircle2, Globe, Award, Microscope, Music, Cpu,
// } from "lucide-react";

// /* ─────────────────────────────────────────────────────────────────────────────
//    IMAGES — Replace each value with your own image path or URL.
//    Examples:
//      Local file in /public:  "/images/hero.jpg"
//      Imported asset:         import heroImg from "./assets/hero.jpg"; then use heroImg
//      External URL:           "https://yourcdn.com/hero.jpg"

//    KEY         USED IN
//    ──────────────────────────────────────────────────────
//    hero        Main hero section background
//    principal   Principal portrait (card + full message modal)
//    stem        STEM academics tab + Events card
//    sports      Sports stats card + Events card
//    library     Library stats card + Academics tab
//    arts        Arts academics tab + Events card
//    campus      Stats card + Events card + Virtual Tour bg
//    students    Hero floating card + Academics + Testimonials
//    grad        Graduation stats card + Events card
//    lab2        ICT academics tab background
// ───────────────────────────────────────────────────────────────────────────── */
// const IMGS = {
//   hero:      "/images/hero.jpg",       // Main hero background
//   principal: "/images/principal.jpg",  // Principal portrait
//   stem:      "/images/stem.jpg",       // STEM lab photo
//   sports:    "/images/sports.jpg",     // Sports/athletics photo
//   library:   "/images/library.jpg",    // Library photo
//   arts:      "/images/arts.jpg",       // Performing arts photo
//   campus:    "/images/campus.jpg",     // Campus aerial/wide shot
//   students:  "/images/students.jpg",   // Students group photo
//   grad:      "/images/grad.jpg",       // Graduation ceremony photo
//   lab2:      "/images/lab2.jpg",       // ICT/computer lab photo
// };

// /*
//  * CUSTOM HERO IMAGE (optional override)
//  * If you want a different image just for the hero, set it here.
//  * Leave as "" to use IMGS.hero above.
//  */
// const CUSTOM_HERO_IMAGE = "";
// const HERO_BG = CUSTOM_HERO_IMAGE || IMGS.hero;
// const NAV_H = 64;

// /* ══════════════════════════════════════════════════
//    SHARED SCROLL ANIMATION PRIMITIVES
// ══════════════════════════════════════════════════ */

// function FadeUp({ children, delay = 0, className = "", amount = 0.25 }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: false, margin: "-100px 0px", amount: 0.05 });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 28 }}
//       animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
//       transition={{ duration: 0.6, delay: inView ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
//       style={{ willChange: "opacity, transform" }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function FadeFrom({ children, dir = "left", delay = 0, className = "" }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: false, margin: "-100px 0px", amount: 0.05 });
//   const xVal = dir === "left" ? -40 : dir === "right" ? 40 : 0;
//   const yVal = dir === "up" ? 32 : dir === "down" ? -32 : 0;
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: xVal, y: yVal }}
//       animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : xVal, y: inView ? 0 : yVal }}
//       transition={{ duration: 0.6, delay: inView ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
//       style={{ willChange: "opacity, transform" }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function StaggerList({ children, className = "", stagger = 0.07, amount = 0.15 }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: false, margin: "-100px 0px", amount: 0.05 });
//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       variants={{
//         hidden: {},
//         visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// const staggerItem = {
//   hidden:  { opacity: 0, y: 18 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
// };

// function DrawLine({ className = "", delay = 0 }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: false, margin: "-40px 0px", amount: 0.3 });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ scaleX: 0 }}
//       animate={{ scaleX: inView ? 1 : 0 }}
//       transition={{ duration: 0.65, delay: inView ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
//       style={{ transformOrigin: "left center", willChange: "transform" }}
//       className={className}
//     />
//   );
// }

// function SectionLabel({ label, light = true }) {
//   return (
//     <FadeFrom dir="left" className="flex items-center gap-3 mb-4">
//       <DrawLine className={`h-px w-8 ${light ? "bg-blue-400" : "bg-blue-600"}`} />
//       <p className={`text-[10px] uppercase tracking-widest font-semibold ${light ? "text-blue-400" : "text-blue-600"}`}>
//         {label}
//       </p>
//     </FadeFrom>
//   );
// }

// /* ══════════════════════════════════════════════════
//    HERO
// ══════════════════════════════════════════════════ */
// function Hero() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
//   const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });
//   const yBgFar   = useTransform(smoothProgress, [0, 1], [0, 180]);
//   const yBgMid   = useTransform(smoothProgress, [0, 1], [0, 90]);
//   const yContent = useTransform(smoothProgress, [0, 1], [0, -48]);
//   const opacityContent = useTransform(smoothProgress, [0, 0.55], [1, 0]);
//   const scaleBg  = useTransform(smoothProgress, [0, 1], [1.08, 1]);
//   const indicatorOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });
//   const onMouseMove = useCallback((e) => {
//     const r = e.currentTarget.getBoundingClientRect();
//     setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
//   }, []);
//   const cards = [
//     { value: "98%",  label: "University Placement", icon: GraduationCap, pos: { top: "6%",     left: "2%" }  },
//     { value: "42",   label: "Nations Represented",  icon: Globe,          pos: { top: "4%",     right: "2%" } },
//     { value: "320+", label: "Global Awards",         icon: Award,          pos: { bottom: "18%", left: "0%" }  },
//     { value: "12",   label: "STEM Laboratories",     icon: Microscope,     pos: { bottom: "4%",  right: "2%" } },
//   ];
//   return (
//     <section ref={ref} onMouseMove={onMouseMove}
//       className="relative flex items-center overflow-hidden bg-blue-950"
//       style={{ minHeight: "100svh", paddingTop: NAV_H }}>
//       <motion.div style={{ y: yBgFar, scale: scaleBg }} className="absolute inset-0 origin-center">
//         <img src={HERO_BG} alt="campus" className="h-full w-full object-cover" />
//       </motion.div>
//       <motion.div style={{ y: yBgMid }} className="absolute inset-0 pointer-events-none">
//         <div className="h-full w-full bg-gradient-to-r from-blue-950/96 via-blue-950/82 to-blue-900/55" />
//         <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />
//       </motion.div>
//       <div className="absolute inset-0 opacity-[0.035]" style={{
//         backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
//         backgroundSize: "56px 56px",
//       }} />
//       <motion.div style={{ y: yContent, opacity: opacityContent }}
//         className="relative mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-2 gap-14 items-center py-20">
//         <div>
//           <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
//             className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-7">
//             <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
//             <span className="text-[11px] font-medium tracking-widest uppercase text-blue-200/90">Admissions Open · 2025–2026</span>
//           </motion.div>
//           <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
//             className="font-display text-5xl md:text-6xl xl:text-[72px] font-bold leading-[1.04] text-white mb-6">
//             Where curious<br /><em className="not-italic text-blue-300">minds</em> shape<br />the future.
//           </motion.h1>
//           <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
//             className="text-base md:text-lg text-blue-100/70 max-w-lg leading-relaxed mb-9">
//             A premier international secondary school for Grades&nbsp;6–12, blending Cambridge &amp; IB curricula
//             with cutting-edge STEM, performing arts, and global citizenship.
//           </motion.p>
//           <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
//             className="flex flex-wrap gap-3 mb-10">
//             <a href="/admissions" className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 px-6 py-3.5 text-sm font-semibold text-white transition-colors">
//               Apply Now <ArrowRight className="h-4 w-4" />
//             </a>
//             <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/14 transition-colors">
//               <Play className="h-4 w-4 fill-blue-300 text-blue-300" /> Virtual Tour
//             </button>
//             <button className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-blue-300/80 hover:text-white transition-colors">
//               <MapPin className="h-4 w-4" /> 
//             </button>
//           </motion.div>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
//             className="flex items-center gap-5 flex-wrap">
//             {["Cambridge Certified", "IB World School", "ISO 21001"].map((b) => (
//               <div key={b} className="flex items-center gap-1.5">
//                 <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
//                 <span className="text-xs text-blue-200/70">{b}</span>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//         <div className="relative h-[420px] hidden lg:block">
//           <motion.div initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.45, type: "spring", stiffness: 90 }}
//             className="absolute top-1/2 left-1/2 z-10"
//             style={{ transform: "translate(-50%,-50%)", animation: "heroFloat 5s ease-in-out infinite" }}>
//             <div className="h-36 w-36 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500/40 flex flex-col items-center justify-center">
//               <GraduationCap className="h-10 w-10 text-white mb-1" />
//               <span className="text-white font-bold text-[10px] tracking-widest text-center leading-tight px-2">ROCHAS<br />FOUNDATION</span>
//             </div>
//           </motion.div>
//           {cards.map((card, i) => {
//             const Icon = card.icon;
//             return (
//               <motion.div key={card.label}
//                 initial={{ opacity: 0, scale: 0.82, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
//                 transition={{ delay: 0.55 + i * 0.1, type: "spring" }}
//                 style={{ position: "absolute", ...card.pos,
//                   transform: `translate(${mouse.x * (i % 2 ? 13 : -13)}px,${mouse.y * (i % 2 ? 10 : -10)}px)`,
//                   transition: "transform 0.12s ease-out" }}
//                 className="bg-blue-900/70 backdrop-blur-md border border-blue-700/40 rounded-2xl p-4 min-w-[158px]">
//                 <div className="h-8 w-8 rounded-lg bg-blue-700/50 flex items-center justify-center mb-2">
//                   <Icon className="h-4 w-4 text-blue-300" />
//                 </div>
//                 <div className="font-display font-bold text-2xl text-white leading-none">{card.value}</div>
//                 <div className="text-xs text-blue-300/70 mt-1">{card.label}</div>
//               </motion.div>
//             );
//           })}
//           <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 420">
//             {[[85,70,250,210],[415,60,250,210],[78,315,250,210],[412,375,250,210]].map(([x1,y1,x2,y2],i) => (
//               <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(96,165,250,0.1)" strokeWidth="1" strokeDasharray="4 8" />
//             ))}
//           </svg>
//         </div>
//       </motion.div>
//       <motion.div style={{ opacity: indicatorOpacity }}
//         className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
//         <span className="text-[9px] uppercase tracking-[0.28em] text-blue-400/40 font-medium">Scroll</span>
//         <div className="h-9 w-5 rounded-full border border-blue-600/30 flex items-start justify-center p-1.5">
//           <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
//             className="h-1.5 w-1.5 rounded-full bg-blue-500" />
//         </div>
//       </motion.div>
//       <style>{`
//         @keyframes heroFloat{0%,100%{transform:translate(-50%,-50%) translateY(0px)}50%{transform:translate(-50%,-50%) translateY(-11px)}}
//         @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
//       `}</style>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ TICKER */
// function Ticker() {
//   const items = [
//     "🏆 5 students qualify for International Math Olympiad finals",
//     "🎭 Spring Musical 'Hadestown' — Tickets on Sale May 18",
//     "🌍 Model UN team takes 1st place in Geneva",
//     "📚 Library extended hours during finals week",
//     "🚀 Robotics team advances to World Championship",
//     "🎓 Record 98% university acceptance rate achieved",
//   ];
//   return (
//     <div className="bg-blue-900 border-y border-blue-800/60 py-2.5 overflow-hidden">
//       <div className="flex gap-14 whitespace-nowrap" style={{ animation: "ticker 36s linear infinite" }}>
//         {[...items, ...items].map((item, i) => (
//           <span key={i} className="flex items-center gap-3 text-sm text-blue-200/60">
//             <span className="h-1 w-1 rounded-full bg-blue-500 flex-shrink-0" />{item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════ PRINCIPAL MODAL */
// function PrincipalModal({ onClose }) {
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, []);
//   const paragraphs = [
//     "Dear Parents, Guardians, and Members of our School Community,",
//     "It is with great pride and deep gratitude that I address you as Head of School at Rochas Foundation College. This institution is not merely a place of academic instruction — it is a living community built on the conviction that every young person carries within them an extraordinary capacity for growth, contribution, and leadership.",
//     "When I walk through our corridors — past the STEM labs buzzing with invention, the theater vibrating with rehearsal, the library humming with curiosity — I am reminded daily of why we do this work. Education, at its finest, is not about filling vessels. It is about lighting fires.",
//     "Our students have stood on international stages — winning STEM olympiads, debating at Model UN in Geneva, publishing original research. These are the result of a culture we have deliberately built: one that refuses to settle for ordinary.",
//     "But our mission goes deeper than trophies and university acceptances. We are here to raise citizens of conscience — young men and women who understand that privilege carries responsibility.",
//     "To our students: you are the reason we are here. Come with your questions, your struggles, your wildest ideas. To our families: thank you for the sacred trust you place in us every morning.",
//   ];
//   return (
//     <AnimatePresence>
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="fixed inset-0 z-[200] bg-blue-950/88 backdrop-blur-md flex items-center justify-center p-4">
//         <motion.div initial={{ opacity: 0, scale: 0.94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
//           onClick={e => e.stopPropagation()}
//           className="bg-slate-900 border border-blue-800/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="relative bg-gradient-to-br from-blue-800 to-blue-950 rounded-t-3xl p-8 pb-14 overflow-hidden">
//             <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
//             <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center text-white/70 hover:text-white transition">
//               <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
//             </button>
//             <div className="relative flex items-center gap-4">
//               <div className="h-16 w-16 rounded-2xl overflow-hidden ring-2 ring-blue-500/50 flex-shrink-0">
//                 <img src={IMGS.principal} alt="Dr. Ifeoma Bernice" className="h-full w-full object-cover" />
//               </div>
//               <div>
//                 <p className="text-[10px] uppercase tracking-widest text-blue-300/80 font-medium mb-1">principal</p>
//                 <p className="font-display font-bold text-xl text-white">Dr. Ifeoma Bernice</p>
//                 {/* <p className="text-xs text-blue-300/60 mt-0.5">M.Ed, PhD — Harvard Graduate School of Education</p> */}
//               </div>
//             </div>
//           </div>
//           <div className="mx-6 -mt-8 relative z-10">
//             <div className="rounded-2xl bg-blue-700 border border-blue-600/50 p-5">
//               <Quote className="h-5 w-5 text-blue-300/40 mb-2" />
//               <p className="font-display font-semibold text-white text-lg leading-snug">"We don't just teach subjects. We cultivate purpose."</p>
//             </div>
//           </div>
//           <div className="px-8 py-7 space-y-4 text-sm text-blue-200/70 leading-relaxed">
//             {paragraphs.map((p, i) => <p key={i} className={i === 0 ? "font-medium text-blue-100" : ""}>{p}</p>)}
//             <p className="font-semibold text-blue-100">Together, we are not just building a school. We are building a generation.</p>
//             <div className="pt-4 border-t border-blue-800/50">
//               <p className="font-display font-bold text-white text-base">Dr. Ifeoma Bernice</p>
//               <p className="text-xs text-blue-400/60 mt-0.5">Principal , Rochas Foundation College</p>
//             </div>
//           </div>
//           <div className="px-8 pb-8">
//             <button onClick={onClose} className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 font-semibold text-sm transition-colors">Close Message</button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// /* ══════════════════════════════════════════════════ PRINCIPAL */
// function Principal() {
//   const [open, setOpen] = useState(false);
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
//   const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
//   return (
//     <section ref={sectionRef} className="py-24 bg-slate-900 overflow-hidden">
//       <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
//         <FadeFrom dir="left" className="relative flex justify-center">
//           <div className="absolute top-5 left-5 right-[-20px] bottom-[-20px] rounded-3xl border border-blue-800/40 pointer-events-none" />
//           <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden">
//             <motion.img src={IMGS.principal} alt="Dr. Eleanor Vance"
//               style={{ y: imgY }}
//               className="h-[115%] w-full object-cover absolute inset-0 -top-[7.5%]" />
//             <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
//             <div className="absolute bottom-5 left-5 right-5 bg-blue-900/80 backdrop-blur-sm border border-blue-700/40 rounded-2xl p-4">
//               <p className="text-[10px] uppercase tracking-widest text-blue-400 font-medium mb-1">Head of School</p>
//               <p className="font-display font-bold text-white text-lg">Dr. Ifeoma Bernice</p>
//               <p className="text-xs text-blue-300/60 mt-0.5">PhD — Harvard Graduate School of Education</p>
//             </div>
//           </div>
//         </FadeFrom>
//         <div>
//           <SectionLabel label="A Message From Our Principal" />
//           <FadeUp delay={0.05}>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-2">"We don't just teach subjects.</h2>
//           </FadeUp>
//           <FadeUp delay={0.12}>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-400 italic leading-tight mb-6">We cultivate purpose."</h2>
//           </FadeUp>
//           <FadeUp delay={0.18}>
//             <DrawLine className="h-px w-12 bg-blue-600 mb-6" delay={0.3} />
//             <p className="text-base text-blue-200/60 leading-relaxed mb-8">
//               Rochas Foundation College is a place where students are challenged to think bigger, act bolder and lead
//               with empathy. Every classroom is a launchpad. Every teacher, a mentor. Every student, a future architect of change.
//             </p>
//             <button onClick={() => setOpen(true)}
//               className="inline-flex items-center gap-2 rounded-xl border border-blue-600/60 text-blue-300 hover:bg-blue-800/50 hover:text-white px-6 py-3 text-sm font-semibold transition-all">
//               Read Full Message <ArrowRight className="h-4 w-4" />
//             </button>
//           </FadeUp>
//         </div>
//       </div>
//       {open && <PrincipalModal onClose={() => setOpen(false)} />}
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ WHY CHOOSE */
// function WhyChoose() {
//   const features = [
//     { icon: Microscope, title: "STEM Innovation Labs",  desc: "12 cutting-edge labs for robotics, AI, biotech, and aerospace led by scientists-in-residence.", stat: "12 Labs",       accent: "text-blue-400",   iconBg: "bg-blue-800/60",   border: "border-blue-700/40"   },
//     { icon: Trophy,     title: "Sports Academy",         desc: "16 varsity teams with Olympian-level coaching and world-class facilities.",                     stat: "120+ Trophies", accent: "text-sky-400",    iconBg: "bg-sky-800/50",    border: "border-sky-700/40"    },
//     { icon: Library,    title: "Digital Library",        desc: "85,000+ volumes, AI-powered research assistants and comprehensive digital archives.",            stat: "85k+ Titles",  accent: "text-indigo-400", iconBg: "bg-indigo-800/50",  border: "border-indigo-700/40" },
//     { icon: Music,      title: "Performing Arts Centre", desc: "Conservatory-grade music, theater, dance, and film studio with annual public showcases.",        stat: "8 Stages",     accent: "text-purple-400", iconBg: "bg-purple-800/50", border: "border-purple-700/40"  },
//     { icon: Compass,    title: "Career Counseling",      desc: "1:1 mentoring from Ivy League alumni. 98% of graduates placed at top global universities.",      stat: "98% Placed",   accent: "text-blue-400",   iconBg: "bg-blue-800/60",   border: "border-blue-700/40"   },
//     { icon: Bus,        title: "Smart Transport",        desc: "GPS-tracked, climate-controlled fleet covering 32 routes with real-time parent notifications.",  stat: "32 Routes",    accent: "text-cyan-400",   iconBg: "bg-cyan-800/50",   border: "border-cyan-700/40"   },
//   ];
//   return (
//     <section className="py-24 bg-blue-950 relative overflow-hidden">
//       <div className="mx-auto max-w-7xl px-6 relative">
//         <div className="text-center mb-14">
//           <SectionLabel label="Why Rochas Foundation" />
//           <FadeUp>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
//               Built for the world your<br /><em className="not-italic text-blue-400">children will inherit.</em>
//             </h2>
//           </FadeUp>
//         </div>
//         <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {features.map((f) => {
//             const Icon = f.icon;
//             return (
//               <motion.div key={f.title} variants={staggerItem}
//                 className={`group relative rounded-2xl bg-blue-900/40 border ${f.border} p-6 hover:-translate-y-1 transition-all duration-300`}>
//                 <div className={`h-11 w-11 rounded-xl ${f.iconBg} flex items-center justify-center mb-5`}>
//                   <Icon className={`h-5 w-5 ${f.accent}`} />
//                 </div>
//                 <h3 className="font-display font-bold text-xl text-white mb-2">{f.title}</h3>
//                 <p className="text-sm text-blue-200/55 leading-relaxed">{f.desc}</p>
//                 <div className="mt-5 pt-4 border-t border-blue-800/50 flex items-center justify-between">
//                   <span className={`text-xs font-medium uppercase tracking-wider ${f.accent}`}>{f.stat}</span>
//                   <ArrowUpRight className={`h-4 w-4 text-blue-700 group-hover:${f.accent} transition-colors`} />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </StaggerList>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ STATS */
// function AnimCounter({ to, suffix = "" }) {
//   const [n, setN] = useState(0);
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) {
//         const s = performance.now(), d = 2000;
//         const tick = (t) => {
//           const p = Math.min((t - s) / d, 1);
//           setN(Math.floor(to * (1 - Math.pow(1 - p, 4))));
//           if (p < 1) requestAnimationFrame(tick);
//         };
//         requestAnimationFrame(tick);
//         obs.disconnect();
//       }
//     }, { threshold: 0.4 });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [to]);
//   return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
// }

// function Stats() {
//   const stats = [
//     { v: 98,  s: "%", l: "University Acceptance", d: "Ivy & Russell Group destinations", img: IMGS.grad    },
//     { v: 320, s: "+", l: "Awards This Decade",     d: "National & international stage",   img: IMGS.sports  },
//     { v: 64,  s: "",  l: "Partner Universities",   d: "Across 18 countries worldwide",    img: IMGS.campus  },
//     { v: 100, s: "%", l: "Certified Faculty",      d: "75% hold a Masters or PhD degree", img: IMGS.library },
//   ];
//   return (
//     <section className="py-24 bg-slate-900">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="text-center mb-14">
//           <SectionLabel label="By The Numbers" />
//           <FadeUp>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
//               A community that <em className="not-italic text-blue-400">performs.</em>
//             </h2>
//           </FadeUp>
//         </div>
//         <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {stats.map((s) => (
//             <motion.div key={s.l} variants={staggerItem}
//               className="group relative rounded-2xl overflow-hidden border border-blue-800/40 bg-blue-900/30">
//               <div className="aspect-[3/2] overflow-hidden">
//                 <img src={s.img} alt={s.l}
//                   className="h-full w-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500" />
//               </div>
//               <div className="p-5">
//                 <div className="font-display text-5xl font-bold text-white leading-none mb-1">
//                   <AnimCounter to={s.v} suffix={s.s} />
//                 </div>
//                 <div className="font-semibold text-white text-sm mb-1">{s.l}</div>
//                 <div className="text-xs text-blue-400/60">{s.d}</div>
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
//             </motion.div>
//           ))}
//         </StaggerList>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ EVENTS */
// function Countdown({ target }) {
//   const [t, setT] = useState(() => Math.max(0, target.getTime() - Date.now()));
//   useEffect(() => {
//     const id = setInterval(() => setT(Math.max(0, target.getTime() - Date.now())), 1000);
//     return () => clearInterval(id);
//   }, [target]);
//   const d=Math.floor(t/86400000), h=Math.floor((t/3600000)%24), m=Math.floor((t/60000)%60), sc=Math.floor((t/1000)%60);
//   return (
//     <div className="flex gap-2">
//       {[{v:d,l:"Days"},{v:h,l:"Hrs"},{v:m,l:"Min"},{v:sc,l:"Sec"}].map((u) => (
//         <div key={u.l} className="rounded-xl bg-blue-950/70 border border-blue-700/40 px-3 py-2 min-w-[54px] text-center">
//           <div className="font-display font-bold text-2xl text-blue-300 leading-none">{String(u.v).padStart(2,"0")}</div>
//           <div className="text-[9px] uppercase tracking-widest text-blue-500/60 mt-1">{u.l}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function Events() {
//   const [filter, setFilter] = useState("All");
//   const cats = ["All","Academic","Sports","Arts","Community"];
//   const catStyle = {
//     Academic:  { bar:"bg-blue-500",    badge:"bg-blue-900/60 text-blue-300 border-blue-700/40"       },
//     Sports:    { bar:"bg-sky-500",     badge:"bg-sky-900/60 text-sky-300 border-sky-700/40"          },
//     Arts:      { bar:"bg-purple-500",  badge:"bg-purple-900/60 text-purple-300 border-purple-700/40" },
//     Community: { bar:"bg-emerald-500", badge:"bg-emerald-900/60 text-emerald-300 border-emerald-700/40"},
//   };
//   const events = [
//     { d:"MAY 18", t:"Spring Arts Showcase",      c:"Arts",      img:IMGS.arts,     desc:"Annual celebration of student creativity across all disciplines." },
//     { d:"MAY 24", t:"Robotics State Final",       c:"Academic",  img:IMGS.stem,     desc:"Our team defends their state championship title." },
//     { d:"JUN 02", t:"Inter-School Championships", c:"Sports",    img:IMGS.sports,   desc:"Track, swimming and basketball finals." },
//     { d:"JUN 10", t:"Community Service Fair",     c:"Community", img:IMGS.campus,   desc:"100+ partner organisations in attendance." },
//     { d:"JUN 14", t:"Open House Day",             c:"Academic",  img:IMGS.students, desc:"Tour our facilities and meet our faculty." },
//     { d:"JUN 21", t:"Graduation Ceremony",        c:"Community", img:IMGS.grad,     desc:"Celebrating the Class of 2025." },
//   ];
//   const filtered = filter === "All" ? events : events.filter(e => e.c === filter);
//   return (
//     <section className="py-24 bg-blue-950">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="grid lg:grid-cols-3 gap-8 items-end mb-10">
//           <div className="lg:col-span-2">
//             <SectionLabel label="News & Events" />
//             <FadeUp>
//               <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
//                 What's happening<br /><em className="not-italic text-blue-400">on campus.</em>
//               </h2>
//             </FadeUp>
//           </div>
//           <FadeFrom dir="right">
//             <div className="rounded-2xl bg-blue-900/60 border border-blue-700/40 p-6">
//               <p className="text-[10px] uppercase tracking-widest text-blue-400/70 font-medium mb-2">Next Major Event</p>
//               <p className="font-display font-bold text-white text-lg mb-4">Open House · June 14</p>
//               <Countdown target={new Date(Date.now() + 1000 * 60 * 60 * 24 * 12)} />
//             </div>
//           </FadeFrom>
//         </div>
//         <FadeUp delay={0.1} className="flex items-center flex-wrap gap-3 mb-8">
//           <div className="relative flex-1 min-w-[200px] max-w-sm">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500/60" />
//             <input placeholder="Search events…"
//               className="w-full rounded-xl bg-blue-900/50 border border-blue-700/40 pl-9 pr-3 py-2.5 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition" />
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             {cats.map(c => (
//               <button key={c} onClick={() => setFilter(c)}
//                 className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${filter===c?"bg-blue-500 text-white":"bg-blue-900/50 border border-blue-700/40 text-blue-300/70 hover:text-blue-200 hover:border-blue-600/50"}`}>
//                 {c}
//               </button>
//             ))}
//           </div>
//         </FadeUp>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           <AnimatePresence mode="popLayout">
//             {filtered.map((e, i) => {
//               const cs = catStyle[e.c];
//               return (
//                 <motion.article key={e.t}
//                   initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i * 0.05 }}
//                   className="group rounded-2xl overflow-hidden bg-blue-900/40 border border-blue-800/40 hover:border-blue-600/50 transition-all duration-300 cursor-pointer">
//                   <div className="aspect-[16/9] relative overflow-hidden">
//                     <img src={e.img} alt={e.t}
//                       className="h-full w-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent" />
//                     <div className="absolute top-3 left-3 rounded-lg bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{e.d}</div>
//                     <span className={`absolute top-3 right-3 rounded-full border text-[10px] font-medium px-2.5 py-0.5 ${cs.badge}`}>{e.c}</span>
//                   </div>
//                   <div className="p-5">
//                     <div className={`h-px w-8 ${cs.bar} mb-3`} />
//                     <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors mb-2">{e.t}</h3>
//                     <p className="text-sm text-blue-300/55 leading-relaxed mb-4">{e.desc}</p>
//                     <button className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:gap-2 transition-all">
//                       View Details <ChevronRight className="h-3.5 w-3.5" />
//                     </button>
//                   </div>
//                 </motion.article>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ PORTAL */
// function Portal() {
//   const items = [
//     { icon: User,            label: "Student Portal",  sub: "Grades & assignments", accent:"text-blue-400",   bg:"bg-blue-800/50",   border:"border-blue-700/40"   },
//     { icon: Users,           label: "Parent Login",    sub: "Progress & billing",   accent:"text-sky-400",    bg:"bg-sky-800/50",    border:"border-sky-700/40"    },
//     { icon: BookOpen,        label: "e-Learning",      sub: "Courses & materials",  accent:"text-indigo-400", bg:"bg-indigo-800/50", border:"border-indigo-700/40" },
//     { icon: CalendarDays,    label: "Calendar",        sub: "Events & schedule",    accent:"text-cyan-400",   bg:"bg-cyan-800/50",   border:"border-cyan-700/40"   },
//     { icon: Users,           label: "Staff Directory", sub: "Contact faculty",      accent:"text-blue-400",   bg:"bg-blue-800/50",   border:"border-blue-700/40"   },
//     { icon: UtensilsCrossed, label: "Lunch Menu",      sub: "Weekly nutrition",     accent:"text-teal-400",   bg:"bg-teal-800/50",   border:"border-teal-700/40"   },
//     { icon: Bus,             label: "Bus Tracking",    sub: "Live GPS tracking",    accent:"text-sky-400",    bg:"bg-sky-800/50",    border:"border-sky-700/40"    },
//     { icon: CreditCard,      label: "Payments",        sub: "Fees & receipts",      accent:"text-indigo-400", bg:"bg-indigo-800/50", border:"border-indigo-700/40" },
//   ];
//   return (
//     <section className="py-24 bg-slate-900">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="text-center mb-14">
//           <SectionLabel label="Quick Access" />
//           <FadeUp>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
//               Your school. <em className="not-italic text-blue-400">One dashboard.</em>
//             </h2>
//           </FadeUp>
//         </div>
//         <StaggerList className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.06}>
//           {items.map((item) => {
//             const Icon = item.icon;
//             return (
//               <motion.button key={item.label} variants={staggerItem}
//                 className={`group rounded-2xl bg-blue-900/35 border ${item.border} p-5 text-left hover:-translate-y-1 hover:bg-blue-900/55 transition-all duration-200`}>
//                 <div className={`h-11 w-11 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition`}>
//                   <Icon className={`h-5 w-5 ${item.accent}`} />
//                 </div>
//                 <div className="font-semibold text-sm text-white">{item.label}</div>
//                 <div className="text-xs text-blue-400/55 mt-0.5">{item.sub}</div>
//                 <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${item.accent} opacity-0 group-hover:opacity-100 transition`}>
//                   Open <ArrowRight className="h-3 w-3" />
//                 </div>
//               </motion.button>
//             );
//           })}
//         </StaggerList>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ ACADEMICS */
// function Academics() {
//   const [active, setActive] = useState(0);
//   const tabs = ["Junior School","Senior School","STEM","Arts","ICT"];
//   const data = [
//     { title:"Grades 6–8 · Foundation Years",   badge:"Foundation",  desc:"Building inquiry, critical thinking and a love of learning. Cambridge Lower Secondary aligned with project-based modules in coding, design and global studies.", bullets:["Personalised learning pathways","Mandatory second language","Weekly outdoor science","Mentor-based pastoral care"], img:IMGS.students, icon:BookOpen     },
//     { title:"Grades 9–12 · Diploma Programme", badge:"Advanced",    desc:"IGCSE, IB Diploma and AP courses with university counseling from Grade 9. Graduates accepted at Cambridge, MIT, Stanford and beyond.",                      bullets:["Triple curriculum: IB, IGCSE, AP","Senior research thesis","Dual enrollment programs","Ivy mentor 1:1 sessions"],          img:IMGS.library,  icon:GraduationCap },
//     { title:"STEM · Innovation Pods",          badge:"Specialist",  desc:"Robotics, biotech, AI, aerospace and renewable-energy research labs led by working scientists in residence.",                                               bullets:["Maker space + 3D printing","Mars Habitat simulator","AI/ML curriculum from Grade 7","Student patent program"],                  img:IMGS.stem,     icon:Microscope    },
//     { title:"Arts & Humanities Centre",        badge:"Creative",    desc:"Conservatory-grade programs in music, theater, visual art, film and creative writing with annual showcases.",                                              bullets:["Recording studio & film lab","Visiting artist residencies","Literary magazine & podcast","Black-box theater"],                     img:IMGS.arts,     icon:Music         },
//     { title:"ICT & Digital Literacy",          badge:"Future-Ready",desc:"Cyber-security, ethical AI, data science and game development. Every student graduates fluent in computational thinking.",                                  bullets:["1:1 device programme","Capture-the-flag league","Esports varsity team","Ethics-of-AI seminar"],                                     img:IMGS.lab2,     icon:Cpu           },
//   ];
//   return (
//     <section className="py-24 bg-blue-950">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="text-center mb-12">
//           <SectionLabel label="Academics" />
//           <FadeUp>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
//               A curriculum <em className="not-italic text-blue-400">without ceilings.</em>
//             </h2>
//           </FadeUp>
//         </div>
//         <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-2 mb-10">
//           {tabs.map((t, i) => (
//             <button key={t} onClick={() => setActive(i)}
//               className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${active===i?"bg-blue-600 text-white":"bg-blue-900/50 border border-blue-700/40 text-blue-300/70 hover:text-blue-200 hover:border-blue-600/40"}`}>
//               {t}
//             </button>
//           ))}
//         </FadeUp>
//         <AnimatePresence mode="wait">
//           <motion.div key={active}
//             initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.35 }}
//             className="grid lg:grid-cols-2 gap-10 items-center bg-blue-900/30 border border-blue-800/40 rounded-3xl p-8">
//             <div>
//               <span className="inline-block rounded-full bg-blue-700/40 border border-blue-600/40 text-blue-300 text-xs font-medium px-3 py-1 tracking-wider uppercase mb-5">{data[active].badge}</span>
//               <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4 leading-snug">{data[active].title}</h3>
//               <p className="text-sm text-blue-200/60 leading-relaxed mb-6">{data[active].desc}</p>
//               <ul className="space-y-3 mb-8">
//                 {data[active].bullets.map((b, bi) => (
//                   <motion.li key={b} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: bi * 0.07 }}
//                     className="flex items-start gap-3 text-sm text-blue-200/65">
//                     <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />{b}
//                   </motion.li>
//                 ))}
//               </ul>
//               <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 text-sm font-semibold transition-colors">
//                 Download Syllabus <ArrowRight className="h-4 w-4" />
//               </button>
//             </div>
//             <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
//               <img src={data[active].img} alt={data[active].title} className="h-full w-full object-cover opacity-80" />
//               <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
//               <div className="absolute bottom-5 left-5 bg-blue-700/80 backdrop-blur-sm border border-blue-600/40 rounded-xl p-3">
//                 {(() => { const I = data[active].icon; return <I className="h-6 w-6 text-blue-200" />; })()}
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ TESTIMONIALS */
// function Testimonials() {
//   const [active, setActive] = useState(0);
//   const items = [
//     { name:"Aria Chen",         role:"Class of 2024 · MIT Admitted", quote:"Rochas taught me to think like an engineer and lead like a humanitarian. The robotics lab basically wrote my college essay.", img:IMGS.students },
//     { name:"Mr. & Mrs. Okafor", role:"Parents of three students",    quote:"Three children, three completely different paths. Rochas somehow made each of them feel like the most important student in the building.", img:IMGS.campus  },
//     { name:"Liam Park",         role:"Alumni · Founder, Helio AI",   quote:"I came in shy and obsessed with coding. I left with a startup, a Cambridge offer, and friends from 12 countries.", img:IMGS.stem    },
//     { name:"Dr. Priya Sharma",  role:"Parent · Surgeon",             quote:"The teacher mentorship is unlike anywhere I've seen. My daughter has weekly 1:1 time with her advisor — and it shows.", img:IMGS.library },
//   ];
//   return (
//     <section className="py-24 bg-slate-900">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="text-center mb-14">
//           <SectionLabel label="Voices of Rochas Foundation" />
//           <FadeUp>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
//               Loved by students.<br /><em className="not-italic text-blue-400">Trusted by families.</em>
//             </h2>
//           </FadeUp>
//         </div>
//         <StaggerList className="grid md:grid-cols-2 gap-5" stagger={0.1}>
//           {items.map((item, i) => (
//             <motion.button key={item.name} variants={staggerItem} onClick={() => setActive(i)}
//               className={`text-left rounded-2xl border p-6 transition-all duration-300 ${active===i?"bg-blue-700/40 border-blue-500/50":"bg-blue-900/30 border-blue-800/40 hover:border-blue-700/50 hover:bg-blue-900/45"}`}>
//               <div className="flex gap-1 mb-4">
//                 {Array.from({length:5}).map((_,k) => (
//                   <Star key={k} className={`h-4 w-4 fill-current ${active===i?"text-blue-300":"text-yellow-500/80"}`} />
//                 ))}
//               </div>
//               <p className={`font-display text-lg leading-snug italic mb-5 ${active===i?"text-white":"text-blue-100/80"}`}>"{item.quote}"</p>
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-blue-700/50">
//                   <img src={item.img} alt={item.name} className="h-full w-full object-cover opacity-80" />
//                 </div>
//                 <div>
//                   <div className={`text-sm font-semibold ${active===i?"text-white":"text-blue-100/80"}`}>{item.name}</div>
//                   <div className={`text-xs ${active===i?"text-blue-300/70":"text-blue-400/55"}`}>{item.role}</div>
//                 </div>
//               </div>
//             </motion.button>
//           ))}
//         </StaggerList>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ GALLERY */
// function Gallery() {
//   const [open, setOpen] = useState(null);
//   const photos = [
//     { src:IMGS.campus,   label:"Campus Aerial"   },
//     { src:IMGS.stem,     label:"STEM Laboratory" },
//     { src:IMGS.arts,     label:"Performing Arts" },
//     { src:IMGS.sports,   label:"Sports Complex"  },
//     { src:IMGS.library,  label:"Digital Library" },
//     { src:IMGS.students, label:"Student Life"    },
//   ];
//   return (
//     <section className="py-24 bg-blue-950">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="text-center mb-14">
//           <SectionLabel label="Life at Rochas Foundation" />
//           <FadeUp>
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
//               Inside <em className="not-italic text-blue-400">our world.</em>
//             </h2>
//           </FadeUp>
//         </div>
//         <StaggerList className="grid grid-cols-2 md:grid-cols-3 gap-3" stagger={0.07}>
//           {photos.map((photo, i) => (
//             <motion.button key={i} variants={{
//               hidden:  { opacity: 0, scale: 0.9 },
//               visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
//             }} onClick={() => setOpen(photo.src)}
//               className={`group relative overflow-hidden rounded-2xl border border-blue-800/30 ${i===0?"md:col-span-2 md:row-span-2":""}`}>
//               <div className={`${i===0?"aspect-[16/10]":"aspect-square"} overflow-hidden`}>
//                 <img src={photo.src} alt={photo.label}
//                   className="h-full w-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
//                 <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition duration-300">
//                   <p className="text-[10px] text-blue-300 uppercase tracking-wider font-medium">View</p>
//                   <p className="text-white font-semibold text-sm">{photo.label}</p>
//                 </div>
//               </div>
//             </motion.button>
//           ))}
//         </StaggerList>
//       </div>
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={() => setOpen(null)}
//             className="fixed inset-0 z-[200] bg-blue-950/96 backdrop-blur-sm flex items-center justify-center p-4">
//             <motion.img initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
//               transition={{ ease: [0.22,1,0.36,1], duration: 0.4 }}
//               src={open} alt="" className="max-h-[90vh] max-w-full rounded-2xl" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ VIRTUAL TOUR */
// function VirtualTour() {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
//   const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
//   return (
//     <section ref={sectionRef} className="py-24 bg-slate-900">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="relative rounded-3xl overflow-hidden bg-blue-900/40 border border-blue-800/40 p-10 md:p-16">
//           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage:"linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)", backgroundSize:"50px 50px" }} />
//           <div className="relative grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <SectionLabel label="360° Experience" />
//               <FadeUp>
//                 <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
//                   Step inside<br /><em className="not-italic text-blue-400">Rochas Foundation.</em>
//                 </h2>
//               </FadeUp>
//               <FadeUp delay={0.1}>
//                 <p className="text-base text-blue-200/60 leading-relaxed max-w-md mb-8">
//                   Wander our STEM pods, theater, sports complex and library — all from your sofa. Available 24/7 in immersive 360°.
//                 </p>
//                 <button className="inline-flex items-center gap-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 text-sm font-semibold transition-colors">
//                   <Play className="h-4 w-4 fill-white text-white" /> Start Virtual Tour
//                 </button>
//               </FadeUp>
//             </div>
//             <FadeFrom dir="right" className="aspect-video rounded-2xl overflow-hidden relative group cursor-pointer border border-blue-700/30">
//               <motion.img src={IMGS.campus} alt="Virtual tour preview"
//                 style={{ y: bgY }}
//                 className="h-[116%] w-full object-cover absolute inset-0 -top-[8%] opacity-60 group-hover:opacity-80 transition-all duration-700" />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="h-20 w-20 rounded-full bg-blue-600/80 border border-blue-500/50 flex items-center justify-center group-hover:bg-blue-500/90 transition">
//                   <Play className="h-8 w-8 fill-white text-white ml-1" />
//                 </div>
//               </div>
//               <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-blue-950/70 border border-blue-800/50 px-3 py-1.5">
//                 <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
//                 <span className="text-[9px] uppercase tracking-widest text-blue-300/70 font-medium">Live Preview</span>
//               </div>
//             </FadeFrom>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ NEWSLETTER */
// function Newsletter() {
//   const [done, setDone] = useState(false);
//   const [email, setEmail] = useState("");
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: false, margin: '-60px 0px', amount: 0.3 });
//   return (
//     <section className="py-24 bg-blue-950">
//       <div className="mx-auto max-w-2xl px-6">
//         <motion.div ref={ref}
//           initial={{ opacity: 0, scale: 0.94, y: 32 }}
//           animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
//           transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//           className="relative rounded-3xl bg-blue-900/40 border border-blue-800/40 p-10 md:p-14 text-center overflow-hidden">
//           <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-blue-700/10 pointer-events-none" />
//           <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-blue-800/10 pointer-events-none" />
//           <div className="relative">
//             <div className="h-14 w-14 rounded-2xl bg-blue-700/60 border border-blue-600/40 flex items-center justify-center mx-auto mb-6">
//               <Sparkles className="h-6 w-6 text-blue-300" />
//             </div>
//             <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Stay in the loop.</h2>
//             <p className="text-base text-blue-300/55 leading-relaxed mb-8">
//               Monthly updates on admissions, events and student achievements.<br />No spam — just what matters.
//             </p>
//             {done ? (
//               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
//                 className="inline-flex items-center gap-2 rounded-xl bg-emerald-900/40 border border-emerald-700/40 text-emerald-400 px-6 py-3 font-semibold text-sm">
//                 <CheckCircle2 className="h-4 w-4" /> Welcome aboard! Check your inbox.
//               </motion.div>
//             ) : (
//               <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//                 <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
//                   className="flex-1 rounded-xl border border-blue-700/40 bg-blue-950/60 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-500/50 outline-none focus:border-blue-500/60 transition" />
//                 <button onClick={() => email && setDone(true)}
//                   className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors">
//                   Subscribe
//                 </button>
//               </div>
//             )}
//             <p className="text-xs text-blue-500/50 mt-4">Join 4,200+ members of the Rochas community. Unsubscribe anytime.</p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════════════ ROOT */
// export default function Home() {
//   return (
//     <>
//       <Hero />
//       <Ticker />
//       <Principal />
//       <WhyChoose />
//       <Stats />
//       <Events />
//       <Portal />
//       <Academics />
//       <Testimonials />
//       <Gallery />
//       <VirtualTour />
//       <Newsletter />
//     </>
//   );
// }

















































































































































import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion, useScroll, useTransform, useSpring, useInView, AnimatePresence,
} from "framer-motion";
import {
  ArrowRight, Play, MapPin, Sparkles, GraduationCap, Trophy,
  BookOpen, Compass, Bus, Star, ChevronRight, Search,
  User, Users, Library, CalendarDays, UtensilsCrossed, CreditCard,
  Quote, ArrowUpRight, CheckCircle2, Globe, Award, Microscope, Music, Cpu,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   IMAGES — Replace each value with your own image path or URL.
───────────────────────────────────────────────────────────────────────────── */
const IMGS = {
  hero:      "/images/hero.jpg",
  principal: "/images/principal.jpg",
  founder:   "/images/founder.jpg",
  admin:     "/images/admin.jpg",
  stem:      "/images/stem.jpg",
  sports:    "/images/sports.jpg",
  library:   "/images/library.jpg",
  arts:      "/images/arts.jpg",
  campus:    "/images/campus.jpg",
  students:  "/images/students.jpg",
  grad:      "/images/grad.jpg",
  lab2:      "/images/lab2.jpg",
};

const CUSTOM_HERO_IMAGE = "";
const HERO_BG = CUSTOM_HERO_IMAGE || IMGS.hero;
const NAV_H = 64;

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
      <DrawLine className={`h-px w-8 ${light ? "bg-blue-300" : "bg-blue-400"}`} />
      <p className={`text-[10px] uppercase tracking-widest font-semibold ${light ? "text-blue-300" : "text-blue-400"}`}>
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
  const yBgFar   = useTransform(smoothProgress, [0, 1], [0, 180]);
  const yBgMid   = useTransform(smoothProgress, [0, 1], [0, 90]);
  const yContent = useTransform(smoothProgress, [0, 1], [0, -48]);
  const opacityContent = useTransform(smoothProgress, [0, 0.55], [1, 0]);
  const scaleBg  = useTransform(smoothProgress, [0, 1], [1.08, 1]);
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  }, []);
  const cards = [
    { value: "98%",  label: "University Placement", icon: GraduationCap, pos: { top: "6%",     left: "2%" }  },
    { value: "42",   label: "Nations Represented",  icon: Globe,          pos: { top: "4%",     right: "2%" } },
    { value: "320+", label: "Global Awards",         icon: Award,          pos: { bottom: "18%", left: "0%" }  },
    { value: "12",   label: "STEM Laboratories",     icon: Microscope,     pos: { bottom: "4%",  right: "2%" } },
  ];
  return (
    <section ref={ref} onMouseMove={onMouseMove}
      className="relative flex items-center overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800"
      style={{ minHeight: "100svh", paddingTop: NAV_H }}>
      <motion.div style={{ y: yBgFar, scale: scaleBg }} className="absolute inset-0 origin-center">
        <img src={HERO_BG} alt="campus" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div style={{ y: yBgMid }} className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-r from-blue-900/96 via-blue-900/82 to-blue-800/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent" />
      </motion.div>
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <motion.div style={{ y: yContent, opacity: opacityContent }}
        className="relative mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-2 gap-14 items-center py-20">
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-blue-200/90">Admissions Open · 2025–2026</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl xl:text-[72px] font-bold leading-[1.04] text-white mb-6">
            Where curious<br /><em className="not-italic text-blue-300">minds</em> shape<br />the future.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            className="text-base md:text-lg text-blue-100/70 max-w-lg leading-relaxed mb-9">
            A premier international secondary school for Grades&nbsp;6–12, blending Cambridge &amp; IB curricula
            with cutting-edge STEM, performing arts, and global citizenship.
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
            {["Cambridge Certified", "IB World School", "ISO 21001"].map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-300 flex-shrink-0" />
                <span className="text-xs text-blue-200/70">{b}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="relative h-[420px] hidden lg:block">
          <motion.div initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 90 }}
            className="absolute top-1/2 left-1/2 z-10"
            style={{ transform: "translate(-50%,-50%)", animation: "heroFloat 5s ease-in-out infinite" }}>
            <div className="h-36 w-36 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400/40 flex flex-col items-center justify-center">
              <GraduationCap className="h-10 w-10 text-white mb-1" />
              <span className="text-white font-bold text-[10px] tracking-widest text-center leading-tight px-2">ROCHAS<br />FOUNDATION</span>
            </div>
          </motion.div>
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.label}
                initial={{ opacity: 0, scale: 0.82, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1, type: "spring" }}
                style={{ position: "absolute", ...card.pos,
                  transform: `translate(${mouse.x * (i % 2 ? 13 : -13)}px,${mouse.y * (i % 2 ? 10 : -10)}px)`,
                  transition: "transform 0.12s ease-out" }}
                className="bg-blue-800/70 backdrop-blur-md border border-blue-600/40 rounded-2xl p-4 min-w-[158px]">
                <div className="h-8 w-8 rounded-lg bg-blue-700/50 flex items-center justify-center mb-2">
                  <Icon className="h-4 w-4 text-blue-300" />
                </div>
                <div className="font-display font-bold text-2xl text-white leading-none">{card.value}</div>
                <div className="text-xs text-blue-300/70 mt-1">{card.label}</div>
              </motion.div>
            );
          })}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 420">
            {[[85,70,250,210],[415,60,250,210],[78,315,250,210],[412,375,250,210]].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(96,165,250,0.15)" strokeWidth="1" strokeDasharray="4 8" />
            ))}
          </svg>
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
      <style>{`
        @keyframes heroFloat{0%,100%{transform:translate(-50%,-50%) translateY(0px)}50%{transform:translate(-50%,-50%) translateY(-11px)}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════ TICKER */
function Ticker() {
  const items = [
    "🏆 5 students qualify for International Math Olympiad finals",
    "🎭 Spring Musical 'Hadestown' — Tickets on Sale May 18",
    "🌍 Model UN team takes 1st place in Geneva",
    "📚 Library extended hours during finals week",
    "🚀 Robotics team advances to World Championship",
    "🎓 Record 98% university acceptance rate achieved",
  ];
  return (
    <div className="bg-blue-800 border-y border-blue-700/40 py-2.5 overflow-hidden">
      <div className="flex gap-14 whitespace-nowrap" style={{ animation: "ticker 36s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm text-blue-200/70">
            <span className="h-1 w-1 rounded-full bg-blue-400 flex-shrink-0" />{item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════ FOUNDER MODAL */
function FounderModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  const paragraphs = [
    "Dear Rochas Family,",
    "When I established the Rochas Foundation, I had a simple but profound vision: to provide quality education to every child, regardless of their background or circumstances. I believe that education is the greatest equalizer — a tool that can transform not just individuals, but entire communities and nations.",
    "Over the years, I have watched thousands of young people walk through our gates with dreams in their eyes. Some came from humble beginnings, others faced tremendous obstacles. But every single one of them carried within themselves a spark of greatness.",
    "Today, I am proud to say that Rochas Foundation College has become a beacon of hope — a place where academic excellence meets character development, where curiosity is celebrated, and where every student is empowered to become the best version of themselves.",
    "To our students: Never forget that you are capable of extraordinary things. Your background does not define your future — your determination, discipline, and dreams do.",
    "To our parents: Thank you for trusting us with your most precious treasures. We will never take that responsibility lightly.",
    "The journey continues. Together, we are building a generation of leaders who will change Africa and the world.",
  ];
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-blue-900/88 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          className="bg-gradient-to-br from-blue-800 to-blue-900 border border-blue-600/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 rounded-t-3xl p-8 pb-14 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
            <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center text-white/70 hover:text-white transition">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            <div className="relative flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl overflow-hidden ring-2 ring-blue-400/50 flex-shrink-0">
                <img src={IMGS.founder} alt="Chief Rochas Okorocha" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-blue-300/80 font-medium mb-1">founder</p>
                <p className="font-display font-bold text-xl text-white">Chief Rochas Okorocha</p>
              </div>
            </div>
          </div>
          <div className="mx-6 -mt-8 relative z-10">
            <div className="rounded-2xl bg-blue-600 border border-blue-500/50 p-5">
              <Quote className="h-5 w-5 text-blue-300/40 mb-2" />
              <p className="font-display font-semibold text-white text-lg leading-snug">"Education is the greatest gift you can give to a child."</p>
            </div>
          </div>
          <div className="px-8 py-7 space-y-4 text-sm text-blue-200/70 leading-relaxed">
            {paragraphs.map((p, i) => <p key={i} className={i === 0 ? "font-medium text-blue-100" : ""}>{p}</p>)}
            <div className="pt-4 border-t border-blue-700/50">
              <p className="font-display font-bold text-white text-base">Chief Rochas Okorocha</p>
              <p className="text-xs text-blue-400/60 mt-0.5">Founder, Rochas Foundation</p>
            </div>
          </div>
          <div className="px-8 pb-8">
            <button onClick={onClose} className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 font-semibold text-sm transition-colors">Close Message</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════ PRINCIPAL MODAL */
function PrincipalModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  const paragraphs = [
    "Dear Parents, Guardians, and Members of our School Community,",
    "It is with great pride and deep gratitude that I address you as Head of School at Rochas Foundation College. This institution is not merely a place of academic instruction — it is a living community built on the conviction that every young person carries within them an extraordinary capacity for growth, contribution, and leadership.",
    "When I walk through our corridors — past the STEM labs buzzing with invention, the theater vibrating with rehearsal, the library humming with curiosity — I am reminded daily of why we do this work. Education, at its finest, is not about filling vessels. It is about lighting fires.",
    "Our students have stood on international stages — winning STEM olympiads, debating at Model UN in Geneva, publishing original research. These are the result of a culture we have deliberately built: one that refuses to settle for ordinary.",
    "But our mission goes deeper than trophies and university acceptances. We are here to raise citizens of conscience — young men and women who understand that privilege carries responsibility.",
    "To our students: you are the reason we are here. Come with your questions, your struggles, your wildest ideas. To our families: thank you for the sacred trust you place in us every morning.",
  ];
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-blue-900/88 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          className="bg-gradient-to-br from-blue-800 to-blue-900 border border-blue-600/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 rounded-t-3xl p-8 pb-14 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
            <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center text-white/70 hover:text-white transition">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            <div className="relative flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl overflow-hidden ring-2 ring-blue-400/50 flex-shrink-0">
                <img src={IMGS.principal} alt="Dr. Ifeoma Bernice" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-blue-300/80 font-medium mb-1">principal</p>
                <p className="font-display font-bold text-xl text-white">Dr. Ifeoma Bernice</p>
              </div>
            </div>
          </div>
          <div className="mx-6 -mt-8 relative z-10">
            <div className="rounded-2xl bg-blue-600 border border-blue-500/50 p-5">
              <Quote className="h-5 w-5 text-blue-300/40 mb-2" />
              <p className="font-display font-semibold text-white text-lg leading-snug">"We don't just teach subjects. We cultivate purpose."</p>
            </div>
          </div>
          <div className="px-8 py-7 space-y-4 text-sm text-blue-200/70 leading-relaxed">
            {paragraphs.map((p, i) => <p key={i} className={i === 0 ? "font-medium text-blue-100" : ""}>{p}</p>)}
            <p className="font-semibold text-blue-100">Together, we are not just building a school. We are building a generation.</p>
            <div className="pt-4 border-t border-blue-700/50">
              <p className="font-display font-bold text-white text-base">Dr. Ifeoma Bernice</p>
              <p className="text-xs text-blue-400/60 mt-0.5">Principal, Rochas Foundation College</p>
            </div>
          </div>
          <div className="px-8 pb-8">
            <button onClick={onClose} className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 font-semibold text-sm transition-colors">Close Message</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════ ADMIN MODAL */
function AdminModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  const paragraphs = [
    "Dear Rochas Community,",
    "As the Administrator of Rochas Foundation College, my role is to ensure that every day runs smoothly — that our teachers have what they need to teach, our students have what they need to learn, and our parents feel supported every step of the way.",
    "Behind every great school is a dedicated team of professionals who work tirelessly to create an environment where excellence can flourish. From our facilities team who keep our campus beautiful, to our kitchen staff who prepare nutritious meals, to our administrative team who handle everything from admissions to transcripts — we are all united by one mission: serving our students.",
    "I have seen firsthand the transformation that happens when a child is given quality education in a nurturing environment. The confidence that grows, the friendships that form, the dreams that take flight — it is truly magical.",
    "My door is always open. Whether you have a question about fees, need assistance with transportation, or just want to share feedback — please don't hesitate to reach out. We are here for you.",
    "Together, let's continue to build a school that we can all be proud of — one student, one family, one success story at a time.",
  ];
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-blue-900/88 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          className="bg-gradient-to-br from-blue-800 to-blue-900 border border-blue-600/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 rounded-t-3xl p-8 pb-14 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
            <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center text-white/70 hover:text-white transition">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            <div className="relative flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl overflow-hidden ring-2 ring-blue-400/50 flex-shrink-0">
                <img src={IMGS.admin} alt="Mr. Emeka Okafor" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-blue-300/80 font-medium mb-1">administrator</p>
                <p className="font-display font-bold text-xl text-white">Mr. Emeka Okafor</p>
              </div>
            </div>
          </div>
          <div className="mx-6 -mt-8 relative z-10">
            <div className="rounded-2xl bg-blue-600 border border-blue-500/50 p-5">
              <Quote className="h-5 w-5 text-blue-300/40 mb-2" />
              <p className="font-display font-semibold text-white text-lg leading-snug">"Service to our students is service to our future."</p>
            </div>
          </div>
          <div className="px-8 py-7 space-y-4 text-sm text-blue-200/70 leading-relaxed">
            {paragraphs.map((p, i) => <p key={i} className={i === 0 ? "font-medium text-blue-100" : ""}>{p}</p>)}
            <div className="pt-4 border-t border-blue-700/50">
              <p className="font-display font-bold text-white text-base">Mr. Emeka Okafor</p>
              <p className="text-xs text-blue-400/60 mt-0.5">Administrator, Rochas Foundation College</p>
            </div>
          </div>
          <div className="px-8 pb-8">
            <button onClick={onClose} className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 font-semibold text-sm transition-colors">Close Message</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════ LEADERSHIP CIRCLE */
/* ══════════════════════════════════════════════════
   LEADERSHIP SHOWCASE 5.0 - Premium Version
══════════════════════════════════════════════════ */
function LeadershipShowcase() {
  const [openFounder, setOpenFounder] = useState(false);
  const [openPrincipal, setOpenPrincipal] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const founderY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  const leaders = [
    {
      name: "Dr. Ifeoma Bernice",
      role: "Principal",
      image: IMGS.principal,
      message: "We don't just teach subjects. We cultivate purpose. Every student leaves here ready to change the world.",
      achievements: ["PhD - Harvard", "20+ Years Experience", "Global Educator Award"],
      action: () => setOpenPrincipal(true),
    },
    {
      name: "Iwueke Kelechi",
      role: "Administrator",
      image: IMGS.admin,
      message: "Creating an environment where both students and staff can thrive is my daily mission. Service to our students is service to our future.",
      achievements: ["MBA - Lagos Business School", "15+ Years Leadership", "Excellence Award"],
      action: () => setOpenAdmin(true),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 bg-[#1a4fd6]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
    >
      {/* Animated mesh gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-200px] top-[-150px] h-[700px] w-[700px] rounded-full bg-blue-600/20 blur-[180px]"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 120, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-150px] right-[-200px] h-[700px] w-[700px] rounded-full bg-cyan-500/15 blur-[200px]"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-800/20 blur-[150px]"
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(147,197,253,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,.25) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59,130,246,0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <FadeFrom dir="left" className="flex items-center gap-3 mb-6 justify-center">
            <DrawLine className="h-px w-8 bg-blue-400" />
            <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400">Our Leadership</p>
            <DrawLine className="h-px w-8 bg-blue-400" />
          </FadeFrom>
          <FadeUp>
            <h2 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-white mb-4">
              Meet the{" "}
              <span
                className="bg-gradient-to-r from-blue-300 via-white to-cyan-300 bg-clip-text text-transparent"
              >
                visionaries
              </span>
              <br />
              <span className="text-white/90">behind Rochas.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-blue-200/50 mt-6 max-w-2xl mx-auto text-base leading-relaxed">
              The dedicated leaders shaping the future of every student at Rochas Foundation College.
            </p>
          </FadeUp>
        </div>

        {/* Floating Stats */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mb-24">
            {[
              { end: 10000, suffix: "+", label: "Students Empowered" },
              { end: 20, suffix: "+", label: "Years of Excellence" },
              { end: 98, suffix: "%", label: "Success Rate" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                className="text-center rounded-2xl bg-blue-900/30 border border-blue-700/30 backdrop-blur-sm px-4 py-5"
              >
                <div className="font-display text-4xl font-bold text-white">
                  {stat.end.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-blue-300/60 text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Founder Hero Card */}
        <motion.div style={{ y: founderY }} className="max-w-5xl mx-auto mb-8">
          <FadeUp>
            <div className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-white/5 backdrop-blur-md transition-all duration-700 hover:border-blue-400/40 hover:shadow-[0_30px_80px_rgba(37,99,235,0.3)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59,130,246,0.2), transparent 60%)`,
                }}
              />

              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-[480px] overflow-hidden">
                  <img
                    src={IMGS.founder}
                    alt="Chief Rochas Okorocha"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020d1f] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020d1f]/50" />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-6 left-6 rounded-full bg-blue-600/30 backdrop-blur-sm px-4 py-2 border border-blue-400/30"
                  >
                    <span className="text-xs font-semibold text-blue-200">🏆 Founder & Visionary</span>
                  </motion.div>
                  <div className="absolute bottom-6 left-6">
                    <p className="text-[10px] uppercase tracking-widest text-blue-400/70 font-medium mb-1">Founder</p>
                    <p className="font-display font-bold text-white text-xl">Chief Rochas Okorocha</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <span className="uppercase tracking-[5px] text-blue-400 text-xs font-semibold mb-4">Founder</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                    Chief Rochas Okorocha
                  </h3>
                  <div className="mt-6">
                    <Quote className="h-7 w-7 text-blue-400/40 mb-3" />
                    <p className="text-blue-200/70 leading-relaxed text-base">
                      "Education is the greatest gift you can give to a child. Every child deserves quality education regardless of their background. This foundation is my commitment to that belief."
                    </p>
                  </div>

                  {/* Timeline with glowing nodes */}
                  <div className="mt-8 space-y-4 relative">
                    <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-blue-400/30 to-transparent" />
                    {[
                      { year: "1998", text: "Started Educational Vision" },
                      { year: "2005", text: "Expanded Programs Nationwide" },
                      { year: "2012", text: "Founded Rochas Foundation College" },
                      { year: "2024", text: "10,000+ Students Empowered" },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-sm pl-1"
                      >
                        <div
                          className="h-2 w-2 rounded-full bg-blue-400 flex-shrink-0 relative z-10"
                          style={{ boxShadow: "0 0 10px rgba(96,165,250,0.8)" }}
                        />
                        <span className="text-blue-400 font-mono text-xs w-10 flex-shrink-0">{item.year}</span>
                        <span className="text-blue-200/60">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={() => setOpenFounder(true)}
                    className="mt-10 w-fit inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white px-7 py-3.5 text-sm font-semibold transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                  >
                    Read Full Story <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </FadeUp>
        </motion.div>

        {/* Premium Divider */}
        <FadeUp delay={0.1}>
          <div className="flex items-center justify-center my-20">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-500" />
            <div
              className="mx-6 h-3 w-3 rounded-full bg-blue-400"
              style={{ boxShadow: "0 0 30px rgba(59,130,246,0.8)" }}
            />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
        </FadeUp>

        {/* Quote Banner */}
        <FadeUp delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-20 px-4">
            <p className="text-2xl md:text-3xl italic text-white/70 leading-relaxed font-display">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
            </p>
            <p className="text-blue-400/50 mt-4 text-sm">— Chief Rochas Okorocha</p>
          </div>
        </FadeUp>

        {/* Principal & Admin Cards */}
        <div className="grid gap-8 md:grid-cols-2 mt-4">
          {leaders.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ rotateX: 4, rotateY: 8, scale: 1.02 }}
              style={{ transformStyle: "preserve-3d" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 } as any}
              className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-white/5 backdrop-blur-md cursor-pointer hover:border-blue-400/40 hover:shadow-[0_30px_80px_rgba(37,99,235,0.3)] transition-all duration-500"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Image */}
              <div className="h-[320px] overflow-hidden relative">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out"
                  style={{ transform: hoveredCard === idx ? 'scale(1.07)' : 'scale(1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020d1f] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="inline-block rounded-full bg-blue-600/50 backdrop-blur-sm border border-blue-400/30 text-blue-200 text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                    {leader.role}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="font-display text-2xl font-bold text-white">{leader.name}</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {leader.achievements.map((a, i) => (
                    <span key={i} className="text-[11px] bg-blue-800/40 border border-blue-600/30 rounded-full px-3 py-1 text-blue-300">
                      {a}
                    </span>
                  ))}
                </div>
                <p className="text-blue-200/60 mt-5 leading-relaxed text-sm">{leader.message}</p>
                <button
                  onClick={leader.action}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-white hover:gap-3 transition-all duration-300"
                >
                  Read Full Message <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upgraded Marquee */}
        <div className="mt-24 overflow-hidden">
          <div
            className="flex gap-12 whitespace-nowrap text-blue-400/25 text-sm uppercase tracking-widest"
            style={{ animation: "ticker 40s linear infinite" }}
          >
            {[...Array(4)].flatMap(() =>
              ["Excellence", "Leadership", "Character", "Service", "Innovation", "Wisdom", "Compassion", "Faith", "Discipline", "Academic Excellence", "Future Leaders", "Global Citizens", "Integrity"].map((word, i) => (
                <span key={`${word}-${i}`}>{word} &bull;</span>
              ))
            )}
          </div>
        </div>

      </div>

      {openFounder && <FounderModal onClose={() => setOpenFounder(false)} />}
      {openPrincipal && <PrincipalModal onClose={() => setOpenPrincipal(false)} />}
      {openAdmin && <AdminModal onClose={() => setOpenAdmin(false)} />}
    </section>
  );
}










/* ══════════════════════════════════════════════════ PRINCIPAL SECTION */
function Principal() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-blue-800 to-blue-700 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <FadeFrom dir="left" className="relative flex justify-center">
          <div className="absolute top-5 left-5 right-[-20px] bottom-[-20px] rounded-3xl border border-blue-500/30 pointer-events-none" />
          <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden">
            <motion.img src={IMGS.principal} alt="Dr. Ifeoma Bernice"
              style={{ y: imgY }}
              className="h-[115%] w-full object-cover absolute inset-0 -top-[7.5%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 bg-blue-800/80 backdrop-blur-sm border border-blue-600/40 rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-widest text-blue-300 font-medium mb-1">Head of School</p>
              <p className="font-display font-bold text-white text-lg">Dr. Ifeoma Bernice</p>
              <p className="text-xs text-blue-300/60 mt-0.5">PhD — Harvard Graduate School of Education</p>
            </div>
          </div>
        </FadeFrom>
        <div>
          <SectionLabel label="A Message From Our Principal" />
          <FadeUp delay={0.05}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-2">"We don't just teach subjects.</h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-300 italic leading-tight mb-6">We cultivate purpose."</h2>
          </FadeUp>
          <FadeUp delay={0.18}>
            <DrawLine className="h-px w-12 bg-blue-400 mb-6" delay={0.3} />
            <p className="text-base text-blue-200/70 leading-relaxed mb-8">
              Rochas Foundation College is a place where students are challenged to think bigger, act bolder and lead
              with empathy. Every classroom is a launchpad. Every teacher, a mentor. Every student, a future architect of change.
            </p>
            <button onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-500/60 text-blue-300 hover:bg-blue-700/50 hover:text-white px-6 py-3 text-sm font-semibold transition-all">
              Read Full Message <ArrowRight className="h-4 w-4" />
            </button>
          </FadeUp>
        </div>
      </div>
      {open && <PrincipalModal onClose={() => setOpen(false)} />}
    </section>
  );
}

/* ══════════════════════════════════════════════════ WHY CHOOSE */
function WhyChoose() {
  const features = [
    { icon: Microscope, title: "STEM Innovation Labs",  desc: "12 cutting-edge labs for robotics, AI, biotech, and aerospace led by scientists-in-residence.", stat: "12 Labs",       accent: "text-blue-300",   iconBg: "bg-blue-700/60",   border: "border-blue-600/40"   },
    { icon: Trophy,     title: "Sports Academy",         desc: "16 varsity teams with Olympian-level coaching and world-class facilities.",                     stat: "120+ Trophies", accent: "text-sky-300",    iconBg: "bg-sky-700/50",    border: "border-sky-600/40"    },
    { icon: Library,    title: "Digital Library",        desc: "85,000+ volumes, AI-powered research assistants and comprehensive digital archives.",            stat: "85k+ Titles",  accent: "text-indigo-300", iconBg: "bg-indigo-700/50",  border: "border-indigo-600/40" },
    { icon: Music,      title: "Performing Arts Centre", desc: "Conservatory-grade music, theater, dance, and film studio with annual public showcases.",        stat: "8 Stages",     accent: "text-purple-300", iconBg: "bg-purple-700/50", border: "border-purple-600/40"  },
    { icon: Compass,    title: "Career Counseling",      desc: "1:1 mentoring from Ivy League alumni. 98% of graduates placed at top global universities.",      stat: "98% Placed",   accent: "text-blue-300",   iconBg: "bg-blue-700/60",   border: "border-blue-600/40"   },
    { icon: Bus,        title: "Smart Transport",        desc: "GPS-tracked, climate-controlled fleet covering 32 routes with real-time parent notifications.",  stat: "32 Routes",    accent: "text-cyan-300",   iconBg: "bg-cyan-700/50",   border: "border-cyan-600/40"   },
  ];
  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-blue-800 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="text-center mb-14">
          <SectionLabel label="Why Rochas Foundation" />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Built for the world your<br /><em className="not-italic text-blue-300">children will inherit.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} variants={staggerItem}
                className={`group relative rounded-2xl bg-blue-800/40 border ${f.border} p-6 hover:-translate-y-1 transition-all duration-300`}>
                <div className={`h-11 w-11 rounded-xl ${f.iconBg} flex items-center justify-center mb-5`}>
                  <Icon className={`h-5 w-5 ${f.accent}`} />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{f.title}</h3>
                <p className="text-sm text-blue-200/55 leading-relaxed">{f.desc}</p>
                <div className="mt-5 pt-4 border-t border-blue-700/50 flex items-center justify-between">
                  <span className={`text-xs font-medium uppercase tracking-wider ${f.accent}`}>{f.stat}</span>
                  <ArrowUpRight className={`h-4 w-4 text-blue-500 group-hover:${f.accent} transition-colors`} />
                </div>
              </motion.div>
            );
          })}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ STATS */
function AnimCounter({ to, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const s = performance.now(), d = 2000;
        const tick = (t) => {
          const p = Math.min((t - s) / d, 1);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 4))));
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
  const stats = [
    { v: 98,  s: "%", l: "University Acceptance", d: "Ivy & Russell Group destinations", img: IMGS.grad    },
    { v: 320, s: "+", l: "Awards This Decade",     d: "National & international stage",   img: IMGS.sports  },
    { v: 64,  s: "",  l: "Partner Universities",   d: "Across 18 countries worldwide",    img: IMGS.campus  },
    { v: 100, s: "%", l: "Certified Faculty",      d: "75% hold a Masters or PhD degree", img: IMGS.library },
  ];
  return (
    <section className="py-24 bg-gradient-to-b from-blue-800 to-blue-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="By The Numbers" />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              A community that <em className="not-italic text-blue-300">performs.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <motion.div key={s.l} variants={staggerItem}
              className="group relative rounded-2xl overflow-hidden border border-blue-600/40 bg-blue-800/30">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={s.img} alt={s.l}
                  className="h-full w-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-5">
                <div className="font-display text-5xl font-bold text-white leading-none mb-1">
                  <AnimCounter to={s.v} suffix={s.s} />
                </div>
                <div className="font-semibold text-white text-sm mb-1">{s.l}</div>
                <div className="text-xs text-blue-300/60">{s.d}</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ EVENTS */
function Countdown({ target }) {
  const [t, setT] = useState(() => Math.max(0, target.getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setT(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const d=Math.floor(t/86400000), h=Math.floor((t/3600000)%24), m=Math.floor((t/60000)%60), sc=Math.floor((t/1000)%60);
  return (
    <div className="flex gap-2">
      {[{v:d,l:"Days"},{v:h,l:"Hrs"},{v:m,l:"Min"},{v:sc,l:"Sec"}].map((u) => (
        <div key={u.l} className="rounded-xl bg-blue-800/70 border border-blue-600/40 px-3 py-2 min-w-[54px] text-center">
          <div className="font-display font-bold text-2xl text-blue-300 leading-none">{String(u.v).padStart(2,"0")}</div>
          <div className="text-[9px] uppercase tracking-widest text-blue-400/60 mt-1">{u.l}</div>
        </div>
      ))}
    </div>
  );
}

function Events() {
  const [filter, setFilter] = useState("All");
  const cats = ["All","Academic","Sports","Arts","Community"];
  const catStyle = {
    Academic:  { bar:"bg-blue-400",    badge:"bg-blue-700/60 text-blue-300 border-blue-600/40"       },
    Sports:    { bar:"bg-sky-400",     badge:"bg-sky-700/60 text-sky-300 border-sky-600/40"          },
    Arts:      { bar:"bg-purple-400",  badge:"bg-purple-700/60 text-purple-300 border-purple-600/40" },
    Community: { bar:"bg-emerald-400", badge:"bg-emerald-700/60 text-emerald-300 border-emerald-600/40"},
  };
  const events = [
    { d:"MAY 18", t:"Spring Arts Showcase",      c:"Arts",      img:IMGS.arts,     desc:"Annual celebration of student creativity across all disciplines." },
    { d:"MAY 24", t:"Robotics State Final",       c:"Academic",  img:IMGS.stem,     desc:"Our team defends their state championship title." },
    { d:"JUN 02", t:"Inter-School Championships", c:"Sports",    img:IMGS.sports,   desc:"Track, swimming and basketball finals." },
    { d:"JUN 10", t:"Community Service Fair",     c:"Community", img:IMGS.campus,   desc:"100+ partner organisations in attendance." },
    { d:"JUN 14", t:"Open House Day",             c:"Academic",  img:IMGS.students, desc:"Tour our facilities and meet our faculty." },
    { d:"JUN 21", t:"Graduation Ceremony",        c:"Community", img:IMGS.grad,     desc:"Celebrating the Class of 2025." },
  ];
  const filtered = filter === "All" ? events : events.filter(e => e.c === filter);
  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-8 items-end mb-10">
          <div className="lg:col-span-2">
            <SectionLabel label="News & Events" />
            <FadeUp>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                What's happening<br /><em className="not-italic text-blue-300">on campus.</em>
              </h2>
            </FadeUp>
          </div>
          <FadeFrom dir="right">
            <div className="rounded-2xl bg-blue-800/60 border border-blue-600/40 p-6">
              <p className="text-[10px] uppercase tracking-widest text-blue-300/70 font-medium mb-2">Next Major Event</p>
              <p className="font-display font-bold text-white text-lg mb-4">Open House · June 14</p>
              <Countdown target={new Date(Date.now() + 1000 * 60 * 60 * 24 * 12)} />
            </div>
          </FadeFrom>
        </div>
        <FadeUp delay={0.1} className="flex items-center flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400/60" />
            <input placeholder="Search events…"
              className="w-full rounded-xl bg-blue-800/50 border border-blue-600/40 pl-9 pr-3 py-2.5 text-sm text-blue-100 placeholder:text-blue-400/50 outline-none focus:border-blue-400/60 transition" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${filter===c?"bg-blue-500 text-white":"bg-blue-800/50 border border-blue-600/40 text-blue-300/70 hover:text-blue-200 hover:border-blue-500/50"}`}>
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
                  className="group rounded-2xl overflow-hidden bg-blue-800/40 border border-blue-700/40 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={e.img} alt={e.t}
                      className="h-full w-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />
                    <div className="absolute top-3 left-3 rounded-lg bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{e.d}</div>
                    <span className={`absolute top-3 right-3 rounded-full border text-[10px] font-medium px-2.5 py-0.5 ${cs.badge}`}>{e.c}</span>
                  </div>
                  <div className="p-5">
                    <div className={`h-px w-8 ${cs.bar} mb-3`} />
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors mb-2">{e.t}</h3>
                    <p className="text-sm text-blue-300/55 leading-relaxed mb-4">{e.desc}</p>
                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:gap-2 transition-all">
                      View Details <ChevronRight className="h-3.5 w-3.5" />
                    </button>
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

/* ══════════════════════════════════════════════════ PORTAL */
function Portal() {
  const items = [
    { icon: User,            label: "Student Portal",  sub: "Grades & assignments", accent:"text-blue-300",   bg:"bg-blue-700/50",   border:"border-blue-600/40"   },
    { icon: Users,           label: "Parent Login",    sub: "Progress & billing",   accent:"text-sky-300",    bg:"bg-sky-700/50",    border:"border-sky-600/40"    },
    { icon: BookOpen,        label: "e-Learning",      sub: "Courses & materials",  accent:"text-indigo-300", bg:"bg-indigo-700/50", border:"border-indigo-600/40" },
    { icon: CalendarDays,    label: "Calendar",        sub: "Events & schedule",    accent:"text-cyan-300",   bg:"bg-cyan-700/50",   border:"border-cyan-600/40"   },
    { icon: Users,           label: "Staff Directory", sub: "Contact faculty",      accent:"text-blue-300",   bg:"bg-blue-700/50",   border:"border-blue-600/40"   },
    { icon: UtensilsCrossed, label: "Lunch Menu",      sub: "Weekly nutrition",     accent:"text-teal-300",   bg:"bg-teal-700/50",   border:"border-teal-600/40"   },
    { icon: Bus,             label: "Bus Tracking",    sub: "Live GPS tracking",    accent:"text-sky-300",    bg:"bg-sky-700/50",    border:"border-sky-600/40"    },
    { icon: CreditCard,      label: "Payments",        sub: "Fees & receipts",      accent:"text-indigo-300", bg:"bg-indigo-700/50", border:"border-indigo-600/40" },
  ];
  return (
    <section className="py-24 bg-gradient-to-b from-blue-800 to-blue-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Quick Access" />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Your school. <em className="not-italic text-blue-300">One dashboard.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.06}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button key={item.label} variants={staggerItem}
                className={`group rounded-2xl bg-blue-800/35 border ${item.border} p-5 text-left hover:-translate-y-1 hover:bg-blue-800/55 transition-all duration-200`}>
                <div className={`h-11 w-11 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition`}>
                  <Icon className={`h-5 w-5 ${item.accent}`} />
                </div>
                <div className="font-semibold text-sm text-white">{item.label}</div>
                <div className="text-xs text-blue-300/55 mt-0.5">{item.sub}</div>
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

/* ══════════════════════════════════════════════════ ACADEMICS */
function Academics() {
  const [active, setActive] = useState(0);
  const tabs = ["Junior School","Senior School","STEM","Arts","ICT"];
  const data = [
    { title:"Grades 6–8 · Foundation Years",   badge:"Foundation",  desc:"Building inquiry, critical thinking and a love of learning. Cambridge Lower Secondary aligned with project-based modules in coding, design and global studies.", bullets:["Personalised learning pathways","Mandatory second language","Weekly outdoor science","Mentor-based pastoral care"], img:IMGS.students, icon:BookOpen     },
    { title:"Grades 9–12 · Diploma Programme", badge:"Advanced",    desc:"IGCSE, IB Diploma and AP courses with university counseling from Grade 9. Graduates accepted at Cambridge, MIT, Stanford and beyond.",                      bullets:["Triple curriculum: IB, IGCSE, AP","Senior research thesis","Dual enrollment programs","Ivy mentor 1:1 sessions"],          img:IMGS.library,  icon:GraduationCap },
    { title:"STEM · Innovation Pods",          badge:"Specialist",  desc:"Robotics, biotech, AI, aerospace and renewable-energy research labs led by working scientists in residence.",                                               bullets:["Maker space + 3D printing","Mars Habitat simulator","AI/ML curriculum from Grade 7","Student patent program"],                  img:IMGS.stem,     icon:Microscope    },
    { title:"Arts & Humanities Centre",        badge:"Creative",    desc:"Conservatory-grade programs in music, theater, visual art, film and creative writing with annual showcases.",                                              bullets:["Recording studio & film lab","Visiting artist residencies","Literary magazine & podcast","Black-box theater"],                     img:IMGS.arts,     icon:Music         },
    { title:"ICT & Digital Literacy",          badge:"Future-Ready",desc:"Cyber-security, ethical AI, data science and game development. Every student graduates fluent in computational thinking.",                                  bullets:["1:1 device programme","Capture-the-flag league","Esports varsity team","Ethics-of-AI seminar"],                                     img:IMGS.lab2,     icon:Cpu           },
  ];
  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <SectionLabel label="Academics" />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              A curriculum <em className="not-italic text-blue-300">without ceilings.</em>
            </h2>
          </FadeUp>
        </div>
        <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${active===i?"bg-blue-600 text-white":"bg-blue-800/50 border border-blue-600/40 text-blue-300/70 hover:text-blue-200 hover:border-blue-500/40"}`}>
              {t}
            </button>
          ))}
        </FadeUp>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-10 items-center bg-blue-800/30 border border-blue-700/40 rounded-3xl p-8">
            <div>
              <span className="inline-block rounded-full bg-blue-700/40 border border-blue-600/40 text-blue-300 text-xs font-medium px-3 py-1 tracking-wider uppercase mb-5">{data[active].badge}</span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4 leading-snug">{data[active].title}</h3>
              <p className="text-sm text-blue-200/60 leading-relaxed mb-6">{data[active].desc}</p>
              <ul className="space-y-3 mb-8">
                {data[active].bullets.map((b, bi) => (
                  <motion.li key={b} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: bi * 0.07 }}
                    className="flex items-start gap-3 text-sm text-blue-200/65">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />{b}
                  </motion.li>
                ))}
              </ul>
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 text-sm font-semibold transition-colors">
                Download Syllabus <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <img src={data[active].img} alt={data[active].title} className="h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-5 left-5 bg-blue-700/80 backdrop-blur-sm border border-blue-600/40 rounded-xl p-3">
                {(() => { const I = data[active].icon; return <I className="h-6 w-6 text-blue-200" />; })()}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ TESTIMONIALS */
function Testimonials() {
  const [active, setActive] = useState(0);
  const items = [
    { name:"Aria Chen",         role:"Class of 2024 · MIT Admitted", quote:"Rochas taught me to think like an engineer and lead like a humanitarian. The robotics lab basically wrote my college essay.", img:IMGS.students },
    { name:"Mr. & Mrs. Okafor", role:"Parents of three students",    quote:"Three children, three completely different paths. Rochas somehow made each of them feel like the most important student in the building.", img:IMGS.campus  },
    { name:"Liam Park",         role:"Alumni · Founder, Helio AI",   quote:"I came in shy and obsessed with coding. I left with a startup, a Cambridge offer, and friends from 12 countries.", img:IMGS.stem    },
    { name:"Dr. Priya Sharma",  role:"Parent · Surgeon",             quote:"The teacher mentorship is unlike anywhere I've seen. My daughter has weekly 1:1 time with her advisor — and it shows.", img:IMGS.library },
  ];
  return (
    <section className="py-24 bg-gradient-to-b from-blue-800 to-blue-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Voices of Rochas Foundation" />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Loved by students.<br /><em className="not-italic text-blue-300">Trusted by families.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid md:grid-cols-2 gap-5" stagger={0.1}>
          {items.map((item, i) => (
            <motion.button key={item.name} variants={staggerItem} onClick={() => setActive(i)}
              className={`text-left rounded-2xl border p-6 transition-all duration-300 ${active===i?"bg-blue-700/40 border-blue-500/50":"bg-blue-800/30 border-blue-700/40 hover:border-blue-600/50 hover:bg-blue-800/45"}`}>
              <div className="flex gap-1 mb-4">
                {Array.from({length:5}).map((_,k) => (
                  <Star key={k} className={`h-4 w-4 fill-current ${active===i?"text-blue-300":"text-yellow-500/80"}`} />
                ))}
              </div>
              <p className={`font-display text-lg leading-snug italic mb-5 ${active===i?"text-white":"text-blue-100/80"}`}>"{item.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border border-blue-600/50">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover opacity-80" />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${active===i?"text-white":"text-blue-100/80"}`}>{item.name}</div>
                  <div className={`text-xs ${active===i?"text-blue-300/70":"text-blue-400/55"}`}>{item.role}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ GALLERY */
function Gallery() {
  const [open, setOpen] = useState(null);
  const photos = [
    { src:IMGS.campus,   label:"Campus Aerial"   },
    { src:IMGS.stem,     label:"STEM Laboratory" },
    { src:IMGS.arts,     label:"Performing Arts" },
    { src:IMGS.sports,   label:"Sports Complex"  },
    { src:IMGS.library,  label:"Digital Library" },
    { src:IMGS.students, label:"Student Life"    },
  ];
  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Life at Rochas Foundation" />
          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Inside <em className="not-italic text-blue-300">our world.</em>
            </h2>
          </FadeUp>
        </div>
        <StaggerList className="grid grid-cols-2 md:grid-cols-3 gap-3" stagger={0.07}>
          {photos.map((photo, i) => (
            <motion.button key={i} variants={{
              hidden:  { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
            }} onClick={() => setOpen(photo.src)}
              className={`group relative overflow-hidden rounded-2xl border border-blue-700/30 ${i===0?"md:col-span-2 md:row-span-2":""}`}>
              <div className={`${i===0?"aspect-[16/10]":"aspect-square"} overflow-hidden`}>
                <img src={photo.src} alt={photo.label}
                  className="h-full w-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition duration-300">
                  <p className="text-[10px] text-blue-300 uppercase tracking-wider font-medium">View</p>
                  <p className="text-white font-semibold text-sm">{photo.label}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </StaggerList>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[200] bg-blue-900/96 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.img initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ ease: [0.22,1,0.36,1], duration: 0.4 }}
              src={open} alt="" className="max-h-[90vh] max-w-full rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════ VIRTUAL TOUR */
function VirtualTour() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-blue-800 to-blue-700">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-3xl overflow-hidden bg-blue-800/40 border border-blue-700/40 p-10 md:p-16">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage:"linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)", backgroundSize:"50px 50px" }} />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel label="360° Experience" />
              <FadeUp>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
                  Step inside<br /><em className="not-italic text-blue-300">Rochas Foundation.</em>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-base text-blue-200/60 leading-relaxed max-w-md mb-8">
                  Wander our STEM pods, theater, sports complex and library — all from your sofa. Available 24/7 in immersive 360°.
                </p>
                <button className="inline-flex items-center gap-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 text-sm font-semibold transition-colors">
                  <Play className="h-4 w-4 fill-white text-white" /> Start Virtual Tour
                </button>
              </FadeUp>
            </div>
            <FadeFrom dir="right" className="aspect-video rounded-2xl overflow-hidden relative group cursor-pointer border border-blue-600/30">
              <motion.img src={IMGS.campus} alt="Virtual tour preview"
                style={{ y: bgY }}
                className="h-[116%] w-full object-cover absolute inset-0 -top-[8%] opacity-60 group-hover:opacity-80 transition-all duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-blue-600/80 border border-blue-500/50 flex items-center justify-center group-hover:bg-blue-500/90 transition">
                  <Play className="h-8 w-8 fill-white text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-blue-900/70 border border-blue-700/50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-blue-300/70 font-medium">Live Preview</span>
              </div>
            </FadeFrom>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════ NEWSLETTER */
function Newsletter() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px 0px', amount: 0.3 });
  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: 0.94, y: 32 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-blue-800/40 border border-blue-700/40 p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-blue-600/10 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-blue-700/10 pointer-events-none" />
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl bg-blue-700/60 border border-blue-600/40 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-6 w-6 text-blue-300" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Stay in the loop.</h2>
            <p className="text-base text-blue-300/55 leading-relaxed mb-8">
              Monthly updates on admissions, events and student achievements.<br />No spam — just what matters.
            </p>
            {done ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-800/40 border border-emerald-700/40 text-emerald-400 px-6 py-3 font-semibold text-sm">
                <CheckCircle2 className="h-4 w-4" /> Welcome aboard! Check your inbox.
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-blue-700/40 bg-blue-900/60 px-4 py-3 text-sm text-blue-100 placeholder:text-blue-400/50 outline-none focus:border-blue-500/60 transition" />
                <button onClick={() => email && setDone(true)}
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors">
                  Subscribe
                </button>
              </div>
            )}
            <p className="text-xs text-blue-400/50 mt-4">Join 4,200+ members of the Rochas community. Unsubscribe anytime.</p>
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
      <Hero />
      <Ticker />
      <Principal />
      <LeadershipShowcase />  {/* Changed from LeadershipCircle */}
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