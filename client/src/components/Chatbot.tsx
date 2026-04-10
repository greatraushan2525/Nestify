import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";

/**
 * Chatbot Component - Project Information Assistant
 * Design: Warm Hospitality
 */

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const CHATBOT_RESPONSES: { [key: string]: string } = {
  hello: "👋 Hello! Welcome to Nestify. I'm here to help you find your perfect home. How can I assist you today?",
  hi: "👋 Hi there! Welcome to Nestify. What would you like to know about our platform?",
  "what is nestify":
    "🏠 Nestify is a modern PG and Hostel Finder platform that helps students and professionals find comfortable, affordable accommodations tailored to their needs. We connect renters with verified landlords across major Indian cities.",
  features:
    "✨ Nestify offers: Property listings with detailed information, Advanced search and filtering, User authentication and profiles, Booking management, Real-time messaging with landlords, Reviews and ratings, Landlord property management dashboard, and much more!",
  "how to book":
    "📅 To book a property: 1) Browse properties on our homepage, 2) Click 'View Details' on a property, 3) Click 'Book Now', 4) Select your check-in and check-out dates, 5) Confirm your booking. You can manage all your bookings from your dashboard!",
  pricing:
    "💰 Property prices range from ₹4,000 to ₹8,000 per month depending on location, amenities, and type. We have options for every budget - from affordable student hostels to premium accommodations.",
  locations:
    "📍 Nestify currently operates in major Indian cities including Jaipur, Delhi, Bangalore, Mumbai, Pune, and Hyderabad. We're expanding to more cities soon!",
  amenities:
    "🛏️ Common amenities include: Food included, AC, WiFi, Parking, Laundry services, Study rooms, Common areas, and more. Filter by amenities to find exactly what you need!",
  "contact landlord":
    "💬 You can contact landlords directly through our messaging system. Once you book or express interest, you'll be able to message the landlord to discuss details, ask questions, or arrange a visit.",
  reviews:
    "⭐ All properties have verified reviews from real residents. You can also write your own reviews after staying at a property to help other users make informed decisions.",
  "landlord features":
    "🏢 Landlords can: Add and manage multiple properties, View and manage bookings, Respond to tenant inquiries, Track property performance, and build their reputation through reviews.",
  security:
    "🔒 Nestify prioritizes security with verified landlord profiles, secure booking system, encrypted messaging, and user-friendly dispute resolution. Always meet properties in person before committing.",
  payment:
    "💳 Payments are handled securely through our platform. You can pay rent directly to your landlord or through our integrated payment system for added security.",
  "about us":
    "ℹ️ Nestify was created to solve the accommodation crisis for students and young professionals. Our mission is to make finding a home simple, transparent, and trustworthy.",
  help: "ℹ️ I can help you with: What is Nestify, Features, How to book, Pricing, Locations, Amenities, Contact landlord, Reviews, Landlord features, Security, Payment, and more. What would you like to know?",
  default:
    "😊 I'm not sure about that. Try asking me about: Features, How to book, Pricing, Locations, Amenities, or type 'help' for more options!",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hello! I'm Nestify Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Check for exact matches first
    if (CHATBOT_RESPONSES[lowerMessage]) {
      return CHATBOT_RESPONSES[lowerMessage];
    }

    // Check for partial matches
    for (const [key, response] of Object.entries(CHATBOT_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return CHATBOT_RESPONSES.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Get bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-96 rounded-2xl shadow-2xl flex flex-col z-40 bg-background">
          {/* Header */}
          <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-secondary rounded-t-2xl">
            <h3 className="font-display text-lg font-bold text-primary-foreground">
              Nestify Assistant
            </h3>
            <p className="text-xs text-primary-foreground/80">
              Ask me anything about Nestify!
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border flex gap-2 bg-background rounded-b-2xl">
            <Input
              placeholder="Ask me something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-full"
            />
            <Button
              size="sm"
              className="rounded-full"
              onClick={handleSendMessage}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setInputValue("What is Nestify?");
                setTimeout(() => handleSendMessage(), 100);
              }}
              className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full hover:bg-accent/30 transition-colors"
            >
              What is Nestify?
            </button>
            <button
              onClick={() => {
                setInputValue("How to book?");
                setTimeout(() => handleSendMessage(), 100);
              }}
              className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full hover:bg-accent/30 transition-colors"
            >
              How to book?
            </button>
          </div>
        </Card>
      )}
    </>
  );
}
