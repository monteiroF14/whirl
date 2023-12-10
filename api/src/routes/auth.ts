import { Router } from "express";
import * as AuthController from "controllers/auth";
import * as UserController from "controllers/user";
import { validateOAuthToken } from "middleware/validateOAuthToken";
import { ROLE } from "config/permissions";
import { require } from "middleware/require";

const router = Router();

router.route("/").get(AuthController.login);

router
	.route("/callback")
	.get(
		AuthController.getTokens,
		validateOAuthToken,
		UserController.createUser,
		AuthController.generateAccessToken
	);

router.route("/new-token").get(require(ROLE.APPLICATION_USER), AuthController.generateAccessToken);

export default router;
