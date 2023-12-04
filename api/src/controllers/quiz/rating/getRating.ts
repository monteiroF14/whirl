import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../../services/quiz";
import { GetRatingQuizServicePropsSchema } from "../../../services/quiz/rating/getRating";

export async function getRating(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetRatingQuizServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.getRating(validation.data);

		if (result.isSuccess) {
			res.status(200).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to get quiz rating: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
