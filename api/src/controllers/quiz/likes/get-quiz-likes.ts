import type { NextFunction, Request, Response } from "express";
import * as QuizService from "services/quiz";
import { GetQuizLikesPropsSchema } from "services/quiz/likes/get-quiz-likes";

export async function getQuizLikes(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetQuizLikesPropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.getQuizLikes(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get quiz followers: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
