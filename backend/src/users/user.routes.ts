import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

router.post("/", (req, res) => userController.create(req, res));
router.get("/", authMiddleware, (req, res) => userController.list(req, res));

export default router;
