import express from "express";
import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import router from "./routes";
import { server } from "./config";
import rateLimit from "express-rate-limit";

const app: Express = express();
const PORT = server.port;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
});

app.use(limiter);
app.use(router);

if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`🚀 server is running 🚀`);
	});
}

export default app;
