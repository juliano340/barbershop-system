import express from "express";
import userRoutes from "./users/user.routes.js";
import authRoutes from "./auth/auth.routes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
