// import { Link } from "@tanstack/react-router";
// import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail, Clock, GraduationCap } from "lucide-react";

// export function Footer() {
//   return (
//     <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
//       <div className="absolute inset-0 gradient-mesh opacity-40" />
//       <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan/20 blur-3xl animate-blob" />
//       <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl animate-blob" />

//       <div className="relative mx-auto max-w-7xl px-4 py-16">
//         <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="h-10 w-10 rounded-lg gradient-gold flex items-center justify-center">
//                 <GraduationCap className="h-5 w-5 text-primary" />
//               </div>
//               <div>
//                 <div className="font-display font-bold text-lg">Rochas </div>
//                 <div className="text-[10px] uppercase tracking-widest text-primary-foreground/60">Foundation College</div>
//               </div>
//             </div>
//             <p className="text-sm text-primary-foreground/70 leading-relaxed">
//               Cultivating tomorrow's global leaders through innovation, inquiry and integrity. Grades 6–12.
//             </p>
//             <div className="mt-5 flex gap-2">
//               {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
//                 <a key={i} href="#" className="h-9 w-9 rounded-lg glass-dark flex items-center justify-center hover:bg-gold hover:text-primary transition">
//                   <Icon className="h-4 w-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-display font-semibold mb-4 text-gold">Explore</h4>
//             <ul className="space-y-2 text-sm text-primary-foreground/70">
//               {[
//                 ["About", "/about"], ["Academics", "/academics"], ["Admissions", "/admissions"],
//                 ["Student Life", "/student-life"], ["News", "/news"], ["Contact", "/contact"],
//               ].map(([l, h]) => (
//                 <li key={h}><Link to={h} className="hover:text-gold transition">{l}</Link></li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-display font-semibold mb-4 text-gold">Quick Access</h4>
//             <ul className="space-y-2 text-sm text-primary-foreground/70">
//               {["Student Portal", "Parent Login", "e-Learning", "Calendar", "Bus Tracking", "Online Payments"].map((s) => (
//                 <li key={s}><a href="#" className="hover:text-gold transition">{s}</a></li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-display font-semibold mb-4 text-gold">Reach Us</h4>
//             <ul className="space-y-3 text-sm text-primary-foreground/70">
//               <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-cyan flex-shrink-0" /> 88 Horizon Avenue, Education District</li>
//               <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-cyan flex-shrink-0" /> +1 (555) 012-3456</li>
//               <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-cyan flex-shrink-0" /> hello@northbridge.edu</li>
//               <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 text-cyan flex-shrink-0" /> Mon–Fri 7:30–17:00</li>
//             </ul>
//             <div className="mt-4 rounded-xl glass-dark p-3 border-coral/40">
//               <div className="text-xs uppercase tracking-wider text-coral">Emergency</div>
//               <div className="text-sm font-semibold">+1 (555) 911-0000</div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 rounded-2xl overflow-hidden h-48 glass-dark">
//           <iframe
//             title="Campus map"
//             src="https://www.openstreetmap.org/export/embed.html?bbox=-74.01%2C40.70%2C-73.96%2C40.74&layer=mapnik"
//             className="w-full h-full grayscale-[20%] opacity-90"
//             loading="lazy"
//           />
//         </div>

//         <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-primary-foreground/60">
//           <p>© {new Date().getFullYear()} Powered by Bravotechub School portal. All rights reserved.</p>
//           <div className="flex gap-4">
//             <a href="#" className="hover:text-gold">Privacy Policy</a>
//             <a href="#" className="hover:text-gold">Terms</a>
//             <a href="#" className="hover:text-gold">Accreditations</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }












































































































import { Link } from "@tanstack/react-router";
import {
  Facebook, Instagram, Linkedin, Twitter, Youtube,
  MapPin, Phone, Mail, Clock, GraduationCap,
  ArrowRight, ExternalLink
} from "lucide-react";

const columns = [
  {
    title: "School",
    links: [
      { label: "About Us",       to: "/about"           },
      { label: "Leadership",     to: "/about/leadership" },
      { label: "Our Campus",     to: "/about/campus"     },
      { label: "Mission & Values",to: "/about/mission"  },
      { label: "Careers",        to: "/careers"          },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Junior School",    to: "/academics/junior"  },
      { label: "Senior School",    to: "/academics/senior"  },
      { label: "STEM Labs",        to: "/academics/stem"    },
      { label: "Arts & Humanities",to: "/academics/arts"    },
      { label: "ICT Programme",    to: "/academics/ict"     },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Apply Now",      to: "/admissions/apply"        },
      { label: "Scholarships",   to: "/admissions/scholarships" },
      { label: "Open Days",      to: "/admissions/open-days"    },
      { label: "Virtual Tour",   to: "/admissions/tour"         },
      { label: "FAQs",           to: "/admissions/faq"          },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "News & Events",      to: "/news"                  },
      { label: "Alumni Network",     to: "/alumni"                },
      { label: "Parent Association", to: "/parents"               },
      { label: "Sports",             to: "/student-life/sports"   },
      { label: "Giving Back",        to: "/giving"                },
    ],
  },
];

