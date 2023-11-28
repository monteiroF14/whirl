import { Router } from "express";
import * as UserController from "./../controllers/user";
import { PERMISSIONS } from "../config/permissions";
import { authorize } from "../middleware/authorize";

const router = Router();

router
	.route("/")
	.get(authorize([PERMISSIONS.USERS_READ]), UserController.getAll)
	.post(UserController.create);

router
	.route("/:id")
	.get(authorize([PERMISSIONS.USERS_READ]), UserController.getFromId)
	.delete(authorize([PERMISSIONS.USERS_DELETE]), UserController.remove);

router
	.route("/:id/following")
	.get(authorize([PERMISSIONS.QUIZ_READ_ALL]), UserController.getFollowedQuizzes)
	.put(authorize([PERMISSIONS.QUIZ_FOLLOW_ANY]), UserController.addToFollowedQuizzes)
	.delete(authorize([PERMISSIONS.QUIZ_FOLLOW_ANY]), UserController.removeFromFollowedQuizzes);

export default router;
