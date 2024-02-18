import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/database.sqlite",
  synchronize: true,
  logging: true,
  migrations: ["./src/database/migrations/*.ts"],
});

