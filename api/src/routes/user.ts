import { Router } from "express";
import * as UserController from "controllers/user";
import { require } from "middleware/require";
import { ROLE } from "config/permissions";

const router = Router();

router
	.route("/")
	.get(require(ROLE.SUPER_ADMIN), UserController.getAllUsers)
	.post(UserController.createUser);

router.route("/:id").get(require(ROLE.SUPER_ADMIN), UserController.getUserFromId);

router.route("/:id/image").put(require(ROLE.APPLICATION_USER), UserController.updateUserImage);

router.route("/:id/quizzes").get(require(ROLE.APPLICATION_USER), UserController.getUserOwnQuizzes);

router
	.route("/:id/following")
	.get(require(ROLE.APPLICATION_USER), UserController.getUserFollowedQuizzes)
	.put(require(ROLE.APPLICATION_USER), UserController.addToUserFollowedQuizzes)
	.delete(require(ROLE.APPLICATION_USER), UserController.removeFromUserFollowedQuizzes);

export default router;
