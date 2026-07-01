// import { useState, useRef, useEffect, useCallback } from "react";
// import {
//   X, Send, Plus, User, Clock, Sparkles,
//   GraduationCap, DollarSign, Calendar, Award, BookOpen,
//   Minimize2, Maximize2, MessageCircle, ChevronRight
// } from "lucide-react";

// // ── Constants ─────────────────────────────────────────────────────────────────
// const WHATSAPP_NUMBER = "+2348133878927"; // displayed: +234 813 387 8927
// const toWADigits = (n) => n.replace(/[\s+\-()]/g, "");

// const EDGE    = 12;
// const BTN     = 56;
// const PANEL_W = 390;
// const PANEL_H = 570;
// const DRAG_T  = 6;

// const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

// const WALLPAPER = {
//   backgroundColor: "#0a1a10",
//   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%2316a34a' fill-opacity='0.06'%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3Ccircle cx='40' cy='30' r='2'/%3E%3Cpath d='M55 10c3 3 3 7 0 10-3-3-3-7 0-10z'/%3E%3Cpath d='M20 55c3 3 3 7 0 10-3-3-3-7 0-10z'/%3E%3Ccircle cx='65' cy='55' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
// };

// // ── Bot reply logic ───────────────────────────────────────────────────────────
// function getBotReply(msg) {
//   const m = msg.toLowerCase();

//   if (/apply|admission|enroll|join|application/.test(m))
//     return {
//       text: "🎓 Applying to Rochas Foundation College\n\nYou can apply through our online admissions portal. Here's what you'll need:\n\n📋 Requirements:\n• Completed application form\n• Previous academic transcripts\n• Birth certificate\n• Passport photos (2 copies)\n• Entrance examination fee\n\n👉 Tap an option below or send us a message on WhatsApp!",
//       options: ["Start Application", "Check Requirements", "Contact Admissions"],
//     };

//   if (/fee|tuition|cost|price|payment/.test(m))
//     return {
//       text: "💰 Tuition & Fees 2025/2026\n\nAnnual Tuition:\n• Grades 6–8: $24,500\n• Grades 9–10 (IGCSE): $28,500\n• Grades 11–12 (IB/AP): $32,000\n\nAdditional Fees:\n• Enrollment Fee: $1,800–$2,500\n• Boarding (optional): $8,500/year\n• Technology Fee: $500/year\n\n💡 Scholarships available up to 75%!",
//       options: ["Scholarship Info", "Payment Plans", "Fee Breakdown"],
//     };

//   if (/scholarship|financial aid|merit|funding/.test(m))
//     return {
//       text: "🏆 Scholarship Programs\n\nRochas Foundation Scholars Program\n• Up to 75% tuition coverage\n• Merit-based + need-based\n\nEligibility:\n• Outstanding academic record\n• Leadership potential\n• Community involvement\n\nDeadline: November 30, 2025\n\n✨ Apply now to be considered!",
//       options: ["Apply for Scholarship", "Check Eligibility", "Download Form"],
//     };

//   if (/tour|visit|campus|open house/.test(m))
//     return {
//       text: "🏫 Campus Tours & Open House\n\nRegular Tours:\n• Monday–Friday: 10AM & 2PM\n• Saturday: By appointment only\n\nOpen House Events:\n• June 14, 2026\n• September 20, 2026\n• November 15, 2026\n\n📍 Location: 88 Horizon Avenue, Abuja\n\n🎟️ Book your spot today!",
//       options: ["Book a Tour", "Virtual Tour", "Get Directions"],
//     };

//   if (/program|course|subject|study|curriculum/.test(m))
//     return {
//       text: "📚 Academic Programs\n\nJunior School (Grades 6–8)\n• Cambridge Lower Secondary\n\nSenior School (Grades 9–12)\n• IGCSE Programme\n• IB Diploma Programme\n• AP Courses\n\nSpecialized Pathways:\n• STEM Innovation Lab\n• Arts & Humanities\n• Business & Entrepreneurship\n• Medical Sciences\n\n🎯 Each student receives personalized guidance!",
//       options: ["View Curriculum", "Download Brochure", "Talk to Counselor"],
//     };

//   if (/boarding|hostel|dorm|accommodation/.test(m))
//     return {
//       text: "🏠 Boarding Facilities\n\nOptions Available:\n• Weekly Boarding (Mon–Fri)\n• Full Boarding (7 days)\n\nAmenities:\n• Air-conditioned rooms\n• Study lounges & recreation areas\n• 24/7 security & house parents\n• Nutritious meals provided\n\n📢 Limited spaces for Grades 9–12!",
//       options: ["View Facilities", "Boarding Fees", "Apply for Boarding"],
//     };

//   if (/deadline|date|when|closing/.test(m))
//     return {
//       text: "📅 Important Dates 2025/2026\n\nApplication Deadlines:\n• Early Decision: October 31, 2025\n• Regular Decision: February 28, 2026\n• Rolling Admissions: Until May 31, 2026\n\nKey Events:\n• Open House: June 14, 2026\n• Scholarship Deadline: November 30, 2025\n• New Student Orientation: August 15, 2026\n\n⚠️ Apply early for priority consideration!",
//       options: ["Apply Now", "Add to Calendar", "Request Reminder"],
//     };

//   if (/contact|phone|email|reach/.test(m))
//     return {
//       text: "📞 Contact Information\n\nWhatsApp / Phone:\n• +234 813 387 8927\n\nAdmissions Email:\n• admissions@rochasfoundation.edu\n\nGeneral Enquiries:\n• hello@rochasfoundation.edu\n\nOffice Hours:\n• Monday–Friday: 8AM – 5PM\n• Saturday: 9AM – 1PM",
//       options: ["Send WhatsApp", "Request Callback", "Live Chat Support"],
//     };

//   return {
//     text: "Thank you for your message! I can help you with:\n\n🎓 Admissions – Application process & requirements\n💰 Fees – Tuition & payment options\n🏆 Scholarships – Financial aid & merit awards\n🏫 Campus Tours – Visit our facilities\n📚 Programs – Curriculum & pathways\n🏠 Boarding – Accommodation options\n📅 Deadlines – Important dates\n📞 Contact – Get in touch with us\n\nWhat would you like to know?",
//     options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs", "Boarding"],
//   };
// }

