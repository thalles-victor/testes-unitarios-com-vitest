import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";
import { CreateUserDTOProps } from "./DTO/CreateUserDTO";
import { UserRepositoryContract } from "./UserRepository.contract";
import { UserEntity } from "./UserEntity";

export class UserRepository implements UserRepositoryContract {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async create(userEntity: UserEntity): Promise<UserEntity> {
    return await this.prismaClient.user.create({
      data: userEntity,
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.prismaClient.user.findMany();
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async getByUsername(username: string): Promise<UserEntity | null> {
    return await this.prismaClient.user.findFirst({
      where: {
        user_name: username,
      },
    });
  }
}
