import { UserService } from "./UserService";

describe("UserService", () => {
  const userService = new UserService();

  it("should create a user", () => {
    const mockConsoleLog = jest.spyOn(global.console, "log");
    const user = {
      name: "Diogo",
      email: "bacildo@gmail.com",
    };
    userService.createUser(user.name, user.email);
    expect(mockConsoleLog).toHaveBeenCalled();

  });
});
