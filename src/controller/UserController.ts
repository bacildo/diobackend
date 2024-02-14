import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
  createUser = (req: Request, res: Response) => {
    const userService = new UserService();
    const user = req.body;

    if(!user.name){
      return res.status(400).json({message:"Bad request! Name is not specified."})
    }
    userService.createUser(user.name, user.email);
    return res.status(201).json({ messagem: "User Created" });
  };

  getUsers = (req: Request, res: Response) => {
   const userService = new UserService();
   const users = userService.getUsers()
   return res.status(200).json(users);
  };
}
