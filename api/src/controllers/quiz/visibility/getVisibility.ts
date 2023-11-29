import type { NextFunction, Request, Response } from "express";
import { GetVisibilityQuizServicePropsSchema } from "../../../services/quiz/visibility/getVisibility";
import * as QuizService from "../../../services/quiz";

export async function getVisibility(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetVisibilityQuizServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.getVisibility(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to fetch quiz: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
