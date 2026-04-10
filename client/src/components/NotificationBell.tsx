import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Notification Bell Component - Shows message notifications
 * Design: Warm Hospitality
 */

interface Notification {
  id: number;
  landlord: string;
  property: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      landlord: "Rajesh Kumar",
      property: "Sunrise PG",
      message: "Hi! Thanks for your interest. Can I help you?",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-muted rounded-full transition-colors"
      >
        <Bell className="w-6 h-6 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-secondary">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-primary-foreground">
                Messages
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border hover:bg-muted/50 transition-colors ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">
                          {notification.landlord}
                        </p>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {notification.property}
                      </p>
                      <p className="text-sm text-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground text-sm">No messages yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-border bg-muted/30 text-center">
              <a
                href="/messages"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View all messages →
              </a>
            </div>
          )}
        </Card>
      )}

      {/* Close on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
