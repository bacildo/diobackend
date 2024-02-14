const database = [
  {
    name: "Diogo",
    email: "bacildo@gmail.com",
  },
];

export class UserService {
  createUser = (name: string, email: string) => {
    const user = {
      name: name,
      email: email,
    };
    database.push(user);
    console.log("Database updated", database);
  };

  getUsers = () => {
    return database;
  };
}
