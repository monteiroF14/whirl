import type { NextFunction, Response, Request } from "express";
import { z } from "zod";
import * as AuthService from "./../../services/auth";

const RequestSchema = z.object({
	access_token: z.string(),
});

export async function getUserInfo(req: Request, res: Response, next: NextFunction) {
	try {
		const { access_token } = RequestSchema.parse(req);

		const result = await AuthService.getUserInfo({ access_token });

		if (result.isFailure) {
			return res.status(400).send("Failed to obtain user information");
		}

		return res.status(200).send({ user: result.value });
	} catch (err) {
		next(err);
	}
}
