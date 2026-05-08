import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { ChatBot } from "./ChatBot";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <ChatBot />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-cyan/20 blur-3xl animate-blob" />
      <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl animate-blob" />
      <div className="relative mx-auto max-w-5xl px-4 text-center">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full glass px-3 py-1 text-xs font-medium tracking-wider uppercase text-foreground/80 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold mr-2 animate-pulse" />
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
