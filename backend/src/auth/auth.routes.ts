import { Router } from "express";
import { authController } from "./auth.controller.js";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login de usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Usuário ou senha inválidos
 */

router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
  return res.json({ message: "Logout realizado com sucesso" });
});

router.get("/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return res.json({ user: decoded });
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
});

export default router;
