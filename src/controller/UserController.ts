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

    if (!user.password) {
      return res
        .status(400)
        .json({ message: "Bad request! Password is not specified." });
    }

    this.userService.createUser(user.name, user.email, user.password);
    return res.status(201).json({ message: "User created" });
  };

  getUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await this.userService.getUser(userId);
    return res
      .status(200)
      .json({
        userId: user?.user_id,
        userName: user?.name,
        userEmail: user?.email,
      });
  };

  deleteUser = (req: Request, res: Response) => {
    this.userService.deleteUser(req);
    return res.status(204).json({ message: "User deleted successfully" });
  };
}
