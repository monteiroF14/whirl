import { Router } from "express";
import * as QuizController from "./../controllers/quiz";
import { checkPermission } from "../middleware/checkPermission";
import { PERMISSIONS } from "../config/permissions";

const router = Router();

router
	.route("/")
	.get(checkPermission([PERMISSIONS.QUIZ_READ_ALL]), QuizController.getAll)
	.post(QuizController.create);
router.route("/:id").get(QuizController.getFromId).delete(QuizController.remove);
// router.route(":/id/:genre").get(QuizController.getGenre).put(QuizController.updateGenres)

export default router;
