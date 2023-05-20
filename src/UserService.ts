import { UserRepository } from "./UserRepository";

import { CreateUserDTOProps, CreateUserDTOSchema } from "./DTO/CreateUserDTO";
import { UserRepositoryContract } from "./UserRepository.contract";
import { UserEntity } from "./UserEntity";

export class UserService {
  constructor(private readonly userRepository: UserRepositoryContract) {}

  async create(user: CreateUserDTOProps) {
    const validateDTO = CreateUserDTOSchema.safeParse(user);

    if (!validateDTO.success) {
      throw new Error("params error");
    }

    const emailAlreadyInUsed = await this.userRepository.getByEmail(user.email);

    if (emailAlreadyInUsed) {
      throw new Error("Email already exist");
    }

    const usernameAlreadyInUsed = await this.userRepository.getByUsername(
      user.user_name
    );

    if (usernameAlreadyInUsed) {
      throw new Error("username already in used");
    }

    const userEntity = new UserEntity(user);

    return await this.userRepository.create(userEntity);
  }

  async getAll() {
    return await this.userRepository.getAll();
  }
}
