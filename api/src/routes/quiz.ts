import { Router } from "express";
import * as QuizController from "controllers/quiz";
import { ROLE } from "config/permissions";
import { require } from "middleware/require";

const router = Router();

router
	.route("/")
	.get(require(ROLE.APPLICATION_USER), QuizController.getAllQuizzes)
	.post(require(ROLE.APPLICATION_USER), QuizController.createQuiz);

router
	.route("/:id")
	.get(require(ROLE.APPLICATION_USER), QuizController.getQuizFromId)
	.delete(require(ROLE.APPLICATION_USER), QuizController.removeQuiz);

router
	.route("/:id/visibility")
	.get(require(ROLE.APPLICATION_USER), QuizController.getQuizVisibility)
	.put(require(ROLE.APPLICATION_USER), QuizController.toggleQuizVisibility);

router
	.route("/:id/views")
	.get(require(ROLE.APPLICATION_USER), QuizController.getQuizViews)
	.put(require(ROLE.APPLICATION_USER), QuizController.incrementQuizViews);

router
	.route("/:id/rating")
	.get(require(ROLE.APPLICATION_USER), QuizController.getQuizRating)
	.put(require(ROLE.APPLICATION_USER), QuizController.updateQuizRating);

// router.route("/:id/followers").get(require(ROLE.APPLICATION_USER), QuizController.getQuizFollowers);

router.route("/:id/genres").post(require(ROLE.APPLICATION_USER), QuizController.addGenreToQuiz);

router
	.route("/:id/genres/:genreId")
	.delete(require(ROLE.APPLICATION_USER), QuizController.removeGenreFromQuiz);

router.route("/:id/image").put(require(ROLE.APPLICATION_USER), QuizController.updateQuizImage);

export default router;
