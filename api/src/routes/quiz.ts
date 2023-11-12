import { Router } from "express";
import * as QuizController from "controllers/quiz";

const router = Router();

router.route("/").get(QuizController.getAll).post(QuizController.create);
router.route("/:id").get(QuizController.getFromId).delete(QuizController.remove);

export default router;
