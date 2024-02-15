import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (req: Request, res: Response) => {
    const user = req.body;

    if (!user.name) {
      return res
        .status(400)
        .json({ message: "Bad request! Name is not specified." });
    }

    if (!user.email) {
      return res
        .status(400)
        .json({ message: "Bad request! Email is not specified." });
    }

    this.userService.createUser(user.name, user.email);
    return res.status(201).json({ message: "User created" });
  };

  getUsers = (req: Request, res: Response) => {
    const users = this.userService.getUsers();
    return res.status(200).json(users);
  };

  deleteUser = (req: Request, res: Response) => {
    this.userService.deleteUser(req);
    return res.status(204).json({ message: "User deleted successfully" });
  };
}
