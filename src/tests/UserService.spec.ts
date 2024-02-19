import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { UserService } from "../service/UserService";

jest.mock("../repositories/User");
jest.mock("jsonwebtoken");

const mockUserRepository = require("../repositories/User");
const mockUser = {
  user_id: "123456",
  name: "Diogo",
  email: "bacildo@gmail.com",
  password: "1234",
};

describe("UserService", () => {
  const userService = new UserService(mockUserRepository);

  it("should create a user", async () => {
    mockUserRepository.createUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));
    const response = await userService.createUser(
      mockUser.name,
      mockUser.email,
      mockUser.password
    );
    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      user_id: mockUser.user_id,
      name: mockUser.name,
      email: mockUser.email,
      password: mockUser.password,
    });
  });
  it("should delete the user", async () => {
    const mockConsoleLog = jest.spyOn(global.console, "log");

    const req = {
      params: {
        name: mockUser.name,
      },
    } as unknown as Request;

    userService.deleteUser(req);
    expect(mockConsoleLog).toHaveBeenCalledWith("User deleted", {});
  });

  it("should return a user token", async () => {
    jest
      .spyOn(userService, "getAuthenticatedUser")
      .mockImplementation(() => Promise.resolve(mockUser));
    jest.spyOn(jwt, "sign").mockImplementation(() => "token");

    const token = await userService.getToken("bacildo@gmail", "123456");
    expect(token).toBe("token");
  });
  it("should return an error, if the user is'nt found", async () => {
    jest
      .spyOn(userService, "getAuthenticatedUser")
      .mockImplementation(() => Promise.resolve(null));
    await expect(
      userService.getToken("invalid@invalid.com", "2132434354")
    ).rejects.toThrow(new Error("Email or password invalid!"));
  });

  
});
