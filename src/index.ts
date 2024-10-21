import express, { Application, Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { farmerRoute } from "./routes/farmerRoutes";

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 1234;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("I am Smart Farm Server");
});

app.use("/api/farmer", farmerRoute);

const startServer = async () => {
  try {
    connectDB();

    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (error) {
    console.error("Failed to start server");
  }
};

startServer();
