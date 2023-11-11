import {
	createQuizController,
	deleteQuizController,
	getAllQuizzesController,
	getQuizByIdController,
} from "controllers/quiz";

import { Router } from "express";

const router = Router();

router.route("/").get(getAllQuizzesController).post(createQuizController);
router.route("/:id").get(getQuizByIdController).delete(deleteQuizController);

export default router;
