import { randomInt, randomUUID } from "crypto";
import { CreateUserDTOProps } from "./DTO/CreateUserDTO";
import { UserRepositoryContract } from "./UserRepository.contract";
import { UserEntity } from "./UserEntity";

export class UserRepositoryInMemory implements UserRepositoryContract {
  private users: UserEntity[];

  constructor() {
    this.users = [];
  }

  async create(userEntity: UserEntity): Promise<UserEntity> {
    await this.users.push(userEntity);
    return userEntity;
  }

  async getAll() {
    return await this.users;
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((_user) => _user.email === email);

    return user ? user : null;
  }

  async getByUsername(username: string): Promise<UserEntity | null> {
    const user = this.users.find((_user) => _user.user_name === username);

    return user ? user : null;
  }
}
