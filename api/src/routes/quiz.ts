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

router
	.route("/:id/visibility")
	.get(authorize([PERMISSIONS.QUIZ_EDIT_OWN]), QuizController.getVisibility)
	.put(authorize([PERMISSIONS.QUIZ_EDIT_OWN]), QuizController.toggleVisibility);

router
	.route("/:id/views")
	.get(authorize([PERMISSIONS.QUIZ_READ_ALL]), QuizController.getViews)
	.put(authorize([PERMISSIONS.QUIZ_INCREMENT_ANY]), QuizController.incrementViews);

router
	.route("/:id/rating")
	.get(authorize([PERMISSIONS.QUIZ_RATE_ANY]), QuizController.getRating)
	.put(authorize([PERMISSIONS.QUIZ_RATE_ANY]), QuizController.updateRating);

// router.route(":/id/followers");
// router.route(":/id/questions");

export default router;
