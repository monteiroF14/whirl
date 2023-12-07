import { Router, type Request, type Response } from "express";
import * as AuthController from "../controllers/auth";

const router = Router();

router.route("/").get((req: Request, res: Response) => {
	res.send(AuthController.login());
});

router.route("/callback").get(AuthController.getTokens);

export default router;
