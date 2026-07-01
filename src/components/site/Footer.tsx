import { Link } from "@tanstack/react-router";
import {
  Facebook, Instagram, Linkedin, Twitter, Youtube,
  MapPin, MessageCircle, Mail, Clock, GraduationCap,
  ArrowRight, ExternalLink, Users, Award, Globe, Heart
} from "lucide-react";

/* ══════════════════════════════════════════════════
   CONTACT CHANNEL — WhatsApp only, single number
   Same number used on the Contact and Admissions pages.
══════════════════════════════════════════════════ */
const WHATSAPP_NUMBER = "+234 813 387 8927";
const toWhatsAppDigits = (number) => number.replace(/[\s+]/g, "");
const whatsappLink = (message) =>
  `https://wa.me/${toWhatsAppDigits(WHATSAPP_NUMBER)}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

const portals = [
  { label: "Student Portal",  to: "https://results.rfcobiohia.com.ng/student" },
{ label: "Parent Login",    to: "https://results.rfcobiohia.com.ng" },
  { label: "About",           to: "/about"          },
  { label: "Admissions",      to: "/admissions"     },
  { label: "News & Events",   to: "/news"           },
  { label: "Contact",         to: "/contact"        },
];

const socials = [
  { icon: Facebook,  href: "https://facebook.com", label: "Facebook",  hover: "hover:bg-[#1877F2] hover:border-[#1877F2]" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", hover: "hover:bg-gradient-to-tr hover:from-[#FEDA75] hover:via-[#D62976] hover:to-[#4F5BD5] hover:border-transparent" },
  { icon: Twitter,   href: "https://twitter.com", label: "Twitter",   hover: "hover:bg-black hover:border-black" },
  { icon: Linkedin,  href: "https://linkedin.com", label: "LinkedIn",  hover: "hover:bg-[#0A66C2] hover:border-[#0A66C2]" },
  { icon: Youtube,   href: "https://youtube.com", label: "YouTube",   hover: "hover:bg-[#FF0000] hover:border-[#FF0000]" },
];

const accreditations = [
  "Cambridge Certified",
  "IB World School",
  "ISO 21001",
  "WAEC Partner"
];

const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Safeguarding Policy",
  "Accreditations"
];

// Foundation stats
const stats = [
  { icon: Users, value: "21,000+", label: "Children Educated" },
  { icon: Award, value: "3,000+", label: "Graduates & Undergraduates" },
  { icon: Globe, value: "10", label: "College Campuses" },
  { icon: Heart, value: "2000", label: "Founded" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-blue-700 text-white overflow-hidden">
      {/* Top decorative line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#93c5fd 1px,transparent 1px),linear-gradient(90deg,#93c5fd 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/40 blur-3xl pointer-events-none" />

      {/* ── Stats Banner ── */}
      <div className="relative border-b border-blue-600/40 bg-blue-800/30">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="h-6 w-6 text-blue-300/60" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
                <div className="text-xs text-blue-200/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div className="relative border-b border-blue-600/40">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Ready to join the <span className="text-blue-300">Rochas family?</span>
            </h3>
            <p className="text-sm text-blue-200/80 mt-1">
              Applications for the 2025–2026 academic year are now open.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40 transition-all hover:-translate-y-0.5"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-5 w-fit group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="leading-none">
                <div className="font-display font-bold text-sm text-white tracking-wide group-hover:text-blue-200 transition">
                  ROCHAS FOUNDATION
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-blue-300/60 mt-0.5">College</div>
              </div>
            </Link>

            <p className="text-sm text-blue-100/80 leading-relaxed max-w-[260px] mb-6">
              Founded in 2000, Rochas Foundation is a non-governmental organization dedicated to 
              providing free, qualitative education to intelligent children from less privileged 
              homes across Africa. Building a new African through charity.
            </p>

            {/* Contact — WhatsApp only, no phone/call channel */}
            <ul className="space-y-3 mb-6 text-sm text-blue-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-300 mt-0.5 flex-shrink-0" />
                <span>Adjacent to the Enugu Airport Roundabout Junction, Emene, Enugu, Enugu State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-blue-300 flex-shrink-0" />
                <a
                  href={whatsappLink("Hello! I'd like to know more about Rochas Foundation College.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-200 transition"
                >
                  {WHATSAPP_NUMBER} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-300 flex-shrink-0" />
                <a href="mailto:admissions@rochas.edu.ng" className="hover:text-blue-200 transition">
                  admissions@rochas.edu.ng
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-blue-300 flex-shrink-0" />
                <span>Mon–Fri · 7:30 AM – 5:00 PM</span>
              </li>
            </ul>

            {/* Urgent contact — also routed through WhatsApp, same number */}
            <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-3 mb-6">
              <p className="text-xs uppercase tracking-wider text-red-300 font-semibold mb-0.5">Urgent? Message Us</p>
              <a
                href={whatsappLink("This is urgent — I need to reach Rochas Foundation College right away.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white hover:text-red-200 transition"
              >
                Chat on WhatsApp: {WHATSAPP_NUMBER}
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`h-9 w-9 rounded-lg bg-white/10 border border-blue-500/30 flex items-center justify-center text-blue-200 hover:text-white transition-all ${hover}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Accreditation badges */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-blue-300 font-semibold mb-4">
              Accreditations
            </h4>
            <div className="flex flex-col gap-3">
              {accreditations.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-white/10 px-3 py-1.5 w-fit"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                  <span className="text-xs text-blue-100/80 font-medium">{badge}</span>
                </div>
              ))}
            </div>

            {/* Campuses */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-widest text-blue-300 font-semibold mb-3">
                Our Campuses
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Owerri", "Ogboko", "Jos", "Ibadan", "Kano", "Zaria", "Bauchi", "Sokoto", "Adamawa", "Enugu"].map((city) => (
                  <span
                    key={city}
                    className="text-xs bg-white/10 border border-blue-500/30 rounded-full px-3 py-1 text-blue-100/80"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Exchange Program */}
            <div className="mt-6 rounded-xl bg-yellow-500/20 border border-yellow-400/30 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-yellow-300 font-semibold mb-0.5">
                Excellence Rewarded
              </p>
              <p className="text-sm text-blue-100/90">
                Top students receive annual exchange program to the United States
              </p>
            </div>
          </div>
        </div>

        {/* ── Portals strip ── */}
        <div className="mt-12 pt-8 border-t border-blue-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-blue-300 font-semibold whitespace-nowrap">
              Quick Access
            </span>
            <div className="flex flex-wrap gap-2">
              {portals.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-blue-500/30 px-3.5 py-1.5 text-xs font-medium text-blue-100/80 hover:bg-blue-600/50 hover:text-white hover:border-blue-400/50 transition"
                >
                  <ExternalLink className="h-3 w-3" />
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Map embed ── */}
        <div className="mt-8 rounded-2xl overflow-hidden h-44 border border-blue-500/30">
          <iframe
            title="Campus map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=7.5267%2C6.4495%2C7.5567%2C6.4695&layer=mapnik&marker=6.4595%2C7.5417"
            className="w-full h-full grayscale opacity-50"
            loading="lazy"
          />
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 pt-6 border-t border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-200/60">
            © {year} Rochas Foundation College. All rights reserved. Powered by{" "}
            <a 
              href="https://bravotechub.com" 
              className="text-blue-200/80 hover:text-blue-100 transition"
              rel="noopener noreferrer"
              target="_blank"
            >
              Bravotechub
            </a>.
          </p>
          <div className="flex items-center gap-5">
            {footerLinks.map((text) => (
              <a
                key={text}
                href="#"
                className="text-xs text-blue-200/60 hover:text-blue-100 transition"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}