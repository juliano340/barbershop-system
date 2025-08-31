import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  async save(name: string, email: string, password: string) {
    return prisma.user.create({
      data: { name, email, password },
      select: { id: true, name: true, email: true },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, password: true },
    });
  }
}

export const userRepository = new UserRepository();
