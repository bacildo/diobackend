import express, { Request, Response } from "express";
import { router } from "./routes/routes";
import { AppDataSource } from "./database";

const server = express();
server.use(express.json());
server.use(router);
const port = 3000;

server.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "API!",
  });
});

server.listen(port, () => console.log(`Server running on port, ${port}`));

AppDataSource.initialize()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error("Error during the initialization", err);
  });
