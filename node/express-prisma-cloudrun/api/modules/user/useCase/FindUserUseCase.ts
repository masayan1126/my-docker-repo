import { User } from "@prisma/client";

import { UserRepositoryImpl } from "../repository/UserRepositoryImpl";
import { UserRepository } from "../repository/UserRepository";

export class FindUserUseCase {
  private userRepository: UserRepository;

  public constructor() {
    // TODO: DI
    this.userRepository = new UserRepositoryImpl();
  }

  public async find(id: string): Promise<User | null> {
    return await this.userRepository.find(id);
  }
}
