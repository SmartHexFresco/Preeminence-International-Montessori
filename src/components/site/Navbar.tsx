// import { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-router";
// import { Menu, X, Search, GraduationCap, Home, Users, UserRound } from "lucide-react";

// /* ─── NAV LINKS ─── */
// const mainLinks = [
//   { label: "Home",         to: "/",            icon: Home },
//   { label: "About",        to: "/about"                   },
//   // { label: "Academics",    to: "/academics"               },
//   { label: "Admissions",   to: "/admissions"              },
//   // { label: "Student Life", to: "/student-life"            },
//   { label: "News & Events",to: "/news"                    },
//   { label: "Contact",      to: "/contact"                 },
// ];

// /* ══════════════════════════════════════════════════
//    NAVBAR
// ══════════════════════════════════════════════════ */
// export function Navbar() {
//   const [scrolled,   setScrolled]   = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [query,      setQuery]      = useState("");
//   const [portalOpen, setPortalOpen] = useState(false);

//   /* Scroll detection */
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 44);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* Keyboard escape */
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         setSearchOpen(false);
//         setMobileOpen(false);
//         setPortalOpen(false);
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   /* Lock body scroll when mobile drawer open */
//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [mobileOpen]);

//   return (
//     <>
//       {/* ══ Main nav bar ══ */}
//       <header
//         className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? "bg-blue-950 border-b border-blue-800/60"
//             : "bg-blue-950 border-b border-blue-800/30"
//         }`}
//       >
//         <div className="mx-auto max-w-7xl px-6">
//           <div className="flex items-center justify-between h-16">

//             {/* ── Logo ── */}
//             <Link
//               to="/"
//               onClick={() => setMobileOpen(false)}
//               className="flex items-center gap-2.5 group flex-shrink-0"
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-xl bg-blue-400/10 blur-sm group-hover:bg-blue-400/20 transition" />
//                 <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
//                   <GraduationCap className="h-5 w-5 text-white" />
//                 </div>
//               </div>
//               <div className="leading-none">
//                 <div className="font-display font-bold text-sm text-white tracking-wide">
//                   ROCHAS FOUNDATION
//                 </div>
//                 <div className="text-[9px] uppercase tracking-[0.2em] text-blue-400/50 mt-0.5">
//                   College
//                 </div>
//               </div>
//             </Link>

//             {/* ── Desktop links ── */}
//             <nav className="hidden lg:flex items-center gap-0.5">
//               {mainLinks.map((link) => (
//                 <Link
//                   key={link.to}
//                   to={link.to}
//                   activeOptions={link.to === "/" ? { exact: true } : {}}
//                   className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-blue-100/70 hover:text-white hover:bg-white/8 transition-all"
//                   activeProps={{
//                     className:
//                       "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-white/10",
//                   }}
//                 >
//                   {link.icon && <link.icon className="h-3.5 w-3.5" />}
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* ── Right actions ── */}
//             <div className="flex items-center gap-2">
//               {/* Search */}
//               <button
//                 onClick={() => { setSearchOpen(v => !v); setMobileOpen(false); setPortalOpen(false); }}
//                 aria-label="Search"
//                 className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-blue-300/60 hover:text-white hover:bg-white/8 transition"
//               >
//                 <Search className="h-4 w-4" />
//               </button>

//               {/* Portal Login with Dropdown - Slides down on hover */}
//               <div 
//                 className="relative hidden md:block"
//                 onMouseEnter={() => setPortalOpen(true)}
//                 onMouseLeave={() => setPortalOpen(false)}
//               >
//                 <button
//                   className="inline-flex items-center gap-1.5 rounded-lg border border-blue-700/50 text-blue-300/80 hover:bg-blue-800/50 hover:text-white px-3.5 py-2 text-sm font-medium transition"
//                 >
//                   Portal Login
//                   <svg 
//                     className={`h-3 w-3 transition-transform duration-300 ${portalOpen ? 'rotate-180' : ''}`}
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
                
