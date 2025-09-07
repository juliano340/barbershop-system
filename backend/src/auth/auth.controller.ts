import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { token } = await authService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      domain: process.env.DOMAIN,
      maxAge: 1000 * 60 * 60,
    });
    return res.json({ message: "Login realizado com sucesso" });
  }
}

export const authController = new AuthController();
