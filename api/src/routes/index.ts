import { Router, type Request, type Response } from "express";
import user from "./user";
import quiz from "./quiz";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.status(200).send("server is running");
});

router.use("/users", user);
router.use("/quizzes", quiz);

export default router;
