import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Home, Users, UserRound } from "lucide-react";

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
  const [portalOpen, setPortalOpen] = useState(false);

  // ✅ Fixed: Properly typed ref declared once at the top
  const portalTimeoutRef = useRef<number | null>(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Keyboard escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
    if (portalTimeoutRef.current) {
      clearTimeout(portalTimeoutRef.current);
    }
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
            ? "bg-red-200 border-b border-red-700/60"
            : "bg-red-200 border-b border-red-700/40"
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
                <img src="/images/optimized/preeminence_logo.webp" alt="Preeminence International Montessori"
                  className="h-11 w-auto object-contain flex-shrink-0" />
              </div>
              <div className="leading-none">
                <div className="font-display font-bold text-sm text-white tracking-wide">
                  PREEMINENCE
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-blue-100/70 mt-0.5">
                  International Montessori
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
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-white/300 hover:text-white hover:bg-white/10 transition-all"
                  activeProps={{
                    className:
                      "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-white/15",
                  }}
                >
                  {link.icon && <link.icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              {/* Portal Login with Dropdown - Fixed to stay open */}
              <div
                className="relative hidden md:block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-semibold transition-all ${
                    portalOpen
                      ? "border-white text-white bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.4)]"
                      : "border-blue-300/40 text-white/90 hover:bg-blue-800/50 hover:text-white hover:border-white/70"
                  }`}
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
                  className={`absolute right-0 mt-1 w-56 rounded-xl bg-blue-950/30 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden transition-all duration-200 origin-top ${
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
                      className="flex items-center gap-3 px-4 py-3 text-sm text-blue-100/90 hover:bg-blue-800/60 hover:text-white transition-colors"
                    >
                      <Users className="h-4 w-4 text-blue-300" />
                      <div>
                        <div className="font-medium text-white">Staff Portal</div>
                        <div className="text-xs text-blue-300/70">Access results & records</div>
                      </div>
                    </a>
                    
                    <a
                      href="https://results.rfcobiohia.com.ng/student"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-blue-100/90 hover:bg-blue-800/60 hover:text-white transition-colors"
                    >
                      <UserRound className="h-4 w-4 text-blue-300" />
                      <div>
                        <div className="font-medium text-white">Student Portal</div>
                        <div className="text-xs text-blue-300/70">Check results & progress</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Apply CTA */}
              <Link
                to="/admissions"
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-4 py-2 text-sm font-semibold  transition-colors"
              >
                Apply Now
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => { setMobileOpen(v => !v); setPortalOpen(false); }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
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

            {/* Links */}
            <nav className="flex flex-col gap-1 flex-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  activeOptions={link.to === "/" ? { exact: true } : {}}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white transition"
                  activeProps={{
                    className:
                      "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/15",
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
                <div className="text-xs text-blue-300/80 uppercase tracking-wider px-2 mb-1">Portals</div>
                
                <a
                  href="https://results.rfcobiohia.com.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-blue-300/40 text-white/90 hover:bg-blue-800/40 hover:text-white hover:border-white px-3 py-3 text-sm font-medium transition"
                >
                  <Users className="h-4 w-4 text-blue-300" />
                  <div>
                    <div>Staff Portal</div>
                    <div className="text-xs text-blue-300/70">Access results & records</div>
                  </div>
                </a>
                
                <a
                  href="https://results.rfcobiohia.com.ng/student"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-blue-300/40 text-white/90 hover:bg-blue-800/40 hover:text-white hover:border-white px-3 py-3 text-sm font-medium transition"
                >
                  <UserRound className="h-4 w-4 text-blue-300" />
                  <div>
                    <div>Student Portal</div>
                    <div className="text-xs text-blue-300/70">Check results & progress</div>
                  </div>
                </a>
              </div>

              <Link
                to="/admissions"
                onClick={() => setMobileOpen(false)}
                className="text-center rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 py-3 text-sm font-semibold transition-colors"
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




































































