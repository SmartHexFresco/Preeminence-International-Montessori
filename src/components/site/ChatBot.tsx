

import { useState, useRef, useEffect, useCallback } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import {
  X, Send, Plus, User, Clock, Sparkles,
  GraduationCap, DollarSign, Calendar, BookOpen,
  Minimize2, Maximize2, MessageCircle, ChevronRight, ExternalLink
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────
type Message = {
  id: string;
  sender: "bot" | "user";
  timestamp: Date;
  text: string;
  waPrompt?: string;
  options?: string[];
};

// ── Contact channel — same WhatsApp number used site-wide ────────────────
const WHATSAPP_NUMBER = "+234 803 794 4661";
const PHONE_NUMBER = "+234 806 901 4998";
const toWhatsAppDigits = (number: string) => number.replace(/[\s+]/g, "");
const whatsappLink = (message?: string) =>
  `https://wa.me/${toWhatsAppDigits(WHATSAPP_NUMBER)}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

// ── Layout constants ─────────────────────────────────────────────────────
const BUTTON_SIZE = 56;
const EDGE_MARGIN = 12;
const DRAG_THRESHOLD = 6;
const PANEL_WIDTH_DESKTOP = 390;
const PANEL_HEIGHT_DESKTOP = 560;
const PANEL_GAP = 10; // space between the FAB and the panel
const MOBILE_BREAKPOINT = 640;
const REPLY_DELAY_MS = 800;
const REPLY_DELAY_JITTER_MS = 400;

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

const WALLPAPER: React.CSSProperties = {
  backgroundColor: "#0a1a10",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%2316a34a' fill-opacity='0.06'%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3Ccircle cx='40' cy='30' r='2'/%3E%3Cpath d='M55 10c3 3 3 7 0 10-3-3-3-7 0-10z'/%3E%3Cpath d='M20 55c3 3 3 7 0 10-3-3-3-7 0-10z'/%3E%3Ccircle cx='65' cy='55' r='2'/%3E%3C/g%3E%3C/svg%3E\")",
};

// ── Bot replies ──────────────────────────────────────────────────────────
function getBotReply(msg: string): { text: string; waPrompt: string; options: string[] } {
  const m = msg.toLowerCase();
  const wa = (topic: string) =>
    `\n\n📲 Message us on WhatsApp for ${topic}:\n${WHATSAPP_NUMBER}`;

  if (/apply|admission|enroll|join|application|requirement/.test(m)) return {
    text: `🎓 Applying to Preeminence International Montessori\n\nYou can apply through our online admissions portal. Here's what you need:\n\n📋 Requirements:\n• Completed application form\n• Previous school report\n• Birth certificate\n• Passport photos (2 copies)\n• Enrolment form & fee${wa("application support & next steps")}`,
    waPrompt: "Hello! I'd like to start my application to Preeminence International Montessori. Please guide me on the next steps.",
    options: ["Check Requirements", "Fees & Costs"],
  };

  if (/fee|tuition|cost|price|payment/.test(m)) return {
    text: `💰 Tuition & Fees 2025/2026\n\nAnnual Tuition:\n• Nursery 1–2: ₦20,000\n• Primary 1–3: ₦25,000\n• Primary 4–6: ₦30,000\n\nAdditional Fees:\n• Enrollment: ₦5,000–₦10,000\n\nContact us for payment plans!${wa("payment plans & fee breakdowns")}`,
    waPrompt: "Hello! I'd like more details on Preeminence International Montessori fees and payment plan options.",
    options: ["Meals & Day Care", "Apply Now"],
  };

  if (/tour|visit|campus|open house|direction|location|address/.test(m)) return {
    text: `🏫 Campus Tours & Open House\n\nRegular Tours:\n• Mon–Fri: 10AM & 2PM\n• Saturday: By appointment\n\nOpen House Dates:\n• June 14, 2026\n• September 20, 2026\n• November 15, 2026\n\n📍 39 Obodoko Layout, Amankpaka, Ugwuogo Nike, Enugu${wa("booking a campus tour or open house visit")}`,
    waPrompt: "Hello! I'd like to schedule a campus tour at Preeminence International Montessori. When is the next available date?",
    options: ["Book a Tour", "Get Directions", "Programs Offered"],
  };

  if (/program|course|subject|study|curriculum/.test(m)) return {
    text: `📚 Our Programme\n\nNursery 1–2 (Ages 3–5)\n• The Montessori Method\n• Learning through play\n\nPrimary 1–3 (Ages 5–8)\n• Nigerian Primary Curriculum\n• Reading, writing & numeracy\n\nPrimary 4–6 (Ages 8–11)\n• Deeper academics & projects\n• Leadership & character\n\nPlus:\n• Creative Arts & Music\n• Science & Nature Discovery\n• P.E., Sports & Play\n• French & local languages\n\nAll guided by trained Montessori guides in small classes.${wa("curriculum details & subject choices")}`,
    waPrompt: "Hello! I'd like to learn more about the academic programs and curriculum at Preeminence International Montessori.",
    options: ["Fees & Costs", "Admissions"],
  };

  if (/meal|lunch|day care|after.?school|canteen|snack|feeding/.test(m)) return {
    text: `🍽️ Meals & Day Care\n\nMeals:\n• Nutritious breakfast, lunch & snacks\n• Healthy, child-friendly menus\n• Special dietary needs catered for\n\nDay Care:\n• After-school care & homework club\n• Safe pick-up & drop-off\n\n📢 Ask about our full day care programme!${wa("meals, menus & day care details")}`,
    waPrompt: "Hello! I'd like to know more about the meals and day care at Preeminence International Montessori.",
    options: ["Fees & Costs", "Full Programs", "Apply Now"],
  };

  if (/deadline|date|when|closing/.test(m)) return {
    text: `📅 Key Dates 2025/2026\n\nApplication Deadlines:\n• Early Decision: Oct 31, 2025\n• Regular Decision: Feb 28, 2026\n• Rolling Admissions: May 31, 2026\n\nEvents:\n• Open House: June 14, 2026\n• New Learner Orientation: Aug 15, 2026${wa("deadline reminders & application help")}`,
    waPrompt: "Hello! I need help with application deadlines for Preeminence International Montessori. Can you guide me?",
    options: ["Apply Now", "Campus Tour"],
  };

  if (/contact|phone|email|reach|whatsapp/.test(m)) return {
    text: `📞 Contact Preeminence\n\nWhatsApp:\n${WHATSAPP_NUMBER}\n\nPhone:\n${PHONE_NUMBER}\n\nAdmissions Email:\nadmissions@preeminence.edu\n\nGeneral Enquiries:\nhello@preeminence.edu\n\nOffice Hours:\n• Mon–Fri: 8AM – 5PM\n• Saturday: 9AM – 1PM\n\nTap the button below to open WhatsApp now!`,
    waPrompt: "Hello! I'd like to speak with the Preeminence International Montessori admissions team.",
    options: ["Admissions Info", "Fees & Costs", "Campus Tour"],
  };

  return {
    text: `👋 I can help you with:\n\n🎓 Admissions – Process & requirements\n💰 Fees – Tuition & payment options\n🏫 Campus Tours – Visit us\n📚 Programs – Curriculum & pathways\n🍽️ Meals & Day Care – Healthy meals & care\n📅 Deadlines – Important dates\n📞 Contact – Reach our team\n\nPick a topic below or type your question!${wa("any enquiry")}`,
    waPrompt: "Hello! I have an enquiry about Preeminence International Montessori.",
    options: ["Admissions", "Fees", "Tours", "Programs", "Meals & Day Care"],
  };
}

