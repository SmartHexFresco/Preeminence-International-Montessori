import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail, Clock, GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl animate-blob" />

      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg gradient-gold flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold text-lg">Northbridge</div>
                <div className="text-[10px] uppercase tracking-widest text-primary-foreground/60">International Academy</div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Cultivating tomorrow's global leaders through innovation, inquiry and integrity. Grades 6–12.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-lg glass-dark flex items-center justify-center hover:bg-gold hover:text-primary transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Explore</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {[
                ["About", "/about"], ["Academics", "/academics"], ["Admissions", "/admissions"],
                ["Student Life", "/student-life"], ["News", "/news"], ["Contact", "/contact"],
              ].map(([l, h]) => (
                <li key={h}><Link to={h} className="hover:text-gold transition">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Quick Access</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Student Portal", "Parent Login", "e-Learning", "Calendar", "Bus Tracking", "Online Payments"].map((s) => (
                <li key={s}><a href="#" className="hover:text-gold transition">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Reach Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-cyan flex-shrink-0" /> 88 Horizon Avenue, Education District</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-cyan flex-shrink-0" /> +1 (555) 012-3456</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-cyan flex-shrink-0" /> hello@northbridge.edu</li>
              <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 text-cyan flex-shrink-0" /> Mon–Fri 7:30–17:00</li>
            </ul>
            <div className="mt-4 rounded-xl glass-dark p-3 border-coral/40">
              <div className="text-xs uppercase tracking-wider text-coral">Emergency</div>
              <div className="text-sm font-semibold">+1 (555) 911-0000</div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden h-48 glass-dark">
          <iframe
            title="Campus map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.01%2C40.70%2C-73.96%2C40.74&layer=mapnik"
            className="w-full h-full grayscale-[20%] opacity-90"
            loading="lazy"
          />
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Northbridge International Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Accreditations</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
