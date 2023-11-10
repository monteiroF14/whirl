import express from "express";
import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import router from "./routes";
import { server } from "./config";

const app: Express = express();
const PORT = server.port;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(PORT, () => {
	console.log(`server is running`);
});

export default app;
