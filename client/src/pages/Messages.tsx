import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search } from "lucide-react";
import { useState } from "react";

/**
 * Messages Page - Messaging with landlords and other users
 * Design: Warm Hospitality
 */

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
}

interface Chat {
  id: number;
  name: string;
  property: string;
  lastMessage: string;
  unread: number;
  avatar: string;
  messages: Message[];
}

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      property: "Sunrise PG",
      lastMessage: "Sure, you can visit tomorrow",
      unread: 2,
      avatar: "R",
      messages: [
        {
          id: 1,
          sender: "Rajesh Kumar",
          text: "Hello! Are you interested in the room?",
          time: "10:30",
          isOwn: false,
        },
        {
          id: 2,
          sender: "You",
          text: "Yes, I'd like to visit the property",
          time: "10:35",
          isOwn: true,
        },
        {
          id: 3,
          sender: "Rajesh Kumar",
          text: "Sure, you can visit tomorrow",
          time: "10:40",
          isOwn: false,
        },
      ],
    },
    {
      id: 2,
      name: "Priya Singh",
      property: "Green Valley",
      lastMessage: "Booking confirmed!",
      unread: 0,
      avatar: "P",
      messages: [
        {
          id: 1,
          sender: "Priya Singh",
          text: "Your booking has been confirmed",
          time: "14:20",
          isOwn: false,
        },
        {
          id: 2,
          sender: "You",
          text: "Thank you!",
          time: "14:25",
          isOwn: true,
        },
      ],
    },
    {
      id: 3,
      name: "Anjali Sharma",
      property: "Cozy Corner PG",
      lastMessage: "Looking forward to having you",
      unread: 1,
      avatar: "A",
      messages: [],
    },
  ]);

  const currentChat = chats.find((c) => c.id === selectedChat);
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    setChats(
      chats.map((chat) =>
        chat.id === selectedChat
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: chat.messages.length + 1,
                  sender: "You",
                  text: message,
                  time: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  isOwn: true,
                },
              ],
              lastMessage: message,
            }
          : chat
      )
    );
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Messages
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="rounded-2xl overflow-hidden flex flex-col h-96 lg:h-full">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-full"
                  />
                </div>
              </div>
              <div className="divide-y divide-border overflow-y-auto flex-1">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-4 text-left transition-colors ${
                      selectedChat === chat.id
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">
                          {chat.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-foreground">
                            {chat.name}
                          </p>
                          {chat.unread > 0 && (
                            <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {chat.property}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            {currentChat ? (
              <Card className="rounded-2xl flex flex-col h-96 lg:h-full">
                {/* Chat Header */}
                <div className="p-4 border-b border-border">
                  <p className="font-semibold text-foreground">
                    {currentChat.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentChat.property}
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentChat.messages.length > 0 ? (
                    currentChat.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-2xl ${
                            msg.isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">
                        No messages yet. Start a conversation!
                      </p>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
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
              </Card>
            ) : (
              <Card className="p-8 rounded-2xl text-center">
                <p className="text-muted-foreground">
                  Select a conversation to start messaging
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
