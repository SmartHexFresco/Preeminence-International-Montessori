import { Link } from "@tanstack/react-router";
import {
  Facebook, Instagram, Linkedin, Twitter, Youtube,
  MapPin, MessageCircle, Mail, Phone, Clock,
  ArrowRight, ExternalLink
} from "lucide-react";
import { WHATSAPP_NUMBER, whatsappLink } from "@/lib/whatsapp";

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
  "Montessori Method",
  "Nigerian Primary Curriculum",
  "ISO 21001",
  "Safe & Caring School"
];

const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Safeguarding Policy",
  "Accreditations"
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-blue-900 border-t border-slate-200 overflow-hidden">
      {/* Top decorative line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

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
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-100 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-100 blur-3xl pointer-events-none" />

      {/* ── CTA banner ── */}
      <div className="relative border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-blue-900">
              Ready to join the <span className="text-[#C21E1E]">Preeminence family?</span>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Applications for the 2025–2026 academic year are now open.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/40 transition-all hover:-translate-y-0.5"
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
              <div className="h-12 w-auto flex-shrink-0">
              <img src="/images/preeminence_logo.png" alt="Preeminence International Montessori"
                className="h-12 w-auto object-contain" />
            </div>
              <div className="leading-none">
                <div className="font-display font-bold text-sm text-blue-900 tracking-wide group-hover:text-blue-700 transition">
                  PREEMINENCE
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 mt-0.5">International Montessori</div>
              </div>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-[260px] mb-6">
              Preeminence International Montessori is a warm, child-centred school where
              curious young minds are guided to grow with confidence, creativity and character.
            </p>

            {/* Contact — WhatsApp, phone & email channels */}
            <ul className="space-y-3 mb-6 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>39 Obodoko Layout, Amankpaka, Ugwuogo Nike, Enugu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <a
                  href={whatsappLink("Hello! I'd like to know more about Preeminence International Montessori.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 transition"
                >
                  {WHATSAPP_NUMBER} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+2348037944661" className="hover:text-blue-700 transition">0803 794 4661</a>
                  <a href="tel:+2348069014998" className="hover:text-blue-700 transition">0806 901 4998</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <a href="mailto:admissions@preeminence.edu.ng" className="hover:text-blue-700 transition">
                  admissions@preeminence.edu.ng
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span>Mon–Fri · 7:30 AM – 5:00 PM</span>
              </li>
            </ul>

            {/* Urgent contact — also routed through WhatsApp, same number */}
            <div className="rounded-xl bg-red-500/10 border border-red-200 px-4 py-3 mb-6">
              <p className="text-xs uppercase tracking-wider text-red-600 font-semibold mb-0.5">Urgent? Message Us</p>
              <a
                href={whatsappLink("This is urgent — I need to reach Preeminence International Montessori right away.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-slate-800 hover:text-red-600 transition"
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
                  className={`h-9 w-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white transition-all ${hover}`}
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
            <h4 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
              Accreditations
            </h4>
            <div className="flex flex-col gap-3">
              {accreditations.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 w-fit"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-blue-800 font-medium">{badge}</span>
                </div>
              ))}
            </div>

            {/* Excellence Rewarded */}
            <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-yellow-700 font-semibold mb-0.5">
                Excellence Rewarded
              </p>
              <p className="text-sm text-slate-700">
                Outstanding pupils are proudly celebrated and rewarded each term.
              </p>
            </div>
          </div>
        </div>

        {/* ── Portals strip ── */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold whitespace-nowrap">
              Quick Access
            </span>
            <div className="flex flex-wrap gap-2">
              {portals.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  <ExternalLink className="h-3 w-3" />
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Map embed ── */}
        <div className="mt-8 rounded-2xl overflow-hidden h-44 border border-slate-200">
          <iframe
            title="Campus map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=7.50%2C6.49%2C7.58%2C6.57&layer=mapnik&marker=6.53%2C7.54"
            className="w-full h-full grayscale opacity-50"
            loading="lazy"
          />
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {year} Preeminence International Montessori. All rights reserved. Powered by{" "}
            <a 
              href="https://bravotechub.com" 
              className="text-blue-700 hover:text-blue-600 transition"
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
                className="text-xs text-slate-500 hover:text-blue-700 transition"
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