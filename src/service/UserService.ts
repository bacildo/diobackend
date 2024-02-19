import { Request } from "express-serve-static-core";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User";
import { sign } from "jsonwebtoken";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository = new UserRepository(AppDataSource.manager)) {
    this.userRepository = userRepository;
  }

  createUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<User| null> => {
    const user = new User(name, email, password);
    return this.userRepository.createUser(user);
  };

  getUser = async (userId:string):Promise<User | null> => {

    return this.userRepository.getUser(userId);
  };

  deleteUser = (params: Request) => {
    const user = params.params;
    console.log(params.params);
    for (const key in user) {
      delete user[key];
    }
    console.log("User deleted", user);
  };

  getAuthenticatedUser = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    return await this.userRepository.getUserByEmailAndPassword(email, password);
  };

  getToken = async (email: string, password: string): Promise<string> => {
    const user = await this.getAuthenticatedUser(email, password);


    if(!user){
      throw new Error('Email or password invalid!')
    }

    const tokenData = {
      name: user?.name,
      email: user?.email,
    };
    const tokenKey = "12345";
    const options = {
      subject: user?.user_id,
      expiresIn: "4h",
    };
    const token = sign(tokenData, tokenKey, options);
    return token;
  };
}
