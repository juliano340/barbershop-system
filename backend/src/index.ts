import express from "express";
import userRoutes from "./users/user.routes.js";
import authRoutes from "./auth/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
