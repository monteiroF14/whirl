import { Router } from "express";
import * as QuizController from "./../controllers/quiz";
import { authorize } from "../middleware/authorize";
import { PERMISSIONS } from "../config/permissions";

const router = Router();

router
	.route("/")
	.get(authorize([PERMISSIONS.QUIZ_READ_ALL]), QuizController.getAll)
	.post(authorize([PERMISSIONS.QUIZ_CREATE_OWN]), QuizController.create);

router
	.route("/:id")
	.get(authorize([PERMISSIONS.QUIZ_READ_ALL]), QuizController.getFromId)
	.delete(authorize([PERMISSIONS.QUIZ_DELETE_OWN]), QuizController.remove);

export default router;
