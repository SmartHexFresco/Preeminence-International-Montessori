import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHero } from "@/components/site/Layout";
import { MapPin, Phone, Mail, MessageCircle, Building2, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Northbridge International Academy" },
      { name: "description", content: "Get in touch with admissions, faculty or campus services. We respond within 24 hours." },
      { property: "og:title", content: "Contact Northbridge" },
      { property: "og:description", content: "Get in touch with admissions, faculty or campus services." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const depts = [
    { t: "Admissions", e: "admissions@northbridge.edu", p: "+1 (555) 012-3401" },
    { t: "Academics", e: "academics@northbridge.edu", p: "+1 (555) 012-3402" },
    { t: "Finance", e: "finance@northbridge.edu", p: "+1 (555) 012-3403" },
    { t: "Boarding", e: "boarding@northbridge.edu", p: "+1 (555) 012-3404" },
  ];
  const faqs = [
    { q: "What's the fastest way to book a campus tour?", a: "Use the inquiry form below or email admissions directly. Tours run Tue–Thu at 10am and 2pm." },
    { q: "Do you offer evening drop-in sessions?", a: "Yes — first Wednesday of each month from 5–7pm. RSVP via the events page." },
    { q: "Can I email a specific teacher?", a: "Yes. Use the staff directory in the parent portal or call our switchboard." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <PageHero eyebrow="Contact" title="Let's start a conversation." subtitle="Whether you're applying, partnering or just curious — we'd love to hear from you." />

      <section className="py-12 mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-card border border-border p-8 shadow-soft">
          <h3 className="font-display font-bold text-2xl mb-6">Send us a message</h3>
          <form className="grid gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="First name" className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" />
              <input placeholder="Last name" className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" />
            </div>
            <input type="email" placeholder="Email" className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" />
            <select className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40">
              <option>Department · Admissions</option>
              <option>Academics</option><option>Finance</option><option>Boarding</option>
            </select>
            <textarea rows={5} placeholder="How can we help?" className="rounded-xl bg-background border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan/40" />
            <button className="rounded-xl gradient-gold text-gold-foreground py-3 font-bold shadow-gold hover:scale-[1.02] transition">Send Message</button>
          </form>
        </div>
        <div className="space-y-5">
          <div className="rounded-3xl overflow-hidden h-64 border border-border shadow-soft">
            <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=-74.01%2C40.70%2C-73.96%2C40.74&layer=mapnik" className="w-full h-full" loading="lazy" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-card border border-border p-5 flex items-start gap-3">
              <MapPin className="h-5 w-5 text-cyan mt-0.5" />
              <div><div className="font-semibold text-sm">Visit</div><div className="text-xs text-muted-foreground">88 Horizon Avenue</div></div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 flex items-start gap-3">
              <Phone className="h-5 w-5 text-cyan mt-0.5" />
              <div><div className="font-semibold text-sm">Call</div><div className="text-xs text-muted-foreground">+1 (555) 012-3456</div></div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5 flex items-start gap-3">
              <Mail className="h-5 w-5 text-cyan mt-0.5" />
              <div><div className="font-semibold text-sm">Email</div><div className="text-xs text-muted-foreground">hello@northbridge.edu</div></div>
            </div>
            <div className="rounded-2xl gradient-coral text-white p-5 flex items-start gap-3">
              <MessageCircle className="h-5 w-5 mt-0.5" />
              <div><div className="font-semibold text-sm">Live Chat</div><div className="text-xs opacity-90">Avg reply: 2 min</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-10">Department contacts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {depts.map((d) => (
              <div key={d.t} className="rounded-3xl bg-card border border-border p-6 hover:shadow-elegant transition">
                <div className="h-10 w-10 rounded-xl gradient-cyan flex items-center justify-center mb-3">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div className="font-display font-bold">{d.t}</div>
                <div className="text-xs text-muted-foreground mt-2 break-words">{d.e}</div>
                <div className="text-xs text-muted-foreground">{d.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 mx-auto max-w-3xl px-4">
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold mb-8">FAQs</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl bg-card border border-border overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-5 flex items-center justify-between text-left">
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={`h-5 w-5 transition ${open === i ? "rotate-180 text-gold" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
