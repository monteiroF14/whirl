import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../../services/quiz";
import { GetViewsQuizServicePropsSchema } from "../../../services/quiz/views/getViews";

export async function getViews(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = GetViewsQuizServicePropsSchema.safeParse({ id: +id! });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.getViews(validation.data);

		if (result.isSuccess) {
			res.status(200).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to get quiz views: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
