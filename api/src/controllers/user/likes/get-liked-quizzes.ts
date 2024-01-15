import type { NextFunction, Request, Response } from "express";
import * as UserService from "services/user";
import { GetLikedQuizzesPropsSchema } from "services/user/likes/get-liked-quizzes";

export async function getLikedQuizzes(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetLikedQuizzesPropsSchema.safeParse({ userId: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await UserService.getLikedQuizzes(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get user followed quizzes: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