// // ── Quick actions ─────────────────────────────────────────────────────────────
// const QUICK_ACTIONS = [
//   { icon: GraduationCap, label: "Admissions",   action: "Tell me about admissions" },
//   { icon: DollarSign,    label: "Fees",          action: "What are the tuition fees?" },
//   { icon: Award,         label: "Scholarships",  action: "Tell me about scholarships" },
//   { icon: Calendar,      label: "Tours",         action: "Book a campus tour" },
//   { icon: BookOpen,      label: "Programs",      action: "What programs do you offer?" },
// ];

// // ── Open WhatsApp with a pre-filled message ───────────────────────────────────
// function openWhatsApp(text) {
//   const url = `https://wa.me/${toWADigits(WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
//   window.open(url, "_blank", "noopener,noreferrer");
// }

// // ── Component ─────────────────────────────────────────────────────────────────
// export function ChatBot() {
//   const [open, setOpen]           = useState(false);
//   const [minimized, setMinimized] = useState(false);
//   const [input, setInput]         = useState("");
//   const [typing, setTyping]       = useState(false);
//   const [showQA, setShowQA]       = useState(true);
//   const [messages, setMessages]   = useState([
//     {
//       id: "1",
//       sender: "bot",
//       text: "👋 Hello! I'm Rochas Assistant.\n\nI'll answer your question here, then send you to WhatsApp to continue the conversation with our team.\n\nHow can I help you today?",
//       timestamp: new Date(),
//       options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs"],
//     },
//   ]);

//   const [pos, setPos]               = useState({ right: 24, bottom: 24 });
//   const [placement, setPlacement]   = useState({ up: true, left: false });
//   const [isDragging, setIsDragging] = useState(false);
//   const [hovered, setHovered]       = useState(false);

//   const dragRef    = useRef(null);
//   const movedRef   = useRef(false);
//   const fabRef     = useRef(null);
//   const inputRef   = useRef(null);
//   const msgsEndRef = useRef(null);
//   const msgsBoxRef = useRef(null);

//   // ── Position helpers ───────────────────────────────────────────────────────
//   const clampPos = useCallback((p) => {
//     const w = window.innerWidth, h = window.innerHeight;
//     return {
//       right:  clamp(p.right,  EDGE, Math.max(EDGE, w - BTN - EDGE)),
//       bottom: clamp(p.bottom, EDGE, Math.max(EDGE, h - BTN - EDGE)),
//     };
//   }, []);

//   const computePlacement = useCallback(() => {
//     const w = window.innerWidth, h = window.innerHeight;
//     setPlacement({
//       up:   (h - pos.bottom - BTN) >= PANEL_H || (h - pos.bottom - BTN) >= pos.bottom,
//       left: (w - pos.right) >= PANEL_W,
//     });
//   }, [pos]);

//   // ── Scroll isolation: lock body when panel is open ─────────────────────────
//   useEffect(() => {
//     if (open && !minimized) {
//       const prev = document.body.style.overflow;
//       document.body.style.overflow = "hidden";
//       return () => { document.body.style.overflow = prev; };
//     }
//   }, [open, minimized]);

//   // Prevent wheel & touch events on the messages box from reaching the page
//   useEffect(() => {
//     const el = msgsBoxRef.current;
//     if (!el) return;

//     const onWheel = (e) => {
//       const { scrollTop, scrollHeight, clientHeight } = el;
//       const atTop    = scrollTop === 0 && e.deltaY < 0;
//       const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
//       if (!atTop && !atBottom) e.stopPropagation();
//       // Prevent the page from scrolling in ALL cases while panel is open
//       e.stopPropagation();
//     };

//     el.addEventListener("wheel", onWheel, { passive: false });
//     return () => el.removeEventListener("wheel", onWheel);
//   }, [open, minimized]);

//   // ── Side effects ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typing]);

//   useEffect(() => {
//     if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 50);
//   }, [open, minimized]);

//   useEffect(() => {
//     const onResize = () => setPos((p) => clampPos(p));
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, [clampPos]);

//   useEffect(() => {
//     const onKey = (e) => { if (e.key === "Escape" && open) setOpen(false); };
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [open]);

//   // ── Drag ──────────────────────────────────────────────────────────────────
//   const onPointerDown = (e) => {
//     fabRef.current?.setPointerCapture(e.pointerId);
//     movedRef.current = false;
//     setIsDragging(true);
//     dragRef.current = { startX: e.clientX, startY: e.clientY, startRight: pos.right, startBottom: pos.bottom };
//   };

//   const onPointerMove = (e) => {
//     if (!dragRef.current) return;
//     const { startX, startY, startRight, startBottom } = dragRef.current;
//     const dx = e.clientX - startX, dy = e.clientY - startY;
//     if (Math.abs(dx) + Math.abs(dy) > DRAG_T) movedRef.current = true;
//     setPos(clampPos({ right: startRight - dx, bottom: startBottom - dy }));
//   };

//   const onPointerUp = (e) => {
//     fabRef.current?.releasePointerCapture(e.pointerId);
//     setIsDragging(false);
//     const moved = movedRef.current;
//     dragRef.current = null;
//     movedRef.current = false;
//     if (!moved) {
//       if (!open) computePlacement();
//       setOpen((v) => !v);
//       setMinimized(false);
//     }
//   };

//   // ── Messaging — replies show in chat, then WhatsApp opens ─────────────────
//   const sendMessage = (text = input) => {
//     const trimmed = (typeof text === "string" ? text : input).trim();
//     if (!trimmed) return;

//     const userMsg = { id: Date.now().toString(), sender: "user", text: trimmed, timestamp: new Date() };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setTyping(true);
//     setShowQA(false);

//     setTimeout(() => {
//       const { text: reply, options } = getBotReply(trimmed);
//       setMessages((prev) => [
//         ...prev,
//         { id: (Date.now() + 1).toString(), sender: "bot", text: reply, timestamp: new Date(), options },
//       ]);
//       setTyping(false);
//       // Send user's original message straight to WhatsApp
//       openWhatsApp(trimmed);
//     }, 800 + Math.random() * 400);
//   };

