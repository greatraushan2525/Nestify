import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, X, Bell, CheckCheck } from "lucide-react";
import { Property } from "@/lib/propertyData";

/**
 * Live Chat Component - Real-time messaging with landlords
 * Design: Warm Hospitality
 */

interface ChatMessage {
  id: number;
  sender: "user" | "landlord";
  text: string;
  timestamp: Date;
  read: boolean;
}

interface LiveChatProps {
  property: Property;
  onClose?: () => void;
}

export default function LiveChat({ property, onClose }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "landlord",
      text: `Hi! Thanks for your interest in ${property.name}. How can I help you?`,
      timestamp: new Date(Date.now() - 5 * 60000),
      read: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
      read: true,
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate landlord typing
    setIsTyping(true);

    // Simulate landlord response after delay
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "Yes, absolutely! We have that available.",
        "I'd be happy to arrange a visit for you.",
        "The property is available from next month.",
        "Feel free to visit anytime between 10 AM and 6 PM.",
        "We offer flexible lease terms. Would you like to know more?",
        "All utilities are included in the rent.",
        "Yes, we have 24/7 security and CCTV coverage.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const landlordMessage: ChatMessage = {
        id: messages.length + 2,
        sender: "landlord",
        text: randomResponse,
        timestamp: new Date(),
        read: false,
      };

      setMessages((prev) => [...prev, landlordMessage]);
      setUnreadCount((prev) => prev + 1);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const markAsRead = () => {
    setMessages((prev) =>
      prev.map((msg) => ({
        ...msg,
        read: true,
      }))
    );
    setUnreadCount(0);
  };

  return (
    <Card className="h-full rounded-2xl flex flex-col bg-card shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-secondary">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-primary-foreground">
              Chat with {property.landlord.name}
            </h3>
            <p className="text-xs text-primary-foreground/80">
              {property.landlord.verified && "✓ Verified Landlord"}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-foreground rounded-bl-none"
              }`}
            >
              <p>{message.text}</p>
              <div
                className={`text-xs mt-1 flex items-center gap-1 ${
                  message.sender === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {message.sender === "user" && message.read && (
                  <CheckCheck className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <div className="px-4 py-2 bg-yellow-50 border-b border-yellow-200 flex items-center gap-2">
          <Bell className="w-4 h-4 text-yellow-600" />
          <span className="text-sm text-yellow-700">
            {unreadCount} new message{unreadCount > 1 ? "s" : ""}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="ml-auto rounded-full text-xs"
            onClick={markAsRead}
          >
            Mark as read
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-background flex gap-2">
        <Input
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="rounded-full"
          disabled={isTyping}
        />
        <Button
          size="sm"
          className="rounded-full"
          onClick={handleSendMessage}
          disabled={isTyping || !inputValue.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Replies */}
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setInputValue("Can I visit the property?");
            setTimeout(() => handleSendMessage(), 100);
          }}
          className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full hover:bg-accent/30 transition-colors"
        >
          Can I visit?
        </button>
        <button
          onClick={() => {
            setInputValue("What's the lease duration?");
            setTimeout(() => handleSendMessage(), 100);
          }}
          className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full hover:bg-accent/30 transition-colors"
        >
          Lease duration?
        </button>
        <button
          onClick={() => {
            setInputValue("Are utilities included?");
            setTimeout(() => handleSendMessage(), 100);
          }}
          className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full hover:bg-accent/30 transition-colors"
        >
          Utilities?
        </button>
      </div>
    </Card>
  );
}
