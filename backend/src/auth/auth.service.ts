import { userRepository } from "../users/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    function throwInvalidCredentialsError() {
      const error: any = new Error("Usuário ou senha inválidos");
      error.status = 400;
      error.stack = "Usuário ou senha inválidos";
      error.response = { message: "Usuário ou senha inválidos" };
      throw error;
    }

    if (!user || !user.password) {
      throwInvalidCredentialsError();
    }

    const isValid = await bcrypt.compare(password, user!.password);

    if (!isValid) {
      throwInvalidCredentialsError();
    }

    if (!SECRET) {
      throw new Error("Erro no ambiente do servidor. Tente mais tarde!");
    }

    if (!user) {
      return { token: "" };
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
