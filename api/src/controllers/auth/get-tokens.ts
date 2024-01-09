import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import * as AuthService from "services/auth";

const QueryParamsSchema = z.object({
	code: z.string(),
});

export async function getTokens(req: Request, res: Response, next: NextFunction) {
	try {
		const { code } = QueryParamsSchema.parse(req.query);

		const result = await AuthService.getTokens({
			code: code as string,
		});

		if (result.isFailure) {
			return res.status(400).send("Failed to obtain tokens");
		}

		req.tokens = result.value;

		next();
	} catch (err) {
		next(err);
	}
}
