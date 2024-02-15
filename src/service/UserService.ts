import { Request } from "express-serve-static-core";
import { IUser } from "../interfaces/User";

const mockDatabase = [
  {
    name: "Jamal",
    email: "jamal@gmail.com",
  },
];

export class UserService {
  db: IUser[];

  constructor(database = mockDatabase) {
    this.db = database;
  }

  createUser = (name: string, email: string) => {
    const user = {
      name: name,
      email: email,
    };
    this.db.push(user);
    console.log("Database updated", this.db);
  };

  getUsers = () => {
    console.log('Users retrieved', this.db);
    return this.db;
  };

  deleteUser = (params: Request) => {
    const user = params.params;
    console.log(params.params);
    for (const key in user) {
      delete user[key];
    }
    console.log("User deleted", user);
  };
}
