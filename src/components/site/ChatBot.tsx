import { useState } from "react";
import { MessageCircle, X, Sparkles, Send } from "lucide-react";

export function ChatBot() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 z-40 group"
          aria-label="Open chat"
        >
          <span className="absolute inset-0 rounded-full gradient-gold blur-md opacity-70 group-hover:opacity-100 transition" />
          <span className="relative flex items-center gap-2 rounded-full gradient-hero text-primary-foreground pl-3 pr-4 py-3 shadow-elegant">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium">Ask Aurora</span>
          </span>
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 left-6 z-40 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl glass shadow-elegant overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="gradient-hero text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full gradient-gold flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Aurora · AI Assistant</div>
                <div className="text-xs opacity-70 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Online
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="hover:opacity-80">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
            <div className="rounded-xl rounded-tl-none bg-accent p-3 text-sm">
              Hi! I'm Aurora. Ask me about admissions, programs, fees or campus visits.
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {["Fees", "Apply", "Campus tour"].map((s) => (
                <button key={s} className="rounded-full glass px-3 py-1 text-xs hover:bg-accent">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <input
              placeholder="Type your message…"
              className="flex-1 rounded-lg bg-accent/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan/40"
            />
            <button className="h-9 w-9 rounded-lg gradient-cyan text-white flex items-center justify-center">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
