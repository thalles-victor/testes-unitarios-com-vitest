import { CreateUserDTOProps } from "./DTO/CreateUserDTO";
import { randomUUID } from "crypto";
import { hashSync } from "bcrypt";

export class UserEntity {
  id: string;
  name: string;
  user_name: string;
  email: string;
  password: string;

  constructor(userDTO: CreateUserDTOProps) {
    this.id = randomUUID();
    this.name = userDTO.name;
    this.user_name = userDTO.user_name;
    this.email = userDTO.email;
    this.password = hashSync(userDTO.password, 10);
  }
}