//                 {/* Dropdown Menu - Slides down on hover */}
//                 <div 
//                   className={`absolute right-0 mt-2 w-48 rounded-lg bg-blue-900 border border-blue-700/50 shadow-xl overflow-hidden transition-all duration-300 origin-top ${
//                     portalOpen 
//                       ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' 
//                       : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
//                   }`}
//                 >
//                   <div className="py-1.5">
//                     <a
//                       href="https://results.rfcobiohia.com.ng/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-blue-200/80 hover:bg-blue-800/60 hover:text-white transition-colors"
//                     >
//                       <Users className="h-4 w-4" />
//                       <span>Staff Portal</span>
//                     </a>
//                     <a
//                       href="https://results.rfcobiohia.com.ng/student"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-blue-200/80 hover:bg-blue-800/60 hover:text-white transition-colors"
//                     >
//                       <UserRound className="h-4 w-4" />
//                       <span>Student Portal</span>
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Apply CTA */}
//               <Link
//                 to="/admissions"
//                 className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors"
//               >
//                 Apply Now
//               </Link>

//               {/* Mobile hamburger */}
//               <button
//                 onClick={() => { setMobileOpen(v => !v); setSearchOpen(false); setPortalOpen(false); }}
//                 aria-label={mobileOpen ? "Close menu" : "Open menu"}
//                 className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-blue-200 hover:bg-white/8 transition"
//               >
//                 {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── Search panel ── */}
//         {searchOpen && (
//           <div className="border-t border-blue-800/40 bg-blue-950 px-6 py-3">
//             <div className="mx-auto max-w-2xl flex items-center gap-3 bg-white/5 border border-blue-700/40 rounded-xl px-4 py-2.5">
//               <Search className="h-4 w-4 text-blue-500 flex-shrink-0" />
//               <input
//                 autoFocus
//                 value={query}
//                 onChange={e => setQuery(e.target.value)}
//                 placeholder="Search courses, news, events, staff…"
//                 className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-blue-500/50"
//               />
//               <kbd className="text-[10px] text-blue-600/60 bg-blue-900/60 px-1.5 py-0.5 rounded border border-blue-700/40">
//                 esc
//               </kbd>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* ══ Mobile drawer ══ */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden flex">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"
//             onClick={() => setMobileOpen(false)}
//           />

//           {/* Drawer panel */}
//           <div className="relative ml-auto w-full max-w-sm bg-blue-950 border-l border-blue-800/50 h-full overflow-y-auto flex flex-col pt-20 pb-8 px-5">

//             {/* Search */}
//             <div className="flex items-center gap-2 bg-white/5 border border-blue-800/40 rounded-xl px-3 py-2.5 mb-6">
//               <Search className="h-4 w-4 text-blue-500 flex-shrink-0" />
//               <input
//                 placeholder="Search…"
//                 className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-blue-500/50"
//               />
//             </div>

//             {/* Links */}
//             <nav className="flex flex-col gap-1 flex-1">
//               {mainLinks.map((link) => (
//                 <Link
//                   key={link.to}
//                   to={link.to}
//                   onClick={() => setMobileOpen(false)}
//                   activeOptions={link.to === "/" ? { exact: true } : {}}
//                   className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-100/75 hover:bg-white/6 hover:text-white transition"
//                   activeProps={{
//                     className:
//                       "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-white/10",
//                   }}
//                 >
//                   {link.icon && <link.icon className="h-4 w-4" />}
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Bottom CTAs */}
//             <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-blue-800/40">
//               {/* Mobile Portal Dropdown Section */}
//               <div className="flex flex-col gap-2">
//                 <div className="text-xs text-blue-400/60 uppercase tracking-wider px-2 mb-1">Portals</div>
//                 <a
//                   href="https://results.rfcobiohia.com.ng/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 rounded-xl border border-blue-700/50 text-blue-300/80 hover:bg-blue-800/40 hover:text-white px-3 py-2.5 text-sm font-medium transition"
//                 >
//                   <Users className="h-4 w-4" />
//                   Staff Portal
//                 </a>
//                 <a
//                   href="https://results.rfcobiohia.com.ng/student"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 rounded-xl border border-blue-700/50 text-blue-300/80 hover:bg-blue-800/40 hover:text-white px-3 py-2.5 text-sm font-medium transition"
//                 >
//                   <UserRound className="h-4 w-4" />
//                   Student Portal
//                 </a>
//               </div>
              
