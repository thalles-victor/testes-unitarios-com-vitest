import { CreateUserDTOProps } from "./DTO/CreateUserDTO";
import { UserEntity } from "./UserEntity";

export interface UserRepositoryContract {
  create(userEntity: UserEntity): Promise<UserEntity>;
  getAll(): Promise<UserEntity[]>;
  getByEmail(email: string): Promise<UserEntity | null>;
  getByUsername(username: string): Promise<UserEntity | null>;
}
