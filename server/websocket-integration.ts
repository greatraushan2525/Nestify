/**
 * WebSocket Integration Guide
 * 
 * This file shows how to integrate WebSocket.service with the main Express server.
 * Add this code to your server/index.ts file after creating the HTTP server.
 */

// Add this import at the top of server/index.ts
// import WebSocketService from "./services/websocket.service";

// Replace the server creation section with:
/*
import { createServer } from "http";

const httpServer = createServer(app);
const wsService = new WebSocketService(httpServer);

// Make WebSocket service available globally
app.locals.wsService = wsService;

// Example API endpoint to get active users
app.get("/api/users/active", (req: Request, res: Response) => {
  const activeUsers = wsService.getActiveUsers();
  res.json(activeUsers);
});

// Example API endpoint to get chat history
app.get("/api/messages/:userId1/:userId2", (req: Request, res: Response) => {
  const { userId1, userId2 } = req.params;
  const history = wsService.getChatHistory(userId1, userId2);
  res.json(history);
});

// Start server with WebSocket support
const port = PORT;
httpServer.listen(port, () => {
  console.log(`🚀 Nestify Server with WebSocket running on http://localhost:${port}`);
  console.log(`📦 MongoDB URI: ${MONGODB_URI}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
*/

// Frontend integration example:
/*
import { RealtimeChat } from "@/components/RealtimeChat";

// Use in your Messages page or component:
<RealtimeChat
  currentUserId="user123"
  currentUserName="John Doe"
  otherUserId="landlord456"
  otherUserName="Property Owner"
  propertyId="prop789"
/>
*/
