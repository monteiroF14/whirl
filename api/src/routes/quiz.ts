import { Router, type Request, type Response } from "express";
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

router
	.route("/:id/visibility")
	.get(authorize([PERMISSIONS.QUIZ_EDIT_OWN]), QuizController.getVisibility)
	.put(authorize([PERMISSIONS.QUIZ_EDIT_OWN]), QuizController.toggleVisibility);

router.route("/:id/views").get((req: Request, res: Response) => {
	console.log("here");
	res.sendStatus(200);
});

// router.route(":/id/rating");
// router.route(":/id/followers");
// router.route(":/id/questions");

export default router;
