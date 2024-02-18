import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User";

describe("UserRepository", () => {
  let userRepository: UserRepository;
  let managerMock: Partial<EntityManager>;
  const mockUser: User = {
    user_id: "123",
    name: "Diogo",
    email: "bacildo@gmail.com",
    password: "1234",
  };

  beforeAll(async () => {
    managerMock = await getMockEntityManager({
      saveReturn: mockUser,
    });
    userRepository = new UserRepository(managerMock as EntityManager);
  });

  it("should create a user in the database", async () => {
    const response = await userRepository.createUser(mockUser);
    expect(managerMock.save).toHaveBeenCalled();
    expect(response).toMatchObject(mockUser);
  });
});
