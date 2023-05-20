import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { UserService } from "../UserService";
import { UserRepositoryInMemory } from "../UserRespositoryInMemory";

describe("Teste no domídio de usuário", () => {
  let userService: UserService;
  beforeEach(() => {
    userService = new UserService(new UserRepositoryInMemory());
  });

  test("create a user", async () => {
    const userDTO = {
      name: "thalles",
      user_name: "thallesGamePlay",
      email: "thalles@gmail.com",
      password: "minhasenha123",
    };

    const userCreated = await userService.create(userDTO);

    expect(userCreated).toHaveProperty("id");
    expect(userCreated).toHaveProperty("name", userDTO.name);
    expect(userCreated).toHaveProperty("email", userDTO.email);
    expect(userCreated).not.toHaveProperty("password", userDTO.password);
  });

  test("nao seja possivel criar usuário com email já em uso", async () => {
    const userDTO = {
      name: "thalles",
      user_name: "thallesGamePlay",
      email: "thalles@gmail.com",
      password: "minhasenha123",
    };

    await userService.create(userDTO);

    expect(async () => userService.create(userDTO)).rejects.toThrow(
      new Error("Email already exist")
    );
  });

  test("não seja possível criar um usuário com o username em uso", async () => {
    const userDTO = {
      name: "thalles",
      user_name: "thallesGamePlay",
      email: "thalles@gmail.com",
      password: "minhasenha123",
    };

    await userService.create({
      ...userDTO,
      email: "thalles2@gmail.com", //change email
    });

    expect(async () => await userService.create(userDTO)).rejects.toThrow(
      new Error("username already in used")
    );
  });

  test("não seja possível criar um usuário com a senha fraca", () => {
    const userDTO = {
      name: "thalles",
      user_name: "thallesGamePlay",
      email: "thalles@gmail.com",
      password: "123",
    };

    expect(userService.create(userDTO)).rejects.toThrow();
  });
});
