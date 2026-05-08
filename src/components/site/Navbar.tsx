import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, Search, GraduationCap } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/student-life", label: "Student Life" },
  { to: "/news", label: "News & Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-elegant" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 gradient-cyan rounded-lg blur-md opacity-60 group-hover:opacity-100 transition" />
              <div className="relative h-9 w-9 rounded-lg gradient-hero flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-gold" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base">Northbridge</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                International Academy
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-foreground bg-accent" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="px-3 py-2 rounded-lg text-sm font-medium hover:text-foreground hover:bg-accent/60 transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent transition"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDark((v) => !v)}
              className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-accent transition"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/admissions"
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg gradient-gold px-4 py-2 text-sm font-semibold text-gold-foreground shadow-gold hover:scale-[1.03] transition-transform"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg hover:bg-accent transition"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="mt-2 glass rounded-2xl p-3 shadow-elegant animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search courses, news, events…"
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <kbd className="text-xs text-muted-foreground bg-accent px-1.5 py-0.5 rounded">esc</kbd>
            </div>
          </div>
        )}

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 shadow-elegant animate-in fade-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "bg-accent text-foreground" }}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/60"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/admissions"
                onClick={() => setOpen(false)}
                className="mt-2 text-center rounded-lg gradient-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