// ── Quick Actions ────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: GraduationCap, label: "Admissions", action: "Tell me about admissions" },
  { icon: DollarSign, label: "Fees", action: "What are the tuition fees?" },
  { icon: Calendar, label: "Tours", action: "Book a campus tour" },
  { icon: BookOpen, label: "Programs", action: "What programs do you offer?" },
];

// ── Component ────────────────────────────────────────────────────────────
export function ChatBot() {
  const INIT_MSG: Message = {
    id: "1",
    sender: "bot",
    timestamp: new Date(),
    text: "👋 Hello! I'm the Preeminence Assistant.\n\nAsk me anything about admissions, fees, programs, meals & day care, or campus life — I'll give you the details and connect you with our team on WhatsApp for anything else.",
    waPrompt: "Hello! I have an enquiry about Preeminence International Montessori.",
    options: ["Admissions", "Fees", "Tours", "Programs"],
  };

  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQA, setShowQA] = useState(true);
  const [messages, setMessages] = useState<Message[]>([INIT_MSG]);

  const [pos, setPos] = useState({ right: 24, bottom: 24 });
  const [placement, setPlacement] = useState({ up: true, left: false });
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1024,
    h: typeof window !== "undefined" ? window.innerHeight : 768,
  }));
  const isMobile = viewport.w < MOBILE_BREAKPOINT;
  const panelOpen = open && !minimized;

  const dragRef = useRef<{ startX: number; startY: number; startRight: number; startBottom: number } | null>(null);
  const movedRef = useRef(false);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const msgsEndRef = useRef<HTMLDivElement | null>(null);
  const msgsBoxRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ── Helpers ────────────────────────────────────────────────────────────
  const clampPos = useCallback((p: { right: number; bottom: number }) => {
    const w = viewport.w, h = viewport.h;
    return {
      right: clamp(p.right, EDGE_MARGIN, Math.max(EDGE_MARGIN, w - BUTTON_SIZE - EDGE_MARGIN)),
      bottom: clamp(p.bottom, EDGE_MARGIN, Math.max(EDGE_MARGIN, h - BUTTON_SIZE - EDGE_MARGIN)),
    };
  }, [viewport]);

  const computePlacement = useCallback(() => {
    const w = viewport.w, h = viewport.h;
    const panelH = Math.min(PANEL_HEIGHT_DESKTOP, h * 0.85);
    const panelW = Math.min(PANEL_WIDTH_DESKTOP, w - 24);
    setPlacement({
      up: (h - pos.bottom - BUTTON_SIZE) >= panelH || (h - pos.bottom - BUTTON_SIZE) > pos.bottom,
      left: (w - pos.right - BUTTON_SIZE) < panelW,
    });
  }, [pos, viewport]);

  const fmtTime = useCallback((d: Date) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), []);

  // ── Robust body scroll lock ────────────────────────────────────────────
  // overflow:hidden alone doesn't reliably stop rubber-band scrolling on
  // iOS Safari, which is why the background page could still scroll.
  // Pinning the body with position:fixed (and restoring the exact scroll
  // offset on close) is the version that actually holds on every browser.
  useEffect(() => {
    if (!panelOpen) return undefined;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      position: style.position,
      top: style.top,
      width: style.width,
      overflow: style.overflow,
    };

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = prev.position;
      style.top = prev.top;
      style.width = prev.width;
      style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [panelOpen]);

  // ── Scroll containment ─────────────────────────────────────────────────
  // Belt-and-braces alongside the body lock above: any touch drag that
  // starts outside the message list is blocked outright, so a finger swipe
  // on the header, backdrop, or input bar can never leak through to the
  // page underneath. Swipes that start inside the message list scroll it
  // normally.
  useEffect(() => {
    if (!panelOpen) return undefined;

    const handleTouchMove = (e: TouchEvent) => {
      const msgsEl = msgsBoxRef.current;
      if (msgsEl && e.target instanceof Node && msgsEl.contains(e.target)) return;
      e.preventDefault();
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, [panelOpen]);

  // Mouse-wheel equivalent: let the message list scroll itself, and only
  // let a wheel gesture bubble past it once it's already at the very top
  // or bottom (the body lock above means that bubble goes nowhere anyway,
  // but this keeps trackpad momentum scrolling from fighting the panel).
  useEffect(() => {
    const el = msgsBoxRef.current;
    if (!el || !panelOpen) return undefined;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) return;

      e.preventDefault();
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [panelOpen]);

  // ── Auto-scroll to latest message ──────────────────────────────────────
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (panelOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [panelOpen]);

  // ── Focus trap while the panel is open ─────────────────────────────────
  useEffect(() => {
    if (!panelOpen) return undefined;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [panelOpen]);

  // Resize / orientation-change / on-screen-keyboard (visualViewport) listener
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      setViewport({ w, h });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    setPos((p) => clampPos(p));
  }, [clampPos]);

  // Clear any in-flight bot reply if the component unmounts mid-"typing".
  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  // ── Drag handlers (unified mouse + touch via Pointer Events) ───────────
  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    fabRef.current?.setPointerCapture(e.pointerId);
    movedRef.current = false;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startRight: pos.right,
      startBottom: pos.bottom,
    };
  }, [pos.right, pos.bottom]);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current) return;
    const { startX, startY, startRight, startBottom } = dragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) movedRef.current = true;

    setPos(clampPos({ right: startRight - dx, bottom: startBottom - dy }));
  }, [clampPos]);

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    fabRef.current?.releasePointerCapture(e.pointerId);
    setIsDragging(false);
    const moved = movedRef.current;
    dragRef.current = null;
    movedRef.current = false;
    if (!moved) {
      if (!open) computePlacement();
      setOpen((v) => !v);
      setMinimized(false);
    }
  }, [open, computePlacement]);

  const onFabKeyDown = useCallback((e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) computePlacement();
      setOpen((v) => !v);
      setMinimized(false);
    }
  }, [open, computePlacement]);

  // ── Messaging ────────────────────────────────────────────────────────
  const sendMessage = useCallback((text?: string) => {
    const trimmed = (typeof text === "string" ? text : input).trim();
    if (!trimmed || typing) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setShowQA(false);

    if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    replyTimeoutRef.current = setTimeout(() => {
      const reply = getBotReply(trimmed);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply.text,
        timestamp: new Date(),
        options: reply.options,
        waPrompt: reply.waPrompt,
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, REPLY_DELAY_MS + Math.random() * REPLY_DELAY_JITTER_MS);
  }, [input, typing]);

  const startNew = useCallback(() => {
    if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    setTyping(false);
    setMessages([{ ...INIT_MSG, id: Date.now().toString(), timestamp: new Date() }]);
    setShowQA(true);
    setInput("");
  }, []);

  // ── Panel sizing/position ───────────────────────────────────────────────
  const getPanelStyle = useCallback((): React.CSSProperties => {
    const w = viewport.w, h = viewport.h;

    if (isMobile) {
      return {
        position: "fixed",
        left: 8,
        right: 8,
        bottom: 8,
        top: "auto",
        height: "min(96dvh, 640px)",
        maxHeight: "96dvh",
      };
    }

    const panelW = Math.max(280, Math.min(PANEL_WIDTH_DESKTOP, w - 48));
    const desiredH = Math.max(280, Math.min(PANEL_HEIGHT_DESKTOP, h - 120));

    const spaceAbove = Math.max(0, h - pos.bottom - BUTTON_SIZE - 16);
    const spaceBelow = Math.max(0, pos.bottom - 16);
    const openUp = spaceAbove >= Math.min(desiredH, 320) || spaceAbove >= spaceBelow;

    const btnLeft = w - pos.right - BUTTON_SIZE;
    const openLeft = btnLeft + panelW > w - EDGE_MARGIN;

    const availableSpace = Math.max(spaceAbove, spaceBelow, 240);
    const finalH = Math.min(desiredH, availableSpace);

    const result: React.CSSProperties = {
      position: "fixed",
      width: panelW,
      height: finalH,
      maxHeight: desiredH,
    };

    result[openUp ? "bottom" : "top"] = openUp
      ? pos.bottom + BUTTON_SIZE + PANEL_GAP
      : Math.max(EDGE_MARGIN, h - pos.bottom + PANEL_GAP);

    result[openLeft ? "right" : "left"] = openLeft
      ? pos.right
      : Math.max(EDGE_MARGIN, w - pos.right - BUTTON_SIZE);

    return result;
  }, [viewport, pos, isMobile]);

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes rfcPanelIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .rfc-scroll { scrollbar-width: thin; scrollbar-color: rgba(22,163,74,0.27) transparent; }
        .rfc-scroll::-webkit-scrollbar { width: 4px; }
        .rfc-scroll::-webkit-scrollbar-thumb { background: rgba(22,163,74,0.27); border-radius: 4px; }
        @media (max-width: 639px) {
          .rfc-input { font-size: 16px !important; }
        }
      `}</style>

      {/* ── Floating Button ── */}
      <div
        className="fixed z-[10001] touch-none select-none"
        style={{ right: pos.right, bottom: pos.bottom }}
      >
        <button
          ref={fabRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onFabKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={open ? "Close chat" : "Open Preeminence Assistant chat"}
          aria-expanded={open}
          className={`
            relative flex h-14 w-14 items-center justify-center rounded-full
            bg-gradient-to-br from-green-600 to-green-700 text-white
            shadow-[0_4px_22px_rgba(22,163,74,0.5)]
            transition-transform duration-200
            ${hovered && !isDragging ? "scale-110" : "scale-100"}
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          `}
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}

          {!open && !isDragging && (
            <span className="pointer-events-none absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              1
            </span>
          )}
        </button>

        {hovered && !open && !isDragging && (
          <div className="pointer-events-none absolute right-full top-1/2 mr-2.5 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg">
            Chat with Preeminence Assistant
            <div className="absolute left-full top-1/2 h-[7px] w-[7px] -translate-y-1/2 rotate-45 bg-gray-900" />
          </div>
        )}
      </div>

      {/* ── Panel ── */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-[3px]"
            aria-hidden="true"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Preeminence Assistant chat"
            onClick={(e) => e.stopPropagation()}
            style={{ ...getPanelStyle(), zIndex: 10000 }}
            className="flex flex-col overflow-hidden rounded-[20px] bg-[#0a1a10] shadow-[0_20px_64px_rgba(0,0,0,0.65)] [animation:rfcPanelIn_0.22s_ease-out]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between bg-gradient-to-br from-green-800 to-green-900 px-3.5 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/15">
                    <MessageCircle size={17} className="text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 animate-pulse rounded-full border-2 border-green-900 bg-green-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
                    Preeminence Assistant
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[8px]">BOT</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-green-100/80">
                    <Clock size={9} /> Online · WhatsApp {WHATSAPP_NUMBER}
                  </div>
                </div>
              </div>

              <div className="flex gap-0.5">
                <button
                  onClick={() => setMinimized((v) => !v)}
                  title={minimized ? "Expand" : "Minimise"}
                  aria-label={minimized ? "Expand chat" : "Minimise chat"}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15"
                >
                  {minimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
                </button>
                <button
                  onClick={startNew}
                  title="New chat"
                  aria-label="Start a new chat"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15"
                >
                  <Plus size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div
                  ref={msgsBoxRef}
                  className="rfc-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3.5"
                  style={WALLPAPER}
                  role="log"
                  aria-live="polite"
                  aria-label="Chat messages"
                >
                  {messages.map((msg) => {
                    const isBot = msg.sender === "bot";
                    return (
                      <div
                        key={msg.id}
                        className={`mb-3.5 flex items-start gap-2 ${isBot ? "flex-row" : "flex-row-reverse"}`}
                      >
                        <div
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                            isBot ? "bg-green-700" : "bg-green-600"
                          }`}
                        >
                          {isBot ? <MessageCircle size={13} className="text-white" /> : <User size={13} className="text-white" />}
                        </div>

                        <div className="min-w-0 max-w-[82%]">
                          <div
                            className={`px-3.5 py-2.5 text-[11.5px] leading-relaxed whitespace-pre-wrap break-words ${
                              isBot
                                ? "rounded-[4px_16px_16px_16px] border border-green-600/30 bg-[#0c1c10]/95 text-emerald-100"
                                : "rounded-[16px_4px_16px_16px] bg-gradient-to-br from-green-600 to-green-700 text-white"
                            }`}
                          >
                            {msg.text}
                          </div>

                          <div className={`mt-1 flex items-center gap-1 text-[9px] text-green-800/80 ${isBot ? "justify-start" : "justify-end"}`}>
                            <Clock size={8} /> {fmtTime(msg.timestamp)}
                          </div>

                          {isBot && msg.waPrompt && (
                            <a
                              href={whatsappLink(msg.waPrompt)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-green-700"
                            >
                              <MessageCircle size={12} /> Continue on WhatsApp <ExternalLink size={10} />
                            </a>
                          )}

                          {msg.options && msg.options.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {msg.options.map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => sendMessage(opt)}
                                  disabled={typing}
                                  className="flex items-center gap-1 rounded-full border border-green-600/45 bg-[#0c1c10]/80 px-2.5 py-1 text-[10px] text-green-300 transition-colors hover:bg-green-700/55 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  {opt} <ChevronRight size={9} />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {typing && (
                    <div className="mb-3 flex items-start gap-2" aria-label="Preeminence Assistant is typing">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700">
                        <MessageCircle size={13} className="text-white" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-[4px_16px_16px_16px] border border-green-600/30 bg-[#0c1c10]/95 px-3.5 py-3">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}

                  <div ref={msgsEndRef} />
                </div>

                {/* Quick Actions */}
                {showQA && messages.length <= 2 && (
                  <div className="shrink-0 border-t border-green-600/20 bg-[#040c06]/80 px-3 py-2">
                    <p className="mb-1.5 flex items-center gap-1 text-[8px] uppercase tracking-wider text-green-800">
                      <Sparkles size={9} /> Quick topics
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_ACTIONS.map(({ icon: Icon, label, action }) => (
                        <button
                          key={label}
                          onClick={() => sendMessage(action)}
                          disabled={typing}
                          className="flex items-center gap-1 rounded-full border border-green-600/35 bg-[#0c1c10]/75 px-2.5 py-1.5 text-[10px] text-green-300 transition-colors hover:bg-green-700/45 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Icon size={11} /> {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input bar */}
                <div className="flex shrink-0 items-center gap-2 border-t border-green-600/20 bg-[#040c06]/95 px-3 py-2.5">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message…"
                    aria-label="Type a message"
                    className="rfc-input min-w-0 flex-1 rounded-xl border border-green-600/30 bg-green-600/10 px-3.5 py-2.5 text-xs text-emerald-100 placeholder:text-green-700 outline-none transition-colors focus:border-green-400/65 focus:ring-2 focus:ring-green-400/20"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || typing}
                    aria-label="Send message"
                    className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl text-white transition-all ${
                      input.trim() && !typing
                        ? "bg-gradient-to-br from-green-600 to-green-700"
                        : "cursor-not-allowed bg-green-600/15 opacity-35"
                    }`}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ChatBot;