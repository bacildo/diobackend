import { Request } from "express";
import { mockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { UserController } from "../controller/UserController";
import { UserService } from "../service/UserService";

describe("UserController", () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    getUser: jest.fn(),
  };
  const userController = new UserController(mockUserService as UserService);
  const mockResponseTest = makeMockResponse();

  it("should create a user", () => {
    const mockRequestTest = {
      body: {
        name: "Diogo",
        email: "bacildo@gmail.com",
        password: "1234",
      },
    } as Request;
    const mockResponseTest = makeMockResponse();
    userController.createUser(mockRequestTest, mockResponseTest);
    expect(mockResponseTest.state.status).toBe(201);
    expect(mockResponseTest.state.json).toMatchObject({
      message: "User created",
    });
  });

  it("should verify the user name", () => {
    const mockRequestTest = {
      body: {
        name: "",
        email: "bacildo@gmail.com",
        password: "1234",
      },
    } as Request;
    const mockResponseTest = makeMockResponse();
    userController.createUser(mockRequestTest, mockResponseTest);
    expect(mockResponseTest.state.status).toBe(400);
    expect(mockResponseTest.state.json).toMatchObject({
      message: "Bad request! Name is not specified.",
    });
  });

  it("should verify the email of the user", () => {
    const mockRequestTest = {
      body: {
        name: "Diogo",
        email: "bacildo@gmail.com",
        password: "1234",
      },
    } as Request;
    const mockResponseTest = makeMockResponse();
    userController.createUser(mockRequestTest, mockResponseTest);
    expect(mockResponseTest.state.status).toBe(400);
    expect(mockResponseTest.state.json).toMatchObject({
      message: "Bad request! Email is not specified.",
    });
  });

  it("should verify the password of the user", () => {
    const mockRequestTest = {
      body: {
        name: "Diogo",
        email: "bacildo@gmail.com",
        password: "",
      },
    } as Request;
    const mockResponseTest = makeMockResponse();
    userController.createUser(mockRequestTest, mockResponseTest);
    expect(mockResponseTest.state.status).toBe(400);
    expect(mockResponseTest.state.json).toMatchObject({
      message: "Bad request! Password is not specified.",
    });
  });

  it("should get the user", () => {
    const mockRequestTest = {} as Request;
    const mockResponseTest = makeMockResponse();
    userController.getUser(mockRequestTest, mockResponseTest);
    expect(mockResponseTest.state.status).toBe(200);
  });

  it("should delete a user", () => {
    const mockRequestTest = { params: { name: "Jamal" } } as unknown as Request;
    const mockResponseTest = makeMockResponse();
    userController.deleteUser(mockRequestTest, mockResponseTest);
    expect(mockResponseTest.state.status).toBe(204);
    expect(mockResponseTest.state.json).toMatchObject({
      message: "User deleted successfully",
    });
  });

  it("shoud return the user, with the id informed", async () => {
    const mockRequestTest = mockRequest({
      params: {
        userId: "123456",
      },
    });

    userController.getUser(mockRequestTest, mockResponseTest);
    expect(mockUserService.getUser).toHaveBeenCalledWith("123456");
    expect(mockResponseTest.state.status).toBe(200);
  });
});