//               <Link
//                 to="/admissions"
//                 onClick={() => setMobileOpen(false)}
//                 className="text-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 text-sm font-semibold transition-colors"
//               >
//                 Apply Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

















































































































import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search, GraduationCap, Home, Users, UserRound } from "lucide-react";

/* ─── NAV LINKS ─── */
const mainLinks = [
  { label: "Home",         to: "/",            icon: Home },
  { label: "About",        to: "/about"                   },
  { label: "Admissions",   to: "/admissions"              },
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
  const [portalOpen, setPortalOpen] = useState(false);
  
  const portalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        setPortalOpen(false);
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

  // Handle mouse enter with delay clear
  const handleMouseEnter = () => {
    if (portalTimeoutRef.current) {
      clearTimeout(portalTimeoutRef.current);
      portalTimeoutRef.current = null;
    }
    setPortalOpen(true);
  };

  // Handle mouse leave with delay to allow moving to dropdown
  const handleMouseLeave = () => {
    portalTimeoutRef.current = setTimeout(() => {
      setPortalOpen(false);
    }, 150);
  };

  return (
    <>
      {/* ══ Main nav bar ══ */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-blue-700 border-b border-blue-600/60"
            : "bg-blue-700 border-b border-blue-500/30"
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
                <div className="absolute inset-0 rounded-xl bg-blue-600/10 blur-sm group-hover:bg-blue-400/20 transition" />
                <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
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
                onClick={() => { setSearchOpen(v => !v); setMobileOpen(false); setPortalOpen(false); }}
                aria-label="Search"
                className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-blue-300/60 hover:text-white hover:bg-white/8 transition"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Portal Login with Dropdown - Fixed to stay open */}
              <div 
                className="relative hidden md:block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-700/50 text-blue-300/80 hover:bg-blue-800/50 hover:text-white px-3.5 py-2 text-sm font-medium transition"
                >
                  Portal Login
                  <svg 
                    className={`h-3 w-3 transition-transform duration-300 ${portalOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu - Stays open with delay */}
                <div 
                  className={`absolute right-0 mt-1 w-56 rounded-xl bg-blue-900 border border-blue-700/50 shadow-xl overflow-hidden transition-all duration-200 origin-top ${
                    portalOpen 
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="py-2">
                    <a
                      href="https://results.rfcobiohia.com.ng/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-blue-200/80 hover:bg-blue-800/60 hover:text-white transition-colors"
                    >
                      <Users className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="font-medium">Staff Portal</div>
                        <div className="text-xs text-blue-400/60">Access results & records</div>
                      </div>
                    </a>
                    <a
                      href="https://results.rfcobiohia.com.ng/student"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-blue-200/80 hover:bg-blue-800/60 hover:text-white transition-colors"
                    >
                      <UserRound className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="font-medium">Student Portal</div>
                        <div className="text-xs text-blue-400/60">Check results & progress</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Apply CTA */}
              <Link
                to="/admissions"
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors"
              >
                Apply Now
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => { setMobileOpen(v => !v); setSearchOpen(false); setPortalOpen(false); }}
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
              {/* Mobile Portal Section */}
              <div className="flex flex-col gap-2">
                <div className="text-xs text-blue-400/60 uppercase tracking-wider px-2 mb-1">Portals</div>
                <a
                  href="https://results.rfcobiohia.com.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-blue-700/50 text-blue-300/80 hover:bg-blue-800/40 hover:text-white px-3 py-3 text-sm font-medium transition"
                >
                  <Users className="h-4 w-4 text-blue-400" />
                  <div>
                    <div>Staff Portal</div>
                    <div className="text-xs text-blue-400/60">Access results & records</div>
                  </div>
                </a>
                <a
                  href="https://results.rfcobiohia.com.ng/student"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-blue-700/50 text-blue-300/80 hover:bg-blue-800/40 hover:text-white px-3 py-3 text-sm font-medium transition"
                >
                  <UserRound className="h-4 w-4 text-blue-400" />
                  <div>
                    <div>Student Portal</div>
                    <div className="text-xs text-blue-400/60">Check results & progress</div>
                  </div>
                </a>
              </div>
              
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