import { Request } from "express";
import { UserService } from "../service/UserService";

jest.mock("../repositories/User");

const mockUserRepository = require("../repositories/User");

const user = {
  id_user: "1234565",
  name: "Diogo",
  email: "bacildo@gmail.com",
  password: "1234",
};

describe("UserService", () => {
  const userService = new UserService(mockUserRepository);

  it("should create a user", async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id_user: user.id_user,
        name: user.name,
        email: user.email,
        password: user.password,
      })
    );
    const response = await userService.createUser(
      user.name,
      user.email,
      user.password
    );
    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      id_user: user.id_user,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  });
  it("should delete the user", () => {
    const mockConsoleLog = jest.spyOn(global.console, "log");

    const req = {
      params: {
        name: user.name,
      },
    } as unknown as Request;

    userService.deleteUser(req);
    expect(mockConsoleLog).toHaveBeenCalledWith("User deleted", {});
  });

  // it("should get the users", () => {});
  // const mockConsoleLog = jest.spyOn(global.console, "log");
  // userService.getUser();
  // expect(mockConsoleLog).toHaveBeenCalledWith("Users retrieved");
});
