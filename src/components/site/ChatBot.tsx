// import { useState } from "react";
// import { MessageCircle, X, Sparkles, Send, Plus } from "lucide-react";

// export function ChatBot() {
//   const defaultMessage = [
//     {
//       sender: "bot",
//       text: "Hi! I'm Aurora. Ask me about admissions, programs, fees, scholarships or campus visits."
//     }
//   ];

//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [messages, setMessages] = useState(defaultMessage);

//   const startNewChat = () => {
//     setMessages(defaultMessage);
//     setInput("");
//   };

//   const getBotReply = (message) => {
//     const msg = message.toLowerCase();

//     if (msg.includes("fee"))
//       return "Our tuition fees vary by program. Undergraduate programs range from $4,000–$8,000 per semester.";

//     if (msg.includes("apply") || msg.includes("admission"))
//       return "You can apply online through our admissions portal.";

//     if (msg.includes("tour") || msg.includes("visit"))
//       return "Campus tours are available every Monday–Friday from 10AM to 3PM.";

//     if (msg.includes("scholarship"))
//       return "We offer merit-based and need-based scholarships.";

//     if (msg.includes("program"))
//       return "We offer programs in Engineering, Business, Computer Science, Medicine, and Arts.";

//     return "Thanks for your question. Ask about fees, admissions, scholarships, or programs.";
//   };

//   const sendMessage = (text = input) => {
//     if (!text.trim()) return;

//     const userMessage = { sender: "user", text };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setTyping(true);

//     setTimeout(() => {
//       const botReply = {
//         sender: "bot",
//         text: getBotReply(text)
//       };

//       setMessages((prev) => [...prev, botReply]);
//       setTyping(false);
//     }, 1000);
//   };

//   return (
//     <>
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           className="fixed bottom-6 left-6 z-40 group"
//           aria-label="Open chat"
//         >
//           <span className="absolute inset-0 rounded-full gradient-gold blur-md opacity-70 group-hover:opacity-100 transition" />
//           <span className="relative flex items-center gap-2 rounded-full gradient-hero text-primary-foreground pl-3 pr-4 py-3 shadow-elegant">
//             <Sparkles className="h-4 w-4 text-gold" />
//             <span className="text-sm font-medium">Ask Aurora</span>
//           </span>
//         </button>
//       )}

//       {open && (
//         <div className="fixed bottom-6 left-6 z-40 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl glass shadow-elegant overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
//           {/* Header */}
//           <div className="gradient-hero text-primary-foreground p-4 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="h-9 w-9 rounded-full gradient-gold flex items-center justify-center">
//                 <Sparkles className="h-4 w-4 text-primary" />
//               </div>
//               <div>
//                 <div className="font-semibold text-sm">Aurora · AI Assistant</div>
//                 <div className="text-xs opacity-70 flex items-center gap-1">
//                   <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Online
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               {/* New Chat Button */}
//               <button
//                 onClick={startNewChat}
//                 className="hover:opacity-80"
//                 title="New Chat"
//               >
//                 <Plus className="h-5 w-5" />
//               </button>

//               <button
//                 onClick={() => setOpen(false)}
//                 className="hover:opacity-80"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`rounded-xl p-3 text-sm max-w-[80%] ${
//                   msg.sender === "bot"
//                     ? "bg-accent rounded-tl-none"
//                     : "bg-cyan text-white ml-auto rounded-tr-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}

//             {typing && (
//               <div className="rounded-xl rounded-tl-none bg-accent p-3 text-sm">
//                 Aurora is typing...
//               </div>
//             )}

//             <div className="flex gap-1.5 flex-wrap">
//               {["Fees", "Apply", "Scholarships", "Campus tour"].map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => sendMessage(s)}
//                   className="rounded-full glass px-3 py-1 text-xs hover:bg-accent"
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Input */}
//           <div className="p-3 border-t border-border flex gap-2">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               placeholder="Type your message…"
//               className="flex-1 rounded-lg bg-accent/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan/40"
//             />

//             <button
//               onClick={() => sendMessage()}
//               className="h-9 w-9 rounded-lg gradient-cyan text-white flex items-center justify-center"
//             >
//               <Send className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }














































