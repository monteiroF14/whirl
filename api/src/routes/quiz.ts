import { Router } from "express";
import * as QuizController from "./../controllers/quiz";
import { checkPermission } from "../middleware/checkPermission";
import { PERMISSIONS } from "../config/permissions";

const router = Router();

router
	.route("/")
	.get(checkPermission([PERMISSIONS.QUIZ_READ_ALL]), QuizController.getAll)
	.post(checkPermission([PERMISSIONS.QUIZ_CREATE_OWN]), QuizController.create);

router
	.route("/:id")
	.get(checkPermission([PERMISSIONS.QUIZ_READ_ALL]), QuizController.getFromId)
	.delete(checkPermission([PERMISSIONS.QUIZ_DELETE_OWN]), QuizController.remove);
// router.route(":/id/:genre").get(QuizController.getGenre).put(QuizController.updateGenres)

export default router;
