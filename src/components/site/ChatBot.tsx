import { useState, useRef, useEffect, useCallback } from "react";
import {
  X, Send, Plus, User, Clock, Sparkles,
  GraduationCap, DollarSign, Calendar, Award, BookOpen,
  Minimize2, Maximize2, MessageCircle, ChevronRight
} from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────
const EDGE        = 12;   // px gap kept from any screen edge
const BTN         = 56;   // floating button size
const PANEL_W     = 390;  // desktop panel width
const PANEL_H     = 570;  // desktop panel height
const DRAG_T      = 6;    // px movement before a press becomes a drag

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

// WhatsApp-style doodle wallpaper
const WALLPAPER = {
  backgroundColor: "#0a1a10",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%2316a34a' fill-opacity='0.06'%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3Ccircle cx='40' cy='30' r='2'/%3E%3Cpath d='M55 10c3 3 3 7 0 10-3-3-3-7 0-10z'/%3E%3Cpath d='M20 55c3 3 3 7 0 10-3-3-3-7 0-10z'/%3E%3Ccircle cx='65' cy='55' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
};

// ── Bot reply logic ───────────────────────────────────────────────────────────
function getBotReply(msg) {
  const m = msg.toLowerCase();

  if (/apply|admission|enroll|join|application/.test(m))
    return {
      text: "🎓 Applying to Rochas Foundation College\n\nYou can apply through our online admissions portal. Here's what you'll need:\n\n📋 Requirements:\n• Completed application form\n• Previous academic transcripts\n• Birth certificate\n• Passport photos (2 copies)\n• Entrance examination fee\n\n👉 Visit our Admissions page or choose an option below.",
      options: ["Start Application", "Check Requirements", "Contact Admissions"],
    };

  if (/fee|tuition|cost|price|payment/.test(m))
    return {
      text: "💰 Tuition & Fees 2025/2026\n\nAnnual Tuition:\n• Grades 6–8: $24,500\n• Grades 9–10 (IGCSE): $28,500\n• Grades 11–12 (IB/AP): $32,000\n\nAdditional Fees:\n• Enrollment Fee: $1,800–$2,500\n• Boarding (optional): $8,500/year\n• Technology Fee: $500/year\n\n💡 Scholarships available up to 75%!",
      options: ["Scholarship Info", "Payment Plans", "Fee Breakdown"],
    };

  if (/scholarship|financial aid|merit|funding/.test(m))
    return {
      text: "🏆 Scholarship Programs\n\nRochas Foundation Scholars Program\n• Up to 75% tuition coverage\n• Merit-based + need-based\n\nEligibility:\n• Outstanding academic record\n• Leadership potential\n• Community involvement\n\nDeadline: November 30, 2025\n\n✨ Apply now to be considered!",
      options: ["Apply for Scholarship", "Check Eligibility", "Download Form"],
    };

  if (/tour|visit|campus|open house/.test(m))
    return {
      text: "🏫 Campus Tours & Open House\n\nRegular Tours:\n• Monday–Friday: 10AM & 2PM\n• Saturday: By appointment only\n\nOpen House Events:\n• June 14, 2026\n• September 20, 2026\n• November 15, 2026\n\n📍 Location: 88 Horizon Avenue, Abuja\n\n🎟️ Book your spot today!",
      options: ["Book a Tour", "Virtual Tour", "Get Directions"],
    };

  if (/program|course|subject|study|curriculum/.test(m))
    return {
      text: "📚 Academic Programs\n\nJunior School (Grades 6–8)\n• Cambridge Lower Secondary\n\nSenior School (Grades 9–12)\n• IGCSE Programme\n• IB Diploma Programme\n• AP Courses\n\nSpecialized Pathways:\n• STEM Innovation Lab\n• Arts & Humanities\n• Business & Entrepreneurship\n• Medical Sciences\n\n🎯 Each student receives personalized guidance!",
      options: ["View Curriculum", "Download Brochure", "Talk to Counselor"],
    };

  if (/boarding|hostel|dorm|accommodation/.test(m))
    return {
      text: "🏠 Boarding Facilities\n\nOptions Available:\n• Weekly Boarding (Mon–Fri)\n• Full Boarding (7 days)\n\nAmenities:\n• Air-conditioned rooms\n• Study lounges & recreation areas\n• 24/7 security & house parents\n• Nutritious meals provided\n\n📢 Limited spaces for Grades 9–12!",
      options: ["View Facilities", "Boarding Fees", "Apply for Boarding"],
    };

  if (/deadline|date|when|closing/.test(m))
    return {
      text: "📅 Important Dates 2025/2026\n\nApplication Deadlines:\n• Early Decision: October 31, 2025\n• Regular Decision: February 28, 2026\n• Rolling Admissions: Until May 31, 2026\n\nKey Events:\n• Open House: June 14, 2026\n• Scholarship Deadline: November 30, 2025\n• New Student Orientation: August 15, 2026\n\n⚠️ Apply early for priority consideration!",
      options: ["Apply Now", "Add to Calendar", "Request Reminder"],
    };

  if (/contact|phone|email|reach/.test(m))
    return {
      text: "📞 Contact Information\n\nAdmissions Office:\n• Phone: +234 812 345 6789\n• Email: admissions@rochasfoundation.edu\n\nGeneral Enquiries:\n• Email: hello@rochasfoundation.edu\n\nOffice Hours:\n• Monday–Friday: 8AM – 5PM\n• Saturday: 9AM – 1PM\n\n💬 Or keep chatting — I'm here 24/7!",
      options: ["Send Email", "Request Callback", "Live Chat Support"],
    };

  return {
    text: "Thank you for your message! I can help you with:\n\n🎓 Admissions – Application process & requirements\n💰 Fees – Tuition & payment options\n🏆 Scholarships – Financial aid & merit awards\n🏫 Campus Tours – Visit our facilities\n📚 Programs – Curriculum & pathways\n🏠 Boarding – Accommodation options\n📅 Deadlines – Important dates\n📞 Contact – Get in touch with us\n\nWhat would you like to know?",
    options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs", "Boarding"],
  };
}

