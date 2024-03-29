import type { NextFunction, Request, Response } from "express";

import * as QuizService from "services/quiz";
import { ToggleQuizVisibilityPropsSchema } from "services/quiz/visibility/toggle-quiz-visibility";

export async function toggleQuizVisibility(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = ToggleQuizVisibilityPropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.toggleQuizVisibility(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to fetch quiz: ${result.error}` });
		}

		res.status(201).json(result.value);
	} catch (err) {
		next(err);
	}
}
