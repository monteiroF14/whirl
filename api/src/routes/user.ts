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

router.route("/:id/quizzes").get(require(ROLE.APPLICATION_USER), UserController.getUserQuizzes);

router
	.route("/:id/liked")
	.get(require(ROLE.APPLICATION_USER), UserController.getLikedQuizzes)
	.post(require(ROLE.APPLICATION_USER), UserController.likeAQuiz)
	.delete(require(ROLE.APPLICATION_USER), UserController.removeQuizLike);

router.route("/:id/followers").get(require(ROLE.APPLICATION_USER), UserController.getUserFollowers);

router
	.route("/:id/following")
	.get(require(ROLE.APPLICATION_USER), UserController.getUserFollowing)
	.post(require(ROLE.APPLICATION_USER), UserController.followUser)
	.delete(require(ROLE.APPLICATION_USER), UserController.unfollowUser);

export default router;
