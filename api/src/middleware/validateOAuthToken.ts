import type { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth";

export async function validateOAuthToken({ token }: { token: string }) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const result = await AuthService.validateToken({
			token,
		});

		if (result.isFailure) {
			return res.status(400).send("invalid token");
		}

		req.access_token = token;

		next();
	};
}
