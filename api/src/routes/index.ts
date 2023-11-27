import { Router, type Request, type Response } from "express";
import quiz from "./quiz";
import user from "./user";
import { errorHandler } from "../middleware/error";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.status(200).send("server is running");
});

router.use("/users", user);
router.use("/quizzes", quiz);

router.use(errorHandler);

export default router;
