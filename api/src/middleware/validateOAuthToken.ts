import type { NextFunction, Request, Response } from "express";
import * as AuthService from "services/auth";

export async function validateOAuthToken(req: Request, res: Response, next: NextFunction) {
	const result = await AuthService.validateToken({
		token: req.tokens?.id_token as string,
	});

	if (result.isFailure) {
		return res.status(400).send(result.error);
	}

	next();
}
