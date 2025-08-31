import { userRepository } from "./user.repository.js";
import bcrypt from "bcryptjs";

class UserService {
  async create(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error("Todos os campos devem ser preenchidos");
    }
    if (!email.includes("@")) {
      throw new Error("E-mail inválido");
    }
    if (await this.emailExists(email)) {
      throw new Error("E-mail já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return userRepository.save(name, email, hashedPassword);
  }

  async list() {
    return userRepository.findAll();
  }

  async emailExists(email: string) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return true;
    }
    return false;
  }
}

export const userService = new UserService();
