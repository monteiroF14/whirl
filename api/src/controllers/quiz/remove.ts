import type { NextFunction, Request, Response } from "express";
import * as QuizService from "../../services/quiz";
import { RemoveQuizServicePropsSchema } from "../../services/quiz/remove";

export async function remove(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const validation = RemoveQuizServicePropsSchema.safeParse({ id });

	if (!validation.success) {
		res.status(400).json({
			message: "Validation error",
			errors: validation.error.errors,
		});
		return;
	}

	try {
		const result = await QuizService.remove(validation.data);

		if (result.isSuccess) {
			res.status(201).json(result.value);
		} else {
			res.status(500).json({ message: `Failed to delete quiz: ${result.error}` });
		}
	} catch (err) {
		next(err);
	}
}
