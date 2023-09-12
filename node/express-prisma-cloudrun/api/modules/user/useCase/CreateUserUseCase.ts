import { User } from "@prisma/client";
import { UserRepository } from "../repository/UserRepository";
import { UserRepositoryImpl } from "../repository/UserRepositoryImpl";

export class CreateUserUseCase {
  private userRepository: UserRepository;

  public constructor() {
    // TODO: DI
    this.userRepository = new UserRepositoryImpl();
  }

  public async create(name: string, email: string): Promise<User | null> {
    return await this.userRepository.save(name, email);
  }
}
