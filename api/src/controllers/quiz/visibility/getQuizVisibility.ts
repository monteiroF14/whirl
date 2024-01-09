import type { NextFunction, Request, Response } from "express";

import * as QuizService from "services/quiz";
import { GetQuizVisibilityPropsSchema } from "services/quiz/visibility/get-quiz-visibility";

export async function getQuizVisibility(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetQuizVisibilityPropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.getQuizVisibility(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to fetch quiz: ${result.error}` });
		}

		res.status(201).json(result.value);
	} catch (err) {
		next(err);
	}
}
