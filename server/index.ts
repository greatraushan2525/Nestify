import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

// Load environment variables
dotenv.config();

const appRoot = process.cwd();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nestify";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    // Don't exit in development, allow server to run without DB
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  });

// ============================================
// MongoDB Schemas and Models
// ============================================

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["tenant", "landlord"], required: true },
    phone: { type: String },
    avatar: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Property Schema
const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ["boys", "girls", "co-ed"], required: true },
    description: { type: String },
    amenities: [String],
    images: [String],
    rooms: { type: Number },
    bathrooms: { type: Number },
    parking: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false },
    studyRoom: { type: Boolean, default: false },
    commonArea: { type: Boolean, default: false },
    food: { type: Boolean, default: false },
    ac: { type: Boolean, default: false },
    wifi: { type: Boolean, default: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    nearCollege: {
      name: String,
      distance: String,
    },
    nearMetro: {
      name: String,
      distance: String,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true }
);

// Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guestCount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    stripePaymentId: String,
  },
  { timestamps: true }
);

// Message Schema
const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

// Create Models
const User = mongoose.model("User", userSchema);
const Property = mongoose.model("Property", propertySchema);
const Booking = mongoose.model("Booking", bookingSchema);
const Message = mongoose.model("Message", messageSchema);
const Review = mongoose.model("Review", reviewSchema);

// ============================================
// API Routes
// ============================================

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "✅ Server is running", timestamp: new Date() });
});

// ============================================
// User Routes
// ============================================

app.post("/api/users/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user (Note: In production, hash the password)
    const user = new User({
      email,
      password, // TODO: Hash password before saving
      firstName,
      lastName,
      role,
      phone,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Registration failed", details: error });
  }
});

app.post("/api/users/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // TODO: Verify password hash
    res.json({ message: "Login successful", userId: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error });
  }
});

// ============================================
// Property Routes
// ============================================

app.get("/api/properties", async (req: Request, res: Response) => {
  try {
    const { city, type, minPrice, maxPrice, sort } = req.query;

    let query: any = {};
    if (city) query.city = city;
    if (type) query.type = type;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption: any = { createdAt: -1 };
    if (sort === "price-low") sortOption = { price: 1 };
    if (sort === "price-high") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const properties = await Property.find(query).sort(sortOption).limit(50);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties", details: error });
  }
});

app.get("/api/properties/:id", async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id).populate("landlordId");
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property", details: error });
  }
});

app.post("/api/properties", async (req: Request, res: Response) => {
  try {
    const { name, location, city, price, type, landlordId, ...rest } = req.body;

    const property = new Property({
      name,
      location,
      city,
      price,
      type,
      landlordId,
      ...rest,
    });

    await property.save();
    res.status(201).json({ message: "Property created successfully", propertyId: property._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create property", details: error });
  }
});

app.put("/api/properties/:id", async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Property updated successfully", property });
  } catch (error) {
    res.status(500).json({ error: "Failed to update property", details: error });
  }
});

app.delete("/api/properties/:id", async (req: Request, res: Response) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property", details: error });
  }
});

// ============================================
// Booking Routes
// ============================================

app.post("/api/bookings", async (req: Request, res: Response) => {
  try {
    const { propertyId, tenantId, checkInDate, checkOutDate, guestCount, totalPrice } = req.body;

    const booking = new Booking({
      propertyId,
      tenantId,
      checkInDate,
      checkOutDate,
      guestCount,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", bookingId: booking._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking", details: error });
  }
});

app.get("/api/bookings/:userId", async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ tenantId: req.params.userId }).populate("propertyId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings", details: error });
  }
});

// ============================================
// Message Routes
// ============================================

app.post("/api/messages", async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, propertyId, content } = req.body;

    const message = new Message({
      senderId,
      receiverId,
      propertyId,
      content,
    });

    await message.save();
    res.status(201).json({ message: "Message sent successfully", messageId: message._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message", details: error });
  }
});

app.get("/api/messages/:userId", async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }],
    })
      .populate("senderId")
      .populate("receiverId")
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages", details: error });
  }
});

// ============================================
// Review Routes
// ============================================

app.post("/api/reviews", async (req: Request, res: Response) => {
  try {
    const { propertyId, userId, rating, comment } = req.body;

    const review = new Review({
      propertyId,
      userId,
      rating,
      comment,
    });

    await review.save();

    // Update property rating
    const reviews = await Review.find({ propertyId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Property.findByIdAndUpdate(propertyId, { rating: avgRating, reviews: reviews.length });

    res.status(201).json({ message: "Review created successfully", reviewId: review._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create review", details: error });
  }
});

app.get("/api/reviews/:propertyId", async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ propertyId: req.params.propertyId }).populate("userId");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews", details: error });
  }
});

// ============================================
// Static File Serving
// ============================================

const distPath = path.resolve(appRoot, "dist", "public");

app.use(express.static(distPath));

// SPA Fallback Route
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ============================================
// Error Handling Middleware
// ============================================

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Internal server error", details: err.message });
});

// ============================================
// Start Server
// ============================================

const port = PORT;
const server = require("http").createServer(app);

server.listen(port, () => {
  console.log(`🚀 Nestify Server running on http://localhost:${port}`);
  console.log(`📦 MongoDB URI: ${MONGODB_URI}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
