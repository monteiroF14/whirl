import express from "express";
import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import router from "routes";
import { server } from "config";
import rateLimit from "express-rate-limit";
import compression from "compression";

const app: Express = express();
const PORT = server.port;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	validate: { xForwardedForHeader: false },
	standardHeaders: "draft-7",
	legacyHeaders: false,
});

app.use(limiter);

app.use(compression());

app.use(router);

if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`🚀 server is running 🚀`);
	});
}

export default app;