// ── Quick actions bar ─────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: GraduationCap, label: "Admissions",  action: "Tell me about admissions" },
  { icon: DollarSign,    label: "Fees",         action: "What are the tuition fees?" },
  { icon: Award,         label: "Scholarships", action: "Tell me about scholarships" },
  { icon: Calendar,      label: "Tours",        action: "Book a campus tour" },
  { icon: BookOpen,      label: "Programs",     action: "What programs do you offer?" },
];

// ── Main component ────────────────────────────────────────────────────────────
export function ChatBot() {
  // Panel state
  const [open, setOpen]           = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [showQA, setShowQA]       = useState(true);
  const [messages, setMessages]   = useState([
    {
      id: "1",
      sender: "bot",
      text: "👋 Hello! I'm Rochas Assistant. How can I help you today? Feel free to ask about admissions, fees, scholarships, programs, or campus visits.",
      timestamp: new Date(),
      options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs"],
    },
  ]);

  // Draggable position (distance from right/bottom edges)
  const [pos, setPos]           = useState({ right: 24, bottom: 24 });
  const [placement, setPlacement] = useState({ up: true, left: false });
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered]     = useState(false);

  const dragRef    = useRef(null); // { startX, startY, startRight, startBottom }
  const movedRef   = useRef(false);
  const fabRef     = useRef(null);
  const inputRef   = useRef(null);
  const msgsEndRef = useRef(null);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const clampPos = useCallback((p) => {
    const w = window.innerWidth, h = window.innerHeight;
    return {
      right:  clamp(p.right,  EDGE, Math.max(EDGE, w - BTN - EDGE)),
      bottom: clamp(p.bottom, EDGE, Math.max(EDGE, h - BTN - EDGE)),
    };
  }, []);

  const computePlacement = useCallback(() => {
    const w = window.innerWidth, h = window.innerHeight;
    setPlacement({
      up:   (h - pos.bottom - BTN) >= PANEL_H || (h - pos.bottom - BTN) >= pos.bottom,
      left: (w - pos.right) >= PANEL_W,
    });
  }, [pos]);

  const scrollToBottom = () =>
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages, typing]);

  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, minimized]);

  // Re-clamp position on resize
  useEffect(() => {
    const onResize = () => setPos((p) => clampPos(p));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampPos]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // ── Drag (Pointer Events) ──────────────────────────────────────────────────
  const onPointerDown = (e) => {
    fabRef.current?.setPointerCapture(e.pointerId);
    movedRef.current = false;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX, startY: e.clientY,
      startRight: pos.right, startBottom: pos.bottom,
    };
  };

  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const { startX, startY, startRight, startBottom } = dragRef.current;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > DRAG_T) movedRef.current = true;
    setPos(clampPos({ right: startRight - dx, bottom: startBottom - dy }));
  };

  const onPointerUp = (e) => {
    fabRef.current?.releasePointerCapture(e.pointerId);
    setIsDragging(false);
    dragRef.current = null;
    if (!movedRef.current) {
      // It was a tap, not a drag — toggle panel
      if (!open) computePlacement();
      setOpen((v) => !v);
      setMinimized(false);
    }
    movedRef.current = false;
  };

  // ── Messaging ──────────────────────────────────────────────────────────────
  const sendMessage = (text = input) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now().toString(), sender: "user", text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setShowQA(false);

    setTimeout(() => {
      const { text: reply, options } = getBotReply(text);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "bot", text: reply, timestamp: new Date(), options },
      ]);
      setTyping(false);
    }, 800 + Math.random() * 400);
  };

  const startNewChat = () => {
    setMessages([{
      id: Date.now().toString(),
      sender: "bot",
      text: "👋 Hello! I'm Rochas Assistant. How can I help you today?",
      timestamp: new Date(),
      options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs"],
    }]);
    setShowQA(true);
    setInput("");
  };

  const fmtTime = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ── Panel position style ───────────────────────────────────────────────────
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const panelPositionStyle = isMobile
    ? { position: "fixed", left: 8, right: 8, bottom: 8, top: "auto" }
    : {
        position: "fixed",
        width: PANEL_W,
        maxHeight: PANEL_H,
        ...(placement.up
          ? { bottom: pos.bottom + BTN + 10 }
          : { top: window.innerHeight - pos.bottom + 10 }),
        ...(placement.left
          ? { right: pos.right }
          : { left: window.innerWidth - pos.right - BTN }),
      };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating Button ── */}
      <div
        style={{
          position: "fixed",
          right: pos.right,
          bottom: pos.bottom,
          zIndex: 9999,
          touchAction: "none",
          userSelect: "none",
        }}
      >
        <button
          ref={fabRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={open ? "Close Rochas chat" : "Open Rochas chat"}
          aria-expanded={open}
          style={{
            width: BTN,
            height: BTN,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#16a34a,#15803d)",
            border: "none",
            cursor: isDragging ? "grabbing" : "grab",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(22,163,74,.5)",
            transform: hovered && !isDragging ? "scale(1.1)" : "scale(1)",
            transition: "transform .2s",
            color: "#fff",
            position: "relative",
          }}
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}

          {/* Notification badge */}
          {!open && !isDragging && (
            <span style={{
              position: "absolute", top: -3, right: -3,
              width: 18, height: 18, borderRadius: "50%",
              background: "#ef4444", color: "#fff",
              fontSize: 9, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
            }}>1</span>
          )}
        </button>

        {/* Tooltip */}
        {hovered && !open && !isDragging && (
          <div style={{
            position: "absolute", right: BTN + 10, top: "50%",
            transform: "translateY(-50%)",
            background: "#1f2937", color: "#fff",
            fontSize: 11, fontWeight: 500,
            padding: "6px 12px", borderRadius: 8,
            whiteSpace: "nowrap", pointerEvents: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,.4)",
          }}>
            Chat with Rochas Assistant
            <div style={{
              position: "absolute", left: "100%", top: "50%",
              transform: "translateY(-50%)",
              width: 7, height: 7,
              background: "#1f2937", rotate: "45deg",
            }} />
          </div>
        )}
      </div>

      {/* ── Chat Panel ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "rgba(0,0,0,.45)", backdropFilter: "blur(2px)",
            }}
          />

          <div
            role="dialog"
            aria-label="Rochas Assistant"
            onClick={(e) => e.stopPropagation()}
            style={{
              ...panelPositionStyle,
              zIndex: 9999,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,.6)",
              display: "flex",
              flexDirection: "column",
              animation: "rfcSlideUp .22s ease-out",
            }}
          >
            <style>{`
              @keyframes rfcSlideUp {
                from { opacity:0; transform:translateY(12px) scale(.97); }
                to   { opacity:1; transform:translateY(0) scale(1); }
              }
              @keyframes rfcBounce {
                0%,80%,100% { transform:translateY(0); }
                40%          { transform:translateY(-5px); }
              }
              @keyframes rfcPulse {
                0%,100% { opacity:1; } 50% { opacity:.45; }
              }
              .rfc-dot1 { animation: rfcBounce 1s infinite 0ms; }
              .rfc-dot2 { animation: rfcBounce 1s infinite 150ms; }
              .rfc-dot3 { animation: rfcBounce 1s infinite 300ms; }
              .rfc-status-dot { animation: rfcPulse 2s infinite; }
              .rfc-msgs { scrollbar-width:thin; scrollbar-color:#16a34a33 transparent; }
              .rfc-msgs::-webkit-scrollbar { width:4px; }
              .rfc-msgs::-webkit-scrollbar-thumb { background:#16a34a44; border-radius:4px; }
              .rfc-opt-btn:hover { background:rgba(22,163,74,.55)!important; color:#fff!important; }
              .rfc-qa-btn:hover  { background:rgba(22,163,74,.45)!important; color:#fff!important; }
              .rfc-ctrl:hover    { background:rgba(255,255,255,.15)!important; }
              .rfc-input:focus   { outline:none; border-color:rgba(74,222,128,.6)!important; box-shadow:0 0 0 2px rgba(74,222,128,.2); }
            `}</style>

            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg,#15803d,#14532d)",
              padding: "12px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: "rgba(255,255,255,.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <MessageCircle size={17} color="#fff" />
                  </div>
                  <span className="rfc-status-dot" style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#4ade80", border: "2px solid #15803d",
                    display: "block",
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                    Rochas Assistant
                    <span style={{ fontSize: 8, background: "rgba(255,255,255,.2)", padding: "2px 6px", borderRadius: 10, fontWeight: 400 }}>AI</span>
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(187,247,208,.8)", display: "flex", alignItems: "center", gap: 3 }}>
                    <Clock size={9} /> Online • 24/7
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 2 }}>
                <button className="rfc-ctrl" onClick={() => setMinimized((v) => !v)} title={minimized ? "Expand" : "Minimise"}
                  style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
                  {minimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
                </button>
                <button className="rfc-ctrl" onClick={startNewChat} title="New chat"
                  style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
                  <Plus size={14} />
                </button>
                <button className="rfc-ctrl" onClick={() => setOpen(false)} aria-label="Close"
                  style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="rfc-msgs" style={{
                  ...WALLPAPER,
                  flex: 1,
                  overflowY: "auto",
                  padding: "14px 12px",
                  minHeight: 200,
                  maxHeight: isMobile ? "calc(100dvh - 230px)" : 330,
                }}>
                  {messages.map((msg) => {
                    const isBot = msg.sender === "bot";
                    return (
                      <div key={msg.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12, flexDirection: isBot ? "row" : "row-reverse" }}>
                        {/* Avatar */}
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: isBot ? "#15803d" : "#16a34a",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          {isBot ? <MessageCircle size={13} color="#fff" /> : <User size={13} color="#fff" />}
                        </div>

                        <div style={{ maxWidth: "82%" }}>
                          {/* Bubble */}
                          <div style={{
                            padding: "10px 13px",
                            borderRadius: isBot ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                            ...(isBot
                              ? { background: "rgba(15,30,18,.92)", border: "1px solid rgba(22,163,74,.3)", color: "#d1fae5" }
                              : { background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff" }),
                          }}>
                            <div style={{ fontSize: 11.5, whiteSpace: "pre-wrap", lineHeight: 1.65 }}>
                              {msg.text}
                            </div>
                          </div>

                          {/* Timestamp */}
                          <div style={{
                            fontSize: 9, color: "#4b7a5a", marginTop: 3,
                            display: "flex", alignItems: "center", gap: 3,
                            justifyContent: isBot ? "flex-start" : "flex-end",
                          }}>
                            <Clock size={8} /> {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                          </div>

                          {/* Option buttons */}
                          {msg.options && msg.options.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                              {msg.options.map((opt) => (
                                <button
                                  key={opt}
                                  className="rfc-opt-btn"
                                  onClick={() => sendMessage(opt)}
                                  style={{
                                    fontSize: 10,
                                    background: "rgba(15,30,18,.8)",
                                    border: "1px solid rgba(22,163,74,.5)",
                                    borderRadius: 20,
                                    padding: "4px 10px",
                                    color: "#86efac",
                                    cursor: "pointer",
                                    transition: "all .2s",
                                    display: "flex", alignItems: "center", gap: 4,
                                  }}
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

                  {/* Typing indicator */}
                  {typing && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#15803d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <MessageCircle size={13} color="#fff" />
                      </div>
                      <div style={{ background: "rgba(15,30,18,.92)", border: "1px solid rgba(22,163,74,.3)", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", display: "flex", alignItems: "center", gap: 4 }}>
                        <span className="rfc-dot1" style={{ display: "inline-block", width: 6, height: 6, background: "#4ade80", borderRadius: "50%" }} />
                        <span className="rfc-dot2" style={{ display: "inline-block", width: 6, height: 6, background: "#4ade80", borderRadius: "50%" }} />
                        <span className="rfc-dot3" style={{ display: "inline-block", width: 6, height: 6, background: "#4ade80", borderRadius: "50%" }} />
                      </div>
                    </div>
                  )}

                  <div ref={msgsEndRef} />
                </div>

                {/* Quick Actions */}
                {showQA && messages.length <= 2 && (
                  <div style={{
                    padding: "8px 12px",
                    borderTop: "1px solid rgba(22,163,74,.2)",
                    background: "rgba(5,15,8,.7)",
                  }}>
                    <div style={{ fontSize: 8, color: "#4b7a5a", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <Sparkles size={9} /> Quick Actions
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {QUICK_ACTIONS.map(({ icon: Icon, label, action }) => (
                        <button
                          key={label}
                          className="rfc-qa-btn"
                          onClick={() => sendMessage(action)}
                          style={{
                            display: "flex", alignItems: "center", gap: 5,
                            fontSize: 10,
                            background: "rgba(15,30,18,.7)",
                            border: "1px solid rgba(22,163,74,.35)",
                            borderRadius: 20, padding: "4px 10px",
                            color: "#86efac", cursor: "pointer", transition: "all .2s",
                          }}
                        >
                          <Icon size={11} /> {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div style={{
                  padding: "10px 12px",
                  borderTop: "1px solid rgba(22,163,74,.2)",
                  background: "rgba(5,15,8,.85)",
                  display: "flex", gap: 8, alignItems: "center",
                  flexShrink: 0,
                }}>
                  <input
                    ref={inputRef}
                    className="rfc-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message…"
                    style={{
                      flex: 1,
                      background: "rgba(22,163,74,.1)",
                      border: "1px solid rgba(22,163,74,.3)",
                      borderRadius: 12,
                      padding: "8px 12px",
                      fontSize: 12,
                      color: "#d1fae5",
                      transition: "border .2s",
                    }}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    style={{
                      width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                      background: input.trim() ? "linear-gradient(135deg,#16a34a,#15803d)" : "rgba(22,163,74,.2)",
                      border: "none",
                      cursor: input.trim() ? "pointer" : "not-allowed",
                      color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: input.trim() ? 1 : 0.4,
                      transition: "all .2s",
                    }}
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