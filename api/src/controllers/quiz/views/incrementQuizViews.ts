import type { NextFunction, Request, Response } from "express";
import * as QuizService from "services/quiz";
import { IncrementQuizViewsServicePropsSchema } from "services/quiz/views/incrementQuizViews";

export async function incrementQuizViews(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = IncrementQuizViewsServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.incrementQuizViews(validation.data);

		if (result.isFailure) {
			res.status(500).json({ message: `Failed to increment quiz views: ${result.error}` });
		}

		res.status(201).json(result.value);
	} catch (err) {
		next(err);
	}
}