//   const startNewChat = () => {
//     setMessages([{
//       id: Date.now().toString(),
//       sender: "bot",
//       text: "👋 Hello! I'm Rochas Assistant.\n\nI'll answer your question here, then send you to WhatsApp to continue with our team.\n\nHow can I help you today?",
//       timestamp: new Date(),
//       options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs"],
//     }]);
//     setShowQA(true);
//     setInput("");
//   };

//   const fmtTime = (d) =>
//     new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   // ── Panel position ─────────────────────────────────────────────────────────
//   const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

//   const panelStyle = isMobile
//     ? { position: "fixed", left: 8, right: 8, bottom: 8, top: "auto", maxHeight: "calc(100dvh - 16px)" }
//     : {
//         position: "fixed",
//         width: PANEL_W,
//         maxHeight: PANEL_H,
//         ...(placement.up
//           ? { bottom: pos.bottom + BTN + 10 }
//           : { top: window.innerHeight - pos.bottom + 10 }),
//         ...(placement.left
//           ? { right: pos.right }
//           : { left: window.innerWidth - pos.right - BTN }),
//       };

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ── Floating Button ── */}
//       <div style={{ position: "fixed", right: pos.right, bottom: pos.bottom, zIndex: 9999, touchAction: "none", userSelect: "none" }}>
//         <button
//           ref={fabRef}
//           onPointerDown={onPointerDown}
//           onPointerMove={onPointerMove}
//           onPointerUp={onPointerUp}
//           onPointerCancel={onPointerUp}
//           onMouseEnter={() => setHovered(true)}
//           onMouseLeave={() => setHovered(false)}
//           aria-label={open ? "Close Rochas chat" : "Open Rochas chat"}
//           aria-expanded={open}
//           style={{
//             width: BTN, height: BTN, borderRadius: "50%",
//             background: "linear-gradient(135deg,#16a34a,#15803d)",
//             border: "none",
//             cursor: isDragging ? "grabbing" : "grab",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             boxShadow: "0 4px 20px rgba(22,163,74,.5)",
//             transform: hovered && !isDragging ? "scale(1.1)" : "scale(1)",
//             transition: "transform .2s",
//             color: "#fff",
//             position: "relative",
//           }}
//         >
//           {open ? <X size={22} /> : <MessageCircle size={22} />}

//           {!open && !isDragging && (
//             <span style={{
//               position: "absolute", top: -3, right: -3,
//               width: 18, height: 18, borderRadius: "50%",
//               background: "#ef4444", color: "#fff",
//               fontSize: 9, fontWeight: 700,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               pointerEvents: "none",
//             }}>1</span>
//           )}
//         </button>

//         {hovered && !open && !isDragging && (
//           <div style={{
//             position: "absolute", right: BTN + 10, top: "50%",
//             transform: "translateY(-50%)",
//             background: "#1f2937", color: "#fff",
//             fontSize: 11, fontWeight: 500,
//             padding: "6px 12px", borderRadius: 8,
//             whiteSpace: "nowrap", pointerEvents: "none",
//             boxShadow: "0 4px 12px rgba(0,0,0,.4)",
//           }}>
//             Chat with Rochas Assistant
//             <div style={{
//               position: "absolute", left: "100%", top: "50%",
//               transform: "translateY(-50%) rotate(45deg)",
//               width: 7, height: 7, background: "#1f2937",
//             }} />
//           </div>
//         )}
//       </div>

//       {/* ── Chat Panel ── */}
//       {open && (
//         <>
//           {/* Backdrop */}
//           <div
//             onClick={() => setOpen(false)}
//             style={{
//               position: "fixed", inset: 0, zIndex: 9998,
//               background: "rgba(0,0,0,.45)",
//               backdropFilter: "blur(2px)",
//             }}
//           />

//           <div
//             role="dialog"
//             aria-label="Rochas Assistant"
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               ...panelStyle,
//               zIndex: 9999,
//               borderRadius: 20,
//               overflow: "hidden",
//               boxShadow: "0 20px 60px rgba(0,0,0,.6)",
//               display: "flex",
//               flexDirection: "column",
//               animation: "rfcSlideUp .22s ease-out",
//             }}
//           >
//             <style>{`
//               @keyframes rfcSlideUp {
//                 from { opacity:0; transform:translateY(12px) scale(.97); }
//                 to   { opacity:1; transform:translateY(0) scale(1); }
//               }
//               @keyframes rfcBounce {
//                 0%,80%,100% { transform:translateY(0); }
//                 40%          { transform:translateY(-5px); }
//               }
//               @keyframes rfcPulse {
//                 0%,100% { opacity:1; } 50% { opacity:.45; }
//               }
//               .rfc-dot1 { animation: rfcBounce 1s infinite 0ms; }
//               .rfc-dot2 { animation: rfcBounce 1s infinite 150ms; }
//               .rfc-dot3 { animation: rfcBounce 1s infinite 300ms; }
//               .rfc-status { animation: rfcPulse 2s infinite; }
//               .rfc-msgs {
//                 scrollbar-width: thin;
//                 scrollbar-color: #16a34a33 transparent;
//                 overscroll-behavior: contain;
//                 -webkit-overflow-scrolling: touch;
//               }
//               .rfc-msgs::-webkit-scrollbar { width: 4px; }
//               .rfc-msgs::-webkit-scrollbar-thumb { background: #16a34a44; border-radius: 4px; }
//               .rfc-opt-btn:hover { background: rgba(22,163,74,.55)!important; color:#fff!important; }
//               .rfc-qa-btn:hover  { background: rgba(22,163,74,.45)!important; color:#fff!important; }
//               .rfc-ctrl:hover    { background: rgba(255,255,255,.15)!important; }
//               .rfc-input:focus   { outline:none; border-color:rgba(74,222,128,.6)!important; box-shadow:0 0 0 2px rgba(74,222,128,.2); }
//             `}</style>

