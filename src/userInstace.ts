import { UserRepository } from "./UserRepository";
import { UserRepositoryInMemory } from "./UserRespositoryInMemory";
import { UserService } from "./UserService";

export const userServiceInstance = new UserService(new UserRepository());
