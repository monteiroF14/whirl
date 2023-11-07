import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import config from "./config";

const app: Express = express();
const PORT = config.server.port;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
	res.send("hello world");
});

app.listen(PORT, () => {
	console.log(`server is running`);
});
