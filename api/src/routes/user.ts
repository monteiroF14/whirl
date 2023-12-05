import { Router } from "express";
import * as UserController from "./../controllers/user";
import { require } from "../middleware/require";
import { ROLE } from "../config/permissions";

const router = Router();

router.route("/").get(require(ROLE.SUPER_ADMIN), UserController.getAll).post(UserController.create);

router
	.route("/:id")
	.get(require(ROLE.SUPER_ADMIN), UserController.getFromId)
	.delete(require(ROLE.SUPER_ADMIN), UserController.remove);

router
	.route("/:id/following")
	.get(require(ROLE.SUPER_ADMIN), UserController.getFollowedQuizzes)
	.put(require(ROLE.APPLICATION_USER), UserController.addToFollowedQuizzes)
	.delete(require(ROLE.APPLICATION_USER), UserController.removeFromFollowedQuizzes);

export default router;
