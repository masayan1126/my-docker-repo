import { User } from "@prisma/client";

export interface UserRepository {
  save(name: string, email: string): Promise<User>;
  find(id: string): Promise<User | null>;
}
