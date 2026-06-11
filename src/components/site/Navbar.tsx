

// import { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-router";
// import {
//   Menu,
//   X,
//   Search,
//   GraduationCap,
//   ChevronDown,
//   Phone,
//   Mail,
//   MapPin,
//   Home,
// } from "lucide-react";

// type ChildLink = { label: string; to: string; desc?: string };
// type NavLink = { label: string; to: string; children?: ChildLink[] };

// const mainLinks: NavLink[] = [
//   { label: "Home", to: "/" },
//   {
//     label: "About",
//     to: "/about",
//     children: [
//       { label: "Our Story", to: "/about/story", desc: "History and founding vision" },
//       { label: "Leadership", to: "/about/leadership", desc: "Meet our head of school & board" },
//       { label: "Campus", to: "/about/campus", desc: "Facilities and infrastructure" },
//       { label: "Mission & Values", to: "/about/mission", desc: "What we stand for" },
//     ],
//   },
//   {
//     label: "Academics",
//     to: "/academics",
//     children: [
//       { label: "Junior School", to: "/academics/junior", desc: "Grades 6–8 · Foundation years" },
//       { label: "Senior School", to: "/academics/senior", desc: "Grades 9–12 · Diploma programme" },
//       { label: "STEM Labs", to: "/academics/stem", desc: "Robotics, AI & biotech" },
//       { label: "Arts & Humanities", to: "/academics/arts", desc: "Music, theater & film" },
//       { label: "ICT Programme", to: "/academics/ict", desc: "Digital literacy & cyber-security" },
//     ],
//   },
//   {
//     label: "Admissions",
//     to: "/admissions",
//     children: [
//       { label: "Apply Now", to: "/admissions/apply", desc: "Start your application" },
//       { label: "Scholarships", to: "/admissions/scholarships", desc: "Merit-based financial aid" },
//       { label: "Virtual Tour", to: "/admissions/tour", desc: "Explore campus remotely" },
//       { label: "Open Days", to: "/admissions/open-days", desc: "Visit us in person" },
//       { label: "FAQs", to: "/admissions/faq", desc: "Common questions answered" },
//     ],
//   },
//   {
//     label: "Student Life",
//     to: "/student-life",
//     children: [
//       { label: "Events", to: "/student-life/events", desc: "Upcoming campus happenings" },
//       { label: "Sports", to: "/student-life/sports", desc: "16 varsity teams & coaching" },
//       { label: "Clubs & Societies", to: "/student-life/clubs", desc: "100+ extracurricular options" },
//       { label: "Boarding", to: "/student-life/boarding", desc: "Safe & nurturing residence" },
//     ],
//   },
//   { label: "News & Events", to: "/news" },
//   { label: "Contact", to: "/contact" },
// ];

// const quickLinks = [
//   { label: "Student Portal", to: "/portal/student" },
//   { label: "Parent Login", to: "/portal/parent" },
//   { label: "e-Learning", to: "/elearning" },
//   { label: "Bus Tracking", to: "/transport" },
// ];

// export function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setSearchOpen(false);
//         setMobileOpen(false);
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileOpen]);

//   return (
//     <>
//       {/* ── Top utility strip (hides on scroll) ── */}
//       <div
//         className={`hidden lg:block bg-blue-950 text-blue-200 text-xs transition-all duration-300 overflow-hidden ${
//           scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
//           <div className="flex items-center gap-6">
//             <span className="flex items-center gap-1.5">
//               <Phone className="h-3.5 w-3.5" /> +234 800 ROCHAS
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Mail className="h-3.5 w-3.5" /> admissions@rochas.edu.ng
//             </span>
//             <span className="flex items-center gap-1.5">
//               <MapPin className="h-3.5 w-3.5" /> 12 Excellence Avenue, Education District
//             </span>
//           </div>
//           <div className="flex items-center gap-5">
//             {quickLinks.map((ql) => (
//               <Link key={ql.to} to={ql.to} className="hover:text-white transition">
//                 {ql.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Main nav (blue background) ── */}
//       <header
//         className={`sticky top-0 z-40 bg-blue-900/95 backdrop-blur-md border-b transition-all ${
//           scrolled ? "border-blue-800 shadow-lg shadow-blue-950/30" : "border-blue-800/40"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-16 lg:h-18">
//             {/* Logo */}
//             <Link
//               to="/"
//               onClick={() => setMobileOpen(false)}
//               className="flex items-center gap-3 shrink-0"
//             >
//               <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md shadow-blue-950/40">
//                 <GraduationCap className="h-5 w-5 text-white" />
//               </div>
//               <div className="hidden sm:block leading-tight">
//                 <p className="text-sm font-bold text-white tracking-wide">ROCHAS FOUNDATION</p>
//                 <p className="text-[11px] text-blue-300 uppercase tracking-[0.18em]">College</p>
//               </div>
//             </Link>