//             {/* Header */}
//             <div style={{
//               background: "linear-gradient(135deg,#15803d,#14532d)",
//               padding: "12px 14px",
//               display: "flex", alignItems: "center", justifyContent: "space-between",
//               flexShrink: 0,
//             }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <div style={{ position: "relative" }}>
//                   <div style={{
//                     width: 38, height: 38, borderRadius: "50%",
//                     background: "rgba(255,255,255,.15)",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                   }}>
//                     <MessageCircle size={17} color="#fff" />
//                   </div>
//                   <span className="rfc-status" style={{
//                     position: "absolute", bottom: 0, right: 0,
//                     width: 10, height: 10, borderRadius: "50%",
//                     background: "#4ade80", border: "2px solid #15803d", display: "block",
//                   }} />
//                 </div>
//                 <div>
//                   <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
//                     Rochas Assistant
//                     <span style={{ fontSize: 8, background: "rgba(255,255,255,.2)", padding: "2px 6px", borderRadius: 10, fontWeight: 400 }}>AI</span>
//                   </div>
//                   <div style={{ fontSize: 9, color: "rgba(187,247,208,.8)", display: "flex", alignItems: "center", gap: 3 }}>
//                     <Clock size={9} /> Replies via WhatsApp • +234 813 387 8927
//                   </div>
//                 </div>
//               </div>

//               <div style={{ display: "flex", gap: 2 }}>
//                 <button className="rfc-ctrl" onClick={() => setMinimized((v) => !v)} title={minimized ? "Expand" : "Minimise"}
//                   style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
//                   {minimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
//                 </button>
//                 <button className="rfc-ctrl" onClick={startNewChat} title="New chat"
//                   style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
//                   <Plus size={14} />
//                 </button>
//                 <button className="rfc-ctrl" onClick={() => setOpen(false)} aria-label="Close"
//                   style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
//                   <X size={14} />
//                 </button>
//               </div>
//             </div>

//             {!minimized && (
//               <>
//                 {/* ── Messages (isolated scroll) ── */}
//                 <div
//                   ref={msgsBoxRef}
//                   className="rfc-msgs"
//                   style={{
//                     ...WALLPAPER,
//                     flex: 1,
//                     overflowY: "auto",
//                     overscrollBehavior: "contain",
//                     padding: "14px 12px",
//                     minHeight: 200,
//                     maxHeight: isMobile ? "calc(100dvh - 230px)" : 330,
//                   }}
//                 >
//                   {messages.map((msg) => {
//                     const isBot = msg.sender === "bot";
//                     return (
//                       <div key={msg.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12, flexDirection: isBot ? "row" : "row-reverse" }}>
//                         <div style={{
//                           width: 28, height: 28, borderRadius: "50%",
//                           background: isBot ? "#15803d" : "#16a34a",
//                           display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//                         }}>
//                           {isBot ? <MessageCircle size={13} color="#fff" /> : <User size={13} color="#fff" />}
//                         </div>

//                         <div style={{ maxWidth: "82%" }}>
//                           <div style={{
//                             padding: "10px 13px",
//                             borderRadius: isBot ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
//                             ...(isBot
//                               ? { background: "rgba(15,30,18,.92)", border: "1px solid rgba(22,163,74,.3)", color: "#d1fae5" }
//                               : { background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff" }),
//                           }}>
//                             <div style={{ fontSize: 11.5, whiteSpace: "pre-wrap", lineHeight: 1.65 }}>
//                               {msg.text}
//                             </div>
//                           </div>

//                           <div style={{
//                             fontSize: 9, color: "#4b7a5a", marginTop: 3,
//                             display: "flex", alignItems: "center", gap: 3,
//                             justifyContent: isBot ? "flex-start" : "flex-end",
//                           }}>
//                             <Clock size={8} /> {fmtTime(msg.timestamp)}
//                           </div>

//                           {msg.options && msg.options.length > 0 && (
//                             <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
//                               {msg.options.map((opt) => (
//                                 <button key={opt} className="rfc-opt-btn" onClick={() => sendMessage(opt)}
//                                   style={{
//                                     fontSize: 10,
//                                     background: "rgba(15,30,18,.8)",
//                                     border: "1px solid rgba(22,163,74,.5)",
//                                     borderRadius: 20, padding: "4px 10px",
//                                     color: "#86efac", cursor: "pointer", transition: "all .2s",
//                                     display: "flex", alignItems: "center", gap: 4,
//                                   }}>
//                                   {opt} <ChevronRight size={9} />
//                                 </button>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}

//                   {typing && (
//                     <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
//                       <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#15803d", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <MessageCircle size={13} color="#fff" />
//                       </div>
//                       <div style={{ background: "rgba(15,30,18,.92)", border: "1px solid rgba(22,163,74,.3)", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", display: "flex", alignItems: "center", gap: 4 }}>
//                         <span className="rfc-dot1" style={{ display: "inline-block", width: 6, height: 6, background: "#4ade80", borderRadius: "50%" }} />
//                         <span className="rfc-dot2" style={{ display: "inline-block", width: 6, height: 6, background: "#4ade80", borderRadius: "50%" }} />
//                         <span className="rfc-dot3" style={{ display: "inline-block", width: 6, height: 6, background: "#4ade80", borderRadius: "50%" }} />
//                       </div>
//                     </div>
//                   )}
//                   <div ref={msgsEndRef} />
//                 </div>

//                 {/* Quick Actions */}
//                 {showQA && messages.length <= 2 && (
//                   <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(22,163,74,.2)", background: "rgba(5,15,8,.7)", flexShrink: 0 }}>
//                     <div style={{ fontSize: 8, color: "#4b7a5a", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
//                       <Sparkles size={9} /> Quick Actions
//                     </div>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                       {QUICK_ACTIONS.map(({ icon: Icon, label, action }) => (
//                         <button key={label} className="rfc-qa-btn" onClick={() => sendMessage(action)}
//                           style={{
//                             display: "flex", alignItems: "center", gap: 5, fontSize: 10,
//                             background: "rgba(15,30,18,.7)", border: "1px solid rgba(22,163,74,.35)",
//                             borderRadius: 20, padding: "4px 10px",
//                             color: "#86efac", cursor: "pointer", transition: "all .2s",
//                           }}>
//                           <Icon size={11} /> {label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* WhatsApp redirect notice */}
//                 <div style={{ padding: "6px 14px", background: "rgba(5,15,8,.9)", flexShrink: 0 }}>
//                   <p style={{ fontSize: 9.5, color: "#4b7a5a", margin: 0, textAlign: "center" }}>
//                     💬 Messages are forwarded to WhatsApp · <strong style={{ color: "#16a34a" }}>+234 813 387 8927</strong>
//                   </p>
//                 </div>

