import { userRepository } from "../users/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const error: any = new Error("Usuário ou senha inválidos");
      error.status = 400;
      error.stack = "";
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Usuário ou senha inválidos");
    }

    if (!SECRET) {
      throw new Error("Erro no ambiente do servidor. Tente mais tarde!");
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { token };
  }
}

export const authService = new AuthService();