//             {/* Desktop links */}
//             <nav className="hidden lg:flex items-center gap-1">
//               {mainLinks.map((link) => (
//                 <div
//                   key={link.label}
//                   className="relative"
//                   onMouseEnter={() => link.children && setActiveDropdown(link.label)}
//                   onMouseLeave={() => setActiveDropdown(null)}
//                 >
//                   <Link
//                     to={link.to}
//                     className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 transition"
//                     activeProps={{ className: "text-white bg-white/10" }}
//                   >
//                     {link.label === "Home" && <Home className="h-4 w-4" />}
//                     {link.label}
//                     {link.children && (
//                       <ChevronDown
//                         className={`h-3.5 w-3.5 transition-transform ${
//                           activeDropdown === link.label ? "rotate-180" : ""
//                         }`}
//                       />
//                     )}
//                   </Link>

//                   {link.children && activeDropdown === link.label && (
//                     <div className="absolute left-0 top-full pt-2 w-80">
//                       <div className="bg-blue-950 border border-blue-800 rounded-2xl p-2 shadow-2xl shadow-blue-950/50">
//                         {link.children.map((child) => (
//                           <Link
//                             key={child.to}
//                             to={child.to}
//                             onClick={() => setActiveDropdown(null)}
//                             className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-800/60 transition group"
//                           >
//                             <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 group-hover:bg-white transition" />
//                             <div>
//                               <p className="text-sm font-medium text-white">{child.label}</p>
//                               {child.desc && (
//                                 <p className="text-xs text-blue-300/80 mt-0.5">{child.desc}</p>
//                               )}
//                             </div>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* Right actions */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => {
//                   setSearchOpen((v) => !v);
//                   setMobileOpen(false);
//                 }}
//                 aria-label="Search"
//                 className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition"
//               >
//                 <Search className="h-4 w-4" />
//               </button>

//               <Link
//                 to="/portal/student"
//                 className="hidden xl:inline-flex items-center px-4 h-9 rounded-lg text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 transition"
//               >
//                 Portal Login
//               </Link>

//               <Link
//                 to="/admissions/apply"
//                 className="hidden sm:inline-flex items-center px-4 h-9 rounded-lg text-sm font-semibold bg-blue-400 hover:bg-blue-300 text-blue-950 shadow-md shadow-blue-950/30 transition"
//               >
//                 Apply Now
//               </Link>

//               <button
//                 onClick={() => {
//                   setMobileOpen((v) => !v);
//                   setSearchOpen(false);
//                 }}
//                 aria-label={mobileOpen ? "Close menu" : "Open menu"}
//                 className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-blue-100 hover:bg-white/10 transition"
//               >
//                 {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Search bar */}
//         {searchOpen && (
//           <div className="border-t border-blue-800 bg-blue-950">
//             <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
//               <Search className="h-4 w-4 text-blue-400" />
//               <input
//                 autoFocus
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search courses, news, events, staff…"
//                 className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-blue-400/60"
//               />
//               <kbd className="text-[10px] text-blue-300 border border-blue-700 rounded px-1.5 py-0.5">
//                 esc
//               </kbd>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Mobile drawer */}
//       {mobileOpen && (
//         <div className="lg:hidden fixed inset-0 z-50">
//           <div
//             className="absolute inset-0 bg-blue-950/70 backdrop-blur-sm"
//             onClick={() => setMobileOpen(false)}
//           />
//           <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-blue-900 border-l border-blue-800 p-5 overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <span className="text-sm font-semibold text-white">Menu</span>
//               <button
//                 onClick={() => setMobileOpen(false)}
//                 aria-label="Close menu"
//                 className="h-9 w-9 flex items-center justify-center rounded-lg text-blue-100 hover:bg-white/10"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <nav className="flex flex-col gap-1">
//               {mainLinks.map((link) => (
//                 <div key={link.label}>
//                   <div className="flex items-center">
//                     <Link
//                       to={link.to}
//                       onClick={() => !link.children && setMobileOpen(false)}
//                       className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition"
//                     >
//                       {link.label === "Home" && <Home className="h-4 w-4" />}
//                       {link.label}
//                     </Link>
//                     {link.children && (
//                       <button
//                         onClick={() =>
//                           setMobileExpanded(mobileExpanded === link.label ? null : link.label)
//                         }
//                         className="h-9 w-9 flex items-center justify-center rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition"
//                       >
//                         <ChevronDown
//                           className={`h-4 w-4 transition-transform ${
//                             mobileExpanded === link.label ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>
//                     )}
//                   </div>

