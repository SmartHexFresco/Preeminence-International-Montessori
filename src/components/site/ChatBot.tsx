import { useState, useRef, useEffect } from "react";
import { 
  X, Send, Plus, Bot, User, Clock, Sparkles,
  GraduationCap, DollarSign, Calendar, Award, BookOpen,
  Minimize2, Maximize2, MessageCircle
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
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
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

  const getBotReply = (message: string): { reply: string; options?: string[] } => {
    const msg = message.toLowerCase();

    if (msg.match(/apply|admission|enroll|join|application/)) {
      return {
        reply: "🎓 **Applying to Rochas Foundation College**\n\nYou can apply through our online admissions portal. Here's what you'll need:\n\n📋 **Requirements:**\n• Completed application form\n• Previous academic transcripts\n• Birth certificate\n• Passport photos (2 copies)\n• Entrance examination fee\n\n👉 **Next steps:** Visit our Admissions page or click 'Start Application' below.",
        options: ["Start Application", "Check Requirements", "Contact Admissions"]
      };
    }

    if (msg.match(/fee|tuition|cost|price|payment/)) {
      return {
        reply: "💰 **Tuition & Fees 2025/2026**\n\n**Annual Tuition:**\n• Grades 6–8: $24,500\n• Grades 9–10 (IGCSE): $28,500\n• Grades 11–12 (IB/AP): $32,000\n\n**Additional Fees:**\n• Enrollment Fee: $1,800–$2,500\n• Boarding (optional): $8,500/year\n• Technology Fee: $500/year\n\n💡 **Scholarships available up to 75%!**",
        options: ["Scholarship Info", "Payment Plans", "Fee Breakdown"]
      };
    }

    if (msg.match(/scholarship|financial aid|merit|funding/)) {
      return {
        reply: "🏆 **Scholarship Programs**\n\n**Rochas Foundation Scholars Program**\n• Up to 75% tuition coverage\n• Merit-based + need-based\n\n**Eligibility:**\n• Outstanding academic record\n• Leadership potential\n• Community involvement\n\n**Deadline:** November 30, 2025\n\n✨ Apply now to be considered!",
        options: ["Apply for Scholarship", "Check Eligibility", "Download Form"]
      };
    }

    if (msg.match(/tour|visit|campus|open house/)) {
      return {
        reply: "🏫 **Campus Tours & Open House**\n\n**Regular Tours:**\n• Monday–Friday: 10AM & 2PM\n• Saturday: By appointment only\n\n**Open House Events:**\n• June 14, 2026\n• September 20, 2026\n• November 15, 2026\n\n📍 **Location:** 88 Horizon Avenue, Abuja\n\n🎟️ **Book your spot today!**",
        options: ["Book a Tour", "Virtual Tour", "Get Directions"]
      };
    }

    if (msg.match(/program|course|subject|study|curriculum/)) {
      return {
        reply: "📚 **Academic Programs**\n\n**Junior School (Grades 6–8)**\n• Cambridge Lower Secondary\n\n**Senior School (Grades 9–12)**\n• IGCSE Programme\n• IB Diploma Programme\n• AP Courses\n\n**Specialized Pathways:**\n• STEM Innovation Lab\n• Arts & Humanities\n• Business & Entrepreneurship\n• Medical Sciences\n\n🎯 Each student receives personalized guidance!",
        options: ["View Curriculum", "Download Brochure", "Talk to Counselor"]
      };
    }

    if (msg.match(/boarding|hostel|dorm|accommodation/)) {
      return {
        reply: "🏠 **Boarding Facilities**\n\n**Options Available:**\n• Weekly Boarding (Mon–Fri)\n• Full Boarding (7 days)\n\n**Amenities:**\n• Air-conditioned rooms\n• Study lounges\n• Recreational areas\n• 24/7 security & house parents\n• Nutritious meals provided\n\n📢 Limited spaces available for Grades 9–12!",
        options: ["View Facilities", "Boarding Fees", "Apply for Boarding"]
      };
    }

    if (msg.match(/deadline|date|when|closing/)) {
      return {
        reply: "📅 **Important Dates 2025/2026**\n\n**Application Deadlines:**\n• Early Decision: October 31, 2025\n• Regular Decision: February 28, 2026\n• Rolling Admissions: Until May 31, 2026\n\n**Key Events:**\n• Open House: June 14, 2026\n• Scholarship Deadline: November 30, 2025\n• New Student Orientation: August 15, 2026\n\n⚠️ Apply early for priority consideration!",
        options: ["Apply Now", "Add to Calendar", "Request Reminder"]
      };
    }

    if (msg.match(/contact|phone|email|reach|called/)) {
      return {
        reply: "📞 **Contact Information**\n\n**Admissions Office:**\n• Phone: +234 812 345 6789\n• Email: admissions@rochasfoundation.edu\n\n**General Enquiries:**\n• Email: hello@rochasfoundation.edu\n\n**Office Hours:**\n• Monday–Friday: 8AM – 5PM\n• Saturday: 9AM – 1PM\n\n💬 Or continue chatting with me — I'm here 24/7!",
        options: ["Send Email", "Request Callback", "Live Chat Support"]
      };
    }

    return {
      reply: "Thank you for your message! I can help you with:\n\n🎓 **Admissions** – Application process & requirements\n💰 **Fees** – Tuition & payment options\n🏆 **Scholarships** – Financial aid & merit awards\n🏫 **Campus Tours** – Visit our facilities\n📚 **Programs** – Curriculum & pathways\n🏠 **Boarding** – Accommodation options\n📅 **Deadlines** – Important dates\n📞 **Contact** – Get in touch with us\n\nWhat would you like to know more about?",
      options: ["Admissions", "Fees", "Scholarships", "Tours", "Programs", "Boarding"]
    };
  };

  const sendMessage = (text: string = input) => {
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
      {/* Chat Button - WhatsApp Style Green */}
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
            <div className="absolute inset-0 rounded-full bg-green-500 blur-xl opacity-60 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 shadow-2xl hover:shadow-green-500/30 transition-all duration-300">
              <MessageCircle className="h-4 w-4 text-white" />
              <span className="text-xs font-semibold text-white">Contact us on WhatsApp</span>
              <Sparkles className="h-3 w-3 text-white/70 animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop - Click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { type: "spring", damping: 25, stiffness: 300 }
              }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed bottom-6 right-6 z-50 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 border border-green-500/30"
              style={{ width: '380px', height: minimized ? '60px' : '520px' }}
            >
              {/* Header - WhatsApp Green */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-300 border-2 border-green-600 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      Contact on WhatsApp
                      <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded-full">AI</span>
                    </div>
                    <div className="text-[9px] text-green-200/80 flex items-center gap-1">
                      <Clock className="h-2 w-2" />
                      Online • 24/7
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => setMinimized(!minimized)}
                    className="h-7 w-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    {minimized ? <Maximize2 className="h-3.5 w-3.5 text-white" /> : <Minimize2 className="h-3.5 w-3.5 text-white" />}
                  </button>
                  <button
                    onClick={startNewChat}
                    className="h-7 w-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                    title="New chat"
                  >
                    <Plus className="h-3.5 w-3.5 text-white" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="h-7 w-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>

              {!minimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 px-4 py-3 overflow-y-auto" style={{ height: '360px' }}>
                    <AnimatePresence>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`flex items-start gap-2 max-w-[88%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.sender === "user" 
                                ? "bg-green-600" 
                                : "bg-gradient-to-br from-green-500 to-green-600"
                            }`}>
                              {msg.sender === "user" ? (
                                <User className="h-3.5 w-3.5 text-white" />
                              ) : (
                                <MessageCircle className="h-3.5 w-3.5 text-white" />
                              )}
                            </div>
                            <div className="max-w-[85%]">
                              <div className={`rounded-2xl px-3.5 py-2.5 ${
                                msg.sender === "user"
                                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-tr-none"
                                  : "bg-slate-700/80 text-blue-100 rounded-tl-none border border-green-700/30"
                              }`}>
                                <div className="text-xs whitespace-pre-wrap leading-relaxed">
                                  {msg.text}
                                </div>
                              </div>
                              <div className={`text-[9px] text-slate-500 mt-0.5 flex items-center gap-1 ${msg.sender === "user" ? "justify-end" : ""}`}>
                                <Clock className="h-2 w-2" />
                                {formatTime(msg.timestamp)}
                              </div>
                              
                              {msg.options && msg.options.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                  {msg.options.map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => sendMessage(opt)}
                                      className="text-[10px] bg-slate-700/60 hover:bg-green-600/60 border border-green-600/40 rounded-full px-2.5 py-1 text-green-300 hover:text-white transition-all duration-200"
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
                        className="flex items-start gap-2 mb-3"
                      >
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <MessageCircle className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="bg-slate-700/80 rounded-2xl rounded-tl-none px-3.5 py-2.5 border border-green-700/30">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  {showQuickActions && messages.length <= 2 && (
                    <div className="border-t border-green-800/30 px-3 py-2 bg-slate-800/50">
                      <p className="text-[8px] text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Sparkles className="h-2 w-2" /> QUICK ACTIONS
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {quickActions.map((action) => (
                          <button
                            key={action.label}
                            onClick={() => sendMessage(action.action)}
                            className="flex items-center gap-1.5 rounded-full bg-slate-700/60 hover:bg-green-600/60 border border-green-700/30 px-2.5 py-1 text-[10px] text-green-300 hover:text-white transition-all duration-200"
                          >
                            <action.icon className="h-3 w-3" />
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="border-t border-green-800/30 px-3 py-2.5 flex gap-2 bg-slate-800/50">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 rounded-xl bg-slate-700/60 border border-green-700/30 px-3 py-2 text-xs text-white placeholder:text-slate-400 outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/60 transition"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim()}
                      className="h-9 w-9 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}