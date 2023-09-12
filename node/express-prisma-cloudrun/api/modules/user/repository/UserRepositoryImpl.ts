import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "./UserRepository";

export class UserRepositoryImpl implements UserRepository {
  async save(name: string, email: string): Promise<User> {
    const prisma = new PrismaClient();

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return user;
  }

  async find(id: string): Promise<User | null> {
    const prisma = new PrismaClient();

    return await prisma.user.findUnique({
      where: { id },
    });
  }
}
