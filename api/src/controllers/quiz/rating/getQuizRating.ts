import type { NextFunction, Request, Response } from "express";
import * as QuizService from "services/quiz";
import { GetQuizRatingServicePropsSchema } from "services/quiz/rating/getQuizRating";

export async function getQuizRating(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetQuizRatingServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.getQuizRating(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to get quiz rating: ${result.error}` });
		}

		res.status(200).json(result.value);
	} catch (err) {
		next(err);
	}
}
