import { IUser } from "../interfaces/User";
import { UserService } from "../service/UserService";
import { Request } from "express";

describe("UserService", () => {
  const mockDatabase: IUser[] = [];
  const userService = new UserService(mockDatabase);
  const user = {
    name: "Diogo",
    email: "bacildo@gmail.com",
  };

  it("should create a user", () => {
    const mockConsoleLog = jest.spyOn(global.console, "log");

    userService.createUser(user.name, user.email);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "Database updated",
      mockDatabase
    );
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

  it("should get the users", () => {});
  const mockConsoleLog = jest.spyOn(global.console, "log");
  userService.getUsers();
  expect(mockConsoleLog).toHaveBeenCalledWith("Users retrieved", mockDatabase);
});
