import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../../services/quiz";
import { IncreaseViewsQuizServicePropsSchema } from "../../../services/quiz/views/incrementViews";

export async function incrementViews(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = IncreaseViewsQuizServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.incrementViews(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to increment quiz views: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
