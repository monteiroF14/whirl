import { Router } from "express";
import type { Request, Response } from "express";
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
	.route("/:id/followed")
	.get(require(ROLE.APPLICATION_USER), UserController.getUserFollowedUsers);

router
	.route("/:id/following")
	.get(require(ROLE.APPLICATION_USER), (req: Request, res: Response) => {
		if (!req.params.type || req.params.type === null) {
			res.status(401);
		}

		if (!req.params.type.includes(["quiz", "user"])) {
			res.status(401).json({ message: "Invalid params! Must have type quiz or user" });
		}

		return req.params.type === "quiz"
			? UserController.getUserFollowedQuizzes
			: UserController.getUserFollowedQuizzes;
	})
	.put(require(ROLE.APPLICATION_USER), (req: Request, res: Response) => {
		if (!req.params.type || req.params.type === null) {
			res.status(401);
		}

		if (!req.params.type.includes(["quiz", "user"])) {
			res.status(401).json({ message: "Invalid params! Must have type quiz or user" });
		}

		return req.params.type === "quiz"
			? UserController.addToUserFollowedQuizzes
			: UserController.getUserFollowedQuizzes;
	})
	.delete(require(ROLE.APPLICATION_USER), (req, res) => {
		if (!req.params.type || req.params.type === null) {
			res.status(401);
		}

		if (!req.params.type.includes(["quiz", "user"])) {
			res.status(401).json({ message: "Invalid params! Must have type quiz or user" });
		}

		return req.params.type === "quiz"
			? UserController.removeFromUserFollowedQuizzes
			: UserController.getUserFollowedQuizzes;
	});
