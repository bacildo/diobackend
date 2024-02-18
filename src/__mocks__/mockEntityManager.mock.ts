import { EntityManager } from "typeorm";
import { mockManager } from "../interfaces/MockEntityManager";

export const getMockEntityManager = async ({
  saveReturn = undefined,
  findOneReturn = undefined,
}: mockManager): Promise<EntityManager> => {
  const manager: Partial<EntityManager> = {};

  manager.save = jest
    .fn()
    .mockImplementation(() => Promise.resolve(saveReturn));

  manager.findOne = jest
    .fn()
    .mockImplementation(() => Promise.resolve(findOneReturn));

  return manager as EntityManager;
};
