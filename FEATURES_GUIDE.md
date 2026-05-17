# Nestify - Features Implementation Guide

This document outlines all the new features added to Nestify, including setup instructions and usage examples.

## 📋 Table of Contents

1. [Footer Component](#footer-component)
2. [Backend Integration](#backend-integration)
3. [Stripe Payment Processing](#stripe-payment-processing)
4. [Google Maps Integration](#google-maps-integration)
5. [Real-time Messaging with WebSockets](#real-time-messaging-with-websockets)
6. [Environment Configuration](#environment-configuration)

---

## 🎨 Footer Component

### Overview
A responsive footer component has been added to all pages of the application, featuring:
- Quick navigation links
- Contact information
- Social media links
- Copyright information

### Location
- **Component**: `client/src/components/Footer.tsx`
- **Integration**: Automatically included in `client/src/App.tsx`

### Features
- Responsive design (desktop, tablet, mobile)
- Quick links to all major pages
- Social media integration
- Contact information display

---

## 🔧 Backend Integration

### Overview
A complete Node.js/Express backend has been set up with MongoDB integration.

### Features
- **Express Server**: RESTful API with CORS support
- **MongoDB Integration**: Mongoose schemas for data persistence
- **API Endpoints**: Complete CRUD operations for:
  - Users (registration, login)
  - Properties (create, read, update, delete)
  - Bookings (create, manage)
  - Messages (send, retrieve)
  - Reviews (create, retrieve)

### Setup Instructions

1. **Install Dependencies**
   ```bash
   cd /home/ubuntu/Nestify
   pnpm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/nestify
   PORT=3000
   NODE_ENV=development
   ```

3. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

4. **Run the Server**
   ```bash
   # Development mode
   pnpm run dev:server
   
   # Or run both frontend and backend
   pnpm run dev:all
   ```

### API Endpoints

#### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

#### Properties
- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

#### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:userId` - Get user bookings

#### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/:userId` - Get user messages

#### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/:propertyId` - Get property reviews

---

## 💳 Stripe Payment Processing

### Overview
Stripe integration for secure online payment processing.

### Features
- Payment intent creation
- Payment confirmation
- Customer management
- Refund processing
- Payment status tracking

### Setup Instructions

1. **Get Stripe API Keys**
   - Visit [Stripe Dashboard](https://dashboard.stripe.com)
   - Create an account or log in
   - Get your Secret Key and Publishable Key

2. **Configure Environment Variables**
   ```bash
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

3. **Backend Integration**
   - Service: `server/services/stripe.service.ts`
   - Routes: `server/routes/payment.routes.ts`

4. **Frontend Integration**
   - Component: `client/src/components/PaymentForm.tsx`
   - Usage:
   ```tsx
   import PaymentForm from "@/components/PaymentForm";
   
   <PaymentForm
     amount={5000}
     bookingId="booking123"
     propertyId="property456"
     tenantId="user789"
     onSuccess={(paymentIntentId) => console.log("Payment successful!")}
     onError={(error) => console.log("Payment failed:", error)}
   />
   ```

### API Endpoints

- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/customer` - Create customer
- `POST /api/payments/refund` - Process refund
- `GET /api/payments/:paymentIntentId` - Get payment details

---

## 🗺️ Google Maps Integration

### Overview
Interactive map display for property locations.

### Features
- Display properties on interactive map
- Click markers to view property details
- Auto-fit bounds for multiple properties
- City-based default coordinates
- Custom property coordinates support

### Setup Instructions

1. **Get Google Maps API Key**
   - Visit [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable Maps JavaScript API
   - Create an API key

2. **Configure Environment Variables**
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

3. **Frontend Integration**
   - Component: `client/src/components/PropertyMap.tsx`
   - Usage:
   ```tsx
   import PropertyMap from "@/components/PropertyMap";
   
   <PropertyMap
     properties={properties}
     selectedPropertyId={selectedId}
     onPropertySelect={(id) => console.log("Selected:", id)}
     zoom={13}
   />
   ```

### Features
- 🔵 Blue markers for available properties
- 🔴 Red markers for selected property
- Click markers to view property info
- Auto-zoom to fit all properties
- Fallback to city coordinates if property coordinates unavailable

---

## 💬 Real-time Messaging with WebSockets

### Overview
Real-time messaging between tenants and landlords using Socket.io.

### Features
- Real-time message delivery
- Typing indicators
- Message read status
- Online user tracking
- Chat history
- Automatic reconnection

### Setup Instructions

1. **Backend Integration**
   - Service: `server/services/websocket.service.ts`
   - Integration guide: `server/websocket-integration.ts`

2. **Update Server**
   Add to `server/index.ts`:
   ```typescript
   import { createServer } from "http";
   import WebSocketService from "./services/websocket.service";
   
   const httpServer = createServer(app);
   const wsService = new WebSocketService(httpServer);
   
   // Replace app.listen() with httpServer.listen()
   ```

3. **Frontend Integration**
   - Component: `client/src/components/RealtimeChat.tsx`
   - Usage:
   ```tsx
   import RealtimeChat from "@/components/RealtimeChat";
   
   <RealtimeChat
     currentUserId="user123"
     currentUserName="John Doe"
     otherUserId="landlord456"
     otherUserName="Property Owner"
     propertyId="prop789"
   />
   ```

### WebSocket Events

**Client → Server:**
- `user:join` - User joins (sends userId, username)
- `message:send` - Send message
- `chat:join` - Join chat room
- `message:read` - Mark message as read
- `typing:start` - Start typing
- `typing:stop` - Stop typing

**Server → Client:**
- `users:online` - List of online users
- `message:receive` - Receive message
- `message:sent` - Message delivery confirmation
- `chat:history` - Chat history
- `message:read` - Message read confirmation
- `typing:indicator` - Typing indicator

---

## ⚙️ Environment Configuration

### Complete .env File Template

```bash
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nestify

# Server Configuration
PORT=3000
NODE_ENV=development

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Google Maps Configuration
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here

# JWT Secret (for future authentication)
JWT_SECRET=your_jwt_secret_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Getting API Keys

1. **Stripe**
   - Website: https://dashboard.stripe.com
   - Create account → Get API keys from Dashboard

2. **Google Maps**
   - Website: https://console.cloud.google.com
   - Create project → Enable Maps JavaScript API → Create API key

3. **MongoDB**
   - Local: `mongodb://localhost:27017/nestify`
   - Cloud: Use MongoDB Atlas (https://www.mongodb.com/cloud/atlas)

---

## 🚀 Running the Application

### Development Mode (Frontend Only)
```bash
pnpm run dev
# Opens at http://localhost:5173
```

### Development Mode (Frontend + Backend)
```bash
pnpm run dev:all
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

### Production Build
```bash
pnpm run build
pnpm run start
```

---

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start frontend dev server |
| `pnpm dev:server` | Start backend dev server |
| `pnpm dev:all` | Start both frontend and backend |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm preview` | Preview production build |
| `pnpm check` | TypeScript type checking |
| `pnpm format` | Format code with Prettier |

---

## 🔐 Security Notes

1. **Never commit `.env` file** - Use `.env.example` as template
2. **API Keys** - Keep Stripe and Google Maps keys private
3. **MongoDB** - Use connection strings with authentication in production
4. **CORS** - Configure allowed origins in production
5. **JWT** - Implement JWT tokens for authentication (currently mocked)
6. **Password Hashing** - Hash passwords before storing (currently TODO)

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify database permissions

### Stripe Payment Failures
- Verify API keys in `.env`
- Use test card: 4242 4242 4242 4242
- Check Stripe Dashboard for error logs

### Google Maps Not Loading
- Verify API key is correct
- Enable Maps JavaScript API in Google Cloud Console
- Check CORS restrictions

### WebSocket Connection Issues
- Ensure backend server is running
- Check frontend URL in CORS configuration
- Verify Socket.io is installed: `pnpm install socket.io-client`

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Google Maps API Documentation](https://developers.google.com/maps)
- [Socket.io Documentation](https://socket.io/docs/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation links
3. Check browser console for errors
4. Check server logs for backend errors

---

**Last Updated**: May 2026
**Version**: 1.1.0
