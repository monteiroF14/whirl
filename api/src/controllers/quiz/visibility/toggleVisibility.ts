import type { NextFunction, Request, Response } from "express";
import { ToggleVisibilityQuizServicePropsSchema } from "../../../services/quiz/visibility/toggleVisibility";
import * as QuizService from "../../../services/quiz";

export async function toggleVisibility(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = ToggleVisibilityQuizServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.toggleVisibility(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to fetch quiz: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