const portals = [
  { label: "Student Portal",  to: "/portal/student" },
  { label: "Parent Login",    to: "/portal/parent"  },
  { label: "e-Learning",      to: "/elearning"       },
  { label: "Calendar",        to: "/calendar"        },
  { label: "Bus Tracking",    to: "/transport"       },
  { label: "Online Payments", to: "/payments"        },
];

const socials = [
  { icon: Facebook,  href: "#", label: "Facebook"  },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter,   href: "#", label: "Twitter"   },
  { icon: Linkedin,  href: "#", label: "LinkedIn"  },
  { icon: Youtube,   href: "#", label: "YouTube"   },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-blue-600 text-white overflow-hidden">
      {/* Top decorative line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-800/60 to-transparent" />

      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#60a5fa 1px,transparent 1px),linear-gradient(90deg,#60a5fa 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-700/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/60 blur-3xl pointer-events-none" />

      {/* ── CTA banner ── */}
      <div className="relative border-b border-blue-600/60">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Ready to join the <span className="text-blue-300 italic">Rochas family?</span>
            </h3>
            <p className="text-sm text-blue-300/70 mt-1">
              Applications for the 2025–2026 academic year are now open.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/admissions/tour"
              className="rounded-xl border border-blue-600/50 text-blue-200 hover:bg-blue-800/50 hover:text-white px-5 py-2.5 text-sm font-medium transition"
            >
              Book a Tour
            </Link>
            <Link
              to="/admissions/apply"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 transition-all hover:-translate-y-0.5"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-5 w-fit group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md flex-shrink-0">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="leading-none">
                <div className="font-display font-bold text-sm text-white tracking-wide group-hover:text-blue-300 transition">
                  ROCHAS FOUNDATION
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-blue-400/60 mt-0.5">College</div>
              </div>
            </Link>

            <p className="text-sm text-blue-300/60 leading-relaxed max-w-[260px] mb-6">
              Cultivating tomorrow's global leaders through world-class education, character, and purpose. Grades 6–12.
            </p>

            {/* Contact */}
            <ul className="space-y-3 mb-6 text-sm text-blue-300/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                12 Excellence Avenue, Education District, Abuja
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                +234 800 ROCHAS
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                admissions@rochas.edu.ng
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                Mon–Fri · 7:30 AM – 5:00 PM
              </li>
            </ul>

            {/* Emergency */}
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 mb-6">
              <p className="text-xs uppercase tracking-wider text-red-400 font-semibold mb-0.5">Emergency Line</p>
              <p className="text-sm font-bold text-white">+234 800 911 0000</p>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-lg bg-white/5 border border-blue-800/40 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-blue-300/60 hover:text-blue-200 transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Portals strip ── */}
        <div className="mt-12 pt-8 border-t border-blue-800/40">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-blue-500 font-semibold whitespace-nowrap">
              Quick Access
            </span>
            <div className="flex flex-wrap gap-2">
              {portals.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-blue-800/40 px-3.5 py-1.5 text-xs font-medium text-blue-300/70 hover:bg-blue-800/50 hover:text-blue-200 hover:border-blue-700/60 transition"
                >
                  <ExternalLink className="h-3 w-3" />
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Accreditation badges ── */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {["Cambridge Certified", "IB World School", "ISO 21001", "WAEC Partner"].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-lg border border-blue-700/30 bg-white/5 px-3 py-1.5"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="text-xs text-blue-300/60 font-medium">{badge}</span>
            </div>
          ))}
        </div>

        {/* ── Map embed ── */}
        <div className="mt-8 rounded-2xl overflow-hidden h-44 border border-blue-800/40">
          <iframe
            title="Campus map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=7.45%2C8.85%2C7.55%2C8.95&layer=mapnik"
            className="w-full h-full grayscale opacity-60"
            loading="lazy"
          />
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 pt-6 border-t border-blue-800/30 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-400/50">
            © {year} Rochas Foundation College. All rights reserved. Powered by{" "}
            <a href="#" className="text-blue-400/70 hover:text-blue-300 transition">Bravotechub</a>.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Safeguarding Policy", "Accreditations"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs text-blue-400/50 hover:text-blue-300 transition"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}