//                 {/* Input */}
//                 <div style={{
//                   padding: "10px 12px",
//                   borderTop: "1px solid rgba(22,163,74,.2)",
//                   background: "rgba(5,15,8,.9)",
//                   display: "flex", gap: 8, alignItems: "center",
//                   flexShrink: 0,
//                 }}>
//                   <input
//                     ref={inputRef}
//                     className="rfc-input"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                     placeholder="Type a message…"
//                     style={{
//                       flex: 1,
//                       background: "rgba(22,163,74,.1)",
//                       border: "1px solid rgba(22,163,74,.3)",
//                       borderRadius: 12, padding: "8px 12px",
//                       fontSize: 12, color: "#d1fae5", transition: "border .2s",
//                     }}
//                   />
//                   <button
//                     onClick={() => sendMessage()}
//                     disabled={!input.trim()}
//                     style={{
//                       width: 36, height: 36, borderRadius: 12, flexShrink: 0,
//                       background: input.trim() ? "linear-gradient(135deg,#16a34a,#15803d)" : "rgba(22,163,74,.2)",
//                       border: "none",
//                       cursor: input.trim() ? "pointer" : "not-allowed",
//                       color: "#fff",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       opacity: input.trim() ? 1 : 0.4,
//                       transition: "all .2s",
//                     }}
//                   >
//                     <Send size={14} />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default ChatBot;


























































































































































































