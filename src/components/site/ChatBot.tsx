import { useState } from "react";
import { MessageCircle, X, Sparkles, Send, Plus } from "lucide-react";

export function ChatBot() {
  const defaultMessage = [
    {
      sender: "bot",
      text: "Hi! I'm Aurora. Ask me about admissions, programs, fees, scholarships or campus visits."
    }
  ];

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(defaultMessage);

  const startNewChat = () => {
    setMessages(defaultMessage);
    setInput("");
  };

  const getBotReply = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("fee"))
      return "Our tuition fees vary by program. Undergraduate programs range from $4,000–$8,000 per semester.";

    if (msg.includes("apply") || msg.includes("admission"))
      return "You can apply online through our admissions portal.";

    if (msg.includes("tour") || msg.includes("visit"))
      return "Campus tours are available every Monday–Friday from 10AM to 3PM.";

    if (msg.includes("scholarship"))
      return "We offer merit-based and need-based scholarships.";

    if (msg.includes("program"))
      return "We offer programs in Engineering, Business, Computer Science, Medicine, and Arts.";

    return "Thanks for your question. Ask about fees, admissions, scholarships, or programs.";
  };

  const sendMessage = (text = input) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: getBotReply(text)
      };

      setMessages((prev) => [...prev, botReply]);
      setTyping(false);
    }, 1000);
  };

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
          
          {/* Header */}
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

            <div className="flex items-center gap-2">
              {/* New Chat Button */}
              <button
                onClick={startNewChat}
                className="hover:opacity-80"
                title="New Chat"
              >
                <Plus className="h-5 w-5" />
              </button>

              <button
                onClick={() => setOpen(false)}
                className="hover:opacity-80"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded-xl p-3 text-sm max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-accent rounded-tl-none"
                    : "bg-cyan text-white ml-auto rounded-tr-none"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {typing && (
              <div className="rounded-xl rounded-tl-none bg-accent p-3 text-sm">
                Aurora is typing...
              </div>
            )}

            <div className="flex gap-1.5 flex-wrap">
              {["Fees", "Apply", "Scholarships", "Campus tour"].map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full glass px-3 py-1 text-xs hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message…"
              className="flex-1 rounded-lg bg-accent/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan/40"
            />

            <button
              onClick={() => sendMessage()}
              className="h-9 w-9 rounded-lg gradient-cyan text-white flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}