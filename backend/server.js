import express from "express";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profileRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import reservationRouter from "./routes/reservationRoutes.js";


dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(
  cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Margaret Cafe!");
});

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter, orderRouter);
app.use("/api/customer", profileRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin/dashboard", dashboardRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/reservations", reservationRouter)

const createDefaultAdmin = async () => {
    try {
      const adminExists = await prisma.admin.findUnique({
        where: { email: "admin@example.com" }, // ✅ Use email (unique field)
      });
  
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await prisma.admin.create({
          data: {
            email: "admin@example.com",
            name: "Admin", // You can still set a name, but it’s not unique
            password: hashedPassword,
          },
        });
        console.log("✅ Default admin created: admin@example.com / admin123");
      } else {
        console.log("ℹ Default admin already exists.");
      }
    } catch (error) {
      console.error("❌ Error creating default admin:", error);
    }
  };
  
  // Call the function on server startup
  createDefaultAdmin();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});