import { useState, useRef, useEffect, useCallback } from "react";
import {
  X, Send, Plus, User, Clock, Sparkles,
  GraduationCap, DollarSign, Calendar, Award, BookOpen,
  Minimize2, Maximize2, MessageCircle, ChevronRight, ExternalLink
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Message = {
  id: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  text: string;
  waPrompt?: string;
  options?: string[];
};

// ── Config ────────────────────────────────────────────────────────────────────
const WA_NUMBER      = "+234 813 387 8927";
const WA_DIGITS      = "2348133878927";
const waLink = (text) =>
  `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(text)}`;

const EDGE   = 12;
const BTN    = 56;
const DRAG_T = 6;
const clamp  = (v, a, b) => Math.min(Math.max(v, a), b);

const WALLPAPER = {
  backgroundColor: "#0a1a10",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%2316a34a' fill-opacity='0.06'%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3Ccircle cx='40' cy='30' r='2'/%3E%3Cpath d='M55 10c3 3 3 7 0 10-3-3-3-7 0-10z'/%3E%3Cpath d='M20 55c3 3 3 7 0 10-3-3-3-7 0-10z'/%3E%3Ccircle cx='65' cy='55' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
};

// ── Bot replies ───────────────────────────────────────────────────────────────
function getBotReply(msg: string): { text: string; waPrompt: string; options: string[] } {
  const m = msg.toLowerCase();
  const wa = (topic) =>
    `\n\n📲 Message us on WhatsApp for ${topic}:\n${WA_NUMBER}`;

  if (/apply|admission|enroll|join|application|requirement/.test(m)) return {
    text: `🎓 Applying to Rochas Foundation College\n\nYou can apply through our online admissions portal. Here's what you need:\n\n📋 Requirements:\n• Completed application form\n• Previous academic transcripts\n• Birth certificate\n• Passport photos (2 copies)\n• Entrance exam fee${wa("application support & next steps")}`,
    waPrompt: "Hello! I'd like to start my application to Rochas Foundation College. Please guide me on the next steps.",
    options: ["Check Requirements", "Fees & Costs", "Scholarships"],
  };

  if (/fee|tuition|cost|price|payment/.test(m)) return {
    text: `💰 Tuition & Fees 2025/2026\n\nAnnual Tuition:\n• Grades 6–8: $24,500\n• Grades 9–10 (IGCSE): $28,500\n• Grades 11–12 (IB/AP): $32,000\n\nAdditional Fees:\n• Enrollment: $1,800–$2,500\n• Boarding (optional): $8,500/yr\n• Technology: $500/yr\n\n💡 Scholarships cover up to 75%!${wa("payment plans & fee breakdowns")}`,
    waPrompt: "Hello! I'd like more details on Rochas Foundation College fees and payment plan options.",
    options: ["Scholarship Info", "Boarding Fees", "Apply Now"],
  };

  if (/scholarship|financial aid|merit|funding|eligib/.test(m)) return {
    text: `🏆 Scholarship Programs\n\nRochas Foundation Scholars Program\n• Up to 75% tuition coverage\n• Merit-based + need-based options\n\nEligibility:\n• Outstanding academic record\n• Leadership potential\n• Community involvement\n\n🗓 Deadline: November 30, 2025${wa("scholarship applications & eligibility")}`,
    waPrompt: "Hello! I'm interested in applying for a scholarship at Rochas Foundation College. Can you share the application details?",
    options: ["Check Eligibility", "Admission Info", "Contact Admissions"],
  };

  if (/tour|visit|campus|open house|direction|location|address/.test(m)) return {
    text: `🏫 Campus Tours & Open House\n\nRegular Tours:\n• Mon–Fri: 10AM & 2PM\n• Saturday: By appointment\n\nOpen House Dates:\n• June 14, 2026\n• September 20, 2026\n• November 15, 2026\n\n📍 88 Horizon Avenue, Abuja${wa("booking a campus tour or open house visit")}`,
    waPrompt: "Hello! I'd like to schedule a campus tour at Rochas Foundation College. When is the next available date?",
    options: ["Book a Tour", "Get Directions", "Programs Offered"],
  };

  if (/program|course|subject|study|curriculum/.test(m)) return {
    text: `📚 Academic Programs\n\nJunior School (Grades 6–8)\n• Cambridge Lower Secondary\n\nSenior School (Grades 9–12)\n• IGCSE Programme\n• IB Diploma Programme\n• AP Courses\n\nSpecialized Pathways:\n• STEM Innovation Lab\n• Arts & Humanities\n• Business & Entrepreneurship\n• Medical Sciences${wa("curriculum details & subject choices")}`,
    waPrompt: "Hello! I'd like to learn more about the academic programs and curriculum at Rochas Foundation College.",
    options: ["Fees & Costs", "Admissions", "Scholarships"],
  };

  if (/boarding|hostel|dorm|accommodation/.test(m)) return {
    text: `🏠 Boarding Facilities\n\nOptions:\n• Weekly Boarding (Mon–Fri)\n• Full Boarding (7 days)\n\nAmenities:\n• Air-conditioned rooms\n• Study lounges & rec areas\n• 24/7 security & house parents\n• Nutritious meals daily\n\n📢 Limited spaces for Grades 9–12!${wa("boarding availability & applications")}`,
    waPrompt: "Hello! I'm interested in boarding at Rochas Foundation College. Can you share availability and costs?",
    options: ["Boarding Fees", "Full Programs", "Apply Now"],
  };

  if (/deadline|date|when|closing/.test(m)) return {
    text: `📅 Key Dates 2025/2026\n\nApplication Deadlines:\n• Early Decision: Oct 31, 2025\n• Regular Decision: Feb 28, 2026\n• Rolling Admissions: May 31, 2026\n\nEvents:\n• Open House: June 14, 2026\n• Scholarship Deadline: Nov 30, 2025\n• New Student Orientation: Aug 15, 2026${wa("deadline reminders & application help")}`,
    waPrompt: "Hello! I need help with application deadlines for Rochas Foundation College. Can you guide me?",
    options: ["Apply Now", "Scholarship Info", "Campus Tour"],
  };

  if (/contact|phone|email|reach|whatsapp/.test(m)) return {
    text: `📞 Contact Rochas Foundation\n\nWhatsApp / Phone:\n${WA_NUMBER}\n\nAdmissions Email:\nadmissions@rochasfoundation.edu\n\nGeneral Enquiries:\nhello@rochasfoundation.edu\n\nOffice Hours:\n• Mon–Fri: 8AM – 5PM\n• Saturday: 9AM – 1PM\n\nTap the button below to open WhatsApp now!`,
    waPrompt: "Hello! I'd like to speak with the Rochas Foundation College admissions team.",
    options: ["Admissions Info", "Fees & Costs", "Campus Tour"],
  };

  return {
    text: `👋 I can help you with:\n\n🎓 Admissions – Process & requirements\n💰 Fees – Tuition & payment options\n🏆 Scholarships – Financial aid\n🏫 Campus Tours – Visit us\n📚 Programs – Curriculum & pathways\n🏠 Boarding – Accommodation\n📅 Deadlines – Important dates\n📞 Contact – Reach our team\n\nPick a topic below or type your question!${wa("any enquiry")}`,
    waPrompt: "Hello! I have an enquiry about Rochas Foundation College.",
    options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs", "Boarding"],
  };
}

// ── Quick Actions ─────────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: GraduationCap, label: "Admissions",  action: "Tell me about admissions" },
  { icon: DollarSign,    label: "Fees",         action: "What are the tuition fees?" },
  { icon: Award,         label: "Scholarships", action: "Tell me about scholarships" },
  { icon: Calendar,      label: "Tours",        action: "Book a campus tour" },
  { icon: BookOpen,      label: "Programs",     action: "What programs do you offer?" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function ChatBot() {
  const INIT_MSG: Message = {
    id: "1", sender: "bot", timestamp: new Date(),
    text: "👋 Hello! I'm Rochas Assistant.\n\nAsk me anything about admissions, fees, scholarships, programs, or campus life — I'll give you the details and connect you with our team on WhatsApp for anything else.",
    waPrompt: "Hello! I have an enquiry about Rochas Foundation College.",
    options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs"],
  };

  const [open, setOpen]           = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [showQA, setShowQA]       = useState(true);
  const [messages, setMessages]   = useState<Message[]>([INIT_MSG]);

  const [pos, setPos]               = useState({ right: 24, bottom: 24 });
  const [placement, setPlacement]   = useState({ up: true, left: false });
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered]       = useState(false);

  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth  : 1024,
    h: typeof window !== "undefined" ? window.innerHeight : 768,
  }));
  const isMobile = viewport.w < 640;

  const dragRef    = useRef(null);
  const movedRef   = useRef(false);
  const fabRef     = useRef(null);
  const inputRef   = useRef(null);
  const msgsEndRef = useRef(null);
  const msgsBoxRef = useRef(null);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const clampPos = useCallback((p) => {
    const w = viewport.w, h = viewport.h;
    return {
      right:  clamp(p.right,  EDGE, Math.max(EDGE, w - BTN - EDGE)),
      bottom: clamp(p.bottom, EDGE, Math.max(EDGE, h - BTN - EDGE)),
    };
  }, [viewport]);

  const computePlacement = useCallback(() => {
    const w = viewport.w, h = viewport.h;
    const panelH = Math.min(540, h * 0.85);
    const panelW = Math.min(390, w - 24);
    setPlacement({
      up:   (h - pos.bottom - BTN) >= panelH || (h - pos.bottom - BTN) > pos.bottom,
      left: (w - pos.right - BTN) < panelW,
    });
  }, [pos, viewport]);

  const fmtTime = useCallback((d) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), []);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    if (open && !minimized) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open, minimized]);

  // ── Wheel isolation on message box ────────────────────────────────────────
  useEffect(() => {
    const el = msgsBoxRef.current;
    if (!el) return;
    const handler = (e) => {
      e.stopPropagation();
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop    = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
      if (atTop || atBottom) e.preventDefault();
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open, minimized]);

  // Resize / orientation-change / visualViewport listener
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

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    fabRef.current?.setPointerCapture(e.pointerId);
    movedRef.current = false;
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startRight: pos.right, startBottom: pos.bottom };
  }, [pos.right, pos.bottom]);

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current) return;
    const { startX, startY, startRight, startBottom } = dragRef.current;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > DRAG_T) movedRef.current = true;
    setPos(clampPos({ right: startRight - dx, bottom: startBottom - dy }));
  }, [clampPos]);

  const onPointerUp = useCallback((e) => {
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

  // ── Messaging ─────────────────────────────────────────────────────────────
  const sendMessage = useCallback((text) => {
    const trimmed = (typeof text === "string" ? text : input).trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, {
      id: Date.now().toString(), 
      sender: "user",
      text: trimmed, 
      timestamp: new Date(),
    }]);
    setInput("");
    setTyping(true);
    setShowQA(false);
    setTimeout(() => {
      const reply = getBotReply(trimmed);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(), 
        sender: "bot",
        text: reply.text, 
        timestamp: new Date(),
        options: reply.options, 
        waPrompt: reply.waPrompt,
      }]);
      setTyping(false);
    }, 800 + Math.random() * 400);
  }, [input]);

  const startNew = useCallback(() => {
    setMessages([{ ...INIT_MSG, id: Date.now().toString(), timestamp: new Date() }]);
    setShowQA(true);
    setInput("");
  }, []);

  // ── Panel sizing ──────────────────────────────────────────────────────────
  const getPanelStyle = useCallback(() => {
    const w = viewport.w, h = viewport.h;

    if (isMobile) {
      return {
        position: "fixed",
        left: 8, right: 8, bottom: 8,
        top: "auto",
        height: "min(96dvh, 640px)",
        maxHeight: "96dvh",
        zIndex: 10000,
      };
    }

    const panelW = Math.max(280, Math.min(390, w - 48));
    const desiredH = Math.max(280, Math.min(560, h - 120));

    const spaceAbove = Math.max(0, h - pos.bottom - BTN - 16);
    const spaceBelow = Math.max(0, pos.bottom - 16);
    const openUp = spaceAbove >= Math.min(desiredH, 320) || spaceAbove >= spaceBelow;

    const btnLeft  = w - pos.right - BTN;
    const openLeft = btnLeft + panelW > w - EDGE;

    const availableSpace = Math.max(spaceAbove, spaceBelow, 240);
    const finalH = Math.min(desiredH, availableSpace);

    return {
      position: "fixed",
      width: panelW,
      height: finalH,
      maxHeight: desiredH,
      ...(openUp
        ? { bottom: pos.bottom + BTN + 10 }
        : { top:    Math.max(EDGE, h - pos.bottom + 10) }),
      ...(openLeft
        ? { right: pos.right }
        : { left:  Math.max(EDGE, w - pos.right - BTN) }),
      zIndex: 10000,
    };
  }, [viewport, pos, isMobile]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes rfcUp {
          from { opacity:0; transform:translateY(10px) scale(.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes rfcBounce {
          0%,80%,100% { transform:translateY(0); }
          40%          { transform:translateY(-5px); }
        }
        @keyframes rfcPing {
          0%,100% { opacity:1; } 50% { opacity:.4; }
        }
        .rfc-dot1  { display:inline-block;width:6px;height:6px;background:#4ade80;border-radius:50%;animation:rfcBounce 1s infinite 0ms; }
        .rfc-dot2  { display:inline-block;width:6px;height:6px;background:#4ade80;border-radius:50%;animation:rfcBounce 1s infinite 150ms; }
        .rfc-dot3  { display:inline-block;width:6px;height:6px;background:#4ade80;border-radius:50%;animation:rfcBounce 1s infinite 300ms; }
        .rfc-ping  { animation:rfcPing 2s infinite; }
        .rfc-panel { animation:rfcUp .22s ease-out; border-radius:20px; overflow:hidden; box-shadow:0 20px 64px rgba(0,0,0,.65); display:flex; flex-direction:column; }
        .rfc-msgs  { flex:1; min-height:0; overflow-y:auto; overscroll-behavior:contain; -webkit-overflow-scrolling:touch; scrollbar-width:thin; scrollbar-color:#16a34a33 transparent; }
        .rfc-msgs::-webkit-scrollbar { width:4px; }
        .rfc-msgs::-webkit-scrollbar-thumb { background:#16a34a44; border-radius:4px; }
        .rfc-opt:hover  { background:rgba(22,163,74,.55)!important; color:#fff!important; }
        .rfc-qa:hover   { background:rgba(22,163,74,.45)!important; color:#fff!important; }
        .rfc-ctrl:hover { background:rgba(255,255,255,.15)!important; }
        .rfc-wa:hover   { background:#15803d!important; }
        .rfc-inp:focus  { outline:none; border-color:rgba(74,222,128,.65)!important; box-shadow:0 0 0 2px rgba(74,222,128,.18); }
        .rfc-send:disabled { opacity:.35; cursor:not-allowed; }
        @media (max-width: 639px) {
          .rfc-inp { font-size:16px !important; }
        }
      `}</style>

      {/* ── Floating Button ── */}
      <div style={{ position:"fixed", right:pos.right, bottom:pos.bottom, zIndex:10001, touchAction:"none", userSelect:"none" }}>
        <button
          ref={fabRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={open ? "Close chat" : "Open Rochas chat"}
          aria-expanded={open}
          style={{
            width:BTN, height:BTN, borderRadius:"50%",
            background:"linear-gradient(135deg,#16a34a,#15803d)",
            border:"none", color:"#fff",
            cursor: isDragging ? "grabbing" : "grab",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 4px 22px rgba(22,163,74,.5)",
            transform: hovered && !isDragging ? "scale(1.1)" : "scale(1)",
            transition:"transform .2s, box-shadow .2s",
            position:"relative",
          }}
        >
          {open ? <X size={22}/> : <MessageCircle size={22}/>}
          {!open && !isDragging && (
            <span style={{ position:"absolute", top:-3, right:-3, width:18, height:18, borderRadius:"50%", background:"#ef4444", color:"#fff", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>1</span>
          )}
        </button>

        {/* Tooltip */}
        {hovered && !open && !isDragging && (
          <div style={{ position:"absolute", right:BTN+10, top:"50%", transform:"translateY(-50%)", background:"#111827", color:"#fff", fontSize:11, fontWeight:500, padding:"6px 12px", borderRadius:8, whiteSpace:"nowrap", pointerEvents:"none", boxShadow:"0 4px 14px rgba(0,0,0,.45)" }}>
            Chat with Rochas Assistant
            <div style={{ position:"absolute", left:"100%", top:"50%", transform:"translateY(-50%) rotate(45deg)", width:7, height:7, background:"#111827" }}/>
          </div>
        )}
      </div>

      {/* ── Panel ── */}
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(0,0,0,.5)", backdropFilter:"blur(3px)" }}/>

          <div className="rfc-panel" role="dialog" aria-label="Rochas Assistant" onClick={(e) => e.stopPropagation()} style={getPanelStyle()}>

            {/* Header */}
            <div style={{ background:"linear-gradient(135deg,#166534,#14532d)", padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ position:"relative" }}>
                  <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <MessageCircle size={17} color="#fff"/>
                  </div>
                  <span className="rfc-ping" style={{ position:"absolute", bottom:0, right:0, width:10, height:10, borderRadius:"50%", background:"#4ade80", border:"2px solid #14532d", display:"block" }}/>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#fff", display:"flex", alignItems:"center", gap:6 }}>
                    Rochas Assistant
                    <span style={{ fontSize:8, background:"rgba(255,255,255,.2)", padding:"2px 6px", borderRadius:10 }}>AI</span>
                  </div>
                  <div style={{ fontSize:9, color:"rgba(187,247,208,.8)", display:"flex", alignItems:"center", gap:3 }}>
                    <Clock size={9}/> Online · WhatsApp {WA_NUMBER}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", gap:2 }}>
                <button className="rfc-ctrl" onClick={() => setMinimized(v=>!v)} title={minimized?"Expand":"Minimise"} style={{ width:28, height:28, borderRadius:8, border:"none", background:"transparent", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .15s" }}>
                  {minimized ? <Maximize2 size={13}/> : <Minimize2 size={13}/>}
                </button>
                <button className="rfc-ctrl" onClick={startNew} title="New chat" style={{ width:28, height:28, borderRadius:8, border:"none", background:"transparent", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .15s" }}>
                  <Plus size={14}/>
                </button>
                <button className="rfc-ctrl" onClick={() => setOpen(false)} aria-label="Close" style={{ width:28, height:28, borderRadius:8, border:"none", background:"transparent", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .15s" }}>
                  <X size={14}/>
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div ref={msgsBoxRef} className="rfc-msgs" style={{ ...WALLPAPER, padding:"14px 12px" }}>

                  {messages.map((msg) => {
                    const isBot = msg.sender === "bot";
                    return (
                      <div key={msg.id} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:14, flexDirection: isBot ? "row" : "row-reverse" }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", background: isBot ? "#15803d" : "#16a34a", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                          {isBot ? <MessageCircle size={13} color="#fff"/> : <User size={13} color="#fff"/>}
                        </div>

                        <div style={{ maxWidth:"82%", minWidth:0 }}>
                          {/* Bubble */}
                          <div style={{
                            padding:"10px 13px",
                            borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                            ...(isBot
                              ? { background:"rgba(12,28,16,.93)", border:"1px solid rgba(22,163,74,.28)", color:"#d1fae5" }
                              : { background:"linear-gradient(135deg,#16a34a,#15803d)", color:"#fff" }),
                          }}>
                            <p style={{ margin:0, fontSize:11.5, whiteSpace:"pre-wrap", lineHeight:1.65, wordBreak:"break-word" }}>{msg.text}</p>
                          </div>

                          {/* Timestamp */}
                          <div style={{ fontSize:9, color:"#3d6647", marginTop:3, display:"flex", alignItems:"center", gap:3, justifyContent: isBot ? "flex-start" : "flex-end" }}>
                            <Clock size={8}/> {fmtTime(msg.timestamp)}
                          </div>

                          {/* WhatsApp CTA button on bot messages */}
                          {isBot && msg.waPrompt && (
                            <a
                              href={waLink(msg.waPrompt)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rfc-wa"
                              style={{
                                display:"inline-flex", alignItems:"center", gap:6,
                                marginTop:8, padding:"7px 14px",
                                background:"#16a34a", borderRadius:20,
                                color:"#fff", fontSize:11, fontWeight:600,
                                textDecoration:"none", transition:"background .2s",
                                border:"none", cursor:"pointer",
                              }}
                            >
                              <MessageCircle size={12}/> Continue on WhatsApp <ExternalLink size={10}/>
                            </a>
                          )}

                          {/* Topic option pills */}
                          {msg.options && msg.options.length > 0 && (
                            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:8 }}>
                              {msg.options.map((opt) => (
                                <button key={opt} className="rfc-opt" onClick={() => sendMessage(opt)} style={{ fontSize:10, background:"rgba(12,28,16,.8)", border:"1px solid rgba(22,163,74,.45)", borderRadius:20, padding:"4px 11px", color:"#86efac", cursor:"pointer", transition:"all .2s", display:"flex", alignItems:"center", gap:4 }}>
                                  {opt}<ChevronRight size={9}/>
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
                    <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:12 }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:"#15803d", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <MessageCircle size={13} color="#fff"/>
                      </div>
                      <div style={{ background:"rgba(12,28,16,.93)", border:"1px solid rgba(22,163,74,.28)", borderRadius:"4px 16px 16px 16px", padding:"11px 14px", display:"flex", alignItems:"center", gap:5 }}>
                        <span className="rfc-dot1"/><span className="rfc-dot2"/><span className="rfc-dot3"/>
                      </div>
                    </div>
                  )}

                  <div ref={msgsEndRef}/>
                </div>

                {/* Quick Actions */}
                {showQA && messages.length <= 2 && (
                  <div style={{ padding:"8px 12px", borderTop:"1px solid rgba(22,163,74,.18)", background:"rgba(4,12,6,.8)", flexShrink:0 }}>
                    <p style={{ margin:"0 0 6px", fontSize:8, color:"#3d6647", textTransform:"uppercase", letterSpacing:".08em", display:"flex", alignItems:"center", gap:4 }}>
                      <Sparkles size={9}/> Quick topics
                    </p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {QUICK_ACTIONS.map(({ icon:Icon, label, action }) => (
                        <button key={label} className="rfc-qa" onClick={() => sendMessage(action)} style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, background:"rgba(12,28,16,.75)", border:"1px solid rgba(22,163,74,.35)", borderRadius:20, padding:"5px 11px", color:"#86efac", cursor:"pointer", transition:"all .2s" }}>
                          <Icon size={11}/> {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input bar */}
                <div style={{ padding:"10px 12px", borderTop:"1px solid rgba(22,163,74,.18)", background:"rgba(4,12,6,.95)", display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                  <input
                    ref={inputRef}
                    className="rfc-inp"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message…"
                    style={{ flex:1, minWidth:0, background:"rgba(22,163,74,.1)", border:"1px solid rgba(22,163,74,.3)", borderRadius:12, padding:"9px 13px", fontSize:12, color:"#d1fae5", transition:"border .2s" }}
                  />
                  <button
                    className="rfc-send"
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    style={{ width:38, height:38, borderRadius:12, flexShrink:0, background: input.trim() ? "linear-gradient(135deg,#16a34a,#15803d)" : "rgba(22,163,74,.15)", border:"none", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .2s" }}
                  >
                    <Send size={14}/>
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