import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, X, Sparkles, Send, Plus, Trash2, 
  Bot, User, Clock, CheckCircle, AlertCircle, 
  GraduationCap, DollarSign, Calendar, Award, BookOpen,
  ChevronDown, Mic, MoreHorizontal, Minimize2, Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  options?: string[];
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "👋 Hello! I'm Rochas Assistant. How can I help you today? Feel free to ask me about admissions, fees, scholarships, programs, or campus visits.",
      timestamp: new Date(),
    }
  ]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const startNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "bot",
        text: "👋 Hello! I'm Rochas Assistant. How can I help you today?",
        timestamp: new Date(),
      }
    ]);
    setShowQuickActions(true);
  };

  const clearChat = () => {
    setMessages([]);
    startNewChat();
  };

  const getBotReply = (message: string): { reply: string; options?: string[] } => {
    const msg = message.toLowerCase();

    // Admissions
    if (msg.match(/apply|admission|enroll|join|application/)) {
      return {
        reply: "🎓 **Applying to Rochas Foundation College**\n\nYou can apply through our online admissions portal. Here's what you'll need:\n\n📋 **Requirements:**\n• Completed application form\n• Previous academic transcripts\n• Birth certificate\n• Passport photos (2 copies)\n• Entrance examination fee\n\n👉 **Next steps:** Visit our Admissions page or click 'Start Application' below.",
        options: ["Start Application", "Check Requirements", "Contact Admissions"]
      };
    }

    // Fees
    if (msg.match(/fee|tuition|cost|price|payment/)) {
      return {
        reply: "💰 **Tuition & Fees 2025/2026**\n\n**Annual Tuition:**\n• Grades 6–8: $24,500\n• Grades 9–10 (IGCSE): $28,500\n• Grades 11–12 (IB/AP): $32,000\n\n**Additional Fees:**\n• Enrollment Fee: $1,800–$2,500\n• Boarding (optional): $8,500/year\n• Technology Fee: $500/year\n\n💡 **Scholarships available up to 75%!**",
        options: ["Scholarship Info", "Payment Plans", "Fee Breakdown"]
      };
    }

    // Scholarships
    if (msg.match(/scholarship|financial aid|merit|funding/)) {
      return {
        reply: "🏆 **Scholarship Programs**\n\n**Rochas Foundation Scholars Program**\n• Up to 75% tuition coverage\n• Merit-based + need-based\n\n**Eligibility:**\n• Outstanding academic record\n• Leadership potential\n• Community involvement\n\n**Deadline:** November 30, 2025\n\n✨ Apply now to be considered!",
        options: ["Apply for Scholarship", "Check Eligibility", "Download Form"]
      };
    }

    // Campus tour
    if (msg.match(/tour|visit|campus|open house/)) {
      return {
        reply: "🏫 **Campus Tours & Open House**\n\n**Regular Tours:**\n• Monday–Friday: 10AM & 2PM\n• Saturday: By appointment only\n\n**Open House Events:**\n• June 14, 2026\n• September 20, 2026\n• November 15, 2026\n\n📍 **Location:** 88 Horizon Avenue, Abuja\n\n🎟️ **Book your spot today!**",
        options: ["Book a Tour", "Virtual Tour", "Get Directions"]
      };
    }

    // Programs
    if (msg.match(/program|course|subject|study|curriculum/)) {
      return {
        reply: "📚 **Academic Programs**\n\n**Junior School (Grades 6–8)**\n• Cambridge Lower Secondary\n\n**Senior School (Grades 9–12)**\n• IGCSE Programme\n• IB Diploma Programme\n• AP Courses\n\n**Specialized Pathways:**\n• STEM Innovation Lab\n• Arts & Humanities\n• Business & Entrepreneurship\n• Medical Sciences\n\n🎯 Each student receives personalized guidance!",
        options: ["View Curriculum", "Download Brochure", "Talk to Counselor"]
      };
    }

    // Boarding
    if (msg.match(/boarding|hostel|dorm|accommodation/)) {
      return {
        reply: "🏠 **Boarding Facilities**\n\n**Options Available:**\n• Weekly Boarding (Mon–Fri)\n• Full Boarding (7 days)\n\n**Amenities:**\n• Air-conditioned rooms\n• Study lounges\n• Recreational areas\n• 24/7 security & house parents\n• Nutritious meals provided\n\n📢 Limited spaces available for Grades 9–12!",
        options: ["View Facilities", "Boarding Fees", "Apply for Boarding"]
      };
    }

    // Deadline
    if (msg.match(/deadline|date|when|closing/)) {
      return {
        reply: "📅 **Important Dates 2025/2026**\n\n**Application Deadlines:**\n• Early Decision: October 31, 2025\n• Regular Decision: February 28, 2026\n• Rolling Admissions: Until May 31, 2026\n\n**Key Events:**\n• Open House: June 14, 2026\n• Scholarship Deadline: November 30, 2025\n• New Student Orientation: August 15, 2026\n\n⚠️ Apply early for priority consideration!",
        options: ["Apply Now", "Add to Calendar", "Request Reminder"]
      };
    }

    // Contact
    if (msg.match(/contact|phone|email|reach|called/)) {
      return {
        reply: "📞 **Contact Information**\n\n**Admissions Office:**\n• Phone: +234 812 345 6789\n• Email: admissions@rochasfoundation.edu\n\n**General Enquiries:**\n• Email: hello@rochasfoundation.edu\n\n**Office Hours:**\n• Monday–Friday: 8AM – 5PM\n• Saturday: 9AM – 1PM\n\n💬 Or continue chatting with me — I'm here 24/7!",
        options: ["Send Email", "Request Callback", "Live Chat Support"]
      };
    }

    // Default
    return {
      reply: "Thank you for your message! I can help you with:\n\n🎓 **Admissions** – Application process & requirements\n💰 **Fees** – Tuition & payment options\n🏆 **Scholarships** – Financial aid & merit awards\n🏫 **Campus Tours** – Visit our facilities\n📚 **Programs** – Curriculum & pathways\n🏠 **Boarding** – Accommodation options\n📅 **Deadlines** – Important dates\n📞 **Contact** – Get in touch with us\n\nWhat would you like to know more about?",
      options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs", "Boarding"]
    };
  };

  const sendMessage = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setTyping(true);
    setShowQuickActions(false);

    setTimeout(() => {
      const { reply, options } = getBotReply(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        timestamp: new Date(),
        options: options,
      };
      setMessages(prev => [...prev, botMessage]);
      setTyping(false);
    }, 800 + Math.random() * 500);
  };

  const quickActions = [
    { icon: GraduationCap, label: "Admissions", action: "Tell me about admissions" },
    { icon: DollarSign, label: "Fees", action: "What are the tuition fees?" },
    { icon: Award, label: "Scholarships", action: "Tell me about scholarships" },
    { icon: Calendar, label: "Tours", action: "Book a campus tour" },
    { icon: BookOpen, label: "Programs", action: "What programs do you offer?" },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button - Bottom Right */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Open chat"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-xl opacity-70 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 shadow-2xl">
              <Bot className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white">Rochas Assistant</span>
              <Sparkles className="h-3 w-3 text-yellow-300 animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { type: "spring", damping: 25, stiffness: 300 }
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
              minimized ? "w-[320px] h-[70px]" : "w-[400px] h-[600px]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-blue-900 animate-pulse" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    Rochas Assistant
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">AI</span>
                  </div>
                  <div className="text-[10px] text-blue-300/80 flex items-center gap-1">
                    <Clock className="h-2 w-2" />
                    Online • 24/7
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  {minimized ? <Maximize2 className="h-4 w-4 text-white" /> : <Minimize2 className="h-4 w-4 text-white" />}
                </button>
                <button
                  onClick={clearChat}
                  className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  title="New chat"
                >
                  <Plus className="h-4 w-4 text-white" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 bg-gradient-to-b from-slate-900 to-slate-800 p-4 overflow-y-auto h-[460px]">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.sender === "user" 
                              ? "bg-blue-600" 
                              : "bg-gradient-to-br from-blue-500 to-cyan-500"
                          }`}>
                            {msg.sender === "user" ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div>
                            <div className={`rounded-2xl px-4 py-3 ${
                              msg.sender === "user"
                                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none"
                                : "bg-slate-700/80 text-blue-100 rounded-tl-none border border-blue-700/30"
                            }`}>
                              <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                {msg.text}
                              </div>
                            </div>
                            <div className={`text-[10px] text-slate-500 mt-1 flex items-center gap-1 ${msg.sender === "user" ? "justify-end" : ""}`}>
                              <Clock className="h-2 w-2" />
                              {formatTime(msg.timestamp)}
                            </div>
                            
                            {/* Quick options from bot */}
                            {msg.options && msg.options.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {msg.options.map((opt) => (
                                  <button
                                    key={opt}
                                    onClick={() => sendMessage(opt)}
                                    className="text-xs bg-slate-700/60 hover:bg-blue-600/60 border border-blue-600/40 rounded-full px-3 py-1.5 text-blue-300 hover:text-white transition-all duration-200"
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {typing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-2 mb-4"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-slate-700/80 rounded-2xl rounded-tl-none px-4 py-3 border border-blue-700/30">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {showQuickActions && messages.length <= 2 && (
                  <div className="bg-slate-800 border-t border-blue-800/40 p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Sparkles className="h-2 w-2" /> QUICK ACTIONS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => sendMessage(action.action)}
                          className="flex items-center gap-2 rounded-full bg-slate-700/60 hover:bg-blue-600/60 border border-blue-700/40 px-3 py-1.5 text-xs text-blue-300 hover:text-white transition-all duration-200"
                        >
                          <action.icon className="h-3 w-3" />
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="bg-slate-800 border-t border-blue-800/40 p-3 flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 rounded-xl bg-slate-700/60 border border-blue-700/40 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