//                   {link.children && mobileExpanded === link.label && (
//                     <div className="pl-6 pb-2 flex flex-col">
//                       {link.children.map((child) => (
//                         <Link
//                           key={child.to}
//                           to={child.to}
//                           onClick={() => setMobileOpen(false)}
//                           className="py-2 text-sm text-blue-300/80 hover:text-white transition"
//                         >
//                           {child.label}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             <div className="grid grid-cols-2 gap-2 mt-6">
//               <Link
//                 to="/portal/student"
//                 onClick={() => setMobileOpen(false)}
//                 className="text-center rounded-xl border border-blue-700 text-blue-100 py-3 text-sm font-medium hover:bg-blue-800/50 transition"
//               >
//                 Portal Login
//               </Link>
//               <Link
//                 to="/admissions/apply"
//                 onClick={() => setMobileOpen(false)}
//                 className="text-center rounded-xl bg-blue-400 hover:bg-blue-300 text-blue-950 py-3 text-sm font-semibold shadow-lg shadow-blue-950/30 transition"
//               >
//                 Apply Now
//               </Link>
//             </div>

//             <div className="mt-6 pt-6 border-t border-blue-800 space-y-2 text-xs text-blue-300">
//               <p className="flex items-center gap-2">
//                 <Phone className="h-3.5 w-3.5" /> +234 800 ROCHAS
//               </p>
//               <p className="flex items-center gap-2">
//                 <Mail className="h-3.5 w-3.5" /> admissions@rochas.edu.ng
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





























































import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search, GraduationCap, Home } from "lucide-react";

/* ─── NAV LINKS ─── */
const mainLinks = [
  { label: "Home",         to: "/",            icon: Home },
  { label: "About",        to: "/about"                   },
  // { label: "Academics",    to: "/academics"               },
  { label: "Admissions",   to: "/admissions"              },
  // { label: "Student Life", to: "/student-life"            },
  { label: "News & Events",to: "/news"                    },
  { label: "Contact",      to: "/contact"                 },
];

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query,      setQuery]      = useState("");

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Keyboard escape */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Lock body scroll when mobile drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ══ Main nav bar ══ */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-blue-950 border-b border-blue-800/60"
            : "bg-blue-950 border-b border-blue-800/30"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-blue-400/10 blur-sm group-hover:bg-blue-400/20 transition" />
                <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="leading-none">
                <div className="font-display font-bold text-sm text-white tracking-wide">
                  ROCHAS FOUNDATION
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-blue-400/50 mt-0.5">
                  College
                </div>
              </div>
            </Link>

            {/* ── Desktop links ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {mainLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={link.to === "/" ? { exact: true } : {}}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-blue-100/70 hover:text-white hover:bg-white/8 transition-all"
                  activeProps={{
                    className:
                      "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-white/10",
                  }}
                >
                  {link.icon && <link.icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => { setSearchOpen(v => !v); setMobileOpen(false); }}
                aria-label="Search"
                className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-blue-300/60 hover:text-white hover:bg-white/8 transition"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Portal login */}
              <Link
                to="/portal"
                className="hidden md:inline-flex items-center rounded-lg border border-blue-700/50 text-blue-300/80 hover:bg-blue-800/50 hover:text-white px-3.5 py-2 text-sm font-medium transition"
              >
                Portal Login
              </Link>

              {/* Apply CTA */}
              <Link
                to="/admissions"
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors"
              >
                Apply Now
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => { setMobileOpen(v => !v); setSearchOpen(false); }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-blue-200 hover:bg-white/8 transition"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Search panel ── */}
        {searchOpen && (
          <div className="border-t border-blue-800/40 bg-blue-950 px-6 py-3">
            <div className="mx-auto max-w-2xl flex items-center gap-3 bg-white/5 border border-blue-700/40 rounded-xl px-4 py-2.5">
              <Search className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search courses, news, events, staff…"
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-blue-500/50"
              />
              <kbd className="text-[10px] text-blue-600/60 bg-blue-900/60 px-1.5 py-0.5 rounded border border-blue-700/40">
                esc
              </kbd>
            </div>
          </div>
        )}
      </header>

      {/* ══ Mobile drawer ══ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative ml-auto w-full max-w-sm bg-blue-950 border-l border-blue-800/50 h-full overflow-y-auto flex flex-col pt-20 pb-8 px-5">

            {/* Search */}
            <div className="flex items-center gap-2 bg-white/5 border border-blue-800/40 rounded-xl px-3 py-2.5 mb-6">
              <Search className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <input
                placeholder="Search…"
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-blue-500/50"
              />
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 flex-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  activeOptions={link.to === "/" ? { exact: true } : {}}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-100/75 hover:bg-white/6 hover:text-white transition"
                  activeProps={{
                    className:
                      "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-white/10",
                  }}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-blue-800/40">
              <Link
                to="/portal"
                onClick={() => setMobileOpen(false)}
                className="text-center rounded-xl border border-blue-700/50 text-blue-300/80 py-3 text-sm font-medium hover:bg-blue-800/40 hover:text-white transition"
              >
                Portal Login
              </Link>
              <Link
                to="/admissions"
                onClick={() => setMobileOpen(false)}
                className="text-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 text-sm font-semibold transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}