import type { Request, Response } from "express";
import { userService } from "./user.service.js";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.create(name, email, password);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    const users = await userService.list();
    return res.json(users);
  }
}

export const userController = new UserController();
