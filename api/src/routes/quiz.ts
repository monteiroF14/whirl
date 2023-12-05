import { Router } from "express";
import * as QuizController from "./../controllers/quiz";
import { ROLE } from "../config/permissions";
import { require } from "../middleware/require";

const router = Router();

router
	.route("/")
	.get(require(ROLE.APPLICATION_USER), QuizController.getAll)
	.post(require(ROLE.APPLICATION_USER), QuizController.create);

router
	.route("/:id")
	.get(require(ROLE.APPLICATION_USER), QuizController.getFromId)
	.delete(require(ROLE.APPLICATION_USER), QuizController.remove);

router
	.route("/:id/visibility")
	.get(require(ROLE.APPLICATION_USER), QuizController.getVisibility)
	.put(require(ROLE.APPLICATION_USER), QuizController.toggleVisibility);

router
	.route("/:id/views")
	.get(require(ROLE.APPLICATION_USER), QuizController.getViews)
	.put(require(ROLE.APPLICATION_USER), QuizController.incrementViews);

router
	.route("/:id/rating")
	.get(require(ROLE.APPLICATION_USER), QuizController.getRating)
	.put(require(ROLE.APPLICATION_USER), QuizController.updateRating);

router
	.route("/:id/followers")
	.get(require(ROLE.APPLICATION_USER), QuizController.getFollowers)
	.put(require(ROLE.APPLICATION_USER), QuizController.addFollower);

export default router;
